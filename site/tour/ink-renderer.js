import { Projector, RenderableFace, RenderableLine } from '../vendor/three/Projector.js';

const palette={plaster:[247,245,238],cloth:[230,227,216],wood:[182,174,155],floorboard:[182,174,155],brick:[213,204,188],stone:[207,203,191],slate:[105,106,103],iron:[63,65,62],leather:[184,181,170]};
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));

// A small depth-buffered illustration renderer for browsers without WebGL.
// Unlike SVG painter sorting, each pixel hides geometry and ink behind the nearest surface.
export class InkRenderer {
  constructor(){
    this.isSoftware=true;this.debug={};this.shadowMap={};
    this.domElement=document.createElement('canvas');this.domElement.className='ink-canvas';
    this.context=this.domElement.getContext('2d',{alpha:false});
    if(!this.context)throw new Error('This browser cannot open a drawing canvas.');
    this.projector=new Projector();this.tiles=new Map();
  }
  setPixelRatio(){}
  setClearColor(){}
  setSize(width,height){
    // Keep CPU rendering responsive on high-density displays and large monitors.
    const scale=Math.min(1.25,1100/width,950/height);
    this.width=Math.max(1,Math.round(width*scale));this.height=Math.max(1,Math.round(height*scale));
    this.domElement.width=this.width;this.domElement.height=this.height;
    this.frame=this.context.createImageData(this.width,this.height);
    this.depth=new Float32Array(this.width*this.height);this.scale=scale;
  }
  texture(surface){
    if(this.tiles.has(surface))return this.tiles.get(surface);
    const size=128,tile=new Float32Array(size*size);tile.fill(1);
    for(let y=0;y<size;y++)for(let x=0;x<size;x++){
      let ink=0;
      const noise=((x*73856093^y*19349663)>>>0)%100;
      if(surface==='brick'){
        const row=Math.floor(y/24),offset=row%2?28:0;
        if(y%24<1||(x+offset)%56<1)ink=.15;
        if(y%24===21&&noise>92)ink=.10;
      }else if(surface==='wood'){
        if(x%42===0)ink=.15;
        if(Math.abs(Math.sin(x*.7+Math.sin(y*.07)*.7))<.08)ink=.075;
      }else if(surface==='stone'){
        if(y%64===0||(x+(Math.floor(y/64)%2)*32)%64===0)ink=.12;
      }else if(surface==='slate'){
        if(y%22===0||(x+(Math.floor(y/22)%2)*16)%32===0)ink=.22;
      }else if(surface==='cloth'){
        if(y%4===0&&x%3===0)ink=.025;
      }
      tile[y*size+x]=1-ink-(noise>96?.018:0);
    }
    this.tiles.set(surface,tile);return tile;
  }
  render(world,camera){
    const w=this.width,h=this.height,pixels=this.frame.data;
    this.depth.fill(Infinity);
    for(let i=0;i<w*h;i++){
      const noise=((i*2654435761)>>>0)%7*.15;
      pixels[i*4]=246-noise;pixels[i*4+1]=244-noise;pixels[i*4+2]=236-noise;pixels[i*4+3]=255;
    }
    const elements=this.projector.projectScene(world,camera,false,false).elements;
    for(const element of elements)if(element instanceof RenderableFace)this.face(element);
    for(const element of elements)if(element instanceof RenderableLine)this.line(element);
    this.context.putImageData(this.frame,0,0);
  }
  face(face){
    const w=this.width,h=this.height;
    const vs=[face.v1,face.v2,face.v3].map(v=>({x:(v.positionScreen.x+1)*w*.5,y:(1-v.positionScreen.y)*h*.5,z:v.positionScreen.z,iw:1/v.positionScreen.w}));
    if(vs.some(v=>!Number.isFinite(v.x+v.y+v.z+v.iw)))return;
    const [a,b,c]=vs;
    const denominator=(b.y-c.y)*(a.x-c.x)+(c.x-b.x)*(a.y-c.y);
    if(Math.abs(denominator)<.001)return;
    const minX=clamp(Math.floor(Math.min(a.x,b.x,c.x)),0,w-1),maxX=clamp(Math.ceil(Math.max(a.x,b.x,c.x)),0,w-1);
    const minY=clamp(Math.floor(Math.min(a.y,b.y,c.y)),0,h-1),maxY=clamp(Math.ceil(Math.max(a.y,b.y,c.y)),0,h-1);
    const surface=face.material.userData.inkSurface;
    const normal=face.normalModel;
    const light=Math.max(0,-normal.x*.45+normal.y*.8-normal.z*.4);
    const shade=surface==='leather'?.94+.06*light:.80+.20*light;
    const base=surface?palette[surface]:[face.material.color.r*255,face.material.color.g*255,face.material.color.b*255];
    const rgb=base.map(value=>value*(surface?shade:1));
    const tile=surface?this.texture(surface):null,uv=face.uvs;
    const au=uv[0].x*a.iw,av=uv[0].y*a.iw,bu=uv[1].x*b.iw,bv=uv[1].y*b.iw,cu=uv[2].x*c.iw,cv=uv[2].y*c.iw;
    const pixels=this.frame.data;
    const ax=(b.y-c.y)/denominator,ay=(c.x-b.x)/denominator,bx=(c.y-a.y)/denominator,by=(a.x-c.x)/denominator;
    for(let y=minY;y<=maxY;y++){
      let u=ax*(minX+.5-c.x)+ay*(y+.5-c.y),v=bx*(minX+.5-c.x)+by*(y+.5-c.y);
      for(let x=minX;x<=maxX;x++,u+=ax,v+=bx){
        const t=1-u-v;if(u<-.0001||v<-.0001||t<-.0001)continue;
        const z=u*a.z+v*b.z+t*c.z,index=y*w+x;
        if(z<-1||z>1||z>=this.depth[index])continue;
        this.depth[index]=z;let tone=1;
        if(tile){
          const q=1/(u*a.iw+v*b.iw+t*c.iw);
          const tx=Math.floor((u*au+v*bu+t*cu)*q*128)&127,ty=Math.floor((u*av+v*bv+t*cv)*q*128)&127;
          tone=tile[ty*128+tx];
        }
        const p=index*4;pixels[p]=rgb[0]*tone;pixels[p+1]=rgb[1]*tone;pixels[p+2]=rgb[2]*tone;
      }
    }
  }
  line(line){
    const w=this.width,h=this.height,a=line.v1.positionScreen,b=line.v2.positionScreen;
    const x1=(a.x+1)*w*.5,y1=(1-a.y)*h*.5,x2=(b.x+1)*w*.5,y2=(1-b.y)*h*.5;
    const dx=x2-x1,dy=y2-y1,length=Math.max(Math.abs(dx),Math.abs(dy));
    if(!Number.isFinite(length)||length<.01)return;
    // Clip projected lines to the canvas before stepping, including near-plane crossings.
    let start=0,end=1;
    for(const [p,q]of [[-dx,x1],[dx,w-1-x1],[-dy,y1],[dy,h-1-y1]]){
      if(p===0){if(q<0)return;continue;}const r=q/p;
      if(p<0)start=Math.max(start,r);else end=Math.min(end,r);
    }
    if(start>end)return;
    const steps=Math.max(1,Math.ceil(length*(end-start))),pixels=this.frame.data;
    const alpha=(line.material.opacity??1)*.75;
    for(let i=0;i<=steps;i++){
      const t=start+(end-start)*i/steps,x=Math.round(x1+dx*t),y=Math.round(y1+dy*t),z=a.z+(b.z-a.z)*t;
      const index=y*w+x;if(x<0||x>=w||y<0||y>=h||z<-1||z>1||z>this.depth[index]+.000035)continue;
      const p=index*4;for(let c=0;c<3;c++)pixels[p+c]=pixels[p+c]*(1-alpha)+(44-c*2)*alpha;
    }
  }
  dispose(){this.depth=null;this.frame=null;this.tiles.clear();}
}
