// Physical details only. Full research and chronology live outside the public site.
export const scenes = {
  street: {
    label:'Wicker Street', connections:['parlor','kitchen','bedroom','gideon','yard'],
    kicker: 'AT HOME WITH THE HALES', title: 'The quiet end<br>of the street.',
    description: 'A narrow terrace on the Southbank. Gideon and his son Callum make their home at number six.',
    figure: 'Fig. 01 — A page from Wicker Street', next: 'parlor', nextLabel: 'Enter the front parlor',
    position: [12, 8, -16], target: [0, 3.1, 0], standing: [1.2, 1.65, -7.8], direction: [-0.1, 1.8, -2.8],
    overview: { title: 'The way home', text: 'The family usually comes in through the back. The front door opens straight onto Wicker Street, and sticks in its frame in wet weather.', source: 'CHAPTERS 13 & 26' },
    details: [
      { id:'front-door', title:'The reluctant front door', text:'It opens straight onto the street. The wood has swollen in the frame, and the door sticks in wet weather. The law comes to the front; friends come to the back.', source:'CHAPTERS 19 & 26', point:[1.35,1.25,-3.54], action:'parlor' },
      { id:'parlor', title:'The unused front parlor', text:'A narrow, cold front room with a small fireplace, a mantel clock, and lace aged at the window. Its grate has stood unlit for years.', source:'CHAPTERS 2, 7, 12 & 26', point:[-.9,1.5,-3.55],action:'parlor' },
      { id:'terrace', title:'A two-up two-down', text:'A narrow two-up two-down terrace, with two main rooms on each floor. A hall connects the front of the house to the kitchen, with stairs leading up from it.', source:'ASHCOMBE WORLD NOTES · CHAPTERS 12 & 19', point:[-1.2,4.5,-3.55] },
      { id:'street', title:'Life on Wicker Street', text:'Terraces stand along Wicker Street. There are neighbours at their windows, and boys who sit on the step of number nine.', source:'CHAPTERS 7, 12, 17 & 25', point:[4.4,.5,-4.4] }
    ]
  },
  parlor: {
    label:'The parlor',interior:true,connections:['street','kitchen','bedroom','gideon'],
    kicker:'THE ROOM NOBODY USES',title:'The third board.<br>The cold hearth.',
    description:'The small fireplace has stood unlit for years. Before it, the floorboards lie clear of the rug. The third from the left lifts when its end is pressed.',
    figure:'Fig. 02 — The front parlor, drawn in ink',next:'kitchen',nextLabel:'Go through to the kitchen',
    position:[8.7,7.4,10.5],target:[0,.7,1.4],standing:[1.05,1.6,.7],direction:[-1.5,1.1,1.4],
    overview:{title:'The board beside the hearth',text:'In the quiet front parlor, the third board from the left lifts when its end is pressed. Beneath it is a small space between the joists, lined with oilcloth.',source:'CHAPTERS 2 & 12'},
    details:[
      {id:'hearth-board',title:'The third board from the left',text:'Beside the hearth, the third board from the left lifts when its end is pressed. Below it lies a small space between the joists, about the size of a bread loaf, lined with oilcloth.',source:'CHAPTERS 2 & 12',point:[-.73,.10,1.4]},
      {id:'hearth',title:'The cold fireplace',text:'A little fireplace, its grate unlit for years. The rug lies farther back, leaving the boards beside the hearth exposed. A clock stands on the mantel.',source:'CHAPTERS 7, 12 & 26',point:[-1.65,.7,1.4]},
      {id:'mantel-clock',title:'The mantel clock',text:'A clock stands above the parlor mantel. It is a different clock from the one on the kitchen shelf.',source:'CHAPTER 12',point:[-1.85,1.8,1.4]},
      {id:'lace',title:'Lace at the front window',text:'The front window looks onto Wicker Street. Its lace has aged and yellowed.',source:'CHAPTER 26',point:[-.8,1.5,3.3],action:'street'},
      {id:'hall',title:'Back through the hall',text:'The hall connects the front of the house to the kitchen. The stairs rise from it, with the third tread creaking more than the rest.',source:'CHAPTERS 12 & 19',point:[1.38,1.3,-.36],action:'kitchen'}
    ]
  },
  kitchen: {
    label:'The kitchen',interior:true,connections:['parlor','bedroom','gideon','yard'],
    kicker:'THE ROOM THE FAMILY USES', title:'Everything gathers<br>around the range.',
    description:'A coal fire, a small table, a lamp left burning. The kitchen is the warm centre of the house, with the yard just beyond the hall.',
    figure:'Fig. 03 — The kitchen, drawn in ink', next:'bedroom', nextLabel:'Go upstairs to Callum’s room',
    position:[8.7,7.4,10.5], target:[0,.65,1.4], standing:[1.05,1.58,2.1], direction:[-1.4,1.1,1.15],
    overview:{title:'The heart of the house',text:'The kitchen range is kept going on winter mornings. The clock ticks on its shelf, the kettle sits on the rail, and the family’s day begins and ends at the small table.',source:'CHAPTERS 7, 25 & 26'},
    details:[
      {id:'range', title:'The coal range',text:'An iron range with a damper, a fender and bars, and a rail for the kettle. There is a poker and a kitchen coal scuttle; a second scuttle belongs to the parlor.',source:'CHAPTERS 14, 15 & 25',point:[-1.65,.85,1.55]},
      {id:'table', title:'Bread, cheese & lamplight',text:'The small table has kitchen chairs and a lamp. A plate of bread and cheese is left under a cloth. Elsewhere in the kitchen are a bread crock, a jug and a cup.',source:'CHAPTERS 2, 12, 14 & 26',point:[.05,.95,1.2]},
      {id:'clock', title:'The clock on the shelf',text:'A clock ticks on a kitchen shelf, with a stub of pencil beside it. A separate clock stands on the front parlor’s mantel.',source:'CHAPTERS 7, 12, 15 & 25',point:[-1.7,1.97,.23]},
      {id:'back-door', title:'The door with pencil marks',text:'An iron latch, a bolt, and a door that scrapes over its stone threshold. Faint pencil strokes run in rows down its inside face. A satchel hangs on a peg nearby.',source:'CHAPTERS 2, 13, 14 & 25',point:[1.3,1.45,3.43],action:'yard'},
      {id:'cupboard', title:'The cupboard and basin',text:'The cupboard stands beside a chair. A jug and basin are ready for washing, with the bread crock close by.',source:'CHAPTERS 7, 14 & 15',point:[-1.35,.9,.28]},
      {id:'flags', title:'Flagstones underfoot',text:'Stone flagstones cover the kitchen floor. The back door scrapes on its stone threshold; feet and chair legs carry clearly through the quiet house.',source:'CHAPTERS 13–15',point:[.95,.07,.1]},
      {id:'stairs',title:'The hall and stairs',text:'From the kitchen, the hall leads to the front parlor and the stairs. Callum’s room is at the back upstairs.',source:'CHAPTERS 12 & 13',point:[1.35,.55,-.9],action:'bedroom'}
    ]
  },
  bedroom: {
    label:'Callum’s room',interior:true,connections:['kitchen','gideon','yard'],
    kicker:'AT THE BACK, UPSTAIRS',title:'A borrowed book.<br>A sash that never fits.',
    description:'An unmade bed, old boots by the wall, a shirt on a chair. Callum’s room is colder than the kitchen, with a book from the penny library still waiting to go back.',
    figure:'Fig. 04 — Callum’s back bedroom',next:'gideon',nextLabel:'Across to Gideon’s room',
    position:[8.7,7.4,10.5],target:[0,.7,1.4],standing:[1.15,1.58,.6],direction:[-1,1,1.8],
    overview:{title:'A boy’s room',text:'A narrow bed, a kicked-off blanket, a shirt on a chair, and old boots by the wall. A borrowed book is waiting to go back to the penny library.',source:'CHAPTERS 2, 12 & 13'},
    details:[
      {id:'bed',title:'A bed grown too short',text:'Callum is fifteen, and his bed is already too short for him. The blanket is often kicked towards the foot.',source:'CHAPTERS 2 & 12',point:[-1.16,.8,1.8]},
      {id:'library-book',title:'The penny-library book',text:'A book borrowed from the penny library is two weeks overdue by the date on its ticket.',source:'CHAPTERS 12 & 13',point:[-.74,.76,3.15]},
      {id:'drawers',title:'Three drawers',text:'Callum seldom pushes the three drawers all the way shut. Among his things are socks, a clean collar, and a tin soldier whose gun is missing.',source:'CHAPTERS 12 & 13',point:[1.3,1.1,2.1]},
      {id:'sash',title:'The ill-fitting sash',text:'The back bedroom’s sash has never fitted properly. The room is colder than the kitchen below.',source:'CHAPTER 12',point:[-.8,1.7,3.33]},
      {id:'bedroom-door',title:'Back to the landing',text:'The back bedroom opens onto the upstairs landing. The stairs lead down to the hall and kitchen.',source:'CHAPTERS 2, 12 & 13',point:[1.38,1.3,-.36],action:'kitchen'}
    ]
  },
  gideon: {
    label:'Gideon’s room',interior:true,connections:['bedroom','kitchen','street'],
    kicker:'ACROSS THE LANDING',title:'Blankets on the bed.<br>A quilt in the chest.',
    description:'Blankets on the bed, a quilt in its chest, and a washstand with a looking glass. His clothes have a place against the wall.',
    figure:'Fig. 05 — Gideon’s bedroom',next:'yard',nextLabel:'Go down to the back yard',
    position:[8.7,7.4,10.5],target:[0,.7,1.4],standing:[1.05,1.58,.5],direction:[-1,1,1.6],
    overview:{title:'Gideon’s room',text:'Gideon sleeps in a room of his own. He has a washstand and a looking glass; blankets cover his bed, and a chest holds a quilt.',source:'CHAPTERS 7, 8 & 14'},
    details:[
      {id:'gideon-bed',title:'His own bed',text:'Gideon has his own bed, separate from Callum’s room. Blankets cover it, ready for a winter night.',source:'CHAPTERS 7 & 14',point:[-1.16,.8,1.8]},
      {id:'washstand',title:'The washstand and looking glass',text:'Gideon has a washstand in his room. At the looking glass, he fastens the buttons of his shirt, all the way to the collar.',source:'CHAPTER 8',point:[-.78,1.55,3.12]},
      {id:'clothes-dresser',title:'A place for his clothes',text:'A plain chest of drawers stands against the wall, with room in front to dress for the day.',source:'ILLUSTRATED INTERPRETATION',point:[1.2,.9,.24]},
      {id:'quilt-chest',title:'The quilt chest',text:'A quilt is kept in a chest in Gideon’s room.',source:'CHAPTER 14',point:[1.43,.8,2.6]},
      {id:'landing',title:'The upstairs landing',text:'A landing connects the bedrooms to the stairs. Callum’s bedroom is at the back of the house.',source:'CHAPTERS 2, 12 & 14',point:[1.38,1.3,-.36],action:'bedroom'}
    ]
  },
  yard: {
    label:'The back yard',connections:['kitchen','bedroom','street'],
    kicker:'FRIENDS COME TO THE BACK', title:'A gate onto<br>the back lane.',
    description:'A short path leads from the back door to the yard gate. This is the ordinary way in and out: away from the front step, down the lane, and back towards the river.',
    figure:'Fig. 06 — The yard and the back of the house', next:'street', nextLabel:'Return to Wicker Street',
    position:[10.5,8.2,16],target:[0,1.5,4.7],standing:[.3,1.6,7.1],direction:[.1,1.7,2.8],
    overview:{title:'A quieter entrance',text:'The back door opens from the hall into the yard, and a gate connects the yard to the back lane. Gideon and Callum usually use this entrance.',source:'CHAPTERS 7, 19 & 26'},
    details:[
      {id:'yard-door', title:'Back into the house',text:'The back door opens into the hall. The kitchen is just off the passage, with its flagstones, table and coal range.',source:'CHAPTERS 2, 19 & 25',point:[1.3,1.3,3.57],action:'kitchen'},
      {id:'bedroom',title:'Callum’s back bedroom',text:'Upstairs at the back, the sash has never fitted properly. Inside are a bed, a chair, old boots, drawers, and a book borrowed from the penny library.',source:'CHAPTERS 12 & 13',point:[-.9,4.55,3.55],action:'bedroom'},
      {id:'gate', title:'The back gate',text:'The yard gate opens onto the lane behind Wicker Street. From here, a path crosses the yard to the back door.',source:'CHAPTERS 7 & 19',point:[.65,1.1,7.75],action:'street'},
      {id:'privy',title:'The privy',text:'The privy stands outside in the back yard.',source:'CHAPTERS 7 & 12',point:[-1.04,1.2,7.15]}
    ]
  }
};

