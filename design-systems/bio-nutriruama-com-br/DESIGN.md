# Ruama Cori · Nutricionista — Design System

## Personality

The source feels like a personal nutrition studio condensed into a polished link hub: warm, editorial, direct, and celebratory. The page avoids dashboard density. Large, immersive media does the storytelling; coral and deep wine establish the emotional tone; the structure remains airy enough to feel premium on both a wide desktop and a narrow phone.

## Color roles

The default canvas is soft off-white (`--bg`), with deep wine (`--fg`) for editorial navigation and supporting ink. Coral (`--accent`) is concentrated in the hero fade, icon details, and compact action affordances. White is reserved for image-overlay copy, social controls, and the primary card surface. The protocol conversion moment switches to soft green through `--success`, against an olive photographic panel. Dark mode retains the same coral identity while swapping the canvas to wine and primary ink to pale blush.

## Typography

Roxborough is the display voice: large, high-contrast, and tightly tracked in the hero, menu links, and special cards. Degular is the compact reading/UI voice and is referenced from the public Adobe kit already used by the source. The clone also carries the source’s first-party Roxborough files and Figtree, Montserrat, and Questrial fallbacks. The central desktop hero word reaches `--text-4xl`; its phone counterpart drops to `--text-3xl` without losing the editorial contrast.

## Spacing and layout

At 1024px and above, a three-column ratio of 714:513:455 sits inside a 1745px maximum frame with a 32px inter-column gap. The hero and protocol panel stretch to the natural height of the four-card center stack. Below 1024px, the layout becomes one column: a 460px hero, four 180px cards, then the 455:803 protocol asset. Phone gutters stay at 16px, while the header keeps 20px horizontal control inset.

## Components and states

The component vocabulary consists of a centered logo header with two 42px controls, a video hero with social circles, four media-backed action cards, a green protocol action, a glassy modal menu, and a minimal footer. Cards gain `--elev-raised` on hover; social circles rise 4px and gain a translucent white fill. The menu uses a 20% black scrim, translucent off-white panel, 27px backdrop blur, and a 300ms opacity/translate transition.

## Motion

Motion is light. The hero reuses the public muted `hero.mp4` source, cards elevate over 150ms, and the protocol CTA keeps the source’s periodic sheen. The menu is click-driven and animates opacity/transform over 300ms. There is no sticky header, scroll snapping, reveal system, carousel, or smooth-scroll library; page scroll is native.

## Accessibility

The clone uses real links for the source destinations, labels the menu and theme controls, preserves a semantic heading, and provides focus rings based on `--focus-ring`. The visual menu remains server-rendered and is progressively enhanced, so navigation content exists without JavaScript. The theme state is stored in local storage and mirrored through `[data-theme="dark"]`.

## Anti-patterns

Do not introduce generic health-tech blue, dashboard cards, large navigation bars, gradients unrelated to the source coral fade, hard corners, or illustrative replacements for the supplied media. Do not turn the center column into uniform content blocks: each card must keep its tailored crop, text position, and tone. Avoid replacing the protocol’s olive/green contrast with the coral accent.
