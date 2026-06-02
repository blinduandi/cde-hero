/* ============================================================
   APP — navigație, randare, antrenament interactiv, flashcards, bilet.
   ============================================================ */
const LS = {
  get:(k,d)=>{try{return JSON.parse(localStorage.getItem("cde_"+k))??d;}catch(e){return d;}},
  set:(k,v)=>localStorage.setItem("cde_"+k,JSON.stringify(v))
};
const view = document.getElementById("view");
const nav  = document.getElementById("nav");
let done = LS.get("done", {});       // temaId -> true
let state = {view:"home"};

/* ---------- NAV ---------- */
const NAVDEF = [
  {group:"Start", items:[
    {id:"home", ic:"🏠", label:"Acasă"},
    {id:"bilet",ic:"📝", label:"Bilet model (simulare)"}
  ]},
  {group:"Teorie (Tema 1–6)", items:
    TEME.map(t=>({id:t.id, ic:t.icon, label:"Tema "+t.num+" — "+t.short, tema:true}))
  },
  {group:"Practică", items:[
    {id:"metoda", ic:"🧭", label:"Cum rezolv problema (pas cu pas)"},
    {id:"probleme", ic:"✅", label:"Probleme rezolvate"},
    {id:"antrenament", ic:"🏋️", label:"Antrenament (auto-verificare)"},
    {id:"intrebari", ic:"🃏", label:"Întrebări examen (flashcards)"},
    {id:"test", ic:"🧠", label:"Test teorie (învățare)"},
    {id:"formule", ic:"📐", label:"Formule esențiale"},
    {id:"resurse", ic:"🔗", label:"Resurse online"}
  ]}
];

function renderNav(){
  nav.innerHTML="";
  NAVDEF.forEach(g=>{
    const h=document.createElement("div"); h.className="nav-group"; h.textContent=g.group; nav.appendChild(h);
    g.items.forEach(it=>{
      const d=document.createElement("div");
      d.className="nav-item"+(state.view===it.id?" active":"")+(it.tema&&done[it.id]?" done":"");
      d.innerHTML=`<span class="ic">${it.ic}</span><span class="lbl">${it.label}</span>`+(it.tema?`<span class="dot"></span>`:"");
      d.onclick=()=>go(it.id);
      d.dataset.search=(it.label).toLowerCase();
      nav.appendChild(d);
    });
  });
  updateProgress();
}

function updateProgress(){
  const total=TEME.length;
  const d=TEME.filter(t=>done[t.id]).length;
  const pct=Math.round(100*d/total);
  document.getElementById("prog-pct").textContent=pct+"%";
  document.getElementById("prog-fill").style.width=pct+"%";
}

/* ---------- ROUTER ---------- */
function go(id){
  state.view=id;
  closeMenu();
  window.scrollTo(0,0);
  if(VIEWS[id]) VIEWS[id]();
  else if(id.startsWith("t")) renderTema(id);
  typesetMath(view);
  renderNav();
}

