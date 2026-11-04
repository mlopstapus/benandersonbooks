import * as THREE from 'three';
import { OrbitControls } from '../vendor/three/OrbitControls.js';
import { scenes, walkStops, doorways } from './house-notes.js?v=hearth-15';
import { buildHouse, prepareDrawingTextures, mountHouse, roomOrigins } from './house-model.js?v=hearth-15';
import { createWalkGraph } from './walk-graph.js?v=hearth-15';
import { InkRenderer } from './ink-renderer.js?v=hearth-15';

const $=id=>document.getElementById(id);
const viewport=$('viewport'), overlay=$('hotspots');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let sceneName='hall', mode='orbit', selectedDetail=null;
let renderer, world, camera, controls, model, animation, transition;
let yaw=0,pitch=0,down=null,pointers=new Map(),pinchDistance=0;
let previousAspect=0;
let shaderRecoveryPending=false,plainMaterials=false,firstFrame=true;
const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();
const projected=new THREE.Vector3();
const standing=new THREE.Vector3();
const hotspots=[];
const waypoints=[];
let stopIndex=0;
const walkLayer=$('waypoints');
const graph=createWalkGraph(roomOrigins);
let currentNode='hall:0', travel=[], pendingDestination=null, overviewFloor=0;
const worldPoint=(room,point)=>new THREE.Vector3(...point).add(new THREE.Vector3(...(roomOrigins[room]||[0,0,0])));

