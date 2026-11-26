
const ZM=window.ZM_SHOP||{price:49,off:20,legacyOff:30,sale:false,tees:[],find:()=>null,sizes:()=>[{l:"S",z:"S",c:["S"]},{l:"M",z:"M",c:["M"]},{l:"L",z:"L",c:["L"]},{l:"XL",z:"XL",c:["XL"]}],norm:(i,z)=>z,label:(i,z)=>z};  /* v3.45: one catalog for game + /shop (public/tees.js) */
const CONFIG={price:ZM.price,off:ZM.off,legacyOff:ZM.legacyOff,sale:ZM.sale, /* v3.38: true = pre-order is open (CTA reserves → /checkout, texts switch). OFF until launch (Roman 16.11 18:05) */ /* v3.17: -20% for new founding members; signed up before 13.11 keep -30% (€34) */xSignup:"", /* X pixel Sign-up event ID, e.g. "tw-rimh2-abc12" (Events Manager) */
  // Production: set to your API (POST JSON {email,tee,size,source,ts}). Empty = demo mode outside claude.ai.
  endpoint:"", confirm:"",
  ig:"https://instagram.com/zeromrrclub", x:"https://x.com/0xtokenburn"};
if(/[?&]preview=sale\b/.test(location.search)) CONFIG.sale=true;   // v3.39c: test the pre-order flow before launch without customers seeing it
const IMG={bf:"/clones/zeromrr-club/img/shop/ceo-of-nothing-front.webp",fq:"/clones/zeromrr-club/img/inline/fq.webp",fs:"/clones/zeromrr-club/img/inline/fs.webp",ff:"/clones/zeromrr-club/img/inline/ff.webp",fb:"/clones/zeromrr-club/img/inline/fb.webp",n2f:"/clones/zeromrr-club/img/inline/n2f.webp",n2b:"/clones/zeromrr-club/img/inline/n2b.webp",n3f:"/clones/zeromrr-club/img/inline/n3f.webp",n3b:"/clones/zeromrr-club/img/inline/n3b.webp",n4f:"/clones/zeromrr-club/img/inline/n4f.webp",n4b:"/clones/zeromrr-club/img/inline/n4b.webp",p2f:"/clones/zeromrr-club/img/inline/p2f.webp",p2q:"/clones/zeromrr-club/img/inline/p2q.webp",p2s:"/clones/zeromrr-club/img/inline/p2s.webp",p2b:"/clones/zeromrr-club/img/inline/p2b.webp",p3f:"/clones/zeromrr-club/img/inline/p3f.webp",p3q:"/clones/zeromrr-club/img/inline/p3q.webp",p3s:"/clones/zeromrr-club/img/inline/p3s.webp",p3b:"/clones/zeromrr-club/img/inline/p3b.webp",p4f:"/clones/zeromrr-club/img/inline/p4f.webp",p4q:"/clones/zeromrr-club/img/inline/p4q.webp",p4s:"/clones/zeromrr-club/img/inline/p4s.webp",p4b:"/clones/zeromrr-club/img/inline/p4b.webp",bb:"/clones/zeromrr-club/img/shop/ceo-of-nothing-back.webp",n6f:"/clones/zeromrr-club/img/inline/n6f.webp",n6b:"/clones/zeromrr-club/img/inline/n6b.webp",p6f:"/clones/zeromrr-club/img/inline/p6f.webp",p6q:"/clones/zeromrr-club/img/inline/p6q.webp",p6s:"/clones/zeromrr-club/img/inline/p6s.webp",p6b:"/clones/zeromrr-club/img/inline/p6b.webp"};
const TEES=[
 {id:"ceo-of-nothing",n1:"CEO of",n2:"Nothing tee",colour:"brown",front:IMG.bf,back:IMG.bb,bf:1,
  print:[["Front","$0 MRR"],["Back","CEO OF NOTHING"]],ink:"#3b2d23",start:Math.PI,who:{p:"Player 2",name:"Friend",f:IMG.ff,q:IMG.fq,s:IMG.fs,b:IMG.fb,hi:{b:"/clones/zeromrr-club/img/hi/fb.webp"}}},
 {id:"book-a-demo",n1:"Book a",n2:"DeMO tee",colour:"sky blue",front:IMG.n2f,back:IMG.n2b,bf:1,
  print:[["Front","$0 MRR, hand-written"],["Back","BOOK A DeMO + your own number"]],ink:"#82bfda",start:Math.PI,who:{p:"Player 2",name:"Friend",f:IMG.p2f,q:IMG.p2q,s:IMG.p2s,b:IMG.p2b,hi:{f:"/clones/zeromrr-club/img/hi/p2f.webp",q:"/clones/zeromrr-club/img/hi/p2q.webp",s:"/clones/zeromrr-club/img/hi/p2s.webp",b:"/clones/zeromrr-club/img/hi/p2b.webp"}},
  ed:"1 of 1 · personalised by you",
  ex:{t:"Exclusive",tag:"1 of 1",d:"Personal edition. Textile marker in the box. You write your own number on the back, so no two are the same.",cap:"Sample number · yours goes here",capS:"Your number here"}},
 {id:"tell-your-investors",n1:"Tell your",n2:"investors tee",colour:"bone",front:IMG.n3f,back:IMG.n3b,bf:1,
  print:[["Front","$0 MRR CLUB"],["Back","TELL YOUR INVESTORS THAT I'M A BIG FAN OF THEIR MONEY"]],ink:"#ccc9c0",start:Math.PI,who:{p:"Player 1",name:"Hero",f:IMG.p3f,q:IMG.p3q,s:IMG.p3s,b:IMG.p3b,hi:{f:"/clones/zeromrr-club/img/hi/p3f.webp",q:"/clones/zeromrr-club/img/hi/p3q.webp",s:"/clones/zeromrr-club/img/hi/p3s.webp",b:"/clones/zeromrr-club/img/hi/p3b.webp"}}},
 {id:"all-revenue-reserved",n1:"All revenue",n2:"reserved tee",colour:"washed sand",oos:1,ed:"Out of stock. Hand-dyed ombré takes longer. Back in Drop 02.",front:IMG.n4f,back:IMG.n4b,bf:1,
  print:[["Front","$0 MRR CLUB"],["Back","0 · DESIGNED IN A GARAGE"]],ink:"#d5c3ae",start:Math.PI,who:{p:"Player 1",name:"Hero",f:IMG.p4f,q:IMG.p4q,s:IMG.p4s,b:IMG.p4b,hi:{f:"/clones/zeromrr-club/img/hi/p4f.webp",q:"/clones/zeromrr-club/img/hi/p4q.webp",s:"/clones/zeromrr-club/img/hi/p4s.webp",b:"/clones/zeromrr-club/img/hi/p4b.webp"}}},
 {id:"you-met-me",n1:"You met me",n2:"$0 MRR tee",colour:"light gray",front:IMG.n6f,back:IMG.n6b,
  print:[["Front","YOU MET ME AT A VERY $0 MRR TIME IN MY LIFE."],["Back","$0 MRR CLUB"]],ink:"#cfccc5",start:0,who:{p:"Player 1",name:"Hero",f:IMG.p6f,q:IMG.p6q,s:IMG.p6s,b:IMG.p6b,hi:{f:"/clones/zeromrr-club/img/hi/p6f.webp",q:"/clones/zeromrr-club/img/hi/p6q.webp",s:"/clones/zeromrr-club/img/hi/p6s.webp",b:"/clones/zeromrr-club/img/hi/p6b.webp"}}}
];
TEES.forEach(t=>{const z=ZM.find(t.id); if(z){ t.colour=z.colour; t.oos=z.oos?1:0 }});   // v3.45: colour/stock from tees.js
const zt=t=>ZM.find(t.id)||{}, szOf=t=>ZM.sizes(t.id), szN=(t,z)=>z?ZM.norm(t.id,z):z, szL=(t,z)=>ZM.label(t.id,z);   // S/M + L/XL tees store M / L
const SIZES=["S","M","L","XL"], OFF=CONFIG.off, PRICE=CONFIG.price, FPRICE=Math.round(PRICE*(100-OFF)/100);
const $=id=>document.getElementById(id);
const store={get(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const zmSleep=ms=>new Promise(r=>setTimeout(r,ms));
const validEmail=v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
/* v3.44: email typo hints (gmail.con → gmail.com) + "open your mail app" button after signup (confirm rate) */
const MAIL_FIX={"gmail.con":"gmail.com","gmail.co":"gmail.com","gmail.cm":"gmail.com","gmail.om":"gmail.com","gmail.comm":"gmail.com","gmial.com":"gmail.com","gmai.com":"gmail.com","gamil.com":"gmail.com","gnail.com":"gmail.com","gmaill.com":"gmail.com","gmal.com":"gmail.com","gmali.com":"gmail.com","hotmial.com":"hotmail.com","hotmal.com":"hotmail.com","hotmail.con":"hotmail.com","outlok.com":"outlook.com","outlook.con":"outlook.com","yahoo.con":"yahoo.com","yaho.com":"yahoo.com","icloud.con":"icloud.com","icloud.co":"icloud.com","iclod.com":"icloud.com","icoud.com":"icloud.com"};
function mailFix(v){ const m=/^([^\s@]+)@([^\s@]+)$/.exec(String(v).trim().toLowerCase()); if(!m) return null; let d=MAIL_FIX[m[2]]; if(!d&&/\.(con|cmo|cpm|vom|xom|comm|coom)$/.test(m[2])) d=m[2].replace(/\.[a-z]+$/,".com"); return d?m[1]+"@"+d:null }
function typoStop(inp,err){ const f=mailFix(inp.value); if(!f) return false; A.err(); inp.setAttribute("aria-invalid","true");
 err.innerHTML=`Did you mean <button type="button" class="fixmail">${esc(f)}</button>?`;
 err.querySelector(".fixmail").onclick=()=>{ inp.value=f; inp.removeAttribute("aria-invalid"); err.textContent=""; T.ev("mail_fix"); inp.focus() };
 T.ev("mail_typo"); inp.focus(); return true }
function mailApp(email){ const d=String(email||"").toLowerCase().split("@")[1]||"", ua=navigator.userAgent,
  ios=/iPhone|iPad|iPod/i.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1), and=/Android/i.test(ua),
  g=/^(gmail|googlemail)\.com$/.test(d), ms=/^(outlook|hotmail|live|msn)\./.test(d), ap=/^(icloud|me|mac)\.com$/.test(d), yh=/^(yahoo|ymail)\./.test(d);
 if(ios){ if(g) return {l:"Open Gmail",u:"googlegmail://"}; if(ms) return {l:"Open Outlook",u:"ms-outlook://"}; if(yh) return {l:"Open Yahoo Mail",u:"ymail://"}; return {l:"Open Mail",u:"message://"} }
 if(and){ if(g) return {l:"Open Gmail",u:"intent://#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;package=com.google.android.gm;end"}; return {l:"Open email app",u:"intent://#Intent;action=android.intent.action.MAIN;category=android.intent.category.APP_EMAIL;end"} }
 if(g) return {l:"Open Gmail",u:"https://mail.google.com/mail/u/0/#search/from%3Azeromrr.club"}; if(ms) return {l:"Open Outlook",u:"https://outlook.live.com/mail/0/"};
 if(ap) return {l:"Open iCloud Mail",u:"https://www.icloud.com/mail"}; if(yh) return {l:"Open Yahoo Mail",u:"https://mail.yahoo.com/"}; return null }
function mailBtn(email,cls){ const m=mailApp(email); return m?`<a class="${cls||"btn pri"} mailgo" href="${esc(m.u)}"${/^https:/.test(m.u)?' target="_blank" rel="noopener"':""}><span aria-hidden="true">✉</span> ${m.l}</a>`:"" }
document.addEventListener("click",e=>{ const a=e.target.closest&&e.target.closest(".mailgo"); if(a) T.ev("mail_open") });

let st={tee:0,size:null,email:store.get("nr_email")||"",picks:store.get("nr_picks")||{},member:store.get("zm_member")||null,off:store.get("zm_off")};
/* v3.17: personal founding discount. Server answers with {off}; a browser that saved an email before v3.16 is a pre-change signup → legacy -30%. */
if(!st.off&&(st.email||st.member)){ st.off=CONFIG.legacyOff; store.set("zm_off",st.off) }
const offMe=()=>st.off||OFF, fpMe=()=>Math.round(PRICE*(100-offMe())/100), locked=()=>offMe()>OFF;
function setOff(o){ if(!(o>0)) return; st.off=o; store.set("zm_off",o); paintOff() }
function paintOff(){ document.querySelectorAll(".offv").forEach(e=>e.textContent="€"+fpMe()) }
paintOff();
let opt={sound:store.get("zm_sound")!==false,gfx:store.get("zm_gfx")||"hd"};
let mode="boot", overlay=null, pending=null;

/* ---------- analytics: anonymous events → /api/track (prod domain only) ---------- */
const T=(()=>{
 const rid=()=>Array.from(crypto.getRandomValues(new Uint8Array(12)),b=>(b%36).toString(36)).join("");
 const qs=new URLSearchParams(location.search);
 if(qs.has("notrack")) store.set("zm_notrack",1);
 if(qs.get("twclid")) store.set("zm_twclid",qs.get("twclid").slice(0,200)); // X ad click id → sent with signup (server-side X Conversion API)
 const off=true||!!store.get("zm_notrack")||!/(^|\.)zeromrr\.club$|\.vercel\.app$/.test(location.hostname);
 let vid=store.get("zm_vid"); if(!vid){vid=rid();store.set("zm_vid",vid)}
 let sid; try{sid=sessionStorage.getItem("zm_sid");if(!sid){sid=rid();sessionStorage.setItem("zm_sid",sid)}}catch(e){sid=rid()}
 const utm={s:qs.get("utm_source")||qs.get("ref")||"",m:qs.get("utm_medium")||"",c:qs.get("utm_campaign")||""};
 const q=[]; let tm=0;
 function flush(){ if(!q.length) return;
  const body=JSON.stringify({v:vid,s:sid,p:location.pathname+location.hash,r:document.referrer||"",u:utm,l:navigator.language||"",e:q.splice(0)});
  try{ if(navigator.sendBeacon&&navigator.sendBeacon("/api/track",new Blob([body],{type:"text/plain"}))) return }catch(e){}
  fetch("/api/track",{method:"POST",body,keepalive:true,headers:{"Content-Type":"text/plain"}}).catch(()=>{}) }
 function ev(n,t,z,ms){ if(off) return; const o={n}; if(t)o.t=t; if(z)o.z=z; if(ms!=null)o.ms=ms; q.push(o); clearTimeout(tm); tm=setTimeout(flush,n==="visit"?0:1200) }
 let left=0; function bye(){ if(!off&&!left){left=1;q.push({n:"leave",ms:Math.round(performance.now())})} flush() } // leave = time on page (ms since load)
 addEventListener("pagehide",bye);  document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden")bye(); else left=0});
 // v3.13 bots vs humans: visit carries bot flags (bitmask in ms); first real input → "human" (ms since load)
 const bf=(navigator.webdriver?1:0)|(/@posix/i.test(navigator.language||"")?2:0)|(!(navigator.languages&&navigator.languages.length)?4:0)|(!screen.width||!outerWidth?8:0)|(/HeadlessChrome/.test(navigator.userAgent)?16:0);
 const HU=["pointerdown","touchstart","keydown","wheel"]; let hu=0;
 function human(){ if(hu) return; hu=1; HU.forEach(t=>removeEventListener(t,human,true)); ev("human",0,0,Math.round(performance.now())) }
 if(window.__zh){ hu=1; setTimeout(()=>ev("human",0,0,window.__zh)) } else HU.forEach(t=>addEventListener(t,human,{capture:true,passive:true}));
 return {ev,vid,bf};
})();
if(!window.__zv) T.ev("visit",0,0,T.bf||null); T.ev("ready");

/* ---------- founding: confirm link (?confirm=TOKEN) ---------- */
let saved=null; // "ok" | "expired" → shown in the memory card after boot
function setMember(m){ st.member=m; store.set("zm_member",m); const b=$("boot-sub"); if(b&&m) b.textContent=`Game saved · founding member ${m.label}`; }
(async()=>{ const q=new URLSearchParams(location.search), tok=q.get("confirm"); if(!tok||!CONFIG.confirm) return; T.ev("confirm_open"); /* v3.44: link opened vs confirmed */
 q.delete("confirm"); try{history.replaceState(null,"",location.pathname+(q.toString()?"?"+q:"")+location.hash)}catch(e){}
 try{ const r=await fetch(CONFIG.confirm,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:tok})});
  const j=await r.json().catch(()=>({}));
  if(r.ok&&j.member_no){ if(j.off) setOff(j.off); setMember({no:j.member_no,label:j.label}); if(!j.already) T.ev("confirm"); saved="ok" } else { saved="expired"; T.ev("confirm_fail",0,0,r.status) }
 }catch(e){ saved="expired"; T.ev("confirm_fail",0,0,0) }
 if(mode!=="boot"&&mode!=="booting"&&!overlay) showSaved();
})();
if(st.member) setTimeout(()=>setMember(st.member));
function showSaved(){ const v=saved; saved=null; if(!v) return; openCard(true); if(v==="ok") mcView("saved"); else { $("mc-err").textContent="That confirm link expired or was already replaced. Enter your email again for a fresh one." } }

