// Header: the "Cardápio" dropdown (mouse hover with a 160ms close grace,
// click/tap toggle, Escape, outside press, focus leaving) and the mobile
// drawer (<900px) with its backdrop, scroll lock and nested submenu.
import { pausaRolagem, retomaRolagem } from "./movimento";

function iniciaSuspensos(): void {
  for (const grupo of document.querySelectorAll<HTMLElement>("[data-suspenso]")) {
    const botao = grupo.querySelector<HTMLElement>("[data-suspenso-botao]");
    const define = (aberto: boolean): void => {
      grupo.classList.toggle("aberto", aberto);
      botao?.setAttribute("aria-expanded", String(aberto));
    };

    let relogio = 0;
    grupo.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "mouse") return;
      clearTimeout(relogio);
      define(true);
    });
    grupo.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "mouse") relogio = window.setTimeout(() => define(false), 160);
    });

    // A real mouse click only ever opens (hover already did); touch and
    // keyboard activation toggle.
    let ponteiro = "mouse";
    botao?.addEventListener("pointerdown", (e) => {
      ponteiro = e.pointerType;
    });
    botao?.addEventListener("click", (e) => {
      const cliqueDeMouse = e.detail > 0 && ponteiro === "mouse";
      define(cliqueDeMouse ? true : !grupo.classList.contains("aberto"));
    });

    grupo.addEventListener("focusout", (e) => {
      if (!grupo.contains(e.relatedTarget instanceof Node ? e.relatedTarget : null)) define(false);
    });
    grupo.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      define(false);
      botao?.focus();
    });
    grupo.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => define(false)));
    document.addEventListener("pointerdown", (e) => {
      if (!(e.target instanceof Node) || !grupo.contains(e.target)) define(false);
    });
  }
}

function iniciaGaveta(): void {
  const gaveta = document.querySelector<HTMLElement>("[data-gaveta]");
  const fundo = document.querySelector<HTMLElement>("[data-fundo-gaveta]");
  const abre = document.querySelector<HTMLElement>("[data-abre-gaveta]");
  if (!gaveta || !abre) return;

  const define = (aberta: boolean): void => {
    gaveta.classList.toggle("aberta", aberta);
    gaveta.inert = !aberta;
    abre.setAttribute("aria-expanded", String(aberta));
    if (fundo) {
      if (aberta) {
        fundo.hidden = false;
        requestAnimationFrame(() => fundo.classList.add("aberta"));
      } else {
        fundo.classList.remove("aberta");
        setTimeout(() => {
          if (!gaveta.classList.contains("aberta")) fundo.hidden = true;
        }, 320);
      }
    }
    document.documentElement.style.overflow = aberta ? "hidden" : "";
    if (aberta) {
      pausaRolagem();
      gaveta.querySelector<HTMLElement>("[data-fecha-gaveta]")?.focus({ preventScroll: true });
    } else {
      retomaRolagem();
    }
  };

  abre.addEventListener("click", () => define(true));
  fundo?.addEventListener("click", () => {
    define(false);
    abre.focus();
  });
  gaveta.addEventListener("click", (e) => {
    if (e.target instanceof Element && e.target.closest("[data-fecha-gaveta], .gaveta__opcao")) define(false);
  });
  gaveta.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    define(false);
    abre.focus();
  });
  matchMedia("(min-width: 900px)").addEventListener("change", (e) => {
    if (e.matches) define(false);
  });

  const cardapio = gaveta.querySelector<HTMLElement>("[data-gaveta-cardapio]");
  const sub = gaveta.querySelector<HTMLElement>("[data-gaveta-sub]");
  cardapio?.addEventListener("click", () => {
    const abrir = cardapio.getAttribute("aria-expanded") !== "true";
    cardapio.setAttribute("aria-expanded", String(abrir));
    if (sub) sub.hidden = !abrir;
  });
}

export function iniciaTopo(): void {
  iniciaSuspensos();
  iniciaGaveta();
}
