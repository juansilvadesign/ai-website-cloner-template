# Rodape (footer) Specification

## Overview
- **Target file:** `src/clones/capia/components/Rodape.astro` (markup verbatim)
- **Styles:** `src/clones/capia/styles/sections/rodape.css` · **Behaviour:** `scripts/rodape.ts`
- **Screenshots:** `docs/design-references/capia/original-1440-s8496-mural-trail.png`, `qa/clone-1440-mural-trail.png`
- **Interaction model:** pointer-driven (trail + tooltip), tap (phone stack), form submit

## DOM Structure
`footer.rodape#contato[data-rodape] > span.rasgo.rasgo--vira.rodape__rasgo + .mural[data-mural] (.mural__chamada(h2.mural__titulo span×2 + button.mural__toque[data-toque] svg doodle + "toca aqui") + button.mural__pilha[data-pilha](img.mural__carta×6) + p.so-leitor[data-pilha-status]) + .rodape__miolo(.recado[data-recado](.recado__retrato svg #capi-deitado + .recado__conteudo(h2 + form.recado__form(label.so-leitor + input#recado-email + button.recado__enviar) + p.recado__aviso)) + .rodape__pe(p.rodape__linha + .rodape__linha--2(p © + nav.rodape__links + nav.rodape__redes))) + p.rodape__gigante(span×2) + .mural__rastro[data-rastro] + span.mural__dica[data-dica]`.

## Computed Styles (source values)
- `.rodape`: bg `--carvao`, ink `--pao`, overflow hidden, z 4; torn edge flipped (`rotate 180deg`, top −1px) in cream.
- `.mural`: height `clamp(420px, 41vw, 610px)`, padding-top `--rasgo`, grid centred. Title cheddar 800 `clamp(34px, 5.1vw, 80px)`/1.06 −.03em. "toca aqui": 12px/800 uppercase .07em, doodle `clamp(50px, 5.2vw, 76px)`, at top .4vw / left `100% + .6vw`, rotate −5.4deg.
- Trail photo: 9:16, width `clamp(150px, 14.2vw, 204px)`, radius 15px, shadow `0 12px 30px #0000006b`. Tooltip: cheddar pill, ring `0 0 0 3px --carvao`, 12px/800 uppercase, padding 7px 13px 8px, `rotate(−3.5deg) scale(.88 → 1)`, `opacity .17s, transform .23s var(--sai)`.
- Newsletter: portrait ring `clamp(136px, 14.8vw, 214px)` with inset cream ring `clamp(5px, .46vw, 6.5px)`; h2 800 `clamp(34px, 3.9vw, 56px)`/1; field `--branco` 54px tall, width `clamp(200px, 23.4vw, 340px)`, radius `27px 25px 29px 27px/27px 29px 25px 27px`; submit tomato 54px, 17px/700, radius `--pao-c`; notice cheddar 14px/600.
- Legal: 12px/600/1.2, margin-top `clamp(58px, 8.5vw, 122px)`; social icons 27px stroke 1.9.
- Wordmark: 800 10.3vw, height .85em, −.04em, `opsz 96, wdth 94`; second span cheddar.

## States & Behaviors
- Trail, tooltip, tap, stack, form, cleanup — exact numbers in BEHAVIORS.md → Footer.
- Hovers: submit → cheddar/charcoal `translate 0 −3px`; links → cheddar; socials → cheddar `translate 0 −2px`; "toca aqui" → `rotate −1.5deg scale 1.07`.

## Text Content (verbatim)
"Momentos de calma no" / "@capia.burger" · "toca aqui" · "Vem pra turma da calma." · placeholder "Seu e-mail ..." · "Enviar ›" · "Capiá Burger | Curitiba, PR | ter a dom · 18h às 23h" · "© 2026 Capiá. Todos os direitos reservados." · "Privacidade | Cookies" · "meu Capiá." "minha calma." · tooltip "mexa o mouse" · notices "Anotado. Calma, que a gente escreve." / "Confere o e-mail e tenta de novo.".

## Assets
`img/mural/01–06.webp` (612×1088), `#capi-deitado`.

## Responsive Behavior
- **≤767px:** mural auto height, padding `--rasgo + 64px` 20px 34px, title `clamp(30px, 8.9vw, 38px)`, "toca aqui" below the title; trail/tooltip hidden, stack `min(62vw, 240px)` with roles frente/perto (16px, 9px, 5.5deg, .955)/longe (−15px, 18px, −6.5deg, .915); newsletter stacked and centred (field/button `min(100%, 340px)`); legal centred, margin-top 54px; wordmark 18.1vw on two lines (height 1.73em, line-height .88).
