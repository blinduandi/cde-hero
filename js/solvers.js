/* ============================================================
   SOLVERS — generatoare de probleme cu valori aleatoare + auto-soluție.
   Fiecare generator returnează: {title, givens, diagram, asks[], steps[]}
   asks: {key, label, unit, answer, tol}
   ============================================================ */
const R = {
  pick:a=>a[Math.floor(Math.random()*a.length)],
  rint:(a,b)=>a+Math.floor(Math.random()*(b-a+1)),
  round:(x,n=2)=>{const f=10**n; return Math.round(x*f)/f;}
};
function nf(x){ // format number nicely
  if(Math.abs(x)>=100) return R.round(x,1).toString();
  if(Math.abs(x)>=10)  return R.round(x,2).toString();
  return R.round(x,3).toString();
}

/* ---------- 1. Rețea de rezistoare (serie + paralel) ---------- */
function genResNet(){
  const R1=R.pick([5,8,10,12,15,20]), R2=R.pick([10,12,18,20,22,30]);
  const R3=R.pick([10,20,30,40,60]), R4=R.pick([10,20,30,40,60]);
  const V=R.pick([9,12,15,18,24]);
  const R34=(R3*R4)/(R3+R4);
  const RE=R1+R2+R34;
  const I=V/RE;
  return {
   title:"Rețea serie cu un grup paralel",
   schema:{type:"resnet",V:V+"V",R1:R1+"Ω",R2:R2+"Ω",R3:R3+"Ω",R4:R4+"Ω"},
   givens:`R₁=${R1} Ω · R₂=${R2} Ω · R₃=${R3} Ω · R₄=${R4} Ω (R₃‖R₄) · V=${V} V`,
   diagram:`+${V}V ─[R1=${R1}]─[R2=${R2}]─┬─[R3=${R3}]─┬─\n                     └─[R4=${R4}]─┘ │\n   └────────(A)──────────────────┘`,
   asks:[
     {key:"RE",label:"Rezistența echivalentă R<sub>E</sub>",unit:"Ω",answer:RE,tol:0.02},
     {key:"I", label:"Curentul total I",unit:"A",answer:I,tol:0.03}
   ],
   steps:[
     {e:"R₃ și R₄ sunt între aceleași noduri ⇒ în paralel. Folosim produsul peste suma; rezultatul e mai mic decât oricare.",
      c:`R₃₄ = \\frac{R₃·R₄}{R₃+R₄} = \\frac{${R3}·${R4}}{${R3}+${R4}} = <b>${nf(R34)} Ω</b>`},
     {e:"R₁, R₂ și grupul R₃₄ sunt în serie (același curent prin toate) ⇒ se adună.",
      c:`R<sub>E</sub> = ${R1} + ${R2} + ${nf(R34)} = <b>${nf(RE)} Ω</b>`},
     {e:"Sursa vede o singură rezistență ⇒ legea lui Ohm pe tot circuitul.",
      c:`I = \\frac{V}{R<sub>E</sub>} = \\frac{${V}}{${nf(RE)}} = <b>${nf(I)} A</b>`}
   ]
  };
}

