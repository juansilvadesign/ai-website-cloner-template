// Footer, ported from the original bundle:
//   - Desktop (fine pointer): moving the mouse over the mural drops photo
//     cards along the path (≥52px and ≥70ms apart, 3.8s life, ≤22 alive); a
//     "mexa o mouse" tooltip follows the pointer while no card is alive.
//   - Touch on wide screens: a tap drops one card. "toca aqui" drops one too.
//   - Phones (<768px): the mural is a tap-to-cycle card stack instead.
//   - The newsletter form only validates and shows a notice (no backend).
import { BASE_ASSETS } from "../data/cardapio";
import { aoRolar, semMovimento } from "./movimento";

const limita = (v: number, min: number, max: number): number => Math.min(max, Math.max(min, v));

const FOTOS = ["01", "02", "03", "04", "05", "06"].map((n) => `${BASE_ASSETS}img/mural/${n}.webp`);
const DISTANCIA_MIN = 52;
const INTERVALO_MIN = 70;
const VIDA_MS = 3800;
/** Dead band under the footer's top edge (the torn edge), px. */
const MARGEM_TOPO = 56;
const MAX_COM_MOUSE = 22;
const MAX_SEM_MOUSE = 9;
const PROPORCAO = 16 / 9;
const PICO = 1.07;
const CURVA = "cubic-bezier(.2,.84,.3,1)";
const GIROS_DA_PILHA = [-3.5, 2.5, -2, 4.5, -4, 3];
const INTERATIVOS = 'a, button, input, textarea, select, label, form, [contenteditable], [role="button"]';

interface Registro {
  animacao: Animation | null;
  relogio: number;
}

