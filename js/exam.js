/* ============================================================
   EXAM — cele 70 de ÎNTREBĂRI OFICIALE pentru examenul final
   (sursa: "Lista întrebărilor pentru examenul final", ELSE/UTM,
    cursul FCIM.CDE21.5 / FAF.CDE21.1, lector N. Magariu).
   Biletul real = 3 întrebări teoretice (din aceste 70) + 1 problemă.
   Fiecare: {n: nr. oficial, t: tema (1-6), q: întrebarea, a: răspuns model}.
   Stil răspuns: HTML inline (sub/sup, <b>), fără backslash — sigur la randare.
   ============================================================ */
const THEORY_QA = [

/* ===== TEMA 1 — Bazele circuitelor (Î1–Î8) ===== */
{n:1,t:1,q:"Conceptele de bază ale mărimilor electrice și componentele circuitelor electrice.",
 a:"Mărimi de bază: sarcina Q [C], curentul I=Q/t [A], tensiunea U [V], rezistența R [Ω], puterea P=U·I [W], energia W=P·t. Un <b>circuit electric</b> = ansamblu de surse (active) și receptoare (pasive: R, L, C) legate prin conductoare, formând o cale închisă pentru curent. Componente: <b>active</b> (surse de tensiune/curent) și <b>pasive</b> (rezistor, bobină, condensator)."},
{n:2,t:1,q:"Semnale electrice, curentul, tensiunea, energia și puterea circuitelor electrice.",
 a:"<b>Semnal</b> = mărime electrică ce poartă informație (c.c. constant sau c.a. variabil în timp). <b>Curentul</b> I = debitul de sarcină (I=dQ/dt). <b>Tensiunea</b> U = lucrul pe unitatea de sarcină (diferență de potențial). <b>Puterea</b> P=U·I [W]; <b>energia</b> W=∫P dt [J] (sau Wh)."},
{n:3,t:1,q:"Elemente de circuit: elemente rezistive, inductive, capacitive și caracteristicile lor.",
 a:"<b>Rezistiv (R):</b> u=R·i (în fază), disipă energie P=R·I². <b>Inductiv (L):</b> u=L·di/dt, X<sub>L</sub>=2πfL, curent defazat 90° în urmă, acumulează energie magnetică. <b>Capacitiv (C):</b> i=C·du/dt, X<sub>C</sub>=1/(2πfC), curent defazat 90° înainte, acumulează energie electrică. L și C sunt reactive (nu disipă)."},
{n:4,t:1,q:"Elemente de circuit active – Sursele. Surse de tensiune și surse de curent.",
 a:"<b>Sursă de tensiune ideală:</b> menține U constantă indiferent de sarcină (r<sub>int</sub>=0). <b>Sursă de curent ideală:</b> debitează I constant (r<sub>int</sub>=∞). Reale: tensiune cu r<sub>int</sub> în serie (U=E−r·I); curent cu r<sub>int</sub> în paralel. Se pot transforma una în alta (echivalența Thévenin–Norton)."},
{n:5,t:1,q:"Clasificarea circuitelor electrice. Liniare și neliniare, neramificate și ramificate, cu una sau mai multe surse. Regimurile de funcționare.",
 a:"<b>Liniare</b> (parametri constanți, valabilă suprapunerea) vs <b>neliniare</b> (diode, tranzistoare). <b>Neramificate</b> (un singur ochi, același curent) vs <b>ramificate</b> (cu noduri și mai multe ramuri). După surse: cu o sursă / mai multe. <b>Regimuri:</b> staționar (c.c.), tranzitoriu, permanent sinusoidal (c.a.)."},
{n:6,t:1,q:"Teoremele generale ale teoriei circuitelor electrice. Teoremele lui Kirchhoff.",
 a:"<b>KCL (legea I, a nodurilor):</b> ΣI=0 în orice nod (Σ intră = Σ ies) — conservarea sarcinii. <b>KVL (legea a II-a, a ochiurilor):</b> pe orice ochi ΣE = ΣR·I (suma t.e.m. = suma căderilor de tensiune). Se mai folosesc teoremele Thévenin, Norton și a superpoziției."},
{n:7,t:1,q:"Circuite electrice de curent continuu. Legea lui Ohm generalizată.",
 a:"Pe un rezistor: I=U/R. <b>Generalizată</b> (ochi cu t.e.m. și rezistențe): I=ΣE/ΣR. Pe întreg circuitul cu sursă reală: I=E/(R+r); tensiunea la borne U=E−r·I; la scurtcircuit I<sub>sc</sub>=E/r (curent maxim)."},
{n:8,t:1,q:"Divizor de tensiune și curent. Conectarea rezistențelor, capacitoarelor în serie și în paralel. Formulele.",
 a:"<b>Divizor de tensiune</b> (R în serie): U<sub>k</sub>=U·R<sub>k</sub>/ΣR. <b>Divizor de curent</b> (R în paralel): I<sub>k</sub>=I·R<sub>ech</sub>/R<sub>k</sub>. <b>R serie:</b> R=ΣR<sub>k</sub>; <b>R paralel:</b> 1/R=Σ1/R<sub>k</sub>. <b>C serie:</b> 1/C=Σ1/C<sub>k</sub>; <b>C paralel:</b> C=ΣC<sub>k</sub> (invers față de rezistoare)."},

/* ===== TEMA 2 — Semiconductori și diode (Î9–Î12) ===== */
{n:9,t:2,q:"Semiconductorii intrinseci, extrinseci, de tip p și de tip n.",
 a:"<b>Intrinsec:</b> pur (Si/Ge), n=p, conducție redusă. <b>Extrinsec:</b> dopat. <b>Tip n:</b> impurități donoare (pentavalente) → electroni majoritari (−), goluri minoritare. <b>Tip p:</b> impurități acceptoare (trivalente) → goluri majoritare (+), electroni minoritari. Doparea crește mult conductivitatea."},
{n:10,t:2,q:"Joncțiunea p-n. Definiția, structura, formarea și caracteristicile. Polarizarea directă și inversă. Bariera de potențial.",
 a:"La contactul p-n golurile difuzează p→n și electronii n→p → regiune sărăcită cu câmp intern = <b>barieră de potențial</b> (Si≈0,7 V). <b>Direct</b> (+ pe p): bariera scade, conduce exponențial. <b>Invers:</b> bariera crește, blocată, doar curentul de saturație I<sub>s</sub> (µA). Caracteristica i-u este neliniară (Shockley)."},
{n:11,t:2,q:"Diode semiconductoare. Simbolul, structura, parametrii și caracteristicile diodelor. Punctul static de funcționare. Tipurile de polarizare.",
 a:"Dioda = o joncțiune p-n (anod-catod). Parametri: U<sub>prag</sub> (≈0,7 V Si / 0,3 V Ge), I<sub>max</sub>, U<sub>inv max</sub>, I<sub>s</sub>, r<sub>d</sub>. Caracteristica i-u: directă (conduce) / inversă (blocată). <b>PSF</b> = intersecția dreptei de sarcină i=(E−u<sub>D</sub>)/R cu caracteristica diodei."},
{n:12,t:2,q:"Diode semiconductoare. Tipurile de diode. Punctul static de funcționare în regimurile static și dinamic.",
 a:"Tipuri: redresoare, <b>Zener</b> (stabilizare), <b>Schottky</b> (rapidă, ≈0,3 V), <b>LED</b>, fotodiodă, varicap, tunel. <b>Static:</b> R<sub>cc</sub>=U<sub>D</sub>/I<sub>D</sub> (din PSF). <b>Dinamic (semnal mic):</b> r<sub>d</sub>=ΔU/ΔI=V<sub>T</sub>/I<sub>D</sub> (V<sub>T</sub>≈25–26 mV) — panta caracteristicii în jurul PSF."},

/* ===== TEMA 4 — Tranzistoare bipolare (Î13–Î16) ===== */
{n:13,t:4,q:"Tranzistoare bipolare. Tipurile, simbolul, structura, parametrii și caracteristicile lor. Punctul static de funcționare în regimurile static și dinamic.",
 a:"TB = 3 regiuni (E,B,C), 2 joncțiuni; <b>NPN</b> și <b>PNP</b>. Parametri: β=I<sub>C</sub>/I<sub>B</sub> (h<sub>FE</sub>), α=I<sub>C</sub>/I<sub>E</sub>, U<sub>CE max</sub>, I<sub>C max</sub>. Relații: I<sub>E</sub>=I<sub>C</sub>+I<sub>B</sub>, I<sub>C</sub>=β·I<sub>B</sub>. <b>PSF static:</b> Q(I<sub>C</sub>, U<sub>CE</sub>) pe dreapta de sarcină c.c.; <b>dinamic:</b> variații de semnal mic în jurul lui Q."},
{n:14,t:4,q:"Circuite de polarizare și stabilizare a punctului static inițial de funcționare PSF a tranzistoarelor bipolare.",
 a:"Scop: fixarea unui Q stabil în regiunea activă. Scheme: cu rezistor de bază (fixă), cu reacție de colector, cu <b>divizor de tensiune + R<sub>E</sub></b> (cea mai stabilă). R<sub>E</sub> asigură stabilizarea termică: T↑→I<sub>C</sub>↑→U<sub>E</sub>↑→U<sub>BE</sub>↓→I<sub>C</sub>↓ (contracarează ambalarea termică)."},
{n:15,t:4,q:"Regimurile static și dinamic de funcționare ale tranzistoarelor bipolare. Circuitele și formele de semnal, calculele circuitelor echivalente.",
 a:"<b>Static (c.c.):</b> doar polarizarea → Q (condensatoarele = întreruperi). <b>Dinamic (c.a.):</b> semnalul mic suprapus → se folosește circuitul echivalent (model h sau π-hibrid; condensatoarele = scurtcircuite). Ieșirea e amplificată; în montaj EC defazată cu 180°."},
{n:16,t:4,q:"Configurații de conexiune ale TB: bază comună, emitor comun și colector comun. Modurile de funcționare: tăiere, activ normal, activ invers, saturație.",
 a:"<b>EC:</b> A<sub>u</sub>, A<sub>i</sub> mari, defazaj 180°. <b>BC:</b> A<sub>u</sub> mare, A<sub>i</sub>≈1, frecvențe înalte. <b>CC (repetor):</b> A<sub>u</sub>≈1, Z<sub>in</sub> mare, Z<sub>out</sub> mică. <b>Moduri:</b> tăiere (ambele joncțiuni inverse, blocat), activ normal (EB direct, CB invers — amplifică), saturație (ambele directe, U<sub>CE</sub>≈0,2 V), activ invers (rar)."},

/* ===== TEMA 6 — TEC / FET (Î17–Î19) ===== */
{n:17,t:6,q:"Tranzistoare cu efect de câmp. Tipurile de tranzistoare unipolare. TEC-J. Simbolul, structura, parametrii și caracteristicile. Punctul static de funcționare.",
 a:"TEC (FET) = dispozitiv <b>unipolar</b>, comandat în tensiune (V<sub>GS</sub> controlează I<sub>D</sub>). Terminale: Drenă, Sursă, Grilă. <b>TEC-J:</b> joncțiunea G-S polarizată invers îngustează canalul. I<sub>D</sub>=I<sub>DSS</sub>(1−V<sub>GS</sub>/V<sub>P</sub>)². Parametri: I<sub>DSS</sub>, V<sub>P</sub> (blocare), g<sub>m</sub>, Z<sub>in</sub> foarte mare."},
{n:18,t:6,q:"Tranzistoare cu efect de câmp, TEC-MOS. Tipurile. Simbolul, structura, parametrii și caracteristicile. Punctul static de funcționare.",
 a:"Grilă <b>izolată</b> cu SiO₂ → Z<sub>in</sub>~10¹⁵ Ω. Două tipuri: <b>canal inițial</b> (lucrează în sărăcire și îmbogățire) și <b>canal indus</b> (doar îmbogățire, V<sub>GS</sub>>V<sub>prag</sub>). Parametri: V<sub>T</sub> (prag), k, g<sub>m</sub>. Sensibil la ESD. PSF stabilit de schema de polarizare în grilă."},
{n:19,t:6,q:"Tranzistoare cu efect de câmp, TEC-MOS. Schema de polarizare cu divizor rezistiv în grilă.",
 a:"R<sub>G1</sub>, R<sub>G2</sub> fixează V<sub>G</sub>=V<sub>DD</sub>·R<sub>G2</sub>/(R<sub>G1</sub>+R<sub>G2</sub>); R<sub>S</sub> în sursă dă V<sub>GS</sub>=V<sub>G</sub>−I<sub>D</sub>·R<sub>S</sub> (autopolarizare + stabilizare). Cum I<sub>G</sub>≈0, divizorul poate avea R foarte mari (MΩ) → Z<sub>in</sub> mare. Stabilizează I<sub>D</sub> la variațiile parametrilor."},

/* ===== TEMA 5 — Amplificatoare, reacții, oscilatoare (Î20–Î57) ===== */
{n:20,t:5,q:"Amplificatoare de semnal mic cu tranzistoare MOS. Etaj de amplificare cu tranzistor MOS în conexiunea sursă comună.",
 a:"Analog cu EC la TB. Semnalul intră în grilă, iese din drenă, <b>defazaj 180°</b>. A<sub>u</sub>≈−g<sub>m</sub>·R<sub>D</sub> (sau −g<sub>m</sub>(R<sub>D</sub>‖r<sub>d</sub>)). Z<sub>in</sub> foarte mare (grila izolată). C<sub>S</sub> decuplează sursa în c.a. pentru câștig maxim."},
{n:21,t:5,q:"Amplificatoare de semnal mic cu tranzistoare MOS. Etaj de amplificare cu tranzistor MOS în conexiunea drenă comună.",
 a:"Ieșirea din sursă (repetor pe sursă). A<sub>u</sub>=g<sub>m</sub>R<sub>S</sub>/(1+g<sub>m</sub>R<sub>S</sub>)≈1 (puțin sub 1), fără defazaj. Z<sub>in</sub> foarte mare, Z<sub>out</sub> mică → etaj tampon/adaptor de impedanță (analog CC la TB)."},
{n:22,t:5,q:"Amplificatoare electrice. Caracteristici și parametrii de bază. Clasificarea.",
 a:"Amplificator = cuadripol care mărește puterea semnalului fără a-i distorsiona forma (energia vine de la sursa de alimentare). Parametri: A<sub>u</sub>, A<sub>i</sub>, A<sub>p</sub>, banda B, Z<sub>in</sub>, Z<sub>out</sub>, randament, distorsiuni. Clasificare: după semnal (tensiune/curent/putere), bandă (c.c./AF/RF), element activ, cuplaj."},
{n:23,t:5,q:"Destinația, clasificarea și structura amplificatoarelor electronice.",
 a:"Destinație: amplifică semnale slabe păstrând forma. Structură: <b>etaj de intrare</b> (Z<sub>in</sub> mare, zgomot mic) → <b>etaje intermediare</b> (câștig) → <b>etaj final</b> (putere). Clasificare după frecvență, tip de semnal și cuplajul între etaje."},
{n:24,t:5,q:"Amplificatoare electrice. Etaje preliminare de amplificare, circuite de alimentare și termostabilizare. Calculul etajelor de amplificare prealabilă.",
 a:"Etajele preliminare dau câștig de tensiune cu distorsiuni mici (regim clasa A). Alimentare prin R<sub>C</sub>; termostabilizare cu divizor + R<sub>E</sub>. Calcul: se alege Q, se dimensionează divizorul (I<sub>div</sub>≈10·I<sub>B</sub>) și R<sub>E</sub>, apoi condensatoarele."},
{n:25,t:5,q:"Caracteristicile și parametrii de bază ai amplificatorului. Factorul de amplificare, randamentul, distorsiunile neliniare. Etaj cu TB în montaj EC. Principiul de funcționare.",
 a:"A<sub>u</sub>=U<sub>ies</sub>/U<sub>in</sub> [dB=20·log A]; randament η=P<sub>ies</sub>/P<sub>consumat</sub>; distorsiuni neliniare = armonice generate de neliniaritate. <b>EC:</b> semnalul în bază, ieșirea în colector, A<sub>u</sub>≈−g<sub>m</sub>·R<sub>C</sub>, defazaj 180°."},
{n:26,t:5,q:"Caracteristicile și parametrii de bază ai amplificatorului. Etaj cu TB în montaj CC. Principiul de funcționare al repetorului pe emitor.",
 a:"<b>CC (repetor pe emitor):</b> ieșirea din emitor, A<sub>u</sub>≈1 (urmărește intrarea, fără defazaj). Z<sub>in</sub> mare (≈β·R<sub>E</sub>), Z<sub>out</sub> mică → adaptor de impedanță / etaj tampon; nu amplifică tensiunea, ci curentul și puterea."},
{n:27,t:5,q:"Repetorul pe emitor. Circuitul echivalent la semnal mic și parametrii de bază.",
 a:"Model semnal mic: r<sub>be</sub> la intrare, sursa β·i<sub>b</sub>, R<sub>E</sub> în emitor. A<sub>u</sub>=R<sub>E</sub>/(R<sub>E</sub>+r<sub>e</sub>)≈1; Z<sub>in</sub>=r<sub>be</sub>+(1+β)R<sub>E</sub> (mare); Z<sub>out</sub>=r<sub>e</sub>+R<sub>gen</sub>/(1+β) (mică); A<sub>i</sub>≈1+β."},
{n:28,t:5,q:"Asigurarea regimului de funcționare al componentelor active în circuitul amplificatorului. Circuite de polarizare și stabilizare a PSF în amplificatoare cu tranzistoare.",
 a:"Componenta activă trebuie ținută în regiunea activă (clasa A) pentru semnal nedistorsionat. Polarizare cu divizor + R<sub>E</sub>; stabilizare termică prin reacția de c.c. pe R<sub>E</sub>. Q se alege la mijlocul dreptei de sarcină pentru excursie maximă simetrică."},
{n:29,t:5,q:"Clasele de amplificare-funcționare și construcția etajelor amplificatoarelor.",
 a:"După unghiul de conducție: <b>A</b> (360°, fidel, η≤50%), <b>AB</b> (>180°), <b>B</b> (180°, push-pull, η≈78%), <b>C</b> (<180°, RF acordat). Etajele preliminare lucrează în clasa A; etajele finale de putere în B/AB push-pull."},
{n:30,t:5,q:"Amplificatorul de clasa A.",
 a:"Conduce toată perioada (360°), cu Q la mijlocul dreptei de sarcină. <b>Avantaj:</b> distorsiuni minime, fidel. <b>Dezavantaj:</b> randament mic (≤25% cu R<sub>C</sub>, ≤50% cu transformator), consumă curent și în repaus."},
{n:31,t:5,q:"Amplificatorul de clasa AB.",
 a:"Conduce puțin mai mult de 180°: o mică polarizare ține tranzistoarele ușor deschise ca să se evite distorsiunea de trecere („crossover”) din clasa B. Compromis între fidelitatea clasei A și randamentul clasei B → etaje finale audio push-pull."},
{n:32,t:5,q:"Amplificatorul de clasa B.",
 a:"Conduce exact 180° (T/2); în repaus I≈0 → randament mare (≈78%). Folosit push-pull (2 tranzistoare, fiecare amplifică o semialternanță). <b>Dezavantaj:</b> distorsiune de trecere la zero („crossover”), corectată în clasa AB."},
{n:33,t:5,q:"Structura etajului amplificator. Elementele principale. Regimul de repaus. Etaj EC: schema, componentele, principiul de funcționare.",
 a:"Componente: TB, divizor R<sub>B1</sub>/R<sub>B2</sub>, R<sub>C</sub> (sarcină), R<sub>E</sub> (stabilizare), C<sub>1</sub>,C<sub>2</sub> (cuplaj), C<sub>E</sub> (decuplare). <b>Repausul</b> = regimul static (fără semnal), fixează Q. Principiu EC: i<sub>b</sub> mic → i<sub>c</sub>=β·i<sub>b</sub> mare pe R<sub>C</sub> → U<sub>ies</sub> amplificată, defazată 180°."},
{n:34,t:5,q:"Etaj amplificator cu TB în montaj EC. Analiza în curent continuu. Influența temperaturii. Stabilizarea PSF-ului.",
 a:"Analiza c.c. dă Q: I<sub>C</sub> și U<sub>CE</sub>=V<sub>CC</sub>−I<sub>C</sub>(R<sub>C</sub>+R<sub>E</sub>). La T↑ cresc I<sub>CB0</sub> și β și scade U<sub>BE</sub> → I<sub>C</sub> tinde să crească. Divizorul + R<sub>E</sub> (reacție negativă de c.c.) mențin Q aproape constant."},
{n:35,t:5,q:"Structura unui lanț de amplificare. Factorii de amplificare.",
 a:"Mai multe etaje în cascadă: A<sub>total</sub>=A<sub>1</sub>·A<sub>2</sub>·…·A<sub>n</sub> (în dB se adună). Etajul de intrare optimizat pentru Z<sub>in</sub>/zgomot, cele intermediare pentru câștig, finalul pentru putere. Banda totală e mai îngustă decât a fiecărui etaj."},
{n:36,t:5,q:"Proiectarea (calculul) amplificatorului cu emitor comun EC.",
 a:"Pași: alegi V<sub>CC</sub> și Q (U<sub>CE</sub>≈V<sub>CC</sub>/2); R<sub>C</sub>+R<sub>E</sub>≈V<sub>CC</sub>/(2I<sub>C</sub>); R<sub>E</sub>≈0,1·V<sub>CC</sub>/I<sub>C</sub>; divizor cu I<sub>div</sub>≈10·I<sub>B</sub>, U<sub>B</sub>=U<sub>E</sub>+0,7; condensatoarele dimensionate pentru frecvența joasă. Verifici câștigul și excursia."},
{n:37,t:5,q:"Analiza de semnal mic la frecvența medie a amplificatorului EC.",
 a:"La frecvența medie condensatoarele = scurtcircuite, capacitățile parazite neglijabile. Cu modelul de semnal mic: A<sub>u</sub>≈−g<sub>m</sub>·(R<sub>C</sub>‖R<sub>S</sub>); Z<sub>in</sub>=R<sub>B</sub>‖r<sub>be</sub>; Z<sub>out</sub>≈R<sub>C</sub>. Câștigul e maxim și constant (palierul caracteristicii de frecvență)."},
{n:38,t:5,q:"Rezistența de ieșire a etajului amplificator.",
 a:"Z<sub>out</sub> = rezistența văzută dinspre sarcină, cu intrarea pasivizată. Pentru EC: Z<sub>out</sub>≈R<sub>C</sub> (‖ r<sub>ce</sub>, mare). Pentru CC: Z<sub>out</sub>≈r<sub>e</sub>+R<sub>gen</sub>/(1+β) (mică). Z<sub>out</sub> mică = comportare de sursă de tensiune bună pentru sarcină."},
{n:39,t:5,q:"Amplificarea la curenți înalți. Analiza etajului EC cu tranzistor bipolar pentru semnal variabil.",
 a:"La semnal mare excursia se apropie de saturație/blocare → apar distorsiuni neliniare (limitarea vârfurilor). Se analizează cu <b>dreapta de sarcină dinamică</b> (în c.a. R<sub>sarcină</sub>=R<sub>C</sub>‖R<sub>L</sub>). Excursia maximă fără distorsiuni e limitată de poziția lui Q."},
{n:40,t:5,q:"Reacții în amplificatori. Tipuri de reacție.",
 a:"Reacție = o parte din semnalul de ieșire se readuce la intrare. <b>Pozitivă</b> (în fază, mărește câștigul → oscilatoare) și <b>negativă</b> (în antifază, stabilizează). După mărimea prelevată/aplicată: serie/paralel, de tensiune/curent."},
{n:41,t:5,q:"Categoriile de reacții în amplificatoare și modul de realizare. Exemple.",
 a:"4 topologii: serie-tensiune, serie-curent, paralel-tensiune, paralel-curent. Exemple: R<sub>E</sub> nedecuplat = reacție serie-curent (mărește Z<sub>in</sub>, stabilizează câștigul); R<sub>B</sub> colector-bază = paralel-tensiune (scade Z<sub>in</sub> și Z<sub>out</sub>)."},
{n:42,t:5,q:"Reacții în amplificator. Reacție globală și locală.",
 a:"<b>Locală:</b> în jurul unui singur etaj (ex. R<sub>E</sub> al unui etaj). <b>Globală:</b> de la ieșirea finală înapoi la intrarea primului etaj (cuprinde tot lanțul) — controlează mai bine câștigul total și distorsiunile, dar are risc mai mare de instabilitate (autooscilație)."},
{n:43,t:5,q:"Influența reacției negative asupra performanțelor. Influența asupra caracteristicii amplitudine–frecvență.",
 a:"A=a/(1+a·f), F=1+a·f. RN reduce câștigul de F ori, dar reduce distorsiunile și zgomotul de F ori și <b>lărgește banda</b> de F ori (produsul câștig×bandă ≈ const), aplatizând caracteristica amplitudine-frecvență."},
{n:44,t:5,q:"Influența reacției negative asupra impedanțelor de intrare și ieșire ale amplificatorului.",
 a:"Depinde de topologie. Reacția <b>serie</b> mărește Z<sub>in</sub> (×F); <b>paralel</b> o micșorează (÷F). Reacția de <b>tensiune</b> micșorează Z<sub>out</sub> (÷F); de <b>curent</b> o mărește (×F). Astfel se proiectează impedanțele dorite."},
{n:45,t:5,q:"Amplificatoare de putere. Etaje finale de amplificare cu și fără transformatoare. Modele de etaje finale. Calculul parametrilor de bază.",
 a:"Etajul final livrează putere în sarcină (ex. difuzor). <b>Cu transformator:</b> adaptare de impedanță, η≈50% (clasa A). <b>Fără transformator</b> (OTL, push-pull B/AB): η≈78%. Calcul: P<sub>ies</sub>=U²/(2R<sub>L</sub>), puterea disipată pe tranzistor, alegerea după P<sub>max</sub>, U<sub>CE max</sub>, I<sub>C max</sub>."},
{n:46,t:5,q:"Clasele de amplificare și construirea amplificatoarelor electronice. Etajele de amplificare clasa A.",
 a:"(vezi clasele A/AB/B/C). Etajul <b>clasa A</b>: un tranzistor care conduce permanent, Q la mijlocul dreptei de sarcină; folosit în etaje preliminare și finale de mică putere, unde fidelitatea contează mai mult decât randamentul."},
{n:47,t:5,q:"Cuplarea directă a amplificatoarelor.",
 a:"Ieșirea unui etaj legată direct (galvanic) la intrarea următorului, fără condensator. <b>Avantaj:</b> amplifică și c.c. (f<sub>jos</sub>=0), fără componente reactive mari. <b>Dezavantaj:</b> derivă de nivel cu temperatura (PSF-urile se influențează reciproc), proiectare mai dificilă."},
{n:48,t:5,q:"Cuplarea RC (rezistență, capacitate) a amplificatoarelor.",
 a:"Etajele legate prin condensator de cuplaj + rezistențe. C blochează c.c. (PSF-uri independente) și trece c.a. <b>Avantaj:</b> simplu, etaje independente. <b>Dezavantaj:</b> nu amplifică c.c., iar câștigul scade la frecvențe joase (din cauza lui C)."},
{n:49,t:5,q:"Amplificatoare diferențiale. Schema, principiul de funcționare, obținerea semnalelor. Diagrama de potențiale în circuitele de ieșire.",
 a:"Două TB simetrice cu emitoarele comune, alimentate de o sursă de curent. Amplifică <b>diferența</b> u<sub>d</sub>=u₁−u₂ și respinge modul comun. Ieșire simetrică sau asimetrică. Stă la baza AO; CMRR mare = calitate."},
{n:50,t:5,q:"Excitarea pe mod comun a amplificatoarelor diferențiale.",
 a:"Ambele intrări cu același semnal (u₁=u₂). Ideal ieșirea diferențială = 0. Amplificarea de mod comun A<sub>cm</sub> e mică (cu cât sursa de curent din emitor e mai bună, cu atât A<sub>cm</sub>→0). CMRR=A<sub>d</sub>/A<sub>cm</sub>."},
{n:51,t:5,q:"Excitarea diferențială cu semnale mici.",
 a:"Intrări în antifază (u₁=−u₂). Amplificarea diferențială A<sub>d</sub>=g<sub>m</sub>·R<sub>C</sub> (mare). Punctul median al emitoarelor rămâne fix („masă virtuală”) → se analizează ca jumătate de etaj EC."},
{n:52,t:5,q:"Amplificatorul operațional. Etajul diferențial ideal. Regimul de repaus.",
 a:"AO = amplificator diferențial cu A<sub>d</sub>→∞, Z<sub>in</sub>→∞, Z<sub>out</sub>→0, bandă largă. Ideal: curenții de intrare = 0 și u<sub>+</sub>=u<sub>−</sub> (la reacție negativă). În repaus: intrări la masă, ieșire ≈0 (offset mic). Folosit cu reacție pentru funcții precise."},
{n:53,t:5,q:"Oscilatoare.",
 a:"Circuit care generează singur un semnal periodic (fără semnal de intrare), convertind energia c.c. în c.a. Conține amplificator + reacție pozitivă + element selectiv de frecvență. Tipuri: armonice (sinusoidale) și de relaxare (nesinusoidale)."},
{n:54,t:5,q:"Principiul de funcționare a oscilatoarelor armonice.",
 a:"Reacție pozitivă cu condiția <b>Barkhausen</b>: |a·f|=1 (modul) și defazaj total = 0 (360°). Pornesc din zgomot; amplitudinea se stabilizează prin limitarea câștigului. Frecvența e dată de circuitul selectiv (RC sau LC)."},
{n:55,t:5,q:"Oscilatoare armonice OA de tip RC și LC.",
 a:"<b>RC</b> (rețea de defazare / punte Wien): frecvențe joase (audio), f=1/(2πRC). <b>LC</b> (Hartley, Colpitts): frecvențe înalte (RF), f=1/(2π√(LC)). Cele LC folosesc un circuit rezonant ca element selectiv."},
{n:56,t:5,q:"Oscilatoare armonice de tip RC și LC. Noțiuni generale, clasificarea, condițiile de autoexcitare. Oscilații LC.",
 a:"Autoexcitare: a·f≥1 și defazaj total = 0 (Barkhausen). În LC circuitul oscilant schimbă energia între câmpul magnetic și cel electric (f=1/(2π√LC)); amplificatorul compensează pierderile. Clasificare: RC (joase), LC (înalte), cu cuarț (foarte stabile)."},
{n:57,t:5,q:"Oscilatoare cu rețea „dublu T”.",
 a:"Folosesc o rețea dublu-T (filtru opreste-bandă RC) în bucla de reacție. Rețeaua are minim la f₀=1/(2πRC); plasată pe calea reacției negative, oscilatorul lucrează la f₀. Frecvențe joase, stabilitate bună, fără bobine."},

/* ===== TEMA 3 — Surse de alimentare: stabilizatoare, redresoare, filtre (Î58–Î66, 69, 70) ===== */
{n:58,t:3,q:"Stabilizatoare de tensiune. Stabilizatoarele parametrice cu diode Zener.",
 a:"<b>Parametric:</b> R în serie + diodă Zener în paralel cu sarcina; Zener (polarizat invers la U<sub>Z</sub>) menține U<sub>ies</sub>≈U<sub>Z</sub> constant. Simplu, dar randament mic și curent limitat. Coeficient de stabilizare = ΔU<sub>in</sub>/ΔU<sub>ies</sub>."},
{n:59,t:3,q:"Stabilizatoarele de compensare.",
 a:"Cu reacție: compară U<sub>ies</sub> cu o referință (Zener) și comandă un element de reglare (tranzistor serie) pentru a corecta abaterile. Mult mai precise decât cele parametrice (S mare); folosite în surse reglabile (ex. cu AO ca amplificator de eroare)."},
{n:60,t:3,q:"Stabilizator parametric. Calculul stabilizatorului.",
 a:"Se alege Zener cu U<sub>Z</sub>≈U<sub>ies</sub>. R=(U<sub>in</sub>−U<sub>Z</sub>)/(I<sub>Z</sub>+I<sub>S</sub>). Condiții: I<sub>Z min</sub> la U<sub>in</sub> minim / sarcină maximă; I<sub>Z max</sub> (≤P<sub>Z</sub>/U<sub>Z</sub>) la U<sub>in</sub> maxim / mers în gol. Se verifică puterea pe Zener și pe R."},
{n:61,t:3,q:"Elemente de ameliorare a tensiunii redresate. Filtre de netezire.",
 a:"După redresare urmează un filtru ce reduce riplul: <b>C</b> în paralel (se descarcă lent prin R<sub>L</sub>), <b>L</b> în serie (se opune variației), combinații <b>LC / CLC (π)</b> pentru riplu foarte mic. Riplul scade când R<sub>L</sub>·C crește și la redresarea bialternanță."},
{n:62,t:3,q:"Regulatoare de tensiune. Diagrama bloc și principiul de funcționare.",
 a:"Bloc: referință + amplificator de eroare + element de reglare + reacție (divizor). Compară o fracțiune din U<sub>ies</sub> cu referința și ajustează elementul serie pentru U<sub>ies</sub> constant. Integrate: 78xx (pozitiv), 79xx (negativ), LM317 (reglabil)."},
{n:63,t:3,q:"Principiul de funcționare și calculul schemei din proiectul de an.",
 a:"Sursa de alimentare a proiectului: transformator → punte redresoare → filtru C → stabilizator. Calcul: U₂ din U<sub>ies</sub>+pierderi, C din riplul admis (C≈I·t/ΔU), alegerea diodelor (U<sub>inv</sub>, I), dimensionarea stabilizatorului."},
{n:64,t:3,q:"Surse de alimentare. Redresoare monoalternanță.",
 a:"O singură diodă; conduce o semialternanță. U<sub>med</sub>=U<sub>max</sub>/π≈0,318·U<sub>max</sub>, frecvența riplului = f<sub>rețea</sub> (50 Hz). Simplu, dar riplu mare și randament slab; folosit la puteri mici."},
{n:65,t:3,q:"Surse de alimentare. Redresoare bialternanță (cu priză mediană).",
 a:"2 diode + transformator cu priză mediană; conduc ambele semialternanțe. U<sub>med</sub>=2U<sub>max</sub>/π≈0,637·U<sub>max</sub>, frecvența riplului = 2·f<sub>rețea</sub> (100 Hz) → filtrare mai ușoară. Necesită priză mediană."},
{n:66,t:3,q:"Surse de alimentare. Redresoare bialternanță în punte (Graetz).",
 a:"4 diode, fără priză mediană; folosește toată înfășurarea secundară. U<sub>med</sub>=2U<sub>max</sub>/π (minus 2 căderi de diodă), frecvența riplului = 100 Hz. Cel mai folosit; dezavantaj: 2 diode conduc simultan (pierderi puțin mai mari)."},
{n:69,t:3,q:"Filtre pasive. Filtru de tip C, LC, RC, CLC.",
 a:"<b>C:</b> condensator în paralel pe sarcină (simplu). <b>RC:</b> R serie + C paralel (ieftin, pierderi pe R). <b>LC:</b> L serie + C paralel (riplu mic, pierderi mici). <b>CLC (π):</b> C-L-C, cea mai bună netezire. Scopul: separarea componentei continue de cea alternativă (riplul)."},
{n:70,t:3,q:"Filtru stop-bandă capacitiv. Schema și calculele.",
 a:"Filtru care atenuează o bandă de frecvențe (în jurul lui f₀) și trece restul. Realizat cu circuite L-C acordate (serie/derivație) sau rețea dublu-T RC. f₀=1/(2π√(LC)); lățimea benzii ∝ 1/Q. Folosit pentru eliminarea unei frecvențe nedorite."},

/* ===== TEMA 6 — TEC-MOS (Î67–Î68) ===== */
{n:67,t:6,q:"TEC-MOS cu joncțiune p-n, TEC-J.",
 a:"Canal semiconductor (n sau p) cu grila-joncțiune polarizată invers; câmpul îngustează canalul, controlând I<sub>D</sub>. I<sub>D</sub>=I<sub>DSS</sub>(1−V<sub>GS</sub>/V<sub>P</sub>)². V<sub>GS</sub>=0→I<sub>D</sub>=I<sub>DSS</sub>; V<sub>GS</sub>=V<sub>P</sub>→blocare. Z<sub>in</sub> mare, zgomot mic, comandat în tensiune."},
{n:68,t:6,q:"TEC-MOS cu canal indus. Circuitul de polarizare a tranzistorului.",
 a:"Canalul apare doar la V<sub>GS</sub>>V<sub>T</sub> (îmbogățire). I<sub>D</sub>=k(V<sub>GS</sub>−V<sub>T</sub>)². Polarizare: divizor în grilă + R<sub>S</sub>, sau cu reacție grilă-drenă (V<sub>GS</sub>=V<sub>DS</sub>), asigurând V<sub>GS</sub>>V<sub>T</sub> stabil. Folosit masiv în digital (CMOS) și comutație."}

];

/* Structura biletului: 3 întrebări teoretice (din teme diferite) + 1 problemă */
function genBilet(){
  // grupăm cele 70 de întrebări pe teme și alegem 3 teme distincte
  const byT={}; THEORY_QA.forEach(x=>{(byT[x.t]=byT[x.t]||[]).push(x);});
  const teme=Object.keys(byT);
  for(let i=teme.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[teme[i],teme[j]]=[teme[j],teme[i]];}
  const chosen=teme.slice(0,3).map(t=>R.pick(byT[t]));
  const gen=R.pick(GENERATORS);
  return {questions:chosen, problem:gen.fn(), problemName:gen.name};
}
