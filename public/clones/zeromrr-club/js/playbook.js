/* Ported from playbook.zeromrr.club/playbook (inline scripts). Clone changes: analytics forced off;
   the waitlist and lead forms resolve locally (demo mode) instead of POSTing to /api/digital. */
function demoPost(){return new Promise(function(r){setTimeout(function(){r({ok:true})},400)})}

(function(){
 var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 // reveal on scroll
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);
   if(e.target.classList.contains('stats'))countUp(e.target);}})},{threshold:.15});
 document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
 function countUp(box){box.querySelectorAll('.stat').forEach(function(s){s.classList.add('in')});
  if(reduce)return;
  box.querySelectorAll('b[data-count]').forEach(function(b){var to=parseFloat(b.dataset.count),dec=+(b.dataset.dec||0),suf=b.dataset.suffix||'',t0=null;
   function step(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/1200),v=to*(1-Math.pow(1-k,3));b.textContent=v.toFixed(dec)+suf;if(k<1)requestAnimationFrame(step)}
   requestAnimationFrame(step)})}
 // phone carousel
 var vids=[].slice.call(document.querySelectorAll('#screen video')),vc=document.getElementById('vcount'),i=0;
 if(vids.length&&!reduce){setInterval(function(){vids[i].classList.remove('on');i=(i+1)%vids.length;var v=vids[i];
   try{v.currentTime=0;v.play()}catch(e){}v.classList.add('on');vc.textContent=v.dataset.views},6000)}
 // lazy play step video
 var sv=document.querySelector('.step video');
 if(sv){new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){sv.preload='auto';try{sv.play()}catch(x){}}})},{threshold:.3}).observe(sv)}
})();


// v3.51 analytics → /api/track (prod domains only; ?notrack=1 turns it off on this device).
// Source: ?s=bio | ?s=reel_ex | ?s=story | ?s=dm (or utm_source). First touch is kept for 30 days.
document.addEventListener('DOMContentLoaded',function(){var f=document.getElementById('wl');if(!f)return;
 f.addEventListener('submit',function(e){e.preventDefault();var em=document.getElementById('wl-email'),v=(em.value||'').trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)){em.focus();em.style.borderColor='#ef8a4e';return}
  var btn=document.getElementById('buy-pro');btn.disabled=true;btn.textContent='Saving…';
  demoPost('/api/digital?a=waitlist',{method:'POST',headers:{'Content-Type':'application/json'},
   body:JSON.stringify({email:v,owns:document.getElementById('wl-owns').checked,vid:window.PB&&PB.vid,src:window.PB&&PB.src&&PB.src()})})
  .then(function(r){if(!r.ok)throw 0;em.style.display='none';f.querySelector('label').style.display='none';btn.style.display='none';document.getElementById('wl-ok').style.display='block'})
  .catch(function(){btn.disabled=false;btn.textContent='Try again'})})});
// v3.58 free lead magnet → /api/digital?a=lead
document.addEventListener('DOMContentLoaded',function(){var f=document.getElementById('lead');if(!f)return;
 f.addEventListener('submit',function(e){e.preventDefault();var em=document.getElementById('lead-email'),v=(em.value||'').trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)){em.focus();em.style.borderColor='#ef8a4e';return}
  var btn=document.getElementById('lead-btn');btn.disabled=true;btn.textContent='Sending…';
  demoPost('/api/digital?a=lead',{method:'POST',headers:{'Content-Type':'application/json'},
   body:JSON.stringify({email:v,vid:window.PB&&PB.vid,src:window.PB&&PB.src&&PB.src()})})
  .then(function(r){if(!r.ok)throw 0;em.style.display='none';btn.style.display='none';document.getElementById('lead-ok').style.display='block';if(window.PB)PB.ev('pb_lead')})
  .catch(function(){btn.disabled=false;btn.textContent='Try again'})})});
var PB=(function(){
 var ls={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
 var rid=function(){var a=new Uint8Array(12);crypto.getRandomValues(a);return Array.prototype.map.call(a,function(b){return(b%36).toString(36)}).join('')};
 var qs=new URLSearchParams(location.search);
 if(qs.has('notrack'))ls.set('zm_notrack','1');
 var off=true||!!ls.get('zm_notrack')||!/(^|\.)zeromrr\.club$/.test(location.hostname);
 var vid=ls.get('zm_vid');if(!vid){vid=rid();ls.set('zm_vid',vid)}
 var sid;try{sid=sessionStorage.getItem('zm_sid');if(!sid){sid=rid();sessionStorage.setItem('zm_sid',sid)}}catch(e){sid=rid()}
 var src=(qs.get('s')||qs.get('utm_source')||qs.get('ref')||'').toLowerCase().replace(/[^a-z0-9_-]/g,'').slice(0,40);
 var first=null;try{first=JSON.parse(ls.get('zm_pb_src')||'null')}catch(e){}
 if(src&&(!first||Date.now()-first.t>30*864e5)){first={s:src,t:Date.now()};ls.set('zm_pb_src',JSON.stringify(first))}
 var utm={s:src||(first&&first.s)||'',m:qs.get('utm_medium')||'',c:qs.get('utm_campaign')||''};
 var q=[],tm=0;
 function flush(){if(!q.length)return;var body=JSON.stringify({v:vid,s:sid,p:location.pathname,r:document.referrer||'',u:utm,l:navigator.language||'',e:q.splice(0)});
  try{if(navigator.sendBeacon&&navigator.sendBeacon('/api/track',new Blob([body],{type:'text/plain'})))return}catch(e){}
  fetch('/api/track',{method:'POST',body:body,keepalive:true,headers:{'Content-Type':'text/plain'}}).catch(function(){})}
 function ev(n,t,ms){if(off)return;var o={n:n};if(t)o.t=t;if(ms!=null)o.ms=ms;q.push(o);clearTimeout(tm);tm=setTimeout(flush,n==='pb_view'?0:1200)}
 var left=0;function bye(){if(!off&&!left){left=1;q.push({n:'leave',ms:Math.round(performance.now())})}flush()}
 addEventListener('pagehide',bye);document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')bye();else left=0});
 return {ev:ev,vid:vid,src:function(){return utm.s}};
})();
PB.ev('pb_view');
(function(){
 var pr=document.getElementById('pricing'),seen=0;
 if(pr&&'IntersectionObserver' in window)new IntersectionObserver(function(es){if(!seen&&es[0].isIntersecting){seen=1;PB.ev('pb_price')}},{threshold:.2}).observe(pr);
 [['buy-basic','playbook'],['buy-pro','pro'],['buy-dwy','dwy']].forEach(function(x){var b=document.getElementById(x[0]);if(b)b.addEventListener('click',function(){PB.ev('pb_buy',x[1])})});
 document.querySelectorAll('details').forEach(function(d,i){d.addEventListener('toggle',function(){if(d.open)PB.ev('pb_faq',null,i)})});
})();