/* ---------- 2. Divizor de tensiune ---------- */
function genDivider(){
  const R1=R.pick([10,20,1000,2200,4700,6800]), R2=R.pick([20,30,40,1000,3300,12000]);
  const V=R.pick([5,9,12,15,24,36]);
  const RT=R1+R2, I=V/RT, VR1=V*R1/RT, VR2=V*R2/RT;
  const big=RT>=1000;
  return {
   title:"Divizor de tensiune (2 rezistoare în serie)",
   schema:{type:"divider",Vs:V+"V",R1:(R1>=1000?R1/1e3+"k":R1+"Ω"),R2:(R2>=1000?R2/1e3+"k":R2+"Ω")},
   givens:`R₁=${R1} Ω · R₂=${R2} Ω · V<sub>S</sub>=${V} V`,
   diagram:`+${V}V ─[R1=${R1}]─┬─ Vo\n              [R2=${R2}]\n               └─ GND`,
   asks:[
     {key:"VR1",label:"Căderea pe R₁ (V<sub>R1</sub>)",unit:"V",answer:VR1,tol:0.02},
     {key:"VR2",label:"Căderea pe R₂ (V<sub>R2</sub>)",unit:"V",answer:VR2,tol:0.02},
     {key:"I",label:`Curentul (${big?"mA":"A"})`,unit:big?"mA":"A",answer:big?I*1000:I,tol:0.03}
   ],
   steps:[
     {e:"Serie ⇒ rezistența totală e suma.",
      c:`R<sub>T</sub> = R₁ + R₂ = ${R1} + ${R2} = <b>${RT} Ω</b>`},
     {e:"Același curent prin ambele rezistoare (serie).",
      c:`I = V<sub>S</sub>/R<sub>T</sub> = ${V}/${RT} = <b>${nf(big?I*1000:I)} ${big?"mA":"A"}</b>`},
     {e:"Regula divizorului: fiecare rezistor ia o fracțiune din tensiune proporțională cu valoarea lui.",
      c:`V<sub>R1</sub> = V<sub>S</sub>·R₁/R<sub>T</sub> = ${V}·${R1}/${RT} = <b>${nf(VR1)} V</b>`},
     {e:"La fel pentru R₂. Verificare: suma căderilor = tensiunea sursei.",
      c:`V<sub>R2</sub> = ${V}·${R2}/${RT} = <b>${nf(VR2)} V</b> &nbsp;(${nf(VR1)}+${nf(VR2)} ≈ ${V} V ✓)`}
   ]
  };
}

/* ---------- 3. BJT NPN cu două surse (IB, β date) ---------- */
function genBjtTwoSupply(){
  const beta=R.pick([100,150,200,239,250,280,310]);
  const IB=R.pick([10,20,25,30,40])/1e6; // A
  const R1=R.pick([100,120,150,180,200])*1e3;
  const V1=R.pick([5,6,8,10]);
  const Rc=R.pick([0.5,1,1.2,1.5,2])*1e3;
  let V2=R.pick([10,12,15]);
  const IC=beta*IB;
  // ensure UCE>0.3
  while(V2 - Rc*IC < 0.3){ V2=R.pick([12,15,18]); }
  const UBE=V1-R1*IB, UCE=V2-Rc*IC;
  return {
   title:"NPN polarizat cu DOUĂ surse (se dau I<sub>B</sub> și β)",
   schema:{type:"bjt_2supply",npn:true,V1:V1+"V",R1:R1/1e3+"k",V2:V2+"V",Rc:Rc/1e3+"k"},
   givens:`V₁=${V1} V · R₁=${R1/1e3} kΩ · V₂=${V2} V · R<sub>C</sub>=${Rc/1e3} kΩ · I<sub>B</sub>=${IB*1e6} µA · β=${beta}`,
   diagram:`V2=${V2}V        V1=${V1}V\n  │             │\n[Rc=${Rc/1e3}k]   [R1=${R1/1e3}k]\n  C──┐     ┌────B\n     (NPN T)\n     E\n     │\n    GND`,
   asks:[
     {key:"IC",label:"I<sub>C</sub>",unit:"mA",answer:IC*1000,tol:0.02},
     {key:"UBE",label:"U<sub>BE</sub>",unit:"V",answer:UBE,tol:0.03},
     {key:"UCE",label:"U<sub>CE</sub>",unit:"V",answer:UCE,tol:0.03}
   ],
   steps:[
     {e:"În regim activ colectorul amplifică baza de β ori — relația fundamentală a tranzistorului.",
      c:`I<sub>C</sub> = β·I<sub>B</sub> = ${beta}·${IB*1e6}µA = <b>${nf(IC*1000)} mA</b>`},
     {e:"KVL pe ochiul de intrare (V₁, R₁, joncțiunea BE): U<sub>BE</sub> = ce rămâne din V₁ după căderea pe R₁.",
      c:`U<sub>BE</sub> = V₁ − R₁·I<sub>B</sub> = ${V1} − ${R1/1e3}k·${IB*1e6}µA = <b>${nf(UBE)} V</b>`},
     {e:"KVL pe ochiul de ieșire (V₂, R<sub>C</sub>, joncțiunea CE).",
      c:`U<sub>CE</sub> = V₂ − R<sub>C</sub>·I<sub>C</sub> = ${V2} − ${Rc/1e3}k·${nf(IC*1000)}mA = <b>${nf(UCE)} V</b>`}
   ]
  };
}

