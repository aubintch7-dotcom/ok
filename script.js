/* ========================================================
   ⚙️  CONFIGURATION — MODIFIEZ UNIQUEMENT CES 3 LIGNES
   ======================================================== */
const CONFIG = {
  WEB3FORMS_KEY : "cebd0d6d-2bd4-404a-a5fb-c99d5a6d30cb",  // Access Key web3forms.com
  PHONE         : "+1 902 418 4618",       // numéro affiché sur le site
  EMAIL         : "uabquickloan@gmail.com"  // email affiché sur le site
};
/* ======================================================== */
ak.value=CONFIG.WEB3FORMS_KEY;
lTel.textContent=CONFIG.PHONE;lTel.href='tel:'+CONFIG.PHONE.replace(/[^+\d]/g,'');
lMail.textContent=CONFIG.EMAIL;lMail.href='mailto:'+CONFIG.EMAIL;

/* ===== particules ===== */
const c=document.getElementById('bg'),x=c.getContext('2d');let P=[],W,H;
function rs(){W=c.width=innerWidth;H=c.height=innerHeight;P=[];const n=Math.min(80,Math.floor(W/20));
 for(let i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.7+.5});}
addEventListener('resize',rs);rs();
const M={x:-9e3,y:-9e3};
addEventListener('mousemove',e=>{M.x=e.clientX;M.y=e.clientY;spot.style.left=e.clientX+'px';spot.style.top=e.clientY+'px';});
(function loop(){const light=document.documentElement.dataset.theme==='light';
 x.clearRect(0,0,W,H);
 for(const p of P){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
  x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fillStyle=light?'rgba(40,80,170,.45)':'rgba(180,210,255,.65)';x.fill();}
 for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const a=P[i],b=P[j],d=Math.hypot(a.x-b.x,a.y-b.y);
  if(d<140){x.strokeStyle=(light?'rgba(40,90,200,':'rgba(120,175,255,')+(1-d/140)*.28+')';x.lineWidth=.7;
   x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke();}}
 for(const p of P){const d=Math.hypot(p.x-M.x,p.y-M.y);if(d<190){x.strokeStyle='rgba(25,211,162,'+(1-d/190)*.42+')';x.lineWidth=.8;
  x.beginPath();x.moveTo(p.x,p.y);x.lineTo(M.x,M.y);x.stroke();}}
 requestAnimationFrame(loop);})();

/* ===== thème / menu ===== */
function toggleTheme(){const r=document.documentElement,n=r.dataset.theme==='dark'?'light':'dark';
 r.dataset.theme=n;tgl.textContent=n==='dark'?'🌙':'☀️';localStorage.setItem('theme',n);}
if(localStorage.getItem('theme')==='light'){document.documentElement.dataset.theme='light';tgl.textContent='☀️';}
function mm(){const m=document.getElementById('mmenu');m.style.display=m.style.display==='flex'?'none':'flex';}

/* ===== calculateur ===== */
const RATE=.03;   // ← taux d'intérêt annuel : 3%
const fmt=n=>new Intl.NumberFormat(lang==='uk'?'uk-UA':'en-CA').format(Math.round(n));
function fill(el){el.style.setProperty('--p',((el.value-el.min)/(el.max-el.min)*100)+'%');}
function setAmt(v){amt.value=v;calc();}
function calc(){const a=+amt.value,t=+trm.value,r=RATE/12,m=a*r/(1-Math.pow(1+r,-t));
 fill(amt);fill(trm);amtv.textContent=fmt(a)+' ₴';trmv.textContent=t;
 mp.textContent=fmt(m)+' ₴';tt.textContent=fmt(m*t)+' ₴';ovr.textContent=fmt(m*t-a)+' ₴';
 rt.textContent='3%';
 f_amt.value=a;f_trm.value=t;hMp.value=fmt(m)+' ₴';
 sA.textContent=fmt(a)+' ₴';sT.textContent=t+' '+(lang==='uk'?'міс.':'mo.');sM.textContent=fmt(m)+' ₴';}


