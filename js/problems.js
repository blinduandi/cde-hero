/* ============================================================
   PROBLEME REZOLVATE — format examen: Se dă / Se cere / rezolvare
   pas cu pas, cu explicatii de profesor (de ce aplicam fiecare
   formula) + formule cu fractii afisate clar (\frac{...}{...}).
   Fiecare pas: {e: explicatia, c: calculul}.
   ============================================================ */
const CATS = {
  ohm:   {icon:"⚡", name:"Legea lui Ohm & Kirchhoff"},
  div:   {icon:"📐", name:"Divizoare de tensiune"},
  diode: {icon:"🔺", name:"Circuite cu diode"},
  bjt:   {icon:"📡", name:"Tranzistoare bipolare (polarizare / PSF)"},
  bjtreg:{icon:"🧭", name:"Tranzistoare bipolare (regiuni de funcționare)"}
};

const PROBLEME = [

/* ---------- OHM / KIRCHHOFF ---------- */
{
 id:"O1", cat:"ohm", titlu:"Rețea serie cu un grup paralel (R₃‖R₄)",
 enunt:"Într-un circuit, rezistoarele R₁ și R₂ sunt legate în serie, iar la capăt R₃ și R₄ sunt legate în paralel între ele. Circuitul este alimentat de la sursa V₁. Să se determine rezistența echivalentă a circuitului și intensitatea curentului total.",
 date:"R₁=10 Ω · R₂=20 Ω · R₃=20 Ω · R₄=20 Ω · V₁=12 V",
 seCere:"Rezistența echivalentă R<sub>E</sub> și intensitatea curentului I.",
 pasi:[
  {e:"Mai întâi simplificăm circuitul. R₃ și R₄ sunt conectate între aceleași două noduri, deci sunt <b>în paralel</b>. Pentru două rezistoare în paralel folosim formula <b>produsul peste sumă</b> — și rețineți: rezistența rezultată e mereu mai mică decât cea mai mică dintre ele.",
   c:"R₃₄ = \\frac{R₃·R₄}{R₃+R₄} = \\frac{20·20}{20+20} = \\frac{400}{40} = <b>10 Ω</b>"},
  {e:"Acum circuitul s-a redus la R₁, R₂ și grupul R₃₄ <b>în serie</b> (curentul trece pe rând prin toate). La conexiunea serie rezistențele se <b>adună</b>, fiindcă fiecare se opune pe rând trecerii aceluiași curent.",
   c:"R<sub>E</sub> = R₁ + R₂ + R₃₄ = 10 + 20 + 10 = <b>40 Ω</b>"},
  {e:"Sursa vede acum o singură rezistență R<sub>E</sub>. Aplicăm legea lui Ohm pe întreg circuitul: curentul debitat = tensiunea sursei împărțită la rezistența totală.",
   c:"I = \\frac{V₁}{R<sub>E</sub>} = \\frac{12}{40} = <b>0,3 A = 300 mA</b>"}
 ],
 raspuns:"R<sub>E</sub> = 40 Ω &nbsp;·&nbsp; I = 0,3 A"
},
{
 id:"O2", cat:"ohm", titlu:"Două grupuri paralele în serie",
 enunt:"R₁ și R₅ sunt în paralel; rezultatul în serie cu R₂; apoi R₃ și R₄ în paralel. Circuitul e alimentat de la V₁. Să se afle rezistența echivalentă și curentul total.",
 date:"R₁=10 Ω · R₂=12 Ω · R₃=40 Ω · R₄=10 Ω · R₅=10 Ω · V₁=15 V",
 seCere:"Rezistența echivalentă R<sub>E</sub> și curentul total I.",
 pasi:[
  {e:"Regula de aur: rezolvăm întâi grupurile paralele, apoi adunăm seriile. Începem cu R₃ ‖ R₄.",
   c:"R₃₄ = \\frac{R₃·R₄}{R₃+R₄} = \\frac{40·10}{50} = <b>8 Ω</b>"},
  {e:"Al doilea grup paralel, R₁ ‖ R₅. Fiind egale, rezultatul e exact jumătate.",
   c:"R₁₅ = \\frac{R₁·R₅}{R₁+R₅} = \\frac{10·10}{20} = <b>5 Ω</b>"},
  {e:"Acum cele trei blocuri (R₁₅, R₂, R₃₄) rămân în serie ⇒ le adunăm.",
   c:"R<sub>E</sub> = R₁₅ + R₂ + R₃₄ = 5 + 12 + 8 = <b>25 Ω</b>"},
  {e:"Legea lui Ohm pe tot circuitul ne dă curentul total.",
   c:"I = \\frac{V₁}{R<sub>E</sub>} = \\frac{15}{25} = <b>0,6 A = 600 mA</b>"}
 ],
 raspuns:"R<sub>E</sub> = 25 Ω &nbsp;·&nbsp; I = 0,6 A"
},
{
 id:"O3", cat:"ohm", titlu:"Două ramuri paralele + R serie (sistem KCL/KVL)",
 enunt:"R₁ (ramura 1, curent I₁) este în paralel cu R₂ (ramura 2, curent I₂); ansamblul este în serie cu R₃, prin care trece curentul total I. Sursa V₁. Să se afle curenții și tensiunea pe R₃.",
 date:"R₁=10 Ω · R₂=30 Ω · R₃=2,5 Ω · V₁=16 V",
 seCere:"I₁, I₂, U₃ (pe R₃), I, R₁₂ și R<sub>E</sub>.",
 pasi:[
  {e:"Aici curenții din ramuri sunt diferiți, deci scriem legile lui Kirchhoff. <b>KVL</b> (legea ochiurilor): tensiunea sursei se consumă pe R₃ și pe ramura paralelă. <b>Ramurile paralele au aceeași tensiune</b>, de aceea I₁R₁ = I₂R₂. <b>KCL</b> (legea nodului): I = I₁ + I₂.",
   c:"V₁ = I·R₃ + I₂·R₂ &nbsp;|&nbsp; I₁·R₁ = I₂·R₂ &nbsp;|&nbsp; I = I₁ + I₂"},
  {e:"Din egalitatea tensiunilor pe cele două ramuri scoatem legătura dintre curenți (ramura cu rezistență mai mică ia mai mult curent).",
   c:"10·I₁ = 30·I₂ ⟹ <b>I₁ = 3·I₂</b>"},
  {e:"Înlocuim I = I₁+I₂ = 4·I₂ în prima ecuație și rămâne o singură necunoscută.",
   c:"16 = 2,5·(4·I₂) + 30·I₂ = 40·I₂ ⟹ I₂ = \\frac{16}{40} = <b>0,4 A</b>"},
  {e:"Ne întoarcem la ceilalți curenți.",
   c:"I₁ = 3·0,4 = <b>1,2 A</b> ; &nbsp; I = I₁+I₂ = <b>1,6 A</b>"},
  {e:"Prin R₃ trece curentul total I, deci tensiunea pe el e R₃·I (legea lui Ohm pe rezistor).",
   c:"U₃ = R₃·I = 2,5·1,6 = <b>4 V</b>"},
  {e:"Pentru verificare aflăm și rezistențele echivalente.",
   c:"R₁₂ = \\frac{R₁·R₂}{R₁+R₂} = \\frac{300}{40} = <b>7,5 Ω</b> ; R<sub>E</sub> = R₃ + R₁₂ = <b>10 Ω</b>"}
 ],
 raspuns:"I₁=1,2 A · I₂=0,4 A · U₃=4 V · I=1,6 A · R₁₂=7,5 Ω · R<sub>E</sub>=10 Ω"
},
{
 id:"O4", cat:"ohm", titlu:"Divizor de tensiune simplu (R₁, R₂ serie)",
 enunt:"Două rezistoare R₁ și R₂ sunt legate în serie la sursa V₁. Să se determine tensiunile pe fiecare rezistor, curentul și rezistența echivalentă.",
 date:"R₁=12 Ω · R₂=36 Ω · V₁=18 V",
 seCere:"U₁ (pe R₁), U₂ (pe R₂), I și R<sub>E</sub>.",
 pasi:[
  {e:"Fiind legate în serie, rezistențele se adună.",
   c:"R<sub>E</sub> = R₁ + R₂ = 12 + 36 = <b>48 Ω</b>"},
  {e:"Într-un circuit serie curentul este <b>același</b> peste tot. Îl aflăm cu legea lui Ohm.",
   c:"I = \\frac{V₁}{R<sub>E</sub>} = \\frac{18}{48} = <b>0,375 A</b>"},
  {e:"Tensiunea pe fiecare rezistor = R·I. Cum I e comun, rezistorul mai mare ia mai multă tensiune (regula divizorului).",
   c:"U₁ = R₁·I = 12·0,375 = <b>4,5 V</b>"},
  {e:"La fel pentru R₂. Verificăm cu KVL: suma căderilor trebuie să dea tensiunea sursei.",
   c:"U₂ = R₂·I = 36·0,375 = <b>13,5 V</b> &nbsp;(4,5+13,5 = 18 V ✓)"}
 ],
 raspuns:"U₁=4,5 V · U₂=13,5 V · I=0,375 A · R<sub>E</sub>=48 Ω"
},
{
 id:"O5", cat:"ohm", titlu:"Serie cu grup de 3 rezistoare în paralel",
 enunt:"R₁ în serie, apoi R₂, R₃, R₄ în paralel (trei ramuri între aceleași noduri), apoi R₅ și R₆ în serie. Sursa V₁. Să se afle U₁ (pe R₁), curentul și rezistența echivalentă.",
 date:"R₁=7 · R₂=5 · R₃=3 · R₄=6 · R₅=8 · R₆=9 [Ω] · V₁=12 V",
 seCere:"U₁, I și R<sub>E</sub>.",
 pasi:[
  {e:"Pentru mai mult de două rezistoare în paralel folosim suma <b>inverselor</b> (a conductanțelor). Rezultatul e mai mic decât cea mai mică rezistență din grup.",
   c:"\\frac{1}{R₂₃₄} = \\frac{1}{5}+\\frac{1}{3}+\\frac{1}{6} = \\frac{7}{10} ⟹ R₂₃₄ = \\frac{10}{7} = <b>1,428 Ω</b>"},
  {e:"Restul (R₁, grupul, R₅, R₆) sunt în serie ⇒ adunăm.",
   c:"R<sub>E</sub> = 7 + 1,428 + 8 + 9 = <b>25,428 Ω</b>"},
  {e:"Legea lui Ohm pe tot circuitul.",
   c:"I = \\frac{V₁}{R<sub>E</sub>} = \\frac{12}{25,428} = <b>0,472 A</b>"},
  {e:"R₁ e parcurs de curentul total, deci U₁ = R₁·I.",
   c:"U₁ = R₁·I = 7·0,472 = <b>3,3 V</b>"}
 ],
 raspuns:"U₁≈3,3 V · I≈0,472 A · R<sub>E</sub>≈25,43 Ω"
},

/* ---------- DIVIZOARE ---------- */
{
 id:"D1", cat:"div", titlu:"Divizor 12 V cu 20 Ω și 40 Ω",
 enunt:"Un rezistor de 20 Ω este în serie cu unul de 40 Ω, alimentate de o sursă de 12 V c.c. Să se afle curentul și căderea de tensiune pe fiecare rezistor.",
 date:"R₁=20 Ω · R₂=40 Ω · V<sub>S</sub>=12 V",
 seCere:"Curentul I și căderile V<sub>R1</sub>, V<sub>R2</sub>.",
 pasi:[
  {e:"Serie ⇒ rezistența totală e suma.",
   c:"R<sub>T</sub> = R₁ + R₂ = 20 + 40 = <b>60 Ω</b>"},
  {e:"Curentul e comun ambelor rezistoare (serie).",
   c:"I = \\frac{V<sub>S</sub>}{R<sub>T</sub>} = \\frac{12}{60} = <b>0,2 A = 200 mA</b>"},
  {e:"Folosim direct <b>regula divizorului de tensiune</b>: fiecare rezistor primește o fracțiune din tensiune egală cu raportul rezistenței lui la rezistența totală.",
   c:"V<sub>R1</sub> = V<sub>S</sub>·\\frac{R₁}{R<sub>T</sub>} = 12·\\frac{20}{60} = <b>4 V</b>"},
  {e:"Analog pentru R₂. Cel mai mare rezistor are căderea cea mai mare. Verificare: 4+8 = 12 V.",
   c:"V<sub>R2</sub> = V<sub>S</sub>·\\frac{R₂}{R<sub>T</sub>} = 12·\\frac{40}{60} = <b>8 V</b>"}
 ],
 raspuns:"I=0,2 A · V<sub>R1</sub>=4 V · V<sub>R2</sub>=8 V"
},
{
 id:"D2", cat:"div", titlu:"Divizor 36 V cu 6k/12k/18k",
 enunt:"Trei rezistoare de 6 kΩ, 12 kΩ și 18 kΩ în serie, alimentate de la 36 V. Să se calculeze rezistența totală, curentul și tensiunea pe fiecare rezistor.",
 date:"V<sub>S</sub>=36 V · R₁=6 kΩ · R₂=12 kΩ · R₃=18 kΩ",
 seCere:"R<sub>T</sub>, I și V<sub>R1</sub>, V<sub>R2</sub>, V<sub>R3</sub>.",
 pasi:[
  {e:"Serie ⇒ adunăm.",
   c:"R<sub>T</sub> = 6k+12k+18k = <b>36 kΩ</b>"},
  {e:"Curentul comun.",
   c:"I = \\frac{V<sub>S</sub>}{R<sub>T</sub>} = \\frac{36}{36000} = <b>1 mA</b>"},
  {e:"Regula divizorului pentru fiecare rezistor (sau direct V=R·I, fiindcă I=1 mA).",
   c:"V<sub>R1</sub>=V<sub>S</sub>·\\frac{R₁}{R<sub>T</sub>}=6 V ; V<sub>R2</sub>=12 V ; V<sub>R3</sub>=18 V"}
 ],
 raspuns:"R<sub>T</sub>=36 kΩ · I=1 mA · 6/12/18 V"
},
{
 id:"D3", cat:"div", titlu:"Puncte de priză (15 V)",
 enunt:"Rețea serie cu prize A–E: R₁=8k, R₂=4k, R₃=2k, R₄=1k, sursă 15 V. Să se afle tensiunile pe fiecare rezistor și tensiunea între punctele B și E.",
 date:"R₁=8 kΩ · R₂=4 kΩ · R₃=2 kΩ · R₄=1 kΩ · V<sub>S</sub>=15 V",
 seCere:"V<sub>AB</sub>, V<sub>BC</sub>, V<sub>CD</sub>, V<sub>DE</sub> și V<sub>BE</sub>.",
 pasi:[
  {e:"Adunăm toate rezistențele (serie).",
   c:"R<sub>T</sub> = 8k+4k+2k+1k = <b>15 kΩ</b>"},
  {e:"Fiecare cădere se află cu regula divizorului (raportul rezistenței la total, ori tensiunea sursei).",
   c:"V<sub>AB</sub>=V<sub>S</sub>·\\frac{R₁}{R<sub>T</sub>}=8 V ; V<sub>BC</sub>=4 V ; V<sub>CD</sub>=2 V ; V<sub>DE</sub>=1 V"},
  {e:"Tensiunea între B și E acoperă rezistoarele R₂+R₃+R₄ (le sumăm sau aplicăm divizorul pe suma lor).",
   c:"V<sub>BE</sub> = V<sub>S</sub>·\\frac{R₂+R₃+R₄}{R<sub>T</sub>} = 15·\\frac{7k}{15k} = <b>7 V</b>"}
 ],
 raspuns:"8/4/2/1 V · V<sub>BE</sub>=7 V"
},
{
 id:"D4", cat:"div", titlu:"Proiectare divizor 24 V / 60 W → ±12 V, +5 V, +3,3 V",
 enunt:"Să se găsească R₁..R₄ care produc nivelele −12 V, +3,3 V, +5 V, +12 V, dacă puterea totală furnizată divizorului (fără sarcină) este 24 V / 60 W. Masa este mutată pentru a obține tensiuni pozitive și negative.",
 date:"V<sub>S</sub>=24 V · P=60 W · Noduri: A=+12 V, B=+5 V, C=+3,3 V, 0 V, D=−12 V",
 seCere:"Valorile R₁, R₂, R₃, R₄.",
 pasi:[
  {e:"Aici e o problemă inversă: cunoaștem tensiunile dorite, căutăm rezistențele. Întâi aflăm curentul prin divizor din puterea totală (P=V·I).",
   c:"I = \\frac{P}{V} = \\frac{60}{24} = <b>2,5 A</b>"},
  {e:"Fiind un singur curent prin tot lanțul, fiecare rezistor susține diferența de potențial dintre două noduri vecine: R = ΔV/I (legea lui Ohm).",
   c:"R₁ = \\frac{V<sub>A</sub>−V<sub>B</sub>}{I} = \\frac{12−5}{2,5} = <b>2,8 Ω</b>"},
  {e:"La fel între B și C.",
   c:"R₂ = \\frac{V<sub>B</sub>−V<sub>C</sub>}{I} = \\frac{5−3,3}{2,5} = <b>0,68 Ω</b>"},
  {e:"Între C și masa (0 V).",
   c:"R₃ = \\frac{V<sub>C</sub>−0}{I} = \\frac{3,3}{2,5} = <b>1,32 Ω</b>"},
  {e:"Sub masă, până la nodul negativ D = −12 V ⇒ diferența e 12 V. Aici se vede de ce mutăm masa: ca să apară și tensiuni negative.",
   c:"R₄ = \\frac{12}{2,5} = <b>4,8 Ω</b>"}
 ],
 raspuns:"R₁=2,8 Ω · R₂=0,68 Ω · R₃=1,32 Ω · R₄=4,8 Ω"
},

/* ---------- DIODE ---------- */
{
 id:"DI1", cat:"diode", titlu:"Rezistența de c.c. a diodei (din caracteristică)",
 enunt:"O diodă are caracteristica I-V dată. Să se determine rezistența de curent continuu R<sub>D</sub> în trei cazuri.",
 date:"a) I<sub>D</sub>=20 mA ⇒ V<sub>D</sub>=0,8 V · b) I<sub>D</sub>=2 mA ⇒ V<sub>D</sub>=0,5 V · c) V<sub>D</sub>=−10 V ⇒ I<sub>D</sub>=−1 µA",
 seCere:"R<sub>D</sub> în fiecare caz.",
 pasi:[
  {e:"Dioda e neliniară, deci nu are o singură rezistență. Rezistența de c.c. este raportul direct tensiune/curent <b>în punctul de funcționare</b> (nu panta caracteristicii). Citim V și I de pe grafic și împărțim.",
   c:"R<sub>D</sub> = \\frac{V<sub>D</sub>}{I<sub>D</sub>}"},
  {e:"a) În punctul cu I=20 mA, graficul dă V=0,8 V.",
   c:"R<sub>D</sub> = \\frac{0,8}{20\\,mA} = <b>40 Ω</b>"},
  {e:"b) La curent mai mic tensiunea scade, dar raportul (rezistența) crește — dovada neliniarității.",
   c:"R<sub>D</sub> = \\frac{0,5}{2\\,mA} = <b>250 Ω</b>"},
  {e:"c) În polarizare inversă curentul e minuscul (µA), deci rezistența iese uriașă.",
   c:"R<sub>D</sub> = \\frac{−10}{−1\\,µA} = <b>10 MΩ</b>"}
 ],
 raspuns:"40 Ω · 250 Ω · 10 MΩ"
},
{
 id:"DI2", cat:"diode", titlu:"Rezistența de semnal mare r<sub>D</sub>",
 enunt:"Curentul prin diodă variază între 2 mA (V=0,65 V) și 17 mA (V=0,725 V). Să se determine rezistența diodei.",
 date:"i<sub>min</sub>=2 mA (0,65 V) · i<sub>max</sub>=17 mA (0,725 V)",
 seCere:"Rezistența de semnal mare r<sub>D</sub>.",
 pasi:[
  {e:"Când semnalul e mare, dioda parcurge o porțiune întreagă a caracteristicii. Atunci rezistența relevantă e raportul <b>variațiilor</b> (panta secantei dintre cele două puncte), nu raportul direct.",
   c:"r<sub>D</sub> = \\frac{Δv<sub>D</sub>}{Δi<sub>D</sub>}"},
  {e:"Calculăm cele două variații, de curent și de tensiune.",
   c:"Δi<sub>D</sub> = 17−2 = 15 mA ; Δv<sub>D</sub> = 0,725−0,65 = 75 mV"},
  {e:"Amplitudinea tensiunii (jumătate din variație) e de zeci de mV — asta confirmă regimul de semnal mare. Apoi împărțim.",
   c:"r<sub>D</sub> = \\frac{0,075}{15\\,mA} = <b>5 Ω</b>"}
 ],
 raspuns:"r<sub>D</sub> = 5 Ω"
},
{
 id:"DI3", cat:"diode", titlu:"Rezistența de semnal mic r<sub>d</sub>",
 enunt:"Curentul variază între 20 mA (V=0,78 V) și 30 mA (V=0,8 V), valoarea continuă fiind 25 mA, la T=25 °C. Să se afle rezistența diodei.",
 date:"i: 20→30 mA · I<sub>D</sub>=25 mA · V<sub>T</sub>=25 mV (la 25 °C)",
 seCere:"Rezistența de semnal mic r<sub>d</sub>.",
 pasi:[
  {e:"Întâi decidem regimul după amplitudinea tensiunii. Dacă e mică (sub ~12,5 mV) suntem în regim de <b>semnal mic</b>, unde caracteristica e practic liniară în jurul punctului de funcționare.",
   c:"Δv<sub>D</sub>=0,8−0,78=20 mV ⟹ V<sub>d</sub>=\\frac{20}{2}=10 mV < 12,5 mV ⟹ semnal mic"},
  {e:"La semnal mic rezistența dinamică are o formulă simplă, dedusă din ecuația diodei: tensiunea termică împărțită la curentul continuu de funcționare.",
   c:"r<sub>d</sub> = \\frac{V<sub>T</sub>}{I<sub>D</sub>} = \\frac{25\\,mV}{25\\,mA} = <b>1 Ω</b>"}
 ],
 raspuns:"r<sub>d</sub> = 1 Ω"
},
{
 id:"DI4", cat:"diode", titlu:"Circuit cu diodă: E în serie cu R și D",
 enunt:"O sursă E alimentează o diodă de siliciu printr-un rezistor R. Să se stabilească regiunea de funcționare, curentul prin diodă și rezistențele de c.c. și de semnal mic.",
 date:"E=5 V · R=220 Ω · V<sub>D</sub>=0,6 V (Si) · V<sub>T</sub>=25 mV",
 seCere:"a) regiunea; b) I<sub>D</sub>; c) R<sub>D</sub>; d) r<sub>d</sub>.",
 pasi:[
  {e:"a) Înainte de orice calcul stabilim cum e polarizată dioda. Borna + a sursei ajunge la anod (prin R), borna − la catod ⇒ anodul e mai pozitiv ⇒ dioda e în <b>conducție directă</b>.",
   c:"Anod (+) prin R, Catod (−) ⟹ <b>conducție directă</b>"},
  {e:"b) În conducție modelăm dioda cu o sursă constantă V<sub>D</sub>=0,6 V. Scriem KVL pe buclă (E = căderea pe R + căderea pe diodă) și scoatem curentul.",
   c:"I<sub>D</sub> = \\frac{E−V<sub>D</sub>}{R} = \\frac{5−0,6}{220} = <b>20 mA</b>"},
  {e:"c) Rezistența de c.c. = tensiunea pe diodă / curentul prin ea (raport direct).",
   c:"R<sub>D</sub> = \\frac{V<sub>D</sub>}{I<sub>D</sub>} = \\frac{0,6}{20\\,mA} = <b>30 Ω</b>"},
  {e:"d) Rezistența de semnal mic depinde de punctul de funcționare (de curent).",
   c:"r<sub>d</sub> = \\frac{V<sub>T</sub>}{I<sub>D</sub>} = \\frac{25\\,mV}{20\\,mA} = <b>1,25 Ω</b>"}
 ],
 raspuns:"directă · I<sub>D</sub>=20 mA · R<sub>D</sub>=30 Ω · r<sub>d</sub>=1,25 Ω"
},
{
 id:"DI5", cat:"diode", titlu:"Diodă între două surse (E₁, E₂)",
 enunt:"O diodă este conectată în serie cu R₁, R₂ și două surse E₁ și E₂. Să se afle curentul prin diodă și tensiunea V (pe R₂ și E₂).",
 date:"E₁=10 V · R₁=4,7 kΩ · E₂=5 V · R₂=2,2 kΩ · V<sub>D</sub>=0,6 V",
 seCere:"I<sub>D</sub> și tensiunea V.",
 pasi:[
  {e:"Nu știm sigur dacă dioda conduce, așa că <b>presupunem conducție directă</b> și verificăm la final: dacă I<sub>D</sub> iese pozitiv, presupunerea a fost corectă. Înlocuim dioda cu V<sub>D</sub> și scriem KVL pe buclă.",
   c:"R₁·I<sub>D</sub> + V<sub>D</sub> + R₂·I<sub>D</sub> − E₂ − E₁ = 0"},
  {e:"Ambele surse împing curentul în același sens prin diodă, deci se adună la numărător.",
   c:"I<sub>D</sub> = \\frac{E₁+E₂−V<sub>D</sub>}{R₁+R₂} = \\frac{14,4}{6,9k} ≈ <b>2,08 mA</b> (>0 ⟹ OK)"},
  {e:"Tensiunea V se citește pe ramura R₂–E₂, ținând cont de sensuri (de aceea iese negativă).",
   c:"V = R₂·I<sub>D</sub> − E₂ = 4,57 − 5 = <b>−0,43 V</b>"}
 ],
 raspuns:"I<sub>D</sub>≈2,08 mA · V≈−0,43 V"
},
{
 id:"DI6", cat:"diode", titlu:"Două diode (una directă, una inversă)",
 enunt:"Două diode (D1, D2) sunt conectate într-un circuit cu E₁, R și E₂. Să se afle curentul prin fiecare diodă.",
 date:"E₁=15 V · R=2,2 kΩ · E₂=4 V · V<sub>D</sub>=0,6 V",
 seCere:"Curenții I<sub>D1</sub> și I<sub>D2</sub>.",
 pasi:[
  {e:"Analizăm întâi polaritatea fiecărei diode. Borna − a lui E₂ e pe catodul lui D1 și pe anodul lui D2 ⇒ D1 e polarizată direct (conduce), D2 invers (blocată). O diodă blocată nu lasă curent.",
   c:"D1 directă, D2 inversă ⟹ I<sub>D2</sub> = <b>0 A</b>"},
  {e:"D2 blocată = circuit deschis, deci rămâne o singură buclă, prin D1. Scriem KVL pe ea.",
   c:"R·I<sub>D1</sub> + V<sub>D</sub> − E₂ − E₁ = 0"},
  {e:"Scoatem curentul.",
   c:"I<sub>D1</sub> = \\frac{E₁+E₂−V<sub>D</sub>}{R} = \\frac{18,4}{2,2k} ≈ <b>8,36 mA</b>"}
 ],
 raspuns:"I<sub>D1</sub>≈8,36 mA · I<sub>D2</sub>=0"
},
{
 id:"DI7", cat:"diode", titlu:"Două diode cu V<sub>D</sub> diferite (KCL + KVL)",
 enunt:"Circuit cu E, R₁, R₂ și două diode cu căderi diferite. Să se afle curenții prin cele două diode.",
 date:"E=20 V · R₁=4,7 kΩ · R₂=3,5 kΩ · V<sub>D1</sub>=0,65 V · V<sub>D2</sub>=0,7 V",
 seCere:"Curenții I<sub>D1</sub> și I<sub>D2</sub>.",
 pasi:[
  {e:"Observăm o buclă mică (R₂ în paralel cu D2): pe R₂ cade exact tensiunea diodei D2. De aici scoatem direct curentul prin R₂.",
   c:"R₂·I − V<sub>D2</sub> = 0 ⟹ I = \\frac{V<sub>D2</sub>}{R₂} = \\frac{0,7}{3,5k} = <b>0,2 mA</b>"},
  {e:"Pentru bucla mare (E–R₁–D1–D2) scriem KVL; ambele diode în conducție scad câte o V<sub>D</sub>.",
   c:"I<sub>D1</sub> = \\frac{E−(V<sub>D1</sub>+V<sub>D2</sub>)}{R₁} = \\frac{18,65}{4,7k} ≈ <b>3,96 mA</b>"},
  {e:"În nod aplicăm KCL: curentul care intră (I<sub>D1</sub>) se împarte. Atenție: prin R₁ trece I<sub>D1</sub>, nu I.",
   c:"I<sub>D2</sub> = I<sub>D1</sub> − I = 3,96 − 0,2 = <b>3,76 mA</b>"}
 ],
 raspuns:"I<sub>D1</sub>≈3,96 mA · I<sub>D2</sub>≈3,76 mA · I=0,2 mA"
},

/* ---------- BJT — polarizare / PSF ---------- */
{
 id:"T1", cat:"bjt", titlu:"NPN cu DOUĂ surse (se dau I<sub>B</sub> și β)",
 enunt:"Un tranzistor NPN este polarizat cu două surse: V₁ alimentează baza prin R₁, iar V₂ alimentează colectorul prin R₂; emitorul e la masă. Cunoscând I<sub>B</sub> și β, să se determine mărimile cerute.",
 date:"V₁=5 V · R₁=100 kΩ · V₂=12 V · R₂=1 kΩ · I<sub>B</sub>=40 µA · β=250",
 seCere:"a) I<sub>C</sub> ; b) U<sub>BE</sub> ; c) U<sub>CE</sub>.",
 pasi:[
  {e:"a) Tranzistorul e comandat în curent: în regim activ colectorul copiază amplificat baza, de β ori. Aceasta este relația fundamentală a tranzistorului.",
   c:"I<sub>C</sub> = β·I<sub>B</sub> = 250·40\\,µA = <b>10 mA</b>"},
  {e:"b) Scriem KVL (legea ochiurilor) pe bucla de intrare V₁–R₁–joncțiunea BE. Tensiunea sursei se împarte între R₁ și joncțiune, deci U<sub>BE</sub> e ce rămâne după căderea pe R₁.",
   c:"U<sub>BE</sub> = V₁ − R₁·I<sub>B</sub> = 5 − 100k·40µA = 5 − 4 = <b>1 V</b>"},
  {e:"c) KVL pe bucla de ieșire V₂–R₂–joncțiunea CE: din V₂ scădem căderea pe R₂.",
   c:"U<sub>CE</sub> = V₂ − R₂·I<sub>C</sub> = 12 − 1k·10mA = 12 − 10 = <b>2 V</b>"}
 ],
 raspuns:"I<sub>C</sub>=10 mA · U<sub>BE</sub>=1 V · U<sub>CE</sub>=2 V"
},
{
 id:"T2", cat:"bjt", titlu:"PNP cu două surse (se dau U<sub>BE</sub> și β)",
 enunt:"Tranzistor PNP polarizat cu V₁ pe colector (prin R<sub>C</sub>) și V₂ pe emitor (prin R<sub>E</sub>), baza prin R<sub>B</sub>. Cunoscând U<sub>BE</sub> și β, să se afle mărimile cerute.",
 date:"V₁=V₂=15 V · R<sub>C</sub>=4,7 kΩ · R<sub>E</sub>=10 kΩ · R<sub>B</sub>=100 kΩ · U<sub>BE</sub>=0,6 V · β=200",
 seCere:"a) I<sub>C</sub> ; b) U<sub>C</sub> ; c) U<sub>E</sub> ; d) U<sub>CE</sub>.",
 pasi:[
  {e:"a) Scriem KVL pe ochiul emitor–bază. Trucul: exprimăm tot prin I<sub>C</sub> folosind I<sub>E</sub>≈I<sub>C</sub> și I<sub>B</sub>=I<sub>C</sub>/β. Astfel R<sub>B</sub> apare împărțit la β.",
   c:"I<sub>C</sub> = \\frac{V₂ − U<sub>BE</sub>}{R<sub>E</sub> + \\frac{R<sub>B</sub>}{β}} = \\frac{14,4}{10,5k} ≈ <b>1,37 mA</b>"},
  {e:"b) Potențialul colectorului: curentul intră în colector dinspre masă prin R<sub>C</sub>, de aceea la PNP iese negativ.",
   c:"U<sub>C</sub> = R<sub>C</sub>·I<sub>C</sub> − V₁ = 6,43 − 15 = <b>−8,57 V</b>"},
  {e:"c) Potențialul emitorului față de masă.",
   c:"U<sub>E</sub> = V₂ − R<sub>E</sub>·I<sub>E</sub> = 15 − 13,7 = <b>1,3 V</b>"},
  {e:"d) Tensiunea colector–emitor = diferența potențialelor (negativă la PNP, ceea ce e normal).",
   c:"U<sub>CE</sub> = U<sub>C</sub> − U<sub>E</sub> = −8,57 − 1,3 = <b>−9,87 V</b>"}
 ],
 raspuns:"I<sub>C</sub>≈1,37 mA · U<sub>C</sub>=−8,57 V · U<sub>E</sub>=1,3 V · U<sub>CE</sub>=−9,87 V"
},
{
 id:"T3", cat:"bjt", titlu:"NPN cu O sursă, R₁ în bază + R<sub>E</sub>",
 enunt:"NPN polarizat de la o singură sursă V: R₁ de la +V la bază, colectorul legat direct la +V, R₂ în emitor. Cunoscând U<sub>BE</sub> și β, să se afle curenții și U<sub>CE</sub>.",
 date:"V=12 V · R₁=560 kΩ · R₂(R<sub>E</sub>)=1 kΩ · U<sub>BE</sub>=0,6 V · β=239",
 seCere:"a) I<sub>B</sub> ; b) I<sub>C</sub> și I<sub>E</sub> ; c) U<sub>CE</sub>.",
 pasi:[
  {e:"a) KVL pe bucla bază–emitor. Punctul-cheie: prin R₂(R<sub>E</sub>) trece curentul de <b>emitor</b> I<sub>E</sub>=(β+1)I<sub>B</sub>, nu I<sub>B</sub>. De aceea R₂ apare multiplicat cu (β+1) — efectul care face polarizarea stabilă.",
   c:"I<sub>B</sub> = \\frac{V−U<sub>BE</sub>}{R₁ + R₂·(β+1)} = \\frac{11,4}{800k} = <b>14 µA</b>"},
  {e:"b) Aplicăm relațiile tranzistorului.",
   c:"I<sub>C</sub> = β·I<sub>B</sub> = <b>3,34 mA</b> ; I<sub>E</sub> = (β+1)·I<sub>B</sub> = <b>3,36 mA</b>"},
  {e:"c) KVL pe colector–emitor: colectorul e legat direct la +V, deci în colector nu e rezistor; scădem doar căderea pe R₂.",
   c:"U<sub>CE</sub> = V − R₂·I<sub>E</sub> = 12 − 1k·3,36mA = <b>8,64 V</b>"}
 ],
 raspuns:"I<sub>B</sub>=14 µA · I<sub>C</sub>≈3,34 mA · I<sub>E</sub>≈3,36 mA · U<sub>CE</sub>=8,64 V"
},
{
 id:"T4", cat:"bjt", titlu:"NPN cu DIVIZOR de tensiune — PSF + dreapta de sarcină + verificare RAN",
 enunt:"NPN polarizat cu divizor în bază (R<sub>B1</sub>, R<sub>B2</sub>), R<sub>C</sub> în colector, R<sub>E</sub> în emitor, sursă V<sub>CC</sub>. Cunoscând U<sub>BE</sub> și β, să se determine punctul static de funcționare, intersecțiile dreptei de sarcină cu axele și regiunea de funcționare.",
 date:"V<sub>CC</sub>=10 V · R<sub>B1</sub>=56 kΩ · R<sub>B2</sub>=12 kΩ · R<sub>C</sub>=2,2 kΩ · R<sub>E</sub>=560 Ω · U<sub>BE</sub>=0,6 V · β=310",
 seCere:"a) coordonatele PSF (I<sub>C</sub>, U<sub>CE</sub>) ; b) intersecțiile dreptei de sarcină cu axele ; c) verificarea regiunii active normale.",
 pasi:[
  {e:"a) Aceasta e schema corectă (stabilă) de polarizare. Divizorul R<sub>B1</sub>-R<sub>B2</sub> fixează un potențial constant pe bază — îl aflăm cu regula divizorului de tensiune.",
   c:"U<sub>B</sub> = V<sub>CC</sub>·\\frac{R<sub>B2</sub>}{R<sub>B1</sub>+R<sub>B2</sub>} = 10·\\frac{12k}{68k} = <b>1,76 V</b>"},
  {e:"Coborând de la bază la masă: din U<sub>B</sub> scădem U<sub>BE</sub> (0,6 V) și ce rămâne cade pe R<sub>E</sub>. Împărțind la R<sub>E</sub> obținem curentul de emitor (≈ colector, fiindcă I<sub>B</sub> e mic).",
   c:"I<sub>E</sub> = \\frac{U<sub>B</sub>−U<sub>BE</sub>}{R<sub>E</sub>} = \\frac{1,16}{560} ≈ <b>2,07 mA</b>"},
  {e:"Trecem la I<sub>B</sub> și I<sub>C</sub> cu relațiile tranzistorului.",
   c:"I<sub>B</sub> = \\frac{I<sub>E</sub>}{β+1} ≈ 6,6\\,µA ; I<sub>C</sub> = β·I<sub>B</sub> ≈ <b>2,04 mA</b>"},
  {e:"Pentru a doua coordonată a PSF scriem KVL pe ochiul de ieșire: din V<sub>CC</sub> scădem căderile pe R<sub>C</sub> și pe R<sub>E</sub>.",
   c:"U<sub>CE</sub> = V<sub>CC</sub> − I<sub>C</sub>·R<sub>C</sub> − I<sub>E</sub>·R<sub>E</sub> = 10 − 4,48 − 1,16 = <b>4,36 V</b>"},
  {e:"b) Dreapta de sarcină arată toate punctele posibile. Capetele ei: punem pe rând I<sub>C</sub>=0 (taie axa tensiunii — blocare) și U<sub>CE</sub>=0 (taie axa curentului — saturație).",
   c:"I<sub>C</sub>=0 ⟹ U<sub>CE</sub>=10−1,16=<b>8,84 V</b> ; U<sub>CE</sub>=0 ⟹ I<sub>C</sub>=\\frac{8,84}{2,2k}=<b>4,01 mA</b>"},
  {e:"c) Verificăm că PSF e cu adevărat în zona activă: divizorul trebuie să fie rigid și U<sub>CE</sub> să fie între limite (nici saturat, nici blocat).",
   c:"10·R<sub>B2</sub> < β·R<sub>E</sub> (120000<173600 ✓) și 0,5 < 4,36 < 9 ✓ ⟹ <b>RAN</b>"}
 ],
 raspuns:"PSF(2,04 mA ; 4,36 V) · axe: 8,84 V / 4,01 mA · RAN: DA"
},
{
 id:"T5", cat:"bjt", titlu:"PNP cu DIVIZOR — PSF + regimul de funcționare",
 enunt:"Tranzistor PNP cu divizor în bază, R<sub>E</sub> în emitor și R<sub>C</sub> în colector, sursă V<sub>EE</sub>. Cunoscând U<sub>EB</sub> și β, să se afle PSF și să se determine regimul de funcționare.",
 date:"V<sub>EE</sub>=10 V · R<sub>B1</sub>=22 kΩ · R<sub>B2</sub>=10 kΩ · R<sub>E</sub>=1 kΩ · R<sub>C</sub>=1,8 kΩ · U<sub>EB</sub>=0,7 V · β=215",
 seCere:"a) coordonatele PSF (I<sub>C</sub>, U<sub>EC</sub>) ; b) regimul de funcționare.",
 pasi:[
  {e:"a) La PNP gândim de sus în jos, pornind de la V<sub>EE</sub>. Potențialul bazei din divizor (aici cu R<sub>B1</sub> la numărător, conform schemei).",
   c:"U<sub>B</sub> = V<sub>EE</sub>·\\frac{R<sub>B1</sub>}{R<sub>B1</sub>+R<sub>B2</sub>} = 10·\\frac{22k}{32k} = <b>6,88 V</b>"},
  {e:"Tensiunea pe R<sub>E</sub> e ce rămâne din V<sub>EE</sub> după U<sub>EB</sub> și U<sub>B</sub>; împărțind la R<sub>E</sub> obținem curentul de emitor.",
   c:"I<sub>E</sub> = \\frac{V<sub>EE</sub>−U<sub>EB</sub>−U<sub>B</sub>}{R<sub>E</sub>} = \\frac{2,42}{1k} = <b>2,42 mA</b>"},
  {e:"Curenții I<sub>B</sub> și I<sub>C</sub>.",
   c:"I<sub>B</sub>=\\frac{I<sub>E</sub>}{β+1}≈11\\,µA ; I<sub>C</sub>=β·I<sub>B</sub>≈<b>2,36 mA</b>"},
  {e:"Tensiunea emitor–colector (KVL pe ieșire).",
   c:"U<sub>EC</sub> = V<sub>EE</sub> − I<sub>E</sub>·R<sub>E</sub> − I<sub>C</sub>·R<sub>C</sub> = 10−2,42−4,24 = <b>3,34 V</b>"},
  {e:"b) Pentru regim aflăm potențialele terminalelor și comparăm: dacă E e mai pozitiv ca B ⇒ joncțiunea E-B e directă; dacă C e mai negativ ca B ⇒ joncțiunea C-B e inversă ⇒ activ normal.",
   c:"U<sub>E</sub>=7,58 ; U<sub>B</sub>=6,88 ; U<sub>C</sub>=4,24 V ⟹ EB direct, CB invers ⟹ <b>activ normal</b>"}
 ],
 raspuns:"PSF(2,36 mA ; 3,34 V) · U<sub>E</sub>=7,58 / U<sub>B</sub>=6,88 / U<sub>C</sub>=4,24 V · RAN"
},
{
 id:"T6", cat:"bjt", titlu:"NPN cu REACȚIE în colector",
 enunt:"NPN cu R<sub>C</sub> de la V<sub>CC</sub> la colector și R<sub>B</sub> conectat de la colector înapoi la bază (reacție), emitorul la masă. Cunoscând U<sub>BE</sub> și β, să se afle parametrii PSF și regimul.",
 date:"V<sub>CC</sub>=10 V · R<sub>C</sub>=3,3 kΩ · R<sub>B</sub>=100 kΩ · U<sub>BE</sub>=0,6 V · β=280",
 seCere:"a) parametrii PSF (I<sub>B</sub>, I<sub>C</sub>, U<sub>CE</sub>) ; b) regimul de funcționare.",
 pasi:[
  {e:"a) R<sub>B</sub> vine de la colector (nu de la V<sub>CC</sub>) — de aceea se numește reacție. Prin R<sub>C</sub> trece I<sub>C</sub>+I<sub>B</sub>≈I<sub>C</sub>. Scriem KVL pe ochiul V<sub>CC</sub>–R<sub>C</sub>–R<sub>B</sub>–BE, cu I<sub>C</sub>=β·I<sub>B</sub>, și scoatem I<sub>B</sub>.",
   c:"I<sub>B</sub> = \\frac{V<sub>CC</sub>−U<sub>BE</sub>}{R<sub>C</sub>·β + R<sub>B</sub>} = \\frac{9,4}{1024k} ≈ <b>9 µA</b>"},
  {e:"Curentul de colector.",
   c:"I<sub>C</sub> = β·I<sub>B</sub> = <b>2,52 mA</b>"},
  {e:"KVL pe V<sub>CC</sub>–R<sub>C</sub>–CE (emitorul e la masă).",
   c:"U<sub>CE</sub> = V<sub>CC</sub> − R<sub>C</sub>·I<sub>C</sub> = 10 − 8,31 = <b>1,69 V</b>"},
  {e:"b) Emitor la masă ⇒ U<sub>E</sub>=0; U<sub>B</sub>=U<sub>BE</sub>=0,6 V; U<sub>C</sub>=U<sub>CE</sub>=1,69 V. Baza mai pozitivă ca emitorul (EB direct) și mai negativă ca colectorul (BC invers) ⇒ activ normal.",
   c:"U<sub>B</sub>>U<sub>E</sub> și U<sub>B</sub><U<sub>C</sub> ⟹ <b>activ normal</b>"}
 ],
 raspuns:"I<sub>B</sub>=9 µA · I<sub>C</sub>=2,52 mA · U<sub>CE</sub>=1,69 V · RAN"
},
{
 id:"T7", cat:"bjt", titlu:"PNP cu reacție (R<sub>E</sub>, R<sub>C</sub>, R₁, R<sub>B</sub>)",
 enunt:"PNP cu R<sub>E</sub> în emitor, R<sub>B</sub> de reacție pe bază, R<sub>C</sub> în colector și R₁ spre masă, sursă V<sub>EE</sub>. Cunoscând U<sub>EB</sub> și β, să se afle PSF și regimul.",
 date:"V<sub>EE</sub>=10 V · R<sub>E</sub>=330 Ω · R<sub>B</sub>=100 kΩ · R<sub>C</sub>=150 Ω · R₁=1,5 kΩ · U<sub>EB</sub>=0,7 V · β=230",
 seCere:"a) parametrii PSF (I<sub>B</sub>, I<sub>C</sub>, U<sub>EC</sub>) ; b) regimul de funcționare.",
 pasi:[
  {e:"a) Scriem KVL pe ochiul mare și exprimăm toți curenții prin I<sub>B</sub>: prin R<sub>E</sub> trece I<sub>E</sub>=(β+1)I<sub>B</sub>, prin R₁ trece I<sub>C</sub>+I<sub>B</sub>=(β+1)I<sub>B</sub>. Așa fiecare rezistor apare înmulțit cu (β+1) sau β.",
   c:"I<sub>B</sub> = \\frac{V<sub>EE</sub>−U<sub>EB</sub>}{R<sub>E</sub>(β+1)+R<sub>B</sub>+R₁(β+1)} = \\frac{9,3}{522730} ≈ <b>17,7 µA</b>"},
  {e:"Restul curenților din relațiile tranzistorului.",
   c:"I<sub>C</sub>=β·I<sub>B</sub>≈<b>4,07 mA</b> ; I<sub>E</sub>≈4,09 mA ; I<sub>R1</sub>≈4,08 mA"},
  {e:"KVL pe ochiul de ieșire pentru U<sub>EC</sub> (scădem căderile pe R<sub>E</sub>, R<sub>C</sub>, R₁).",
   c:"U<sub>EC</sub> = V<sub>EE</sub> − (R<sub>E</sub>I<sub>E</sub>+R<sub>C</sub>I<sub>C</sub>+R₁I<sub>R1</sub>) = 10 − 8,08 ≈ <b>1,92 V</b>"},
  {e:"b) Potențialele terminalelor ⇒ comparăm joncțiunile.",
   c:"U<sub>E</sub>=8,65 ; U<sub>B</sub>=7,95 ; U<sub>C</sub>=6,73 V ⟹ EB direct, CB invers ⟹ <b>activ normal</b>"}
 ],
 raspuns:"I<sub>B</sub>≈17,7 µA · I<sub>C</sub>≈4,07 mA · U<sub>EC</sub>≈1,92 V · RAN"
},

/* ---------- BJT — regiuni de funcționare ---------- */
{
 id:"R1", cat:"bjtreg", titlu:"NPN: în ce regiune lucrează pentru diverse V<sub>I</sub>?",
 enunt:"NPN cu R<sub>C</sub> în colector, R<sub>E</sub> în emitor, alimentat de V<sub>Al</sub>; baza e comandată de o sursă V<sub>I</sub>. Să se stabilească regiunea de funcționare pentru trei valori ale lui V<sub>I</sub> și domeniul lui V<sub>I</sub> pentru regiunea activă.",
 date:"R<sub>C</sub>=7,5 kΩ · R<sub>E</sub>=5 kΩ · V<sub>Al</sub>=15 V · β=100 · v<sub>BE,on</sub>=0,7 V · V<sub>CE,sat</sub>=0,2 V",
 seCere:"Regiunea pentru: a) V<sub>I</sub>=0,3 V ; b) 3,2 V ; c) 8,7 V ; d) domeniul V<sub>I</sub> pentru regiunea activă.",
 pasi:[
  {e:"Calculăm o singură dată curentul de prag spre saturație: cât curent ar curge dacă tranzistorul ar fi exact la limita saturației (U<sub>CE</sub>=0,2 V). Acesta e reperul cu care comparăm orice caz.",
   c:"I<sub>Cex</sub> = \\frac{V<sub>Al</sub>−V<sub>CE,sat</sub>}{R<sub>C</sub>+R<sub>E</sub>} = \\frac{14,8}{12,5k} = <b>1,184 mA</b>"},
  {e:"a) Dacă V<sub>I</sub> nu depășește tensiunea de deschidere (0,7 V), joncțiunea BE nu conduce ⇒ tranzistorul e blocat (întrerupător deschis).",
   c:"0,3 V < 0,7 V ⟹ <b>BLOCARE</b>"},
  {e:"b) Peste 0,7 V dioda conduce; calculăm curentul real I<sub>C</sub> și-l comparăm cu reperul. Mai mic ⇒ rămâne în zona activă.",
   c:"I<sub>C</sub> = \\frac{V<sub>I</sub>−v<sub>BE,on</sub>}{R<sub>E</sub>} = \\frac{3,2−0,7}{5k} = 0,5\\,mA < 1,184 ⟹ <b>ACTIV</b>"},
  {e:"c) Același calcul; dacă curentul cerut depășește reperul, tranzistorul nu poate da atâta ⇒ intră în saturație.",
   c:"I<sub>C</sub> = \\frac{8,7−0,7}{5k} = 1,6\\,mA > 1,184 ⟹ <b>SATURAȚIE</b>"},
  {e:"d) Punem condiția I<sub>C</sub> < I<sub>Cex</sub> și o rezolvăm pentru V<sub>I</sub>; adăugăm și limita inferioară (trebuie să conducă).",
   c:"V<sub>I</sub> < I<sub>Cex</sub>·R<sub>E</sub>+0,7 = 6,62 V și V<sub>I</sub>>0,7 ⟹ <b>V<sub>I</sub> ∈ [0,7 ; 6,62] V</b>"}
 ],
 raspuns:"a) blocare · b) activ · c) saturație · d) [0,7 ; 6,62] V"
},
{
 id:"R2", cat:"bjtreg", titlu:"PNP: I<sub>C</sub>, domeniul R<sub>C</sub>, U<sub>E</sub> și U<sub>EC</sub>",
 enunt:"PNP cu R<sub>E</sub> în emitor (sus), alimentat de V<sub>Al</sub>, bază comandată de V<sub>I</sub>. Să se afle curentul de colector, domeniul lui R<sub>C</sub> pentru regiunea activă și tensiunile cerute.",
 date:"R<sub>E</sub>=3,3 kΩ · V<sub>Al</sub>=15 V · V<sub>I</sub>=5,3 V · β=100 · v<sub>EB,on</sub>=0,7 V · V<sub>EC,sat</sub>=0,2 V",
 seCere:"a) I<sub>C</sub> ; b) domeniul R<sub>C</sub> pentru regiunea activă ; c) U<sub>E</sub> și U<sub>EC</sub> pentru R<sub>C</sub>=0,7 kΩ.",
 pasi:[
  {e:"a) Cu I<sub>B</sub> neglijabil ⇒ I<sub>C</sub>=I<sub>E</sub>. Scriem KVL pe intrarea PNP (V<sub>Al</sub>–R<sub>E</sub>–EB–V<sub>I</sub>).",
   c:"I<sub>E</sub> = \\frac{V<sub>Al</sub>−v<sub>EB,on</sub>−V<sub>I</sub>}{R<sub>E</sub>} = \\frac{9}{3,3k} = <b>2,72 mA</b> = I<sub>C</sub>"},
  {e:"b) Pentru zona activă curentul real trebuie să fie mai mic decât cel de saturație; punem inegalitatea și o rezolvăm pentru R<sub>C</sub>.",
   c:"I<sub>C</sub> < \\frac{V<sub>Al</sub>−V<sub>EC,sat</sub>}{R<sub>C</sub>+R<sub>E</sub>} ⟹ <b>R<sub>C</sub> ∈ [0 ; 2,14 kΩ]</b>"},
  {e:"c) Potențialul emitorului din KVL pe R<sub>E</sub>.",
   c:"U<sub>E</sub> = V<sub>Al</sub> − I<sub>E</sub>·R<sub>E</sub> = 15 − 8,98 ≈ <b>6 V</b>"},
  {e:"Tensiunea emitor–colector pentru R<sub>C</sub> dat.",
   c:"U<sub>EC</sub> = U<sub>E</sub> − I<sub>C</sub>·R<sub>C</sub> = 6 − 1,9 ≈ <b>4,1 V</b>"}
 ],
 raspuns:"I<sub>C</sub>=2,72 mA · R<sub>C</sub>∈[0;2,14 kΩ] · U<sub>E</sub>≈6 V · U<sub>EC</sub>≈4,1 V"
},
{
 id:"R3", cat:"bjtreg", titlu:"NPN cu divizor: PSF, potențiale și efectul schimbării R<sub>C</sub>",
 enunt:"NPN cu divizor în bază, R<sub>C</sub> în colector, R<sub>E</sub> în emitor, sursă V<sub>CC</sub>. Să se afle PSF, potențialele terminalelor și noul PSF dacă R<sub>C</sub> se schimbă.",
 date:"R<sub>B1</sub>=20 kΩ · R<sub>B2</sub>=10 kΩ · R<sub>C</sub>=3 kΩ · R<sub>E</sub>=2 kΩ · V<sub>CC</sub>=15 V · β=100 · v<sub>BE,on</sub>=0,7 V",
 seCere:"a) PSF Q(I<sub>C</sub>, U<sub>CE</sub>) ; b) V<sub>B</sub>, V<sub>E</sub>, V<sub>C</sub> ; c) noul Q dacă R<sub>C</sub>→8 kΩ.",
 pasi:[
  {e:"a) Potențialul bazei din divizor.",
   c:"V<sub>RB2</sub> = V<sub>CC</sub>·\\frac{R<sub>B2</sub>}{R<sub>B1</sub>+R<sub>B2</sub>} = 15·\\frac{10k}{30k} = <b>5 V</b>"},
  {e:"Tensiunea pe R<sub>E</sub> și apoi curentul (I<sub>C</sub>≈I<sub>E</sub>).",
   c:"V<sub>RE</sub>=5−0,7=4,3 V ⟹ I<sub>C</sub>=\\frac{4,3}{2k}=<b>2,15 mA</b>"},
  {e:"U<sub>CE</sub> din KVL pe ieșire.",
   c:"U<sub>CE</sub> = V<sub>CC</sub> − I<sub>C</sub>·(R<sub>C</sub>+R<sub>E</sub>) = 15 − 10,75 = <b>4,25 V</b> ⟹ Q(2,15 mA ; 4,25 V)"},
  {e:"b) Potențialele față de masă: baza = V<sub>RB2</sub>; emitorul = I<sub>C</sub>·R<sub>E</sub>; colectorul = V<sub>CC</sub>−I<sub>C</sub>R<sub>C</sub>.",
   c:"V<sub>B</sub>=5 V ; V<sub>E</sub>=4,3 V ; V<sub>C</sub>=15−6,45=<b>8,55 V</b>"},
  {e:"c) Ochiul de bază nu se schimbă ⇒ I<sub>C</sub> rămâne 2,15 mA; doar U<sub>CE</sub> se modifică. Iese negativ ⇒ tranzistorul nu mai e activ (a intrat în saturație) — semn că R<sub>C</sub> e prea mare.",
   c:"U<sub>CE1</sub> = 15 − 2,15mA·(8k+2k) = <b>−6 V</b> ⟹ saturație"}
 ],
 raspuns:"Q(2,15 mA ; 4,25 V) · V<sub>B</sub>=5/V<sub>E</sub>=4,3/V<sub>C</sub>=8,55 V · Q₁: U<sub>CE</sub>=−6 V (saturație)"
},
{
 id:"R4", cat:"bjtreg", titlu:"NPN cu divizor: PSF, regiunea și redimensionarea R<sub>C</sub>",
 enunt:"NPN cu divizor, R<sub>C</sub>, R<sub>E</sub>, V<sub>CC</sub>. Să se afle PSF, regiunea de funcționare și valoarea lui R<sub>C</sub> pentru un PSF impus.",
 date:"R<sub>B1</sub>=10 kΩ · R<sub>B2</sub>=5 kΩ · R<sub>C</sub>=2 kΩ · R<sub>E</sub>=1,7 kΩ · V<sub>CC</sub>=12 V · β=100 · v<sub>BE,on</sub>=0,7 V",
 seCere:"a) PSF ; b) regiunea ; c) noul R<sub>C</sub> pentru Q(2 mA, 6 V).",
 pasi:[
  {e:"a) Divizor → tensiunea pe bază → curentul.",
   c:"V<sub>RB2</sub>=12·\\frac{5k}{15k}=4 V ⟹ I<sub>C</sub>=\\frac{4−0,7}{1,7k}=<b>2 mA</b>"},
  {e:"U<sub>CE</sub> din KVL pe ieșire.",
   c:"U<sub>CE</sub>=V<sub>CC</sub>−I<sub>C</sub>·(R<sub>C</sub>+R<sub>E</sub>)=12−7,4=<b>4,6 V</b> ⟹ Q(2 mA ; 4,6 V)"},
  {e:"b) Comparăm cu curentul de saturație: dacă I<sub>C</sub> e mai mic ⇒ activ.",
   c:"I<sub>Cex</sub>=\\frac{12−0,2}{3,7k}=3,2\\,mA > 2 mA ⟹ <b>activ</b>"},
  {e:"c) Impunem U<sub>CE</sub>=6 V și scoatem R<sub>C</sub> din ecuația lui U<sub>CE</sub> (I<sub>C</sub> rămâne 2 mA, fiindcă nu am atins baza).",
   c:"R<sub>C</sub> = \\frac{V<sub>CC</sub>−U<sub>CE</sub>−I<sub>C</sub>R<sub>E</sub>}{I<sub>C</sub>} = \\frac{12−6−3,4}{2mA} = <b>1,3 kΩ</b>"}
 ],
 raspuns:"Q(2 mA ; 4,6 V) · activ · R<sub>C(nou)</sub>=1,3 kΩ"
}
];