function populateNotes(name) {
  const data=scenes[name];
  $('scene-kicker').textContent=data.kicker;$('scene-title').innerHTML=data.title;
  $('scene-description').textContent=data.description;$('drawing-label').textContent=data.figure;
  $('next-stop').replaceChildren(document.createTextNode(data.nextLabel),Object.assign(document.createElement('span'),{textContent:'→'}));
  document.querySelectorAll('[data-scene]').forEach(b=>{b.classList.toggle('selected',b.dataset.scene===name);b.setAttribute('aria-pressed',String(b.dataset.scene===name));});
  $('details-list').replaceChildren();overlay.replaceChildren();hotspots.length=0;
  data.details.forEach((detail,i)=>{
    const b=document.createElement('button');b.type='button';b.className='detail-button';b.dataset.detail=detail.id;
    const n=document.createElement('span');n.textContent=String(i+1).padStart(2,'0');b.append(n,document.createTextNode(detail.title));
    b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>selectDetail(i));
    const row=document.createElement('div');row.className='detail-row';row.append(b);
    if(detail.action){const enter=document.createElement('button');enter.type='button';enter.className='detail-enter';enter.textContent='Enter ↗';enter.setAttribute('aria-label',`Enter ${scenes[detail.action].label}`);enter.addEventListener('click',()=>setScene(detail.action));row.append(enter);}
    $('details-list').append(row);
    if(detail.action)return;
    const h=document.createElement('button');h.type='button';h.className='hotspot';h.textContent=i+1;h.setAttribute('aria-label',detail.title);
    h.setAttribute('aria-describedby',`tip-${detail.id}`);
    const tooltip=document.createElement('span');tooltip.className='hotspot-label';tooltip.id=`tip-${detail.id}`;tooltip.setAttribute('role','tooltip');
    const title=document.createElement('strong');title.textContent=detail.title;
    const copy=document.createElement('span');copy.textContent=detail.text;tooltip.append(title,copy);h.append(tooltip);
    h.addEventListener('pointerenter',()=>selectDetail(i));h.addEventListener('focus',()=>selectDetail(i));
    h.addEventListener('click',()=>selectDetail(i));overlay.append(h);
    hotspots.push({element:h,point:worldPoint(name,detail.point),detail,index:i});
  });
  showNote(data.overview);
}
function showNote(note,index=null) {
  const provenance=note.source.includes('INTERPRETATION')?'IN THE ILLUSTRATION':'FROM THE MANUSCRIPT';
  $('note-number').textContent=index===null?provenance:`DETAIL ${String(index+1).padStart(2,'0')} · ${provenance}`;
  $('note-title').textContent=note.title;$('note-text').textContent=note.text;$('note-source').textContent=note.source;
  $('note-enter').hidden=!note.action;
  if(note.action){$('note-enter').textContent=`Enter ${scenes[note.action].label} ↗`;$('note-enter').onclick=()=>setScene(note.action);}
}
function selectDetail(index) {
  selectedDetail=index;showNote(scenes[sceneName].details[index],index);
  $('details-list').querySelectorAll('.detail-button').forEach((b,i)=>{b.classList.toggle('active',i===index);b.setAttribute('aria-pressed',String(i===index));});
  hotspots.forEach(h=>h.element.classList.toggle('active',h.index===index));invalidate();
}
function showContext(name){
  sceneName=name;selectedDetail=null;
  stopIndex=Math.max(0,Number(currentNode.split(':')[1])||0);
  if(!currentNode.startsWith(name+':')||stopIndex>=walkStops[name].length)stopIndex=0;
  populateNotes(name);populateWalk();updateModeUI();history.replaceState(null,'',`#${name}`);
}
function setScene(name,instant=false) {
  if(!scenes[name])return;
  if(instant||!renderer){currentNode=`${name}:0`;overviewFloor=(roomOrigins[name]?.[1]>0||name==='landing')?1:0;showContext(name);if(renderer)resetCamera(true);return;}
  travelTo(`${name}:0`);
}
function travelTo(id){
  if(!renderer||!graph.nodes.has(id))return;
  if(transition?.walking){pendingDestination=id;return;}
  if(mode==='orbit'){
    mode='look';const start=graph.nodes.get(currentNode);camera.position.set(...start.position);controls.target.set(...start.direction);camera.lookAt(controls.target);
  }
  controls.enabled=false;camera.fov=72;camera.updateProjectionMatrix();
  travel=graph.route(currentNode,id);
  if(!travel.length){const node=graph.nodes.get(id);showContext(node.room);resetCamera(true);return;}
  $('tour-status').textContent=`Walking to ${graph.nodes.get(id).label.toLowerCase()}`;
  beginLeg();updateModeUI();
}
function beginLeg(){
  const node=travel.shift();if(!node)return;
  const to=new THREE.Vector3(...node.position),toTarget=new THREE.Vector3(...node.direction);
  const distance=camera.position.distanceTo(to);
  transition={walking:true,node,start:performance.now(),duration:reducedMotion?0:Math.max(380,Math.min(1800,distance*480)),from:camera.position.clone(),fromTarget:controls.target.clone(),to,toTarget};
  invalidate();
}
function finishLeg(node){
  currentNode=node.id;standing.set(...node.position);
  const direction=new THREE.Vector3(...node.direction).sub(standing).normalize();yaw=Math.atan2(direction.x,direction.z);pitch=Math.asin(direction.y);
  showContext(node.room);$('tour-status').textContent=node.label;
  if(pendingDestination){travel=graph.route(currentNode,pendingDestination);pendingDestination=null;}
  if(travel.length)beginLeg();
}
function populateWalk() {
  $('viewpoints').hidden=walkStops[sceneName].length<2;
  walkLayer.replaceChildren();waypoints.length=0;$('viewpoints').replaceChildren();$('room-exits').replaceChildren();
  walkStops[sceneName].forEach((stop,index)=>{
    const button=document.createElement('button');button.type='button';button.textContent=String(index+1).padStart(2,'0');
    button.setAttribute('aria-label',stop.label);button.setAttribute('aria-pressed',String(index===stopIndex));
    button.addEventListener('click',()=>moveToStop(index));$('viewpoints').append(button);
    const point=worldPoint(sceneName,stop.position);point.y-=1.54;addWaypoint(point.toArray(),stop.label,()=>moveToStop(index),'station',index);
  });
  for(const exit of doorways[sceneName]){
    addWaypoint(worldPoint(sceneName,exit.point).toArray(),exit.label,()=>setScene(exit.to),'door');
    const button=document.createElement('button');button.type='button';button.textContent=exit.label+' ↗';
    button.addEventListener('click',()=>setScene(exit.to));$('room-exits').append(button);
  }
}
function addWaypoint(point,label,action,kind,index) {
  const button=document.createElement('button');button.type='button';button.className=`waypoint ${kind}`;
  button.setAttribute('aria-label',label);
  const icon=document.createElement('span');icon.className='waypoint-icon';icon.textContent=kind==='door'?'↗':'○';icon.setAttribute('aria-hidden','true');
  const tip=document.createElement('span');tip.className='waypoint-label';tip.textContent=label;
  button.append(icon,tip);button.addEventListener('click',action);walkLayer.append(button);
  waypoints.push({element:button,point:new THREE.Vector3(...point),kind,index});
}
function moveToStop(index){travelTo(`${sceneName}:${index}`);}
function positionWaypoints() {
  if(mode!=='look')return;
  const w=viewport.clientWidth,h=viewport.clientHeight;
  for(const item of waypoints){
    projected.copy(item.point).project(camera);
    const x=(projected.x*.5+.5)*w,y=(-projected.y*.5+.5)*h;
    let show=item.index!==stopIndex&&projected.z>-1&&projected.z<1&&x>30&&x<w-30&&y>100&&y<h-100;
    // An arrow may sit just before a closed door; furniture must still hide floor rings.
    if(show){
      const direction=item.point.clone().sub(camera.position),distance=direction.length();raycaster.set(camera.position,direction.normalize());
      const hit=raycaster.intersectObject(activeRoot(),true).find(visibleMesh);
      if(hit&&hit.distance<distance-.2)show=false;
    }
    item.element.hidden=!show;item.element.style.left=`${x}px`;item.element.style.top=`${y}px`;
    item.element.classList.toggle('tip-left',x>w*.58);
  }
}
function updateModeUI() {
  for(const m of ['orbit','look']){$(m).classList.toggle('active',mode===m);$(m).setAttribute('aria-pressed',String(mode===m));}
  $('gesture-hint').textContent=mode==='orbit'?'DRAG TO ROTATE · SCROLL TO ZOOM':'DRAG TO LOOK · CLICK A FLOOR RING TO MOVE';
  document.querySelector('.plate').dataset.mode=mode;
  $('walk-controls').hidden=mode!=='look';
  $('overview-controls').hidden=mode!=='orbit';
  document.querySelectorAll('[data-floor]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.floor)===overviewFloor)));
  walkLayer.hidden=mode!=='look';
  $('position-label').textContent=walkStops[sceneName][stopIndex].label;
  $('step-forward').textContent=stopIndex<walkStops[sceneName].length-1?'Next viewpoint →':scenes[sceneName].nextLabel+' →';
  if(mode==='look'&&scenes[sceneName].interior)$('drawing-label').textContent=`Standing in ${scenes[sceneName].label.toLowerCase()}`;
  else $('drawing-label').textContent=overviewFloor===0?'The ground floor · parlor, hall & kitchen':'Upstairs · two bedrooms & the landing';
}
function setMode(next) {travel=[];pendingDestination=null;transition=null;mode=next;if(next==='orbit')overviewFloor=camera.position.y>3.2?1:0;updateModeUI();resetCamera();}
function activeRoot(){return model.root;}
function framingScale(aspect) {return Math.max(1,1.12/aspect);}
function resetCamera(instant=false) {
  if(!renderer)return;
  updateModeUI();const data=scenes[sceneName];controls.enabled=false;camera.fov=mode==='look'?72:42;camera.updateProjectionMatrix();
  const node=graph.nodes.get(currentNode);
  const nextPosition=new THREE.Vector3(...(mode==='look'?node.position:[13,13+overviewFloor*3.2,-15]));
  const nextTarget=new THREE.Vector3(...(mode==='look'?node.direction:[1.1,.65+overviewFloor*3.2,.5]));
  controls.minDistance=7;controls.maxDistance=50;
  if(mode==='orbit')nextPosition.sub(nextTarget).multiplyScalar(framingScale(camera.aspect)).add(nextTarget);
  // Camera-mode and room changes reset directly, preventing movement through solid walls.
  transition={start:performance.now(),duration:instant||reducedMotion||renderer.isSoftware?0:650,from:camera.position.clone(),fromTarget:controls.target.clone(),to:nextPosition,toTarget:nextTarget};
  if(mode==='look'){
    standing.copy(nextPosition);const direction=nextTarget.clone().sub(nextPosition).normalize();yaw=Math.atan2(direction.x,direction.z);pitch=Math.asin(direction.y);
    transition.duration=0;
  }
  invalidate();
}
function setLook() {
  const direction=new THREE.Vector3(Math.cos(pitch)*Math.sin(yaw),Math.sin(pitch),Math.cos(pitch)*Math.cos(yaw));
  camera.position.copy(standing);camera.lookAt(standing.clone().add(direction));controls.target.copy(standing).add(direction);invalidate();
}
function zoom(amount) {
  if(!renderer||transition)return;
  if(mode==='look'){camera.fov=THREE.MathUtils.clamp(camera.fov+amount*3,40,90);camera.updateProjectionMatrix();}
  else {const delta=camera.position.clone().sub(controls.target);delta.setLength(THREE.MathUtils.clamp(delta.length()*(1+amount*.12),controls.minDistance,controls.maxDistance));camera.position.copy(controls.target).add(delta);controls.update();}
  invalidate();
}
function invalidate() {if(!animation&&renderer)animation=requestAnimationFrame(render);}
function cutaway() {
  const walking=mode==='look';model.exterior.visible=walking;model.roof.visible=walking;model.ceilings.visible=walking;
  model.hall.walls.visible=walking;model.hall.upper.visible=walking||overviewFloor===1;
  for(const [name,room]of Object.entries(model.interiors)){
    const floor=roomOrigins[name][1]>0?1:0;room.root.visible=walking||floor===overviewFloor;
    const local=camera.position.clone().sub(room.root.position);
    for(const [side,wall]of Object.entries(room.walls))wall.visible=walking||!({left:local.x<0,right:local.x>0,front:local.z<1.5,rear:local.z>1.5}[side]);
    if(!walking)room.walls[name==='kitchen'||name==='bedroom'?'front':'rear'].visible=false;
  }
}
function positionHotspots() {
  const w=viewport.clientWidth,h=viewport.clientHeight;
  world.updateMatrixWorld();camera.updateMatrixWorld();
  const visible=activeRoot();
  for(const item of hotspots) {
    projected.copy(item.point).project(camera);
    const x=(projected.x*.5+.5)*w,y=(-projected.y*.5+.5)*h;
    let show=projected.z>-1&&projected.z<1&&x>22&&x<w-35&&y>(mode==='look'?105:184)&&y<h-(mode==='look'?98:165);
    if(show) {
      const direction=item.point.clone().sub(camera.position);const distance=direction.length();raycaster.set(camera.position,direction.normalize());
      const hit=raycaster.intersectObject(visible,true).find(visibleMesh);
      if(hit&&hit.distance<distance-.8)show=false;
    }
    item.element.classList.toggle('tip-left',x>w*.58);
    item.element.hidden=!show;item.element.style.left=`${x}px`;item.element.style.top=`${y}px`;
  }
  $('compass-needle').style.transform=`rotate(${THREE.MathUtils.radToDeg(Math.atan2(camera.position.x-controls.target.x,camera.position.z-controls.target.z))}deg)`;
}
function render(now) {
  try {renderFrame(now);}catch(error){fallback(error);}
}
function renderFrame(now) {
  animation=null;let moving=false;
  if(!renderer||!model)return;
  if(transition) {
    const t=transition.duration===0?1:Math.min((now-transition.start)/transition.duration,1),ease=1-Math.pow(1-t,3);
    camera.position.lerpVectors(transition.from,transition.to,ease);controls.target.lerpVectors(transition.fromTarget,transition.toTarget,ease);camera.lookAt(controls.target);
    if(t===1){const leg=transition;transition=null;controls.enabled=mode==='orbit';if(mode==='orbit')controls.update();if(leg.walking)finishLeg(leg.node);}else moving=true;
  }else if(mode==='orbit')moving=controls.update();
  cutaway();world.userData.tourTarget=controls.target;renderer.render(world,camera);positionHotspots();positionWaypoints();
  if(shaderRecoveryPending){
    shaderRecoveryPending=false;plainMaterials=true;
    world.traverse(node=>{
      if(!node.isMesh)return;
      for(const mat of Array.isArray(node.material)?node.material:[node.material]){
        if(!mat.isMeshStandardMaterial)continue;
        mat.onBeforeCompile=()=>{};mat.customProgramCacheKey=()=>'ashcombe-standard-recovery';mat.needsUpdate=true;
      }
    });
    invalidate();return;
  }
  if(firstFrame){firstFrame=false;$('loading').hidden=true;}
  if(moving||transition)invalidate();
}
function resize() {
  if(!renderer)return;const width=viewport.clientWidth,height=viewport.clientHeight;
  renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();invalidate();
  if(previousAspect&&mode==='orbit'&&!transition){camera.position.sub(controls.target).multiplyScalar(framingScale(camera.aspect)/framingScale(previousAspect)).add(controls.target);controls.update();}
  previousAspect=camera.aspect;
}
function visibleMesh(intersection) {
  if(!intersection.object.isMesh)return false;
  let node=intersection.object;
  while(node){if(!node.visible)return false;node=node.parent;}
  return true;
}
function actionAt(clientX,clientY) {
  if(!renderer)return null;const rect=viewport.getBoundingClientRect();pointer.set((clientX-rect.left)/rect.width*2-1,-(clientY-rect.top)/rect.height*2+1);
  raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObject(activeRoot(),true);
  const hit=hits.find(visibleMesh);if(!hit)return null;
  let node=hit.object;while(node){if(node.userData.action)return node.userData.action;node=node.parent;}return null;
}
function fallback(error) {
  if(renderer&&!renderer.isSoftware&&world&&camera){
    try{recoverWithInk(error);return;}catch(recoveryError){console.error('Compatibility drawing:',recoveryError);error=recoveryError;}
  }
  console.error('House tour:',error);$('loading').hidden=true;$('fallback').hidden=false;overlay.hidden=true;
  $('error-details').hidden=false;$('error-text').textContent=`${error?.name||'Error'}: ${error?.message||String(error)}`;
  for(const id of ['orbit','look','zoom-in','zoom-out','reset'])$(id).disabled=true;
  if(animation){cancelAnimationFrame(animation);animation=null;}
  if(renderer){renderer.dispose();renderer.domElement.remove();renderer=null;}
}

function connectControls(){
  controls=new OrbitControls(camera,renderer.domElement);controls.rotateSpeed=1;
  controls.enableDamping=!renderer.isSoftware;controls.dampingFactor=.09;controls.enablePan=false;
  controls.minPolarAngle=.12;controls.maxPolarAngle=Math.PI*.49;controls.minDistance=6;controls.maxDistance=66;
  controls.addEventListener('change',invalidate);
}
function recoverWithInk(error){
  console.warn('Switching to the compatibility ink drawing:',error);
  if(animation){cancelAnimationFrame(animation);animation=null;}
  transition=null;controls?.dispose();renderer?.dispose();renderer?.domElement.remove();
  renderer=new InkRenderer();viewport.append(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden','true');viewport.dataset.renderer='ink';
  if(model){world.remove(model.root);}
  model=buildHouse({software:true});mountHouse(world,model);
  if(!world.getObjectByName('ink-ambient')){const ambient=new THREE.AmbientLight(0x888888,1);ambient.name='ink-ambient';world.add(ambient);}
  world.traverse(node=>{if(node.isDirectionalLight)node.intensity=.85;});
  connectControls();resize();firstFrame=true;overlay.hidden=false;$('fallback').hidden=true;
  setScene(sceneName,true);
}

document.querySelectorAll('[data-floor]').forEach(button=>button.addEventListener('click',()=>{overviewFloor=Number(button.dataset.floor);currentNode=overviewFloor?'landing:0':'hall:0';mode='orbit';travel=[];transition=null;showContext(overviewFloor?'landing':'hall');resetCamera();}));
$('begin-walk').addEventListener('click',()=>setMode('look'));
document.querySelectorAll('[data-scene]').forEach(b=>b.addEventListener('click',()=>setScene(b.dataset.scene)));
$('next-stop').addEventListener('click',()=>{setScene(scenes[sceneName].next);if(window.innerWidth<=720)document.querySelector('.plate').scrollIntoView({behavior:reducedMotion?'instant':'smooth'});});
$('step-forward').addEventListener('click',()=>{const stops=walkStops[sceneName];if(stopIndex<stops.length-1)moveToStop(stopIndex+1);else setScene(scenes[sceneName].next);});
$('orbit').addEventListener('click',()=>setMode('orbit'));$('look').addEventListener('click',()=>setMode('look'));
$('zoom-in').addEventListener('click',()=>zoom(-1));$('zoom-out').addEventListener('click',()=>zoom(1));$('reset').addEventListener('click',()=>resetCamera());
for(const [button,dialog] of [['open-map','map-dialog'],['open-sources','sources-dialog']]) {
  $(button).addEventListener('click',()=>$(dialog).showModal());
  $(dialog).querySelector('.close-dialog').addEventListener('click',()=>$(dialog).close());
  $(dialog).addEventListener('click',event=>{if(event.target===$(dialog)){const r=$(dialog).getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)$(dialog).close();}});
}
$('map-house').addEventListener('click',()=>{$('map-dialog').close();setScene('street');});
window.addEventListener('hashchange',()=>{const name=location.hash.slice(1);if(scenes[name]&&name!==sceneName)setScene(name);});
viewport.addEventListener('keydown',e=>{
  if(!renderer)return;
  const key=e.key;if(['+','=','-','_'].includes(key)){e.preventDefault();zoom(key==='+'||key==='='?-1:1);return;}
  if(key.toLowerCase()==='r'){resetCamera();return;}
  if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(key)||transition)return;e.preventDefault();
  if(mode==='look'){yaw+=key==='ArrowLeft'?.12:key==='ArrowRight'?-.12:0;pitch=THREE.MathUtils.clamp(pitch+(key==='ArrowUp'?.08:key==='ArrowDown'?-.08:0),-1.3,1.3);setLook();}
  else {const spherical=new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));spherical.theta+=key==='ArrowLeft'?.12:key==='ArrowRight'?-.12:0;spherical.phi=THREE.MathUtils.clamp(spherical.phi+(key==='ArrowUp'?-.08:key==='ArrowDown'?.08:0),.12,Math.PI*.49);camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));controls.update();invalidate();}
});
viewport.addEventListener('pointerdown',e=>{
  if(!renderer)return;viewport.focus({preventScroll:true});down={x:e.clientX,y:e.clientY,lastX:e.clientX,lastY:e.clientY,moved:false};pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(mode==='look')viewport.setPointerCapture(e.pointerId);
  if(pointers.size===2){const p=[...pointers.values()];pinchDistance=Math.hypot(p[1].x-p[0].x,p[1].y-p[0].y);}
},true);
viewport.addEventListener('pointermove',e=>{
  if(!renderer)return;
  if(down&&Math.hypot(e.clientX-down.x,e.clientY-down.y)>5)down.moved=true;
  if(pointers.has(e.pointerId))pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(mode==='look'&&down&&!transition){
    if(pointers.size===2){const p=[...pointers.values()],distance=Math.hypot(p[1].x-p[0].x,p[1].y-p[0].y);camera.fov=THREE.MathUtils.clamp(camera.fov+(pinchDistance-distance)*.12,40,90);camera.updateProjectionMatrix();pinchDistance=distance;invalidate();}
    else{yaw+=(e.clientX-down.lastX)*.004;pitch=THREE.MathUtils.clamp(pitch-(e.clientY-down.lastY)*.004,-1.3,1.3);setLook();}
    down.lastX=e.clientX;down.lastY=e.clientY;
  }
},true);
viewport.addEventListener('pointerup',e=>{
  if(down&&!down.moved&&Math.hypot(e.clientX-down.x,e.clientY-down.y)<5&&!transition){const action=actionAt(e.clientX,e.clientY);if(action)setScene(action);}
  pointers.delete(e.pointerId);down=null;pinchDistance=0;
},true);
viewport.addEventListener('pointercancel',e=>{pointers.delete(e.pointerId);down=null;pinchDistance=0;});
viewport.addEventListener('lostpointercapture',e=>{pointers.delete(e.pointerId);down=null;});
viewport.addEventListener('wheel',e=>{if(mode==='look'){e.preventDefault();zoom(e.deltaY>0?1:-1);}},{passive:false});