/* ===== synchronisation formulaire → calculateur ===== */
function syncFromForm(){
 const a=+f_amt.value,t=+f_trm.value;
 if(a>=5000&&a<=100000000)amt.value=a;
 if(t>=3&&t<=60)trm.value=t;
 calc();}
f_amt.addEventListener('input',syncFromForm);
f_trm.addEventListener('input',syncFromForm);

/* ===== téléphone international (tous pays) ===== */
f_tel.addEventListener('input',e=>{
 const el=e.target;
 // on garde uniquement les chiffres, espaces, tirets, parenthèses et un « + » en tête
 let v=el.value.replace(/[^\d+\s().-]/g,'');
 v=v.replace(/(?!^)\+/g,'');            // un seul « + », au début
 const digits=v.replace(/\D/g,'');
 if(digits.length>15)return;            // maximum international (norme E.164)
 el.value=v;});
f_tel.addEventListener('blur',e=>{      // ajoute « + » si l'utilisateur ne l'a pas mis
 const el=e.target,d=el.value.replace(/\D/g,'');
 if(d&&!el.value.trim().startsWith('+'))el.value='+'+el.value.trim();});

/* ===== assistant + validation ===== */
let step=1;
const E={fio:["Вкажіть ім'я та прізвище","Please enter your full name"],
 tel:["Введіть коректний номер телефону з кодом країни, напр. +380 67 123 45 67","Enter a valid phone number with country code, e.g. +380 67 123 45 67"],
 mail:["Введіть коректний email","Enter a valid email address"],
 amt:["Сума від 5 000 до 100 000 000 ₴","Amount between 5,000 and 100,000,000 ₴"],
 trm:["Строк від 3 до 60 місяців","Term between 3 and 60 months"],
 inc:["Вкажіть ваш щомісячний дохід","Please enter your monthly income"],
 agree:["Потрібна згода на обробку даних","You must accept the data processing terms"]};
function bad(k,el){const e=document.querySelector('[data-e="'+k+'"]');e.textContent=E[k][lang==='uk'?0:1];e.classList.add('on');if(el)el.classList.add('bad');return false;}
function good(k,el){document.querySelector('[data-e="'+k+'"]').classList.remove('on');if(el)el.classList.remove('bad');return true;}
function valid(p){let ok=true;
 if(p===1){f_fio.value.trim().length>=5?good('fio',f_fio):ok=bad('fio',f_fio);
  (()=>{const d=f_tel.value.replace(/\D/g,'');return d.length>=7&&d.length<=15;})()?good('tel',f_tel):ok=bad('tel',f_tel);
  /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(f_mail.value)?good('mail',f_mail):ok=bad('mail',f_mail);}
 if(p===2){(+f_amt.value>=5000&&+f_amt.value<=100000000)?good('amt',f_amt):ok=bad('amt',f_amt);
  (+f_trm.value>=3&&+f_trm.value<=60)?good('trm',f_trm):ok=bad('trm',f_trm);}
 if(p===3){(+f_inc.value>0)?good('inc',f_inc):ok=bad('inc',f_inc);
  agree.checked?good('agree'):ok=bad('agree');}
 return ok;}
const TITLES=[["Контактні дані","Contact details"],["Параметри кредиту","Loan parameters"],["Ваш профіль","Your profile"]];
function go(n){if(n>step&&!valid(step))return;
 step=n;document.querySelectorAll('.pane').forEach(p=>p.classList.toggle('on',+p.dataset.p===n));
 [w1,w2,w3].forEach((w,i)=>w.classList.toggle('done',i<n));
 sN.textContent=n;sTtl.textContent=TITLES[n-1][lang==='uk'?0:1];
 document.getElementById('form').scrollIntoView({behavior:'smooth',block:'center'});}