/* ---------- saving: claude.ai db → endpoint → local demo ---------- */
let dbP=null;
function backend(){ if(!dbP) dbP=(async()=>{try{
  const [db,user]=await Promise.all([window.claude?.use?.("db"),window.claude?.use?.("user")]);
  if(!db||!user) return null; const id=await user.id(); return id?{db,id}:null}catch(e){return null}})(); return dbP; }
async function save(rec){
  rec.ts=new Date().toISOString(); rec.vid=T.vid; const tw=store.get("zm_twclid"); if(tw) rec.twclid=tw;
  const b=await backend();
  if(b){ const ref=b.db.doc("signups/"+b.id); const cur=await ref.get().catch(()=>null);
    const prev=(cur&&cur.exists&&cur.data())||{};
    const picks=Object.assign({},prev.picks||{}); if(rec.tee) picks[rec.tee]=rec.size;
    await ref.set({email:rec.email,picks,source:prev.source||rec.source,first:prev.first||rec.ts,last:rec.ts});
    return "saved"; }
  if(CONFIG.endpoint){ const r=await fetch(CONFIG.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(rec)});
    const j=await r.json().catch(()=>({}));
    if(!r.ok){ const e=new Error("http "+r.status); e.code=j.error; throw e }
    if(j.off) setOff(j.off);
    return j; }
  return "demo";
}

