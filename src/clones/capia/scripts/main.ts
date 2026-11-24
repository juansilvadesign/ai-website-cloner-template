// Capiá page behaviour — same init order as the original bundle.
import { iniciaApelidos } from "./apelidos";
import { iniciaCardapio } from "./cardapio";
import { iniciaCasa } from "./casa";
import { iniciaFaixa } from "./faixa";
import { iniciaRolagem } from "./movimento";
import { iniciaRodape } from "./rodape";
import { iniciaTopo } from "./topo";

iniciaRolagem();
iniciaTopo();
iniciaApelidos();
iniciaFaixa();
iniciaCardapio();
iniciaCasa();
iniciaRodape();