/* ===== traducteur UA / EN ===== */
let lang='uk';
const T={brand:["Швидке Фінансування","Fast Financing"],
nav1:["Як це працює","How it works"],nav2:["Калькулятор","Calculator"],nav3:["Питання","FAQ"],nav4:["Запросити кредит","Request a loan"],nav5:["Відгуки","Reviews"],nav6:["Тарифи","Rates"],
eyebrow:["Головний офіс у Канаді · Закон PIPEDA","Head office in Canada · PIPEDA compliant"],
h1a:["Кредит до","Loan up to"],h1b:["на рахунок за 5 хвилин","in your account in 5 minutes"],
sub:["Без довідок, без поручителів, без візиту до офісу. Автоматичне рішення та переказ на рахунок будь-якого канадського банку — цілодобово, 7 днів на тиждень.","No paperwork, no guarantors, no office visit. Automated decision and transfer to any Canadian bank account — 24 hours a day, 7 days a week."],
cta:["Запросити кредит","Request a loan"],cta2:["Розрахувати платіж","Calculate payment"],
min:["хв","min"],s1:["термін схвалення","approval time"],s2:["схвалень","approval rate"],s3:["клієнтів","clients"],s4:["онлайн-підтримка","online support"],
calc:["Кредитний калькулятор","Loan calculator"],amount:["Сума кредиту","Loan amount"],term:["Строк погашення","Repayment term"],mo:["міс.","mo."],
mp:["Щомісячний платіж","Monthly payment"],rate:["Ставка","Interest rate"],over:["Переплата","Total interest"],total:["Разом до повернення","Total repayment"],
apply:["Запросити кредит на цих умовах","Request a loan on these terms"],
advE:["Переваги","Advantages"],advt:["Чому обирають нас","Why clients choose us"],
a1:["Миттєве рішення","Instant decision"],a1d:["Автоматичний скоринг перевіряє заявку за 5 хвилин — без дзвінків і очікування.","Automated scoring reviews your application in 5 minutes — no calls, no waiting."],
a2:["Безпека даних","Data security"],a2d:["Шифрування SSL/TLS і повна відповідність канадському закону PIPEDA.","SSL/TLS encryption and full compliance with Canada's PIPEDA privacy law."],
a3:["Чесна ставка","Fair rate"],a3d:["Лише 3% річних. Без прихованих комісій, нав'язаних страховок і штрафів.","Only 3% per year. No hidden fees, forced insurance or penalties."],
a4:["Будь-який банк","Any bank"],a4d:["Переказ на рахунок RBC, TD, Scotiabank, BMO, CIBC, Desjardins та інших.","Transfer to RBC, TD, Scotiabank, BMO, CIBC, Desjardins and other accounts."],
a5:["Дострокове погашення","Early repayment"],a5d:["Закривайте кредит будь-якого дня без перерахунку відсотків і комісій.","Close your loan any day with no recalculation and no fees."],
a6:["Будь-яка історія","Any credit history"],a6d:["Розглядаємо заявки клієнтів із простроченнями та низьким кредитним рейтингом.","We review applications from clients with arrears and low credit scores."],
howE:["Процес","Process"],howt:["Три кроки до грошей на рахунку","Three steps to money in your account"],
st1:["Заповніть заявку","Fill in the application"],st1d:["Онлайн-анкета займає 2 хвилини. Потрібне лише посвідчення особи.","The online form takes 2 minutes. Only a government ID is required."],
st2:["Отримайте рішення","Get a decision"],st2d:["Скоринг працює автоматично, відповідь надходить за 5 хвилин.","Automated scoring gives you an answer within 5 minutes."],
st3:["Заберіть гроші","Receive the money"],st3d:["Переказ Interac або на банківський рахунок протягом 15 хвилин.","Interac e-Transfer or direct deposit within 15 minutes."],
rE:["Тарифи","Rates"],rt2:["Прозорі умови","Transparent terms"],rs:["Єдина ставка 3% річних для всіх програм. Жодних прихованих платежів.","A single rate of 3% per year for every programme. No hidden charges."],
th1:["Програма","Programme"],th2:["Сума","Amount"],th3:["Строк","Term"],th4:["Ставка","Rate"],th5:["Рішення","Decision"],
pr1:["Експрес","Express"],pr2:["Стандарт","Standard"],pr3:["Преміум","Premium"],pr4:["Рефінансування","Refinancing"],
ftE:["Заявка","Application"],ft:["Оформіть кредит онлайн","Apply for your loan online"],
fs:["Заповніть три короткі кроки — менеджер зв'яжеться з вами протягом 15 хвилин. Заявка не впливає на кредитну історію.","Complete three short steps — a manager will contact you within 15 minutes. Applying does not affect your credit score."],
sum1:["Сума","Amount"],sum2:["Строк","Term"],sum3:["Платіж на місяць","Monthly payment"],sum4:["Ставка","Rate"],
secure:["🔒 Дані передаються захищеним каналом і не передаються третім особам.","🔒 Your data is sent over a secure channel and never shared with third parties."],
stepw:["Крок","Step"],
fio:["Повне ім'я *","Full name *"],phone:["Телефон (з кодом країни) *","Phone (with country code) *"],email:["Email *","Email *"],city:["Місто / провінція","City / province"],
famount:["Сума, ₴ *","Amount, ₴ *"],fterm:["Строк, місяців *","Term, months *"],
purpose:["Мета кредиту","Loan purpose"],p1:["Особисті потреби","Personal needs"],p2:["Ремонт житла","Home renovation"],p3:["Авто","Car"],p4:["Рефінансування","Refinancing"],p5:["Бізнес","Business"],p6:["Інше","Other"],
emp:["Зайнятість","Employment"],e1:["Найманий працівник","Employee"],e2:["Самозайнятий / підприємець","Self-employed"],e3:["Пенсіонер","Retired"],e4:["Інше","Other"],
inc:["Дохід на місяць, ₴ *","Monthly income, ₴ *"],bank:["Банк для переказу","Bank for the transfer"],cmt:["Коментар","Comment"],
agree:["Я погоджуюсь на обробку персональних даних згідно із законом PIPEDA та з умовами договору.","I consent to the processing of my personal data under PIPEDA and accept the terms."],
next:["Далі","Next"],send:["Надіслати заявку","Submit application"],
revE:["Відгуки","Reviews"],revt:["Нам довіряють 640 000 клієнтів","Trusted by 640,000 clients"],
r1:["«Подала заявку ввечері, гроші надійшли на рахунок TD за 12 хвилин. Жодних довідок не просили.»","\u201cI applied in the evening and the money reached my TD account in 12 minutes. No documents requested.\u201d"],
r2:["«Була прострочка в минулому, інші банки відмовляли. Тут схвалили 300 000 ₴ під адекватний відсоток.»","\u201cI had arrears in the past and other banks refused. Here I was approved for 300,000 ₴ at a fair rate.\u201d"],
r3:["«Зрозумілий калькулятор, реальна ставка збіглася з розрахунком. Погасила достроково без комісій.»","\u201cClear calculator, the real rate matched the estimate. I repaid early with no fees.\u201d"],
faqt:["Часті запитання","Frequently asked questions"],
q1:["Які документи потрібні?","Which documents do I need?"],q1a:["Лише державне посвідчення особи та банківський рахунок, оформлений на ваше ім'я. Довідка про доходи не потрібна.","Only a government-issued ID and a bank account in your own name. No income certificate needed."],
q2:["Чи можна отримати кредит з поганою кредитною історією?","Can I get a loan with a bad credit history?"],q2a:["Так. Ми розглядаємо заявки клієнтів із будь-якою кредитною історією, включно з поточними простроченнями до 60 днів.","Yes. We review applications with any credit history, including current arrears of up to 60 days."],
q3:["Як швидко надійдуть гроші?","How fast will I get the money?"],q3a:["Після схвалення переказ займає від 1 до 15 хвилин, у будь-який час доби, включно з вихідними та святами.","After approval the transfer takes 1 to 15 minutes, at any hour, including weekends and holidays."],
q4:["Чи можна погасити достроково?","Can I repay early?"],q4a:["Так, дострокове погашення доступне з першого дня без штрафів, комісій і попереднього повідомлення.","Yes, early repayment is available from day one with no penalties, fees or prior notice."],
q5:["Чи впливає заявка на кредитну історію?","Does applying affect my credit score?"],q5a:["Попередній розрахунок і надсилання анкети не впливають на рейтинг. Запит до кредитного бюро робиться лише після вашої згоди.","The estimate and the form do not affect your score. A credit bureau request is made only with your consent."],
q6:["З якого віку можна оформити кредит?","What is the age requirement?"],q6a:["З 19 років до 70 років, за наявності законного статусу проживання в Канаді.","From 19 to 70 years old, with legal residency status in Canada."],
bt:["Гроші потрібні сьогодні?","Need the money today?"],bs:["Заповніть заявку за 2 хвилини та отримайте рішення до кінця цієї сторінки.","Fill in the form in 2 minutes and get a decision before you finish this page."],
fdesc:["Онлайн-сервіс підбору та видачі кредитів на банківські рахунки на всій території Канади.","Online service for matching and issuing loans to bank accounts across Canada."],
fnav:["Розділи","Sections"],fcont:["Контакти","Contacts"],
faddr:["Головний офіс: Галіфакс, Нова Шотландія, Канада","Head office: Halifax, Nova Scotia, Canada"],
fwork:["Пн–Нд, цілодобово","Mon–Sun, 24/7"],
foot:["© 2026 Швидке Фінансування (Financement Rapide). Інформація на сайті не є публічною офертою. Ставка 3% річних. Сума від 5 000 до 100 000 000 ₴, строк від 3 до 60 місяців. Приклад: 150 000 ₴ на 12 міс. під 3% — платіж 12 704 ₴/міс.","© 2026 Fast Financing (Financement Rapide). Information on this site is not a public offer. Rate 3% per year. Amount from 5,000 to 100,000,000 ₴, term from 3 to 60 months. Example: 150,000 ₴ for 12 months at 3% — 12,704 ₴/month."],
okT:["Заявку надіслано!","Application sent!"],okS:["Менеджер зв'яжеться з вами протягом 15 хвилин.","A manager will contact you within 15 minutes."],okB:["Закрити","Close"],
tk:["схвалено кредит","loan approved"],
tkc:[["Торонто","Монреаль","Ванкувер","Калгарі","Оттава","Едмонтон","Вінніпег","Галіфакс","Квебек","Міссісога"],
     ["Toronto","Montreal","Vancouver","Calgary","Ottawa","Edmonton","Winnipeg","Halifax","Quebec City","Mississauga"]]};