/* ---------- sound: synthesized, starts on first press ---------- */
const A={ctx:null,out:null,rev:null,
 init(){ if(this.ctx){this.ctx.resume&&this.ctx.resume();return}
  try{this.ctx=new (window.AudioContext||window.webkitAudioContext)()}catch(e){return}
  const c=this.ctx; this.out=c.createGain(); this.out.gain.value=opt.sound?.8:0; this.out.connect(c.destination);
  const len=Math.floor(c.sampleRate*2.6), b=c.createBuffer(2,len,c.sampleRate);
  for(let ch=0;ch<2;ch++){const d=b.getChannelData(ch);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3)}
  this.rev=c.createConvolver(); this.rev.buffer=b; const rg=c.createGain(); rg.gain.value=.45; this.rev.connect(rg); rg.connect(this.out); },
 setOn(on){ if(this.ctx) this.out.gain.setTargetAtTime(on?.8:0,this.ctx.currentTime,.05) },
 tone(f,{t=0,d=.12,type="sine",v=.15,a=.005,wet=.3,f2}={}){ const c=this.ctx; if(!c||!opt.sound) return; const s=c.currentTime+t;
  const o=c.createOscillator(),g=c.createGain(); o.type=type; o.frequency.setValueAtTime(f,s); if(f2) o.frequency.exponentialRampToValueAtTime(f2,s+d);
  g.gain.setValueAtTime(0,s); g.gain.linearRampToValueAtTime(v,s+a); g.gain.exponentialRampToValueAtTime(.0001,s+d);
  o.connect(g); g.connect(this.out); if(wet){const w=c.createGain(); w.gain.value=wet; g.connect(w); w.connect(this.rev)} o.start(s); o.stop(s+d+.05) },
 tick(){this.tone(1320,{d:.05,type:"square",v:.035,wet:.1})},
 ok(){this.tone(660,{d:.12,type:"triangle",v:.12});this.tone(990,{t:.07,d:.22,type:"triangle",v:.12})},
 back(){this.tone(520,{d:.12,type:"triangle",v:.1,f2:330})},
 err(){this.tone(170,{d:.2,type:"square",v:.05})},
 whoosh(){this.tone(300,{d:.25,type:"sawtooth",v:.04,f2:1200,wet:.4})},
 save(){[0,.1,.2,.3].forEach((t,i)=>this.tone(880+i*110,{t,d:.06,type:"square",v:.03,wet:.15}));this.tone(1318.5,{t:.5,d:1.4,v:.11,wet:.8});this.tone(1975.5,{t:.56,d:1.6,v:.06,wet:.8})},
 boot(dur){ const c=this.ctx; if(!c||!opt.sound) return; const s=c.currentTime;
  [55,55.6,82.4].forEach(f=>{const o=c.createOscillator(),g=c.createGain(),lp=c.createBiquadFilter();o.type="sawtooth";o.frequency.value=f;lp.type="lowpass";
   lp.frequency.setValueAtTime(110,s);lp.frequency.linearRampToValueAtTime(950,s+dur*.7);lp.frequency.linearRampToValueAtTime(180,s+dur+1.6);
   g.gain.setValueAtTime(0,s);g.gain.linearRampToValueAtTime(.08,s+dur*.4);g.gain.linearRampToValueAtTime(0,s+dur+1.8);
   o.connect(lp);lp.connect(g);g.connect(this.out);const w=c.createGain();w.gain.value=.5;g.connect(w);w.connect(this.rev);o.start(s);o.stop(s+dur+2)});
  const n=[1046.5,1318.5,1568,2093,1760,2637]; for(let i=0;i<14;i++) this.tone(n[i%6]*(i%3?1:.5),{t:dur*.12+i*dur*.034,d:.9,v:.028,wet:.9});
  [261.6,329.6,392,523.3].forEach(f=>this.tone(f,{t:dur*.6,d:3.4,type:"triangle",v:.065,a:.35,wet:1}));
  this.tone(1046.5,{t:dur*.6,d:3,v:.05,wet:1}); }
};

