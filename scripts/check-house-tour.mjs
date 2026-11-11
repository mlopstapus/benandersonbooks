// node scripts/check-house-tour.mjs — actual geometry, routes and fallback depth rendering.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const scratch=await fs.mkdtemp(path.join(os.tmpdir(),'hale-tour-check-'));
const url=p=>pathToFileURL(p).href;
const threeURL=url(path.join(root,'site/vendor/three/three.module.js'));
const THREE=await import(threeURL);
const {scenes,walkStops}=await import(new URL('../site/tour/house-notes.js',import.meta.url));
let checks=0;const passed=label=>{checks++;console.log(`✓ ${label}`);};
try{
 for(const name of ['RoundedBoxGeometry','Projector']){
  const source=(await fs.readFile(path.join(root,`site/vendor/three/${name}.js`),'utf8')).replace("from 'three'",`from '${threeURL}'`);
  await fs.writeFile(path.join(scratch,name+'.mjs'),source);
 }
 let source=(await fs.readFile(path.join(root,'site/tour/house-model.js'),'utf8')).replace("from 'three'",`from '${threeURL}'`).replace("from '../vendor/three/RoundedBoxGeometry.js'",`from '${url(path.join(scratch,'RoundedBoxGeometry.mjs'))}'`);
 await fs.writeFile(path.join(scratch,'model.mjs'),source);
 source=(await fs.readFile(path.join(root,'site/tour/walk-graph.js'),'utf8')).replace(/from '\.\/house-notes\.js\?v=[^']+'/,`from '${url(path.join(root,'site/tour/house-notes.js'))}'`);
 await fs.writeFile(path.join(scratch,'graph.mjs'),source);
 let frame;
 globalThis.document={createElement(){return {getContext(){return {fillRect(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},bezierCurveTo(){},strokeRect(){},fillText(){},drawImage(){},createImageData(w,h){return {data:new Uint8ClampedArray(w*h*4),width:w,height:h};},putImageData(value){frame=value;}};}};}};
 const {buildHouse,mountHouse,roomOrigins}=await import(url(path.join(scratch,'model.mjs')));
 const {createWalkGraph}=await import(url(path.join(scratch,'graph.mjs')));
 const model=buildHouse({software:true}),world=new THREE.Scene();mountHouse(world,model);
 assert.equal(model.root.parent,world);
 for(const [name,room]of Object.entries(model.interiors)){
  assert.equal(room.root.parent,model.root);assert.deepEqual(room.root.position.toArray(),roomOrigins[name]);
  assert.ok(room.root.visible);assert.ok(room.walls.right.children.length>0);
 }
 world.updateMatrixWorld(true);passed('four rooms share one house, with distinct floor-plan positions');
 const graph=createWalkGraph(roomOrigins);
 for(const [name,stops]of Object.entries(walkStops))for(let i=0;i<stops.length;i++)assert.ok(`${name}:${i}`==='street:0'||graph.route('street:0',`${name}:${i}`).length);
 const upstairs=graph.route('parlor:0','bedroom:0');assert.ok(upstairs.some(n=>n.id.startsWith('stairs:')));assert.ok(upstairs.some(n=>n.room==='landing'));
 const across=graph.route('parlor:0','kitchen:0');assert.ok(across.some(n=>n.room==='hall'));
 passed('every viewpoint is reachable through actual hall, stair and landing routes');
 const visibleMesh=hit=>{if(!hit.object.isMesh)return false;for(let n=hit.object;n;n=n.parent)if(!n.visible)return false;return true;};
 const formerKitchenDoor=new THREE.Raycaster(new THREE.Vector3(1.35,1.3,6),new THREE.Vector3(0,0,-1)).intersectObject(model.interiors.kitchen.walls.rear,true).find(visibleMesh);
 assert.ok(formerKitchenDoor);assert.equal(formerKitchenDoor.object.material.userData.inkSurface,'plaster');
 const backDoors=[];model.root.traverse(node=>{if(node.name==='house-back-door')backDoors.push(node);});
 assert.equal(backDoors.length,1);assert.equal(backDoors[0].parent,model.hall.walls);
 assert.ok(!graph.route('hall:0','yard:0').some(node=>node.room==='kitchen'),'yard route stays in the hall');
 for(const x of [-2.1,-1.9,-1.8,-.2,-.1,.2])for(const y of [.78,1.5,2.5]){
  const seam=new THREE.Raycaster(new THREE.Vector3(x,y,3.8),new THREE.Vector3(0,0,1)).intersectObject(model.interiors.kitchen.walls.rear,true).find(visibleMesh);
  assert.ok(seam&&seam.distance<.85,`gap around kitchen window at ${x},${y}`);
 }
 for(const room of ['parlor','bedroom','gideon'])assert.equal(walkStops[room].length,1);
 assert.equal(scenes.parlor.details.find(detail=>detail.id==='lace').action,undefined);
 passed('single hall back entrance, sealed kitchen window perimeter and concise room viewpoints');
 const board=model.root.getObjectByName('parlor-loose-board'),rug=model.root.getObjectByName('parlor-rug');
 const boardBounds=new THREE.Box3().setFromObject(model.root.getObjectByName('parlor-hearth-boards'));
 assert.ok(!boardBounds.intersectsBox(new THREE.Box3().setFromObject(rug)),'rug must leave the hearth boards uncovered');
 const eye=new THREE.Vector3(...graph.nodes.get('parlor:0').position),boardCentre=board.getWorldPosition(new THREE.Vector3());
 const boardHit=new THREE.Raycaster(eye,boardCentre.clone().sub(eye).normalize()).intersectObject(model.root,true).find(visibleMesh);
 assert.equal(boardHit?.object,board,'the third board must be visible from the parlor viewpoint');
 assert.equal(scenes.parlor.details[0].id,'hearth-board');
 for(const name of ['parlor-settee','hall-coat-rail','entrance-mat','gideon-washstand','gideon-mirror','gideon-dresser','open-drawer','tin-soldier','yard-household-supplies'])assert.ok(model.root.getObjectByName(name),name+' is missing');
 passed('hearth boards stay exposed and visible; approved household furnishings are mounted');
 let paths=0;
 for(const [id,links]of graph.edges)for(const to of links){if(id>to)continue;paths++;
  for(const height of [0,-.7])for(const width of [0,-.12,.12]){
   const a=new THREE.Vector3(...graph.nodes.get(id).position),b=new THREE.Vector3(...graph.nodes.get(to).position);
   const side=new THREE.Vector3().subVectors(b,a).cross(new THREE.Vector3(0,1,0)).normalize().multiplyScalar(width);
   a.add(side);b.add(side);a.y+=height;b.y+=height;
   const distance=a.distanceTo(b),direction=b.clone().sub(a).normalize();
   const hit=new THREE.Raycaster(a,direction,0,distance-.05).intersectObject(model.root,true).find(visibleMesh);
   assert.equal(hit,undefined,`walk blocked: ${id} → ${to} at height ${height}, width ${width}`);
  }
 }
 passed(`${paths} walking segments clear walls, furniture and door leaves at eye and torso height`);
 for(const node of graph.nodes.values())assert.ok(node.position.every(Number.isFinite));
 world.traverse(node=>{if(node.isMesh)for(const value of node.geometry.attributes.position.array)assert.ok(Number.isFinite(value));});
 for(const scene of Object.values(scenes))for(const detail of scene.details){assert.ok(detail.text);assert.ok(detail.source);if(detail.action)assert.ok(scenes[detail.action]);}
 passed('geometry and detail content are valid');
 const privy=model.root.getObjectByName('yard-privy');
 const privyPosition=privy.getWorldPosition(new THREE.Vector3());
 const privyFront=new THREE.Vector3(0,0,-1).transformDirection(privy.matrixWorld);
 assert.ok(privyPosition.x<-.9&&privyPosition.z>8.4,'privy belongs in the rear side corner');
 assert.ok(privyFront.x>.99,'privy door must face into the yard');
 for(const name of ['bedroom','gideon']){
  const bed=model.interiors[name].root.getObjectByName('bed');
  const head=bed.localToWorld(new THREE.Vector3(0,.9,.98));
  assert.ok(Math.abs(head.x+2.23)<.15,'headboard must back against the side wall');
 }
 assert.ok(model.hall.root.getObjectByName('back-door-satchel-peg'),'satchel peg belongs beside the hall back door');
 const windowHit=new THREE.Raycaster(new THREE.Vector3(-1,1,3.5),new THREE.Vector3(0,0,1)).intersectObject(model.interiors.kitchen.root,true).find(visibleMesh);
 assert.ok(windowHit&&windowHit.point.z>4.1,'cupboard must not block the lower kitchen window');
 assert.equal(model.root.getObjectByName('door-pencil-marks').parent.name,'door-leaf');
 passed('yard orientation, bed headboards, kitchen window clearance and door fixtures checked');
 source=(await fs.readFile(path.join(root,'site/tour/ink-renderer.js'),'utf8')).replace("from '../vendor/three/Projector.js'",`from '${url(path.join(scratch,'Projector.mjs'))}'`);
 await fs.writeFile(path.join(scratch,'ink.mjs'),source);
 const {InkRenderer}=await import(url(path.join(scratch,'ink.mjs')));
 const renderer=new InkRenderer();renderer.setSize(200,160);
 const testWorld=new THREE.Scene(),camera=new THREE.PerspectiveCamera(50,1.25,.08,100);camera.position.set(0,0,5);camera.lookAt(0,0,0);
 const wall=new THREE.Mesh(new THREE.PlaneGeometry(8,8),new THREE.MeshBasicMaterial({color:0xffffff}));wall.position.z=-1;
 const object=new THREE.Mesh(new THREE.BoxGeometry(1,1,.5),new THREE.MeshBasicMaterial({color:0x222222}));testWorld.add(object,wall);
 renderer.render(testWorld,camera);
 const pixel=(Math.floor(frame.height/2)*frame.width+Math.floor(frame.width/2))*4;
 assert.ok(frame.data[pixel]<80,'near object must hide wall, regardless of render order');
 testWorld.remove(object);renderer.render(testWorld,camera);assert.ok(frame.data[pixel]>230,'wall must appear when near object removed');
 passed('fallback uses per-pixel depth; walls cannot paint over nearer furniture');
 const html=await fs.readFile(path.join(root,'site/tour/index.html'),'utf8');
 for(const name of Object.keys(scenes))assert.ok(html.includes(`data-scene="${name}"`));
 for(const id of ['overview-controls','begin-walk','waypoints','viewpoints','room-exits'])assert.ok(html.includes(`id="${id}"`));
 for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
  if(/^(https?:|data:)/.test(match[1]))continue;
  await fs.access(fileURLToPath(new URL(match[1],pathToFileURL(path.join(root,'site/tour/index.html')))));
 }
 passed('overview, accessible walking controls and local page assets are present');
 console.log(`${checks} checks passed. Browser gestures and layout still require a real browser check.`);
}finally{delete globalThis.document;await fs.rm(scratch,{recursive:true,force:true});}