/* ---------- VIEWS ---------- */
const VIEWS = {
  home(){
    const tiles=[
      {id:"bilet",ic:"📝",h:"Simulează un bilet",p:"3 întrebări teoretice + 1 problemă, exact ca la examen."},
      {id:"metoda",ic:"🧭",h:"Cum rezolv problema (pas cu pas)",p:"Metoda pentru problema de tranzistor: la ce te uiți, ce formulă, când și de ce."},
      {id:"antrenament",ic:"🏋️",h:"Antrenament cu auto-verificare",p:"Probleme cu valori aleatoare; introduci răspunsul, primești punctaj + soluția."},
      {id:"probleme",ic:"✅",h:"Probleme rezolvate",p:"Toate problemele din pptx-uri, rezolvate pas cu pas."},
      {id:"intrebari",ic:"🃏",h:"Flashcards examen",p:"Întrebări teoretice tip bilet cu răspuns model."},
      {id:"test",ic:"🧠",h:"Test teorie (învățare)",p:"Te autoevaluezi pe cele 70 de întrebări; reține ce greșești și ți le dă din nou."},
      {id:"t4",ic:"📡",h:"Tema 4 — Tranzistoare bipolare",p:"Cel mai probabil subiect de problemă. Începe aici."},
      {id:"formule",ic:"📐",h:"Formule esențiale",p:"Toate formulele de care ai nevoie, pe o pagină."}
    ];
    view.innerHTML=`
      <div class="crumb">Pregătire examen · CDE · UTM</div>
      <h1>De la 0 la Hero 🚀</h1>
      <p class="lead">Tot ce ai trimis — teorie (Tema 1–6) și toate problemele rezolvate — într-un singur instrument. Învață teoria, exersează problemele cu auto-verificare și simulează biletul de examen.</p>

      <div class="card">
        <h3 style="margin-top:0">📋 Structura biletului de examen</h3>
        <p>Biletul conține <b>3 întrebări teoretice</b> (din cele 6 teme) + <b>1 problemă</b> (de obicei polarizarea unui tranzistor bipolar / analiză de circuit).</p>
        <p style="color:var(--muted);font-size:13px">Ex. real (Biletul 4): 1) Kirchhoff, Ohm, rezistoare, condensatoare · 2) Tranzistorul bipolar: funcționare, tipuri, regimuri · 3) Etaje de amplificare cu TB · 4) Problemă de circuit.</p>
        <div class="btnrow"><button class="btn" onclick="go('bilet')">📝 Generează un bilet de probă</button></div>
      </div>

      <h2>Pornește rapid</h2>
      <div class="grid c3">
        ${tiles.map(t=>`<div class="tile" onclick="go('${t.id}')"><div class="t-ic">${t.ic}</div><h3>${t.h}</h3><p>${t.p}</p></div>`).join("")}
      </div>

      <h2>Plan de învățare (azi → mâine)</h2>
      <div class="card">
        <ol>
          <li><b>Tema 4 (Tranzistoare bipolare)</b> + <b>Antrenament BJT</b> — aici e problema de pe bilet. Exersează până rezolvi singur 5 la rând. ✅</li>
          <li><b>Tema 1</b> (Ohm/Kirchhoff) + <b>Antrenament rețele/divizoare</b> — calcule sigure.</li>
          <li><b>Temele 2, 3, 5, 6</b> — citește teoria + flashcards.</li>
          <li><b>Probleme rezolvate</b> — verifică-ți metoda pas cu pas.</li>
          <li><b>2–3 bilete de probă</b> — simulează examenul cronometrat.</li>
        </ol>
      </div>`;
  },

  probleme(){
    const cats=Object.keys(CATS);
    view.innerHTML=`<div class="crumb">Practică</div><h1>✅ Probleme rezolvate</h1>
      <p class="lead">Toate problemele din prezentările tale, transcrise și rezolvate pas cu pas. Apasă pe o problemă pentru a vedea soluția.</p>
      <div class="btnrow" id="catfilter"></div>
      <div id="problist"></div>`;
    const filter=document.getElementById("catfilter");
    let active="all";
    const mkBtn=(k,name)=>{const b=document.createElement("button");b.className="btn sm "+(active===k?"":"sec");b.innerHTML=name;b.onclick=()=>{active=k;draw();[...filter.children].forEach(c=>c.classList.add("sec"));b.classList.remove("sec");};return b;};
    filter.appendChild(mkBtn("all","Toate"));
    cats.forEach(c=>filter.appendChild(mkBtn(c,CATS[c].icon+" "+CATS[c].name)));
    const list=document.getElementById("problist");
    function draw(){
      const items=PROBLEME.filter(p=>active==="all"||p.cat===active);
      list.innerHTML=items.map(p=>probHTML(p)).join("");
      wireProblems(list);
    }
    draw();
  },

  antrenament(){
    view.innerHTML=`<div class="crumb">Practică</div><h1>🏋️ Antrenament cu auto-verificare</h1>
      <p class="lead">Alege un tip de problemă (sau „Aleator"), generează, calculează pe foaie și introdu răspunsurile. Aplicația le verifică și îți arată soluția completă.</p>
      <div class="card">
        <div class="field">
          <label>Tip de problemă</label>
          <select id="gentype" class="quiz-input" style="width:auto;min-width:280px">
            <option value="rand">🎲 Aleator (orice tip)</option>
            ${GENERATORS.map(g=>`<option value="${g.key}">${g.name}</option>`).join("")}
          </select>
          <button class="btn" id="gennew">Generează problemă</button>
        </div>
        <div class="scorebar">
          <span class="s">Corecte: <b id="sc-ok">0</b></span>
          <span class="s">Încercări: <b id="sc-try">0</b></span>
          <span class="s">Acuratețe: <b id="sc-pct">—</b></span>
          <button class="ghost-btn" id="sc-reset">Resetează scorul</button>
        </div>
      </div>
      <div id="quizarea"></div>`;
    let score=LS.get("score",{ok:0,tries:0});
    const upd=()=>{document.getElementById("sc-ok").textContent=score.ok;document.getElementById("sc-try").textContent=score.tries;document.getElementById("sc-pct").textContent=score.tries?Math.round(100*score.ok/score.tries)+"%":"—";LS.set("score",score);};
    upd();
    document.getElementById("sc-reset").onclick=()=>{score={ok:0,tries:0};upd();};
    const area=document.getElementById("quizarea");
    function newProblem(){
      const sel=document.getElementById("gentype").value;
      const gen= sel==="rand" ? R.pick(GENERATORS) : GENERATORS.find(g=>g.key===sel);
      const pr=gen.fn();
      area.innerHTML=quizHTML(pr,gen.name);
      wireSteps(area);
      const checkBtn=area.querySelector("#q-check");
      const solBtn=area.querySelector("#q-sol");
      const solBox=area.querySelector("#q-solbox");
      const res=area.querySelector("#q-res");
      let counted=false;
      checkBtn.onclick=()=>{
        let allok=true, anyfilled=false;
        pr.asks.forEach((a,i)=>{
          const inp=area.querySelector("#qi"+i);
          const v=parseFloat(inp.value.replace(",","."));
          if(inp.value.trim()!=="") anyfilled=true;
          const ok = !isNaN(v) && Math.abs(v-a.answer) <= a.tol*Math.abs(a.answer)+Math.max(1e-6,Math.abs(a.answer)*0.005);
          inp.classList.toggle("ok",ok); inp.classList.toggle("no",!ok);
          const tag=area.querySelector("#qt"+i);
          tag.innerHTML = ok?`<span class="pill good">corect</span>`:`<span class="pill bad">≠ ${nf(a.answer)} ${a.unit}</span>`;
          if(!ok) allok=false;
        });
        if(!anyfilled){res.innerHTML=`<span class="pill bad">Introdu cel puțin un răspuns.</span>`;return;}
        res.innerHTML = allok?`<span class="pill good">✔ Toate corecte! Bravo.</span>`:`<span class="pill bad">Mai verifică valorile marcate roșu.</span>`;
        if(!counted){score.tries++; if(allok)score.ok++; counted=true; upd();}
      };
      solBtn.onclick=()=>{solBox.style.display = solBox.style.display==="block"?"none":"block";};
    }
    document.getElementById("gennew").onclick=newProblem;
    newProblem();
  },

  intrebari(){
    view.innerHTML=`<div class="crumb">Practică</div><h1>🃏 Întrebări examen (flashcards)</h1>
      <p class="lead">Cele <b>70 de întrebări oficiale</b> pentru examenul final (lista de pe ELSE/UTM). La examen primești 3 dintre ele + 1 problemă. Apasă pe card pentru răspunsul model. Filtrează pe temă.</p>
      <div class="btnrow" id="qfilter"></div>
      <div id="fcwrap"></div>`;
    const filt=document.getElementById("qfilter");
    let activeT="all";
    const mk=(k,lab)=>{const b=document.createElement("button");b.className="btn sm "+(activeT===k?"":"sec");b.textContent=lab;b.onclick=()=>{activeT=k;draw();[...filt.children].forEach(c=>c.classList.add("sec"));b.classList.remove("sec");};return b;};
    filt.appendChild(mk("all","Toate"));
    [1,2,3,4,5,6].forEach(t=>filt.appendChild(mk(t,"Tema "+t)));
    const wrap=document.getElementById("fcwrap");
    function draw(){
      const items=THEORY_QA.filter(x=>activeT==="all"||x.t===activeT);
      wrap.innerHTML=items.map((x,i)=>`
        <div class="fc" id="fc${i}">
          <div class="fc-inner">
            <div class="fc-face"><div><span class="tag">Tema ${x.t}</span> <span class="tag">Î${x.n}</span><h3 style="margin:.4em 0 0">${x.q}</h3><p style="color:var(--muted);font-size:12px;margin-top:10px">(click pentru răspuns)</p></div></div>
            <div class="fc-face fc-back"><div><span class="tag">Răspuns</span><div>${x.a}</div></div></div>
          </div>
        </div>`).join("");
      items.forEach((x,i)=>{const c=document.getElementById("fc"+i);c.onclick=()=>c.classList.toggle("flipped");});
    }
    draw();
  },

  metoda(){
    // Rețete pas cu pas pentru problema de tranzistor bipolar
    const rDivizor=[
      {e:"<b>Pas 1 — tensiunea pe bază.</b> Cele două rezistoare din bază formează un <b>divizor de tensiune</b>. Aflăm potențialul bazei cu formula divizorului. (Merge fiindcă I<sub>B</sub> e foarte mic, deci aproape tot curentul trece prin ambele rezistoare.)",
       c:"U<sub>B</sub> = V<sub>CC</sub> · \\frac{R<sub>B2</sub>}{R<sub>B1</sub>+R<sub>B2</sub>}"},
      {e:"<b>Pas 2 — tensiunea pe emitor.</b> Între bază și emitor e joncțiunea deschisă, care „mănâncă” 0,7 V. Deci emitorul e cu 0,7 V mai jos decât baza.",
       c:"U<sub>E</sub> = U<sub>B</sub> − U<sub>BE</sub> = U<sub>B</sub> − 0,7 V"},
      {e:"<b>Pas 3 — curentul.</b> Prin R<sub>E</sub> trece curentul de emitor, iar tensiunea pe el e chiar U<sub>E</sub>. Legea lui Ohm îl dă. Și I<sub>C</sub> ≈ I<sub>E</sub> (diferă doar cu micul I<sub>B</sub>).",
       c:"I<sub>E</sub> = \\frac{U<sub>E</sub>}{R<sub>E</sub>} &nbsp;;&nbsp; I<sub>C</sub> ≈ I<sub>E</sub>"},
      {e:"<b>Pas 4 — tensiunea colector-emitor.</b> Scrii legea tensiunilor pe bucla de ieșire: de la +V<sub>CC</sub> scazi căderile pe R<sub>C</sub> și pe R<sub>E</sub>.",
       c:"U<sub>CE</sub> = V<sub>CC</sub> − I<sub>C</sub>·R<sub>C</sub> − I<sub>E</sub>·R<sub>E</sub> ≈ V<sub>CC</sub> − I<sub>C</sub>·(R<sub>C</sub>+R<sub>E</sub>)"},
      {e:"<b>Pas 5 — PSF și verificare.</b> Punctul static e Q(I<sub>C</sub>, U<sub>CE</sub>). Verifici că ești în regiunea activă: U<sub>CE</sub> trebuie să fie între ~0,2 V și V<sub>CC</sub>. Dacă da → corect.",
       c:"Q(I<sub>C</sub>, U<sub>CE</sub>) &nbsp;cu&nbsp; 0,2 V < U<sub>CE</sub> < V<sub>CC</sub> → <b>activ normal ✓</b>"}
    ];
    const rReactie=[
      {e:"<b>Pas 1 — trucul.</b> Aici R<sub>B</sub> se întoarce de la <b>colector</b> la bază. Prin R<sub>C</sub> trece I<sub>C</sub>+I<sub>B</sub> (și curentul spre bază trece prin R<sub>C</sub>). Aproximăm I<sub>C</sub>+I<sub>B</sub> ≈ I<sub>C</sub>.",
       c:"I<sub>RC</sub> = I<sub>C</sub> + I<sub>B</sub> ≈ I<sub>C</sub>"},
      {e:"<b>Pas 2 — legea tensiunilor pe bucla bazei.</b> De la +V<sub>CC</sub>, treci prin R<sub>C</sub>, apoi R<sub>B</sub>, apoi joncțiunea B-E (0,7 V) până la masă.",
       c:"V<sub>CC</sub> = I<sub>C</sub>·R<sub>C</sub> + I<sub>B</sub>·R<sub>B</sub> + U<sub>BE</sub>"},
      {e:"<b>Pas 3 — scoți I<sub>B</sub>.</b> Înlocuiești I<sub>C</sub>=β·I<sub>B</sub> și izolezi I<sub>B</sub>. Observă cum R<sub>C</sub> apare „mărit” de β.",
       c:"I<sub>B</sub> = \\frac{V<sub>CC</sub> − U<sub>BE</sub>}{R<sub>B</sub> + β·R<sub>C</sub>}"},
      {e:"<b>Pas 4 — restul.</b> Curentul de colector și tensiunea U<sub>CE</sub>.",
       c:"I<sub>C</sub> = β·I<sub>B</sub> &nbsp;;&nbsp; U<sub>CE</sub> = V<sub>CC</sub> − I<sub>C</sub>·R<sub>C</sub>"},
      {e:"<b>De ce e bun montajul:</b> dacă din căldură I<sub>C</sub> crește, U<sub>C</sub> scade, deci scade I<sub>B</sub>, care trage I<sub>C</sub> înapoi. Reacția stabilizează singură punctul.",
       c:"reacție negativă → PSF stabil la temperatură"}
    ];
    const rUnaSursa=[
      {e:"<b>Pas 1 — legea tensiunilor pe bucla bazei.</b> De la +V, prin R<sub>B</sub>, joncțiunea B-E (0,7 V) și R<sub>E</sub> la masă. <b>Atenție:</b> prin R<sub>E</sub> trece I<sub>E</sub>=(β+1)·I<sub>B</sub>, nu I<sub>B</sub>!",
       c:"V = I<sub>B</sub>·R<sub>B</sub> + U<sub>BE</sub> + I<sub>E</sub>·R<sub>E</sub>"},
      {e:"<b>Pas 2 — scoți I<sub>B</sub>.</b> Înlocuiești I<sub>E</sub>=(β+1)·I<sub>B</sub>. R<sub>E</sub> apare „mărit” de (β+1) — ăsta e secretul aici.",
       c:"I<sub>B</sub> = \\frac{V − U<sub>BE</sub>}{R<sub>B</sub> + (β+1)·R<sub>E</sub>}"},
      {e:"<b>Pas 3 — curenții.</b>",
       c:"I<sub>C</sub> = β·I<sub>B</sub> &nbsp;;&nbsp; I<sub>E</sub> = (β+1)·I<sub>B</sub> ≈ I<sub>C</sub>"},
      {e:"<b>Pas 4 — U<sub>CE</sub>.</b> Dacă colectorul e legat direct la +V, atunci U<sub>CE</sub> = V − I<sub>E</sub>·R<sub>E</sub>. Dacă există și R<sub>C</sub>, scazi și I<sub>C</sub>·R<sub>C</sub>.",
       c:"U<sub>CE</sub> = V − I<sub>C</sub>·R<sub>C</sub> − I<sub>E</sub>·R<sub>E</sub>"}
    ];
    const rDouaSurse=[
      {e:"<b>Pas 1 — curentul de bază.</b> Dacă nu e dat în enunț, îl scoți din bucla bazei cu prima sursă V<sub>1</sub>: V<sub>1</sub> = I<sub>B</sub>·R<sub>1</sub> + U<sub>BE</sub>.",
       c:"I<sub>B</sub> = \\frac{V<sub>1</sub> − U<sub>BE</sub>}{R<sub>1</sub>}"},
      {e:"<b>Pas 2 — curentul de colector.</b>",
       c:"I<sub>C</sub> = β·I<sub>B</sub>"},
      {e:"<b>Pas 3 — bucla colectorului cu a doua sursă V<sub>2</sub>.</b> Scrii legea tensiunilor pe partea de colector ca să afli U<sub>CE</sub>.",
       c:"U<sub>CE</sub> = V<sub>2</sub> − I<sub>C</sub>·R<sub>2</sub>"}
    ];
    const rRegiune=[
      {e:"<b>Pas 1 — verifică BLOCAREA.</b> Dacă tensiunea de comandă pe bază e sub pragul de ~0,7 V, tranzistorul nu conduce deloc: e <b>blocat</b>, I<sub>C</sub>=0.",
       c:"V<sub>I</sub> < v<sub>BE,on</sub> (≈0,7 V) → <b>BLOCARE</b>, I<sub>C</sub>=0"},
      {e:"<b>Pas 2 — presupune ACTIV și calculează.</b> Dacă a trecut de prag, presupui activ și calculezi curentul și U<sub>CE</sub> (ca la rețetele de sus).",
       c:"I<sub>C</sub> = β·I<sub>B</sub> → U<sub>CE</sub> = V<sub>Al</sub> − I<sub>C</sub>·(R<sub>C</sub>+R<sub>E</sub>)"},
      {e:"<b>Pas 3 — verifică SATURAȚIA.</b> Dacă U<sub>CE</sub> calculat iese mai mic decât 0,2 V, înseamnă că tranzistorul nu poate da atâta curent → e <b>saturat</b>. Pui U<sub>CE</sub>=0,2 V și recalculezi curentul real (de saturație).",
       c:"U<sub>CE</sub> < 0,2 V → <b>SATURAȚIE</b>: &nbsp; I<sub>C,sat</sub> = \\frac{V<sub>Al</sub> − U<sub>CE,sat</sub>}{R<sub>C</sub>+R<sub>E</sub>}"},
      {e:"<b>Pas 4 — altfel, ACTIV NORMAL.</b> Dacă U<sub>CE</sub> e între 0,2 V și V<sub>Al</sub>, ești în regiunea activă, cu valorile de la pasul 2.",
       c:"0,2 V < U<sub>CE</sub> < V<sub>Al</sub> → <b>ACTIV NORMAL</b>"},
      {e:"<b>Pas 5 — domeniul lui V<sub>I</sub> (sau R<sub>C</sub>) pentru activ.</b> Pui condițiile la limită: activ ține de la pragul de conducție (0,7 V) până la valoarea la care intră în saturație. Rezolvi inecuația.",
       c:"v<sub>BE,on</sub> < V<sub>I</sub> < V<sub>I(saturație)</sub>"}
    ];
    const recipe=(title,intro,schema,steps,summary)=>`
      <h2>${title}</h2>
      <div class="card">
        <p style="margin-top:0">${intro}</p>
        ${schemHTML(schema)}
        <div class="schem-cap">↑ așa arată schema acestui tip — învață să o recunoști dintr-o privire</div>
        ${stepFlowHTML(steps, summary)}
      </div>`;

    view.innerHTML=`<div class="crumb">Practică · Metodă</div>
      <h1>🧭 Cum rezolv problema (pas cu pas)</h1>
      <p class="lead">Problema de pe bilet (item 4) e aproape mereu un <b>tranzistor bipolar</b>. Aici înveți <b>cum gândești</b>: la ce te uiți, ce rețetă alegi, ce formulă aplici, <b>când și de ce</b>. Apasă „Începe” la fiecare rețetă ca să vezi pașii pe rând.</p>

      <div class="note"><b>⭐ Regula de aur (valabilă la aproape orice problemă):</b><br>
        <b>1)</b> Presupui că tranzistorul e în <b>regiunea activă normală</b> (cea în care amplifică).<br>
        <b>2)</b> Folosești <b>U<sub>BE</sub> ≈ 0,7 V</b> și <b>I<sub>C</sub> = β·I<sub>B</sub></b> (iar I<sub>E</sub> = I<sub>C</sub>+I<sub>B</sub> ≈ I<sub>C</sub>).<br>
        <b>3)</b> Calculezi ce ți se cere.<br>
        <b>4)</b> La final <b>VERIFICI</b>: dacă 0,2 V < U<sub>CE</sub> < V<sub>CC</sub> → chiar e activ. Dacă nu → refaci ca saturat (U<sub>CE</sub>=0,2 V) sau blocat (I<sub>C</sub>=0).</div>

      <div class="card">
        <h3 style="margin-top:0">🔍 Pasul 0 — la ce te uiți întâi (alegi rețeta)</h3>
        <p>Uită-te <b>cum e alimentată BAZA</b> — asta îți spune ce rețetă folosești:</p>
        <ul>
          <li><b>Două rezistoare în bază</b> (unul la +V, unul la masă) → <b>Rețeta 1: Divizor.</b> Începi cu U<sub>B</sub>.</li>
          <li><b>Un rezistor de la COLECTOR la bază</b> → <b>Rețeta 2: Reacție în colector.</b> R<sub>C</sub> „vede” I<sub>C</sub>+I<sub>B</sub>.</li>
          <li><b>Un singur R de la +V la bază + R<sub>E</sub> în emitor</b> → <b>Rețeta 3: O sursă.</b> Atenție la (β+1)·R<sub>E</sub>.</li>
          <li><b>Două surse separate</b> (una pe bază, una pe colector) → <b>Rețeta 4.</b> Legea tensiunilor pe fiecare buclă.</li>
          <li>Întrebarea e „<b>în ce regiune lucrează?</b>” → <b>Rețeta 5:</b> verifici blocare / activ / saturație.</li>
        </ul>
        <p style="margin-bottom:0">Și verifică tipul: <b>NPN</b> (săgeata iese din emitor) sau <b>PNP</b> (săgeata intră). Apoi ține minte cele <b>două bucle</b>: una pe <b>bază</b> (ca să afli I<sub>B</sub>) și una pe <b>colector</b> (ca să afli U<sub>CE</sub>).</p>
      </div>

      ${recipe("Rețeta 1 — Divizor de tensiune în bază (cea mai frecventă)",
        "<b>Recunoști după:</b> două rezistoare în bază (R<sub>B1</sub> sus la +V<sub>CC</sub>, R<sub>B2</sub> jos la masă), R<sub>C</sub> în colector, R<sub>E</sub> în emitor. Ex: problemele T4, R3, R4.",
        {type:"bjt_div",npn:true,Vcc:"10V",Rb1:"56k",Rb2:"12k",Rc:"2.2k",Re:"560Ω"},
        rDivizor,
        "<b>Ordinea:</b> U<sub>B</sub> (divizor) → U<sub>E</sub> = U<sub>B</sub>−0,7 → I<sub>E</sub> = U<sub>E</sub>/R<sub>E</sub> ≈ I<sub>C</sub> → U<sub>CE</sub> = V<sub>CC</sub>−I<sub>C</sub>(R<sub>C</sub>+R<sub>E</sub>) → verifici.")}

      ${recipe("Rețeta 2 — Reacție în colector",
        "<b>Recunoști după:</b> R<sub>B</sub> NU merge la +V<sub>CC</sub>, ci se întoarce de la <b>colector</b> la bază. Ex: problemele T6, T7.",
        {type:"bjt_feedback",npn:true,Vcc:"10V",Rc:"3.3k",Rb:"100k"},
        rReactie,
        "<b>Cheia:</b> I<sub>B</sub> = (V<sub>CC</sub>−0,7) / (R<sub>B</sub>+β·R<sub>C</sub>) → I<sub>C</sub>=β·I<sub>B</sub> → U<sub>CE</sub>=V<sub>CC</sub>−I<sub>C</sub>·R<sub>C</sub>.")}

      ${recipe("Rețeta 3 — O singură sursă, R<sub>B</sub> în bază + R<sub>E</sub>",
        "<b>Recunoști după:</b> o sursă, un R<sub>B</sub> de la +V la bază, R<sub>E</sub> în emitor (colectorul adesea direct la +V). Ex: problema T3.",
        {type:"bjt_singleRE",Vcc:"12V",Rb:"560k",Re:"1k"},
        rUnaSursa,
        "<b>Cheia:</b> I<sub>B</sub> = (V−0,7) / (R<sub>B</sub>+(β+1)·R<sub>E</sub>) — NU uita (β+1) la R<sub>E</sub>!")}

      ${recipe("Rețeta 4 — Două surse",
        "<b>Recunoști după:</b> două surse separate (V<sub>1</sub> spre bază, V<sub>2</sub> spre colector). Uneori I<sub>B</sub> e dat direct. Ex: problemele T1, T2.",
        {type:"bjt_2supply",npn:true,V1:"5V",R1:"100k",V2:"12V",Rc:"1k"},
        rDouaSurse,
        "<b>Cheia:</b> bucla bazei (cu V<sub>1</sub>) → I<sub>B</sub> → I<sub>C</sub>=β·I<sub>B</sub> → bucla colectorului (cu V<sub>2</sub>) → U<sub>CE</sub>.")}

      ${recipe("Rețeta 5 — „În ce regiune lucrează?” (blocare / activ / saturație)",
        "<b>Recunoști după:</b> ți se cere regiunea de funcționare pentru o tensiune de comandă V<sub>I</sub> dată (sau domeniul lui V<sub>I</sub>/R<sub>C</sub>). Aici NU presupui activ — <b>verifici</b>. Ex: problemele R1, R2.",
        {type:"bjt_region",npn:true,VAl:"15V",Rc:"7.5k",Re:"5k"},
        rRegiune,
        "<b>Logica:</b> sub prag → blocare. Peste prag, calculezi U<sub>CE</sub>: dacă < 0,2 V → saturație; altfel → activ normal.")}

      <h2>PNP — ce se schimbă</h2>
      <div class="card">
        <p style="margin-top:0">La <b>PNP</b> metoda e <b>identică</b>, doar semnele sunt „pe dos”:</p>
        <ul>
          <li>Emitorul e <b>sus</b> (spre +V), curenții circulă invers.</li>
          <li>Joncțiunea: <b>U<sub>EB</sub> ≈ 0,7 V</b> (emitorul cu 0,7 V <i>peste</i> bază).</li>
          <li>Folosești <b>U<sub>EC</sub></b> în loc de U<sub>CE</sub> și <b>U<sub>EB</sub></b> în loc de U<sub>BE</sub>.</li>
          <li><b>Sfat:</b> lucrează cu valori absolute (module) și pune semnul corect la final. Pașii (divizor, reacție etc.) sunt exact aceiași.</li>
        </ul>
      </div>

      <div class="warnbox"><b>⚠️ Capcane care te pot costa puncte:</b><br>
        • <b>(β+1)·R<sub>E</sub></b> în bucla bazei la Rețeta 3 — prin R<sub>E</sub> trece I<sub>E</sub>, nu I<sub>B</sub>. Dar la <b>divizor</b> (Rețeta 1) NU folosești asta: acolo I<sub>E</sub>=U<sub>E</sub>/R<sub>E</sub> direct.<br>
        • <b>Unități:</b> kΩ × mA = V &nbsp;|&nbsp; µA × kΩ = mV. (Ex: 40 µA × 100 kΩ = 4 V.) Lucrează în <b>kΩ și mA</b> și nu mai pierzi zerourile.<br>
        • <b>β</b> nu are unitate; I<sub>C</sub>=β·I<sub>B</sub>, iar I<sub>E</sub>=(β+1)·I<sub>B</sub> ≈ I<sub>C</sub>.<br>
        • <b>Verifică MEREU regiunea la final</b> (0,2 V < U<sub>CE</sub> < V<sub>CC</sub>).<br>
        • La <b>PNP</b>, atenție la semne; folosește U<sub>EB</sub> și U<sub>EC</sub>.</div>

      <div class="btnrow">
        <button class="btn" onclick="go('antrenament')">🏋️ Exersează acum (cu auto-verificare)</button>
        <button class="btn sec" onclick="go('probleme')">✅ Vezi probleme rezolvate</button>
      </div>`;
    wireSteps(view);
  },

  test(){
    const stats=LS.get("quizstats",{}); // n -> {good,part,bad,seen}
    const cfg={tema:"all",count:"10",mode:"random"};
    let queue=[],idx=0,results=[];

    const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
    const masteryScore=n=>{const s=stats[n];if(!s)return -100;return (s.good||0)-(s.part||0)*0.5-(s.bad||0)*2;};
    const isLearned=q=>{const s=stats[q.n];return s&&(s.good||0)>0&&(s.good||0)>=(s.bad||0);};
    function pool(){
      let arr=THEORY_QA.filter(x=>cfg.tema==="all"||x.t===cfg.tema);
      if(cfg.mode==="weak"){arr=arr.slice().sort((a,b)=>masteryScore(a.n)-masteryScore(b.n));}
      else{arr=shuffle(arr.slice());}
      const n=cfg.count==="all"?arr.length:Math.min(parseInt(cfg.count,10),arr.length);
      return arr.slice(0,n);
    }

    function renderSetup(){
      const learned=THEORY_QA.filter(isLearned).length;
      const temaBtns=`<button class="btn sm tfl" data-t="all">Toate</button>`+[1,2,3,4,5,6].map(t=>`<button class="btn sm sec tfl" data-t="${t}">Tema ${t}</button>`).join("");
      const countBtns=[["10","10 întrebări"],["20","20 întrebări"],["all","Toate (70)"]].map(([v,l])=>`<button class="btn sm ${v==="10"?"":"sec"} cfl" data-c="${v}">${l}</button>`).join("");
      const modeBtns=[["random","🎲 Aleator"],["weak","🎯 Întâi cele slabe"]].map(([v,l])=>`<button class="btn sm ${v==="random"?"":"sec"} mfl" data-m="${v}">${l}</button>`).join("");
      view.innerHTML=`<div class="crumb">Practică</div><h1>🧠 Test teorie (învățare)</h1>
        <p class="lead">Te testezi pe cele <b>70 de întrebări oficiale</b>: citești întrebarea, încerci să răspunzi din cap (sau scrii), apoi compari cu răspunsul model și te autoevaluezi. Aplicația ține minte ce greșești și ți le dă din nou (modul „Întâi cele slabe").</p>
        <div class="card">
          <div class="field"><label>Tema</label><div class="btnrow" id="tflrow">${temaBtns}</div></div>
          <div class="field"><label>Câte întrebări</label><div class="btnrow" id="cflrow">${countBtns}</div></div>
          <div class="field"><label>Ordinea</label><div class="btnrow" id="mflrow">${modeBtns}</div></div>
          <div class="btnrow"><button class="btn" id="startq">▶ Începe testul</button></div>
          <p style="color:var(--muted);font-size:13px;margin:8px 0 0">Progres total: <b>${learned}/70</b> întrebări știute &nbsp;·&nbsp; <button class="ghost-btn" id="qreset">Resetează scorul</button></p>
        </div>`;
      const wireGroup=(rowId,attr,key,parse)=>{
        const row=document.getElementById(rowId);
        row.querySelectorAll("button").forEach(b=>b.onclick=()=>{
          cfg[key]=parse?parse(b.getAttribute(attr)):b.getAttribute(attr);
          row.querySelectorAll("button").forEach(x=>x.classList.add("sec")); b.classList.remove("sec");
        });
      };
      wireGroup("tflrow","data-t","tema",v=>v==="all"?"all":+v);
      wireGroup("cflrow","data-c","count");
      wireGroup("mflrow","data-m","mode");
      document.getElementById("startq").onclick=()=>{queue=pool();if(!queue.length)return;idx=0;results=[];renderQuestion();};
      document.getElementById("qreset").onclick=()=>{if(confirm("Resetezi scorul testului de teorie?")){Object.keys(stats).forEach(k=>delete stats[k]);LS.set("quizstats",stats);renderSetup();}};
    }

    function renderQuestion(){
      const q=queue[idx];
      const pct=Math.round(100*idx/queue.length);
      view.innerHTML=`<div class="crumb">Test teorie · întrebarea ${idx+1} din ${queue.length}</div>
        <div class="qbar"><div class="qbar-fill" style="width:${pct}%"></div></div>
        <div class="card">
          <div><span class="tag">Tema ${q.t}</span> <span class="tag">Î${q.n}</span></div>
          <h2 style="margin:.3em 0 0">${q.q}</h2>
          <textarea class="quiz-input" id="qans" rows="3" placeholder="Scrie aici răspunsul tău (opțional), apoi compară-l cu cel model..." style="width:100%;margin-top:12px;resize:vertical"></textarea>
          <div class="btnrow"><button class="btn" id="reveal">Arată răspunsul model</button></div>
          <div id="modelans" style="display:none">
            <div class="answer" style="font-weight:500">${q.a}</div>
            <p style="color:var(--muted);font-size:13px;margin:14px 0 4px">Cât de bine ai știut?</p>
            <div class="btnrow">
              <button class="btn bd" data-g="bad">❌ Nu am știut</button>
              <button class="btn wn" data-g="part">🟡 Aproape</button>
              <button class="btn gd" data-g="good">✅ Am știut</button>
            </div>
          </div>
        </div>
        <div class="btnrow"><button class="btn sec" id="quit">⟵ Renunță</button></div>`;
      typesetMath(view);
      const reveal=document.getElementById("reveal"), box=document.getElementById("modelans");
      reveal.onclick=()=>{box.style.display="block";reveal.style.display="none";};
      box.querySelectorAll("button[data-g]").forEach(b=>b.onclick=()=>grade(q,b.getAttribute("data-g")));
      document.getElementById("quit").onclick=()=>renderSetup();
    }

    function grade(q,g){
      const s=stats[q.n]||(stats[q.n]={good:0,part:0,bad:0,seen:0});
      s.seen++; s[g]=(s[g]||0)+1; LS.set("quizstats",stats);
      results.push({n:q.n,g});
      idx++;
      if(idx>=queue.length) renderResults(); else renderQuestion();
    }

    function renderResults(){
      const good=results.filter(r=>r.g==="good").length;
      const part=results.filter(r=>r.g==="part").length;
      const bad=results.filter(r=>r.g==="bad").length;
      const score=Math.round(100*(good+0.5*part)/results.length);
      const review=results.filter(r=>r.g!=="good").map(r=>THEORY_QA.find(x=>x.n===r.n));
      const reviewHTML=review.length?review.map(q=>`
        <div class="step" style="border-left-color:var(--warn)">
          <div><span class="tag">Tema ${q.t}</span> <span class="tag">Î${q.n}</span></div>
          <b>${q.q}</b>
          <div class="answer" style="font-weight:500;margin-top:8px">${q.a}</div>
        </div>`).join(""):`<p>🎉 Le-ai știut pe toate! Felicitări.</p>`;
      view.innerHTML=`<div class="crumb">Test teorie · rezultat</div><h1>Rezultatul testului</h1>
        <div class="card" style="text-align:center">
          <div style="font-size:46px;font-weight:800;line-height:1;color:var(--accent)">${score}%</div>
          <p style="margin:10px 0 0">✅ știute <b>${good}</b> &nbsp;·&nbsp; 🟡 aproape <b>${part}</b> &nbsp;·&nbsp; ❌ nu ai știut <b>${bad}</b> &nbsp;<span style="color:var(--muted)">(din ${results.length})</span></p>
          <div class="btnrow" style="justify-content:center;margin-top:14px">
            ${bad+part>0?`<button class="btn" id="redo">🎯 Reia cele greșite (${bad+part})</button>`:""}
            <button class="btn sec" id="again">Test nou</button>
          </div>
        </div>
        <h2>De revizuit (${review.length})</h2>
        ${reviewHTML}`;
      typesetMath(view);
      const redo=document.getElementById("redo");
      if(redo) redo.onclick=()=>{queue=review.slice();idx=0;results=[];renderQuestion();};
      document.getElementById("again").onclick=()=>renderSetup();
    }

    renderSetup();
  },

  bilet(){
    view.innerHTML=`<div class="crumb">Simulare examen</div><h1>📝 Bilet model</h1>
      <p class="lead">Un bilet generat automat: 3 întrebări teoretice + 1 problemă. Încearcă să răspunzi singur, apoi dezvăluie răspunsurile.</p>
      <div class="btnrow"><button class="btn" id="newbilet">🎲 Generează alt bilet</button><button class="btn sec" id="printbilet">🖨️ Printează</button></div>
      <div id="biletarea"></div>`;
    function draw(){
      const b=genBilet();
      const area=document.getElementById("biletarea");
      area.innerHTML=`
        <div class="card">
          <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px">
            <div><b>UNIVERSITATEA TEHNICĂ A MOLDOVEI</b><br><span style="color:var(--muted);font-size:13px">Circuite și Dispozitive Electronice — Bilet de examen</span></div>
            <div style="text-align:right;color:var(--muted);font-size:13px">Timp recomandat: 30 min</div>
          </div>
          <hr>
          ${b.questions.map((q,i)=>`
            <div class="sol-step">
              <b>${i+1}. (Tema ${q.t} · întrebarea oficială Î${q.n})</b> ${q.q}
              <div class="btnrow"><button class="btn sm sec rb" data-i="${i}">Arată răspunsul</button></div>
              <div class="answer" id="ba${i}" style="display:none">${q.a}</div>
            </div>`).join("")}
          <div class="sol-step">
            <b>4. (Problemă) ${b.problemName}</b>
            ${sdscHTML(b.problem.givens, b.problem.asks.map(a=>a.label).join("; "))}
            ${schemHTML(b.problem.schema, b.problem.diagram)}
            <div class="btnrow"><button class="btn sm" id="bsol">Arată rezolvarea pas cu pas</button></div>
            <div id="bsolbox" style="display:none">
              ${stepFlowHTML(b.problem.steps, "✅ Răspuns: "+b.problem.asks.map(a=>a.label.replace(/<[^>]+>/g,"")+" = "+nf(a.answer)+" "+a.unit).join(" · "))}
            </div>
          </div>
        </div>`;
      area.querySelectorAll(".rb").forEach(btn=>btn.onclick=()=>{const e=document.getElementById("ba"+btn.dataset.i);e.style.display=e.style.display==="block"?"none":"block";});
      const bs=document.getElementById("bsol"),bb=document.getElementById("bsolbox");
      bs.onclick=()=>{bb.style.display=bb.style.display==="block"?"none":"block";};
      wireSteps(area);
    }
    document.getElementById("newbilet").onclick=draw;
    document.getElementById("printbilet").onclick=()=>window.print();
    draw();
  },

  formule(){
    view.innerHTML=`<div class="crumb">Referință</div><h1>📐 Formule esențiale</h1>
      <p class="lead">Toate formulele de care ai nevoie la examen, grupate pe teme. Sub fiecare scrie <b>când o folosești</b> și de ce.</p>
      ${FORMULE_HTML}`;
  },

  resurse(){
    view.innerHTML=`<div class="crumb">Referință</div><h1>🔗 Resurse online</h1>
      <p class="lead">Surse verificate pentru a te pregăti mai bine. Materialele tale + aceste surse acoperă tot ce poate apărea pe bilet.</p>

      <div class="warnbox">
        <b>Despre biletele exacte:</b> cursul tău este <b>FAF.CDE21.1</b> (lect. <b>Nicolae Magariu</b>). <b>Am verificat toate cursurile CDE</b> de pe ELSE și de pe platforma veche moodle.utm.md: <b>biletele numerotate NU sunt publice nicăieri</b> (sunt fie la profesor, fie în spatele login-ului). În schimb, <b>conținutul biletului ESTE public</b>: lista celor <b>70 de întrebări oficiale</b> = partea de teorie, iar <b>deck-urile de seminar</b> = sursa problemei. Pagina <a onclick="go('bilet')" style="cursor:pointer">📝 Bilet model</a> le combină în variante nelimitate (3 teorii + 1 problemă), iar <a onclick="go('intrebari')" style="cursor:pointer">🃏 Întrebări examen</a> conține fix cele 70.
      </div>

      <h2>📌 Lista oficială + sursele problemelor (publice, fără login)</h2>
      <div class="card">
        <ul>
          <li><b>Lista celor 70 de întrebări de examen</b> — <a href="https://else.fcim.utm.md/mod/resource/view.php?id=51275" target="_blank" rel="noopener">PDF oficial pe ELSE</a> (= exact partea de teorie a biletului; o ai integrată la 🃏 Întrebări examen).</li>
          <li>Seminar <b>Tranzistoare Bipolare P1</b> — <a href="https://else.fcim.utm.md/mod/resource/view.php?id=58178" target="_blank" rel="noopener">sursa problemelor de polarizare (T1–T7)</a></li>
          <li>Seminar <b>Tranzistoare Bipolare P2</b> — <a href="https://else.fcim.utm.md/mod/resource/view.php?id=58179" target="_blank" rel="noopener">sursa problemelor „regiunea de funcționare" (R1–R4)</a></li>
          <li>Seminar <b>Divizoare de tensiune</b> — <a href="https://else.fcim.utm.md/mod/resource/view.php?id=58176" target="_blank" rel="noopener">PDF</a> · <b>Diode</b> — <a href="https://else.fcim.utm.md/mod/resource/view.php?id=58177" target="_blank" rel="noopener">PDF</a> · <b>Legea lui Ohm</b> — <a href="https://else.fcim.utm.md/mod/resource/view.php?id=58175" target="_blank" rel="noopener">PDF</a></li>
          <li><b>Culegerea UTCluj</b> — soluțiile complete, pas cu pas, pentru problemele R1–R4 (cap. 8) — <a href="https://biblioteca.utcluj.ro/files/carti-online-cu-coperta/191-8.pdf" target="_blank" rel="noopener">PDF gratuit</a></li>
        </ul>
      </div>

      <h2>Platforma cursului (UTM)</h2>
      <div class="card">
        <ul>
          <li><a href="https://else.fcim.utm.md/course/view.php?id=4930" target="_blank" rel="noopener">ELSE · FAF.CDE21.1 — Circuite și dispozitive electronice</a> — aici sunt cursurile (Tema 1–6), deck-urile de seminar și lucrările de laborator (biletele numerotate apar doar pentru studenții înrolați).</li>
          <li><a href="https://else.fcim.utm.md/course/view.php?id=5425" target="_blank" rel="noopener">ELSE · FCIM.CDE21.5</a> · <a href="https://else.fcim.utm.md/course/view.php?id=1683" target="_blank" rel="noopener">FCIM.CDE21.4</a> — cursuri-geamăn (aceeași listă de 70 de întrebări).</li>
        </ul>
      </div>

      <h2>Îndrumar oficial UTM (PDF gratuit)</h2>
      <div class="card">
        <ul>
          <li><a href="https://repository.utm.md/handle/5014/15138" target="_blank" rel="noopener">Circuite și dispozitive electronice — Îndrumar metodic pentru lucrări de laborator</a> (repository.utm.md)</li>
          <li><a href="https://repository.utm.md/bitstream/handle/5014/15138/CircuiteDispozElectronice_IndMetod_DS.pdf?sequence=1&isAllowed=y" target="_blank" rel="noopener">→ PDF direct al îndrumarului</a></li>
        </ul>
      </div>

      <h2>Probleme rezolvate cu tranzistoare (similare cu problema de pe bilet)</h2>
      <div class="card">
        <ul>
          <li><a href="https://eprofu.ro/docs/electronica/analogica/componente/10tb-probleme-rezolvate.pdf" target="_blank" rel="noopener">eProfu — Tranzistorul bipolar: probleme rezolvate (PDF)</a></li>
          <li><a href="https://eprofu.ro/docs/electronica/analogica/componente/8tb-polarizare.pdf" target="_blank" rel="noopener">eProfu — Polarizarea tranzistoarelor bipolare (PDF)</a></li>
          <li><a href="https://www.afahc.ro/ro/facultate/cursuri/ccg/CDE/Cursul%204%20-%20Polarizarea%20TB.pdf" target="_blank" rel="noopener">Curs „CDE" — Polarizarea TB (PDF)</a> · <a href="https://www.afahc.ro/ro/facultate/cursuri/ccg/CDE/Cursul%203%20-%20TB.pdf" target="_blank" rel="noopener">Cursul 3 — Tranzistorul bipolar</a></li>
          <li><a href="https://wiki.dcae.pub.ro/images/7/70/Tbipolar.pdf" target="_blank" rel="noopener">UPB — Tranzistorul bipolar (PDF)</a></li>
          <li><a href="https://www.studocu.com/ro/document/universitatea-tehnica-gheorghe-asachi-din-iasi/dispozitive-electronice-si-electronica-analogica/p05deea/11560163" target="_blank" rel="noopener">Studocu — Probleme rezolvate tranzistoare bipolare (P05 DEEA)</a></li>
        </ul>
      </div>

      <h2>Diode, divizoare, redresoare</h2>
      <div class="card">
        <ul>
          <li><a href="https://www.scrigroup.com/tehnologie/electronica-electricitate/Polarizarea-tranzistorului-bip43849.php" target="_blank" rel="noopener">scrigroup — Polarizarea TB și stabilitatea PSF</a></li>
          <li><a href="https://www.electrokits.ro/polarizarea-tranzistoarelor-bipolare-realizarea-schemelor-de-polarizare-cu-simulatorul-multisim/" target="_blank" rel="noopener">electrokits — Polarizarea TB în Multisim</a></li>
        </ul>
      </div>
      <p style="color:var(--muted);font-size:12px">Notă: linkurile sunt externe; conținutul lor poate diferi de notațiile din cursul tău. Pentru notații și convenții, sursa de adevăr rămân materialele tale (Tema 1–6) din acest instrument.</p>`;
  }
};

