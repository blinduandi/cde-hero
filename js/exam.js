/* ============================================================
   EXAM — cele 70 de ÎNTREBĂRI OFICIALE pentru examenul final
   (sursa: "Lista întrebărilor pentru examenul final", ELSE/UTM).
   Răspunsuri în STIL DE STUDENT: simplu, pe înțeles, cu formula
   explicată în cuvinte. Biletul real = 3 întrebări + 1 problemă.
   Fiecare: {n: nr oficial, t: tema (1-6), q: întrebarea, a: răspuns}.
   ============================================================ */
const THEORY_QA = [

/* ===== TEMA 1 — Bazele circuitelor (Î1–Î8) ===== */
{n:1,t:1,q:"Conceptele de bază ale mărimilor electrice și componentele circuitelor electrice.",
 a:"La bază sunt câteva mărimi pe care trebuie să le știi: <b>curentul</b> I (cât de mulți electroni curg, în amperi A), <b>tensiunea</b> U (împinge electronii, în volți V), <b>rezistența</b> R (cât de greu trec, în ohmi Ω), <b>puterea</b> P=U·I (cât consumă, în wați W) și <b>energia</b> W=P·t. Un <b>circuit</b> e un drum închis prin care curge curentul, format dintr-o <b>sursă</b> (bateria — dă energie) și <b>receptoare</b> (rezistoare R, bobine L, condensatoare C — folosesc energia)."},
{n:2,t:1,q:"Semnale electrice, curentul, tensiunea, energia și puterea circuitelor electrice.",
 a:"<b>Semnalul</b> e mărimea electrică ce duce informația — poate fi constant (curent continuu, c.c.) sau variabil în timp (alternativ, c.a.). <b>Curentul</b> = câtă sarcină curge pe secundă. <b>Tensiunea</b> = „presiunea” care împinge curentul (diferența de potențial dintre două puncte). <b>Puterea</b> P=U·I spune cât de repede se consumă energia; <b>energia</b> W=P·t e cât s-a consumat în total."},
{n:3,t:1,q:"Elemente de circuit: elemente rezistive, inductive, capacitive și caracteristicile lor.",
 a:"Trei feluri de componente pasive: <b>Rezistorul (R)</b> — se opune curentului și-l transformă în căldură (U=R·I). <b>Bobina (L)</b> — se opune <i>schimbării</i> curentului; în c.c. e ca un fir simplu, dar la frecvențe mari frânează (X<sub>L</sub>=2πfL, crește cu frecvența). <b>Condensatorul (C)</b> — stochează sarcină; în c.c. nu lasă curentul să treacă (ca o întrerupere), dar la frecvențe mari îl lasă (X<sub>C</sub>=1/(2πfC), scade cu frecvența). R consumă energie, L și C doar o stochează."},
{n:4,t:1,q:"Elemente de circuit active – Sursele. Surse de tensiune și surse de curent.",
 a:"Sunt două feluri de surse. <b>Sursa de tensiune</b> ține tensiunea constantă (o baterie de 9 V dă mereu 9 V). <b>Sursa de curent</b> ține curentul constant. În realitate orice sursă are o mică rezistență internă <b>r</b>, deci tensiunea la borne scade puțin când o încarci: U=E−r·I (E = tensiunea „în gol”). La scurtcircuit dă curentul maxim, I=E/r."},
{n:5,t:1,q:"Clasificarea circuitelor electrice. Liniare și neliniare, neramificate și ramificate, cu una sau mai multe surse. Regimurile de funcționare.",
 a:"Circuitele se împart în: <b>liniare</b> (doar R-uri obișnuite, se comportă „cuminte”) sau <b>neliniare</b> (au diode/tranzistoare); <b>neramificate</b> (un singur drum, același curent peste tot) sau <b>ramificate</b> (au noduri, curentul se împarte pe ramuri); cu <b>o sursă</b> sau cu mai multe. <b>Regimurile:</b> de c.c. (constant), tranzitoriu (la pornire/oprire) și de c.a. (sinusoidal)."},
{n:6,t:1,q:"Teoremele generale ale teoriei circuitelor electrice. Teoremele lui Kirchhoff.",
 a:"Două legi cu care rezolvi orice circuit. <b>Legea I (a nodurilor):</b> cât curent intră într-un nod, exact atât iese (curentul nu se pierde) → suma curenților care intră = suma celor care ies. <b>Legea a II-a (a ochiurilor):</b> dacă mergi pe un traseu închis, suma tensiunilor surselor = suma căderilor de tensiune pe rezistoare (ΣE=ΣR·I). Pe scurt: <b>nodurile → curenți, ochiurile → tensiuni.</b>"},
{n:7,t:1,q:"Circuite electrice de curent continuu. Legea lui Ohm generalizată.",
 a:"<b>Legea lui Ohm</b> simplă: pe un rezistor, I=U/R (mai multă tensiune sau mai puțină rezistență → mai mult curent). <b>Generalizată</b> = pentru un circuit întreg: împarți suma tensiunilor surselor la suma tuturor rezistențelor (I=ΣE/ΣR). Dacă sursa are rezistență internă r: I=E/(R+r), iar la borne rămâne U=E−r·I."},
{n:8,t:1,q:"Divizor de tensiune și curent. Conectarea rezistențelor, capacitoarelor în serie și în paralel. Formulele.",
 a:"<b>În serie</b> (cap la cap): rezistențele se adună (R=R₁+R₂+…), curentul e același peste tot, iar tensiunea se împarte — <b>divizor de tensiune:</b> tensiunea pe un rezistor = U·R<sub>lui</sub>/R<sub>total</sub> (rezistorul mai mare ia mai mult). <b>În paralel</b> (între aceleași două puncte): tensiunea e aceeași, curentul se împarte, iar rezistența totală e mai mică decât cea mai mică (pentru două: R=R₁·R₂/(R₁+R₂)). La condensatoare e pe dos: în paralel se adună, în serie scad."},

/* ===== TEMA 2 — Semiconductori și diode (Î9–Î12) ===== */
{n:9,t:2,q:"Semiconductorii intrinseci, extrinseci, de tip p și de tip n.",
 a:"Un semiconductor pur (Siliciu) conduce slab — ăsta e <b>intrinsec</b>. Ca să conducă mai bine îl <b>dopăm</b> (adăugăm impurități) și devine <b>extrinsec</b>: <b>tip N</b> = punem atomi care dau electroni în plus → conduce prin <b>electroni</b> (sarcini −). <b>Tip P</b> = punem atomi care „fură” electroni, lăsând <b>goluri</b> (locuri libere, ca niște sarcini +) → conduce prin goluri. N: electroni majoritari; P: goluri majoritare."},
{n:10,t:2,q:"Joncțiunea p-n. Definiția, structura, formarea și caracteristicile. Polarizarea directă și inversă. Bariera de potențial.",
 a:"Când lipim un semiconductor P de unul N, la graniță electronii din N umplu golurile din P și se formează o zonă „golită” care creează o mică <b>barieră de potențial</b> (~0,7 V la siliciu) ce se opune trecerii. <b>Polarizare directă</b> (+ pe P): bariera scade și după ~0,7 V dioda conduce. <b>Polarizare inversă</b> (+ pe N): bariera crește, dioda e blocată, trece doar un curent foarte mic."},
{n:11,t:2,q:"Diode semiconductoare. Simbolul, structura, parametrii și caracteristicile diodelor. Punctul static de funcționare. Tipurile de polarizare.",
 a:"Dioda = o joncțiune p-n cu doi termeni: <b>anod</b> și <b>catod</b>. Conduce doar într-un sens (de la anod la catod), după ce depășește tensiunea de prag (~0,7 V la Si). Parametri: tensiunea de prag, curentul maxim, tensiunea inversă maximă. <b>Punctul static de funcționare (PSF)</b> = unde „se așază” dioda; îl găsești la intersecția caracteristicii diodei cu dreapta de sarcină i=(E−U<sub>D</sub>)/R."},
{n:12,t:2,q:"Diode semiconductoare. Tipurile de diode. Punctul static de funcționare în regimurile static și dinamic.",
 a:"Tipuri: normală (redresare), <b>Zener</b> (ține tensiunea constantă), <b>Schottky</b> (rapidă, cădere mică ~0,3 V), <b>LED</b> (face lumină), fotodiodă (reacționează la lumină). Despre rezistența diodei: <b>în c.c. (static):</b> R=U<sub>D</sub>/I<sub>D</sub> (împarți tensiunea la curent în punctul de lucru). <b>În c.a. (dinamic, semnal mic):</b> r<sub>d</sub>=V<sub>T</sub>/I<sub>D</sub>, cu V<sub>T</sub>≈25–26 mV — cât variază tensiunea la o mică variație de curent."},

/* ===== TEMA 4 — Tranzistoare bipolare (Î13–Î16) ===== */
{n:13,t:4,q:"Tranzistoare bipolare. Tipurile, simbolul, structura, parametrii și caracteristicile lor. Punctul static de funcționare în regimurile static și dinamic.",
 a:"Tranzistorul bipolar (TB) are 3 zone: <b>Emitor (E), Bază (B), Colector (C)</b>, și e de două feluri: <b>NPN</b> și <b>PNP</b>. Ideea: un curent mic în bază (I<sub>B</sub>) controlează un curent mare în colector (I<sub>C</sub>). Relația cheie: <b>I<sub>C</sub>=β·I<sub>B</sub></b> (β = de câte ori amplifică, de obicei 100–300) și I<sub>E</sub>=I<sub>C</sub>+I<sub>B</sub>. <b>PSF</b> = punctul în care stă în repaus (I<sub>C</sub>, U<sub>CE</sub>), ales ca să poată amplifica."},
{n:14,t:4,q:"Circuite de polarizare și stabilizare a punctului static inițial de funcționare PSF a tranzistoarelor bipolare.",
 a:"Ca tranzistorul să amplifice corect trebuie „pus la punct” (polarizat) într-un punct fix. Cea mai bună metodă: <b>divizor în bază (R<sub>B1</sub>, R<sub>B2</sub>) + un rezistor R<sub>E</sub> în emitor.</b> R<sub>E</sub> îl ține stabil când se încălzește: dacă T crește și I<sub>C</sub> vrea să urce, R<sub>E</sub> scade automat U<sub>BE</sub> și readuce I<sub>C</sub> înapoi. Fără asta, tranzistorul s-ar „ambala” la căldură și s-ar strica."},
{n:15,t:4,q:"Regimurile static și dinamic de funcționare ale tranzistoarelor bipolare. Circuitele și formele de semnal, calculele circuitelor echivalente.",
 a:"<b>Regimul static (c.c.):</b> doar polarizarea, fără semnal — stabilește punctul de funcționare (la calcul, condensatoarele se consideră întreruperi). <b>Regimul dinamic (c.a.):</b> când aplici semnalul de amplificat — îl analizezi cu un „circuit echivalent” de semnal mic (condensatoarele devin scurtcircuite). În emitor comun, semnalul de la ieșire e mai mare și răsturnat (defazat 180°)."},
{n:16,t:4,q:"Configurații de conexiune ale TB: bază comună, emitor comun și colector comun. Modurile de funcționare: tăiere, activ normal, activ invers, saturație.",
 a:"3 moduri de a-l conecta: <b>Emitor comun (EC)</b> — amplifică și tensiunea, și curentul, dar răstoarnă semnalul (cel mai folosit). <b>Bază comună (BC)</b> — amplifică doar tensiunea, bun la frecvențe înalte. <b>Colector comun (CC, repetor)</b> — nu amplifică tensiunea (~1) dar are intrare „ușoară” și ieșire „puternică”, folosit ca adaptor. Cele 4 <b>moduri de lucru:</b> blocare (oprit), activ normal (amplifică), saturație (complet deschis, ca un comutator închis, U<sub>CE</sub>≈0,2 V), activ invers (nefolosit)."},

/* ===== TEMA 6 — TEC / FET (Î17–Î19) ===== */
{n:17,t:6,q:"Tranzistoare cu efect de câmp. Tipurile de tranzistoare unipolare. TEC-J. Simbolul, structura, parametrii și caracteristicile. Punctul static de funcționare.",
 a:"Tranzistorul cu efect de câmp (TEC sau FET) e „vărul” tranzistorului bipolar, dar e comandat de <b>tensiune</b>, nu de curent. Are 3 terminale: <b>Grilă (G), Drenă (D), Sursă (S)</b>. La <b>TEC-J</b>, tensiunea pe grilă (V<sub>GS</sub>) strânge sau lărgește un „canal” prin care trece curentul I<sub>D</sub>: I<sub>D</sub>=I<sub>DSS</sub>(1−V<sub>GS</sub>/V<sub>P</sub>)². Avantaj mare: intrare cu rezistență uriașă (aproape nu trage curent din circuit)."},
{n:18,t:6,q:"Tranzistoare cu efect de câmp, TEC-MOS. Tipurile. Simbolul, structura, parametrii și caracteristicile. Punctul static de funcționare.",
 a:"TEC-MOS (MOSFET) e ca TEC-J, dar grila e <b>izolată</b> printr-un strat subțire de „sticlă” (SiO₂), deci rezistența de intrare e și mai uriașă. Două tipuri: cu <b>canal inițial</b> (canalul există deja) și cu <b>canal indus</b> (canalul apare doar când V<sub>GS</sub> depășește o tensiune de prag V<sub>T</sub>). Atenție: foarte sensibil la electricitatea statică (ESD). E baza tuturor cipurilor moderne."},
{n:19,t:6,q:"Tranzistoare cu efect de câmp, TEC-MOS. Schema de polarizare cu divizor rezistiv în grilă.",
 a:"Ca să-l facem să lucreze, îi fixăm tensiunea pe grilă cu un <b>divizor (R<sub>G1</sub>, R<sub>G2</sub>)</b>: V<sub>G</sub>=V<sub>DD</sub>·R<sub>G2</sub>/(R<sub>G1</sub>+R<sub>G2</sub>). Apoi punem un rezistor R<sub>S</sub> în sursă: V<sub>GS</sub>=V<sub>G</sub>−I<sub>D</sub>·R<sub>S</sub>. Fiindcă grila nu trage curent, putem folosi rezistențe foarte mari (mega-ohmi) și păstrăm intrarea uriașă. R<sub>S</sub> stabilizează curentul, exact ca R<sub>E</sub> la bipolar."},

/* ===== TEMA 5 — Amplificatoare, reacții, oscilatoare (Î20–Î57) ===== */
{n:20,t:5,q:"Amplificatoare de semnal mic cu tranzistoare MOS. Etaj de amplificare cu tranzistor MOS în conexiunea sursă comună.",
 a:"E etajul de amplificare cu MOS, asemănător cu „emitor comun” de la bipolar. Semnalul intră pe grilă și iese amplificat și răsturnat (defazaj 180°) pe drenă. Amplificarea: A≈−g<sub>m</sub>·R<sub>D</sub> (g<sub>m</sub> = cât de „tare” reacționează curentul la tensiunea de pe grilă). Avantaj: rezistență de intrare uriașă."},
{n:21,t:5,q:"Amplificatoare de semnal mic cu tranzistoare MOS. Etaj de amplificare cu tranzistor MOS în conexiunea drenă comună.",
 a:"E „repetorul” cu MOS (ieșirea pe sursă). Amplificarea de tensiune e aproape 1 — nu amplifică tensiunea, doar o „repetă”, fără răsturnare. În schimb are intrare uriașă și ieșire „puternică” (rezistență mică) → se folosește ca adaptor/tampon între un etaj slab și o sarcină."},
{n:22,t:5,q:"Amplificatoare electrice. Caracteristici și parametrii de bază. Clasificarea.",
 a:"Un <b>amplificator</b> face semnalul mai mare (mai multă putere la ieșire decât la intrare) fără să-i strice forma — energia în plus vine de la sursa de alimentare. Îl descriem prin: amplificarea (de câte ori crește), banda de frecvențe, rezistențele de intrare/ieșire, randamentul și distorsiunile. Se clasifică după: tipul de semnal (tensiune/curent/putere), frecvență (audio/radio) și cum sunt legate etajele."},
{n:23,t:5,q:"Destinația, clasificarea și structura amplificatoarelor electronice.",
 a:"Rolul lui: să facă un semnal slab destul de puternic ca să fie util (sunetul din microfon → difuzor). E construit din mai multe <b>etaje</b> legate în lanț: primul etaj (prinde semnalul slab, cu zgomot mic), etajele din mijloc (dau amplificarea mare) și etajul final (dă puterea pentru sarcină). Se clasifică după frecvență, tip de semnal și felul cuplajului între etaje."},
{n:24,t:5,q:"Amplificatoare electrice. Etaje preliminare de amplificare, circuite de alimentare și termostabilizare. Calculul etajelor de amplificare prealabilă.",
 a:"<b>Etajele preliminare</b> (cele de la început) amplifică semnalul mic cu distorsiuni cât mai mici → lucrează în clasa A. Sunt alimentate prin R<sub>C</sub> și ținute stabile la căldură cu divizor + R<sub>E</sub>. La calcul: alegi punctul de funcționare, apoi dimensionezi divizorul (curentul prin el ≈ 10× curentul de bază) și R<sub>E</sub>."},
{n:25,t:5,q:"Caracteristicile și parametrii de bază ai amplificatorului. Factorul de amplificare, randamentul, distorsiunile neliniare. Etaj cu TB în montaj EC. Principiul de funcționare.",
 a:"Parametrii de bază: <b>factorul de amplificare</b> A=U<sub>ieșire</sub>/U<sub>intrare</sub> (des în decibeli, dB), <b>randamentul</b> (cât din puterea consumată ajunge util) și <b>distorsiunile neliniare</b> (cât de mult se strică forma). <b>Etajul emitor comun (EC):</b> semnalul intră în bază, iese amplificat și răsturnat în colector; e cel mai folosit fiindcă amplifică mult."},
{n:26,t:5,q:"Caracteristicile și parametrii de bază ai amplificatorului. Etaj cu TB în montaj CC. Principiul de funcționare al repetorului pe emitor.",
 a:"<b>Etajul colector comun (CC)</b>, numit și <b>repetor pe emitor:</b> ieșirea „copiază” intrarea — amplificarea de tensiune e ~1, fără răsturnare. De ce e util? Are <b>intrare ușoară</b> (rezistență mare, nu încarcă etajul dinainte) și <b>ieșire puternică</b> (rezistență mică, poate alimenta o sarcină). E un adaptor de impedanță, nu un amplificator de tensiune; amplifică curentul."},
{n:27,t:5,q:"Repetorul pe emitor. Circuitul echivalent la semnal mic și parametrii de bază.",
 a:"Repetorul pe emitor, la semnal mic: amplificarea A≈1, <b>rezistența de intrare e mare</b> (R<sub>in</sub>≈β·R<sub>E</sub>) iar <b>rezistența de ieșire e mică</b>. Tocmai de-asta se pune între o sursă slabă și o sarcină grea, ca să nu „cadă” semnalul. Amplifică în schimb curentul (de ~β ori)."},
{n:28,t:5,q:"Asigurarea regimului de funcționare al componentelor active în circuitul amplificatorului. Circuite de polarizare și stabilizare a PSF în amplificatoare cu tranzistoare.",
 a:"Ca un amplificator să nu distorsioneze, tranzistorul trebuie ținut tot timpul în zona „activă” (deschis parțial), adică polarizat corect. Asta se face cu divizor + R<sub>E</sub>, care îl stabilizează și la încălzire. Punctul de funcționare (Q) se alege pe la mijloc, ca semnalul să poată urca și coborî egal, fără să se „taie”."},
{n:29,t:5,q:"Clasele de amplificare-funcționare și construcția etajelor amplificatoarelor.",
 a:"Clasele spun <b>cât timp conduce</b> tranzistorul dintr-o perioadă: <b>A</b> = tot timpul (cel mai fidel, dar consumă mult). <b>B</b> = doar jumătate (eficient, folosit în pereche „push-pull”). <b>AB</b> = puțin mai mult de jumătate (compromis bun, audio). <b>C</b> = mai puțin de jumătate (doar la radio). Etajele de la început = clasa A; etajele finale de putere = B sau AB."},
{n:30,t:5,q:"Amplificatorul de clasa A.",
 a:"<b>Clasa A:</b> tranzistorul conduce <i>tot timpul</i>, iar semnalul iese foarte fidel (fără distorsiuni). Minus: consumă curent chiar și fără semnal, deci randament mic (~25–50%). Se folosește acolo unde calitatea contează mai mult decât consumul: etaje de la început și amplificatoare de mică putere."},
{n:31,t:5,q:"Amplificatorul de clasa AB.",
 a:"<b>Clasa AB:</b> tranzistoarele conduc puțin mai mult de jumătate de perioadă. E un compromis: aproape la fel de fidel ca A, dar mult mai eficient (aproape ca B). Micul curent de repaus elimină „distorsiunea de trecere” care apare la clasa B când semnalul trece prin zero. E cel mai folosit în amplificatoarele audio (etaj final push-pull)."},
{n:32,t:5,q:"Amplificatorul de clasa B.",
 a:"<b>Clasa B:</b> tranzistorul conduce exact jumătate de perioadă; în repaus nu consumă → randament mare (~78%). Se folosesc două tranzistoare „push-pull”: unul face jumătatea de sus a semnalului, celălalt jumătatea de jos. Minus: la trecerea prin zero apare o mică „distorsiune de trecere” (de-aia se preferă AB)."},
{n:33,t:5,q:"Structura etajului amplificator. Elementele principale. Regimul de repaus. Etaj EC: schema, componentele, principiul de funcționare.",
 a:"Un etaj EC are: <b>tranzistorul</b>, divizorul R<sub>B1</sub>/R<sub>B2</sub> (îl polarizează), <b>R<sub>C</sub></b> (sarcina din colector), <b>R<sub>E</sub></b> (stabilizare), condensatoarele de cuplaj C₁/C₂ (lasă semnalul, opresc c.c.) și C<sub>E</sub> (mărește amplificarea). În repaus (fără semnal) fixează punctul de funcționare; cu semnal, un curent mic în bază devine unul mare în colector → ieșire amplificată și răsturnată."},
{n:34,t:5,q:"Etaj amplificator cu TB în montaj EC. Analiza în curent continuu. Influența temperaturii. Stabilizarea PSF-ului.",
 a:"La analiza în c.c. afli punctul de funcționare: I<sub>C</sub> și U<sub>CE</sub>=V<sub>CC</sub>−I<sub>C</sub>(R<sub>C</sub>+R<sub>E</sub>). Problema: la încălzire tranzistorul tinde să „tragă” mai mult curent (I<sub>C</sub> crește) și se poate strica. Soluția: divizorul + R<sub>E</sub> fac o reacție care reduce automat I<sub>C</sub> înapoi → punctul de funcționare rămâne stabil."},
{n:35,t:5,q:"Structura unui lanț de amplificare. Factorii de amplificare.",
 a:"Când un etaj nu amplifică destul, legăm mai multe în lanț (cascadă). Amplificarea totală = produsul amplificărilor (A=A₁·A₂·A₃…); în decibeli pur și simplu se adună. Primul etaj se ocupă de zgomot mic și intrare, ultimele de putere. Atenție: banda totală iese ceva mai îngustă decât a unui singur etaj."},
{n:36,t:5,q:"Proiectarea (calculul) amplificatorului cu emitor comun EC.",
 a:"Pașii la proiectarea unui EC: 1) alegi alimentarea V<sub>CC</sub> și punctul de funcționare (de obicei U<sub>CE</sub>≈jumătate din V<sub>CC</sub>); 2) calculezi R<sub>C</sub> și R<sub>E</sub>; 3) dimensionezi divizorul din bază (curent ~10× I<sub>B</sub>, U<sub>B</sub>=U<sub>E</sub>+0,7 V); 4) alegi condensatoarele pentru frecvențele joase. La final verifici amplificarea și că semnalul nu se taie."},
{n:37,t:5,q:"Analiza de semnal mic la frecvența medie a amplificatorului EC.",
 a:"La frecvențe medii, condensatoarele de cuplaj „dispar” (devin scurtcircuite) iar capacitățile parazite încă nu contează — deci amplificarea e maximă și constantă (porțiunea dreaptă din graficul amplificare-frecvență). Aici A≈−g<sub>m</sub>·R<sub>C</sub>, rezistența de intrare ≈ R<sub>B</sub> în paralel cu r<sub>be</sub>, cea de ieșire ≈ R<sub>C</sub>."},
{n:38,t:5,q:"Rezistența de ieșire a etajului amplificator.",
 a:"Rezistența de ieșire = ce „simte” sarcina când se uită înapoi în amplificator (cu intrarea oprită). La <b>emitor comun</b> e mare (≈R<sub>C</sub>). La <b>repetor (CC)</b> e mică. O rezistență de ieșire mică e bună: înseamnă că amplificatorul se poartă ca o sursă de tensiune solidă și nu „cade” sub sarcină."},
{n:39,t:5,q:"Amplificarea la curenți înalți. Analiza etajului EC cu tranzistor bipolar pentru semnal variabil.",
 a:"La semnal mare, vârfurile se apropie de limitele tranzistorului (saturație sus, blocare jos) și încep să se „taie” → apar distorsiuni. Se analizează cu <b>dreapta de sarcină dinamică</b> (în c.a. sarcina e R<sub>C</sub> în paralel cu R<sub>L</sub>). Cât de mare poate fi semnalul fără să se taie depinde de unde ai pus punctul de funcționare (ideal la mijloc)."},
{n:40,t:5,q:"Reacții în amplificatori. Tipuri de reacție.",
 a:"<b>Reacția</b> = iei o parte din semnalul de la ieșire și-l trimiți înapoi la intrare. Dacă-l trimiți „în fază” (se adună) → <b>reacție pozitivă</b>, mărește semnalul și duce la oscilații. Dacă-l trimiți „în antifază” (se scade) → <b>reacție negativă</b>, foarte folosită fiindcă stabilizează amplificatorul."},
{n:41,t:5,q:"Categoriile de reacții în amplificatoare și modul de realizare. Exemple.",
 a:"Reacția poate fi de 4 feluri, după ce „măsoară” la ieșire (tensiune sau curent) și cum o aplică la intrare (în serie sau paralel). Exemple simple: un R<sub>E</sub> nedecuplat = reacție negativă (stabilizează amplificarea, mărește rezistența de intrare); un rezistor de la colector la bază = alt tip de reacție (scade rezistențele de intrare/ieșire)."},
{n:42,t:5,q:"Reacții în amplificator. Reacție globală și locală.",
 a:"<b>Locală</b> = reacția se face în jurul unui singur etaj (ex: R<sub>E</sub>-ul acelui etaj). <b>Globală</b> = iei semnalul de la ieșirea finală și-l duci tocmai la intrarea primului etaj, cuprinzând tot lanțul. Cea globală controlează mai bine amplificarea totală și reduce mai mult distorsiunile, dar e mai „riscantă” (poate porni să oscileze dacă nu e bine făcută)."},
{n:43,t:5,q:"Influența reacției negative asupra performanțelor. Influența asupra caracteristicii amplitudine–frecvență.",
 a:"Reacția negativă (RN) <b>scade</b> amplificarea, dar aduce multe avantaje: amplificarea devine stabilă (nu mai depinde de tranzistor), <b>distorsiunile și zgomotul scad</b>, iar <b>banda de frecvențe se lărgește</b>. Pe graficul amplificare-frecvență, curba iese mai joasă, dar mai lată și mai dreaptă. Practic: pierzi câștig, câștigi calitate."},
{n:44,t:5,q:"Influența reacției negative asupra impedanțelor de intrare și ieșire ale amplificatorului.",
 a:"Reacția negativă schimbă și rezistențele, după tip: aplicată „în serie” la intrare → <b>mărește</b> rezistența de intrare; „în paralel” → o micșorează. Dacă „măsoară” tensiunea la ieșire → <b>micșorează</b> rezistența de ieșire; dacă măsoară curentul → o mărește. Așa „reglăm” impedanțele cum avem nevoie."},
{n:45,t:5,q:"Amplificatoare de putere. Etaje finale de amplificare cu și fără transformatoare. Modele de etaje finale. Calculul parametrilor de bază.",
 a:"<b>Etajul final</b> dă puterea reală în sarcină (ex: difuzorul). <b>Cu transformator:</b> adaptează impedanța, randament ~50%. <b>Fără transformator</b> (push-pull, clasele B/AB): mai eficient, ~78%. Puterea în sarcină: P=U²/(2R<sub>L</sub>). La proiectare alegi tranzistoarele după puterea, tensiunea și curentul maxim pe care le suportă."},
{n:46,t:5,q:"Clasele de amplificare și construirea amplificatoarelor electronice. Etajele de amplificare clasa A.",
 a:"(La fel ca la clasele A/B/AB/C.) <b>Etajul clasa A</b> are un singur tranzistor care conduce tot timpul, cu punctul de funcționare la mijloc. E cel mai fidel, dar are randament mic — de aceea se folosește la etajele de la început și la amplificatoare de mică putere, unde calitatea contează."},
{n:47,t:5,q:"Cuplarea directă a amplificatoarelor.",
 a:"<b>Cuplare directă</b> = legi etajele direct, fără condensator între ele. Avantaj: amplifică și semnalele foarte lente sau continue (c.c.), fără piese mari. Dezavantaj: punctele de funcționare ale etajelor se influențează unul pe altul și „derivă” cu temperatura → mai greu de proiectat."},
{n:48,t:5,q:"Cuplarea RC (rezistență, capacitate) a amplificatoarelor.",
 a:"<b>Cuplare RC</b> = legi etajele printr-un condensator (plus rezistențe). Condensatorul lasă semnalul (c.a.) dar oprește c.c., deci fiecare etaj își păstrează punctul de funcționare independent. Simplu și comod. Dezavantaj: nu trece semnalele continue, iar la frecvențe joase amplificarea scade (din cauza condensatorului)."},
{n:49,t:5,q:"Amplificatoare diferențiale. Schema, principiul de funcționare, obținerea semnalelor. Diagrama de potențiale în circuitele de ieșire.",
 a:"<b>Amplificatorul diferențial</b> are două tranzistoare identice, cu emitoarele legate împreună la o sursă de curent. El amplifică <b>diferența</b> dintre cele două intrări (u₁−u₂) și ignoră ce e comun ambelor (zgomot, perturbații). E „inima” amplificatorului operațional. Cu cât respinge mai bine semnalul comun, cu atât e mai bun."},
{n:50,t:5,q:"Excitarea pe mod comun a amplificatoarelor diferențiale.",
 a:"<b>Mod comun</b> = pui același semnal pe ambele intrări (u₁=u₂). Un amplificator diferențial bun ar trebui să dea ieșire ≈0 (le „taie” pe amândouă la fel). Amplificarea de mod comun trebuie să fie cât mai mică — cu cât sursa de curent din emitor e mai bună, cu atât e mai aproape de zero. Raportul dintre amplificarea utilă și cea de mod comun = CMRR."},
{n:51,t:5,q:"Excitarea diferențială cu semnale mici.",
 a:"<b>Excitare diferențială</b> = pui semnale opuse pe cele două intrări (u₁=+u, u₂=−u). Atunci amplificatorul dă amplificare mare (A=g<sub>m</sub>·R<sub>C</sub>). Punctul comun al emitoarelor rămâne fix (o „masă virtuală”), așa că poți analiza doar jumătate de circuit, ca pe un etaj EC simplu."},
{n:52,t:5,q:"Amplificatorul operațional. Etajul diferențial ideal. Regimul de repaus.",
 a:"<b>Amplificatorul operațional (AO)</b> e un amplificator diferențial „aproape perfect”: amplificare uriașă, rezistență de intrare uriașă, rezistență de ieșire ~0, bandă largă. Regulile de aur (când are reacție negativă): nu intră curent în intrări, iar cele două intrări au practic aceeași tensiune. Cu el faci aproape orice: adunare, integrare, comparare etc."},
{n:53,t:5,q:"Oscilatoare.",
 a:"Un <b>oscilator</b> e un circuit care produce singur un semnal periodic, fără să primească ceva la intrare — transformă curentul continuu de la alimentare în semnal alternativ. Are nevoie de: un amplificator + o <b>reacție pozitivă</b> + un element care alege frecvența. Sunt de două feluri: armonice (sinus) și de relaxare (dreptunghi etc.)."},
{n:54,t:5,q:"Principiul de funcționare a oscilatoarelor armonice.",
 a:"Un oscilator armonic pleacă de la o reacție pozitivă care îndeplinește <b>condiția lui Barkhausen:</b> semnalul readus la intrare trebuie să fie exact în fază (defazaj 0 sau 360°) și cu amplificarea totală =1. Atunci circuitul se „auto-întreține”: pornește din zgomotul mic și se stabilizează. Frecvența e dată de partea selectivă (RC sau LC)."},
{n:55,t:5,q:"Oscilatoare armonice OA de tip RC și LC.",
 a:"Două familii: <b>RC</b> (rezistențe + condensatoare) — pentru frecvențe joase, audio (ex: puntea Wien, f=1/(2πRC)). <b>LC</b> (bobină + condensator) — pentru frecvențe înalte, radio (ex: Hartley, Colpitts; f=1/(2π√(LC))). Cele LC folosesc un circuit rezonant ca să aleagă frecvența."},
{n:56,t:5,q:"Oscilatoare armonice de tip RC și LC. Noțiuni generale, clasificarea, condițiile de autoexcitare. Oscilații LC.",
 a:"Ca să pornească (autoexcitare), oscilatorul trebuie să respecte Barkhausen: amplificare totală ≥1 și defazaj 0. La oscilatorul <b>LC</b>, bobina și condensatorul își pasează energia înainte-înapoi (ca un leagăn), iar amplificatorul doar acoperă pierderile. RC = frecvențe joase, LC = înalte, cu cuarț = foarte precise (ceasuri, procesoare)."},
{n:57,t:5,q:"Oscilatoare cu rețea „dublu T”.",
 a:"Oscilatorul cu rețea <b>„dublu T”</b> folosește o rețea din rezistențe și condensatoare (în formă de două litere T) care „taie” o anumită frecvență. Pusă pe calea de reacție, ea face circuitul să oscileze exact la acea frecvență, f₀=1/(2πRC). Avantaj: frecvențe joase stabile, fără bobine."},

/* ===== TEMA 3 — Surse de alimentare: stabilizatoare, redresoare, filtre (Î58–Î66, 69, 70) ===== */
{n:58,t:3,q:"Stabilizatoare de tensiune. Stabilizatoarele parametrice cu diode Zener.",
 a:"Un <b>stabilizator</b> ține tensiunea de ieșire constantă chiar dacă intrarea sau sarcina variază. Cel <b>parametric</b> e cel mai simplu: un rezistor în serie + o <b>diodă Zener</b> în paralel cu sarcina. Zener-ul, polarizat invers, „blochează” tensiunea la valoarea lui U<sub>Z</sub>, deci ieșirea rămâne ≈U<sub>Z</sub>. Simplu, dar bun doar la curenți mici."},
{n:59,t:3,q:"Stabilizatoarele de compensare.",
 a:"Stabilizatorul <b>de compensare</b> e mai deștept: compară mereu tensiunea de ieșire cu o referință (un Zener) și, dacă observă o abatere, comandă un tranzistor să o corecteze. Are reacție, deci e mult mai precis decât cel parametric. E folosit în sursele reglabile de laborator."},
{n:60,t:3,q:"Stabilizator parametric. Calculul stabilizatorului.",
 a:"La un stabilizator parametric: alegi un Zener cu U<sub>Z</sub>≈tensiunea dorită. Apoi calculezi rezistorul serie: R=(U<sub>intrare</sub>−U<sub>Z</sub>)/(I<sub>Zener</sub>+I<sub>sarcină</sub>). Verifici două cazuri extreme: la intrare minimă/sarcină maximă (Zener-ul să aibă curent minim) și la intrare maximă/fără sarcină (să nu depășească puterea maximă a Zener-ului)."},
{n:61,t:3,q:"Elemente de ameliorare a tensiunii redresate. Filtre de netezire.",
 a:"După redresare, tensiunea e „pulsatorie” (urcă și coboară). <b>Filtrul de netezire</b> o aplatizează. Cel mai simplu: un <b>condensator</b> mare în paralel — se încarcă la vârf și se descarcă lent, umplând „golurile”. Variante mai bune: cu bobină (L) sau combinații LC/CLC. Cu cât condensatorul e mai mare, cu atât „riplul” (ondulația rămasă) e mai mic."},
{n:62,t:3,q:"Regulatoare de tensiune. Diagrama bloc și principiul de funcționare.",
 a:"Un <b>regulator de tensiune</b> ține ieșirea fixă. Schema bloc: o referință + un comparator (amplificator de eroare) + un element de reglare (tranzistor) + o reacție (divizor). Compară o parte din ieșire cu referința și ajustează tranzistorul ca să corecteze. În practică se folosesc cipuri gata făcute: 7805 (+5 V), 7812 (+12 V), LM317 (reglabil)."},
{n:63,t:3,q:"Principiul de funcționare și calculul schemei din proiectul de an.",
 a:"E sursa de alimentare pe care o proiectezi la proiectul de an: <b>transformator → punte redresoare → filtru cu condensator → stabilizator</b>. Calculezi pe rând: tensiunea din secundar, condensatorul de filtrare (din riplul admis), diodele (după tensiune și curent) și stabilizatorul. La final ai o tensiune continuă, netedă și stabilă."},
{n:64,t:3,q:"Surse de alimentare. Redresoare monoalternanță.",
 a:"<b>Redresor monoalternanță:</b> o singură diodă lasă să treacă doar o jumătate din sinusoidă (cealaltă o taie). Tensiunea medie iese mică: U<sub>med</sub>=U<sub>max</sub>/π (≈0,318·U<sub>max</sub>). E cel mai simplu, dar are riplu mare și e slab — folosit doar la puteri mici."},
{n:65,t:3,q:"Surse de alimentare. Redresoare bialternanță (cu priză mediană).",
 a:"<b>Bialternanță cu priză mediană:</b> 2 diode + un transformator cu priză la mijloc folosesc <i>ambele</i> jumătăți ale sinusoidei. Tensiunea medie e dublă față de monoalternanță (U<sub>med</sub>=2U<sub>max</sub>/π≈0,637·U<sub>max</sub>), iar ondulația e la 100 Hz → mai ușor de filtrat. Minus: cere un transformator special cu priză."},
{n:66,t:3,q:"Surse de alimentare. Redresoare bialternanță în punte (Graetz).",
 a:"<b>Puntea redresoare (Graetz):</b> 4 diode folosesc ambele jumătăți ale sinusoidei, <i>fără</i> a avea nevoie de priză mediană. Tensiunea medie ca la bialternanță, ondulație la 100 Hz. E cel mai folosit montaj. Mic dezavantaj: în fiecare moment conduc 2 diode, deci pierderi puțin mai mari (2 căderi de 0,7 V)."},
{n:69,t:3,q:"Filtre pasive. Filtru de tip C, LC, RC, CLC.",
 a:"Filtre care netezesc tensiunea redresată: <b>C</b> — doar un condensator în paralel (simplu). <b>RC</b> — rezistor + condensator (ieftin, dar pierde putere pe R). <b>LC</b> — bobină + condensator (netezire bună, pierderi mici). <b>CLC (π)</b> — condensator-bobină-condensator, cea mai bună netezire. Rolul lor: să lase componenta continuă și să blocheze ondulația."},
{n:70,t:3,q:"Filtru stop-bandă capacitiv. Schema și calculele.",
 a:"Un <b>filtru stop-bandă</b> lasă să treacă toate frecvențele <i>în afară</i> de o anumită bandă pe care o blochează (în jurul unei frecvențe f₀). Se face cu circuite L-C acordate sau cu o rețea „dublu T” din RC. Frecvența blocată: f₀=1/(2π√(LC)). Util ca să scapi de o frecvență nedorită (ex: bâzâitul de 50 Hz din rețea)."},

/* ===== TEMA 6 — TEC-MOS (Î67–Î68) ===== */
{n:67,t:6,q:"TEC-MOS cu joncțiune p-n, TEC-J.",
 a:"La TEC-J, curentul curge printr-un <b>canal</b> (de tip N sau P), iar grila — polarizată invers — îl strânge mai mult sau mai puțin, controlând curentul I<sub>D</sub> fără să consume curent. Când V<sub>GS</sub>=0 → curent maxim (I<sub>DSS</sub>); când V<sub>GS</sub> ajunge la V<sub>P</sub> (tensiunea de „închidere”) → canalul se închide și curentul devine 0. Comandat în tensiune, zgomot mic, intrare foarte mare."},
{n:68,t:6,q:"TEC-MOS cu canal indus. Circuitul de polarizare a tranzistorului.",
 a:"La MOS cu <b>canal indus</b>, canalul nu există de la început — apare doar când tensiunea grilă-sursă depășește pragul V<sub>T</sub>. Sub prag = blocat, peste prag = conduce (I<sub>D</sub>=k(V<sub>GS</sub>−V<sub>T</sub>)²). De-aia e perfect ca <b>comutator</b> (pornit/oprit) și stă la baza cipurilor CMOS. Îl polarizezi cu divizor în grilă + R<sub>S</sub>, sau legând grila de drenă, ca să fie sigur peste prag."}

];

/* Structura biletului: 3 întrebări teoretice (din teme diferite) + 1 problemă */
function genBilet(){
  const byT={}; THEORY_QA.forEach(x=>{(byT[x.t]=byT[x.t]||[]).push(x);});
  const teme=Object.keys(byT);
  for(let i=teme.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[teme[i],teme[j]]=[teme[j],teme[i]];}
  const chosen=teme.slice(0,3).map(t=>R.pick(byT[t]));
  const gen=R.pick(GENERATORS);
  return {questions:chosen, problem:gen.fn(), problemName:gen.name};
}