/* ---------- 3D: low-poly night garage ---------- */
const G={ok:false};
function init3D(){
 if(!window.THREE) return;
 const T=THREE, cv=$("cv"); let r;
 try{ r=new T.WebGLRenderer({canvas:cv,antialias:false,alpha:true,powerPreference:"high-performance"}) }catch(e){ return }
 if(!r.getContext()) return;
 r.setClearColor(0x070a12,1);
 const scene=new T.Scene(), fogE=new T.FogExp2(0x0b1022,.05); scene.fog=fogE;
 const cam=new T.PerspectiveCamera(50,1,.1,200);
 const snapU={value:200};
 const snap=m=>{m.onBeforeCompile=s=>{s.uniforms.uSnap=snapU;s.vertexShader="uniform float uSnap;\n"+s.vertexShader.replace("#include <fog_vertex>",
   "gl_Position.xy=floor(gl_Position.xy/gl_Position.w*uSnap+.5)/uSnap*gl_Position.w;\n#include <fog_vertex>")};return m};
 const cvsTex=(w,h,draw)=>{const c=document.createElement("canvas");c.width=w;c.height=h;draw(c.getContext("2d"),w,h);
   const t=new T.CanvasTexture(c);t.magFilter=t.minFilter=T.NearestFilter;t.wrapS=t.wrapT=T.RepeatWrapping;return t};
 const box=new T.BoxGeometry(1,1,1);

 // floor
 const ft=cvsTex(64,64,(x,w,h)=>{x.fillStyle="#2a2d34";x.fillRect(0,0,w,h);for(let i=0;i<800;i++){const v=28+Math.random()*44|0;x.fillStyle=`rgb(${v},${v+2},${v+7})`;x.fillRect(Math.random()*w|0,Math.random()*h|0,1+(Math.random()<.2),1)}x.fillStyle="#17191e";x.fillRect(0,0,w,1);x.fillRect(0,0,1,h)});
 ft.repeat.set(28,28);
 const floor=new T.Mesh(new T.PlaneGeometry(90,90,24,24),snap(new T.MeshLambertMaterial({map:ft}))); floor.rotation.x=-Math.PI/2; scene.add(floor);
 // pillars, ceiling, lamps
 const pm=snap(new T.MeshLambertMaterial({color:0x3c4049}));
 [[-5,-6],[5,-6],[-5,2],[5,2],[-5,10],[5,10]].forEach(([x,z])=>{const m=new T.Mesh(box,pm);m.scale.set(.7,7,.7);m.position.set(x,3.5,z);scene.add(m)});
 const ceil=new T.Mesh(new T.PlaneGeometry(12,24,4,8),snap(new T.MeshLambertMaterial({color:0x14161b,side:T.DoubleSide}))); ceil.rotation.x=Math.PI/2; ceil.position.set(0,7,4); scene.add(ceil);
 const lampM=new T.MeshBasicMaterial({color:0xffb27a});
 [[-3.2,6.6,1],[3.2,6.6,-1]].forEach(p=>{const l=new T.Mesh(box,lampM);l.scale.set(1.2,.12,.35);l.position.set(...p);scene.add(l)});
 scene.add(new T.HemisphereLight(0x5b6d9c,0x0a0a12,.65));
 const L1=new T.PointLight(0xff9248,1.7,16,2); L1.position.set(-3.2,5,1.5); scene.add(L1);
 const L2=new T.PointLight(0xff9a52,1.3,16,2); L2.position.set(3.2,5,-1); scene.add(L2);
 const L3=new T.PointLight(0x6f97ff,1.1,14,2); L3.position.set(0,3,-4); scene.add(L3);
 // pedestal + light cone
 const ped=new T.Mesh(new T.CylinderGeometry(1.1,1.3,.36,10),snap(new T.MeshLambertMaterial({color:0x23262e}))); ped.position.y=.18; scene.add(ped);
 const ring=new T.Mesh(new T.RingGeometry(1.12,1.24,24),new T.MeshBasicMaterial({color:0xef8a4e,side:T.DoubleSide})); ring.rotation.x=-Math.PI/2; ring.position.y=.37; scene.add(ring);
 const cone=new T.Mesh(new T.ConeGeometry(1.5,6.2,18,1,true),new T.MeshBasicMaterial({color:0xffc792,transparent:true,opacity:.07,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide,fog:false}));
 cone.position.y=3.3; scene.add(cone);
 // dust
 const dg=new T.BufferGeometry(), dp=new Float32Array(900);
 for(let i=0;i<300;i++){dp[i*3]=(Math.random()-.5)*12;dp[i*3+1]=Math.random()*6;dp[i*3+2]=(Math.random()-.5)*12}
 dg.setAttribute("position",new T.BufferAttribute(dp,3));
 const env=[floor,ceil,ped,ring,cone]; scene.children.forEach(o=>{if(o.isMesh&&o.geometry===box)env.push(o)});
 const dust=new T.Points(dg,new T.PointsMaterial({color:0xffd8ad,size:.035,transparent:true,opacity:.55,depthWrite:false})); scene.add(dust);
 // boot towers
 const towers=new T.Group(); scene.add(towers);
 for(let i=0;i<56;i++){
  const m=new T.MeshBasicMaterial({color:new T.Color().setHSL(.6+Math.random()*.05,.65,.5+Math.random()*.25),transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false,fog:false});
  const b=new T.Mesh(box,m), gx=(i%8)-3.5, gz=Math.floor(i/8), s=.5+Math.random()*.7;
  b.position.set(gx*3.1+(Math.random()-.5)*1.3,0,-16-gz*3.4+(Math.random()-.5)*1.3); b.scale.set(s,.01,s);
  b.userData={h:2+Math.random()*Math.random()*15,d:Math.random()}; towers.add(b) }
 // tee
 const tee=new T.Group(); tee.position.set(0,1.78,0); scene.add(tee);
 const shT=(()=>{const c=document.createElement("canvas");c.width=c.height=64;const x=c.getContext("2d");const g=x.createRadialGradient(32,32,2,32,32,32);g.addColorStop(0,"rgba(0,0,0,.75)");g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.fillRect(0,0,64,64);return new T.CanvasTexture(c)})();
 const shadow=new T.Mesh(new T.PlaneGeometry(1,1),new T.MeshBasicMaterial({map:shT,transparent:true,depthWrite:false,fog:false})); scene.add(shadow);
 const mat=new T.MeshBasicMaterial({alphaTest:.5,fog:false,side:T.DoubleSide,color:0xc9c7d2});
 const spr=new T.Mesh(new T.PlaneGeometry(1,1),mat); tee.add(spr);
 const texs=[];
 const loadImg=src=>new Promise((res,rej)=>{const im=new Image();im.onload=()=>res(im);im.onerror=rej;im.src=src});
 const tex=c=>{const t=new T.Texture(c);t.minFilter=T.LinearFilter;t.generateMipmaps=false;t.needsUpdate=true;return {t,ar:c.height/c.width}};
 const silhouette=(im,hex)=>{const c=document.createElement("canvas");c.width=im.width;c.height=im.height;const x=c.getContext("2d");
   x.translate(c.width,0);x.scale(-1,1);x.drawImage(im,0,0);x.setTransform(1,0,0,1,0,0);x.globalCompositeOperation="source-in";
   const g=x.createLinearGradient(0,0,c.width,c.height);g.addColorStop(0,hex);g.addColorStop(1,"#0d0b0a");x.fillStyle=hex;x.fillRect(0,0,c.width,c.height);
   x.globalCompositeOperation="source-atop";x.globalAlpha=.55;x.fillStyle=g;x.fillRect(0,0,c.width,c.height);return c};
 let fKey="f", fMir=1; const zv1=new T.Vector3(), zv2=new T.Vector3();
 let teeIdx=-1, cur=-1, swap=0, swapTo=0, vel=0, swapped=true, ang=0;
 let show=store.get("zm_show")||"model";
 // 8-direction sprite, like a 2003 console game: the sprite always faces the camera and the frame follows the viewing angle
 const FR=[["f",1],["q",1],["s",1],["b",1],["b",1],["b",1],["s",-1],["q",-1]];
 function applyTee(i){ if(!texs[i]) return; cur=i; teeIdx=i }
 Promise.all(TEES.map(async(t,i)=>{const f=await loadImg(t.front); const b=t.back?await loadImg(t.back):silhouette(f,t.ink);
   const w=t.who; if(!w){texs[i]={tee:{f:tex(f),b:tex(b)}};return}
   const [cf,cq,cs,cb]=await Promise.all([w.f,w.q,w.s,w.b].map(loadImg));
   texs[i]={tee:{f:tex(f),b:tex(b)},model:{f:tex(cf),q:tex(cq),s:tex(cs),b:tex(cb)}}})).then(()=>{applyTee(st.tee);ang=TEES[st.tee].start}).catch(()=>{});
 G.setShow=m=>{ if(m===show) return; show=m; swapTo=cur; swap=1; swapped=false; vel+=6 };
 G.getShow=()=>show;
 G.setTee=(i,dir)=>{ if(teeIdx===-1||i===swapTo&&swap>0||i===cur&&swap===0) return; idleT=1.6; swapTo=i; swap=1; swapped=false; vel+=(dir||1)*9 };

 // camera choreography
 const V={menu:{d:[[3.4,2.3,5.7],[-1.6,1.5,0]],m:[[0,2.3,8.4],[0,.7,0]]},drop:{d:[[.2,1.95,4.6],[1.9,1.55,0]],m:[[0,2.0,9.4],[0,.55,0]]}};
 const goP=new T.Vector3(), goT=new T.Vector3(), cuT=new T.Vector3(0,3,-28);
 let view="menu", phase="idle", bootT=0, bootDur=1, bootDone=null, fade=0, time=0, last=performance.now();
 G.view=n=>{view=n;const v=V[n][innerWidth<761?"m":"d"];goP.set(...v[0]);goT.set(...v[1]);if(typeof anSet==="function"&&garage)anSet()};
 G.boot=(dur,done)=>{garage=false;env.forEach(o=>o.visible=true);towers.visible=true;r.setClearColor(0x070a12,1);scene.fog=fogE;document.body.classList.remove("garage");phase="boot";bootT=0;bootDur=dur;bootDone=done};
 G.skip=()=>{if(phase==="boot") bootT=bootDur};
 // garage mode: pre-rendered backdrop (CSS) + sprite placed by screen anchor [x from left, feet y from top, height] — like a 2003 pre-rendered background game
 const AN={menu:{d:[.5,.88,.48],m:[.5,.63,.4]},drop:{d:[.37,.92,.6],m:[.5,.6,.45]}};
 const anG=[.5,.86,.5], anC=[.5,.86,.5]; let garage=false;
 let zoom=1; const CLOSE=1.5, FOC=.3;
 const anSet=()=>{let a=(view==="drop"&&dropBox())||AN[view][innerWidth<761?"m":"d"];
  if(view==="drop"){ const top=a[1]-a[2]+.01, h=a[2]*CLOSE, c=top+FOC*h, hz=h*zoom, tz=c-FOC*hz; a=[a[0],tz+hz,hz] }
  anG[0]=a[0];anG[1]=a[1];anG[2]=a[2]};
 const hiPre={}; const preHi=i=>{const w=TEES[i]&&TEES[i].who; if(!w||!w.hi||hiPre[i]) return; hiPre[i]=1; Object.values(w.hi).forEach(u=>{const im=new Image();im.src=u})};
 G.getZoom=()=>zoom;
 G.setZoom=z=>{ z=Math.max(1,Math.min(2.4,z)); if(Math.abs(z-zoom)<.001) return; zoom=z; if(zoom>1) preHi(st.tee); anSet(); if(typeof zoomUI==="function") zoomUI() };
 G.toLive=()=>{phase="live";garage=true;env.forEach(o=>o.visible=false);towers.visible=false;r.setClearColor(0x000000,0);scene.fog=null;
   cam.position.set(0,0,0);cam.lookAt(0,0,-1);dust.position.set(0,-3,-7);document.body.classList.add("garage");anSet();anC.splice(0,3,...anG)};
 function size(){const w=innerWidth,h=innerHeight,lo=opt.gfx==="480p";const s=lo?Math.min(1,400/h):Math.min(devicePixelRatio||1,2);
   r.setPixelRatio(1);r.setSize(Math.max(1,Math.round(w*s)),Math.max(1,Math.round(h*s)),false);cam.aspect=w/h;cam.updateProjectionMatrix();
   snapU.value=lo?170:5000;document.body.classList.toggle("low",lo);G.view(view)}
 G.size=size; addEventListener("resize",size); size();

 // drag to spin
 let drag=null, idleT=0;
 const pts=new Map(); let pinch=null;
 const pdist=()=>{const [a,b]=[...pts.values()];return Math.hypot(a.x-b.x,a.y-b.y)||1};
 const zoomable=()=>mode==="drop"&&show==="model"&&cur>=0&&texs[cur]&&texs[cur].model;
 cv.addEventListener("pointerdown",e=>{pts.set(e.pointerId,{x:e.clientX,y:e.clientY});cv.setPointerCapture(e.pointerId);
  if(pts.size===2&&zoomable()){drag=null;pinch={d:pdist(),z:zoom}} else if(pts.size===1) drag={x:e.clientX}; idleT=0});
 cv.addEventListener("pointermove",e=>{if(pts.has(e.pointerId))pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(pinch&&pts.size>=2){G.setZoom(pinch.z*pdist()/pinch.d);return}
  if(!drag) return;const dx=e.clientX-drag.x;drag.x=e.clientX;ang-=dx*.012;vel=-dx*.6});
 const up=e=>{pts.delete(e.pointerId);if(pts.size<2)pinch=null;if(!pts.size)drag=null}; cv.addEventListener("pointerup",up); cv.addEventListener("pointercancel",up);
 cv.addEventListener("wheel",e=>{if(!zoomable())return;e.preventDefault();G.setZoom(zoom*Math.exp(-e.deltaY*.0015))},{passive:false});
 cv.addEventListener("dblclick",()=>{if(zoomable())G.setZoom(zoom>1.2?1:2)});

 function loop(now){
  const dt=Math.min(.05,(now-last)/1000); last=now; time+=dt;
  if(phase==="idle"||phase==="boot"){
   let p=0; if(phase==="boot"){bootT+=dt;p=Math.min(1,bootT/bootDur)}
   const grow=phase==="idle"?.32:Math.min(1,.32+p*1.3);
   towers.children.forEach(b=>{const u=b.userData,g=Math.max(0,Math.min(1,(grow-u.d*.3)/(1-u.d*.3))),e=1-Math.pow(1-g,3);
     b.scale.y=Math.max(.01,u.h*e);b.position.y=b.scale.y/2;b.material.opacity=.36*Math.min(1,g*2)*(.75+.25*Math.sin(time*2+u.d*9))});
   const ang=time*.07+(RM?0:p*1.4), R=20-p*5;
   cam.position.set(Math.sin(ang)*R,2.2+p*2.4,-28+Math.cos(ang)*R); cuT.set(0,3+p,-28); cam.lookAt(cuT);
   if(phase==="boot"&&p>=1){const d=bootDone;bootDone=null;d&&d()}
  } else {
   const k=1-Math.pow(.03,dt); for(let j=0;j<3;j++) anC[j]+=(anG[j]-anC[j])*k;
   if(fade>0){fade=Math.max(0,fade-dt*.7);towers.children.forEach(b=>b.material.opacity=.36*fade);towers.visible=fade>0}
  }
  // tee
  if(swap>0){swap=Math.max(0,swap-dt*3.2); if(!swapped&&swap<=.5){applyTee(swapTo);swapped=true}
   const s=Math.abs(swap*2-1); tee.scale.setScalar(Math.max(.001,s))} else tee.scale.setScalar(1);
  if(!drag){ if(innerWidth<=760){ // phones: no idle spin; after 2.5 s without touch, ease back to the print side
    ang+=dt*vel*.12; vel*=Math.pow(.08,dt); idleT+=dt;
    if(idleT>2.5&&Math.abs(vel)<.6&&cur>=0){ const t0=TEES[cur].start||0, tg=t0+Math.round((ang-t0)/(2*Math.PI))*2*Math.PI; ang+=(tg-ang)*Math.min(1,dt*2.2) } }
   else { ang+=dt*((RM?0:.38)+vel*.12); vel*=Math.pow(.08,dt) } }
  const sh=cur>=0&&texs[cur]&&!texs[cur].model?"tee":show;
  shadow.visible=sh==="model"&&swap===0||sh==="model"&&swap<.5; let H=2;
  const d=cur>=0&&texs[cur]&&texs[cur][sh];
  if(d){ const ca=Math.atan2(cam.position.x-tee.position.x,cam.position.z-tee.position.z); spr.rotation.y=ca; spr.visible=sh!=="tee"||mode!=="drop";
   const rel=Math.atan2(Math.sin(ca-ang),Math.cos(ca-ang));
   if(sh==="model"){ const k=((Math.round(rel/(Math.PI/4))%8)+8)%8, [key,mir]=FR[k], im=d[key]; fKey=key; fMir=mir; H=2.75; if(mat.map!==im.t){mat.map=im.t;mat.needsUpdate=true} spr.scale.set(H/im.ar*mir,H,1) }
   else { const c=Math.cos(rel), im=c>=0?d.f:d.b, W=2.15; H=W*im.ar; if(mat.map!==im.t){mat.map=im.t;mat.needsUpdate=true} spr.scale.set(W*Math.max(.28,Math.abs(c)),H,1) } }
  { const t=Math.tan(cam.fov*Math.PI/360), D=2.75/(anC[2]*2*t), X=(anC[0]*2-1)*D*t*cam.aspect, Yf=-(anC[1]*2-1)*D*t;
    tee.position.set(X, sh==="model"?Yf+H/2:Yf+1.55+(RM?0:Math.sin(time*1.4)*.045), -D);
    shadow.position.set(X,Yf+.06,-D-.05); shadow.scale.set(1.6,.34,1); }
  { const zi=document.getElementById("zi"), w=cur>=0&&TEES[cur].who;
    const on=w&&d&&mode==="drop"&&sh==="model"&&zoom>1.02&&swap===0;
    if(on){ const Hh=H/2, p=tee.position; zv1.set(p.x,p.y+Hh,p.z).project(cam); zv2.set(p.x,p.y-Hh,p.z).project(cam);
      const y1=(1-zv1.y)/2*innerHeight, y2=(1-zv2.y)/2*innerHeight, cx=(zv1.x+1)/2*innerWidth;
      const src=(w.hi&&w.hi[fKey])||w[fKey]; if(zi.getAttribute("src")!==src) zi.src=src;
      zi.style.display="block"; zi.style.left=cx+"px"; zi.style.top=y1+"px"; zi.style.height=(y2-y1)+"px"; zi.style.transform=`translateX(-50%) scaleX(${fMir})`;
      spr.visible=false; if(w.hi) preHi(cur) }
    else if(zi.style.display!=="none") zi.style.display="none"; }
  ring.material.color.setHSL(.06,.85,.55+.12*Math.sin(time*2.2));
  const a=dust.geometry.attributes.position.array; for(let i=1;i<900;i+=3){a[i]+=dt*.08;if(a[i]>6)a[i]=0} dust.geometry.attributes.position.needsUpdate=true;
  r.render(scene,cam); requestAnimationFrame(loop);
 }
 requestAnimationFrame(loop);
 G.ok=true;
}
try{init3D()}catch(e){G.ok=false}
if(!G.ok) document.body.classList.add("no3d","garage");