function renderTema(id){
  const t=TEME.find(x=>x.id===id);
  if(!t){VIEWS.home();return;}
  const isDone=!!done[id];
  view.innerHTML=`
    <div class="crumb">Teorie · Tema ${t.num}</div>
    <h1>${t.icon} ${t.title}</h1>
    <div class="btnrow">
      <button class="btn ${isDone?'sec':''}" id="markdone">${isDone?'✓ Învățată (apasă pentru a anula)':'Marchează ca învățată'}</button>
    </div>
    ${t.html}
    <hr>
    <div class="btnrow">
      <button class="btn sec" id="prevT">← Tema anterioară</button>
      <button class="btn" id="nextT">Tema următoare →</button>
    </div>`;
  typesetMath(view);
  document.getElementById("markdone").onclick=()=>{done[id]=!done[id];LS.set("done",done);renderTema(id);renderNav();};
  const idx=TEME.findIndex(x=>x.id===id);
  document.getElementById("prevT").onclick=()=>go(TEME[(idx-1+TEME.length)%TEME.length].id);
  document.getElementById("nextT").onclick=()=>go(TEME[(idx+1)%TEME.length].id);
}

/* ---------- Math renderer M(): \\frac{}{}, \sqrt{}, ^{}, _{} -> HTML ---------- */
function _readBrace(s,i){ // s[i] === '{'
  if(s[i]!=="{") return ["",i];
  let depth=0,j=i;
  for(;j<s.length;j++){ if(s[j]==="{")depth++; else if(s[j]==="}"){depth--; if(depth===0)break;} }
  return [s.substring(i+1,j), j+1];
}
function M(s){
  if(!s) return s;
  if(s.indexOf("\\,")>=0) s=s.split("\\,").join(" "); // thin space marker
  if(s.indexOf("\\frac")<0 && s.indexOf("\\sqrt")<0 && s.indexOf("^{")<0 && s.indexOf("_{")<0) return s;
  let out="",i=0;
  while(i<s.length){
    if(s.startsWith("\\frac",i)){
      let [num,j]=_readBrace(s,i+5); let [den,k]=_readBrace(s,j);
      out+='<span class="frac"><span class="fnum">'+M(num)+'</span><span class="fden">'+M(den)+'</span></span>'; i=k;
    } else if(s.startsWith("\\sqrt",i)){
      let [a,j]=_readBrace(s,i+5);
      out+='<span class="sqrtm">√<span class="rad">'+M(a)+'</span></span>'; i=j;
    } else if(s[i]==="^"&&s[i+1]==="{"){ let [a,j]=_readBrace(s,i+1); out+="<sup>"+M(a)+"</sup>"; i=j; }
    else if(s[i]==="_"&&s[i+1]==="{"){ let [a,j]=_readBrace(s,i+1); out+="<sub>"+M(a)+"</sub>"; i=j; }
    else { out+=s[i]; i++; }
  }
  return out;
}
function typesetMath(scope){
  if(!scope) return;
  scope.querySelectorAll(".step-calc,.formula,.fmath").forEach(el=>{
    if(el.dataset.mtyped) return;
    el.innerHTML=M(el.innerHTML); el.dataset.mtyped="1";
  });
}

