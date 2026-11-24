// The menu, ported from the original bundle:
//   1. Per panel, a carousel of item pills (click, arrows, keyboard, 42px
//      swipe). It loops with cloned pills when the category has more than
//      PILULAS_SEM_LACO items, and always on phones (centred).
//   2. Per panel, the stage: choosing an item preloads its 8 images, fades
//      the stage out (145ms, 12ms cascade), swaps sources/seals/ingredients,
//      fades back in (440ms, scale 560ms, 32ms cascade), announces it.
//   3. Across panels, scroll: active panel + dot rail, covered panels go
//      inert, the product rises/scales in, ingredients drift with scroll, the
//      dot rail stops at the end of the stack.
//   4. A time loop: ingredients orbit gently while their panel is visible.
import {
  PILULAS_SEM_LACO,
  cardapio,
  pecaSrc,
  produtoSrc,
  type CategoriaCardapio,
  type ItemCardapio,
} from "../data/cardapio";
import { aoRolar, limita, rolarPara, semMovimento, suave } from "./movimento";

const TROCA = { sai: 145, cascataSai: 12, entra: 440, cresce: 560, cascataEntra: 32, escala: 0.95 } as const;
const NORMALIZA_APOS_MS = 480;
const ARRASTE_MIN_PX = 42;
const celular = matchMedia("(max-width: 767.98px)");

// ─── image preloading (shared cache, 12s timeout) ──────────────────────────
const cache = new Map<string, Promise<string>>();

function precarrega(url: string): Promise<string> {
  let promessa = cache.get(url);
  if (!promessa) {
    promessa = new Promise<string>((resolve, reject) => {
      const img = new Image();
      const limite = setTimeout(() => reject(new Error("imagem demorou")), 12e3);
      img.onload = () => {
        clearTimeout(limite);
        Promise.resolve(img.decode?.())
          .catch(() => undefined)
          .then(() => resolve(url));
      };
      img.onerror = () => {
        clearTimeout(limite);
        reject(new Error(`não carregou ${url}`));
      };
      img.src = url;
    }).catch((erro: unknown) => {
      cache.delete(url);
      throw erro;
    });
    cache.set(url, promessa);
  }
  return promessa;
}

/** Stage image sources in DOM order: 7 ingredient slots, then the product. */
const imagensDoItem = (item: ItemCardapio): string[] => [...item.pecas.map(pecaSrc), produtoSrc(item.id)];

// ─── the stage ──────────────────────────────────────────────────────────────
interface Palco {
  mostra(indice: number): Promise<boolean | undefined>;
  atual(): number;
  aquece(indice: number): void;
}

