// Capiá menu content shapes — shared by data/cardapio.ts, components/Painel.astro
// and scripts/cardapio.ts.

export type CorPainel = "cheddar" | "tomate" | "mate" | "carvao";

export interface ItemCardapio {
  id: string;
  nome: string;
  /** Short subline under the name in the carousel pill. */
  linha: string;
  /** Joined with " · " under the stage. */
  ingredientes: string[];
  /** Two speech-bubble seals on the stage. */
  selos: [string, string];
  /** Seven ingredient cut-outs, in stage-slot order 1–7. */
  pecas: [string, string, string, string, string, string, string];
}

export interface CategoriaCardapio {
  id: string;
  titulo: string;
  cor: CorPainel;
  itens: ItemCardapio[];
}
