/* ============================================================
   EXAM — întrebări teoretice tip bilet (cu răspuns model) + structura biletului.
   Biletul real = 3 întrebări teoretice (din teme) + 1 problemă.
   ============================================================ */
const THEORY_QA = [
/* ---- Tema 1 ---- */
{t:1,q:"Legea lui Ohm (pe porțiune și pe întreg circuitul).",
 a:"<b>Pe o porțiune:</b> I = U/R (curentul ∝ tensiunea, ∝ 1/R). <b>Pe întreg circuitul</b> (sursă cu t.e.m. E și rezistență internă r pe sarcina R): I = E/(R+r). Tensiunea la borne U = E − r·I. Scurtcircuit: I<sub>sc</sub>=E/r (curent maxim)."},
{t:1,q:"Legile lui Kirchhoff (enunț).",
 a:"<b>Legea I (a nodurilor / KCL):</b> suma algebrică a curenților într-un nod = 0 (Σ intră = Σ ies) — conservarea sarcinii. <b>Legea a II-a (a ochiurilor / KVL):</b> pe un ochi, suma algebrică a t.e.m. = suma algebrică a căderilor de tensiune (Σ E = Σ R·I)."},
{t:1,q:"Rezistoare: conectare serie și paralel.",
 a:"<b>Serie:</b> R=R₁+R₂+… (mai mare decât oricare; divizor de tensiune; același I). <b>Paralel:</b> 1/R=1/R₁+1/R₂+… (mai mică decât oricare; divizor de curent; aceeași U). Două în paralel: R=(R₁·R₂)/(R₁+R₂). Putere: P=U·I=R·I²=U²/R."},
{t:1,q:"Condensatorul: capacitate, reactanță, comportare în c.c./c.a.",
 a:"Q=C·U; energia W=½CU²; C=εS/d. Reactanța X<sub>C</sub>=1/(2πfC) <b>scade cu frecvența</b>. În c.c. (f=0) → X<sub>C</sub>→∞ → <b>întrerupere</b>; la frecvențe mari → scurtcircuit. Element reactiv."},
{t:1,q:"Bobina: inductanță, reactanță, comportare în c.c./c.a.",
 a:"u<sub>L</sub>=L·di/dt; X<sub>L</sub>=2πfL <b>crește cu frecvența</b>. În c.c. bobina ≡ <b>scurtcircuit</b>. Se opune variației curentului; acumulează energie magnetică."},
{t:1,q:"Valoarea efectivă (RMS) a unui semnal alternativ.",
 a:"Valoarea efectivă = valoarea c.c. echivalentă termic. Pentru sinusoidă: X<sub>ef</sub>=X<sub>max</sub>/√2=0,707·X<sub>max</sub>. Voltmetrele/ampermetrele c.a. indică valoarea efectivă; osciloscopul indică valoarea de vârf."},

/* ---- Tema 2 ---- */
{t:2,q:"Semiconductor de tip N și de tip P (dopare).",
 a:"<b>Tip N:</b> impurități donoare (pentavalente) → exces de electroni; majoritari = electroni (−), minoritari = goluri (+). <b>Tip P:</b> impurități acceptoare (trivalente) → exces de goluri; majoritari = goluri (+), minoritari = electroni (−)."},
{t:2,q:"Joncțiunea p-n: formare și barieră de potențial.",
 a:"La contact P-N, golurile difuzează P→N și electronii N→P → regiune sărăcită cu sarcină spațială și câmp intern E<sub>int</sub> care se opune difuziei → <b>barieră de potențial</b>. La echilibru difuzia se oprește."},
{t:2,q:"Polarizarea directă și inversă a diodei.",
 a:"<b>Directă</b> (anod + față de catod): bariera scade; după prag (Si≈0,6–0,7 V) curentul crește exponențial → dioda conduce. <b>Inversă</b>: bariera crește; dioda blocată, doar curent invers de saturație I<sub>s</sub> (µA, dat de minoritari, dependent de T)."},
{t:2,q:"Dioda Zener — principiu și utilizare.",
 a:"Polarizată <b>invers</b>; la tensiunea Zener U<sub>Z</sub> curentul crește mult dar tensiunea rămâne ≈constantă (avalanșă + efect Zener) → folosită ca <b>stabilizator/referință de tensiune</b>. Necesită R de limitare a curentului."},
{t:2,q:"Tipuri speciale de diode (Schottky, LED, fotodiodă, varicap, tunel).",
 a:"<b>Schottky:</b> metal-semiconductor, comutație foarte rapidă, cădere mică (~0,3 V). <b>LED:</b> emite lumină în direct (electroluminescență). <b>Fotodiodă:</b> invers, curent ∝ iluminare. <b>Varicap:</b> capacitate variabilă cu U inversă. <b>Tunel:</b> rezistență diferențială negativă (RF)."},
{t:2,q:"Dreapta de sarcină și punctul static de funcționare al diodei.",
 a:"Pentru diodă+R+E: i<sub>D</sub>=(E−u<sub>D</sub>)/R = dreapta de sarcină. Intersecția ei cu caracteristica volt-amperică a diodei = <b>punctul static de funcționare (M)</b>. Rămâne fix cât timp E și R sunt constante."},

/* ---- Tema 3 ---- */
{t:3,q:"Structura unui alimentator (sursă) de c.c.",
 a:"Rețea c.a. → <b>Transformator</b> (modifică/izolează) → <b>Redresor</b> (c.a.→pulsatoriu) → <b>Filtru</b> (reduce componentele alternative/riplul) → <b>Stabilizator</b> (U/I constante) → sarcina R<sub>S</sub>."},
{t:3,q:"Redresor monoalternanță vs. bialternanță vs. punte.",
 a:"<b>Mono</b> (1 diodă): V<sub>med</sub>=V<sub>max</sub>/π, calitate slabă. <b>Bialternanță cu priză mediană</b> (2 diode): V<sub>med</sub>=2V<sub>max</sub>/π, riplu mai mic. <b>Punte Graetz</b> (4 diode): fără priză mediană, dar 4 diode/mai multe pierderi; formă ca bialternanța."},
{t:3,q:"Filtrul cu condensator și factorul de undă (ripple).",
 a:"C în paralel cu sarcina se încarcă la vârf și se descarcă prin R<sub>L</sub> (τ=R<sub>L</sub>·C). Factor de undă = V<sub>ef(c.a.)</sub>/V<sub>med</sub>; riplul <b>scade</b> când R<sub>L</sub>·C crește. Bialternanța are riplu mai mic (frecvență dublă)."},
{t:3,q:"Stabilizator serie vs. paralel.",
 a:"<b>Paralel:</b> element activ în paralel cu ieșirea (Zener/tranzistor); precis, nu cere protecție, dar randament mic și consum constant. <b>Serie:</b> element activ (tranzistor repetor) în serie cu sarcina; pierderi ∝ curent, dar necesită protecție la suprasarcină. Integrate: 78XX (+), 79XX (−)."},

/* ---- Tema 4 ---- */
{t:4,q:"Funcționarea tranzistorului bipolar (efectul de tranzistor).",
 a:"3 regiuni (E,B,C), 2 joncțiuni. Funcționează corect dacă EB e directă și CB inversă. EB injectează purtători în baza subțire; aceștia traversează spre colector sub câmpul CB → I<sub>C</sub>≈I<sub>E</sub>. Baza controlează curentul. Relații: I<sub>E</sub>=I<sub>C</sub>+I<sub>B</sub>, I<sub>C</sub>=β·I<sub>B</sub>."},
{t:4,q:"Cele patru regimuri de funcționare ale TB.",
 a:"<b>Activ normal:</b> EB directă, CB inversă → amplificator, I<sub>C</sub>=β·I<sub>B</sub>. <b>Saturație:</b> ambele directe → întrerupător închis, U<sub>CE</sub>≈0,2 V. <b>Blocare:</b> ambele inverse → întrerupător deschis, I<sub>C</sub>≈0. <b>Activ invers:</b> EB inversă, CB directă → doar teoretic."},
{t:4,q:"Tipuri de tranzistoare bipolare (NPN/PNP) și parametrii β, α.",
 a:"<b>NPN</b> (N-P-N, majoritari electroni) și <b>PNP</b> (P-N-P, majoritari goluri). β=I<sub>C</sub>/I<sub>B</sub> (=h<sub>FE</sub>, câștigul în curent, 10–1000); α=I<sub>C</sub>/I<sub>E</sub> (0,95–0,99); β=α/(1−α). TB = element comandat în curent."},
{t:4,q:"Conexiunile tranzistorului (EC, BC, CC).",
 a:"<b>EC (emitor comun):</b> A<sub>u</sub> și A<sub>i</sub> mari, defazaj 180°, Z medii — amplificator universal/inversor. <b>BC (bază comună):</b> A<sub>u</sub> mare, A<sub>i</sub>≈1, Z<sub>in</sub> mică — frecvențe înalte. <b>CC (colector comun/repetor):</b> A<sub>u</sub>≈1, Z<sub>in</sub> mare, Z<sub>out</sub> mică — etaj tampon/adaptor de impedanță."},
{t:4,q:"Polarizarea cu divizor de tensiune și stabilizarea termică.",
 a:"R<sub>B1</sub>,R<sub>B2</sub> fixează U<sub>B</sub>=V<sub>CC</sub>·R<sub>B2</sub>/(R<sub>B1</sub>+R<sub>B2</sub>); R<sub>E</sub> stabilizare termică, R<sub>C</sub> sarcină. <b>Stabilizare:</b> T↑→I<sub>C</sub>↑→I<sub>E</sub>R<sub>E</sub>↑→U<sub>BE</sub>↓→I<sub>C</sub>↓ (contracarează ambalarea termică). R<sub>E</sub> și R₂ sunt obligatorii."},
{t:4,q:"Dreapta de sarcină în c.c. și PSF.",
 a:"U<sub>CE</sub>=V<sub>CC</sub>−I<sub>C</sub>(R<sub>C</sub>+R<sub>E</sub>) = dreapta de sarcină; unește blocarea (U<sub>CE</sub>=V<sub>CC</sub>) cu saturația (I<sub>C(sat)</sub>). <b>PSF</b> = intersecția dreptei cu caracteristica de ieșire pentru I<sub>B0</sub> dat."},
{t:4,q:"Parametrii hibrizi (h) ai TB.",
 a:"Model liniar de semnal mic: h₁₁ = impedanța de intrare (sute Ω–kΩ); h₁₂ = transfer invers în tensiune (10⁻³–10⁻⁴); h₂₁ = câștigul dinamic în curent (10–100); h₂₂ = admitanța de ieșire (h₂₂⁻¹≈10⁵ Ω). Din catalog."},

/* ---- Tema 5 ---- */
{t:5,q:"Ce este un amplificator și cum se clasifică.",
 a:"Cuadripol care dă la ieșire o putere mai mare decât la intrare fără a distorsiona forma (energia vine de la sursă). Clasificare: după semnal (tensiune/curent/putere), elemente active (tranzistoare/CI/magnetice), bandă (c.c./AF/RF/FÎF), cuplaj (RC/transformator/acordat)."},
{t:5,q:"Parametrii amplificatorului (amplificare, bandă, distorsiuni).",
 a:"A<sub>u</sub>=U<sub>ies</sub>/U<sub>in</sub>; A[dB]=20·log(A<sub>u</sub>). Banda B=f<sub>S</sub>−f<sub>J</sub> (la −3 dB); PAB=A·B≈const. Distorsiuni liniare (amplitudine/fază vs. f) și neliniare (armonice/intermodulație); raport semnal/zgomot; gama dinamică; sensibilitate."},
{t:5,q:"Clasele de funcționare (A, AB, B, C).",
 a:"După intervalul de conducție τc: <b>A</b> (τc=T, fidel, randament mic); <b>AB</b> (T/2&lt;τc&lt;T); <b>B</b> (τc=T/2, ampl. de putere push-pull); <b>C</b> (τc&lt;T/2, RF cu sarcină rezonantă). Doar clasa A nu distorsionează forma."},
{t:5,q:"Etaj de amplificare cu emitor comun (rolul condensatoarelor).",
 a:"Polarizare cu divizor + C₁,C₂ (cuplaj: trec c.a., blochează c.c.) + C<sub>E</sub> (decuplare: pune emitorul la masă în c.a. → mărește A<sub>u</sub>). A<sub>u</sub>≈−g<sub>m</sub>·R<sub>C</sub> (semnul − = defazaj 180°). Regim static: C=întreruperi; dinamic: C=scurtcircuite."},
{t:5,q:"Reacția negativă — efecte, avantaje, dezavantaje.",
 a:"A=a/(1+af), F=1+T (T=af). RN: A&lt;a. <b>Avantaje:</b> stabilizează câștigul, reduce distorsiunile și zgomotul de F ori, lărgește banda, modifică convenabil Z<sub>in</sub>/Z<sub>out</sub>. <b>Dezavantaje:</b> reduce amplificarea de F ori, pericol de autooscilație."},

/* ---- Tema 6 ---- */
{t:6,q:"Tranzistorul cu efect de câmp (TEC/FET): definiție și tipuri.",
 a:"Dispozitiv <b>unipolar</b> (un singur tip de purtători), <b>comandat în tensiune</b> (V<sub>GS</sub> controlează I<sub>D</sub>). Terminale: Drenă, Sursă, Grilă. Tipuri: <b>TEC-J (JFET)</b> cu joncțiune; <b>TEC-MOS (MOSFET)</b> cu grilă izolată (canal inițial / canal indus)."},
{t:6,q:"Funcționarea TEC-J.",
 a:"Joncțiunea grilă-sursă e polarizată <b>invers</b> → regiune golită îngustează canalul → I<sub>D</sub> scade când |V<sub>GS</sub>| crește. Z<sub>in</sub> foarte mare, I<sub>G</sub> mic. I<sub>D</sub>=I<sub>DSS</sub>(1−V<sub>GS</sub>/V<sub>GS(off)</sub>)². V<sub>GS(off)</sub> = tensiunea de blocare; I<sub>DSS</sub> = curentul max."},
{t:6,q:"TEC-MOS: canal inițial vs. canal indus; regim sărăcire/îmbogățire.",
 a:"Grilă izolată cu SiO₂ → Z<sub>in</sub>~10¹⁵ Ω. <b>Canal inițial:</b> canalul există constructiv (poate lucra în sărăcire/îmbogățire). <b>Canal indus:</b> canalul apare doar la V<sub>GS</sub>>V<sub>prag</sub> (doar îmbogățire). Atenție la ESD!"},
{t:6,q:"Comparație FET vs. BJT.",
 a:"FET: comandat în <b>tensiune</b>, unipolar, Z<sub>in</sub> foarte mare, zgomot mic, comutație rapidă, sensibil la ESD, scump. BJT: comandat în <b>curent</b>, bipolar, Z<sub>in</sub> mică, transconductanță mai mare, robust, ieftin, ușor de polarizat."}
];

/* Structura biletului: 3 teorii (din teme diferite) + 1 problemă */
function genBilet(){
  // grupăm întrebările pe teme și alegem 3 teme distincte
  const byT={}; THEORY_QA.forEach(x=>{(byT[x.t]=byT[x.t]||[]).push(x);});
  const teme=Object.keys(byT);
  // shuffle teme
  for(let i=teme.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[teme[i],teme[j]]=[teme[j],teme[i]];}
  const chosen=teme.slice(0,3).map(t=>R.pick(byT[t]));
  const gen=R.pick(GENERATORS);
  return {questions:chosen, problem:gen.fn(), problemName:gen.name};
}
