// ─────────────────────────────────────────────
// Capiá menu — the single source for the menu panels
// ─────────────────────────────────────────────
// Rendered server-side by components/Cardapio.astro (first item of each
// category) and read again in the browser by scripts/cardapio.ts to swap
// items. Verbatim from the original's data model. To re-skin the template for
// another client, edit this file and drop matching images into
// public/clones/capia/img/{produtos,pecas}/.
//
// Image naming contract (same as the original):
//   produtos/<item.id>.webp     720×720 product cut-out (stage)
//   produtos/<item.id>-p.webp   200×200 thumbnail (carousel pill)
//   pecas/<peca>.webp           360×360 ingredient cut-out (7 per item)

import type { CategoriaCardapio } from "../types/cardapio";

export type { CategoriaCardapio, CorPainel, ItemCardapio } from "../types/cardapio";

/** Public asset root, with its trailing slash: `npm run eject` rewrites it to "/". */
export const BASE_ASSETS = "/clones/capia/";
export const produtoSrc = (id: string): string => `${BASE_ASSETS}img/produtos/${id}.webp`;
export const miniaturaSrc = (id: string): string => `${BASE_ASSETS}img/produtos/${id}-p.webp`;
export const pecaSrc = (peca: string): string => `${BASE_ASSETS}img/pecas/${peca}.webp`;

/** More items than this and the carousel loops on desktop too (cloned pills, visible arrows). */
export const PILULAS_SEM_LACO = 4;

