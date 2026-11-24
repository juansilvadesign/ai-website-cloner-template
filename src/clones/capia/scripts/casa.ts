// Story section: stickers and photos fade, rise and scale in as a cascade
// while each one crosses from 97% to 58% of the viewport height. The rise and
// scale use a back-out curve (a small overshoot), the fade a smoothstep.
import { aoRolar, limita, semMovimento, suave } from "./movimento";

const FIM = 0.97;
const INICIO = 0.58;
const SELOS = { sobe: 112, escala: 0.92, atraso: 30 } as const;
const FOTOS = { sobe: 168, escala: 0.895, atraso: 20 } as const;

/** Back-out easing: 0→1 with a ~3% overshoot. */
const passa = (t: number): number => 1 + 2.42 * (t - 1) ** 3 + 1.42 * (t - 1) ** 2;

/** Document offset top through the offsetParent chain (ignores transforms). */
const topoNoDocumento = (el: HTMLElement): number => {
  let y = 0;
  for (let n: Element | null = el; n instanceof HTMLElement; n = n.offsetParent) y += n.offsetTop || 0;
  return y;
};

function revela(el: HTMLElement, t: number, { sobe, escala }: { sobe: number; escala: number }): void {
  const p = passa(t);
  el.style.setProperty("--vis", suave(t).toFixed(4));
  el.style.setProperty("--sobe", `${((1 - p) * sobe).toFixed(2)}px`);
  el.style.setProperty("--cresce", (escala + (1 - escala) * p).toFixed(4));
}

export function iniciaCasa(): void {
  const secao = document.querySelector<HTMLElement>("[data-casa]");
  if (!secao || semMovimento) return;
  const selos = [...secao.querySelectorAll<HTMLElement>("[data-selo]")];
  const fotos = [...secao.querySelectorAll<HTMLElement>("[data-foto]")];

  aoRolar((alturaJanela) => {
    const caixa = secao.getBoundingClientRect();
    if (caixa.bottom < -320 || caixa.top > alturaJanela + 320) return;
    const fim = alturaJanela * FIM;
    const curso = fim - alturaJanela * INICIO;
    const rolado = window.scrollY;
    selos.forEach((el, i) => revela(el, limita((fim - (topoNoDocumento(el) - rolado) - i * SELOS.atraso) / curso), SELOS));
    fotos.forEach((el, i) => revela(el, limita((fim - (topoNoDocumento(el) - rolado) - i * FOTOS.atraso) / curso), FOTOS));
  });
}