// Standing places are navigational choices, not a measured floor plan from the novel.
// Interior paths stay in the clear aisle, away from the bed, table, hearth and chairs.
export const walkStops = {
  street: [
    {id:'approach',label:'Across Wicker Street',position:[4.7,2.6,-12],direction:[0,2.8,-3.48]},
    {id:'step',label:'At the front step',position:[1.35,1.65,-5.8],direction:[1.35,1.35,-3.48]}
  ],
  parlor: [
    {id:'entry',label:'Inside the parlor',position:[1.25,1.62,.15],direction:[-.7,1.1,1.8]},
  ],
  kitchen: [
    {id:'entry',label:'Inside the kitchen',position:[1.4,1.62,.05],direction:[-.6,1.0,1.9]},

  ],
  bedroom: [
    {id:'entry',label:'Inside Callum’s room',position:[1.1,1.62,.05],direction:[-.3,1.0,1.8]},
  ],
  gideon: [
    {id:'entry',label:'Inside Gideon’s room',position:[1.1,1.62,.05],direction:[-.2,1.0,1.8]},
  ],
  yard: [
    {id:'gate',label:'Inside the back gate',position:[.65,1.65,7.25],direction:[.1,1.5,3.5]},
    {id:'path',label:'On the garden path',position:[.65,1.65,5.7],direction:[1.35,1.3,3.5]}
  ]
};

