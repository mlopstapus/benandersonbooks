import * as THREE from 'three';
import { RoundedBoxGeometry } from '../vendor/three/RoundedBoxGeometry.js';

// Geometry is an interpretation; manuscript-derived objects are documented in house-notes.js.
const ink = new THREE.LineBasicMaterial({ color:0x302e2b, transparent:true, opacity:.58 });
const darkInk = new THREE.LineBasicMaterial({ color:0x292825, transparent:true, opacity:.84 });
let seed = 2606;
const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const materials = new Map();
let atlas=null;
let softwareGeometry=false;

export async function prepareDrawingTextures() {
  let timeout;
  try {
    atlas=await new Promise((resolve,reject)=>{
      const image=new Image();
      timeout=setTimeout(()=>reject(new Error('Drawing texture load timed out')),8000);
      image.onload=()=>resolve(image);image.onerror=reject;
      image.src=new URL('./assets/ink-surfaces.png',import.meta.url).href;
    });
  }catch(error){console.warn('Using the built-in pen textures:',error);}
  finally{clearTimeout(timeout);}
}

function texture(kind) {
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 512;
  const c = canvas.getContext('2d');
  const quadrant={brick:[0,0],slate:[1,0],wood:[0,1],plaster:[1,1]}[kind];
  if(atlas&&quadrant){
    const half=atlas.width/2;
    c.drawImage(atlas,quadrant[0]*half+3,quadrant[1]*half+3,half-6,half-6,0,0,512,512);
    const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=4;return t;
  }
  c.fillStyle = {brick:'#ddd7c8',slate:'#b0aa9d',wood:'#d7cdb8',floorboard:'#d7cdb8',plaster:'#eee9dc',stone:'#d1cbbb',iron:'#716d62',leather:'#b8b4a8',cloth:'#e4ddcc'}[kind] || '#e6dfce';
  c.fillRect(0,0,512,512);
  for(let i=0;i<6500;i++) { const v = random()>.5 ? 255 : 30; c.fillStyle=`rgba(${v},${v},${v},${random()*.035})`; c.fillRect(random()*512,random()*512,1+random()*2,1); }
  c.lineWidth = 1; c.strokeStyle='#5e58494d';
  const line = (x,y,a,b) => { c.beginPath();c.moveTo(x,y);c.lineTo(a,b);c.stroke(); };
  if(kind==='brick') {
    for(let row=0;row<16;row++) {
      const y=row*32; line(0,y,512,y+.7);
      for(let j=-1;j<8;j++) {
        const x=j*86+(row%2)*43;line(x,y,x,y+32);
        c.fillStyle=`rgba(65,52,34,${random()*.07})`;c.fillRect(x+3,y+3,80,26);
        if(random()>.32){for(let k=0;k<6;k++)line(x+9+k*8,y+25,x+17+k*8,y+14);}
      }
    }
  } else if(kind==='slate') {
    for(let row=0;row<16;row++) {let y=row*32;line(0,y,512,y);for(let j=-1;j<12;j++) {let x=j*48+(row%2)*24;line(x,y,x,y+32);line(x+4,y+27,x+18,y+5);}}
  } else if(kind==='wood') {
    for(let x=0;x<512;x+=85){line(x,0,x,512);for(let i=0;i<12;i++){c.strokeStyle='#5e584925';let px=x+random()*80;c.beginPath();c.moveTo(px,0);c.bezierCurveTo(px+15,170,px-8,340,px+2,512);c.stroke();}}
  } else if(kind==='stone') {
    for(let row=0;row<8;row++){let y=row*64;line(0,y,512,y);for(let j=-1;j<6;j++){let x=j*100+(row%2)*50;line(x,y,x,y+64);for(let k=0;k<5;k++)line(x+5+k*9,y+52,x+19+k*9,y+37);}}
  } else {
    c.strokeStyle='#5e584920';
    for(let i=0;i<400;i++){let x=random()*512,y=random()*512;line(x,y,x+5+random()*14,y-6-random()*12);}
  }
  const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=4;return t;
}
function material(kind='plaster',color=0xffffff) {
  const key=kind+color;
  if(!materials.has(key)){
    const mat=new THREE.MeshStandardMaterial({map:texture(kind),color:kind==='iron'?0x656560:new THREE.Color(color).lerp(new THREE.Color(0xffffff),.4),roughness:1,metalness:0});
    mat.userData.inkSurface=kind;
    // Keep paper highlights and draw the volume with pen hatching, rather than smooth plastic shading.
    mat.onBeforeCompile=shader=>{
      shader.vertexShader='varying vec3 vPenNormal;\n'+shader.vertexShader;
      shader.vertexShader=shader.vertexShader.replace('#include <beginnormal_vertex>','#include <beginnormal_vertex>\nvPenNormal=normalize(mat3(modelMatrix)*objectNormal);');
      shader.fragmentShader='varying vec3 vPenNormal;\n'+shader.fragmentShader;
      shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',`
        float faceLight=clamp(dot(normalize(vPenNormal),normalize(vec3(-0.45,0.8,-0.5))),0.0,1.0);
        float paperTone=clamp(dot(diffuseColor.rgb,vec3(0.299,0.587,0.114)),0.0,1.0);
        float illumination=dot(outgoingLight,vec3(0.299,0.587,0.114))/max(paperTone,0.05);
        float shade=max(1.0-faceLight,clamp(1.0-illumination,0.0,1.0));
        vec2 pen=gl_FragCoord.xy;
        float waviness=sin(pen.y*0.043)*0.7+sin(pen.x*0.019)*0.45;
        float strokeA=1.0-smoothstep(0.28,1.05,abs(mod(pen.x+pen.y*1.31+waviness,7.0)-3.5));
        float strokeB=1.0-smoothstep(0.22,0.9,abs(mod(pen.x-pen.y*0.83+waviness,9.0)-4.5));
        float hatch=strokeA*smoothstep(0.45,0.95,shade)*0.10+strokeB*smoothstep(0.8,1.0,shade)*0.05;
        float drawnTone=pow(paperTone,0.8)*(1.0-shade*0.18);
        float value=clamp(1.0-(1.0-drawnTone)*0.97-hatch,0.0,1.0);
        outgoingLight=mix(vec3(0.018),vec3(0.925,0.918,0.895),value);
        #include <opaque_fragment>
      `);
    };
    mat.customProgramCacheKey=()=>'ashcombe-pen-and-wash-v2';
    materials.set(key,mat);
  }
  return materials.get(key);
}
function edge(mesh, strong=false) {
  const raw=new THREE.EdgesGeometry(mesh.geometry,42),positions=raw.attributes.position,drawn=[];
  for(let i=0;i<positions.count;i+=2){
    const a=new THREE.Vector3().fromBufferAttribute(positions,i),b=new THREE.Vector3().fromBufferAttribute(positions,i+1),length=a.distanceTo(b);
    const pieces=Math.max(1,Math.min(12,Math.ceil(length/.23)));
    for(let j=0;j<pieces;j++){
      if(pieces>4&&random()<.12)continue;
      for(const t of [j/pieces,(j+.92)/pieces]){
        const p=a.clone().lerp(b,t),w=Math.min(.012,length*.018);p.x+=(random()-.5)*w;p.y+=(random()-.5)*w;p.z+=(random()-.5)*w;drawn.push(p.x,p.y,p.z);
      }
    }
  }
  raw.dispose();const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(drawn,3));
  mesh.add(new THREE.LineSegments(geometry,strong?darkInk:ink));return mesh;
}
function box(parent,x,y,z,w,h,d,kind='plaster',color=0xffffff,outline=true) {
  const round=!softwareGeometry&&kind!=='brick'&&Math.min(w,h,d)>.08&&Math.max(w,h,d)<3;
  const geometry=round?new RoundedBoxGeometry(w,h,d,1,Math.min(.045,Math.min(w,h,d)*.17)):new THREE.BoxGeometry(w,h,d);
  const uv=geometry.attributes.uv,position=geometry.attributes.position,normal=geometry.attributes.normal;
  const tile={brick:[1.7,1.1],wood:[1.2,2.6],slate:[1.7,1.5],stone:[2.2,2.2],plaster:[3,3],cloth:[1,1],iron:[1,1]}[kind]||[1,1];
  for(let i=0;i<uv.count;i++){
    const nx=Math.abs(normal.getX(i)),ny=Math.abs(normal.getY(i)),nz=Math.abs(normal.getZ(i));
    const u=nx>ny&&nx>nz?position.getZ(i):position.getX(i),v=ny>nx&&ny>nz?position.getZ(i):position.getY(i);
    uv.setXY(i,u/tile[0],v/tile[1]);
  }
  const mesh=new THREE.Mesh(geometry,material(kind,color));mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;if(outline&&!round)edge(mesh);parent.add(mesh);return mesh;
}
function cylinder(parent,x,y,z,r1,r2,h,kind='iron',segments=12) {
  const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,segments),material(kind));mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;edge(mesh);parent.add(mesh);return mesh;
}
function stroke(parent,points,strong=false) {
  const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p))),strong?darkInk:ink);parent.add(line);return line;
}
function label(parent,text,x,y,z,width,height,rotation=0,size=50) {
  if(softwareGeometry)return; // SVG cannot display a canvas texture; do not leave a blank plaque.

  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=256;const c=canvas.getContext('2d');
  c.fillStyle='#e9e3d4';c.fillRect(0,0,512,256);c.strokeStyle='#665e4d';c.lineWidth=5;c.strokeRect(9,9,494,238);c.fillStyle='#514b3e';c.font=`${size}px Georgia`;c.textAlign='center';c.textBaseline='middle';c.fillText(text,256,128,470);
  const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;
  const p=new THREE.Mesh(new THREE.PlaneGeometry(width,height),new THREE.MeshBasicMaterial({map:t}));p.position.set(x,y,z);p.rotation.y=rotation;parent.add(p);return p;
}
function ring(parent,x,y,z,r,rotation=[0,0,0],tube=.02) {
  const mesh=new THREE.Mesh(new THREE.TorusGeometry(r,tube,5,20),material('iron'));mesh.position.set(x,y,z);mesh.rotation.set(...rotation);parent.add(mesh);return mesh;
}
function window(parent,x,y,z,rear=false,w=1.2,h=1.65) {
  const g=new THREE.Group();g.position.set(x,y,z);if(!rear)g.rotation.y=Math.PI;parent.add(g);
  box(g,0,0,0,w,h,.045,'iron',0xbbb8ad);
  for(const side of [-1,1])box(g,side*(w/2+.035),0,.04,.09,h+.16,.13,'wood');
  for(const side of [-1,1])box(g,0,side*(h/2+.025),.04,w+.18,.09,.13,'wood');
  box(g,0,0,.08,w,.055,.05,'wood');box(g,0,0,.085,.04,h,.04,'wood');
  box(g,0,-h/2-.1,.03,w+.35,.12,.28,'stone');
  for(const side of [-1,1]){const curtain=box(g,side*w*.34,0,.105,w*.25,h-.13,.025,'cloth');for(let i=0;i<5;i++)stroke(curtain,[[-w*.1+i*.04,-h*.4,.018],[-w*.1+i*.04+.015,h*.4,.018]]);}
  stroke(g,[[-w*.34,-h*.18,.11],[-w*.05,h*.3,.11]]);
  return g;
}
function door(parent,x,z,rear=false) {
  const g=new THREE.Group();g.position.set(x,0,z);if(!rear)g.rotation.y=Math.PI;parent.add(g);
  box(g,0,1.07,0,.93,2.14,.09,'wood',0xada596);
  for(const y of [.55,1.48])for(const xx of [-.22,.22])box(g,xx,y,.052,.33,.62,.025,'wood',0xbdb6a7);
  for(const xx of [-.53,.53])box(g,xx,1.12,.02,.12,2.25,.17,'stone');
  box(g,0,2.25,.02,1.18,.16,.2,'stone');box(g,0,.035,.12,1.15,.07,.38,'stone');
  const handle=cylinder(g,-.32,1.02,.1,.04,.04,.08);handle.rotation.x=Math.PI/2;
  if(rear){box(g,-.27,1.19,.11,.25,.035,.03,'iron');box(g,.25,.81,.11,.22,.025,.03,'iron');}
  return g;
}
function openDoor(group) {
  const hinge=new THREE.Group();hinge.position.x=-.465;
  const leaf=group.children.filter(child=>child.isMesh&&child.position.y<2.15&&Math.abs(child.position.x)<.5&&child.position.z>=0);
  group.add(hinge);
  for(const child of leaf){child.position.x+=.465;hinge.add(child);}
  hinge.rotation.y=-1.35;hinge.name='door-leaf';return hinge;
}

function markedBackDoor(parent,x,z){
  const back=door(parent,x,z,false);back.name='house-back-door';back.userData.action='yard';
  const leaf=openDoor(back),marks=new THREE.Group();marks.name='door-pencil-marks';marks.position.set(.465,0,.08);leaf.add(marks);
  for(let row=0;row<54;row++){const count=row===53?3:7;for(let col=0;col<count;col++){const x=-.28+col*.037,y=1.97-row*.021;stroke(marks,[[x,y,0],[x+.002,y-.014,0]]);}if(count===7)stroke(marks,[[-.3,1.963-row*.021,-.001],[-.025,1.961-row*.021,-.001]]);}
  return back;
}

// A shared floor plan. Room origins are real positions, not interchangeable scene sets.
export const roomOrigins={parlor:[0,0,-3],kitchen:[0,0,1],gideon:[0,3.2,-3],bedroom:[0,3.2,1]};
function connectRooms(interiors){
  for(const [name,room] of Object.entries(interiors)){
    room.group.parent.position.set(...roomOrigins[name]);
    // Replace the side wall with an open, framed doorway into the same hall.
    const wall=room.walls.right;wall.clear();
    box(wall,2.3,1.4,-.23,.14,2.8,.4,'plaster');
    box(wall,2.3,1.4,2.32,.14,2.8,2.3,'plaster');
    box(wall,2.3,2.58,.6,.14,.44,1.25,'plaster');
    for(const z of [-.03,1.23])box(wall,2.3,1.16,z,.23,2.32,.07,'wood');
    box(wall,2.3,2.32,.6,.23,.08,1.34,'wood');
    // Keep the partition between front and back rooms; access is through the hall.
    const front=room.walls.front,rear=room.walls.rear;
    front.clear();
    if(name==='parlor'||name==='gideon'){
      for(const [x,width]of [[-1.98,.64],[1.15,2.3]])box(front,x,1.4,-.46,width,2.8,.16,'plaster');
      box(front,-.8,.36,-.46,1.7,.72,.16,'plaster');box(front,-.8,2.64,-.46,1.7,.32,.16,'plaster');
      window(front,-.8,1.6,-.34,true,1.6,1.72);
      rear.clear();box(rear,0,1.4,3.46,4.6,2.8,.16,'plaster');
    }else box(front,0,1.4,-.46,4.6,2.8,.16,'plaster');
  }
}
function connectedHall(){
  const hall=new THREE.Group(),walls=new THREE.Group(),upper=new THREE.Group();hall.add(walls,upper);
  box(hall,3.45,-.07,.5,2.3,.14,8,'wood');
  // Upper landing leaves the stairwell open and provides a clear passage beside it.
  box(upper,2.91,3.13,.5,1.08,.14,8,'wood');box(upper,4.0,3.13,3.58,1.2,.14,1.84,'wood');
  box(walls,4.65,3,.5,.16,6,8,'plaster');
  // Both exterior entrances open into the hall; the kitchen has a continuous rear wall.
  for(const z of [-3.5,4.5]){
    box(walls,2.5,1.4,z,.3,2.8,.16,'brick');box(walls,4.2,1.4,z,.9,2.8,.16,'brick');box(walls,3.2,2.57,z,1.1,.46,.16,'brick');
    box(walls,3.5,4.6,z,2.3,2.8,.16,'brick');
    if(z<0){const entry=door(walls,3.2,z,false);openDoor(entry);}
    else markedBackDoor(walls,3.2,4.42);
  }
  const peg=new THREE.Group();peg.name='back-door-satchel-peg';walls.add(peg);
  box(peg,4.52,1.68,3.75,.15,.07,.48,'wood');
  box(peg,4.42,1.25,3.71,.18,.44,.36,'wood',0xaaa18e);box(peg,4.317,1.35,3.71,.02,.15,.38,'wood');
  stroke(peg,[[4.44,1.46,3.56],[4.46,1.72,3.7],[4.44,1.46,3.86]],true);
  const coats=new THREE.Group();coats.name='hall-coat-rail';coats.position.set(4.5,0,-2.73);coats.rotation.y=-Math.PI/2;walls.add(coats);
  box(coats,0,1.8,0,1.05,.12,.08,'wood');
  for(const x of [-.36,0,.36])stroke(coats,[[x,1.82,.05],[x,1.72,.13],[x,1.76,.17]],true);
  garment(coats,0,1.75,.14,true);wovenRug(hall,3.2,-3.0,.84,.55,'entrance-mat');
  // Sixteen full treads rise to the landing, with an open aisle alongside.
  for(let i=0;i<16;i++){
    box(hall,4.0,(i+1)*.1,-1.8+i*.28,1.02,(i+1)*.2,.28,'wood');
    box(hall,4.0,(i+1)*.2+.015,-1.8+i*.28,1.08,.03,.30,'wood');
    if(i%2===0)cylinder(hall,3.48,(i+1)*.2+.45,-1.8+i*.28,.022,.025,.9,'wood');
  }
  const rail=box(hall,3.48,2.54,.3,.065,.065,5.45,'wood');rail.rotation.x=-Math.atan2(3.0,4.2);
  for(let i=0;i<9;i++)cylinder(upper,3.48,3.65,-1.6+i*.48,.022,.025,.9,'wood');
  box(upper,3.48,4.11,.32,.07,.07,4.4,'wood');
  return {root:hall,walls,upper};
}

function facade(parent,z,rear=false,neighbor=false) {
  const m=neighbor?0xf0ede5:0xffffff;
  // Separate masonry panels leave genuine openings for the doors and sash windows.
  box(parent,0,.37,z,4.6,.74,.24,'brick',m);
  box(parent,0,2.65,z,4.6,.64,.24,'brick',m);
  box(parent,-2.08,1.5,z,.44,1.55,.24,'brick',m);
  box(parent,.32,1.5,z,.72,1.55,.24,'brick',m);
  box(parent,2.1,1.5,z,.4,1.55,.24,'brick',m);
  // Remove masonry below the door, replacing the floor-level strip with two sides.
  parent.children[parent.children.length-5].visible=false;
  box(parent,-.85,.37,z,2.9,.74,.24,'brick',m);box(parent,2.1,.37,z,.4,.74,.24,'brick',m);
  box(parent,0,3.55,z,4.6,1.1,.24,'brick',m);box(parent,0,5.65,z,4.6,.7,.24,'brick',m);
  for(const x of [-2.12,0,2.12])box(parent,x,4.6,z,x===0?1.06:.36,1.0,.24,'brick',m);
  const upstairs=window(parent,-1.05,4.6,z+(rear?.14:-.14),rear,1.35,1.2);window(parent,1.35,4.6,z+(rear?.14:-.14),rear,.85,1.2);
  const downstairs=window(parent,-.98,1.52,z+(rear?.14:-.14),rear,1.55,1.5);
  if(!neighbor){upstairs.userData.action=rear?'bedroom':'gideon';downstairs.userData.action=rear?'kitchen':'parlor';}
  const entry=door(parent,1.35,z+(rear?.16:-.16),rear);if(!neighbor)entry.userData.action=rear?'kitchen':'parlor';
  box(parent,0,3.0,z,4.72,.12,.36,'stone');box(parent,0,5.98,z,4.82,.17,.38,'stone');
  if(!rear&&!neighbor)label(parent,'6',1.35,2.53,z-.135,.25,.28,Math.PI,140);
}
function roof(parent) {
  const vertices=new Float32Array([
    -2.45,6.1,-3.65, 2.45,6.1,-3.65, 2.45,7.65,0, -2.45,6.1,-3.65, 2.45,7.65,0,-2.45,7.65,0,
    -2.45,7.65,0,2.45,7.65,0,2.45,6.1,3.65,-2.45,7.65,0,2.45,6.1,3.65,-2.45,6.1,3.65,
    -2.45,6.1,-3.65,-2.45,7.65,0,-2.45,6.1,3.65,2.45,6.1,3.65,2.45,7.65,0,2.45,6.1,-3.65
  ]);
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(vertices,3));geo.computeVertexNormals();
  const uv=[];for(let i=0;i<vertices.length;i+=3)uv.push(vertices[i]/1.6,vertices[i+2]/1.3);geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
  const mat=material('slate');mat.side=THREE.DoubleSide;const mesh=new THREE.Mesh(geo,mat);mesh.castShadow=true;mesh.receiveShadow=true;edge(mesh);parent.add(mesh);
  box(parent,0,7.66,0,4.95,.08,.12,'stone');
  box(parent,-1.95,7.47,.8,.64,1.43,.8,'brick');box(parent,-1.95,8.2,.8,.79,.12,.93,'stone');
  for(const z of [.58,1.02]){cylinder(parent,-1.95,8.43,z,.13,.16,.36,'stone');cylinder(parent,-1.95,8.63,z,.17,.17,.06,'iron');}
}
function house(parent,x=0,neighbor=false) {
  const g=new THREE.Group();g.position.x=x;parent.add(g);
  box(g,0,3,0,4.6,6,6.8,'brick',neighbor?0xe9e6df:0xffffff);
  // The main mass lies just behind the front and rear facade detailing.
  facade(g,-3.48,false,neighbor);facade(g,3.48,true,neighbor);roof(g);
  for(const xx of [-2.29,2.29])box(g,xx,3,0,.1,6.1,7,'stone');
  box(g,1.35,.03,-3.83,1.5,.12,.6,'stone');
  cylinder(g,2.12,2.95,-3.65,.037,.037,5.9,'iron');
  return g;
}
function path(parent) {
  // Yard coordinates inherit the terrace scale; start directly outside the kitchen door.
  for(let i=0;i<7;i++)box(parent,1.344-(.694*i/6),.055,3.8+i*.61,.72,.04,.59,'stone');
  for(const x of [-.75,-.22,.31])box(parent,x,.055,7.15,.49,.04,.52,'stone');
}
function yard(parent) {
  box(parent,0,-.02,5.7,4.6,.11,4.3,'stone',0xe4dfd1);
  for(const x of [-2.27,2.27]){box(parent,x,.56,5.7,.12,1.12,4.4,'brick');box(parent,x,1.15,5.7,.2,.08,4.4,'stone');}
  box(parent,-1.08,.55,7.82,2.4,1.1,.14,'brick');box(parent,1.9,.55,7.82,.7,1.1,.14,'brick');
  // Open from a real hinge at the edge of the gate opening, not around its centre.
  const gate=new THREE.Group();gate.name='yard-gate';gate.position.set(.14,0,7.79);gate.rotation.y=-.9;gate.userData.action='street';parent.add(gate);
  for(let i=0;i<7;i++)box(gate,.08+i*.18,.65,0,.15,1.3,.07,'wood',0xc3bcae);
  for(const y of [.3,1])box(gate,.62,y,-.07,1.25,.08,.07,'wood');const brace=box(gate,.62,.67,-.08,1.34,.055,.06,'wood');brace.rotation.z=.53;
  path(parent);
  const supplies=new THREE.Group();supplies.name='yard-household-supplies';supplies.position.set(-1.7,0,4.3);parent.add(supplies);
  vessel(supplies,0,.045,0,[[.14,0],[.19,.33],[.18,.35],[.16,.33],[.12,.025],[0,.025]],'iron');ring(supplies,0,.44,0,.17,[0,0,0],.012);
  box(supplies,.32,.12,0,.22,.055,.10,'wood');for(let i=0;i<7;i++)stroke(supplies,[[.23+i*.03,.10,0],[.23+i*.03,.055,.02]]);
  const brushHandle=cylinder(supplies,.32,.55,0,.013,.015,.87,'wood');brushHandle.rotation.z=-.1;
  for(let i=0;i<5;i++){const stick=cylinder(supplies,-.02+(i%2)*.06,.08+Math.floor(i/2)*.055,.48,.022,.03,.55,'wood',7);stick.rotation.z=Math.PI/2;stick.rotation.y=.1*(i%2);}

  // The inferred privy sits against the rear/side boundaries; its door faces the clear yard.
  const privy=new THREE.Group();privy.name='yard-privy';privy.position.set(-1.6,0,7.15);privy.rotation.y=-Math.PI/2;parent.add(privy);
  box(privy,0,.92,0,1,1.84,1.08,'wood',0xbcb5a5);box(privy,0,1.88,0,1.18,.09,1.26,'slate');
  box(privy,0,.92,-.555,.72,1.65,.04,'wood');box(privy,.24,.91,-.59,.07,.04,.03,'iron');
  box(privy,0,.055,-.72,.84,.11,.31,'stone');
  for(let i=0;i<28;i++){const x=-2.1+random()*.3,z=3.9+random()*3.7;stroke(parent,[[x,.02,z],[x+.04,.13+random()*.12,z-.03],[x+.1,.2,z-.06]]);}
}
function streetLamp(parent,x,z) {
  cylinder(parent,x,1.87,z,.045,.08,3.74,'iron');cylinder(parent,x,.1,z,.14,.17,.2,'iron');
  box(parent,x,3.88,z,.38,.48,.38,'plaster',0xece7d7);
  for(const a of [-1,1])for(const b of [-1,1])box(parent,x+a*.19,3.9,z+b*.19,.025,.5,.025,'iron');
  const cap=new THREE.Mesh(new THREE.ConeGeometry(.34,.22,4),material('iron'));cap.position.set(x,4.24,z);cap.rotation.y=Math.PI/4;parent.add(cap);edge(cap);cylinder(parent,x,4.42,z,.015,.035,.14);
}
function chair(parent,x,z,rotation=0) {
  const g=new THREE.Group();g.name='wooden-chair';g.position.set(x,0,z);g.rotation.y=rotation;parent.add(g);
  box(g,0,.45,0,.48,.075,.47,'wood');for(const a of [-1,1])for(const b of [-1,1])box(g,a*.19,.22,b*.18,.055,.44,.055,'wood');
  for(const a of [-1,1])box(g,a*.19,.81,.19,.055,.75,.055,'wood');box(g,0,1.07,.19,.45,.11,.05,'wood');
  // Both ends of every spindle meet a rail; none hang above the seat.
  box(g,0,.55,.19,.4,.075,.055,'wood');
  for(const x of [-.1,0,.1])box(g,x,.81,.19,.025,.52,.025,'wood');
  return g;
}
function cup(parent,x,y,z) {
  cylinder(parent,x,y+.08,z,.075,.06,.16,'plaster');cylinder(parent,x,y+.163,z,.061,.061,.003,'iron');ring(parent,x+.09,y+.09,z,.05,[0,0,0],.012);
}
function clock(parent,x,y,z) {
  const g=new THREE.Group();g.position.set(x,y,z);parent.add(g);
  box(g,0,.2,0,.44,.46,.15,'wood',0xb8af9c);box(g,0,-.04,0,.55,.07,.23,'wood');
  const face=cylinder(g,0,.23,.09,.17,.17,.022,'plaster',32);face.rotation.x=Math.PI/2;
  ring(g,0,.23,.112,.174,[0,0,0],.012);stroke(g,[[0,.23,.125],[0,.34,.125]],true);stroke(g,[[0,.23,.126],[.09,.2,.126]],true);
  for(let i=0;i<12;i++){const a=i*Math.PI/6;stroke(g,[[Math.sin(a)*.135,.23+Math.cos(a)*.135,.126],[Math.sin(a)*.15,.23+Math.cos(a)*.15,.126]]);}
  return g;
}
function kitchen(parent) {
  const group=new THREE.Group();parent.add(group);
  box(group,0,-.08,1.55,4.7,.16,3.85,'stone');
  // Individual floor flags add irregular edges without a photographic texture.
  for(let ix=0;ix<7;ix++)for(let iz=0;iz<6;iz++)box(group,-1.98+ix*.66,.004,-.08+iz*.62,.64,.025,.60,'stone',0xffffff,false);
  const walls={};
  walls.left=new THREE.Group();group.add(walls.left);box(walls.left,-2.3,1.4,1.5,.16,2.8,3.9,'plaster');
  walls.right=new THREE.Group();group.add(walls.right);box(walls.right,2.3,1.4,1.5,.16,2.8,3.9,'plaster');
  walls.front=new THREE.Group();group.add(walls.front);
  box(walls.front,-.6,1.4,-.43,3.3,2.8,.15,'plaster');box(walls.front,2.18,1.4,-.43,.26,2.8,.15,'plaster');box(walls.front,1.35,2.52,-.43,1.4,.56,.15,'plaster');
  for(const x of [.75,1.96])box(walls.front,x,1.12,-.34,.07,2.24,.09,'wood');
  walls.rear=new THREE.Group();group.add(walls.rear);
  // Aperture edges overlap the window casing; no daylight slits around the frame.
  box(walls.rear,-2.05,1.4,3.48,.5,2.8,.16,'plaster');
  box(walls.rear,1.05,1.4,3.48,2.5,2.8,.16,'plaster');
  box(walls.rear,-1,.4,3.48,1.6,.8,.16,'plaster');
  box(walls.rear,-1,2.65,3.48,1.6,.3,.16,'plaster');
  const sash=window(walls.rear,-1,1.65,3.4,false,1.55,1.65);sash.name='kitchen-window';
  for(const x of [-2.2,2.2])box(group,x,.09,1.5,.08,.17,3.8,'wood');
  // Range against the left wall, with oven, fire bars, flue, damper, rail, and kettle.
  const range=new THREE.Group();range.position.set(-1.74,0,1.35);range.rotation.y=Math.PI/2;group.add(range);
  box(range,0,.48,0,1.25,.96,.65,'iron');box(range,0,.99,0,1.36,.07,.76,'iron');box(range,0,1.12,-.31,1.38,.22,.06,'iron');
  for(const x of [-.34,.34]){const plate=cylinder(range,x,1.035,0,.23,.23,.02,'iron',24);}
  box(range,.32,.47,.35,.5,.55,.04,'iron');box(range,.33,.63,.39,.26,.035,.035,'iron');
  box(range,-.35,.5,.35,.46,.44,.04,'plaster',0xb0a899);for(let i=0;i<6;i++)box(range,-.56+i*.085,.5,.395,.025,.45,.025,'iron');
  box(range,0,.15,.49,1.38,.12,.17,'iron');
  const rail=cylinder(range,0,.91,.45,.018,.018,1.3,'iron');rail.rotation.z=Math.PI/2;
  cylinder(range,-.43,1.77,-.24,.085,.085,1.45,'iron');box(range,-.28,1.53,-.23,.22,.025,.025,'iron');
  const kettle=cylinder(range,.22,1.21,.04,.14,.2,.31,'iron',20);cylinder(range,.22,1.38,.04,.14,.14,.035,'iron');
  ring(range,.22,1.55,.04,.17,[0,0,0],.018);const spout=cylinder(range,.46,1.28,.04,.035,.065,.26,'iron');spout.rotation.z=-.95;
  const scuttle=cylinder(group,-1.57,.17,2.16,.18,.14,.33,'iron');scuttle.rotation.z=.1;ring(group,-1.57,.39,2.16,.17,[0,0,0],.016);
  for(let i=0;i<8;i++)box(group,-1.71+random()*.26,.34,2.04+random()*.23,.07,.07,.08,'iron');
  stroke(group,[[-2.05,.1,2.23],[-2.05,.84,2.23],[-2.0,.88,2.23]],true);
  // Shelf and clock are kept separate from the furniture so their silhouettes read clearly.
  box(group,-1.35,1.77,-.26,1.45,.06,.31,'wood');clock(group,-1.52,1.85,-.22);
  const pencil=box(group,-.99,1.82,-.17,.3,.018,.018,'wood');pencil.rotation.y=.2;
  for(const x of [-1.86,-.86])box(group,x,1.64,-.25,.05,.22,.16,'wood');
  // Table with cloth, plate, bread, cheese, lamp, jug and cup.
  const table=new THREE.Group();table.position.set(.12,0,1.3);group.add(table);
  box(table,0,.81,0,1.5,.09,.88,'wood');box(table,0,.7,0,1.37,.16,.76,'wood');
  for(const x of [-.58,.58])for(const z of [-.29,.29])box(table,x,.36,z,.075,.73,.075,'wood');
  const cloth=box(table,-.2,.867,.03,.64,.012,.6,'cloth');cloth.rotation.y=.1;
  cylinder(table,-.2,.89,.03,.22,.22,.018,'plaster',28);box(table,-.27,.93,.02,.19,.055,.12,'wood',0xe6d5ab);box(table,-.12,.932,.07,.1,.06,.1,'plaster',0xdcd4bb);
  cup(table,.53,.87,-.12);
  cylinder(table,.24,.92,.16,.1,.14,.1,'iron');cylinder(table,.24,1.06,.16,.035,.035,.19,'iron');
  cylinder(table,.24,1.24,.16,.075,.06,.28,'plaster');ring(table,.24,1.4,.16,.075,[Math.PI/2,0,0],.008);
  chair(group,.5,.52,Math.PI);chair(group,.1,2.15);
  // Cupboard backs onto the inner partition, below the shelf, leaving the sash unobstructed.
  const cupboard=new THREE.Group();cupboard.name='kitchen-cupboard';cupboard.position.set(-1.35,0,-.04);cupboard.rotation.y=Math.PI;group.add(cupboard);
  box(cupboard,0,.49,0,1.35,.98,.53,'wood',0xd0c5af);box(cupboard,0,1.01,0,1.44,.07,.64,'wood');
  for(const x of [-.32,.33]){box(cupboard,x,.5,-.285,.59,.76,.025,'wood');cylinder(cupboard,x,.6,-.323,.025,.025,.025).rotation.x=Math.PI/2;}
  cylinder(cupboard,-.48,1.195,0,.16,.2,.3,'plaster');cylinder(cupboard,-.48,1.365,0,.19,.19,.035,'plaster');cylinder(cupboard,-.48,1.405,0,.035,.035,.04,'iron');
  const jug=cylinder(cupboard,.48,1.195,0,.075,.12,.3,'plaster');ring(cupboard,.60,1.22,0,.1,[0,0,0],.018);
  basin(cupboard,.01,1.055,.02,.22);fabric(cupboard,.17,1.061,-.23,.27,.19,'cloth',1.055);
  chair(group,-.35,0,Math.PI);
  return {group,walls};
}

function emptyRoom(parent,exit,hearthBoards=false) {
  const group=new THREE.Group();parent.add(group);const walls={};
  box(group,0,-.04,1.5,4.65,.08,3.9,'wood');
  for(let i=0;i<12;i++){
    const z=-.32+i*.32;
    if(hearthBoards&&z>.65&&z<2.15){stroke(group,[[-2.22,.008,z],[-1.30,.008,z]]);stroke(group,[[-.16,.008,z],[2.22,.008,z+.008]]);}
    else stroke(group,[[-2.22,.008,z],[2.22,.008,z+.008]]);
    for(let j=0;j<4;j++){const x=-1.9+j*1.1+(i%2)*.3;if(hearthBoards&&x>-1.30&&x<-.16&&z<2.15&&z+.31>.65)continue;stroke(group,[[x,.009,z],[x,.009,z+.31]]);}

  }
  for(const [name,x] of [['left',-2.3],['right',2.3]]){walls[name]=new THREE.Group();group.add(walls[name]);box(walls[name],x,1.4,1.5,.14,2.8,3.95,'plaster');}
  walls.front=new THREE.Group();group.add(walls.front);
  box(walls.front,-.65,1.4,-.46,3.25,2.8,.15,'plaster');box(walls.front,2.2,1.4,-.46,.2,2.8,.15,'plaster');box(walls.front,1.37,2.55,-.46,1.5,.5,.15,'plaster');
  const entry=door(walls.front,1.38,-.38,true);entry.userData.action=exit;
  walls.rear=new THREE.Group();group.add(walls.rear);
  box(walls.rear,0,.37,3.46,4.6,.74,.15,'plaster');box(walls.rear,0,2.63,3.46,4.6,.34,.15,'plaster');
  box(walls.rear,-1.97,1.6,3.46,.66,1.72,.15,'plaster');box(walls.rear,1.17,1.6,3.46,2.26,1.72,.15,'plaster');
  window(walls.rear,-.8,1.6,3.35,false,1.6,1.72);
  for(const x of [-2.2,2.2])box(group,x,.08,1.5,.08,.16,3.8,'wood');
  return {group,walls};
}

function fabric(parent,x,y,z,width,length,kind='cloth',supportHeight=.018) {
  const geometry=new THREE.PlaneGeometry(width,length,18,24),positions=geometry.attributes.position;
  for(let i=0;i<positions.count;i++){
    const px=positions.getX(i),pz=positions.getY(i),edge=Math.pow(Math.abs(px)/(width*.5),5);
    positions.setXYZ(i,px,Math.max(supportHeight,y+.022*Math.sin(px*18+pz*4)+.014*Math.cos(pz*21)-edge*.08),pz);
  }
  geometry.computeVertexNormals();const mat=material(kind);mat.side=THREE.DoubleSide;
  const cloth=new THREE.Mesh(geometry,mat);cloth.position.set(x,0,z);cloth.castShadow=true;cloth.receiveShadow=true;parent.add(cloth);return cloth;
}

// Shaped objects remain curved in the software renderer as well as WebGL.
function cushion(parent,x,y,z,w,h,d,kind='cloth'){
  const geometry=new THREE.SphereGeometry(1,20,12),a=geometry.attributes.position;
  const soft=v=>Math.sign(v)*Math.pow(Math.abs(v),.48);
  for(let i=0;i<a.count;i++)a.setXYZ(i,soft(a.getX(i))*w/2,soft(a.getY(i))*h/2,soft(a.getZ(i))*d/2);
  geometry.computeVertexNormals();const mesh=new THREE.Mesh(geometry,material(kind));mesh.position.set(x,y,z);parent.add(mesh);
  stroke(mesh,Array.from({length:49},(_,i)=>{const t=i/48*Math.PI*2;return [soft(Math.cos(t))*w*.501,0,soft(Math.sin(t))*d*.501];}));return mesh;
}
function vessel(parent,x,y,z,profile,kind='plaster'){
  const mesh=new THREE.Mesh(new THREE.LatheGeometry(profile.map(p=>new THREE.Vector2(...p)),24),material(kind));mesh.position.set(x,y,z);parent.add(mesh);
  const rim=profile.reduce((a,b)=>b[1]>a[1]?b:a);
  stroke(mesh,Array.from({length:49},(_,i)=>[rim[0]*Math.cos(i/48*Math.PI*2),rim[1]+.001,rim[0]*Math.sin(i/48*Math.PI*2)]));return mesh;
}
function basin(parent,x,y,z,r=.24){
  const bowl=vessel(parent,x,y,z,[[0,0],[r*.6,0],[r*.86,.035],[r,.11],[r*.95,.12],[r*.88,.105],[r*.72,.035],[0,.025]]);bowl.name='washing-basin';return bowl;
}
function garment(parent,x,y,z,coat=false){
  // A shirt/coat silhouette with sleeves, shoulders and collar, bowed off its support.
  const outline=[[-.08,0],[-.21,-.035],[-.35,coat?-.61:-.43],[-.27,coat?-.64:-.46],[-.19,-.17],[-.20,coat?-1:-.51],[.2,coat?-.98:-.50],[.19,-.17],[.27,coat?-.64:-.46],[.35,coat?-.61:-.43],[.21,-.035],[.08,0],[0,-.07]];
  const shape=new THREE.Shape(outline.map(p=>new THREE.Vector2(...p))),geo=new THREE.ShapeGeometry(shape,3),a=geo.attributes.position;
  for(let i=0;i<a.count;i++)a.setZ(i,.02+.025*Math.cos(a.getX(i)*17+a.getY(i)*4));
  geo.computeVertexNormals();const mat=material(coat?'leather':'cloth');mat.side=THREE.DoubleSide;
  const mesh=new THREE.Mesh(geo,mat);mesh.position.set(x,y,z);parent.add(mesh);
  const line=points=>stroke(mesh,points.map(([a,b])=>[a,b,.027+.025*Math.cos(a*17+b*4)]));
  line([...outline,outline[0]]);line([[-.08,0],[-.09,-.14],[0,-.08],[.09,-.14],[.08,0]]);
  line([[0,-.08],[.01,-.3],[0,coat?-.97:-.49]]);
  for(const side of [-1,1]){line([[side*.18,-.15],[side*.12,-.3],[side*.16,coat?-.86:-.46]]);if(coat)line([[side*.06,-.52],[side*.17,-.51]]);}
  return mesh;
}
function wovenRug(parent,x,z,w,d,name='woven-rug'){
  const rug=new THREE.Group();rug.name=name;rug.position.set(x,0,z);parent.add(rug);
  const cloth=fabric(rug,0,.024,0,w,d,'cloth',.021);
  for(const inset of [.065,.10])stroke(rug,[[-w/2+inset,.055,-d/2+inset],[w/2-inset,.055,-d/2+inset],[w/2-inset,.055,d/2-inset],[-w/2+inset,.055,d/2-inset],[-w/2+inset,.055,-d/2+inset]],true);
  for(let i=0;i<Math.floor(w/.055);i++)for(const side of [-1,1]){const xx=-w/2+.04+i*.055;stroke(rug,[[xx,.022,side*d/2],[xx+.015,.018,side*(d/2+.055)]]);}
  for(let i=0;i<15;i++){const xx=-w*.37+i*w*.052;stroke(rug,[[xx,.052,-d*.36],[xx+.06,.052,-d*.31]]);stroke(rug,[[xx,.052,d*.31],[xx-.04,.052,d*.36]]);}
  return rug;
}
function dresser(parent,x,z,rotation=0,name='dresser',open=false){
  const g=new THREE.Group();g.name=name;g.position.set(x,0,z);g.rotation.y=rotation;parent.add(g);
  for(const xx of [-.45,.45])box(g,xx,.65,0,.08,1.12,.57,'wood');box(g,0,.65,.27,.9,1.12,.045,'wood');
  for(const yy of [.13,.49,.85,1.22])box(g,0,yy,0,.95,.05,.58,'wood');box(g,0,1.27,0,1.05,.07,.64,'wood');
  for(const xx of [-.4,.4])for(const zz of [-.21,.21])cylinder(g,xx,.09,zz,.035,.045,.18,'wood');
  for(let i=0;i<3;i++){
    const drawer=new THREE.Group();drawer.name=i===2&&open?'open-drawer':'drawer';drawer.position.set(0,.3+i*.36,i===2&&open?-.24:0);g.add(drawer);
    box(drawer,0,0,-.31,.84,.29,.045,'wood');
    for(const xx of [-.22,.22]){const knob=cylinder(drawer,xx,0,-.35,.028,.025,.04,'iron');knob.rotation.x=Math.PI/2;}
    if(i===2&&open){
      box(drawer,0,-.13,-.04,.81,.025,.5,'wood');for(const xx of [-.405,.405])box(drawer,xx,0,-.04,.025,.26,.5,'wood');
      for(const xx of [-.24,-.12])cushion(drawer,xx,-.055,-.14,.08,.06,.19);
      const collar=new THREE.Mesh(new THREE.TorusGeometry(.07,.014,5,20),material('cloth'));collar.rotation.x=Math.PI/2;collar.position.set(.13,-.04,-.14);drawer.add(collar);
      const toy=new THREE.Group();toy.name='tin-soldier';toy.position.set(.27,-.115,-.2);drawer.add(toy);
      for(const xx of [-.018,.018])cylinder(toy,xx,.03,0,.01,.012,.06,'iron',8);
      cylinder(toy,0,.075,0,.023,.018,.055,'iron',10);const head=new THREE.Mesh(new THREE.SphereGeometry(.019,10,8),material('iron'));head.position.y=.12;toy.add(head);
      for(const xx of [-.03,.03])cylinder(toy,xx,.07,0,.007,.009,.05,'iron',8);
    }
  }
  return g;
}
function washstand(parent){
  const g=new THREE.Group();g.name='gideon-washstand';g.position.set(-.78,0,3.05);g.rotation.y=Math.PI;parent.add(g);
  box(g,0,.88,0,1.08,.07,.6,'wood');box(g,0,.69,-.24,1,.28,.07,'wood');
  for(const xx of [-.45,.45])for(const zz of [-.23,.23])cylinder(g,xx,.42,zz,.025,.04,.84,'wood');
  box(g,0,.23,0,.95,.045,.46,'wood');basin(g,-.13,.92,0,.25);
  vessel(g,.36,.92,-.06,[[0,0],[.10,0],[.115,.08],[.09,.23],[.055,.29],[.065,.32],[.05,.32],[.043,.28],[.07,.21],[.095,.08],[0,.025]]);
  ring(g,.46,1.09,-.06,.07,[0,0,0],.012);fabric(g,0,.27,.02,.48,.28,'cloth',.255);
  const mirror=new THREE.Group();mirror.name='gideon-mirror';mirror.position.set(0,1.77,-.31);g.add(mirror);
  box(mirror,0,0,0,.74,.91,.04,'wood');box(mirror,0,0,.026,.65,.82,.015,'plaster');
  for(const xx of [-.35,.35])stroke(mirror,[[xx,-.43,.04],[xx,.43,.04]],true);
  stroke(mirror,[[-.23,-.22,.04],[.09,.30,.04]]);stroke(mirror,[[-.15,-.23,.04],[.16,.29,.04]]);
  return g;
}

function parlor(parent) {
  const room=emptyRoom(parent,'kitchen',true),g=room.group;
  const hearth=new THREE.Group();hearth.position.set(-1.88,0,1.4);hearth.rotation.y=Math.PI/2;g.add(hearth);
  box(hearth,0,.04,.1,1.9,.08,1.0,'stone');box(hearth,0,.66,-.16,1.55,1.32,.24,'plaster');
  const dark=new THREE.Mesh(new THREE.PlaneGeometry(.83,.95),new THREE.MeshBasicMaterial({color:0x35332e}));dark.position.set(0,.58,-.025);hearth.add(dark);
  for(const x of [-.61,.61]){cylinder(hearth,x,.63,.05,.1,.13,1.2,'stone',16);cylinder(hearth,x,1.21,.05,.14,.14,.09,'stone',16);}
  box(hearth,0,1.33,.04,1.8,.13,.5,'stone');box(hearth,0,1.43,.04,1.9,.07,.55,'stone');
  for(let i=0;i<7;i++)box(hearth,-.32+i*.105,.32,.16,.025,.43,.025,'iron');box(hearth,0,.12,.18,.8,.045,.25,'iron');
  clock(hearth,0,1.5,0);
  // Exposed hearth boards take precedence over the rug and inferred seating.
  const boards=new THREE.Group();boards.name='parlor-hearth-boards';g.add(boards);
  for(let i=0;i<5;i++){
    const z=.8+i*.3,board=box(boards,-.73,.0055,z,1.12,.013,.28,'floorboard',0xffffff,false);
    board.name=i===2?'parlor-loose-board':`hearth-board-${i+1}`;
    stroke(boards,[[-1.29,.014,z-.142],[-.17,.014,z-.142],[-.17,.014,z+.142],[-1.29,.014,z+.142]],i===2);
    for(let j=0;j<3;j++)stroke(boards,[[-1.22,.015,z-.09+j*.08],[-.94,.015,z-.08+j*.08],[-.48,.015,z-.09+j*.08],[-.23,.015,z-.08+j*.08]]);
    if(i===2)stroke(boards,[[-.205,.016,z-.09],[-.21,.016,z+.04],[-.225,.016,z+.09]],true);
  }
  wovenRug(g,.65,1.65,1.22,1.65,'parlor-rug');
  const sofa=new THREE.Group();sofa.name='parlor-settee';sofa.position.set(.5,0,3.0);g.add(sofa);
  for(const x of [-.84,.84])for(const z of [-.28,.27])cylinder(sofa,x,.14,z,.035,.05,.28,'wood');
  box(sofa,0,.32,0,1.86,.13,.65,'wood');
  for(const x of [-.43,.43]){cushion(sofa,x,.47,-.05,.86,.23,.64);const back=cushion(sofa,x,.84,.26,.88,.66,.21);back.rotation.x=-.08;}
  for(const x of [-.95,.95])cushion(sofa,x,.66,.01,.18,.43,.79);

  // The early-book parlor stays unused: no ending-era office, desk, or fire.
  const scuttle=cylinder(g,-1.87,.17,2.65,.18,.14,.33,'iron');ring(g,-1.87,.4,2.65,.17,[0,0,0],.016);
  return room;
}

// Continuous, shaped leather uppers retain their silhouette in both renderers.
// The boot faces local -Z; its cuff is open, with a separate thin sole and welt.
function wornBoot(parent,x,z,turn){
  const boot=new THREE.Group();boot.name='worn-laced-boot';boot.position.set(x,0,z);boot.rotation.y=turn;parent.add(boot);
  const profile=[ // y, half-width, half-length, centre along the foot
    [.048,.085,.205,-.025],[.073,.085,.203,-.025],[.105,.081,.184,-.015],
    [.135,.074,.143,.005],[.175,.065,.101,.035],[.215,.060,.072,.057],
    [.265,.061,.065,.065],[.32,.067,.067,.067],[.385,.074,.068,.065]
  ];
  function point(row,angle,offset=0){
    const [y,rx,rz,cz]=row;
    // Uneven leather, rather than a mathematically perfect cylinder.
    const wrinkle=1+.022*Math.sin(angle*3+y*47)+.012*Math.cos(angle*5-y*61);
    return [(rx+offset)*Math.cos(angle)*wrinkle,y,cz+(rz+offset)*Math.sin(angle)*wrinkle];
  }
  function shell(rows,kind){
    const vertices=[],uvs=[],indices=[],segments=28;
    rows.forEach((row,j)=>{for(let i=0;i<=segments;i++){vertices.push(...point(row,i/segments*Math.PI*2));uvs.push(i/segments,j/(rows.length-1));}});
    for(let j=0;j<rows.length-1;j++)for(let i=0;i<segments;i++){
      const a=j*(segments+1)+i,b=a+segments+1;indices.push(a,b,a+1,b,b+1,a+1);
    }
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geometry.setIndex(indices);geometry.computeVertexNormals();
    const mesh=new THREE.Mesh(geometry,material(kind));mesh.castShadow=true;mesh.receiveShadow=true;boot.add(mesh);return mesh;
  }
  shell([[.022,.089,.210,-.025],[.048,.089,.210,-.025]],'iron');
  shell([...profile,[.385,.059,.052,.065],[.349,.056,.049,.065]],'leather');
  const opening=new THREE.Mesh(new THREE.CircleGeometry(1,28),material('iron'));opening.rotation.x=-Math.PI/2;opening.scale.set(.057,.05,1);opening.position.set(0,.348,.065);boot.add(opening);
  for(const row of [[.051,.089,.210,-.025],profile.at(-1)]){
    stroke(boot,Array.from({length:57},(_,i)=>point(row,i/56*Math.PI*2,.001)),true);
  }
  // Side seams and the curved toe cap follow the surface, not a bounding box.
  for(const angle of [0,Math.PI,Math.PI/2])stroke(boot,profile.map(row=>point(row,angle,.0015)));
  stroke(boot,Array.from({length:22},(_,i)=>point(profile[2],Math.PI+i/21*Math.PI,.0015)));
  function front(y,x){
    let i=1;while(i<profile.length-1&&profile[i][0]<y)i++;
    const a=profile[i-1],b=profile[i],t=(y-a[0])/(b[0]-a[0]),row=a.map((v,k)=>v+(b[k]-v)*t);
    const angle=-Math.acos(x/row[1]);return point(row,angle,.003);
  }
  for(const side of [-1,1])stroke(boot,[.15,.18,.22,.26,.30,.34,.377].map(y=>front(y,side*.032)));
  for(let i=0;i<6;i++){
    const y=.17+i*.032;
    stroke(boot,[front(y,-.027),front(y+.012,0),front(y+.022,.027)],true);
    stroke(boot,[front(y,.027),front(y+.012,0),front(y+.022,-.027)],true);
  }
  // Sparse broken pen marks describe worn, creased leather without filling it black.
  for(const y of [.11,.125,.24,.29])for(const side of [-1,1]){
    const theta=side<0?Math.PI:0,row=profile.reduce((a,b)=>Math.abs(b[0]-y)<Math.abs(a[0]-y)?b:a);
    stroke(boot,[-.22,-.08,.08,.19].map(t=>point([y,row[1],row[2],row[3]],theta+t,.002)));
  }
  return boot;
}

function bedroom(parent,adult=false) {
  const room=emptyRoom(parent,adult?'bedroom':'kitchen'),g=room.group;
  // Headboard against the side wall, feet towards the room; keep the rear sash clear.
  const bed=new THREE.Group();bed.name='bed';bed.position.set(-1.16,0,1.8);bed.rotation.y=-Math.PI/2;g.add(bed);
  box(bed,0,.4,0,1.12,.18,1.98,'wood');box(bed,0,.56,0,1.08,.18,1.92,'cloth');
  for(const x of [-.55,.55])for(const z of [-.98,.98]){cylinder(bed,x,.48,z,.045,.055,.9,'wood');const finial=new THREE.Mesh(new THREE.SphereGeometry(.07,12,8),material('wood'));finial.position.set(x,.97,z);bed.add(finial);}
  box(bed,0,.9,.98,1.1,.35,.055,'wood');box(bed,0,.7,-.98,1.1,.24,.055,'wood');
  const pillow=cushion(bed,0,.74,.64,.78,.16,.37);pillow.rotation.y=.06;
  fabric(bed,0,.7,adult?-.12:-.46,1.2,adult?1.62:.86,'cloth',.665);
  if(adult){
    const chest=new THREE.Group();chest.name='quilt-chest';chest.position.set(1.8,0,2.6);chest.rotation.y=Math.PI/2;g.add(chest);
    box(chest,0,.31,0,1.1,.62,.65,'wood');box(chest,0,.66,0,1.16,.1,.71,'wood');
    for(const x of [-.41,.41])box(chest,x,.34,-.36,.065,.51,.025,'iron');
    box(chest,0,.49,-.37,.09,.13,.025,'iron');fabric(chest,0,.75,0,.68,.5,'cloth',.72);
    washstand(g);dresser(g,1.2,-.04,Math.PI,'gideon-dresser');
    const seat=chair(g,1.97,1.45,Math.PI/2);fabric(seat,0,.53,0,.40,.33,'cloth',.50);
    return room;
  }
  const seat=chair(g,.45,3.05);garment(seat,0,1.1,.145);
  // The back sits against the right-hand skirting; drawers open towards the room.
  dresser(g,1.88,2.1,Math.PI/2,'callum-dresser',true);
  const book=box(g,-.74,.735,3.15,.35,.055,.23,'wood');book.rotation.y=.15;box(g,-.74,.73,3.15,.31,.037,.23,'plaster');
  box(book,.055,.029,.015,.115,.003,.09,'plaster');for(let i=0;i<3;i++)stroke(book,[[.01,.032,-.012+i*.024],[.095,.032,-.012+i*.024]]);

  const boots=new THREE.Group();boots.name='boots-by-wall';boots.position.set(.6,0,-.18);boots.rotation.y=Math.PI;g.add(boots);
  wornBoot(boots,-.12,0,-.08);wornBoot(boots,.12,.025,.09);
  return room;
}

function batchInk(root,excluded=new Set()) {
  // Hundreds of little pen strokes become two draw calls per static group.
  // Walls are batched separately so the kitchen's cutaway can still hide them.
  root.updateWorldMatrix(true,true);
  const inverse=root.matrixWorld.clone().invert(),batches=new Map(),oldLines=[];
  const point=new THREE.Vector3();
  function collect(object) {
    if(excluded.has(object)||!object.visible)return;
    if(object.isLine) {
      let vertices=batches.get(object.material);if(!vertices){vertices=[];batches.set(object.material,vertices);}
      const position=object.geometry.attributes.position;
      const step=object.isLineSegments?2:1;
      for(let i=0;i<position.count-1;i+=step)for(const index of [i,i+1]) {
        point.fromBufferAttribute(position,index).applyMatrix4(object.matrixWorld).applyMatrix4(inverse);vertices.push(point.x,point.y,point.z);
      }
      oldLines.push(object);
    }
    for(const child of object.children)collect(child);
  }
  collect(root);
  for(const line of oldLines){line.removeFromParent();line.geometry.dispose();}
  for(const [mat,vertices] of batches){const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));root.add(new THREE.LineSegments(geometry,mat));}
}

export function buildHouse({software=false}={}) {
  softwareGeometry=software;
  const exterior=new THREE.Group();
  // The street lies on the page: no raised block, terrain, or hill beneath it.
  box(exterior,0,-.07,-5.25,15.4,.025,2.9,'stone',0xffffff,false);
  box(exterior,0,.01,-3.98,16.2,.14,.9,'stone',0xf7f3e8);
  box(exterior,0,.015,8.3,16.2,.12,1.0,'stone');
  house(exterior,-4.65,true);house(exterior,4.65,true);yard(exterior);
  label(exterior,'WICKER STREET',-3.58,2.44,-3.625,1.7,.29,Math.PI,48);
  streetLamp(exterior,-4.1,-4.28);
  // Drawing-style pavement joints and a small storm drain.
  for(let x=-8;x<8;x+=.74)stroke(exterior,[[x,.089,-4.35],[x,.089,-3.6]]);
  box(exterior,3.08,.025,-4.62,.52,.025,.29,'iron');for(let i=0;i<6;i++)box(exterior,2.88+i*.08,.043,-4.62,.026,.012,.24,'stone');
  const interiors={kitchen:kitchen(new THREE.Group()),parlor:parlor(new THREE.Group()),bedroom:bedroom(new THREE.Group()),gideon:bedroom(new THREE.Group(),true)};
  connectRooms(interiors);
  const hall=connectedHall();
  const roofGroup=new THREE.Group();roofGroup.position.set(1.17,0,.5);roofGroup.scale.set(1.51,1,1.14);roof(roofGroup);
  exterior.scale.set(1.51,1,1.14);exterior.position.set(1.17,0,.5);
  batchInk(hall.root,new Set([hall.walls,hall.upper]));batchInk(hall.walls);batchInk(hall.upper);batchInk(roofGroup);
  batchInk(exterior);
  for(const interior of Object.values(interiors)){
    batchInk(interior.group.parent,new Set(Object.values(interior.walls)));
    for(const wall of Object.values(interior.walls))batchInk(wall);
    interior.root=interior.group.parent;
  }
  const ceilings=new THREE.Group();box(ceilings,0,2.87,.5,4.65,.12,8,'plaster');box(ceilings,2.92,2.87,.5,1.08,.12,8,'plaster');
  box(ceilings,4,2.87,-2.8,1.2,.12,1.4,'plaster');box(ceilings,4,2.87,3.58,1.2,.12,1.84,'plaster');box(ceilings,1.17,6.07,.5,6.94,.12,8,'plaster');
  const root=new THREE.Group();root.name='connected-hale-house';root.add(exterior,hall.root,roofGroup,ceilings,...Object.values(interiors).map(room=>room.root));
  return {root,exterior,interiors,hall,ceilings,roof:roofGroup,room:interiors.kitchen.root,walls:interiors.kitchen.walls};
}

export function mountHouse(world,model) {
  model.exterior.name='street-and-yard';
  for(const [key,interior] of Object.entries(model.interiors))interior.root.name=`interior:${key}`;
  world.add(model.root);
}