function criaPalco(painel: HTMLElement, categoria: CategoriaCardapio): Palco {
  const imagens = [
    ...painel.querySelectorAll<HTMLImageElement>("[data-peca] img"),
    ...painel.querySelectorAll<HTMLImageElement>("[data-produto] img"),
  ];
  const textos = [painel.querySelector<HTMLElement>("[data-selos]"), painel.querySelector<HTMLElement>("[data-ingredientes]")].filter(
    (el): el is HTMLElement => el !== null,
  );
  const alvos: HTMLElement[] = [...imagens, ...textos];
  const opacidades = alvos.map((el) => Number(getComputedStyle(el).opacity));
  const status = painel.querySelector<HTMLElement>("[data-status]");
  let pedido = 0;
  let mostrado = 0;
  let versao = 0;
  let animacoes: Animation[] = [];
  const cancela = (): void => {
    animacoes.forEach((a) => a.cancel());
    animacoes = [];
  };

  function anima(saindo: boolean): Promise<void> {
    if (semMovimento || typeof Element.prototype.animate !== "function") return Promise.resolve();
    return Promise.all(
      alvos.map((el, i) => {
        const opacidade = opacidades[i] ?? 1;
        const atraso = i * (saindo ? TROCA.cascataSai : TROCA.cascataEntra);
        const menor: Keyframe = { transform: `scale(${TROCA.escala})` };
        const fade = el.animate(saindo ? [{ opacity: opacidade }, { opacity: 0 }] : [{ opacity: 0 }, { opacity: opacidade }], {
          duration: saindo ? TROCA.sai : TROCA.entra,
          delay: atraso,
          easing: saindo ? "ease-in" : "cubic-bezier(.16,1,.3,1)",
          fill: "both",
        });
        const escala = el.animate(saindo ? [{ transform: "scale(1)" }, menor] : [menor, { transform: "scale(1)" }], {
          duration: saindo ? TROCA.sai : TROCA.cresce,
          delay: atraso,
          easing: "cubic-bezier(.16,1,.3,1)",
          composite: "add",
          fill: "both",
        });
        animacoes.push(fade, escala);
        return Promise.all([fade.finished, escala.finished]).catch(() => undefined);
      }),
    ).then(() => undefined);
  }

  function aplica(item: ItemCardapio): void {
    const fontes = imagensDoItem(item);
    imagens.forEach((img, i) => {
      const src = fontes[i];
      if (src) img.src = src;
    });
    const produto = imagens[imagens.length - 1];
    if (produto) produto.alt = item.nome;
    painel
      .querySelector("[data-selos]")
      ?.replaceChildren(...item.selos.map((texto) => Object.assign(document.createElement("li"), { textContent: texto })));
    const ingredientes = painel.querySelector("[data-ingredientes]");
    if (ingredientes) ingredientes.textContent = item.ingredientes.join(" · ");
  }

  async function mostra(indice: number): Promise<boolean | undefined> {
    const item = categoria.itens[indice];
    if (!item || pedido === indice) return undefined;
    pedido = indice;
    const minhaVersao = ++versao;
    cancela();
    if (mostrado === indice) {
      painel.removeAttribute("aria-busy");
      return undefined;
    }
    painel.setAttribute("aria-busy", "true");
    try {
      await Promise.all(imagensDoItem(item).map(precarrega));
      if (minhaVersao !== versao) return undefined;
      await anima(true);
      if (minhaVersao !== versao) return undefined;
      aplica(item);
      mostrado = indice;
      cancela();
      await anima(false);
      if (minhaVersao !== versao) return undefined;
      cancela();
      painel.removeAttribute("aria-busy");
      if (status) status.textContent = `${item.nome}: ${item.ingredientes.join(", ")}.`;
      return undefined;
    } catch (erro) {
      if (minhaVersao !== versao) return undefined;
      cancela();
      pedido = mostrado;
      painel.removeAttribute("aria-busy");
      if (status) status.textContent = "As imagens deste item não carregaram. Tente de novo.";
      const motivo = erro instanceof Error ? erro.message : "imagem indisponível";
      console.error(`[cardápio] "${item.nome}": ${motivo}. Confira os nomes em data/cardapio.ts e os arquivos em public/clones/capia/img/.`);
      return false;
    }
  }

  return {
    mostra,
    atual: () => mostrado,
    aquece(indice) {
      const item = categoria.itens[indice];
      if (item) imagensDoItem(item).forEach((url) => void precarrega(url).catch(() => undefined));
    },
  };
}