// Each route has an explicit threshold. Windows remain details, not walking exits.
export const doorways = {
  street:[{to:'parlor',label:'Enter the parlor',point:[1.35,.12,-3.95]}],
  parlor:[{to:'kitchen',label:'Through the hall · kitchen',point:[1.38,.1,-.12]}, {to:'street',label:'Outside · Wicker Street',point:[1.9,.1,.25]}],
  kitchen:[{to:'parlor',label:'Through the hall · parlor',point:[1.35,.12,-.15]}, {to:'bedroom',label:'Upstairs · Callum’s room',point:[1.35,.45,-1.05]}, {to:'yard',label:'Outside · back yard',point:[1.35,.1,3.15]}],
  bedroom:[{to:'kitchen',label:'Downstairs · kitchen',point:[1.38,.1,-.12]}, {to:'gideon',label:'Across the landing · Gideon’s room',point:[1.9,.1,.2]}],
  gideon:[{to:'bedroom',label:'Across the landing · Callum’s room',point:[1.38,.1,-.12]}, {to:'kitchen',label:'Downstairs · kitchen',point:[1.9,.1,.2]}],
  yard:[{to:'kitchen',label:'Enter the kitchen',point:[1.35,.12,3.95]}, {to:'street',label:'Through the gate · Wicker Street',point:[.65,.12,7.65]}]
};