/* ---------- menus ---------- */
function makeList(el,items,label,onPick,onSel){
 let idx=0;
 const btns=items.map((it,i)=>{const b=document.createElement("button");b.type="button";b.className="mi";b.id=el.id+"-"+it.k;b.textContent=label(it);
  b.addEventListener("mouseenter",()=>{if(idx!==i){set(i);A.tick()}});b.addEventListener("focus",()=>{if(idx!==i)set(i)});
  b.addEventListener("click",()=>{set(i);onPick(it)});el.appendChild(b);return b});
 function set(i){idx=i;btns.forEach((b,j)=>b.setAttribute("aria-current",j===i?"true":"false"));onSel&&onSel(items[i])}
 set(0);
 return {move(d){set((idx+d+items.length)%items.length);btns[idx].focus({preventScroll:true});A.tick()},
  focus(){btns[idx].focus({preventScroll:true})},relabel(){btns.forEach((b,j)=>b.textContent=label(items[j]));onSel&&onSel(items[idx])}};
}
const MENU=[
 {k:"start",l:"Start",s:()=>`Drop 01: ${TEES.length} tees. One batch. Made once. No restock. ${CONFIG.sale?"Pre-order open.":"Coming soon."}`},
 {k:"card",l:"Memory card",s:()=>st.member?`Founding member ${st.member.label}. founding price €${fpMe()} on Drop 01 (€${PRICE} after launch) + early access.`:st.email?`Save pending: confirm ${st.email} from your inbox.`:`Join the founding members: €${fpMe()} founding price on Drop 01 + early access.`},
 {k:"shop",l:"Inventory",s:()=>"The shop: every tee with photos, sizes, prices, shipping. No 3D needed."},
 {k:"opts",l:"Options",s:()=>"Sound, graphics, intro."}];
const menuL=makeList($("menu-list"),MENU,m=>m.l,m=>{A.ok();if(m.k==="start"){tiSide=TEES[st.tee].bf?1:0;toDrop()}else if(m.k==="card")openCard();else if(m.k==="shop"){setTimeout(()=>{location.href="https://zeromrr.club/shop"},180)}else toOpts()},m=>$("menu-sub").textContent=m.s());
const OPTS=[
 {k:"sound",l:()=>`Sound: ${opt.sound?"on":"off"}`,s:"Interface sounds and the boot theme."},
 {k:"gfx",l:()=>`Graphics: ${opt.gfx==="480p"?"480p":"HD"}`,s:"480p is the authentic look. HD renders at full sharpness."},
 {k:"intro",l:()=>"Replay intro",s:"Watch the boot sequence again."},
 {k:"back",l:()=>"Back",s:"Return to the main menu."}];
const optsL=makeList($("opts-list"),OPTS,o=>o.l(),o=>{
 if(o.k==="sound"){setSound(!opt.sound)} else if(o.k==="gfx"){opt.gfx=opt.gfx==="480p"?"hd":"480p";store.set("zm_gfx",opt.gfx);G.size&&G.size();A.ok()}
 else if(o.k==="intro"){A.ok();replay()} else {A.back();toMenu()}
 optsL.relabel()},o=>$("opts-sub").textContent=o.s);
function setSound(on){opt.sound=on;store.set("zm_sound",on);A.init();A.setOn(on);$("snd-l").textContent=on?"on":"off";if(on)A.ok();optsL.relabel()}
$("snd-l").textContent=opt.sound?"on":"off";
$("snd").onclick=()=>setSound(!opt.sound);

/* ---------- modes ---------- */
function show(){
 document.body.dataset.mode=mode;
 $("menu").hidden=mode!=="menu"; $("opts").hidden=mode!=="opts"; $("sel").hidden=mode!=="drop";
 $("hud").hidden=mode==="boot"||mode==="booting"; $("skiph").hidden=mode!=="booting"; $("hints").hidden=mode==="boot";
 if(!G.ok){ $("fb").hidden=!(mode==="menu"||mode==="drop"); $("fb-img").src=TEES[st.tee].who?TEES[st.tee].who.f:TEES[st.tee].front }
 hints(); renderTi(); if(typeof zoomUI==="function") zoomUI();
}
function hints(){
 const H={booting:[["x","Skip"]],menu:[["↑↓","Select"],["x","Confirm"]],opts:[["↑↓","Select"],["x","Change"],["o","Back"]],
  drop:[["◀▶","Tee"],["x",CONFIG.sale?"Pre-order":"Reserve"],["o","Back"]],card:[["x","Save"],["o","Cancel"]],insp:[["o","Close"]]};
 const h=H[overlay||mode]||[];
 $("hints").innerHTML=h.map(([g,t])=>g==="x"||g==="o"?`<span><i class="g ${g}">${g==="x"?"✕":"○"}</i>${t}</span>`:`<span><b style="margin-right:8px;font-weight:400">${g}</b>${t}</span>`).join("");
}
function toMenu(){ mode="menu"; $("mtools").hidden=true; G.view&&G.view("menu"); menuL.relabel(); show(); menuL.focus() }
function toOpts(){ mode="opts"; show(); optsL.focus() }
function toDrop(){ if(gateArmed&&!gateTm) gateTm=setTimeout(gateTry,20000); T.ev("tee_view",TEES[st.tee].id); mode="drop"; G.setTee&&G.setTee(st.tee,1); renderSel(); show(); G.view&&G.view("drop"); setHash(); $("cta").focus({preventScroll:true}) }
function setHash(){ const h="#"+TEES[st.tee].id; if(location.hash!==h) try{history.replaceState(null,"",h)}catch(e){location.hash=h} }

