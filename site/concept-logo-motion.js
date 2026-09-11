import { conceptSerifGlyphs } from "./concept-serif-glyphs.js";
const copy = value => structuredClone(value);
const outline = points => ({v:points,i:points.map(()=>[0,0]),o:points.map(()=>[0,0]),c:false});
const transform = {ty:"tr",p:{a:0,k:[0,0]},a:{a:0,k:[0,0]},s:{a:0,k:[100,100]},r:{a:0,k:0},o:{a:0,k:100}};
const strokes = {
 M: [[[190,0],[190,1419],[900,0],[1630,1419],[1630,0],430]],
 I: [[[400,0],[400,1419],670]],
 L: [[[270,1419],[270,90],[1220,90],400]],
 K: [[[260,1419],[260,0],380],[[1360,1419],[270,670],[1370,0],440]],
 Y: [[[70,1419],[640,680],[1210,1419],370],[[640,680],[640,0],550]],
 V: [[[90,1419],[680,0],[1300,1419],360]],
 E: [[[260,1419],[260,0],380],[[230,1300],[1250,1300],380],[[230,710],[1150,710],340],[[230,100],[1250,100],380]],
};
export function brandConceptLogoMotion(source,name){
 const data=copy(source),comp=data.assets.find(a=>a.id===data.layers[0].refId),original=comp.layers;
 const letters=[...name.toUpperCase()],count=letters.filter(c=>c!==" ").length;
 const tracking=-.065*2048;
 const width=letters.reduce((n,c)=>n+(c===" "?494:conceptSerifGlyphs[c].advance)+tracking,0)-tracking;
 const scale=849/width;
 let cursor=(data.w-width*scale)/2,ordinal=0;
 const result=[];
 const shift=(o,dt)=>{if(!o||typeof o!=="object")return;if(typeof o.t==="number")o.t+=dt;Object.values(o).forEach(v=>shift(v,dt));};
 for(const c of letters){
  if(c===" "){cursor+=(494+tracking)*scale;continue;}
  const glyph=conceptSerifGlyphs[c],time=ordinal*11.492/(count-1);
  const point=([x,y])=>[cursor+x*scale,160-y*scale];
  const maskShapes=[];
  for(const stroke of strokes[c]) for(const phase of ["open","close"]){
   const continuous=c==="M"||c==="V"||c==="L";
   const m=copy(original.find(l=>l.nm===`${continuous?"N":"I"}_${phase}`));
   let points=stroke.slice(0,-1).map(point);
   for(const [a,b] of [[0,1],[points.length-1,points.length-2]]){
    const dx=points[a][0]-points[b][0],dy=points[a][1]-points[b][1],length=Math.hypot(dx,dy);
    points[a][0]+=dx/length*12;points[a][1]+=dy/length*12;
   }
   if(continuous&&phase==="open")points.reverse();
   const gr=m.shapes.find(s=>s.ty==="gr");
   gr.it.find(s=>s.ty==="sh").ks={a:0,k:outline(points)};
   gr.it.find(s=>s.ty==="st").w={a:0,k:stroke.at(-1)*scale*2.5};
   shift(m.shapes,time-(continuous?0:2.298));
   maskShapes.push({ty:"gr",it:[...m.shapes,copy(transform)]});
  }
  const template=copy(original.find(l=>l.nm==="I_close"));
  template.ks.p.k=[0,0,0];template.ks.a.k=[0,0,0];
  const mask={...copy(template),nm:`${c} mask`,td:1,shapes:maskShapes};
  const shapes=glyph.paths.map(p=>({ty:"sh",ks:{a:0,k:{c:true,v:p.v.map(point),i:p.i.map(([x,y])=>[x*scale,-y*scale]),o:p.o.map(([x,y])=>[x*scale,-y*scale])}}}));
  const art={...copy(template),nm:c,tt:2,shapes:[{ty:"gr",it:[...shapes,{ty:"fl",c:{a:0,k:[.09,.13,.2,1]},o:{a:0,k:100},r:1},copy(transform)]}]};
  result.push(mask,art);cursor+=(glyph.advance+tracking)*scale;ordinal++;
 }
 comp.layers=result.map((l,i)=>({...l,ind:i+1}));data.nm=`${name} serif motion`;return data;
}