/* ---------- HTML builders ---------- */
function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function schemHTML(schema, ascii){
  if(schema && typeof SCHEM!=="undefined"){const svg=SCHEM.draw(schema); if(svg) return `<div class="schemwrap">${svg}</div>`;}
  if(ascii) return `<div class="diagram">${esc(ascii)}</div>`;
  return "";
}
/* Se dă / Se cere boxes */
function sdscHTML(seDa, seCere){
  return `<div class="sdsc">
    <div class="sda"><span class="h">Se dă</span>${seDa||""}</div>
    <div class="sce"><span class="h">Se cere</span>${seCere||""}</div>
  </div>`;
}
/* normalizează un pas: string -> {c}; obiect {e,c} rămâne */
function normStep(s){ return (typeof s==="string") ? {e:"",c:s} : s; }
/* step-flow cu dezvăluire pas cu pas */
let _flowSeq=0;
function stepFlowHTML(steps, answerHTML){
  const id="flow"+(_flowSeq++);
  const body=steps.map((raw,i)=>{const s=normStep(raw);return `
    <div class="step" data-i="${i}" style="display:none">
      <div class="step-n">Pasul ${i+1} din ${steps.length}</div>
      ${s.e?`<div class="step-idee">${s.e}</div>`:""}
      <div class="step-calc">${s.c}</div>
    </div>`;}).join("");
  return `<div class="stepflow" id="${id}">
    <div class="steps-list">${body}</div>
    <div class="btnrow">
      <button class="btn sm next-step">▶ Începe rezolvarea</button>
      <button class="btn sm sec show-all">Arată toți pașii</button>
    </div>
    ${answerHTML?`<div class="answer" style="display:none">${answerHTML}</div>`:""}
  </div>`;
}
function wireSteps(scope){
  typesetMath(scope);
  scope.querySelectorAll(".stepflow").forEach(flow=>{
    const steps=[...flow.querySelectorAll(".step")];
    const next=flow.querySelector(".next-step");
    const all=flow.querySelector(".show-all");
    const ans=flow.querySelector(".answer");
    let shown=0;
    const upd=()=>{
      if(shown>=steps.length){next.style.display="none";all.style.display="none";if(ans)ans.style.display="block";}
      else next.textContent=`Pasul următor → (${shown}/${steps.length})`;
    };
    next.onclick=()=>{ if(shown<steps.length){steps[shown].style.display="block";shown++;} upd(); };
    all.onclick=()=>{ steps.forEach(s=>s.style.display="block"); shown=steps.length; upd(); };
  });
}