// Notes and navigation stay usable on machines without WebGL.
populateNotes('hall');
try {
  $('loading').lastChild.textContent='Loading the ink drawing…';
  await prepareDrawingTextures();
  $('loading').lastChild.textContent='Opening the house…';
  try{
    if(['svg','ink'].includes(new URLSearchParams(location.search).get('renderer')))renderer=new InkRenderer();
    else renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
  }catch(error){console.warn('WebGL could not start; using the compatibility drawing:',error);renderer=new InkRenderer();}
  renderer.debug.onShaderError=(gl,program,vertex,fragment)=>{
    const error=new Error([gl.getProgramInfoLog(program),gl.getShaderInfoLog(vertex),gl.getShaderInfoLog(fragment)].filter(Boolean).join('\n'));
    console.error('House drawing shader:',error);
    if(plainMaterials)throw error;
    shaderRecoveryPending=true;
  };
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75));renderer.setClearColor(0xeeeade,0);
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.NoToneMapping;
  viewport.append(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
  viewport.dataset.renderer=renderer.isSoftware?'ink':'webgl';
  renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();fallback(new Error('Graphics context lost'));});
  world=new THREE.Scene();world.add(new THREE.HemisphereLight(0xffffff,0xb0aca1,1.8));
  const sun=new THREE.DirectionalLight(0xfff7e8,2.25);sun.position.set(-9,16,-8);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-15;sun.shadow.camera.right=15;sun.shadow.camera.top=15;sun.shadow.camera.bottom=-15;sun.shadow.normalBias=.04;sun.shadow.bias=-.0001;sun.shadow.radius=3;world.add(sun);
  camera=new THREE.PerspectiveCamera(42,1,.08,100);camera.position.set(12,8,-16);
  if(renderer.isSoftware){world.add(new THREE.AmbientLight(0x888888,1));sun.intensity=.85;}
  connectControls();
  model=buildHouse({software:renderer.isSoftware});mountHouse(world,model);
  new ResizeObserver(resize).observe(viewport);resize();
  setScene(scenes[location.hash.slice(1)]?location.hash.slice(1):'hall',true);
} catch(error) {fallback(error);}