function setLang(l){lang=l;const i=l==='uk'?0:1;
 document.querySelectorAll('[data-i18n]').forEach(e=>{const v=T[e.dataset.i18n];if(v)e.textContent=v[i];});
 document.documentElement.lang=l;uk.classList.toggle('on',l==='uk');en.classList.toggle('on',l==='en');
 document.title=l==='uk'?'Швидке Фінансування — Онлайн-кредити в Канаді':'Fast Financing — Online loans in Canada';
 sTtl.textContent=TITLES[step-1][i];okT.textContent=T.okT[i];okS.textContent=T.okS[i];okB.textContent=T.okB[i];
 document.querySelectorAll('.err.on').forEach(e=>e.textContent=E[e.dataset.e][i]);
 localStorage.setItem('lang',l);calc();ticker();}

/* ===== bandeau d'approbations ===== */
function ticker(){const i=lang==='uk'?0:1,ct=T.tkc[i],out=[];
 for(let k=0;k<12;k++){const s=[150000,450000,900000,1500000,3000000,5500000,12000000,24000000,45000000,80000000][k%10];
  out.push('<span>✅ <b>'+ct[k%ct.length]+'</b> — '+T.tk[i]+' '+new Intl.NumberFormat(i?'en-CA':'uk-UA').format(s)+' ₴</span>');}
 tick.innerHTML=out.join('')+out.join('');}