// ─── the item carousel ──────────────────────────────────────────────────────
function iniciaSeletor(painel: HTMLElement, categoria: CategoriaCardapio): void {
  const seletor = painel.querySelector<HTMLElement>("[data-seletor]");
  const janela = seletor?.querySelector<HTMLElement>("[data-janela]");
  const trilho = seletor?.querySelector<HTMLElement>("[data-trilho]");
  if (!seletor || !janela || !trilho) return;
  const originais = [...trilho.querySelectorAll<HTMLElement>(":scope > [data-indice]")];
  const total = originais.length;
  if (!total) return;

  const palco = criaPalco(painel, categoria);
  const mod = (n: number, m = total): number => ((n % m) + m) % m;
  const doc = document.implementation.createHTMLDocument("");
  const copia = (el: HTMLElement): HTMLElement => {
    const c = doc.importNode(el, true);
    c.dataset.copia = "true";
    c.setAttribute("aria-hidden", "true");
    c.removeAttribute("role");
    c.removeAttribute("aria-selected");
    c.tabIndex = -1;
    return c;
  };
  trilho.prepend(...originais.map(copia));
  trilho.append(...originais.map(copia));
  const todos = [...trilho.children].filter((el): el is HTMLElement => el instanceof HTMLElement);

  let atual = 0;
  let relogio = 0;
  let inicioArraste: number | null = null;
  const emLaco = (): boolean => celular.matches || total > PILULAS_SEM_LACO;

  function posiciona(animado = true): void {
    trilho!.classList.toggle("sem-transicao", !animado);
    const laco = emLaco();
    for (const el of todos) if (el.dataset.copia) el.hidden = !laco;
    if (!laco) {
      trilho!.style.transform = "none";
      return;
    }
    // Desktop shows the active pill second; phones centre it.
    const alvo = todos[total + atual - (celular.matches ? 0 : 1)];
    if (!alvo) return;
    const x = celular.matches ? janela!.clientWidth / 2 - (alvo.offsetLeft + alvo.offsetWidth / 2) : -alvo.offsetLeft;
    trilho!.style.transform = `translate3d(${x}px, 0, 0)`;
  }

  /** After moving onto a clone, jump back to the matching original without a transition. */
  function normaliza(): void {
    if (atual >= 0 && atual < total) return;
    atual = mod(atual);
    posiciona(false);
    trilho!.getBoundingClientRect();
    requestAnimationFrame(() => trilho!.classList.remove("sem-transicao"));
  }

  function seleciona(indice: number, animado = true): void {
    atual = emLaco() ? indice : mod(indice);
    const real = mod(atual);
    for (const el of todos) {
      const ativo = Number(el.dataset.indice) === real;
      el.classList.toggle("ativa", ativo);
      if (!el.dataset.copia) {
        el.setAttribute("aria-selected", String(ativo));
        el.tabIndex = ativo ? 0 : -1;
      }
    }
    posiciona(animado && !semMovimento);
    clearTimeout(relogio);
    relogio = window.setTimeout(normaliza, animado ? NORMALIZA_APOS_MS : 0);
    void palco.mostra(real).then((resultado) => {
      if (resultado === false) vaiPara(palco.atual());
    });
  }

  /** Select `indice` through the nearest equivalent loop position. */
  const vaiPara = (indice: number): void => seleciona(indice + Math.round((atual - indice) / total) * total);

  trilho.addEventListener("click", (e) => {
    const alvo = e.target instanceof Element ? e.target.closest<HTMLElement>("[data-indice]") : null;
    if (alvo && trilho.contains(alvo)) vaiPara(Number(alvo.dataset.indice));
  });
  seletor.querySelector("[data-anterior]")?.addEventListener("click", () => seleciona(atual - 1));
  seletor.querySelector("[data-proximo]")?.addEventListener("click", () => seleciona(atual + 1));
  trilho.addEventListener("transitionend", (e) => {
    if (e.target === trilho) normaliza();
  });
  originais.forEach((pilula) =>
    pilula.addEventListener("keydown", (e) => {
      const passo = e.key === "ArrowLeft" ? -1 : e.key === "ArrowRight" ? 1 : 0;
      if (!passo) return;
      e.preventDefault();
      seleciona(atual + passo);
      originais[mod(atual)]?.focus({ preventScroll: true });
    }),
  );
  janela.addEventListener("pointerdown", (e) => {
    inicioArraste = e.clientX;
  });
  janela.addEventListener("pointerup", (e) => {
    if (inicioArraste === null) return;
    const delta = e.clientX - inicioArraste;
    inicioArraste = null;
    if (Math.abs(delta) >= ARRASTE_MIN_PX) seleciona(atual + (delta < 0 ? 1 : -1));
  });
  janela.addEventListener("pointercancel", () => {
    inicioArraste = null;
  });

  const aquece = (e: Event): void => {
    const alvo = e.target instanceof Element ? e.target.closest<HTMLElement>("[data-indice]") : null;
    if (alvo) palco.aquece(Number(alvo.dataset.indice));
  };
  trilho.addEventListener("pointerover", aquece, { passive: true });
  trilho.addEventListener("focusin", aquece);
  new ResizeObserver(() => posiciona(false)).observe(janela);
  celular.addEventListener("change", () => {
    atual = mod(atual);
    posiciona(false);
  });
  seleciona(0, false);

  // Warm the neighbours once the panel is near.
  const observador = new IntersectionObserver(
    ([entrada]) => {
      if (!entrada?.isIntersecting) return;
      observador.disconnect();
      palco.aquece(1 % total);
      palco.aquece(total - 1);
    },
    { rootMargin: "240px" },
  );
  observador.observe(painel);

  addEventListener("load", () => posiciona(false), { once: true });
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      posiciona(false);
      trilho.classList.remove("sem-transicao");
    }),
  );
}