function probHTML(p){
  return `<div class="prob" data-id="${p.id}">
    <div class="prob-head">
      <span class="pid">${p.id}</span>
      <h3>${p.titlu}</h3>
      <span class="tag">${CATS[p.cat].icon}</span>
      <span class="chev">▶</span>
    </div>
    <div class="prob-body">
      <div class="enunt">${p.enunt}</div>
      ${sdscHTML(p.date, p.seCere||"")}
      ${schemHTML(typeof SCHEM!=="undefined"?SCHEM.forProblem(p.id):null, p.diagram)}
      ${stepFlowHTML(p.pasi, "✅ Răspuns: "+p.raspuns)}
    </div>
  </div>`;
}
function wireProblems(root){
  root.querySelectorAll(".prob").forEach(pr=>{
    const head=pr.querySelector(".prob-head");
    head.onclick=()=>pr.classList.toggle("open");
  });
  wireSteps(root);
}

function quizHTML(pr,name){
  const cere = pr.cere || pr.asks.map(a=>a.label).join("; ");
  return `<div class="prob open">
    <div class="prob-head"><span class="pid">🎲</span><h3>${pr.title}</h3></div>
    <div class="prob-body">
      ${sdscHTML(pr.givens, cere)}
      ${schemHTML(pr.schema, pr.diagram)}
      <h4>Răspunsurile tale</h4>
      ${pr.asks.map((a,i)=>`<div class="field">
          <label>${a.label}</label>
          <input id="qi${i}" class="quiz-input" type="text" inputmode="decimal" placeholder="…"> <b>${a.unit}</b>
          <span id="qt${i}"></span>
        </div>`).join("")}
      <div class="btnrow">
        <button class="btn" id="q-check">Verifică</button>
        <button class="btn sec" id="q-sol">Arată soluția pas cu pas</button>
        <span id="q-res"></span>
      </div>
      <div id="q-solbox" style="display:none">${stepFlowHTML(pr.steps, null)}</div>
    </div>
  </div>`;
}

