// Shared motion plumbing, ported from the original bundle: Lenis smooth
// scroll, one rAF-coalesced "frame" loop every scroll-linked effect registers
// on, and the small math helpers they share.
import Lenis from "lenis";

/** `prefers-reduced-motion`: no Lenis, no scroll transforms, no animations. */
export const semMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;

export const limita = (valor: number, min = 0, max = 1): number => Math.min(max, Math.max(min, valor));

/** Smoothstep. */
export const suave = (t: number): number => t * t * (3 - 2 * t);

type Quadro = (alturaJanela: number) => void;

let lenis: Lenis | null = null;
let pedido = 0;
const quadros = new Set<Quadro>();

function desenha(): void {
  pedido = 0;
  const alturaJanela = window.innerHeight || document.documentElement.clientHeight;
  for (const quadro of quadros) quadro(alturaJanela);
}

/** Ask for one frame of every registered effect (coalesced). */
export const agenda = (): void => {
  pedido ||= requestAnimationFrame(desenha);
};

/** Register a scroll/resize-linked effect; it runs once immediately (next frame). */
export const aoRolar = (quadro: Quadro): void => {
  quadros.add(quadro);
  agenda();
};

export function iniciaRolagem(): void {
  if (!semMovimento) {
    lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      allowNestedScroll: true,
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.094,
      wheelMultiplier: 0.96,
      touchMultiplier: 1,
    });
    lenis.on("scroll", agenda);
    const recalcula = (): void => lenis?.resize();
    addEventListener("load", recalcula, { once: true });
    addEventListener("pageshow", recalcula);
    void document.fonts.ready.then(recalcula);
  }
  addEventListener("scroll", agenda, { passive: true });
  addEventListener("resize", agenda, { passive: true });
  void document.fonts.ready.then(agenda);
  agenda();
}

export function rolarPara(y: number): void {
  if (lenis) lenis.scrollTo(Math.max(0, y));
  else scrollTo({ top: Math.max(0, y), behavior: "auto" });
}

export const pausaRolagem = (): void => lenis?.stop();
export const retomaRolagem = (): void => lenis?.start();