// ─── scroll choreography across the panel stack ─────────────────────────────
const LINHA_ATIVA = 0.42;
const ENTRADA = { curso: 0.76, sobe: 132, escala: 0.88, botao: 186 } as const;
/** Per-slot scroll drift (x/y/giro × direction) and float (fx/fy/fr over `volta` ms). */
interface MovimentoPeca {
  x: number;
  y: number;
  giro: number;
  dx: number;
  dy: number;
  fx: number;
  fy: number;
  fr: number;
  volta: number;
}
const MOVIMENTO_PECAS: readonly MovimentoPeca[] = [
  { x: 26, y: 34, giro: 2.8, dx: 1, dy: -1, fx: 8, fy: 13, fr: 1.4, volta: 4700 },
  { x: 41, y: 52, giro: 5.2, dx: -1, dy: 1, fx: 11.5, fy: 17.5, fr: 2.6, volta: 5300 },
  { x: 56, y: 72, giro: 7.4, dx: 1, dy: 1, fx: 15, fy: 22, fr: 3.8, volta: 5900 },
  { x: 70, y: 34, giro: 9.6, dx: -1, dy: -1, fx: 18, fy: 26, fr: 1.4, volta: 6500 },
  { x: 26, y: 52, giro: 2.8, dx: 1, dy: 1, fx: 8, fy: 13, fr: 2.6, volta: 7100 },
  { x: 41, y: 72, giro: 5.2, dx: -1, dy: 1, fx: 11.5, fy: 17.5, fr: 3.8, volta: 4900 },
  { x: 56, y: 34, giro: 7.4, dx: 1, dy: -1, fx: 15, fy: 22, fr: 1.4, volta: 5500 },
];
const DERIVA_CELULAR = 0.62;
const FLUTUA_CELULAR = 0.72;
const MOVIMENTO_NULO: MovimentoPeca = { x: 0, y: 0, giro: 0, dx: 0, dy: 0, fx: 0, fy: 0, fr: 0, volta: 1 };

interface Peca extends MovimentoPeca {
  el: HTMLElement;
  fase: number;
}
interface PainelVivo {
  el: HTMLElement;
  id: string;
  ancora: HTMLElement;
  folga: HTMLElement;
  produto: HTMLElement | null;
  botao: HTMLElement | null;
  visivel: boolean;
  coberto: boolean;
  pecas: Peca[];
}