/* ---------- FORMULE ---------- */
const FORMULE_HTML=`
<div class="note"><b>💡 Cum folosești foaia:</b> scrie întâi formula, apoi înlocuiește cu cifre. <b>Trucuri de unități:</b> kΩ × mA = V &nbsp;|&nbsp; µA × kΩ = mV &nbsp;|&nbsp; lucrează în <b>kΩ și mA</b> și nu mai pierzi zerourile.</div>
<div class="grid c2">

<div class="card"><h3>⚡ Legi de bază & circuite (Tema 1)</h3>
<div class="formula">U = R·I</div>
<div class="fwhen">→ <b>legea lui Ohm</b>, pe orice rezistor. Afli a treia mărime din celelalte două.</div>
<div class="formula">P = U·I = R·I² = \\frac{U²}{R}</div>
<div class="fwhen">→ <b>puterea</b> disipată de un rezistor (sau debitată de sursă).</div>
<div class="formula">Serie: R = ΣR<sub>k</sub></div>
<div class="fwhen">→ rezistoare <b>cap-la-cap</b> (același curent prin toate); tensiunea se împarte.</div>
<div class="formula">Paralel: \\frac{1}{R}=Σ\\frac{1}{R<sub>k</sub>} &nbsp;|&nbsp; 2 buc.: R=\\frac{R₁·R₂}{R₁+R₂}</div>
<div class="fwhen">→ rezistoare între <b>aceleași 2 noduri</b> (aceeași tensiune); rezultatul &lt; cea mai mică.</div>
<div class="formula">Divizor de tensiune: U<sub>Rx</sub>=U<sub>S</sub>·\\frac{R<sub>x</sub>}{R<sub>T</sub>}</div>
<div class="fwhen">→ vrei <b>tensiunea pe un rezistor</b> dintr-o serie, fără să calculezi curentul.</div>
<div class="formula">Divizor de curent: I₁ = I·\\frac{R₂}{R₁+R₂}</div>
<div class="fwhen">→ vrei <b>curentul pe o ramură</b> din două în paralel (ramura mică ia mai mult).</div>
<div class="formula">Kirchhoff: ΣI<sub>nod</sub>=0 &nbsp;|&nbsp; ΣE=ΣR·I</div>
<div class="fwhen">→ circuite <b>ramificate</b>, cu mai multe noduri/ochiuri (curenți diferiți pe ramuri).</div>
<div class="formula">Sursă reală: I=\\frac{E}{R+r}; &nbsp; U=E−r·I</div>
<div class="fwhen">→ sursă cu <b>rezistență internă r</b>. La scurtcircuit I=E/r.</div>
<div class="formula">X<sub>C</sub>=\\frac{1}{2πfC} &nbsp; X<sub>L</sub>=2πfL &nbsp; X<sub>ef</sub>=\\frac{X<sub>max</sub>}{√2}</div>
<div class="fwhen">→ <b>condensator/bobină în c.a.</b> (reactanțe) și valoarea efectivă a unei sinusoide.</div>
</div>

<div class="card"><h3>🔺 Diode (Tema 2)</h3>
<div class="formula">i<sub>D</sub>=I<sub>s</sub>(e^{\\frac{u<sub>D</sub>}{V<sub>T</sub>}}−1), &nbsp; V<sub>T</sub>≈25–26 mV</div>
<div class="fwhen">→ <b>caracteristica diodei</b> (Shockley). Teoretic; rar la calcul direct.</div>
<div class="formula">Conducție: I<sub>D</sub>=\\frac{E−V<sub>D</sub>}{R}, &nbsp; V<sub>D</sub>≈0,7 V (Si) / 0,3 V (Ge)</div>
<div class="fwhen">→ <b>diodă în serie cu R și sursă</b>, în conducție: scazi 0,7 V, apoi Ohm.</div>
<div class="formula">R<sub>cc</sub>=\\frac{V<sub>D</sub>}{I<sub>D</sub>}</div>
<div class="fwhen">→ <b>rezistența de c.c. (statică)</b> într-un punct de pe caracteristică.</div>
<div class="formula">r<sub>d</sub>=\\frac{V<sub>T</sub>}{I<sub>D</sub>}</div>
<div class="fwhen">→ <b>rezistența dinamică (semnal mic)</b> în jurul punctului de funcționare.</div>
<div class="formula">r<sub>D</sub>=\\frac{Δv<sub>D</sub>}{Δi<sub>D</sub>}</div>
<div class="fwhen">→ <b>rezistența de semnal mare</b>, calculată din două puncte (variație).</div>
</div>

<div class="card"><h3>🔌 Surse de alimentare (Tema 3)</h3>
<div class="formula">Mono: U<sub>med</sub>=\\frac{U<sub>max</sub>}{π} ≈ 0,318·U<sub>max</sub></div>
<div class="fwhen">→ <b>redresor monoalternanță</b> (1 diodă). Riplu la frecvența rețelei.</div>
<div class="formula">Bialt./punte: U<sub>med</sub>=\\frac{2U<sub>max</sub>}{π} ≈ 0,637·U<sub>max</sub></div>
<div class="fwhen">→ <b>bialternanță / punte</b> (2 sau 4 diode). Riplu la frecvență dublă (se filtrează mai ușor).</div>
<div class="formula">Filtru: τ = R<sub>L</sub>·C</div>
<div class="fwhen">→ <b>riplul scade când τ crește</b> (condensator mai mare / sarcină mai mare).</div>
<div class="formula">Transformator: \\frac{u₂}{u₁}=\\frac{N₂}{N₁}</div>
<div class="fwhen">→ tensiunea din <b>secundar</b> față de primar (raportul spirelor).</div>
<div class="formula">Stabilizator Zener: R=\\frac{U<sub>in</sub>−U<sub>Z</sub>}{I<sub>Z</sub>+I<sub>S</sub>}</div>
<div class="fwhen">→ <b>dimensionezi rezistorul serie</b>; tensiunea de ieșire U<sub>ies</sub> ≈ U<sub>Z</sub>.</div>
</div>

<div class="card"><h3>📡 Tranzistor bipolar (Tema 4) — cel mai important</h3>
<div class="formula">I<sub>E</sub>=I<sub>C</sub>+I<sub>B</sub> &nbsp; I<sub>C</sub>=β·I<sub>B</sub> &nbsp; I<sub>E</sub>=(β+1)·I<sub>B</sub></div>
<div class="fwhen">→ <b>mereu</b>: relațiile dintre curenți.</div>
<div class="formula">β=\\frac{I<sub>C</sub>}{I<sub>B</sub>} &nbsp; α=\\frac{I<sub>C</sub>}{I<sub>E</sub>} &nbsp; β=\\frac{α}{1−α}</div>
<div class="fwhen">→ factorii de amplificare; conversie între α și β.</div>
<div class="formula">U<sub>BE</sub> ≈ 0,7 V (Si) &nbsp;[PNP: U<sub>EB</sub>≈0,7 V]</div>
<div class="fwhen">→ în <b>regiunea activă</b> (joncțiunea bază-emitor deschisă). De aici pleci mereu.</div>
<div class="formula">Divizor: U<sub>B</sub>=V<sub>CC</sub>·\\frac{R<sub>B2</sub>}{R<sub>B1</sub>+R<sub>B2</sub>} → U<sub>E</sub>=U<sub>B</sub>−0,7 → I<sub>E</sub>=\\frac{U<sub>E</sub>}{R<sub>E</sub>}≈I<sub>C</sub></div>
<div class="fwhen">→ <b>Rețeta 1: polarizare cu divizor</b> (2 R în bază + R<sub>E</sub>). Cea mai frecventă.</div>
<div class="formula">O sursă: I<sub>B</sub>=\\frac{V−U<sub>BE</sub>}{R<sub>B</sub>+(β+1)·R<sub>E</sub>}</div>
<div class="fwhen">→ <b>Rețeta 3: un R<sub>B</sub> în bază + R<sub>E</sub></b>. NU uita (β+1) la R<sub>E</sub>!</div>
<div class="formula">Reacție colector: I<sub>B</sub>=\\frac{V<sub>CC</sub>−U<sub>BE</sub>}{R<sub>B</sub>+β·R<sub>C</sub>}</div>
<div class="fwhen">→ <b>Rețeta 2: R<sub>B</sub> de la colector la bază</b>.</div>
<div class="formula">U<sub>CE</sub>=V<sub>CC</sub>−I<sub>C</sub>·(R<sub>C</sub>+R<sub>E</sub>)</div>
<div class="fwhen">→ <b>tensiunea colector-emitor</b> (coordonata PSF), din bucla de ieșire.</div>
<div class="formula">Dreapta de sarcină: I<sub>C(sat)</sub>=\\frac{V<sub>CC</sub>}{R<sub>C</sub>+R<sub>E</sub>} &nbsp;|&nbsp; U<sub>CE</sub>=V<sub>CC</sub></div>
<div class="fwhen">→ cele <b>2 capete</b> ale dreptei de sarcină (intersecțiile cu axele): saturație (U<sub>CE</sub>=0) și blocare (I<sub>C</sub>=0).</div>
<div class="formula">Saturație: I<sub>Cex</sub>=\\frac{V<sub>CC</sub>−V<sub>CE,sat</sub>}{R<sub>C</sub>+R<sub>E</sub>}, &nbsp; V<sub>CE,sat</sub>≈0,2 V</div>
<div class="fwhen">→ curentul <b>maxim</b> pe care-l poate da; îl folosești la verificarea regiunii.</div>
<div class="note" style="margin-top:8px"><b>Verifică regiunea:</b> I<sub>C</sub>&lt;I<sub>Cex</sub> ⟹ <b>activ</b>; &nbsp; I<sub>C</sub>≥I<sub>Cex</sub> ⟹ <b>saturație</b>; &nbsp; V<sub>I</sub>&lt;0,7 V ⟹ <b>blocare</b>.</div>
</div>

<div class="card"><h3>🔊 Amplificatoare (Tema 5)</h3>
<div class="formula">A<sub>u</sub>=\\frac{U<sub>ies</sub>}{U<sub>in</sub>} &nbsp; A[dB]=20·log₁₀A<sub>u</sub></div>
<div class="fwhen">→ <b>factorul de amplificare</b> (și exprimat în decibeli).</div>
<div class="formula">g<sub>m</sub>=\\frac{I<sub>C</sub>}{V<sub>T</sub>} &nbsp; r<sub>be</sub>=\\frac{β·V<sub>T</sub>}{I<sub>C</sub>}</div>
<div class="fwhen">→ parametri de <b>semnal mic</b>: transconductanța și rezistența de intrare a bazei.</div>
<div class="formula">EC: A<sub>u</sub>≈−g<sub>m</sub>·R<sub>C</sub></div>
<div class="fwhen">→ etaj <b>emitor comun</b> (semnul − = defazaj 180°). Amplifică mult.</div>
<div class="formula">CC: A<sub>u</sub>≈1 &nbsp; Z<sub>in</sub>≈β·R<sub>E</sub></div>
<div class="fwhen">→ <b>repetor pe emitor</b> (colector comun): adaptor, intrare mare, ieșire mică.</div>
<div class="formula">B=f<sub>S</sub>−f<sub>J</sub> &nbsp; PAB=A·B≈const</div>
<div class="fwhen">→ <b>banda</b> (la −3 dB) și produsul amplificare × bandă.</div>
<div class="formula">Reacție: A=\\frac{a}{1+a·f} &nbsp; F=1+a·f</div>
<div class="fwhen">→ <b>reacție negativă</b>: câștigul scade de F ori, dar câștigi stabilitate și bandă.</div>
<div class="formula">Randament: clasa A ≤ 50% &nbsp; clasa B ≈ 78%</div>
<div class="fwhen">→ <b>clasele</b> de amplificare de putere.</div>
</div>

<div class="card"><h3>🎛️ Tranzistoare cu efect de câmp (Tema 6)</h3>
<div class="formula">JFET: I<sub>D</sub>=I<sub>DSS</sub>(1−\\frac{V<sub>GS</sub>}{V<sub>P</sub>})²</div>
<div class="fwhen">→ <b>TEC-J</b> în saturație. V<sub>P</sub> = tensiunea de blocare; I<sub>DSS</sub> = curent max (la V<sub>GS</sub>=0).</div>
<div class="formula">MOS indus: I<sub>D</sub>=k(V<sub>GS</sub>−V<sub>T</sub>)², &nbsp; V<sub>GS</sub>>V<sub>T</sub></div>
<div class="fwhen">→ <b>MOSFET cu canal indus</b>; conduce doar peste pragul V<sub>T</sub>.</div>
<div class="formula">Polarizare: V<sub>G</sub>=V<sub>DD</sub>·\\frac{R<sub>G2</sub>}{R<sub>G1</sub>+R<sub>G2</sub>}; &nbsp; V<sub>GS</sub>=V<sub>G</sub>−I<sub>D</sub>·R<sub>S</sub></div>
<div class="fwhen">→ <b>divizor în grilă + R<sub>S</sub></b> (analog cu divizorul de la BJT).</div>
<div class="note">FET = comandat în <b>tensiune</b>, Z<sub>in</sub> uriașă, unipolar. BJT = comandat în <b>curent</b>, bipolar.</div>
</div>
</div>`;