/* ---------- 4. BJT NPN o sursă, R1 în bază + RE ---------- */
function genBjtSingleRE(){
  const beta=R.pick([100,150,200,239,250]);
  const V=R.pick([9,10,12,15]);
  const R1=R.pick([330,470,560,680])*1e3;
  const R2=R.pick([0.5,1,1.5,2])*1e3;
  const Ube=R.pick([0.6,0.7]);
  const IB=(V-Ube)/(R1+R2*(beta+1));
  const IC=beta*IB, IE=(beta+1)*IB, UCE=V-R2*IE;
  return {
   title:"NPN cu O sursă: R₁ în bază + R<sub>E</sub> (colector la +V)",
   schema:{type:"bjt_singleRE",Vcc:V+"V",Rb:R1/1e3+"k",Re:R2/1e3+"k"},
   givens:`V=${V} V · R₁=${R1/1e3} kΩ · R₂(R<sub>E</sub>)=${R2/1e3} kΩ · U<sub>BE</sub>=${Ube} V · β=${beta}`,
   asks:[
     {key:"IB",label:"I<sub>B</sub>",unit:"µA",answer:IB*1e6,tol:0.04},
     {key:"IC",label:"I<sub>C</sub>",unit:"mA",answer:IC*1000,tol:0.04},
     {key:"UCE",label:"U<sub>CE</sub>",unit:"V",answer:UCE,tol:0.04}
   ],
   steps:[
     {e:"KVL pe bază-emitor. Prin R₂(R<sub>E</sub>) trece curentul de <b>emitor</b> I<sub>E</sub>=(β+1)·I<sub>B</sub>, nu I<sub>B</sub>; de aceea R₂ apare multiplicat cu (β+1).",
      c:`V = U<sub>BE</sub> + R₁·I<sub>B</sub> + R₂·(β+1)·I<sub>B</sub>`},
     {e:"Scot I<sub>B</sub>.",
      c:`I<sub>B</sub> = (V−U<sub>BE</sub>)/[R₁+R₂·(β+1)] = (${V}−${Ube})/[${R1/1e3}k+${R2/1e3}k·${beta+1}] = <b>${nf(IB*1e6)} µA</b>`},
     {e:"Relațiile tranzistorului.",
      c:`I<sub>C</sub> = β·I<sub>B</sub> = <b>${nf(IC*1000)} mA</b> ; I<sub>E</sub> = (β+1)·I<sub>B</sub> = <b>${nf(IE*1000)} mA</b>`},
     {e:"KVL pe colector-emitor: colectorul e la +V, deci scad doar căderea pe R₂.",
      c:`U<sub>CE</sub> = V − R₂·I<sub>E</sub> = ${V} − ${R2/1e3}k·${nf(IE*1000)}mA = <b>${nf(UCE)} V</b>`}
   ]
  };
}