scenes.hall={label:'The hall',interior:true,kicker:'THE ROOMS ARE CONNECTED',title:'One house.<br>A shared passage.',description:'The parlor opens off the hall. Follow the passage to the kitchen, or take the wooden stairs to the bedrooms above.',figure:'The ground-floor hall',next:'parlor',nextLabel:'Walk into the parlor',position:[12,13,15],target:[1,.6,.5],overview:{title:'Through the house',text:'The hall leads from the front of the house to the kitchen. Stairs rise to the landing, with the third tread creaking more than the rest.',source:'CHAPTERS 12 & 19'},details:[],connections:['street','parlor','kitchen','landing']};
scenes.landing={label:'The landing',interior:true,kicker:'UPSTAIRS',title:'Across the landing.',description:'Callum’s room is at the back, with Gideon’s room across the landing. The open stairwell looks down into the hall.',figure:'The upstairs landing',next:'bedroom',nextLabel:'Walk into Callum’s room',position:[12,16,15],target:[1,3.8,.5],overview:{title:'Above the hall',text:'The upstairs landing connects both bedrooms to the stairs. Callum’s room is at the back of the house.',source:'CHAPTERS 2, 12 & 14'},details:[],connections:['hall','bedroom','gideon']};
walkStops.hall=[
 {id:'front',label:'Inside the front door',position:[2.95,1.62,-2.4],direction:[1.1,1.35,-2.1]},
 {id:'kitchen',label:'At the kitchen doorway',position:[2.95,1.62,1.6],direction:[.2,1.1,2.3]},
];
walkStops.landing=[
 {id:'top',label:'At the top of the stairs',position:[2.95,4.82,3.1],direction:[2.95,4.6,.2]},
 {id:'callum',label:'Outside Callum’s room',position:[2.95,4.82,1.6],direction:[.1,4.2,2.3]},
 {id:'gideon',label:'Outside Gideon’s room',position:[2.95,4.82,-2.4],direction:[.1,4.2,-1.3]}
];
for(const name of ['parlor','kitchen','bedroom','gideon']){
 walkStops[name][0].position=[name==='kitchen'?1.4:1.2,1.62,.6];
 doorways[name]=[{to:name==='parlor'||name==='kitchen'?'hall':'landing',label:'Through the open doorway',point:[2.12,.1,.6]}];
}