/* ---------- Search ---------- */
const search=document.getElementById("search");
search.addEventListener("input",()=>{
  const q=search.value.toLowerCase().trim();
  nav.querySelectorAll(".nav-item").forEach(it=>{
    const hit=!q||it.dataset.search.includes(q);
    it.style.display=hit?"":"none";
  });
});
document.addEventListener("keydown",e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();search.focus();}
});

/* ---------- Theme ---------- */
function setTheme(t){document.documentElement.dataset.theme=t;LS.set("theme",t);}
setTheme(LS.get("theme","dark"));
function toggleTheme(){setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark");}
document.getElementById("theme-btn").onclick=toggleTheme;
document.getElementById("theme-btn2").onclick=toggleTheme;

/* ---------- Mobile menu ---------- */
const sidebar=document.getElementById("sidebar"), backdrop=document.getElementById("backdrop");
function openMenu(){sidebar.classList.add("open");backdrop.classList.add("show");}
function closeMenu(){sidebar.classList.remove("open");backdrop.classList.remove("show");}
document.getElementById("menu-btn").onclick=openMenu;
backdrop.onclick=closeMenu;

/* ---------- Reset progress ---------- */
document.getElementById("reset-prog").onclick=()=>{ if(confirm("Resetezi progresul de învățare?")){done={};LS.set("done",done);renderNav();go(state.view);} };

/* ---------- Boot ---------- */
renderNav();
const _h=(location.hash||"").replace("#","");
go( (VIEWS[_h]||TEME.find(t=>t.id===_h)) ? _h : "home" );
window.addEventListener("hashchange",()=>{const h=(location.hash||"").replace("#","");if(VIEWS[h]||TEME.find(t=>t.id===h))go(h);});