/* ---------- 5. BJT NPN cu divizor — PSF ---------- */
function genBjtDivider(){
  let tries=0, Vcc,Rb1,Rb2,Rc,Re,beta,Ube,UB,IE,IB,IC,UCE;
  do{
    Vcc=R.pick([9,10,12,15]);
    Rb1=R.pick([33,47,56,68,22])*1e3;
    Rb2=R.pick([8,10,12,15])*1e3;
    Rc=R.pick([1,1.5,2,2.2,3,3.3])*1e3;
    Re=R.pick([0.47,0.56,0.68,1,1.2,1.5,2])*1e3;
    beta=R.pick([100,150,200,250,300,310]);
    Ube=R.pick([0.6,0.7]);
    UB=Vcc*Rb2/(Rb1+Rb2);
    IE=(UB-Ube)/Re; IB=IE/(beta+1); IC=beta*IB;
    UCE=Vcc-IC*Rc-IE*Re;
    tries++;
  } while((UCE<0.8 || UCE>Vcc-0.8 || UB<=Ube+0.2) && tries<60);
  return {
   title:"NPN cu DIVIZOR de tensiune — punctul static de funcționare (PSF)",
   schema:{type:"bjt_div",npn:true,Vcc:Vcc+"V",Rb1:Rb1/1e3+"k",Rb2:Rb2/1e3+"k",Rc:Rc/1e3+"k",Re:(Re>=1000?Re/1e3+"k":Re+"Ω")},
   givens:`V<sub>CC</sub>=${Vcc} V · R<sub>B1</sub>=${Rb1/1e3} kΩ · R<sub>B2</sub>=${Rb2/1e3} kΩ · R<sub>C</sub>=${Rc/1e3} kΩ · R<sub>E</sub>=${Re/1e3} kΩ · U<sub>BE</sub>=${Ube} V · β=${beta}`,
   diagram:`+Vcc=${Vcc}V ─┬───────────┐\n        [Rb1=${Rb1/1e3}k]  [Rc=${Rc/1e3}k]\n           ├─B   C─┘\n        [Rb2=${Rb2/1e3}k] (NPN)\n           │    E\n          GND [Re=${Re/1e3}k]\n                 │\n                GND`,
   asks:[
     {key:"UB",label:"Potențialul bazei U<sub>B</sub>",unit:"V",answer:UB,tol:0.03},
     {key:"IC",label:"I<sub>C</sub> (≈I<sub>E</sub>)",unit:"mA",answer:IC*1000,tol:0.04},
     {key:"UCE",label:"U<sub>CE</sub> (PSF)",unit:"V",answer:UCE,tol:0.05}
   ],
   steps:[
     {e:"Divizorul R<sub>B1</sub>-R<sub>B2</sub> fixează potențialul bazei (regula divizorului de tensiune).",
      c:`U<sub>B</sub> = V<sub>CC</sub>·R<sub>B2</sub>/(R<sub>B1</sub>+R<sub>B2</sub>) = ${Vcc}·${Rb2/1e3}k/${(Rb1+Rb2)/1e3}k = <b>${nf(UB)} V</b>`},
     {e:"Din U<sub>B</sub> scad U<sub>BE</sub> și obțin tensiunea pe R<sub>E</sub>; împărțind la R<sub>E</sub> aflu curentul (I<sub>E</sub>≈I<sub>C</sub>).",
      c:`I<sub>E</sub> = (U<sub>B</sub>−U<sub>BE</sub>)/R<sub>E</sub> = (${nf(UB)}−${Ube})/${Re/1e3}k = <b>${nf(IE*1000)} mA</b>`},
     {e:"Trec la I<sub>B</sub> și I<sub>C</sub>.",
      c:`I<sub>B</sub> = I<sub>E</sub>/(β+1) = ${nf(IB*1e6)} µA ; I<sub>C</sub> = β·I<sub>B</sub> = <b>${nf(IC*1000)} mA</b>`},
     {e:"KVL pe ieșire: din V<sub>CC</sub> scad căderile pe R<sub>C</sub> și R<sub>E</sub>.",
      c:`U<sub>CE</sub> = V<sub>CC</sub> − R<sub>C</sub>·I<sub>C</sub> − R<sub>E</sub>·I<sub>E</sub> = ${Vcc} − ${Rc/1e3}k·${nf(IC*1000)}mA − ${Re/1e3}k·${nf(IE*1000)}mA = <b>${nf(UCE)} V</b>`},
     {e:"Punctul static de funcționare = perechea (I<sub>C</sub>, U<sub>CE</sub>).",
      c:`<b>PSF: (${nf(IC*1000)} mA ; ${nf(UCE)} V)</b>`}
   ]
  };
}