doorways.street=[{to:'hall',label:'Enter the house',point:[3.2,.12,-3.85]}];
doorways.hall=[{to:'parlor',label:'Into the parlor',point:[2.45,.1,-2.4]},{to:'kitchen',label:'Into the kitchen',point:[2.45,.1,1.6]},{to:'landing',label:'Up the stairs',point:[4,.12,-2.1]},{to:'street',label:'Outside',point:[3.2,.1,-3.3]}];
doorways.landing=[{to:'bedroom',label:'Into Callum’s room',point:[2.45,3.3,1.6]},{to:'gideon',label:'Into Gideon’s room',point:[2.45,3.3,-2.4]},{to:'hall',label:'Down the stairs',point:[4,3.3,2.6]}];
doorways.yard=[{to:'hall',label:'Into the hall',point:[3.2,.12,4.65]}];
doorways.hall.push({to:'yard',label:'Through the back door',point:[3.2,.1,4.15]});
walkStops.street=[{id:'approach',label:'Across Wicker Street',position:[6,2.2,-12],direction:[1.2,2.4,-3.5]},{id:'step',label:'At the front step',position:[3.2,1.62,-4.5],direction:[3.2,1.4,-2.4]}];
walkStops.yard=[{id:'gate',label:'Inside the back gate',position:[2.15,1.62,8.5],direction:[1.35,1.4,4.5]},{id:'path',label:'Outside the back door',position:[3.2,1.62,5.4],direction:[3.2,1.4,3]}];

scenes.parlor.details.find(detail=>detail.id==='lace').point=[-.8,1.5,-.34];
// The lace is something to notice from the room, not a destination or an exit.
delete scenes.parlor.details.find(detail=>detail.id==='lace').action;
for(const name of ['parlor','bedroom','gideon']){
 const detail=scenes[name].details.find(detail=>['hall','bedroom-door','landing'].includes(detail.id));
 detail.point=[2.3,1.3,.6];detail.action=name==='parlor'?'hall':'landing';
}
scenes.kitchen.details.find(detail=>detail.id==='stairs').point=[2.3,1.2,.6];
scenes.kitchen.details.find(detail=>detail.id==='stairs').action='hall';
scenes.street.details.find(detail=>detail.id==='front-door').action='hall';
for(const name of ['street','yard'])for(const detail of scenes[name].details){detail.point=[1.17+detail.point[0]*1.51,detail.point[1],.5+detail.point[2]*1.14];}

// Place the back entrance in the hall, following the chosen tour layout.
const backDoorNote=scenes.kitchen.details.splice(scenes.kitchen.details.findIndex(note=>note.id==='back-door'),1)[0];
backDoorNote.point=[3.2,1.45,4.42];scenes.hall.details.push(backDoorNote);
scenes.yard.details.find(note=>note.id==='yard-door').action='hall';
scenes.hall.connections.push('yard');

scenes.yard.details.find(note=>note.id==='yard-door').point=[3.2,1.3,4.58];

// Furnishing interpretation is identified in the source label, not in reader-facing prose.
scenes.parlor.details.push({id:'settee',title:'The quiet end of the room',text:'A narrow settee stands against the back wall. Its worn cushions face the cold room, away from the uncovered boards at the hearth.',source:'ILLUSTRATED INTERPRETATION',point:[.5,.68,2.75]});
scenes.hall.details.unshift({id:'coat-hook',title:'The coat hook in the hall',text:'Callum’s coat has its hook in the hall. The passage leads past it to the rooms and stairs.',source:'CHAPTERS 8 & 12',point:[4.35,1.45,-2.73]});
scenes.bedroom.details.push({id:'shirt-chair',title:'A shirt on the chair',text:'A shirt hangs over the chair in Callum’s room. His old boots stand by the wall, and the bed is still unmade.',source:'CHAPTER 12',point:[.45,.87,3.05]});
walkStops.parlor[0].direction=[-.85,.55,1.4];
