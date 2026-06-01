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
    {id:"probleme", ic:"✅", label:"Probleme rezolvate"},
    {id:"antrenament", ic:"🏋️", label:"Antrenament (auto-verificare)"},
    {id:"intrebari", ic:"🃏", label:"Întrebări examen (flashcards)"},
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
      {id:"antrenament",ic:"🏋️",h:"Antrenament cu auto-verificare",p:"Probleme cu valori aleatoare; introduci răspunsul, primești punctaj + soluția."},
      {id:"probleme",ic:"✅",h:"Probleme rezolvate",p:"Toate problemele din pptx-uri, rezolvate pas cu pas."},
      {id:"intrebari",ic:"🃏",h:"Flashcards examen",p:"Întrebări teoretice tip bilet cu răspuns model."},
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
      <p class="lead">Toate formulele de care ai nevoie la examen, pe o singură pagină.</p>
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
<div class="grid c2">
<div class="card"><h3>Bază (Tema 1)</h3>
<div class="formula">U = R·I &nbsp;|&nbsp; P = U·I = R·I² = \\frac{U²}{R}</div>
<div class="formula">Serie: R=ΣRₖ &nbsp;|&nbsp; Paralel: \\frac{1}{R}=Σ\\frac{1}{Rₖ}</div>
<div class="formula">2 paralel: R=\\frac{R₁·R₂}{R₁+R₂}</div>
<div class="formula">Divizor U: V<sub>Rx</sub>=V<sub>S</sub>·\\frac{R<sub>x</sub>}{R<sub>T</sub>}</div>
<div class="formula">Sursă reală: I=\\frac{E}{R+r}; U=E−r·I</div>
<div class="formula">X<sub>C</sub>=\\frac{1}{2πfC} &nbsp; X<sub>L</sub>=2πfL &nbsp; X<sub>ef</sub>=\\frac{X<sub>max</sub>}{√2}</div>
</div>

<div class="card"><h3>Diode (Tema 2)</h3>
<div class="formula">i<sub>D</sub>=I<sub>s</sub>(e^{\\frac{u<sub>D</sub>}{V<sub>T</sub>}}−1), V<sub>T</sub>≈25 mV</div>
<div class="formula">Conducție: I<sub>D</sub>=\\frac{E−V<sub>D</sub>}{R}; V<sub>D</sub>≈0,6 V (Si)</div>
<div class="formula">R<sub>D</sub>=\\frac{V<sub>D</sub>}{I<sub>D</sub>} (c.c.) &nbsp; r<sub>d</sub>=\\frac{V<sub>T</sub>}{I<sub>D</sub>} (semnal mic)</div>
<div class="formula">r<sub>D</sub>=\\frac{Δv<sub>D</sub>}{Δi<sub>D</sub>} (semnal mare)</div>
</div>

<div class="card"><h3>Redresoare (Tema 3)</h3>
<div class="formula">Mono: V<sub>med</sub>=\\frac{V<sub>max</sub>}{π}</div>
<div class="formula">Bialt./punte: V<sub>med</sub>=\\frac{2V<sub>max</sub>}{π}</div>
<div class="formula">τ=R<sub>L</sub>·C (riplu ↓ când τ ↑)</div>
<div class="formula">\\frac{u₂}{u₁}=\\frac{N₂}{N₁} (transformator)</div>
</div>

<div class="card"><h3>Tranzistor bipolar (Tema 4)</h3>
<div class="formula">I<sub>E</sub>=I<sub>C</sub>+I<sub>B</sub> &nbsp; I<sub>C</sub>=β·I<sub>B</sub> &nbsp; I<sub>E</sub>=(β+1)·I<sub>B</sub></div>
<div class="formula">β=\\frac{I<sub>C</sub>}{I<sub>B</sub>} &nbsp; α=\\frac{I<sub>C</sub>}{I<sub>E</sub>} &nbsp; β=\\frac{α}{1−α}</div>
<div class="formula">Divizor: U<sub>B</sub>=V<sub>CC</sub>·\\frac{R<sub>B2</sub>}{R<sub>B1</sub>+R<sub>B2</sub>}</div>
<div class="formula">I<sub>E</sub>=\\frac{U<sub>B</sub>−U<sub>BE</sub>}{R<sub>E</sub>} ≈ I<sub>C</sub></div>
<div class="formula">U<sub>CE</sub>=V<sub>CC</sub>−I<sub>C</sub>(R<sub>C</sub>+R<sub>E</sub>)</div>
<div class="formula">Saturație: I<sub>Cex</sub>=\\frac{V<sub>CC</sub>−V<sub>CEsat</sub>}{R<sub>C</sub>+R<sub>E</sub>}</div>
<div class="note" style="margin-top:8px">Regiune: I<sub>C</sub>&lt;I<sub>Cex</sub> ⟹ activ; I<sub>C</sub>&gt;I<sub>Cex</sub> ⟹ saturație; V<sub>I</sub>&lt;V<sub>BE,on</sub> ⟹ blocare.</div>
</div>

<div class="card"><h3>Amplificatoare (Tema 5)</h3>
<div class="formula">A<sub>u</sub>=\\frac{U<sub>ies</sub>}{U<sub>in</sub>} &nbsp; A[dB]=20·log₁₀A<sub>u</sub></div>
<div class="formula">EC: A<sub>u</sub>≈−g<sub>m</sub>·R<sub>C</sub> (defazaj 180°)</div>
<div class="formula">B=f<sub>S</sub>−f<sub>J</sub> &nbsp; PAB=A·B</div>
<div class="formula">Reacție: A=\\frac{a}{1+af}; F=1+af</div>
</div>

<div class="card"><h3>FET (Tema 6)</h3>
<div class="formula">I<sub>D</sub>=I<sub>DSS</sub>(1−\\frac{V<sub>GS</sub>}{V<sub>GS(off)</sub>})²</div>
<div class="note">FET: comandat în <b>tensiune</b>, Z<sub>in</sub> foarte mare, unipolar. BJT: comandat în curent, bipolar.</div>
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