/* ---------- boot ---------- */
function pressStart(){
 if(mode!=="boot") return; A.init(); T.ev("start");
 const seen=store.get("zm_boot"); store.set("zm_boot",1); $("boot").hidden=true;
 const dur=(!G.ok||RM)?0:(seen?2.6:5.4);
 if(!dur){ if(G.ok) G.toLive(); afterBoot(); return }
 mode="booting"; show(); A.boot(dur);
 const tt=setTimeout(()=>$("title").classList.add("on"),dur*600);
 G.boot(dur,()=>{clearTimeout(tt);setTimeout(()=>$("title").classList.remove("on"),seen?500:900);G.toLive();afterBoot()});
}
let gateArmed=false, gateMoves=0, gateTm=0;
function gateTry(){ if(!gateArmed||overlay||mode!=="drop") return; gateArmed=false; clearTimeout(gateTm); store.set("zm_card_seen",1); openCard() }
function afterBoot(force){
 const i=TEES.findIndex(t=>"#"+t.id===location.hash);
 if(i>=0){st.tee=i;tiSide=TEES[i].bf?1:0;toDrop()} else if(force){tiSide=TEES[st.tee].bf?1:0;toDrop()} else toMenu();
 if(saved){setTimeout(()=>{if(!overlay)showSaved()},G.ok?1100:300);return}
 // v3.11: memory card no longer pops up on its own (was: after 2 tee switches or 20 s); email is asked inline after a size is picked
}
function replay(){ if(!G.ok) return; mode="booting"; show(); A.boot(3.2); $("title").classList.remove("on");
 G.boot(3.2,()=>{G.toLive();toMenu()}); }
$("start").onclick=pressStart;
$("boot").addEventListener("click",e=>{if(e.target===$("boot"))pressStart()});
addEventListener("pointerdown",()=>{if(mode==="booting")G.skip&&G.skip()});

/* ---------- tee select ---------- */
// phones: put the hero in the free band between the HUD and the sheet
function dropBox(){
 if(innerWidth>760||mode!=="drop") return null;
 const h=innerHeight, top=$("hud").getBoundingClientRect().bottom+10, bot=$("sel").getBoundingClientRect().top-8;
 document.documentElement.style.setProperty("--scT",top+"px"); document.documentElement.style.setProperty("--scB",(h-bot)+"px");
 if(bot-top<80) return null; return [.5,bot/h,(bot-top)/h];
}
if(window.ResizeObserver) new ResizeObserver(()=>{if(mode==="drop"&&G.view)G.view("drop")}).observe($("sel"));
let tiSide=0;
function zoomUI(){ const t=TEES[st.tee], on=!!G.ok&&mode==="drop"&&!!t.who&&effShow(t)==="model"; $("zc").hidden=!on;
 const z=G.getZoom?G.getZoom():1; $("zl").textContent=z.toFixed(1)+"×"; $("zout").disabled=z<=1.001; $("zin").disabled=z>=2.399 }
$("zin").onclick=()=>{G.setZoom&&G.setZoom(G.getZoom()*1.3);A.tick()};
$("zout").onclick=()=>{G.setZoom&&G.setZoom(G.getZoom()/1.3);A.tick()};
const effShow=t=>t.who?(G.getShow?G.getShow():"model"):"tee";
function renderTi(){
 const t=TEES[st.tee], on=mode==="drop"&&effShow(t)==="tee";
 $("ti").classList.toggle("on",on); if(!on) return;
 const src=tiSide&&t.back?t.back:t.front; if($("ti-img").getAttribute("src")!==src) $("ti-img").src=src;
 $("ti-img").alt=`${t.n1} ${t.n2}, ${t.colour}, ${tiSide&&t.back?"back":"front"}`;
 $("ti-cap").textContent=t.back?`${tiSide?(t.ex?(innerWidth<761?t.ex.capS||t.ex.cap:t.ex.cap):"Back"):"Front"} · tap to flip`:"Front · back is blank";
}
$("ti-img").onclick=()=>{ const t=TEES[st.tee]; if(!t.back) return; T.ev("flip",t.id); A.whoosh(); const im=$("ti-img"); im.classList.add("flip");
 setTimeout(()=>{tiSide=1-tiSide;renderTi();im.classList.remove("flip")},170) };
$("sg-open").onclick=()=>{const o=$("sg").hidden;$("sg").hidden=!o;$("sg-open").setAttribute("aria-expanded",String(o));$("sg-open").textContent=o?"Hide size guide":"Size guide"};
$("det").onclick=()=>{ const o=!$("sel").classList.contains("det"); $("sel").classList.toggle("det",o); $("det").setAttribute("aria-expanded",String(o)); $("det").textContent=o?"Hide":"Details"; A.tick() };
const MQ=matchMedia("(max-width:760px)"), selTools=document.querySelector(".sel-tools");
function dockTools(){ const m=MQ.matches; if(m&&selTools.parentNode!==$("mtools")) $("mtools").appendChild(selTools);
 else if(!m&&selTools.parentNode!==$("sel")) $("sel").insertBefore(selTools,$("sel-kv")); $("mtools").hidden=!(m&&mode==="drop") }
