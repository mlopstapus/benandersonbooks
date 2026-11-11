import { walkStops } from './house-notes.js?v=hearth-15';

export function createWalkGraph(origins){
 const nodes=new Map(),edges=new Map();
 const point=(room,p)=>p.map((v,i)=>v+(origins[room]?.[i]||0));
 function add(id,room,label,position,direction){nodes.set(id,{id,room,label,position,direction});edges.set(id,[]);}
 function link(a,b){edges.get(a).push(b);edges.get(b).push(a);}
 for(const [room,stops]of Object.entries(walkStops)){
  stops.forEach((stop,index)=>add(`${room}:${index}`,room,stop.label,point(room,stop.position),point(room,stop.direction)));
  for(let i=1;i<stops.length;i++)link(`${room}:${i-1}`,`${room}:${i}`);
 }
 for(const [a,b]of [['street:1','hall:0'],['hall:0','parlor:0'],['hall:1','kitchen:0'],['landing:1','bedroom:0'],['landing:2','gideon:0']])link(a,b);
 add('hall:back','hall','At the back door',[3.2,1.62,3.8],[3.2,1.4,5.4]);link('hall:1','hall:back');link('hall:back','yard:1');
 add('stairs:base','hall','At the foot of the stairs',[4,1.62,-2.25],[4,2.8,0]);link('hall:0','stairs:base');
 let previous='stairs:base';
 for(const i of [0,4,8,12,15]){
  const id=`stairs:${i}`,position=[4,1.62+(i+1)*.2,-1.8+i*.28];
  add(id,'hall','On the wooden stairs',position,[4,position[1]+.4,position[2]+1]);link(previous,id);previous=id;
 }
 add('stairs:top','landing','Onto the landing',[4,4.82,3.1],[2.95,4.6,2.5]);link(previous,'stairs:top');link('stairs:top','landing:0');
 function route(from,to){
  if(!nodes.has(from)||!nodes.has(to))return [];
  const queue=[from],previous=new Map([[from,null]]);
  for(let i=0;i<queue.length;i++){
   const current=queue[i];if(current===to)break;
   for(const next of edges.get(current))if(!previous.has(next)){previous.set(next,current);queue.push(next);}
  }
  if(!previous.has(to))return [];
  const result=[];for(let id=to;id!==from;id=previous.get(id))result.unshift(nodes.get(id));return result;
 }
 return {nodes,edges,route};
}