/* ---------- 6. BJT NPN cu reacție în colector ---------- */
function genBjtFeedback(){
  let Vcc,Rc,Rb,Ube,beta,IB,IC,UCE,tries=0;
  do{
    Vcc=R.pick([9,10,12,15]);
    Rc=R.pick([1.5,2,2.2,3,3.3,4.7])*1e3;
    Rb=R.pick([100,150,180,220,330])*1e3;
    Ube=R.pick([0.6,0.7]);
    beta=R.pick([100,150,200,250,280]);
    IB=(Vcc-Ube)/(Rc*beta+Rb);
    IC=beta*IB; UCE=Vcc-Rc*IC;
    tries++;
  } while((UCE<0.5||UCE>Vcc-0.5)&&tries<60);
  return {
   title:"NPN cu REACȚIE în colector (R<sub>B</sub> de la colector la bază)",
   schema:{type:"bjt_feedback",npn:true,Vcc:Vcc+"V",Rc:Rc/1e3+"k",Rb:Rb/1e3+"k"},
   givens:`V<sub>CC</sub>=${Vcc} V · R<sub>C</sub>=${Rc/1e3} kΩ · R<sub>B</sub>=${Rb/1e3} kΩ · U<sub>BE</sub>=${Ube} V · β=${beta}`,
   diagram:`+Vcc=${Vcc}V\n   │\n [Rc=${Rc/1e3}k]\n   ├──────[Rb=${Rb/1e3}k]──┐\n   C  (NPN)              B\n   E\n   │\n  GND`,
   asks:[
     {key:"IB",label:"I<sub>B</sub>",unit:"µA",answer:IB*1e6,tol:0.05},
     {key:"IC",label:"I<sub>C</sub>",unit:"mA",answer:IC*1000,tol:0.05},
     {key:"UCE",label:"U<sub>CE</sub>",unit:"V",answer:UCE,tol:0.05}
   ],
   steps:[
     {e:"Prin R<sub>C</sub> trece I<sub>C</sub>+I<sub>B</sub>≈I<sub>C</sub>. KVL pe ochiul V<sub>CC</sub>–R<sub>C</sub>–R<sub>B</sub>–BE, cu I<sub>C</sub>=β·I<sub>B</sub>.",
      c:`R<sub>C</sub>·β·I<sub>B</sub> + R<sub>B</sub>·I<sub>B</sub> + U<sub>BE</sub> = V<sub>CC</sub>`},
     {e:"Scot I<sub>B</sub>.",
      c:`I<sub>B</sub> = (V<sub>CC</sub>−U<sub>BE</sub>)/(R<sub>C</sub>·β+R<sub>B</sub>) = (${Vcc}−${Ube})/(${Rc/1e3}k·${beta}+${Rb/1e3}k) = <b>${nf(IB*1e6)} µA</b>`},
     {e:"Curentul de colector.",
      c:`I<sub>C</sub> = β·I<sub>B</sub> = <b>${nf(IC*1000)} mA</b>`},
     {e:"KVL pe V<sub>CC</sub>–R<sub>C</sub>–CE (emitorul la masă).",
      c:`U<sub>CE</sub> = V<sub>CC</sub> − R<sub>C</sub>·I<sub>C</sub> = ${Vcc} − ${Rc/1e3}k·${nf(IC*1000)}mA = <b>${nf(UCE)} V</b>`}
   ]
  };
}