/* ===== envoi Web3Forms ===== */
document.getElementById('loanForm').addEventListener('submit',async e=>{
 e.preventDefault();if(!valid(3))return;syncFromForm();
 const f=e.target,b=sbt,m=msg,i=lang==='uk'?0:1;
 if(!CONFIG.WEB3FORMS_KEY||CONFIG.WEB3FORMS_KEY.startsWith('VOTRE')){
  m.className='msg err';m.textContent=i?'Web3Forms access key is not configured yet.':'Ключ Web3Forms ще не вказано в налаштуваннях сайту.';return;}
 b.disabled=true;b.textContent=i?'Sending…':'Надсилання…';m.className='msg';
 try{const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{Accept:'application/json'},body:new FormData(f)});
  const j=await r.json();
  if(j.success){f.reset();go(1);calc();document.getElementById('ov').classList.add('on');}
  else{m.className='msg err';m.textContent=(i?'Submission error: ':'Помилка надсилання: ')+(j.message||'');}
 }catch(err){m.className='msg err';m.textContent=i?'Network error. Please try again.':'Помилка мережі. Перевірте з\'єднання і спробуйте ще раз.';}
 b.disabled=false;b.textContent=T.send[i];});

/* ===== scroll : progression, parallaxe, apparition, compteurs ===== */
const para=document.getElementById('para'),pimg=para.querySelector('.pimg');
addEventListener('scroll',()=>{
 prog.style.width=(scrollY/(document.body.scrollHeight-innerHeight)*100)+'%';
 const r=para.getBoundingClientRect();
 if(r.top<innerHeight&&r.bottom>0)pimg.style.setProperty('--py',((r.top-innerHeight/2)*-0.09)+'px');
},{passive:true});
document.querySelectorAll('.reveal').forEach(el=>
 new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');o.unobserve(e.target);}}),{threshold:.1}).observe(el));
document.querySelectorAll('.cnt').forEach(el=>
 new IntersectionObserver((es,o)=>es.forEach(e=>{if(!e.isIntersecting)return;o.unobserve(el);
  const to=+el.dataset.to;let s=null;
  const t=k=>{if(!s)s=k;const p=Math.min((k-s)/1300,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(t);};
  requestAnimationFrame(t);}),{threshold:.5}).observe(el));

/* ===== détection automatique de la langue selon le pays/navigateur =====
   Priorité : 1) choix déjà fait par le visiteur  2) pays et langue du navigateur
   Langue principale par défaut : ukrainien                                   */
function detectLang(){
 const saved=localStorage.getItem('lang');
 if(saved==='uk'||saved==='en')return saved;                  // choix manuel prioritaire
 const list=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'uk']);
 let tz='';try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||'';}catch(e){}
 const ukTZ=/Kyiv|Kiev|Uzhgorod|Zaporozhye|Simferopol/i.test(tz);
 const ukLang=list.some(l=>/^uk\b|^uk-/i.test(l));            // ukrainien
 const ukRegion=list.some(l=>/-UA$/i.test(l));                 // pays = Ukraine
 if(ukLang||ukRegion||ukTZ)return 'uk';                        // clients ukrainiens
 if(list.some(l=>/^en\b|^en-/i.test(l)))return 'en';           // anglophones
 if(list.some(l=>/^(ru|pl|de|fr|cs|sk|bg|ro|be|lt|lv|et|hu)\b/i.test(l)))return 'uk'; // Europe → ukrainien
 return 'uk';                                                  // langue principale par défaut
}
setLang(detectLang());calc();ticker();