export const cardapio: CategoriaCardapio[] = [
  {
    id: "lanches",
    titulo: "Lanches",
    cor: "cheddar",
    itens: [
      { id: "classico", nome: "Clássico da Casa", linha: "smash duplo", ingredientes: ["pão brioche", "2 smash de 80 g", "cheddar", "picles", "cebola", "molho da casa"], selos: ["160 g de carne", "o mais pedido"], pecas: ["cheddar", "picles", "pao", "picles", "carne", "cebola-roxa", "cheddar"] },
      { id: "bacon", nome: "Piá Bacon", linha: "bacon crocante", ingredientes: ["pão brioche", "blend de 150 g", "cheddar", "bacon", "cebola caramelizada", "maionese defumada"], selos: ["150 g de carne", "defumado"], pecas: ["bacon", "cheddar", "pao", "cebola-roxa", "carne", "cheddar", "bacon"] },
      { id: "pinhao", nome: "Pinhão da Serra", linha: "queijo colonial", ingredientes: ["pão brioche", "blend de 150 g", "queijo colonial", "farofa de pinhão", "rúcula", "maionese de alho assado"], selos: ["receita da casa", "só em Curitiba"], pecas: ["pinhao", "rucula", "pao", "pinhao", "rucula", "carne", "pinhao"] },
      { id: "bravo", nome: "Capiá Bravo", linha: "com jalapeño", ingredientes: ["pão brioche", "blend de 150 g", "queijo prato", "jalapeño", "cebola roxa", "molho bravo"], selos: ["picante", "150 g de carne"], pecas: ["jalapeno", "cebola-roxa", "pao", "jalapeno", "cebola-roxa", "carne", "jalapeno"] },
      { id: "guria", nome: "Guria Verde", linha: "sem carne", ingredientes: ["pão brioche", "burger de grão-de-bico e cogumelo", "alface", "tomate", "picles", "maionese verde"], selos: ["sem carne", "feito na casa"], pecas: ["alface", "tomate", "cogumelo", "picles", "tomate", "cogumelo", "alface"] },
      { id: "frango", nome: "Frango Crocante", linha: "bem crocante", ingredientes: ["pão brioche", "sobrecoxa crocante", "salada de repolho", "picles", "maionese de limão"], selos: ["sobrecoxa empanada", "180 g de frango"], pecas: ["alface", "picles", "pao", "picles", "limao", "cebola-roxa", "limao"] },
    ],
  },
  {
    id: "acompanhamentos",
    titulo: "Acompanhamentos",
    cor: "tomate",
    itens: [
      { id: "fritas", nome: "Fritas da Casa", linha: "corte rústico", ingredientes: ["batata com casca", "sal de ervas", "alecrim", "molho rosé"], selos: ["porção de 300 g", "pra dividir"], pecas: ["batata", "alecrim", "molho-rose", "batata", "maionese-verde", "alecrim", "batata"] },
      { id: "aneis", nome: "Anéis de Cebola", linha: "empanados na hora", ingredientes: ["cebola", "massa crocante", "páprica", "maionese verde"], selos: ["8 unidades", "bem crocante"], pecas: ["anel", "limao", "maionese-verde", "anel", "molho-rose", "limao", "anel"] },
      { id: "polenta", nome: "Polenta Frita", linha: "crocante por fora", ingredientes: ["polenta", "parmesão", "alecrim", "molho rosé"], selos: ["6 unidades", "cremosa por dentro"], pecas: ["alecrim", "limao", "molho-rose", "alecrim", "maionese-verde", "limao", "alecrim"] },
      { id: "bolinho", nome: "Bolinho de Queijo", linha: "queijo colonial", ingredientes: ["queijo colonial", "massa de batata", "salsinha", "maionese verde"], selos: ["5 unidades", "puxa o queijo"], pecas: ["maionese-verde", "alecrim", "limao", "alecrim", "molho-rose", "limao", "alecrim"] },
    ],
  },
  {
    id: "bebidas",
    titulo: "Bebidas",
    cor: "mate",
    itens: [
      { id: "shake-morango", nome: "Shake de Morango", linha: "sorvete da casa", ingredientes: ["sorvete de creme", "morango fresco", "chantili"], selos: ["400 ml", "batido na hora"], pecas: ["morango", "morango-meio", "morango-meio", "morango", "morango", "morango-meio", "morango"] },
      { id: "shake-chocolate", nome: "Shake de Chocolate", linha: "meio amargo", ingredientes: ["sorvete de creme", "chocolate meio amargo", "chantili"], selos: ["400 ml", "batido na hora"], pecas: ["chocolate", "chocolate-gotas", "chocolate", "chocolate-gotas", "chocolate", "chocolate-gotas", "chocolate"] },
      { id: "mate", nome: "Mate com Limão", linha: "gelado, feito aqui", ingredientes: ["erva-mate tostada", "limão", "gelo"], selos: ["500 ml", "sem açúcar, se quiser"], pecas: ["limao-rodela", "hortela", "limao-rodela", "hortela", "limao-rodela", "hortela", "limao-rodela"] },
      { id: "soda", nome: "Soda de Framboesa", linha: "com hortelã", ingredientes: ["framboesa", "limão", "água com gás", "hortelã"], selos: ["500 ml", "bem gelada"], pecas: ["framboesa", "hortela", "limao-rodela", "framboesa", "hortela", "framboesa", "framboesa"] },
    ],
  },
  {
    id: "sobremesas",
    titulo: "Sobremesas",
    cor: "carvao",
    itens: [
      { id: "brownie", nome: "Brownie com Sorvete", linha: "quente e gelado", ingredientes: ["brownie", "sorvete de creme", "calda de chocolate"], selos: ["sai quentinho", "pra dividir"], pecas: ["sorvete", "chocolate-gotas", "nozes", "brownie-peca", "chocolate-gotas", "nozes", "chocolate-gotas"] },
      { id: "cookie", nome: "Cookie Recheado", linha: "chocolate derretido", ingredientes: ["massa amanteigada", "gotas de chocolate", "recheio de chocolate"], selos: ["assado no dia", "recheio que escorre"], pecas: ["chocolate-gotas", "nozes", "sorvete", "nozes", "chocolate-gotas", "nozes", "chocolate-gotas"] },
      { id: "pudim", nome: "Pudim de Leite", linha: "receita de vó", ingredientes: ["leite", "ovos", "caramelo"], selos: ["sem furinho", "fatia generosa"], pecas: ["doce-de-leite", "nozes", "banana", "nozes", "doce-de-leite", "banana", "nozes"] },
      { id: "banoffee", nome: "Banoffee no Pote", linha: "com doce de leite", ingredientes: ["banana", "doce de leite", "chantili", "farofa de biscoito"], selos: ["no pote", "pra levar"], pecas: ["banana", "doce-de-leite", "banana", "nozes", "doce-de-leite", "banana", "banana"] },
    ],
  },
];