/* ---------- 7. BJT — regiunea de funcționare ---------- */
function genBjtRegion(){
  const Rc=R.pick([2,3,4.7,5,7.5])*1e3;
  const Re=R.pick([1,2,3,5])*1e3;
  const VAl=R.pick([12,15,18]);
  const vBE=0.7, VCEsat=0.2;
  const ICex=(VAl-VCEsat)/(Rc+Re);
  const Vimax=ICex*Re+vBE;
  // pick a VI that lands in one of three regions
  const mode=R.pick(["bloc","activ","sat"]);
  let VI;
  if(mode==="bloc") VI=R.round(R.pick([0.2,0.3,0.4,0.5]),2);
  else if(mode==="activ") VI=R.round(vBE+ (Vimax-vBE)*R.pick([0.3,0.4,0.5,0.6]),2);
  else VI=R.round(Vimax + R.pick([0.5,1,1.5,2]),2);
  const IC = VI<vBE ? 0 : (VI-vBE)/Re;
  const region = VI<vBE ? "blocare" : (IC<ICex?"activ":"saturație");
  return {
   title:"NPN — în ce regiune lucrează tranzistorul?",
   schema:{type:"bjt_region",npn:true,VAl:VAl+"V",Rc:Rc/1e3+"k",Re:Re/1e3+"k"},
   givens:`R<sub>C</sub>=${Rc/1e3} kΩ · R<sub>E</sub>=${Re/1e3} kΩ · V<sub>Al</sub>=${VAl} V · v<sub>BE,on</sub>=${vBE} V · V<sub>CE,sat</sub>=${VCEsat} V · <b>V<sub>I</sub>=${VI} V</b>`,
   asks:[
     {key:"ICex",label:"Curentul de saturație I<sub>Cex</sub>",unit:"mA",answer:ICex*1000,tol:0.03},
     {key:"IC",label:`I<sub>C</sub> pentru V<sub>I</sub>=${VI} V`,unit:"mA",answer:IC*1000,tol:0.04},
     {key:"Vimax",label:"Limita superioară a domeniului activ",unit:"V",answer:Vimax,tol:0.03}
   ],
   steps:[
     {e:"Calculez curentul de prag spre saturație (dacă U<sub>CE</sub> ar fi la valoarea de saturație). E reperul cu care compar.",
      c:`I<sub>Cex</sub> = (V<sub>Al</sub>−V<sub>CE,sat</sub>)/(R<sub>C</sub>+R<sub>E</sub>) = (${VAl}−${VCEsat})/${(Rc+Re)/1e3}k = <b>${nf(ICex*1000)} mA</b>`},
     {e: VI<vBE ? "Verific dacă joncțiunea BE conduce: V<sub>I</sub> trebuie să depășească v<sub>BE,on</sub>." : "V<sub>I</sub>>v<sub>BE,on</sub> ⇒ conduce. Calculez curentul real I<sub>C</sub>.",
      c: VI<vBE
        ? `V<sub>I</sub>=${VI} V &lt; ${vBE} V ⟹ <b>BLOCARE</b> (I<sub>C</sub>=0)`
        : `I<sub>C</sub> = (V<sub>I</sub>−v<sub>BE,on</sub>)/R<sub>E</sub> = (${VI}−${vBE})/${Re/1e3}k = <b>${nf(IC*1000)} mA</b>`},
     {e: VI<vBE ? "Pentru referință, domeniul în care ar fi activ." : "Compar I<sub>C</sub> cu I<sub>Cex</sub>: mai mic ⇒ activ; mai mare ⇒ saturație (tranzistorul nu poate da atâta curent).",
      c: VI<vBE
        ? `Domeniu activ: V<sub>I</sub> ∈ [${vBE} ; ${nf(Vimax)}] V`
        : (IC<ICex
           ? `${nf(IC*1000)} &lt; ${nf(ICex*1000)} ⟹ <b>REGIUNE ACTIVĂ</b>`
           : `${nf(IC*1000)} &gt; ${nf(ICex*1000)} ⟹ <b>SATURAȚIE</b>`)},
     {e:"Domeniul activ se obține din condiția I<sub>C</sub> < I<sub>Cex</sub> rezolvată pentru V<sub>I</sub> (plus condiția de conducție).",
      c:`V<sub>I</sub> ∈ [${vBE} ; ${nf(Vimax)}] V`},
     {e:"Concluzia finală pentru valoarea dată.",
      c:`<b>Regim de ${region}.</b>`}
   ]
  };
}