MQ.addEventListener?MQ.addEventListener("change",dockTools):MQ.addListener(dockTools);
let rsvOpen=0;
function renderSel(){ dockTools();
 const t=TEES[st.tee], n=String(TEES.length).padStart(2,"0");
 $("sel-c").innerHTML=`<span class="who">${esc(t.ex?"Exclusive":t.who?t.who.p.replace("Player ","P")+" · "+t.who.name:"New drop")} · </span>${String(st.tee+1).padStart(2,"0")}/${n}`;
 $("sel-p").innerHTML=`€${fpMe()} ${locked()?"your locked price":"founding price"} · <span class="dim">€${PRICE} after launch</span>`;
 const sh=effShow(t); $("show").querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.m===sh))); $("show-m").textContent=t.who?`On ${t.who.name}`:"";
 $("show").hidden=!t.who; $("spin-h").hidden=sh!=="model";
 $("sel-ex").hidden=!t.ex; $("sel-ex").innerHTML=t.ex?`<b>${esc(t.ex.t)}<i>${esc(t.ex.tag)}</i></b><p>${esc(t.ex.d)}</p>`:"";
 $("sel-n").innerHTML=`${esc(t.n1)}<span>${esc(t.n2)}</span>`;
 $("sel-kv").innerHTML=[["Colour",esc(t.colour)],...t.print.map(p=>[p[0],esc(p[1])]),["Fit","oversized, boxy"],["Edition",esc(t.ed||"One batch. Made once. No restock.")]]  /* v3.11: price lives in the .offer strip */
  .map(r=>`<div${/Colour|Fit|Edition/.test(r[0])?' class="opt"':""}><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join("");
 if(st.size) st.size=szN(t,st.size);
 $("sz").innerHTML=szOf(t).map(o=>`<button type="button" data-z="${o.z}" aria-pressed="${o.z===st.size}">${o.l}</button>`).join("");
 $("sz").querySelectorAll("button").forEach(b=>b.onclick=()=>{st.size=b.dataset.z;$("sel-st").textContent="";T.ev("size",TEES[st.tee].id,st.size);A.tick();renderSel()});
 const held=szN(t,st.picks[t.id]), SL=szL(t,st.size), HL=szL(t,held);
 if(!st.size&&held) st.size=held;
 $("cta-l").textContent=!st.size?"Pick your size":CONFIG.sale?`Checkout · size ${szL(t,st.size)}`:!held?`Reserve size ${szL(t,st.size)}`:held===st.size?`Reserved · ${HL} ✓`:`Switch to size ${szL(t,st.size)}`;
 $("cta-off").textContent=`€${fpMe()}`;
 if(MQ.matches&&rsvOpen&&!st.email&&st.size&&!held) $("cta-l").textContent=`${CONFIG.sale?"Pre-order":"Reserve"} size ${szL(t,st.size)} →`;
 $("offer").innerHTML=locked()?`<span>Your locked early price · €${PRICE} after launch</span><span><b>€${fpMe()}</b> · ${CONFIG.sale?esc(zt(t).ship?zt(t).ship.s:"ships in 2–3 weeks"):"€0 today"}</span>`
  :`<span>Founding price · ${t.id==="book-a-demo"?"1 of 1":"one batch"} · €${PRICE} after launch</span><span><b>€${fpMe()}</b> · ${CONFIG.sale?esc(zt(t).ship?zt(t).ship.s:"ships in 2–3 weeks"):"€0 today"}</span>`;
 /* oos (2026-11-13): ALL REVENUE RESERVED — ombré dye, not in the first batch */
 if(t.oos){ $("sz").querySelectorAll("button").forEach(b=>{b.disabled=true;b.setAttribute("aria-pressed","false")}); $("cta").disabled=true;
  $("cta-l").textContent="Out of stock · back in Drop 02"; $("cta-off").textContent=""; $("sel-p").textContent="Out of stock";
  $("offer").innerHTML=`<span>Out of stock</span><span>Hand-dyed ombré · back in Drop 02</span>`; }
 else { let busy=0; try{ busy=rsvBusy }catch(e){} if(!busy) $("cta").disabled=false; }
 const ask=!!(!t.oos&&st.size&&!st.email&&!held&&(rsvOpen||!MQ.matches)); if($("rsv").hidden===ask){ $("rsv").hidden=!ask; $("rsv-err").textContent="" }
 sgPaint(t); const il=$("item-link"); if(il) il.href="https://zeromrr.club/shop/"+t.id;   // v3.45
 if(!G.ok) $("fb-img").src=t.who?t.who.f:t.front;
 renderTi(); zoomUI();
}
/* v3.45: size chart per tee from tees.js (real product, 19.11) */
function sgPaint(t){ const g=zt(t).grid, b=$("sg-t"); if(!b) return; $("sg-open").hidden=!g; if(!g){ b.innerHTML=""; $("sg").hidden=true; return }
 const cell=v=>`<td>${v}<small> / ${(v/2.54).toFixed(1)}″</small></td>`;
 b.innerHTML=`<table><thead><tr><th>cm / in</th>${g.cols.map(c=>`<th>${c}</th>`).join("")}</tr></thead><tbody><tr><td>Width (flat)</td>${g.w.map(cell).join("")}</tr><tr><td>Length</td>${g.len.map(cell).join("")}</tr></tbody></table>` }
function goTee(d){ if(gateArmed&&++gateMoves>=2) setTimeout(gateTry,900); st.tee=(st.tee+d+TEES.length)%TEES.length; T.ev("tee_view",TEES[st.tee].id); tiSide=TEES[st.tee].bf?1:0; A.whoosh(); G.setTee&&G.setTee(st.tee,d); $("sel-st").textContent=""; renderSel(); setHash() }
$("prev").onclick=()=>goTee(-1); $("next").onclick=()=>goTee(1);
$("sel-back").onclick=()=>{A.back();toMenu()};
async function join(v,tee,size){ // email → founding opt-in (same as the memory card form)
 const r=await save(tee?{email:v,source:"gate",tee,size,...(CONFIG.sale?{checkout:1}:{})}:{email:v,source:"gate"});   // v3.40: checkout → no "Lock your −20%" email
 if(v!==st.email){ st.member=null; store.set("zm_member",null) }
 st.email=v; store.set("nr_email",v);
 try{ if(CONFIG.xSignup&&window.twq) twq("event",CONFIG.xSignup,{email_address:v.toLowerCase()}) }catch(e){}
 if(r&&r.status==="confirmed") setMember({no:r.member_no,label:r.label});
 return r }
let rsvF=0;
$("rsv").addEventListener("submit",e=>{e.preventDefault();reserve()});
$("rsv-email").addEventListener("input",()=>{$("rsv-email").removeAttribute("aria-invalid");$("rsv-err").textContent=""});
$("rsv-email").addEventListener("focus",()=>{if(!rsvF){rsvF=1;T.ev("email_focus","reserve")}});
let rsvBusy=0;
// v3.38: sale wording only when the pre-order is open
if(CONFIG.sale){ const d=$("drop-st"); if(d) d.textContent="Drop 01 · pre-order open"; const n=$("rsv-note"); if(n){ n.firstChild.textContent="Next: checkout. Your "; n.childNodes[2].textContent=" is tied to this email and applied automatically. " } }
// v3.38: pre-order → the cart on /checkout is this email's reservations (+ the size just picked)
function goCheckout(){ T.ev("checkout_go",TEES[st.tee].id,st.size||null); setTimeout(()=>{ location.href="https://zeromrr.club/checkout?email="+encodeURIComponent(st.email) },250) }
async function reserve(){
 if(rsvBusy) return;
 const t=TEES[st.tee]; if(t.oos) return; T.ev("reserve_click",t.id,st.size||null);
 if(CONFIG.sale&&st.email&&st.size&&szN(t,st.picks[t.id])===st.size){ goCheckout(); return }   // already reserved → straight to checkout
 if(!st.size){ A.err(); const z=$("sz"); z.classList.remove("need"); void z.offsetWidth; z.classList.add("need"); $("sel-st").textContent="Pick a size first."; return }
 if(!st.email){ const inp=$("rsv-email"), v=inp.value.trim();
  if($("rsv").hidden){ rsvOpen=1; renderSel(); inp.focus(); return }
  if(!validEmail(v)){ A.err(); inp.setAttribute("aria-invalid","true"); $("rsv-err").textContent=v?"That email looks incomplete. Check for a typo.":"Enter your email to reserve."; inp.focus(); return }
  if(typoStop(inp,$("rsv-err"))) return;
  A.ok(); $("sel-st").textContent="Saving…"; rsvBusy=1; $("cta").disabled=true;
  try{ await join(v,t.id,st.size); T.ev("gate_submit","reserve") }
  catch(e){ T.ev("error","gate"); A.err(); $("sel-st").textContent=""; $("rsv-err").textContent=e.code==="mail"?"Couldn't send the confirm email. Try again in a minute.":"Couldn't save right now. Try again in a minute."; rsvBusy=0; $("cta").disabled=false; return } }
 A.tick(); $("sel-st").textContent="Saving…"; rsvBusy=1; $("cta").disabled=true;
 try{ const r=await save({email:st.email,tee:t.id,size:st.size,source:"reserve"});
  st.picks[t.id]=st.size; store.set("nr_picks",st.picks); T.ev("reserve",t.id,st.size); A.save(); renderSel();
  if(CONFIG.sale&&r!=="demo"){ $("sel-st").innerHTML=`<span class="ok">✓</span> Size ${szL(t,st.size)} saved. Opening checkout…`; goCheckout(); return }
  $("sel-st").innerHTML=`<span class="ok">✓</span> Size ${szL(t,st.size)} reserved for ${esc(st.email)}.${st.member?"":`<span class="inbox"><b class="px">📩 1 more step</b>Open the email from club@zeromrr.club and tap <b>Lock my €${fpMe()}</b>. Not there? Check spam / Promotions.${mailBtn(st.email,"")}</span>`}${r==="demo"?' <span class="dim">Demo mode: saved in this browser only.</span>':""}`;
 }catch(e){ T.ev("error","reserve"); A.err(); $("sel-st").textContent="Couldn't save that. Try again in a minute." }
 finally{ rsvBusy=0; $("cta").disabled=false }
}
$("cta").onclick=reserve;

/* ---------- memory card ---------- */
let lastFocus=null;
function openCard(force){ T.ev("gate_open"); lastFocus=document.activeElement; overlay="card"; $("mc").hidden=false; mcView(st.email&&!force?"found":"form"); hints() }
function closeCard(){ $("mc").hidden=true; overlay=null; hints(); const p=pending; pending=null;
 if(p&&st.email){ if(mode!=="drop") toDrop(); reserve() } else if(mode==="menu"){ menuL.relabel(); menuL.focus() } else lastFocus&&lastFocus.focus&&lastFocus.focus({preventScroll:true}) }
function mcView(v,extra){
 const b=$("mc-body"), H={form:`€${fpMe()} founding price + early access`,saving:"Saving…",pending:"Check your inbox",saved:"GAME SAVED."};
 if(v==="found") v=st.member?"saved":"pending";
 $("mc-h").textContent=H[v]||H.form;
 if(v==="form"){
  const rt=TEES[st.tee];
  b.innerHTML=`${pending?`<p class="mc-res"><span class="px">Reserving</span><b>${esc(rt.n1+" "+rt.n2)} · size ${esc(st.size)}</b></p>`:""}<p>Drop 01 is the full first collection, all ${TEES.length} tees in one launch. Founding members pay €${fpMe()} per tee on their first order for the first 48 hours (€${PRICE} after that), plus early access. No code needed: it's tied to your email.</p>
  <form id="mc-f" novalidate><label class="px" for="mc-email">Email</label>
  <input id="mc-email" type="email" autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false" aria-describedby="mc-err" placeholder="you@startup.com" value="${esc(st.email)}">
  <p class="dim">${CONFIG.sale?"No spam. Your founding price is applied at checkout.":"No spam. One email when the drop goes live."} <a href="https://zeromrr.club/privacy" target="_blank" rel="noopener" style="color:inherit">Privacy</a></p>
  <div class="mc-err" id="mc-err" aria-live="polite"></div>
  <div class="btns"><button class="btn pri" type="submit"><span class="g x">✕</span>Join the founding members</button><button class="btn" type="button" id="mc-no"><span class="g o">○</span>Not now</button></div></form>`;
  $("mc-email").addEventListener("input",()=>{$("mc-email").removeAttribute("aria-invalid");$("mc-err").textContent=""});
  $("mc-email").addEventListener("focus",()=>T.ev("email_focus","gate"),{once:true});
  $("mc-no").onclick=()=>{T.ev("gate_skip");A.back();pending=null;closeCard()};
  $("mc-f").addEventListener("submit",async e=>{e.preventDefault();const v=$("mc-email").value.trim();
   if(!validEmail(v)){A.err();$("mc-email").setAttribute("aria-invalid","true");$("mc-err").textContent=v?"That email looks incomplete. Check for a typo.":"Enter your email to join.";$("mc-email").focus();return}
   if(typoStop($("mc-email"),$("mc-err"))) return;
   A.ok(); mcView("saving");
   try{ const [r]=await Promise.all([save(pending&&st.size?{email:v,source:"gate",tee:TEES[st.tee].id,size:st.size}:{email:v,source:"gate"}) /* email step only; the reservation itself is saved by reserve() in closeCard() */,zmSleep(1400)]);
    if(v!==st.email){ st.member=null; store.set("zm_member",null) }
    st.email=v; store.set("nr_email",v); T.ev("gate_submit"); A.save();
    try{ if(CONFIG.xSignup&&window.twq) twq("event",CONFIG.xSignup,{email_address:v.toLowerCase()}) }catch(e){} // X pixel conversion (browser-side)
    if(r&&r.status==="confirmed"){ setMember({no:r.member_no,label:r.label}); mcView("saved") } else mcView("pending",r==="demo"||r==="saved"?"demo":"") }
   catch(err){ T.ev("error","gate"); A.err(); mcView("form"); $("mc-email").value=v;
    $("mc-err").textContent=err.code==="mail"?"Couldn't send the confirm email. Try again in a minute.":"Couldn't save right now. Try again in a minute." } });
  if(matchMedia("(pointer:fine)").matches) $("mc-email").focus(); else $("mc-f").querySelector(".pri").focus({preventScroll:true});
 } else if(v==="saving"){
  b.innerHTML=`<p>Saving data. Do not remove the memory card.</p><div class="bar"><i></i></div>`;
 } else if(v==="pending"&&CONFIG.sale){   // Roman 23.11: pre-order open — no confirm email; price is tied to the email at checkout
  $("mc-h").textContent="GAME SAVED.";
  b.innerHTML=`<p>Saved to <b>${esc(st.email)}</b>. Your founding price <b>€${fpMe()}</b> is tied to this email and applied automatically at checkout.</p>
  <div class="btns"><button class="btn pri" type="button" id="mc-ok"><span class="g x">✕</span>${pending?"Pre-order my size":"Continue"}</button><button class="btn" type="button" id="mc-new"><span class="g o">○</span>Use another email</button></div>`;
  $("mc-ok").onclick=()=>{A.ok();closeCard()}; $("mc-new").onclick=()=>{A.tick();mcView("form")}; $("mc-ok").focus();
 } else if(v==="pending"){
  b.innerHTML=`<p>We sent an email to <b>${esc(st.email)}</b> from club@zeromrr.club. Tap <b>Lock my €${fpMe()}</b> in it to lock your founding price and get your founding member number.</p>
  <p class="dim">${extra==="demo"?"Demo mode: no email is sent from this preview.":"Not there in 2 minutes? Check spam / Promotions."}</p>
  ${extra==="demo"?"":`<div class="btns mailrow">${mailBtn(st.email)}</div>`}
  <div class="btns"><button class="btn pri" type="button" id="mc-ok"><span class="g x">✕</span>${pending?"Reserve my size":"Continue"}</button><button class="btn" type="button" id="mc-new"><span class="g o">○</span>Use another email</button></div>`;
  $("mc-ok").onclick=()=>{A.ok();closeCard()}; $("mc-new").onclick=()=>{A.tick();mcView("form")}; $("mc-ok").focus();
 } else if(v==="saved"){
  b.innerHTML=`<p class="mc-big">You're on the list.<br>Welcome to the club.</p>
  <p class="mc-no px">Founding member ${esc(st.member?st.member.label:"")}</p>
  <p class="dim">Founding price €${fpMe()} on Drop 01 for the first 48 hours (€${PRICE} after that) + early access.${locked()?" Your early price stays locked.":""} No code needed: use the same email at checkout.</p>
  <div class="btns"><a class="btn" href="${CONFIG.ig}" target="_blank" rel="noopener">Follow on IG</a><a class="btn" href="${CONFIG.x}" target="_blank" rel="noopener">Follow on X</a></div>
  <div class="btns"><button class="btn pri" type="button" id="mc-ok"><span class="g x">✕</span>${pending?"Reserve my size":"Continue"}</button></div>`;
  $("mc-ok").onclick=()=>{A.ok();closeCard()}; $("mc-ok").focus();
 }
}
$("mc").addEventListener("click",e=>{if(e.target===$("mc")){A.back();pending=null;closeCard()}});

/* ---------- inspect ---------- */
let iv=0;
function openInsp(){ T.ev("inspect",TEES[st.tee].id); overlay="insp"; iv=0; $("insp").hidden=false; renderInsp(); hints(); $("insp-x").focus() }
function closeInsp(){ $("insp").hidden=true; overlay=null; hints(); $("insp-open").focus() }
function renderInsp(){ const t=TEES[st.tee], vs=[["Front",t.front]].concat(t.back?[["Back",t.back]]:[]);
 $("insp-h").textContent=`${t.n1} ${t.n2} · ${t.colour}${t.back?"":" · back is blank"}`;
 $("insp-img").src=vs[iv][1]; $("insp-img").alt=`${t.n1} ${t.n2}, ${t.colour}, ${vs[iv][0].toLowerCase()} view`;
 $("insp-tabs").innerHTML=vs.map((v,i)=>`<button type="button" aria-pressed="${i===iv}" data-i="${i}">${v[0]}</button>`).join("");
 $("insp-tabs").querySelectorAll("button").forEach(b=>b.onclick=()=>{iv=+b.dataset.i;A.tick();renderInsp()}) }
$("show").querySelectorAll("button").forEach(b=>b.onclick=()=>{if(!G.setShow)return;G.setShow(b.dataset.m);store.set("zm_show",b.dataset.m);A.whoosh();renderSel()});
$("insp-open").onclick=()=>{A.ok();openInsp()}; $("insp-x").onclick=()=>{A.back();closeInsp()};

/* ---------- keys ---------- */
document.addEventListener("keydown",e=>{
 const k=e.key, typing=/INPUT|TEXTAREA/.test(document.activeElement&&document.activeElement.tagName);
 if(mode==="boot"){ if(k==="Enter"&&document.activeElement!==$("start")){e.preventDefault();pressStart()} return }
 if(mode==="booting"){ G.skip&&G.skip(); return }
 if(overlay==="insp"){ if(k==="Escape"||k==="Backspace"){e.preventDefault();A.back();closeInsp()} else if(k==="ArrowLeft"||k==="ArrowRight"){const n=TEES[st.tee].back?2:1;iv=(iv+1)%n;renderInsp()} return }
 if(overlay==="card"){ if(k==="Escape"){A.back();pending=null;closeCard()} return }
 if(typing) return;
 if(mode==="menu"||mode==="opts"){ const L=mode==="menu"?menuL:optsL;
  if(k==="ArrowDown"){e.preventDefault();L.move(1)} else if(k==="ArrowUp"){e.preventDefault();L.move(-1)}
  else if((k==="Escape"||k==="Backspace")&&mode==="opts"){e.preventDefault();A.back();toMenu()} }
 else if(mode==="drop"){ if(k==="ArrowRight"){e.preventDefault();goTee(1)} else if(k==="ArrowLeft"){e.preventDefault();goTee(-1)}
  else if(k==="Escape"||k==="Backspace"){e.preventDefault();A.back();toMenu()} }
});
addEventListener("hashchange",()=>{const i=TEES.findIndex(t=>"#"+t.id===location.hash);if(i>=0&&i!==st.tee&&mode==="drop"){goTee(i-st.tee)}});
addEventListener("resize",()=>{G.view&&G.view(mode==="drop"?"drop":"menu")});
show();

/* ---------- ready: ad visitors skip the boot screen, queued START taps fire ---------- */
const AD=(()=>{const q=new URLSearchParams(location.search);return q.has("twclid")||q.has("fbclid")||/^(x|tw|ig|fb|meta)/i.test(q.get("utm_source")||"")||/paid|cpc|ads?$/i.test(q.get("utm_medium")||"")})();
const AD_TEE={product:"tell-your-investors",humor:"ceo-of-nothing"}; // utm_campaign contains key → open that tee
// v3.16b: everyone opens on YOU MET ME (IGV kept for analytics) — the tee from the reels
const IGV=(()=>{const q=new URLSearchParams(location.search);return /^ig/i.test(q.get("utm_source")||"")||/instagram/i.test(document.referrer||"")||/Instagram/.test(navigator.userAgent||"")})();
if(!TEES.some(t=>"#"+t.id===location.hash)){const i=TEES.findIndex(t=>t.id==="you-met-me");if(i>=0)st.tee=i}
function autoStart(){ if(mode!=="boot") return;
 if(!TEES.some(t=>"#"+t.id===location.hash)){ const c=(new URLSearchParams(location.search).get("utm_campaign")||"").toLowerCase(), k=Object.keys(AD_TEE).find(k=>c.includes(k)), i=k?TEES.findIndex(t=>t.id===AD_TEE[k]):-1; if(i>=0) st.tee=i } T.ev("start"); store.set("zm_boot",1); $("boot").hidden=true; if(G.ok) G.toLive(); afterBoot(true) }
addEventListener("pointerdown",()=>A.init(),{once:true,capture:true});
window.__zr=1; $("start").textContent="Press start"; $("start").className="start";
if(AD) autoStart(); else if(window.__zq) pressStart();
