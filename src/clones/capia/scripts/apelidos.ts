// "Chame como quiser": the four nickname bubbles drift with scroll
// (--ax/--ay/--ar) and the scooter capybara crosses the section on a
// parabola (--voo-x/--voo-y/--voo-r). Progress runs 0→1 while the section
// travels from the bottom of the viewport to off the top.
import { aoRolar, limita, semMovimento, suave } from "./movimento";

/** Per-bubble [x px, y px, rotation deg] at full drift, cycled. */
const DERIVA: readonly (readonly [number, number, number])[] = [
  [33, -43, 9],
  [-32, 44, -10],
  [24, 45, 9],
  [-28, -37, -7],
];
const VOO = { de: -106, ate: 106, pulo: 52, puloNoCelular: 27, giroDe: 6.2, giroAte: -4.8, comeca: 0.05, dura: 0.9 } as const;
const ESCALA_CELULAR = 0.72;

export function iniciaApelidos(): void {
  const secao = document.querySelector<HTMLElement>("[data-apelidos]");
  if (!secao || semMovimento) return;
  const apelidos = [...secao.querySelectorAll<HTMLElement>("[data-apelido]")];
  const voo = secao.querySelector<HTMLElement>("[data-voo]");
  const celular = matchMedia("(max-width: 575.98px)");

  aoRolar((alturaJanela) => {
    const caixa = secao.getBoundingClientRect();
    if (caixa.bottom < -240 || caixa.top > alturaJanela + 240) return;
    const progresso = limita((alturaJanela - caixa.top) / (alturaJanela + caixa.height));
    const deslocamento = (suave(progresso) - 0.5) * 2;
    const escala = celular.matches ? ESCALA_CELULAR : 1;

    apelidos.forEach((apelido, i) => {
      const [x, y, giro] = DERIVA[i % DERIVA.length] ?? [0, 0, 0];
      apelido.style.setProperty("--ax", `${(x * deslocamento * escala).toFixed(2)}px`);
      apelido.style.setProperty("--ay", `${(y * deslocamento * escala).toFixed(2)}px`);
      apelido.style.setProperty("--ar", `${(giro * deslocamento * escala).toFixed(2)}deg`);
    });

    if (voo) {
      const t = limita((progresso - VOO.comeca) / VOO.dura);
      const pulo = celular.matches ? VOO.puloNoCelular : VOO.pulo;
      voo.style.setProperty("--voo-x", `${(VOO.de + t * (VOO.ate - VOO.de)).toFixed(2)}vw`);
      voo.style.setProperty("--voo-y", `${(-pulo * Math.sin(t * Math.PI)).toFixed(2)}px`);
      voo.style.setProperty("--voo-r", `${(VOO.giroDe + t * (VOO.giroAte - VOO.giroDe)).toFixed(2)}deg`);
    }
  });
}
