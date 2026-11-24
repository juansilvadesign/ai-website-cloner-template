// Word marquee: each track starts offset by a share of the section width
// minus one repetition (--base), and both slide sideways with scroll (--anda).
import { aoRolar, limita, semMovimento, suave } from "./movimento";

/** Starting offset of each line, % of the section width. */
const INICIO = [-13.4, 1.6];
const PERCURSO_VW = 14.5;
const PERCURSO_CELULAR_VW = 30;
/** Must match REPETICOES in components/Faixa.astro. */
const REPETICOES = 4;

export function iniciaFaixa(): void {
  const secao = document.querySelector<HTMLElement>("[data-faixa]");
  if (!secao) return;
  const trilhos = [...secao.querySelectorAll<HTMLElement>("[data-trilho-faixa]")];
  const celular = matchMedia("(max-width: 575.98px)");

  const posiciona = (): void =>
    trilhos.forEach((trilho, i) => {
      const volta = trilho.scrollWidth / REPETICOES;
      const inicio = INICIO[i % INICIO.length] ?? 0;
      trilho.style.setProperty("--base", `${((inicio / 100) * secao.clientWidth - volta).toFixed(1)}px`);
    });
  posiciona();
  new ResizeObserver(posiciona).observe(secao);
  void document.fonts.ready.then(posiciona);

  if (semMovimento) return;
  aoRolar((alturaJanela) => {
    const caixa = secao.getBoundingClientRect();
    if (caixa.bottom < -120 || caixa.top > alturaJanela + 120) return;
    const deslocamento = (suave(limita((alturaJanela - caixa.top) / (alturaJanela + caixa.height))) - 0.5) * 2;
    const percurso = celular.matches ? PERCURSO_CELULAR_VW : PERCURSO_VW;
    for (const trilho of trilhos) trilho.style.setProperty("--anda", `${(-deslocamento * percurso).toFixed(2)}vw`);
  });
}
