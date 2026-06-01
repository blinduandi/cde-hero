/* ============================================================
   SCHEMATICS — scheme electrice reale (SVG), desenate cu valori.
   SCHEM.draw(schema) -> string SVG.  SCHEM.forProblem(id) -> schema.
   Folosesc currentColor → se adaptează la temă.
   ============================================================ */
const SCHEM = (function(){
  const NS='class="schem" xmlns="http://www.w3.org/2000/svg" viewBox="-45 0 440 305"';
  const wire=(...p)=>{let d=`M ${p[0]},${p[1]}`;for(let i=2;i<p.length;i+=2)d+=` L ${p[i]},${p[i+1]}`;return `<path d="${d}"/>`;};
  const dot=(x,y)=>`<circle cx="${x}" cy="${y}" r="3.2" class="fill"/>`;
  const txt=(x,y,t,a="middle")=>`<text x="${x}" y="${y}" text-anchor="${a}">${t}</text>`;
  // horizontal zigzag resistor from (x,y), span 52, label above (or below)
  const rH=(x,y,label,below)=>`<path d="M ${x},${y} h10 l4,-8 l8,16 l8,-16 l8,16 l4,-8 h10"/>`+txt(x+26,below?y+19:y-11,label);
  // vertical zigzag resistor from (x,y), span 52, label to side
  const rV=(x,y,label,side=1)=>`<path d="M ${x},${y} v10 l-8,4 l16,8 l-16,8 l16,8 l-8,4 v10"/>`+txt(x+(side>0?15:-15),y+30,label,side>0?"start":"end");
  // DC source circle r13. labelSide: 'left'|'right'|'below'
  const src=(cx,cy,label,plusTop=true,labelSide="left")=>{
    let s=`<circle cx="${cx}" cy="${cy}" r="13"/>`;
    const py=plusTop?cy-4:cy+8, ny=plusTop?cy+10:cy-2;
    s+=`<text x="${cx}" y="${py}" text-anchor="middle" class="sm">+</text>`;
    s+=`<text x="${cx}" y="${ny}" text-anchor="middle" class="sm">−</text>`;
    if(labelSide==="right") s+=txt(cx+18,cy+4,label,"start");
    else if(labelSide==="below") s+=txt(cx,cy+28,label,"middle");
    else s+=txt(cx-18,cy+4,label,"end");
    return s;
  };
  const gnd=(x,y)=>`<path d="M ${x},${y} v6"/><path d="M ${x-9},${y+6} h18"/><path d="M ${x-6},${y+10} h12"/><path d="M ${x-3},${y+14} h6"/>`;
  // flip=false: collector sus, emitor jos. flip=true: emitor sus, colector jos (PNP high-side)
  function bjt(cx,cy,npn,flip){
    let s=`<circle cx="${cx}" cy="${cy}" r="20"/>`;
    s+=wire(cx-4,cy-13,cx-4,cy+13)+wire(cx-20,cy,cx-4,cy); // bara bazei + lead
    s+=wire(cx-4,cy-8,cx+12,cy-20)+wire(cx+12,cy-20,cx+12,cy-26); // diagonala sus
    s+=wire(cx-4,cy+8,cx+12,cy+20)+wire(cx+12,cy+20,cx+12,cy+26); // diagonala jos
    // emitorul: jos (normal) sau sus (flip). Săgeata: NPN spre exterior, PNP spre bază.
    const emiBottom = !flip;
    if(emiBottom){
      if(npn) s+=`<polygon class="fill" points="${cx+12},${cy+20} ${cx+4},${cy+16} ${cx+8},${cy+11}"/>`;
      else    s+=`<polygon class="fill" points="${cx-4},${cy+8} ${cx+4},${cy+8} ${cx+1},${cy+15}"/>`;
    }else{
      if(npn) s+=`<polygon class="fill" points="${cx+12},${cy-20} ${cx+4},${cy-16} ${cx+8},${cy-11}"/>`;
      else    s+=`<polygon class="fill" points="${cx-4},${cy-8} ${cx+4},${cy-8} ${cx+1},${cy-15}"/>`;
    }
    s+=txt(cx+26,cy+5,"T","start");
    const top=[cx+12,cy-26], bot=[cx+12,cy+26];
    return {svg:s, B:[cx-20,cy], C:flip?bot:top, E:flip?top:bot};
  }
  const diodeH=(x,y,label)=>{
    let s=`<polygon points="${x},${y-8} ${x},${y+8} ${x+14},${y}" class="fill"/>`+wire(x+14,y-8,x+14,y+8);
    if(label) s+=txt(x+7,y-14,label);
    return s;
  };
  // diodă verticală, anod sus la (x,y), span 14
  const diodeV=(x,y,label)=>{
    let s=`<polygon points="${x-8},${y} ${x+8},${y} ${x},${y+14}" class="fill"/>`+wire(x-8,y+14,x+8,y+14);
    if(label) s+=txt(x+14,y+11,label,"start");
    return s;
  };
  const frame=inner=>`<svg ${NS}>${inner}</svg>`;

  function bjtDivider(v){
    const t=bjt(195,150,v.npn!==false); let s="";
    s+=wire(70,30,300,30)+txt(60,24,"+"+v.Vcc,"end")+dot(70,30)+dot(300,30);
    s+=wire(70,30,70,55)+rV(70,55,v.Rb1,-1)+wire(70,107,70,150)+dot(70,150)+wire(70,150,t.B[0],t.B[1]);
    s+=wire(70,150,70,170)+rV(70,170,v.Rb2,-1)+wire(70,222,70,258)+gnd(70,258);
    s+=wire(300,30,300,55)+rV(300,55,v.Rc,1)+wire(300,107,300,124)+wire(300,124,t.C[0],124)+wire(t.C[0],124,t.C[0],t.C[1]);
    s+=wire(t.E[0],t.E[1],t.E[0],195)+rV(t.E[0],195,v.Re,1)+wire(t.E[0],247,t.E[0],270)+gnd(t.E[0],270);
    return frame(s+t.svg);
  }
  function bjtTwoSupply(v){
    const t=bjt(190,150,v.npn!==false); let s="";
    s+=src(330,90,v.V2,true,"right");
    s+=wire(330,77,330,55)+wire(330,55,300,55)+rV(300,55,v.Rc,-1)+wire(300,107,300,124)+wire(300,124,t.C[0],124)+wire(t.C[0],124,t.C[0],t.C[1]);
    s+=wire(330,103,330,258)+gnd(330,258);
    s+=src(50,150,v.V1,true,"left");
    s+=wire(50,137,50,116)+wire(50,116,78,116)+rH(78,116,v.R1)+wire(130,116,150,116)+wire(150,116,150,150)+wire(150,150,t.B[0],t.B[1]);
    s+=wire(50,163,50,258)+gnd(50,258);
    s+=wire(t.E[0],t.E[1],t.E[0],258)+gnd(t.E[0],258);
    return frame(s+t.svg);
  }
  function bjtSingleRE(v){
    const t=bjt(195,150,true); let s="";
    s+=wire(70,30,310,30)+txt(60,24,"+"+v.Vcc,"end")+dot(70,30)+dot(310,30);
    s+=wire(70,30,70,70)+rV(70,70,v.Rb,-1)+wire(70,122,70,150)+wire(70,150,t.B[0],t.B[1]);
    s+=wire(t.C[0],t.C[1],t.C[0],30);
    s+=wire(t.E[0],t.E[1],t.E[0],195)+rV(t.E[0],195,v.Re,1)+wire(t.E[0],247,t.E[0],270)+gnd(t.E[0],270);
    return frame(s+t.svg);
  }
  function bjtFeedback(v){
    const t=bjt(210,170,v.npn!==false); let s="";
    s+=wire(120,30,300,30)+txt(110,24,"+"+v.Vcc,"end")+dot(222,30);
    s+=wire(222,30,222,55)+rV(222,55,v.Rc,1)+wire(222,107,222,120)+dot(222,120);
    s+=wire(222,120,t.C[0],120)+wire(t.C[0],120,t.C[0],t.C[1]);          // collector node -> C
    s+=rH(120,120,v.Rb)+wire(172,120,222,120);                          // Rb to collector node
    s+=wire(120,120,120,170)+wire(120,170,t.B[0],t.B[1]);               // Rb to base
    s+=wire(t.E[0],t.E[1],t.E[0],272)+gnd(t.E[0],272);
    return frame(s+t.svg);
  }
  function bjtRegion(v){
    const t=bjt(200,150,v.npn!==false); let s="";
    s+=src(335,90,v.VAl,true,"right");
    s+=wire(335,77,335,55)+wire(335,55,300,55)+rV(300,55,v.Rc,-1)+wire(300,107,300,124)+wire(300,124,t.C[0],124)+wire(t.C[0],124,t.C[0],t.C[1]);
    s+=wire(335,103,335,258)+gnd(335,258);
    s+=src(50,150,"V_I",true,"left");
    s+=wire(50,137,50,150)+wire(50,150,t.B[0],t.B[1]);
    s+=wire(50,163,50,258)+gnd(50,258);
    s+=wire(t.E[0],t.E[1],t.E[0],195)+rV(t.E[0],195,v.Re,1)+wire(t.E[0],247,t.E[0],270)+gnd(t.E[0],270);
    return frame(s+t.svg);
  }
  function diodeCircuit(v){
    let s="";
    s+=src(50,150,v.E,true,"left");
    s+=wire(50,137,50,60)+wire(50,60,95,60)+rH(95,60,v.R)+wire(147,60,250,60);
    s+=wire(250,60,250,140)+diodeH(243,150,"D")+wire(250,158,250,242);
    s+=wire(250,242,50,242)+wire(50,242,50,163)+gnd(150,242);
    return frame(s);
  }
  function resNet(v){
    let s="";
    s+=src(45,150,v.V,true,"left");
    s+=wire(45,137,45,50)+wire(45,50,68,50)+rH(68,50,v.R1)+wire(120,50,138,50)+rH(138,50,v.R2)+wire(190,50,225,50)+dot(225,50);
    s+=wire(225,50,225,38)+rH(240,38,v.R3)+wire(292,38,320,38)+wire(320,38,320,50);
    s+=wire(225,50,225,82)+rH(240,82,v.R4)+wire(292,82,320,82)+wire(320,82,320,50)+dot(320,50);
    s+=wire(320,50,320,242)+wire(320,242,45,242)+wire(45,242,45,163)+gnd(182,242);
    return frame(s);
  }
  function divider(v){
    let s="";
    s+=src(55,150,v.Vs,true,"left");
    s+=wire(55,137,55,55)+wire(55,55,150,55)+rH(150,55,v.R1)+wire(202,55,250,55)+dot(250,55);
    s+=wire(250,55,305,55)+txt(310,59,"V_o","start");
    s+=wire(250,55,250,100)+rV(250,100,v.R2,1)+wire(250,152,250,242);
    s+=wire(250,242,55,242)+wire(55,242,55,163)+gnd(150,242);
    return frame(s);
  }

  // O2: (R1‖R5) + R2 serie + (R3‖R4)
  function resPP(v){
    let s=""; s+=src(45,150,v.V,true,"left");
    s+=wire(45,137,45,64)+wire(45,64,70,64)+dot(70,64);
    // pereche stângă R1(sus)/R5(jos) între A(70,64) și B(160,64)
    s+=wire(70,64,70,46)+rH(78,46,v.R1)+wire(130,46,160,46)+wire(160,46,160,64);
    s+=wire(70,64,70,86)+rH(78,86,v.R5,true)+wire(130,86,160,86)+wire(160,86,160,64)+dot(160,64);
    // R2 serie
    s+=rH(170,64,v.R2)+wire(222,64,236,64)+dot(236,64);
    // pereche dreaptă R3(sus)/R4(jos) între C(236,64) și D(330,64)
    s+=wire(236,64,236,46)+rH(244,46,v.R3)+wire(296,46,330,46)+wire(330,46,330,64);
    s+=wire(236,64,236,86)+rH(244,86,v.R4,true)+wire(296,86,330,86)+wire(330,86,330,64)+dot(330,64);
    s+=wire(330,64,330,242)+wire(330,242,45,242)+wire(45,242,45,163)+gnd(187,242);
    return frame(s);
  }
  // O3: (R1‖R2) + R3 serie, cu ampermetre/voltmetru notate
  function resP1S(v){
    let s=""; s+=src(45,150,v.V,true,"left");
    s+=wire(45,137,45,64)+wire(45,64,80,64)+dot(80,64);
    s+=wire(80,64,80,44)+rH(90,44,v.R1)+wire(142,44,180,44)+wire(180,44,180,64)+txt(116,38,"I₁");
    s+=wire(80,64,80,86)+rH(90,86,v.R2,true)+wire(142,86,180,86)+wire(180,86,180,64)+dot(180,64)+txt(116,104,"I₂");
    s+=rH(192,64,v.R3)+wire(244,64,300,64)+txt(218,58,"U₃");
    s+=wire(300,64,300,242)+wire(300,242,45,242)+wire(45,242,45,163)+gnd(170,242)+txt(150,236,"I");
    return frame(s);
  }
  // O5: R1 + (R2‖R3‖R4) + R5 + R6
  function res3P(v){
    let s=""; s+=src(40,150,v.V,true,"left");
    s+=wire(40,137,40,60)+wire(40,60,60,60)+rH(60,60,v.R1)+wire(112,60,150,60)+dot(150,60);
    // triple paralel între B(150,60) și C(300,60): R2 sus(34), R3 mij(60), R4 jos(86)
    s+=wire(150,60,150,34)+rH(170,34,v.R2)+wire(222,34,300,34)+wire(300,34,300,60);
    s+=rH(170,60,v.R3)+wire(222,60,300,60);
    s+=wire(150,60,150,86)+rH(170,86,v.R4,true)+wire(222,86,300,86)+wire(300,86,300,60)+dot(300,60)+dot(150,60);
    s+=wire(300,60,300,108)+rH(300,108,v.R5)+wire(352,108,365,108)+wire(365,108,365,242); // R5 jos-dreapta
    s+=wire(365,242,90,242)+rH(90,242,v.R6,true)+wire(40,242,90,242)+wire(40,242,40,163)+gnd(225,242);
    return frame(s);
  }
  // D3 / D4: lanț vertical de rezistoare cu prize
  function tappedChain(v){ // {Vs, items:[{r,label}], gndIndex, extra}
    let s=""; const x=250; let y=26; const pts=[];
    s+=src(60,150,v.Vs,true,"left")+wire(60,137,60,26)+wire(60,26,x,26);
    v.items.forEach((it,i)=>{
      pts.push(y);
      s+=rV(x,y+2,it.r,1)+(i<v.items.length-1?"":"");
      y+=56;
    });
    pts.push(y);
    // tap labels & dots
    (v.taps||[]).forEach((t,i)=>{ if(t){s+=dot(x,pts[i])+txt(x+44,pts[i]+4,t,"start");} });
    // ground
    const gi = (v.gndIndex==null)? v.items.length : v.gndIndex;
    s+=gnd(x,pts[gi]);
    if(gi===v.items.length){ s+=wire(x,pts[gi],x,pts[gi]); }
    // return wire from bottom to source
    const by=pts[v.items.length];
    s+=wire(x,by,60,by)+wire(60,by,60,163);
    return frame(s);
  }
  // DI7: două diode + R1, R2, E
  function diode2(v){
    let s=""; s+=src(50,160,v.E,true,"left");
    s+=wire(50,147,50,60)+wire(50,60,108,60)+diodeH(108,60,"D1")+wire(122,60,200,60)+dot(200,60);
    // ramura R2 (dreapta)
    s+=wire(200,60,300,60)+wire(300,60,300,96)+rV(300,96,v.R2,1)+wire(300,148,300,212)+txt(312,120,"I","start");
    // ramura D2 (mijloc, verticală)
    s+=wire(200,60,200,98)+diodeV(200,98,"D2")+wire(200,112,200,212)+dot(200,212);
    s+=wire(300,212,200,212);
    // R1 jos înapoi la sursă
    s+=wire(200,212,200,250)+wire(200,250,132,250)+rH(80,250,v.R1)+wire(50,250,80,250)+wire(50,250,50,173);
    return frame(s);
  }
  // DI1/DI2/DI3: caracteristica I-V a diodei cu puncte marcate
  function diodeIV(v){
    const ox=80, oy=250, x1=345, ytop=42;
    const maxI=v.maxI||30, maxV=v.maxV||1.0;
    const sx=(x1-ox)/maxV, sy=(oy-ytop)/maxI;
    const X=vv=>ox+vv*sx, Y=ii=>oy-ii*sy;
    let s="";
    // axe
    s+=wire(ox,ytop-6,ox,oy+12)+wire(ox-34,oy,x1+6,oy);
    s+=`<polygon class="fill" points="${ox},${ytop-12} ${ox-4},${ytop-4} ${ox+4},${ytop-4}"/>`;
    s+=`<polygon class="fill" points="${x1+12},${oy} ${x1+4},${oy-4} ${x1+4},${oy+4}"/>`;
    s+=txt(ox-6,ytop-2,"I_D [mA]","end")+txt(x1+8,oy+18,"V_D [V]","end");
    // curba directă (aprox)
    const pts=v.fwd;
    let d=`M ${ox},${oy} L ${X(pts[0].v*0.55)},${oy-4} L ${X(pts[0].v)},${Y(pts[0].i)}`;
    for(let i=1;i<pts.length;i++) d+=` L ${X(pts[i].v)},${Y(pts[i].i)}`;
    const last=pts[pts.length-1]; d+=` L ${X(Math.min(maxV,last.v+0.04))},${ytop+8}`;
    s+=`<path d="${d}"/>`;
    // puncte marcate + proiecții (etichete V alternate pe verticală ca să nu se suprapună)
    pts.forEach((p,idx)=>{
      s+=dot(X(p.v),Y(p.i));
      s+=`<path stroke-dasharray="4 3" d="M ${ox},${Y(p.i)} H ${X(p.v)} V ${oy}"/>`;
      s+=txt(ox-6,Y(p.i)+4,p.i+"","end")+txt(X(p.v),oy+16+(idx%2)*15,p.v+"","middle");
    });
    if(v.note) s+=txt((ox+x1)/2,ytop+4,v.note,"middle");
    return frame(s);
  }
  // R2: PNP, regiune de funcționare (emitor sus prin RE la VAl, colector jos prin RC la masă)
  function bjtRegionPnp(v){
    const t=bjt(200,150,false,true); let s="";   // PNP, flip (emitor sus)
    s+=src(335,80,v.VAl,true,"right");
    s+=wire(335,67,335,46)+wire(335,46,300,46)+rV(300,46,v.Re,-1)+wire(300,98,300,124)+wire(300,124,t.E[0],124)+wire(t.E[0],124,t.E[0],t.E[1]);
    s+=wire(335,93,335,258)+gnd(335,258);
    s+=src(50,150,"V_I",true,"left")+wire(50,137,50,150)+wire(50,150,t.B[0],t.B[1])+wire(50,163,50,258)+gnd(50,258);
    s+=wire(t.C[0],t.C[1],t.C[0],195)+rV(t.C[0],195,v.Rc,1)+wire(t.C[0],247,t.C[0],270)+gnd(t.C[0],270);
    return frame(s+t.svg);
  }

  const MAP={bjt_div:bjtDivider,bjt_2supply:bjtTwoSupply,bjt_singleRE:bjtSingleRE,
             bjt_feedback:bjtFeedback,bjt_region:bjtRegion,bjt_region_pnp:bjtRegionPnp,
             diode:diodeCircuit,diode2:diode2,diode_iv:diodeIV,
             resnet:resNet,resnet_pp:resPP,resnet_p1s:resP1S,resnet_3p:res3P,
             divider:divider,tapped:tappedChain};
  function draw(s){ if(!s||!MAP[s.type]) return ""; try{return MAP[s.type](s);}catch(e){return "";} }

  const PROB={
    O1:{type:"resnet",V:"12V",R1:"10Ω",R2:"20Ω",R3:"20Ω",R4:"20Ω"},
    O2:{type:"resnet_pp",V:"15V",R1:"10Ω",R5:"10Ω",R2:"12Ω",R3:"40Ω",R4:"10Ω"},
    O3:{type:"resnet_p1s",V:"16V",R1:"10Ω",R2:"30Ω",R3:"2.5Ω"},
    O4:{type:"divider",Vs:"18V",R1:"12Ω",R2:"36Ω"},
    O5:{type:"resnet_3p",V:"12V",R1:"7Ω",R2:"5Ω",R3:"3Ω",R4:"6Ω",R5:"8Ω",R6:"9Ω"},
    D1:{type:"divider",Vs:"12V",R1:"20Ω",R2:"40Ω"},
    D2:{type:"divider",Vs:"36V",R1:"6k",R2:"30k"},
    D3:{type:"tapped",Vs:"15V",items:[{r:"8k"},{r:"4k"},{r:"2k"},{r:"1k"}],taps:["A","B","C","D","E"]},
    D4:{type:"tapped",Vs:"24V",items:[{r:"2.8Ω"},{r:"0.68Ω"},{r:"1.32Ω"},{r:"4.8Ω"}],taps:["+12V","+5V","+3.3V","0V","−12V"],gndIndex:3},
    DI1:{type:"diode_iv",maxI:25,maxV:1.0,fwd:[{v:0.5,i:2},{v:0.8,i:20}],note:"(+ în invers: V=−10V, I=−1µA)"},
    DI2:{type:"diode_iv",maxI:20,maxV:1.0,fwd:[{v:0.65,i:2},{v:0.725,i:17}]},
    DI3:{type:"diode_iv",maxI:35,maxV:1.0,fwd:[{v:0.78,i:20},{v:0.8,i:30}]},
    DI4:{type:"diode",E:"5V",R:"220Ω"},
    DI5:{type:"diode",E:"10V",R:"4.7k"},
    DI6:{type:"diode",E:"15V",R:"2.2k"},
    DI7:{type:"diode2",E:"20V",R1:"4.7k",R2:"3.5k"},
    T1:{type:"bjt_2supply",npn:true,V1:"5V",R1:"100k",V2:"12V",Rc:"1k"},
    T2:{type:"bjt_2supply",npn:false,V1:"15V",R1:"100k",V2:"15V",Rc:"4.7k"},
    T3:{type:"bjt_singleRE",Vcc:"12V",Rb:"560k",Re:"1k"},
    T4:{type:"bjt_div",npn:true,Vcc:"10V",Rb1:"56k",Rb2:"12k",Rc:"2.2k",Re:"560Ω"},
    T5:{type:"bjt_div",npn:false,Vcc:"10V",Rb1:"22k",Rb2:"10k",Rc:"1.8k",Re:"1k"},
    T6:{type:"bjt_feedback",npn:true,Vcc:"10V",Rc:"3.3k",Rb:"100k"},
    T7:{type:"bjt_feedback",npn:false,Vcc:"10V",Rc:"150Ω",Rb:"100k"},
    R1:{type:"bjt_region",npn:true,VAl:"15V",Rc:"7.5k",Re:"5k"},
    R2:{type:"bjt_region_pnp",VAl:"15V",Re:"3.3k",Rc:"0.7k"},
    R3:{type:"bjt_div",npn:true,Vcc:"15V",Rb1:"20k",Rb2:"10k",Rc:"3k",Re:"2k"},
    R4:{type:"bjt_div",npn:true,Vcc:"12V",Rb1:"10k",Rb2:"5k",Rc:"2k",Re:"1.7k"}
  };
  function forProblem(id){return PROB[id]||null;}
  return {draw,forProblem};
})();
