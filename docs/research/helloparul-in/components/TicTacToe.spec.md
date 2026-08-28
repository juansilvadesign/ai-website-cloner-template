# TicTacToe Specification

## Overview

- **Target file:** `src/clones/helloparul-in/components/TicTacToe.astro`
- **Reference:** `source.html:784-831`; `interaction-play-1440.png`
- **Interaction model:** client-side 3×3 turn-based board with reset

## Structure and visual contract

The `1080px` detail area contains the source eyebrow, title, and introduction, followed by a centered status line, board, and reset action. The board uses three `minmax(84px,110px)` tracks, 3px ink outer border, 18px radius, cream cells, and Bricolage 800 44px marks. X is red; O is blue.

## Behavior

The visitor begins as X. Each enabled cell accepts one mark, alternates turns, announces status through a live region, detects every three-cell winner, and disables play after a win or draw. The copy and winner tones match the source (`Your turn (X)`, `Parul is thinking…`, `You win! 🎉`, `Parul wins!`). Reset restores the initial state. The Play icon is active in the clone-local bottom navigation on phone.
