/* Ported from zeromrr.club/ (early START handler). Clone change: the visit beacon is removed. */

/* early: START works before the 1.2 MB page finishes loading; visit is logged immediately */
(function(){var b=document.getElementById("start"),bt=document.getElementById("boot");
function q(e){if(window.__zr)return;if(e&&e.target!==b&&e.target!==bt)return;window.__zq=1;b.textContent="Loading…";b.className="start ld"}
b.addEventListener("click",q);bt.addEventListener("click",q);
["pointerdown","touchstart","keydown","wheel"].forEach(function(t){addEventListener(t,function(){if(!window.__zh)window.__zh=Math.round(performance.now())||1},{capture:true,passive:true,once:true})});
})();
