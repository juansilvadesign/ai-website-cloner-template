# IndustriesSection Specification

## Overview

- **Target file:** `src/clones/consultadeprocessos-com-br/components/IndustriesSection.astro`
- **Screenshot:** `docs/design-references/consultadeprocessos-com-br/original-1440.png` y=4639 and `original-390.png` y=6559
- **Interaction model:** scroll-driven active desktop rail; click-to-scroll rail buttons; static phone sequence

## DOM Structure

`section.industries > centered intro + .industry-layout`; desktop layout has `aside.industry-rail` and `div.industry-cards`. Each card contains an icon tile, h3, description, a three-item benefits list, a contact anchor, and a pale CSS data-pattern at right.

## Computed Styles

- desktop section: `height:3057px`, `padding:96px 0`, inner `max-width:1152px`.
- intro: 768px h2 region; heading 42px/1.15, max 768px, paragraph 672px.
- rail: width 260px, `position:sticky; top:112px`; five buttons are 56px high, 15px. Active is slate-900/600; inactive slate-400/400. Gray 2px vertical track with teal 2px active progress segment.
- cards: right column width ~828px; five groups separated by 113px vertical gap. Each product card's core white content is 413px high with 16px radius and very light slate depth.
- phone: rail is hidden; cards are 300×372px, surrounded by a 350px content width; five cards have ~78px gaps.

## States & Behaviors

- **Scroll trigger:** IntersectionObserver watches card headings / card blocks. As each crosses a center viewport threshold, active rail label/progress changes.
- **Click trigger:** rail button calls `scrollIntoView({ behavior: 'smooth', block: 'center' })` for matching card.
- **Phone:** no observer or rail needed because content is regular source order.

## Text Content (verbatim)

- PARA QUEM É
- Desenvolvido para profissionais que não aceitam incertezas
- Cada segmento utiliza a plataforma de uma forma diferente. Veja como ela se adapta à sua rotina.
- Departamentos jurídicos — Mais controle sobre processos. Menos trabalho manual. Centralize informações e antecipe riscos com dados atualizados. Monitoramento em tempo real — Alertas automáticos sobre movimentações relevantes. Due diligence ágil — Histórico completo de partes antes de decisões. Visão consolidada — Todos os processos em uma única tela.
- Recrutamento e seleção — Evite contratações de risco. Decida com dados reais. Vá além do currículo e valide o histórico do candidato. Antecedentes judiciais — Processos vinculados ao CPF do candidato. Prevenção a fraudes — Identifique inconsistências e sinais de risco. Decisão mais segura — Reduza custos com erros de contratação.
- Compliance — Reduza riscos com uma visão completa da operação. Analise clientes, parceiros e fornecedores com profundidade. KYC e KYP — Validação de clientes e parceiros com histórico judicial. KYE e KYS — Análise de colaboradores e fornecedores antes de decisões. Detecção de riscos — Identifique irregularidades e padrões suspeitos.
- Instituições financeiras — Crédito mais seguro começa com informação completa. Enxergue riscos que o score não mostra. Análise além do score — Dados judiciais integrados à análise financeira. Detecção de litigantes — Perfis com histórico de ações recorrentes. Prevenção a inadimplência — Identifique sinais antes da aprovação.
- Transportadoras e logística — Mais segurança na contratação e operação. Reduza riscos com validação rápida de motoristas. Antecedentes criminais — Verificação rápida e confiável. Redução de riscos — Menos casos de roubo e problemas operacionais. Verificação em escala — Consultas simultâneas sem esforço manual.
- Falar com especialista (in every card)

## Responsive Behavior

- **Desktop:** sticky rail and single right card stream.
- **Tablet:** maintain readable content but remove/relax sticky behavior as required.
- **Phone:** no rail, five compact full content cards in source order.
- **Breakpoint:** 1024px.