export function iniciaRodape(): void {
  const rodape = document.querySelector<HTMLElement>("[data-rodape]");
  const mural = rodape?.querySelector<HTMLElement>("[data-mural]");
  const rastro = rodape?.querySelector<HTMLElement>("[data-rastro]");
  const recado = rodape?.querySelector<HTMLElement>("[data-recado]");
  if (!rodape || !mural || !rastro || !recado) return;

  const dica = rodape.querySelector<HTMLElement>("[data-dica]");
  const mouseFino = matchMedia("(hover: hover) and (pointer: fine)");
  const celular = matchMedia("(max-width: 767.98px)");
  const emInterativo = (e: Event): boolean => e.target instanceof Element && !!e.target.closest(INTERATIVOS);

  // ── phone card stack ──
  const pilha = mural.querySelector<HTMLElement>("[data-pilha]");
  const cartas = pilha ? [...pilha.querySelectorAll<HTMLElement>(".mural__carta")] : [];
  const pilhaStatus = mural.querySelector<HTMLElement>("[data-pilha-status]");
  let frente = 0;
  let animacaoCarta: Animation | null = null;
  const papeis = (): void =>
    cartas.forEach((carta, t) => {
      carta.dataset.papel = ["frente", "perto", "longe"][(t - frente + cartas.length) % cartas.length] ?? "fundo";
    });
  papeis();

  function proximaCarta(): void {
    if (!cartas.length) return;
    animacaoCarta?.cancel();
    frente = (frente + 1) % cartas.length;
    papeis();
    const carta = cartas[frente];
    if (!carta) return;
    const giro = GIROS_DA_PILHA[frente % GIROS_DA_PILHA.length] ?? 0;
    carta.style.setProperty("--gira", `${giro}deg`);
    if (pilhaStatus) pilhaStatus.textContent = `Foto ${frente + 1} de ${cartas.length}`;
    if (!semMovimento && typeof carta.animate === "function") {
      animacaoCarta = carta.animate(
        [
          { transform: `translate3d(0, 24px, 0) rotate(${giro - 8}deg) scale(.95)` },
          { transform: `translate3d(0, 0, 0) rotate(${giro}deg) scale(1)` },
        ],
        { duration: 380, easing: "cubic-bezier(.22,.82,.3,1)" },
      );
    }
  }
  pilha?.addEventListener("click", proximaCarta);

  // ── desktop trail ──
  const vivas: HTMLImageElement[] = [];
  const registros = new Map<HTMLImageElement, Registro>();
  let contador = 0;
  let ultimoTempo = 0;
  let ultimoX = -9999;
  let ultimoY = -9999;
  let dentro = false;
  let toque: { id: number; x: number; y: number; tempo: number; rolado: number } | null = null;
  /** Height of the trail zone: from the footer top down to the newsletter. */
  let zona = 0;

  const medeZona = (): void => {
    const caixa = rodape.getBoundingClientRect();
    zona = limita(recado.getBoundingClientRect().top - caixa.top, 0, caixa.height);
    rodape.style.setProperty("--zona", `${zona}px`);
  };
  const foraDaZona = (e: { clientY: number }): boolean => {
    medeZona();
    const y = e.clientY - rodape.getBoundingClientRect().top;
    return y < MARGEM_TOPO || y >= zona;
  };
  medeZona();
  addEventListener("resize", medeZona, { passive: true });
  addEventListener("load", medeZona, { once: true });
  void document.fonts.ready.then(medeZona);

  function remove(img: HTMLImageElement): void {
    const registro = registros.get(img);
    if (!registro) return;
    clearTimeout(registro.relogio);
    registro.animacao?.cancel();
    registros.delete(img);
    const i = vivas.indexOf(img);
    if (i !== -1) vivas.splice(i, 1);
    img.remove();
    if (!vivas.length && dentro && mouseFino.matches) dica?.classList.add("visivel");
  }

  function solta(x: number, y: number, opcoes: { giro?: number; escala?: number } = {}): void {
    medeZona();
    if (y < MARGEM_TOPO || y >= zona) return;
    const img = document.createElement("img");
    const giro = opcoes.giro ?? -11.5 + Math.random() * 23;
    const escala = opcoes.escala ?? 0.88 + Math.random() * 0.16;
    img.className = "mural__foto";
    img.src = FOTOS[contador % FOTOS.length] ?? "";
    contador += 1;
    img.alt = "";
    img.decoding = "async";
    img.draggable = false;
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    rastro!.appendChild(img);
    // Keep the whole (rotated, overshooting) card below the footer's top edge.
    const largura = img.getBoundingClientRect().width;
    const raio = (Math.hypot(largura, largura * PROPORCAO) * escala * PICO) / 2 + 8;
    img.style.top = `${Math.max(y, raio)}px`;
    vivas.push(img);

    if (semMovimento || typeof img.animate !== "function") {
      img.style.opacity = "1";
      registros.set(img, { animacao: null, relogio: window.setTimeout(() => remove(img), VIDA_MS) });
      while (vivas.length > 1 && vivas[0]) remove(vivas[0]);
      return;
    }
    const animacao = img.animate(
      [
        { opacity: 0, transform: `translate(-50%, -50%) scale(.2) rotate(${giro + 14}deg)` },
        { opacity: 1, offset: 0.2, transform: `translate(-50%, -50%) scale(${escala * PICO}) rotate(${giro - 1.5}deg)` },
        { opacity: 1, offset: 0.8, transform: `translate(-50%, -50%) scale(${escala}) rotate(${giro}deg)` },
        { opacity: 0, transform: `translate(-50%, calc(-50% + 30px)) scale(${escala * 0.66}) rotate(${giro - 7}deg)` },
      ],
      { duration: VIDA_MS, easing: CURVA, fill: "forwards" },
    );
    animacao.addEventListener("finish", () => remove(img), { once: true });
    registros.set(img, { animacao, relogio: window.setTimeout(() => remove(img), 4100) });
    const maximo = mouseFino.matches ? MAX_COM_MOUSE : MAX_SEM_MOUSE;
    while (vivas.length > maximo && vivas[0]) remove(vivas[0]);
  }

  function posicionaDica(e: { clientX: number; clientY: number }): void {
    if (!dica) return;
    const caixa = rodape!.getBoundingClientRect();
    dica.style.left = `${limita(e.clientX - caixa.left + 82, 92, caixa.width - 92)}px`;
    dica.style.top = `${Math.min(e.clientY - caixa.top - 30, zona - 24)}px`;
  }

  rodape.addEventListener(
    "pointermove",
    (e) => {
      if (celular.matches || e.pointerType !== "mouse" || !mouseFino.matches) return;
      if (emInterativo(e) || foraDaZona(e)) {
        dentro = false;
        dica?.classList.remove("visivel");
        return;
      }
      dentro = true;
      const caixa = rodape.getBoundingClientRect();
      const agora = performance.now();
      posicionaDica(e);
      dica?.classList.remove("visivel");
      if (Math.hypot(e.clientX - ultimoX, e.clientY - ultimoY) < DISTANCIA_MIN || agora - ultimoTempo < INTERVALO_MIN) return;
      ultimoX = e.clientX;
      ultimoY = e.clientY;
      ultimoTempo = agora;
      solta(e.clientX - caixa.left, e.clientY - caixa.top);
    },
    { passive: true },
  );

  // Re-show the tooltip when the page scrolls under a resting mouse.
  let ultimoPonteiro: { x: number; y: number } | null = null;
  const registraPonteiro = (e: PointerEvent | WheelEvent): void => {
    const tipo = e instanceof PointerEvent ? e.pointerType : undefined;
    if (tipo === undefined || tipo === "mouse") ultimoPonteiro = { x: e.clientX, y: e.clientY };
  };
  addEventListener("wheel", registraPonteiro, { passive: true });
  addEventListener("pointermove", registraPonteiro, { passive: true });
  aoRolar(() => {
    if (!ultimoPonteiro || !dica || celular.matches || !mouseFino.matches || vivas.length) return;
    const el = document.elementFromPoint(ultimoPonteiro.x, ultimoPonteiro.y);
    const sobre = !!el && rodape.contains(el) && !el.closest(INTERATIVOS) && !foraDaZona({ clientY: ultimoPonteiro.y });
    dentro = sobre;
    if (sobre) posicionaDica({ clientX: ultimoPonteiro.x, clientY: ultimoPonteiro.y });
    dica.classList.toggle("visivel", sobre);
  });

  rodape.addEventListener(
    "pointerenter",
    (e) => {
      if (celular.matches || e.pointerType !== "mouse" || !mouseFino.matches || emInterativo(e) || foraDaZona(e)) return;
      dentro = true;
      posicionaDica(e);
      if (!vivas.length) dica?.classList.add("visivel");
    },
    { passive: true },
  );
  rodape.addEventListener(
    "pointerleave",
    () => {
      dentro = false;
      ultimoX = ultimoY = -9999;
      dica?.classList.remove("visivel");
    },
    { passive: true },
  );
  rodape.addEventListener(
    "pointerdown",
    (e) => {
      toque = null;
      if (celular.matches || e.pointerType === "mouse" || !e.isPrimary || emInterativo(e) || foraDaZona(e)) return;
      toque = { id: e.pointerId, x: e.clientX, y: e.clientY, tempo: performance.now(), rolado: window.scrollY };
    },
    { passive: true },
  );
  rodape.addEventListener(
    "pointerup",
    (e) => {
      const inicio = toque;
      toque = null;
      if (
        celular.matches ||
        !inicio ||
        inicio.id !== e.pointerId ||
        emInterativo(e) ||
        foraDaZona(e) ||
        performance.now() - inicio.tempo > 600 ||
        Math.hypot(e.clientX - inicio.x, e.clientY - inicio.y) > 10 ||
        Math.abs(window.scrollY - inicio.rolado) > 6
      )
        return;
      const caixa = rodape.getBoundingClientRect();
      solta(limita(e.clientX - caixa.left, 36, caixa.width - 36), limita(e.clientY - caixa.top, 50, caixa.height - 50), {
        giro: -9 + Math.random() * 18,
        escala: 1.04,
      });
    },
    { passive: true },
  );
  rodape.addEventListener(
    "pointercancel",
    () => {
      toque = null;
    },
    { passive: true },
  );

  mural.querySelector("[data-toque]")?.addEventListener("click", () => {
    if (celular.matches) {
      proximaCarta();
      return;
    }
    const caixa = rodape.getBoundingClientRect();
    const caixaMural = mural.getBoundingClientRect();
    medeZona();
    solta(caixaMural.left - caixa.left + caixaMural.width * 0.5, limita(caixaMural.top - caixa.top + caixaMural.height * 0.5, 57, zona - 1), {
      giro: -9 + Math.random() * 18,
      escala: 1.04,
    });
  });

  const limpa = (): void => {
    dentro = false;
    toque = null;
    dica?.classList.remove("visivel");
    [...vivas].forEach(remove);
  };
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) limpa();
  });
  new IntersectionObserver(([entrada]) => {
    if (entrada && !entrada.isIntersecting) limpa();
  }).observe(rodape);

  // ── newsletter (front-end only, as in the original) ──
  const form = rodape.querySelector<HTMLFormElement>("[data-recado-form]");
  const aviso = rodape.querySelector<HTMLElement>("[data-recado-aviso]");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.elements.namedItem("email");
    if (!(email instanceof HTMLInputElement)) return;
    const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    if (aviso) aviso.textContent = valido ? "Anotado. Calma, que a gente escreve." : "Confere o e-mail e tenta de novo.";
    if (valido) form.reset();
    else email.focus();
  });
}
