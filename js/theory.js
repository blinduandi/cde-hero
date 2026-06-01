/* ============================================================
   THEORY — Tema 1..6 (Circuite și Dispozitive Electronice)
   Conținut complet pentru întrebările teoretice de pe bilet.
   ============================================================ */
const TEME = [
{
 id:"t1", icon:"⚡", num:1,
 title:"Tema 1 — Legile lui Kirchhoff. Legea lui Ohm. Rezistoare. Bobine. Condensatoare.",
 short:"Mărimi de bază, Ohm, Kirchhoff, R/L/C",
 html:`
<p class="lead">Bazele circuitelor: mărimi electrice, legea lui Ohm, legile lui Kirchhoff și cele trei componente pasive de bază (R, L, C).</p>

<h2>1. Circuitul electric — noțiuni</h2>
<ul>
<li><b>Circuit electric</b> = succesiune de medii conductoare prin care circulă curent, realizând o funcție într-un montaj. Caracterizat de: <b>rezistență, inductanță, capacitate</b>.</li>
<li><b>Circuit activ</b> = conține cel puțin un element activ (sursă/dispozitiv care dă energie). <b>Circuit pasiv</b> = nu conține nicio sursă de energie.</li>
<li><b>Componente pasive</b> (R, L, C, diode): prelucrează semnalul (filtrare, integrare, derivare) dar <i>nu adaugă energie</i>.</li>
<li><b>Componente active</b> (tranzistoare): pot modifica energia semnalului; sunt alimentate și consumă energie de la sursă. Sunt neliniare.</li>
</ul>

<h2>2. Mărimi electrice</h2>
<h3>Intensitatea curentului</h3>
<p>"Debitul" de sarcină prin secțiune. Unitate: <b>amperul (A)</b> = 1 coulomb / secundă (≈ 6·10¹⁸ sarcini elementare /s).</p>
<div class="formula">I = \\frac{ΔQ}{Δt} &nbsp;&nbsp; [A]</div>
<h3>Tensiunea electrică</h3>
<p>Diferență de potențial între două puncte: <span class="f">U<sub>AB</sub> = V<sub>A</sub> − V<sub>B</sub></span>. Ordinea contează (semn).</p>
<h3>Semnal alternativ sinusoidal</h3>
<div class="formula">x(t) = X<sub>med</sub> + X<sub>a</sub>·sin(ω·t + φ)</div>
<ul>
<li><b>Valoarea de vârf / amplitudine</b> X<sub>a</sub> (= X<sub>max</sub>) — indicată de osciloscop.</li>
<li><b>Valoarea efectivă</b> (RMS): <span class="f">X<sub>ef</sub> = X<sub>max</sub>/√2 = 0,707·X<sub>max</sub></span> — indicată de voltmetru/ampermetru c.a.</li>
<li><b>Pulsația</b> ω = 2π·f; <b>frecvența</b> f = 1/T [Hz].</li>
</ul>
<h3>Puterea electrică</h3>
<div class="formula">P = U·I = R·I² = \\frac{U²}{R} &nbsp;&nbsp; [W]</div>

<h2>3. Surse de semnal</h2>
<ul>
<li><b>Sursă ideală de tensiune</b>: tensiunea la borne este independentă de curent.</li>
<li><b>Sursă ideală de curent</b>: curentul este independent de tensiunea la borne.</li>
<li>Sursele reale au rezistență internă; cele ideale există doar în modelare.</li>
</ul>

<h2>4. Legea lui Ohm</h2>
<h3>Pe o porțiune de circuit</h3>
<div class="formula">I = \\frac{U}{R} &nbsp;⟺&nbsp; U = R·I &nbsp;⟺&nbsp; R = \\frac{U}{I}</div>
<p>Curentul e direct proporțional cu tensiunea și invers proporțional cu rezistența.</p>
<h3>Pe întregul circuit (cu sursă reală)</h3>
<p>Generator cu t.e.m. <span class="f">E</span> și rezistență internă <span class="f">r</span>, pe consumator R:</p>
<div class="formula">I = \\frac{E}{R + r}</div>
<ul>
<li>Tensiunea la borne: <span class="f">U = E − r·I</span></li>
<li>Circuit deschis (R→∞): I = 0, U = E.</li>
<li>Scurtcircuit (R = 0): <span class="f">I<sub>sc</sub> = E / r</span> (curent maxim al generatorului).</li>
</ul>

<h2>5. Legile lui Kirchhoff</h2>
<p><b>Nod</b> = punct unde se întâlnesc ≥3 curenți. <b>Ramură</b> = porțiune între două noduri. <b>Ochi</b> = contur închis.</p>
<h3>Legea I (a curenților / a nodurilor) — KCL</h3>
<p>Conservarea sarcinii: suma curenților care intră = suma celor care ies.</p>
<div class="formula">Σ I<sub>intră</sub> = Σ I<sub>iese</sub> &nbsp;⟺&nbsp; Σ I<sub>k</sub> = 0 (algebric)</div>
<h3>Legea a II-a (a tensiunilor / a ochiurilor) — KVL</h3>
<p>Pe un ochi: suma algebrică a t.e.m. = suma algebrică a căderilor de tensiune.</p>
<div class="formula">Σ E<sub>k</sub> = Σ R<sub>k</sub>·I<sub>k</sub></div>
<div class="note"><b>Rețetă de rezolvare:</b> 1) alege sensuri pentru curenți; 2) scrie KCL în noduri; 3) scrie KVL pe ochiuri (alege un sens de parcurgere); 4) rezolvă sistemul; 5) un curent negativ = sensul real e invers.</div>

<h2>6. Rezistoare</h2>
<p>Principalul parametru: <b>rezistența R [Ω]</b>. Rezistivitatea ρ caracterizează materialul.</p>
<div class="formula">R = \\frac{ρ·l}{S}</div>
<p>Putere disipată prin efect Joule: <span class="f">P = R·I²</span>.</p>
<h3>Conectarea rezistoarelor</h3>
<table>
<tr><th>Conexiune</th><th>Rezistență echivalentă</th><th>Observații</th></tr>
<tr><td><b>Serie</b></td><td class="f">R = R₁ + R₂ + … + Rₙ</td><td>R<sub>ech</sub> > oricare R. Formează <b>divizor de tensiune</b>. Același curent I.</td></tr>
<tr><td><b>Paralel</b></td><td class="f">1/R = 1/R₁ + 1/R₂ + …</td><td>R<sub>ech</sub> < oricare R. Formează <b>divizor de curent</b>. Aceeași tensiune U.</td></tr>
</table>
<div class="formula">Două în paralel: R = \\frac{R₁·R₂}{R₁+R₂} <span class="lbl">"produsul peste sumă"</span></div>
<h3>Parametri de catalog</h3>
<p>Rezistență nominală, toleranță (% abatere), putere disipată nominală, tensiune nominală limită, coeficient de temperatură.</p>
<h3>Clasificare (după forma caracteristicii)</h3>
<ul>
<li><b>Liniare</b>; <b>Neliniare</b>: <b>termistoare</b> (R variază cu temperatura), <b>varistoare</b> (R cu tensiunea), <b>fotorezistoare</b> (R cu iluminarea).</li>
</ul>

<h2>7. Condensatoare</h2>
<p>Două armături despărțite de dielectric. Parametru: <b>capacitatea C [F]</b>.</p>
<div class="formula">Q = C·U &nbsp;&nbsp;|&nbsp;&nbsp; W = ½·C·U² (energie, J) &nbsp;&nbsp;|&nbsp;&nbsp; C = \\frac{ε·S}{d}</div>
<h3>Reactanța și impedanța capacitivă</h3>
<div class="formula">X<sub>C</sub> = \\frac{1}{ω·C} = \\frac{1}{2π·f·C} &nbsp;&nbsp; [Ω]</div>
<ul>
<li>X<sub>C</sub> <b>scade</b> cu creșterea frecvenței.</li>
<li>În c.c. (f = 0): X<sub>C</sub> → ∞ → condensatorul ≡ <b>întrerupere</b> (circuit deschis).</li>
<li>La frecvențe mari → ≈ <b>scurtcircuit</b>.</li>
</ul>
<p><b>Clasificare</b> (după dielectric): cu mică, hârtie, peliculă, electrolitice, ceramice.</p>

<h2>8. Bobine</h2>
<p>Parametru: <b>inductanța L [H]</b>. Se opune variației curentului.</p>
<div class="formula">u<sub>L</sub> = L·\\frac{di}{dt} &nbsp;&nbsp;|&nbsp;&nbsp; X<sub>L</sub> = ω·L = 2π·f·L</div>
<ul>
<li>X<sub>L</sub> <b>crește</b> cu frecvența.</li>
<li>În c.c. bobina ≡ <b>scurtcircuit</b>.</li>
</ul>
<div class="note"><b>Impedanța</b> Z este "rezistența generalizată" în c.a. (număr complex). <b>Reactanța</b> X este partea imaginară. Pentru R, L, C ideale: Z<sub>R</sub>=R, Z<sub>C</sub>=−j/(ωC), Z<sub>L</sub>=jωL.</div>
`
},

/* ===================== TEMA 2 ===================== */
{
 id:"t2", icon:"🔺", num:2,
 title:"Tema 2 — Joncțiunea p-n. Diode: tipuri, caracteristici, parametri.",
 short:"Semiconductori, joncțiunea p-n, diode",
 html:`
<p class="lead">De la semiconductori la diodă: cum se formează joncțiunea p-n, polarizarea directă/inversă și tipurile speciale de diode.</p>

<h2>1. Semiconductori</h2>
<ul>
<li><b>Izolatoare</b> – nu conduc; <b>Conductoare</b> – conduc bine; <b>Semiconductoare</b> – intermediar.</li>
<li>Materiale uzuale: <b>Si</b> (siliciu), <b>Ge</b> (germaniu), GaAs.</li>
<li>Conductibilitatea semiconductorilor <b>crește cu temperatura</b> și e asigurată de <b>două tipuri de purtători</b>: electroni (−) și goluri (+).</li>
</ul>
<h3>Benzi de energie</h3>
<p>Bandă de valență · bandă interzisă (E<sub>g</sub>) · bandă de conducție. La conductoare benzile se suprapun; la semiconductoare E<sub>g</sub> ≈ 0,1–3 eV; la izolatoare E<sub>g</sub> > 3 eV.</p>
<h3>Generare și recombinare</h3>
<ul>
<li><b>Generare</b>: ruperea unei legături covalente → pereche electron-gol (purtători liberi).</li>
<li><b>Recombinare</b>: un electron liber reface o legătură → dispare o pereche.</li>
</ul>

<h2>2. Semiconductor intrinsec vs. extrinsec (dopare)</h2>
<table>
<tr><th>Tip</th><th>Impuritate</th><th>Majoritari</th><th>Minoritari</th></tr>
<tr><td><b>Intrinsec</b></td><td>fără (n=p=n<sub>i</sub>)</td><td>—</td><td>—</td></tr>
<tr><td><b>Tip N</b></td><td>donoare (pentavalente)</td><td>electroni (−)</td><td>goluri (+)</td></tr>
<tr><td><b>Tip P</b></td><td>acceptoare (trivalente)</td><td>goluri (+)</td><td>electroni (−)</td></tr>
</table>

<h2>3. Dioda — definiție</h2>
<p>O <b>joncțiune p-n</b> cu două contacte: <b>Anod (+)</b> pe zona P, <b>Catod (−)</b> pe zona N. Ex.: 1N4001, BAT85.</p>

<h2>4. Joncțiunea p-n</h2>
<p>La contactul P–N: golurile difuzează P→N, electronii N→P ⇒ apare o <b>regiune de trecere (sărăcită)</b> cu sarcină spațială și un <b>câmp electric intern E<sub>int</sub></b> care se opune difuziei → <b>barieră de potențial</b>. La echilibru, difuzia se oprește.</p>

<h2>5. Polarizarea diodei</h2>
<h3>Directă (Anod + față de Catod)</h3>
<ul>
<li>Câmpul extern se opune celui intern → bariera scade.</li>
<li>După depășirea tensiunii de prag (Si ≈ 0,6–0,7 V; Ge ≈ 0,2–0,3 V) curentul crește exponențial. Dioda <b>conduce</b>.</li>
</ul>
<h3>Inversă (Anod − față de Catod)</h3>
<ul>
<li>Câmpul extern se adună celui intern → bariera crește. Dioda <b>blocată</b>.</li>
<li>Curent invers mic (de saturație) <span class="f">I<sub>s</sub></span>, dat de purtătorii minoritari (ordin µA), depinde de temperatură.</li>
</ul>
<h3>Ecuația diodei</h3>
<div class="formula">i<sub>D</sub> = I<sub>s</sub>·(e^{\\frac{q·u<sub>D</sub>}{kT}} − 1)</div>
<p>q = 1,6·10⁻¹⁹ C; k = 1,38·10⁻²³ J/K; T = temperatura joncțiunii [K]. Tensiunea termică V<sub>T</sub> = kT/q ≈ <b>25 mV</b> la 25 °C.</p>

<h2>6. Dreapta de sarcină și PSF</h2>
<p>Pentru o diodă în serie cu R și sursă E: <span class="f">i<sub>D</sub> = (E − u<sub>D</sub>)/R</span> = dreapta de sarcină. Intersecția cu caracteristica volt-amperică = <b>punctul static de funcționare (M / PSF)</b>.</p>
<div class="note"><b>Modelul ideal:</b> dioda conduce → înlocuită cu o sursă V<sub>D</sub> (≈0,6 V Si) cu + la anod; dioda blocată → întrerupere (gol). Util la tensiuni de ordinul zecilor de V.</div>

<h2>7. Parametrii diodei redresoare</h2>
<ul>
<li>V<sub>F</sub> – tensiune directă; I<sub>F</sub> – curent direct continuu.</li>
<li>V<sub>RRM</sub> – tensiune inversă maximă repetitivă; V<sub>BR</sub> – tensiune de străpungere.</li>
<li>P<sub>dmax</sub> – putere disipată maximă; T<sub>jmax</sub> – temperatura max. a joncțiunii (Si: −55…+175 °C).</li>
</ul>

<h2>8. Diode speciale</h2>
<table>
<tr><th>Diodă</th><th>Funcție / proprietate cheie</th></tr>
<tr><td><b>Zener</b></td><td>Polarizată <b>invers</b>; menține U constantă (U<sub>Z</sub>) ⇒ stabilizare/referință de tensiune. Necesită R de limitare. Mecanisme: multiplicare în avalanșă + efect Zener.</td></tr>
<tr><td><b>Schottky</b></td><td>Joncțiune metal-semiconductor; <b>comutație foarte rapidă</b> (~50 ps), cădere mică 0,2–0,45 V; dispozitiv unipolar, fără sarcină stocată.</td></tr>
<tr><td><b>LED</b></td><td>Emite lumină în polarizare directă (electroluminescență). Culoarea depinde de material (AlGaAs, GaP, InGaN…).</td></tr>
<tr><td><b>Fotodiodă</b></td><td>Polarizată <b>invers</b>; lumina generează perechi e⁻-gol → curent proporțional cu iluminarea (curent de lumină / curent de întuneric).</td></tr>
<tr><td><b>Varicap</b></td><td>Capacitate variabilă cu tensiunea inversă (acord automat al circuitelor oscilante). C<sub>j</sub> ≈ pF…100 pF.</td></tr>
<tr><td><b>Tunel</b></td><td>Regiune de <b>rezistență diferențială negativă</b>; oscilatoare de înaltă frecvență (efect tunel).</td></tr>
</table>

<h2>9. Dependența de temperatură</h2>
<ul>
<li>Curentul invers de saturație se <b>dublează</b> la +6 °C (Si), +9 °C (Ge).</li>
<li>Coeficientul de temperatură al tensiunii directe e <b>negativ</b> (~−2 mV/°C).</li>
</ul>
`
},

/* ===================== TEMA 3 ===================== */
{
 id:"t3", icon:"🔌", num:3,
 title:"Tema 3 — Surse de alimentare c.c. Redresoare. Filtre. Stabilizatoare.",
 short:"Redresoare, filtre, stabilizatoare",
 html:`
<p class="lead">Cum transformăm tensiunea alternativă de la rețea în tensiune continuă stabilă: transformator → redresor → filtru → stabilizator.</p>

<h2>1. Structura unui alimentator</h2>
<div class="formula">Rețea c.a. → Transformator → Redresor → Filtru → Stabilizator → R<sub>S</sub> (sarcină)</div>
<ul>
<li><b>Transformator</b> – modifică tensiunea rețelei și izolează galvanic. <span class="f">u₂/u₁ = N₂/N₁</span>; frecvența rămâne constantă; dacă U scade, I crește.</li>
<li><b>Redresor</b> – c.a. → tensiune pulsatorie (componentă continuă + componente alternative).</li>
<li><b>Filtru</b> – micșorează componentele alternative (riplul).</li>
<li><b>Stabilizator</b> – menține U/I de ieșire constante între anumite limite.</li>
</ul>

<h2>2. Clasificarea redresoarelor</h2>
<ul>
<li>Monofazate / trifazate; monoalternanță / bialternanță.</li>
<li><b>Necomandate</b> (diode, U fixă) / <b>comandate</b> (tiristoare, U reglabilă).</li>
</ul>

<h2>3. Redresor monoalternanță</h2>
<p>O singură diodă. Alternanța pozitivă: dioda conduce, v₀ ≈ v₂. Alternanța negativă: dioda blocată, v₀ ≈ 0.</p>
<div class="formula">V<sub>med</sub> = \\frac{V<sub>max</sub>}{π} ≈ 0,318·V<sub>max</sub> &nbsp;|&nbsp; V<sub>ef</sub> = \\frac{V<sub>max</sub>}{2} &nbsp;|&nbsp; T = 20 ms (la 50 Hz)</div>
<p>Simplu și ieftin, dar calitate slabă a formei de undă.</p>

<h2>4. Redresor bialternanță cu priză mediană</h2>
<p>Transformator cu secundar cu punct median + 2 diode. Alternanța pozitivă: D1 conduce; negativă: D2 conduce.</p>
<div class="formula">V<sub>med</sub> = \\frac{2·V<sub>max</sub>}{π} ≈ 0,637·V<sub>max</sub> &nbsp;|&nbsp; V<sub>ef</sub> = \\frac{V<sub>max</sub>}{√2}</div>

<h2>5. Punte redresoare (Graetz)</h2>
<p>4 diode, fără priză mediană. Alternanța pozitivă: D2, D3 conduc; negativă: D1, D4 conduc. Curentul prin R<sub>L</sub> are mereu același sens.</p>
<ul>
<li>+ : nu necesită transformator cu priză mediană.</li>
<li>− : 4 diode (mai multe pierderi/căldură). Se fabrică integrat.</li>
</ul>
<div class="note"><b>Factorul de undă (ripple)</b> = V<sub>ef(c.a.)</sub>/V<sub>med</sub>. Cu cât e mai mic (→1 pentru formă), cu atât tensiunea e mai "continuă". Bialternanța are riplu mai mic decât monoalternanța (frecvență dublă la ieșire).</div>

<h2>6. Filtru cu condensator</h2>
<p>Condensator C în paralel cu sarcina. Se încarcă la vârf, se descarcă prin R<sub>L</sub> cu constanta de timp <span class="f">τ = R<sub>L</sub>·C</span>.</p>
<ul>
<li>Riplul <b>scade</b> când R<sub>L</sub>·C <b>crește</b>.</li>
<li>Bialternanță: T = 10 ms; monoalternanță: T = 20 ms (la 50 Hz).</li>
</ul>
<p>Filtre în Π (rezistive sau inductive) îmbunătățesc suplimentar filtrarea.</p>

<h2>7. Stabilizatoare de tensiune</h2>
<h3>Cu diodă Zener (referință)</h3>
<p>Zener invers menține U<sub>OUT</sub> ≈ U<sub>Z</sub>; R limitează curentul prin Zener. Doar curenți mici (zeci mA).</p>
<h3>Stabilizator paralel</h3>
<p>Elementul activ (Zener/tranzistor) este în <b>paralel</b> cu ieșirea. Adăugând un tranzistor (β) se mărește curentul: <span class="f">I<sub>out</sub> ≈ β·I<sub>D</sub></span>; U<sub>ref</sub> = U<sub>Z</sub> + U<sub>BE</sub>. Randament mic, dar precis, nu necesită protecție.</p>
<h3>Stabilizator serie</h3>
<p>Elementul activ în <b>serie</b> cu sarcina (tranzistor ca repetor pe emitor). U<sub>OUT</sub> ≈ U<sub>Z</sub> − 0,65 V. Pierderi proporționale cu curentul; necesită <b>protecție la suprasarcină</b> (R<sub>2</sub> senzor de curent + T2 care blochează T1 la scurtcircuit).</p>
<h3>Stabilizatoare integrate</h3>
<ul>
<li><b>78XX</b> – tensiuni pozitive (7805 → +5 V, 7812 → +12 V).</li>
<li><b>79XX</b> – tensiuni negative (7912 → −12 V).</li>
<li>Includ protecție la suprasarcină și supraîncălzire. Randament prost → folosite la puteri mici (câțiva W).</li>
</ul>

<h2>8. Circuite de limitare cu diode (limitatoare)</h2>
<p>Modelează/taie partea pozitivă sau negativă a semnalului; folosite la protecție și modelarea formei de undă.</p>
`
},

/* ===================== TEMA 4 ===================== */
{
 id:"t4", icon:"📡", num:4,
 title:"Tema 4 — Tranzistoare bipolare. Tipuri. Regimuri. Conexiuni. Polarizare.",
 short:"BJT: regimuri, polarizare, parametri h",
 html:`
<p class="lead">Inima examenului. Tranzistorul bipolar (TB/BJT): structură, cele 4 regimuri de funcționare, polarizarea cu divizor și parametrii dinamici h.</p>

<h2>1. Definiție și structură</h2>
<p>Dispozitiv activ cu 3 terminale: <b>Emitor (E)</b>, <b>Bază (B)</b>, <b>Colector (C)</b>; 3 regiuni semiconductoare, <b>2 joncțiuni p-n</b>. Conducția = 2 tipuri de purtători ⇒ "bipolar".</p>
<ul>
<li><b>NPN</b>: două regiuni N separate de P. <b>PNP</b>: două regiuni P separate de N.</li>
<li>Baza e <b>subțire și slab dopată</b>; emitorul <b>puternic dopat</b> (asimetrie p⁺n / n⁺p); colectorul dopat moderat.</li>
</ul>

<h2>2. Relații fundamentale</h2>
<div class="formula">I<sub>E</sub> = I<sub>C</sub> + I<sub>B</sub> &nbsp;&nbsp;|&nbsp;&nbsp; I<sub>C</sub> = β·I<sub>B</sub> &nbsp;&nbsp;|&nbsp;&nbsp; I<sub>E</sub> = (β+1)·I<sub>B</sub></div>
<div class="formula">β = \\frac{I<sub>C</sub>}{I<sub>B</sub>} (= h<sub>FE</sub>) &nbsp;&nbsp;|&nbsp;&nbsp; α = \\frac{I<sub>C</sub>}{I<sub>E</sub>} &nbsp;&nbsp;|&nbsp;&nbsp; β = \\frac{α}{1−α} &nbsp;&nbsp; α = \\frac{β}{1+β}</div>
<ul>
<li>β: 10…1000 (uzual sute). α: 0,95…0,99.</li>
<li>TB = element activ <b>comandat în curent</b> (un I<sub>B</sub> mic comandă un I<sub>C</sub> mare).</li>
<li>U<sub>BE</sub> ≈ 0,6–0,7 V (Si) la joncțiunea conducătoare.</li>
</ul>

<h2>3. Cele 4 regimuri de funcționare</h2>
<table>
<tr><th>Regim</th><th>Joncțiune EB</th><th>Joncțiune CB</th><th>Comportare</th></tr>
<tr><td><b>Activ normal (RAN)</b></td><td>directă</td><td>inversă</td><td>amplificator; I<sub>C</sub>=β·I<sub>B</sub></td></tr>
<tr><td><b>Saturație</b></td><td>directă</td><td>directă</td><td>întrerupător ÎNCHIS; U<sub>CE</sub>≈0,2 V; I<sub>C</sub><β·I<sub>B</sub></td></tr>
<tr><td><b>Blocare (tăiere)</b></td><td>inversă</td><td>inversă</td><td>întrerupător DESCHIS; I<sub>C</sub>≈0; U<sub>CE</sub>=E<sub>C</sub></td></tr>
<tr><td><b>Activ invers (RAI)</b></td><td>inversă</td><td>directă</td><td>doar teoretic, nefolosit</td></tr>
</table>
<div class="note"><b>Efectul de tranzistor:</b> joncțiunea EB (directă) injectează purtători în baza subțire; aceștia traversează spre colector sub câmpul joncțiunii CB (inverse) ⇒ I<sub>C</sub> ≈ I<sub>E</sub>. Un TB <b>nu</b> este echivalent cu două diode legate.</div>

<h2>4. Caracteristica de ieșire și dreapta de sarcină</h2>
<p>I<sub>C</sub> = f(U<sub>CE</sub>) pentru diverse I<sub>B</sub>. Unind <b>punctul de blocare (U<sub>CE</sub>=V<sub>CC</sub>)</b> cu <b>punctul de saturație (I<sub>C(sat)</sub>)</b> obținem <b>dreapta de sarcină c.c.</b> Intersecția dreptei cu caracteristica pentru I<sub>B0</sub> = <b>PSF</b> (punctul static de funcționare).</p>

<h2>5. Conexiunile TB (TB ca cuadripol/diport)</h2>
<table>
<tr><th>Conexiune</th><th>A<sub>u</sub></th><th>A<sub>i</sub></th><th>Defazaj</th><th>Z<sub>in</sub> / Z<sub>out</sub></th><th>Utilizare</th></tr>
<tr><td><b>Emitor comun (EC)</b></td><td>mare</td><td>mare</td><td><b>180°</b></td><td>medie / medie</td><td>amplificator universal (audio/video), inversor</td></tr>
<tr><td><b>Bază comună (BC)</b></td><td>mare</td><td>≈1</td><td>0°</td><td>mică / medie</td><td>frecvențe înalte, ampl. de curent ideal</td></tr>
<tr><td><b>Colector comun (CC)</b></td><td>≈1 (repetor)</td><td>mare</td><td>0°</td><td>foarte mare / mică</td><td>etaj tampon, adaptor de impedanță</td></tr>
</table>

<h2>6. Polarizarea cu divizor de tensiune în bază</h2>
<p>Cea mai folosită schemă. R₁(R<sub>B1</sub>) și R₂(R<sub>B2</sub>) fixează potențialul bazei; R<sub>C</sub> = sarcina; R<sub>E</sub> = stabilizare termică.</p>
<div class="formula">U<sub>B</sub> = V<sub>CC</sub>·\\frac{R<sub>B2</sub>}{R<sub>B1</sub>+R<sub>B2</sub>} &nbsp;(divizor)</div>
<div class="formula">I<sub>E</sub> = \\frac{U<sub>B</sub> − U<sub>BE</sub>}{R<sub>E</sub>} ≈ I<sub>C</sub> &nbsp;&nbsp;|&nbsp;&nbsp; U<sub>CE</sub> = V<sub>CC</sub> − I<sub>C</sub>·(R<sub>C</sub>+R<sub>E</sub>)</div>
<h3>Domenii uzuale de valori</h3>
<ul>
<li>R₁: zeci–sute kΩ; R₂: kΩ–zeci kΩ; R<sub>C</sub>: &lt;10 kΩ; R<sub>E</sub> ≈ (1/10)·(E<sub>C</sub>/I<sub>C</sub>), sute Ω–kΩ.</li>
</ul>

<h2>7. Stabilizarea termică a PSF</h2>
<p>T↑ → I<sub>CBo</sub>↑ → I<sub>C</sub>↑ → T↑ … = <b>ambalare termică</b>. R<sub>E</sub> și divizorul (R₂) o contracarează:</p>
<div class="formula">T↑ → I<sub>C</sub>↑ → I<sub>E</sub>·R<sub>E</sub>↑ → U<sub>BE</sub>↓ → I<sub>C</sub>↓ (stabilizare)</div>

<h2>8. Regimul dinamic — parametrii hibrizi (h)</h2>
<p>La semnal mic, în jurul PSF, TB se modelează liniar cu parametrii h (variabile independente: i<sub>B</sub>, u<sub>CE</sub>):</p>
<table>
<tr><th>Parametru</th><th>Semnificație</th><th>Ordin de mărime</th></tr>
<tr><td>h₁₁ (h<sub>ie</sub>)</td><td>impedanța de intrare (ieșire scurtcircuitată)</td><td>sute Ω – kΩ</td></tr>
<tr><td>h₁₂ (h<sub>re</sub>)</td><td>transfer invers în tensiune (intrare în gol)</td><td>10⁻³–10⁻⁴</td></tr>
<tr><td>h₂₁ (h<sub>fe</sub>)</td><td>amplificare dinamică în curent</td><td>10–100</td></tr>
<tr><td>h₂₂ (h<sub>oe</sub>)</td><td>admitanța de ieșire (intrare în gol)</td><td>h₂₂⁻¹≈10⁵ Ω</td></tr>
</table>

<h2>9. Alte dispozitive (familie TB)</h2>
<ul>
<li><b>Tiristor (SCR)</b>: 4 straturi, anod/catod/poartă; comandat în curent; conduce după depășirea U<sub>st</sub> sau prin curent de poartă; necesită R de limitare.</li>
<li><b>Triac</b>: comandă bilaterală (ambele alternanțe) – două structuri tiristor antiparalel.</li>
<li><b>Tranzistor Schottky</b>: diodă Schottky B-C împiedică saturația profundă → comutație rapidă.</li>
<li><b>Fototranzistor</b>: joncțiunea EB expusă la lumină; fluxul luminos joacă rolul lui U<sub>BE</sub>.</li>
</ul>
`
},

/* ===================== TEMA 5 ===================== */
{
 id:"t5", icon:"🎚️", num:5,
 title:"Tema 5 — Amplificatoare. Clasificare. Tipuri. Reacții în amplificatoare.",
 short:"Amplificatoare, clase, reacție negativă",
 html:`
<p class="lead">Amplificatorul de semnal mic: parametri, clase de funcționare (A/AB/B/C), etajul EC și reacția negativă.</p>

<h2>1. Ce este un amplificator</h2>
<p><b>Amplificatorul</b> = cuadripol (intrare + ieșire) care dezvoltă la ieșire o putere mai mare decât la intrare, <b>fără a distorsiona</b> forma semnalului. Energia suplimentară vine de la sursa de alimentare c.c.</p>
<p><b>Semnal mic</b>: semnalul amplificat e mic față de tensiunile de polarizare c.c.</p>

<h2>2. Clasificarea amplificatoarelor</h2>
<ul>
<li><b>După semnal:</b> de tensiune / de curent / de putere.</li>
<li><b>După elemente active:</b> cu tranzistoare / cu circuite integrate (operaționale) / magnetice.</li>
<li><b>După bandă:</b> c.c. (de la 0 Hz), audiofrecvență (20 Hz–20 kHz), radiofrecvență (20 kHz–30 MHz), FÎF (30–300 MHz).</li>
<li><b>După cuplaj între etaje:</b> RC, circuite acordate, transformator, rezistiv (c.c.).</li>
</ul>

<h2>3. Parametrii amplificatoarelor</h2>
<div class="formula">A<sub>u</sub> = \\frac{U<sub>ies</sub>}{U<sub>in</sub>} &nbsp;|&nbsp; A<sub>i</sub> = \\frac{I<sub>ies</sub>}{I<sub>in</sub>} &nbsp;|&nbsp; A<sub>p</sub> = \\frac{P<sub>ies</sub>}{P<sub>in</sub>}</div>
<div class="formula">A[dB] = 20·log₁₀(A<sub>u</sub>) (tensiune/curent) = 10·log₁₀(A<sub>p</sub>) (putere)</div>
<ul>
<li><b>Caracteristica amplitudine-frecvență</b>: A constantă la frecvențe medii, scade la capete.</li>
<li><b>Banda de frecvență</b>: B = f<sub>S</sub> − f<sub>J</sub> (frecvențele la care A scade la 1/√2 = −3 dB).</li>
<li><b>Produsul amplificare-bandă</b>: PAB = A·B (aproximativ constant).</li>
<li>Limitarea la frecvențe joase: condensatoarele de cuplaj; la frecvențe înalte: capacitățile parazite/interne.</li>
<li><b>Gama dinamică</b>, <b>distorsiuni</b> (liniare: amplitudine/fază vs. frecvență; neliniare: armonice/intermodulație), <b>raport semnal/zgomot</b>, <b>sensibilitate</b>.</li>
</ul>

<h2>4. Amplificarea c.c. — tranzistori compuși</h2>
<ul>
<li><b>Darlington</b> (2× npn): β<sub>ech</sub> ≈ β₁·β₂; rezistență de intrare mare.</li>
<li><b>Super-G</b>: pnp + npn complementari, se comportă ca npn cu β mare.</li>
</ul>

<h2>5. Clase de funcționare</h2>
<p>Definite după intervalul τ<sub>c</sub> dintr-o perioadă T în care tranzistorul conduce:</p>
<table>
<tr><th>Clasa</th><th>τc</th><th>Semnal de ieșire</th><th>Utilizare</th></tr>
<tr><td><b>A</b></td><td>τc = T</td><td>conduce tot timpul, nedistorsionat</td><td>semnal mic, fidelitate (randament mic ~25–50%)</td></tr>
<tr><td><b>AB</b></td><td>T/2 &lt; τc &lt; T</td><td>blocat un interval &lt;½ perioadă</td><td>etaje finale push-pull</td></tr>
<tr><td><b>B</b></td><td>τc = T/2</td><td>aspect de redresare monoalternanță</td><td>amplificatoare de putere</td></tr>
<tr><td><b>C</b></td><td>τc &lt; T/2</td><td>vârfuri de sinusoidă</td><td>RF cu sarcină rezonantă LC, oscilatoare</td></tr>
</table>
<p>Doar în <b>clasa A</b> forma de ieșire e identică cu cea de intrare. Amplitudini mari de intrare → saturație/blocare → vârfuri retezate (distorsiuni neliniare).</p>

<h2>6. Amplificatorul cu emitor comun (EC)</h2>
<p>Pornește de la polarizarea cu divizor + condensatoare:</p>
<ul>
<li><b>R<sub>B1</sub>, R<sub>B2</sub></b> – divizor de polarizare; <b>R<sub>E</sub></b> – stabilizare termică; <b>R<sub>C</sub></b> – sarcină.</li>
<li><b>C₁, C₂</b> – condensatoare de cuplaj (lasă c.a., blochează c.c.).</li>
<li><b>C<sub>E</sub></b> – condensator de decuplare: pune emitorul la masă <i>în c.a.</i> (scurtcircuit pentru componenta variabilă) → mărește A<sub>u</sub>.</li>
</ul>
<div class="formula">A<sub>u</sub> ≈ −\\frac{h₂₁·(R<sub>C</sub>‖R<sub>sarc</sub>)}{h₁₁} &nbsp;&nbsp; (semnul "−" = defazaj 180°)</div>
<div class="formula">A<sub>u</sub> ≈ −g<sub>m</sub>·R<sub>C</sub> &nbsp;&nbsp; (g<sub>m</sub> = panta tranzistorului)</div>
<div class="note"><b>Regim static</b> (ω=0): toate condensatoarele = întreruperi → schema de polarizare c.c. → PSF. <b>Regim dinamic</b>: condensatoarele = scurtcircuite, sursa c.c. = masă → dreapta de sarcină dinamică prin PSF.</div>
<p>Dacă scoatem C<sub>E</sub>: R<sub>E</sub> introduce <b>reacție negativă</b> serie → A<sub>u</sub> scade, dar liniaritate și stabilitate mai bune.</p>

<h2>7. Reacția (feedback)</h2>
<p><b>Reacția</b> = readucerea spre intrare a unei mărimi proporționale cu ieșirea.</p>
<div class="formula">A = \\frac{a}{1 + a·f} &nbsp;&nbsp; T = a·f (transmisie pe buclă) &nbsp;&nbsp; F = 1 + T (factor de reacție)</div>
<ul>
<li><b>Reacție negativă (RN)</b>: A &lt; a; mărimea readusă slăbește intrarea ⇒ <b>stabilizare</b>.</li>
<li><b>Reacție pozitivă (RP)</b>: A &gt; a; întărește intrarea ⇒ destabilizare (oscilatoare).</li>
<li>Dacă T ≫ 1: <span class="f">A ≈ 1/f</span> (depinde doar de rețeaua de reacție, nu de tranzistor).</li>
</ul>
<h3>Efectele reacției negative</h3>
<ul>
<li>Stabilizează câștigul (de F ori mai puțin sensibil la variația parametrilor).</li>
<li>Reduce distorsiunile (neliniare și liniare) de F ori.</li>
<li><b>Lărgește banda</b> (PAB ≈ constant).</li>
<li>Modifică convenabil Z<sub>in</sub>/Z<sub>out</sub>; reduce zgomotul.</li>
<li><b>Dezavantaje:</b> reduce amplificarea de F ori; pericol de autooscilație.</li>
</ul>
`
},

/* ===================== TEMA 6 ===================== */
{
 id:"t6", icon:"🧩", num:6,
 title:"Tema 6 — Tranzistoare cu efect de câmp (TEC-J, TEC-MOS). Clasificare. Caracteristici.",
 short:"FET / JFET / MOSFET; comparație cu BJT",
 html:`
<p class="lead">Tranzistorul cu efect de câmp (TEC/FET): dispozitiv <b>unipolar</b>, comandat <b>în tensiune</b>, cu impedanță de intrare foarte mare.</p>

<h2>1. Generalități</h2>
<ul>
<li><b>TEC (FET)</b> = tranzistor <b>unipolar</b>: conducția printr-un canal cu <b>un singur tip</b> de purtători (electroni SAU goluri).</li>
<li>"Efect de câmp": curentul între două terminale e controlat de câmpul electric al unui al treilea terminal ⇒ <b>comandat în tensiune</b>.</li>
<li>Terminale: <b>Drenă (D)</b>, <b>Sursă (S)</b>, <b>Grilă/Poartă (G)</b>, (Substrat). Curentul de drenă I<sub>D</sub> e comandat de V<sub>GS</sub>.</li>
</ul>
<h3>Tipuri</h3>
<ul>
<li><b>TEC-J (JFET)</b> – cu joncțiune; canal n sau p.</li>
<li><b>TEC-MOS (MOSFET / IGFET)</b> – grilă izolată (strat SiO₂); rezistență de intrare ~10¹⁵ Ω, I<sub>G</sub> ~10⁻¹⁵ A.
  <ul><li><b>canal inițial</b> (depletion) – canalul există constructiv.</li>
      <li><b>canal indus</b> (enhancement) – canalul apare doar dacă V<sub>GS</sub> > V<sub>prag</sub>.</li></ul>
</li>
</ul>

<h2>2. TEC-J — funcționare</h2>
<p>Joncțiunea grilă-sursă este polarizată <b>invers</b> ⇒ regiune golită care îngustează canalul → R<sub>canal</sub> crește. Cu cât |V<sub>GS</sub>| crește, cu atât canalul se îngustează și I<sub>D</sub> scade.</p>
<ul>
<li>Nu are caracteristică de intrare (joncțiune G-S invers polarizată, I<sub>G</sub> ~ zeci nA).</li>
<li><b>Tensiunea de blocare</b> V<sub>GS(off)</b></sub> (pinch-off): V<sub>GS</sub> pentru care I<sub>D</sub> = 0.</li>
<li><b>I<sub>DSS</sub></b>: curentul de drenă maxim (V<sub>GS</sub>=0).</li>
</ul>
<div class="formula">I<sub>D</sub> = I<sub>DSS</sub>·(1 − \\frac{V<sub>GS</sub>}{V<sub>GS(off)</sub>})² &nbsp;(caracteristica de transfer)</div>
<p>Caracteristici: de ieșire I<sub>D</sub>=f(V<sub>DS</sub>) și de transfer I<sub>D</sub>=f(V<sub>GS</sub>).</p>

<h2>3. TEC-MOS</h2>
<ul>
<li><b>Regim de sărăcire</b> (V<sub>G</sub> negativ pe canal n): electronii sunt îndepărtați → I<sub>D</sub> scade.</li>
<li><b>Regim de îmbogățire</b> (V<sub>G</sub> pozitiv): atrage electroni → I<sub>D</sub> crește.</li>
<li><b>Canal indus</b>: lucrează doar în îmbogățire; canalul apare la V<sub>GS</sub> > V<sub>prag</sub>.</li>
</ul>
<div class="warnbox"><b>Atenție ESD:</b> MOSFET-urile se distrug ușor la descărcări electrostatice. Se păstrează cu terminalele scurtcircuitate; scurtcircuitul se scoate doar după lipire.</div>

<h2>4. FET vs. BJT (comparație de examen)</h2>
<table>
<tr><th>Criteriu</th><th>FET (TEC)</th><th>BJT (TB)</th></tr>
<tr><td>Comandă</td><td><b>în tensiune</b></td><td>în curent</td></tr>
<tr><td>Purtători</td><td>unipolar (1 tip)</td><td>bipolar (2 tipuri)</td></tr>
<tr><td>Impedanța de intrare</td><td><b>foarte mare</b></td><td>mică</td></tr>
<tr><td>Câștig de tensiune</td><td>mic</td><td>mare</td></tr>
<tr><td>Câștig de curent</td><td>mare</td><td>scăzut</td></tr>
<tr><td>Zgomot</td><td>scăzut</td><td>mediu</td></tr>
<tr><td>Comutație</td><td>rapidă</td><td>medie (întârziere la saturație)</td></tr>
<tr><td>Sensibilitate ESD</td><td>ușor de deteriorat static</td><td>robust</td></tr>
<tr><td>Preț / polarizare</td><td>mai scump, greu de polarizat</td><td>ieftin, ușor de polarizat</td></tr>
</table>

<h2>5. Avantaje / dezavantaje</h2>
<p><b>Avantaje FET:</b> Z<sub>in</sub> foarte mare, poate fi rezistență comandată în tensiune, liniaritate bună la puteri mari, zgomot redus, gabarit mic, comutație rapidă.</p>
<p><b>Avantaje BJT:</b> transconductanță mai mare, comportare mai bună cu frecvența, capacitate mai mare în curent/tensiune, cădere mică V<sub>CEsat</sub>.</p>
<p><b>Conexiuni FET:</b> sursă comună (CS, cel mai des), grilă comună (CG), drenă comună (CD).</p>

<h2>6. Aplicație — memorii flash (poartă flotantă)</h2>
<p>Celula are o poartă flotantă; prin <b>Fowler-Nordheim tunneling</b> (tensiuni 10–13 V) se modifică starea (1↔0). Un senzor monitorizează sarcina; >50% → valoarea devine 0.</p>
`
}
];