function iniciaRolagemDoCardapio(): void {
  const raiz = document.querySelector<HTMLElement>("[data-cardapio]");
  if (!raiz) return;
  const nav = raiz.querySelector<HTMLElement>("[data-nav]");
  const pontos = [...raiz.querySelectorAll<HTMLElement>("[data-ir]")];
  const paineis: PainelVivo[] = [...raiz.querySelectorAll<HTMLElement>("[data-painel]")].map((el, t) => ({
    el,
    id: el.dataset.painel ?? "",
    ancora: el.previousElementSibling as HTMLElement,
    folga: el.nextElementSibling as HTMLElement,
    produto: el.querySelector<HTMLElement>("[data-produto]"),
    botao: el.querySelector<HTMLElement>("[data-pedir]"),
    visivel: true,
    coberto: false,
    pecas: [...el.querySelectorAll<HTMLElement>("[data-peca]")].map((peca, n) => ({
      el: peca,
      ...(MOVIMENTO_PECAS[(n + t) % MOVIMENTO_PECAS.length] ?? MOVIMENTO_NULO),
      fase: n * 1.21 + t * 0.94,
    })),
  }));
  const ultimo = paineis[paineis.length - 1];
  if (!ultimo) return;

  nav?.style.setProperty("--n", String(paineis.length));
  pontos.forEach((ponto, t) =>
    ponto.addEventListener("click", () => {
      const painel = paineis[t];
      if (painel) rolarPara(painel.ancora.getBoundingClientRect().top + window.scrollY);
    }),
  );

  let margemNav = 220;
  const medeNav = (): void => {
    if (nav) margemNav = parseFloat(getComputedStyle(nav).marginTop) || 220;
  };
  medeNav();
  addEventListener("resize", medeNav, { passive: true });

  let desvioNav = 0;
  let ativoAnterior = -1;
  aoRolar((alturaJanela) => {
    const linha = alturaJanela * LINHA_ATIVA;
    const pequeno = window.innerWidth <= 575;
    let ativo = 0;

    // Keep the sticky dot rail from overrunning the end of the panel stack.
    if (nav && nav.offsetParent !== null) {
      const caixaNav = nav.getBoundingClientRect();
      const topoMinimo = Math.max(0, margemNav - caixaNav.height / 2);
      const fimPaineis = ultimo.el.getBoundingClientRect().bottom;
      const desvio = Math.min(0, fimPaineis - topoMinimo - (caixaNav.bottom - desvioNav));
      desvioNav = desvio;
      nav.style.transform = `translateY(calc(-50% + ${desvio.toFixed(1)}px))`;
    }

    const caixas = paineis.map((p) => p.el.getBoundingClientRect());
    paineis.forEach((p, t) => {
      const caixa = caixas[t];
      if (!caixa) return;
      if (caixa.top <= linha) ativo = t;
      const proxima = caixas[t + 1];
      const coberto = !!proxima && proxima.top <= 1;
      if (coberto !== p.coberto) {
        p.coberto = coberto;
        p.el.inert = coberto;
      }
      if (semMovimento) return;

      const entrada = suave(limita((alturaJanela - caixa.top) / (alturaJanela * ENTRADA.curso)));
      p.produto?.style.setProperty("--entra-y", `${((1 - entrada) * ENTRADA.sobe).toFixed(2)}px`);
      p.produto?.style.setProperty("--entra-s", (ENTRADA.escala + entrada * (1 - ENTRADA.escala)).toFixed(4));
      p.botao?.style.setProperty("--botao-y", `${((1 - entrada) * ENTRADA.botao).toFixed(2)}px`);

      const topoAncora = p.ancora.getBoundingClientRect().top;
      const deriva =
        (suave(limita((alturaJanela - topoAncora) / (alturaJanela + p.el.offsetHeight + p.folga.offsetHeight))) - 0.5) * 2;
      const escala = pequeno ? DERIVA_CELULAR : 1;
      for (const peca of p.pecas) {
        peca.el.style.setProperty("--rx", `${(peca.x * peca.dx * deriva * escala).toFixed(2)}px`);
        peca.el.style.setProperty("--ry", `${(peca.y * peca.dy * deriva * escala).toFixed(2)}px`);
        peca.el.style.setProperty("--rr", `${(peca.giro * peca.dx * deriva * escala).toFixed(2)}deg`);
      }
    });

    if (ativo !== ativoAnterior) {
      ativoAnterior = ativo;
      const atual = paineis[ativo];
      if (atual) {
        raiz.dataset.ativo = atual.id;
        raiz.dataset.cor = atual.el.dataset.cor ?? "";
      }
      paineis.forEach((p, t) => {
        p.el.classList.toggle("ativo", t === ativo);
        pontos[t]?.classList.toggle("ativo", t === ativo);
        pontos[t]?.setAttribute("aria-current", t === ativo ? "true" : "false");
      });
    }
  });

  if (semMovimento) return;

  const visibilidade = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        const painel = paineis.find((p) => p.el === entrada.target);
        if (painel) painel.visivel = entrada.isIntersecting;
      }
    },
    { rootMargin: "96px" },
  );
  paineis.forEach((p) => visibilidade.observe(p.el));

  const flutua = (tempo: number): void => {
    if (!document.hidden) {
      const escala = window.innerWidth <= 575 ? FLUTUA_CELULAR : 1;
      for (const painel of paineis) {
        if (!painel.visivel) continue;
        for (const peca of painel.pecas) {
          const fase = (tempo / peca.volta) * Math.PI * 2 + peca.fase;
          peca.el.style.setProperty("--fx", `${(Math.sin(fase) * peca.fx * escala).toFixed(2)}px`);
          peca.el.style.setProperty("--fy", `${(Math.cos(fase * 0.77) * peca.fy * escala).toFixed(2)}px`);
          peca.el.style.setProperty("--fr", `${(Math.sin(fase * 0.61 + 0.5) * peca.fr * escala).toFixed(2)}deg`);
        }
      }
    }
    requestAnimationFrame(flutua);
  };
  requestAnimationFrame(flutua);
}

export function iniciaCardapio(): void {
  for (const painel of document.querySelectorAll<HTMLElement>("[data-painel]")) {
    const categoria = cardapio.find((c) => c.id === painel.dataset.painel);
    if (categoria) iniciaSeletor(painel, categoria);
  }
  iniciaRolagemDoCardapio();
}