/* ---------- 8. Circuit cu diodă (c.c.) ---------- */
function genDiode(){
  const E=R.pick([4,5,6,9,10,12,15]);
  const Rk=R.pick([0.1,0.22,0.33,0.47,1,2.2])*1e3;
  const VD=R.pick([0.6,0.7]);
  const VT=0.025;
  const ID=(E-VD)/Rk;
  const RD=VD/ID, rd=VT/ID;
  return {
   title:"Circuit cu diodă în c.c. (E în serie cu R și D)",
   schema:{type:"diode",E:E+"V",R:(Rk>=1000?Rk/1e3+"k":Rk+"Ω")},
   givens:`E=${E} V · R=${Rk>=1000?(Rk/1e3+" kΩ"):(Rk+" Ω")} · V<sub>D</sub>=${VD} V · V<sub>T</sub>=25 mV`,
   diagram:`+E(${E}V) ─[R=${Rk>=1000?Rk/1e3+"k":Rk}]─►|─ GND  (anod→catod)`,
   asks:[
     {key:"ID",label:"I<sub>D</sub>",unit:"mA",answer:ID*1000,tol:0.03},
     {key:"RD",label:"Rezistența de c.c. R<sub>D</sub>",unit:"Ω",answer:RD,tol:0.04},
     {key:"rd",label:"Rezistența de semnal mic r<sub>d</sub>",unit:"Ω",answer:rd,tol:0.04}
   ],
   steps:[
     {e:"Anodul e mai pozitiv ⇒ conducție directă. Înlocuiesc dioda cu o sursă V<sub>D</sub> și scriu KVL pe buclă.",
      c:`R·I<sub>D</sub> + V<sub>D</sub> − E = 0`},
     {e:"Scot curentul.",
      c:`I<sub>D</sub> = (E−V<sub>D</sub>)/R = (${E}−${VD})/${Rk>=1000?Rk/1e3+"k":Rk} = <b>${nf(ID*1000)} mA</b>`},
     {e:"Rezistența de c.c. = tensiunea pe diodă / curentul prin ea.",
      c:`R<sub>D</sub> = V<sub>D</sub>/I<sub>D</sub> = ${VD}/${nf(ID*1000)}mA = <b>${nf(RD)} Ω</b>`},
     {e:"Rezistența de semnal mic depinde de punctul de funcționare (curentul).",
      c:`r<sub>d</sub> = V<sub>T</sub>/I<sub>D</sub> = 25mV/${nf(ID*1000)}mA = <b>${nf(rd)} Ω</b>`}
   ]
  };
}

const GENERATORS = [
  {key:"resnet", name:"Rețea de rezistoare (serie/paralel)", cat:"ohm",  fn:genResNet},
  {key:"divider",name:"Divizor de tensiune",                 cat:"div",  fn:genDivider},
  {key:"diode",  name:"Circuit cu diodă (c.c.)",             cat:"diode",fn:genDiode},
  {key:"bjt2",   name:"BJT NPN — două surse (I_B, β)",        cat:"bjt",  fn:genBjtTwoSupply},
  {key:"bjtre",  name:"BJT NPN — o sursă cu R_E",             cat:"bjt",  fn:genBjtSingleRE},
  {key:"bjtdiv", name:"BJT NPN — divizor (PSF)",              cat:"bjt",  fn:genBjtDivider},
  {key:"bjtfb",  name:"BJT NPN — reacție în colector",        cat:"bjt",  fn:genBjtFeedback},
  {key:"bjtreg", name:"BJT NPN — regiunea de funcționare",    cat:"bjtreg",fn:genBjtRegion}
];
