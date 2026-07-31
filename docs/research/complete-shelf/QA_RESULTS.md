# The Complete Shelf — QA Results

Date: 2026-07-31

## Automated project gates

- `npm run lint`: passed.
- `npm run typecheck`: 39 files, 0 errors, 0 warnings, 0 hints.
- `npm run typecheck:scripts`: passed.
- `npm run build`: passed; six static routes generated, including
  `/complete-shelf/`.
- The production build reports one advisory: the Three.js client chunk is
  larger than Vite's default 500 kB warning threshold.

## Production-preview browser pass

The final static build was served on loopback and exercised in headless Chromium
with software WebGL at 1440 × 900 and 390 × 844.

Both viewports returned HTTP 200 and confirmed:

- 19 server-rendered position markers.
- Initial browse state at volume 01.
- Next-button selection.
- Direct marker selection.
- Arrow-key selection.
- Pointer-drag shelf navigation with snapping.
- Entering inspection with the details region changing from
  `aria-hidden="true"` to `aria-hidden="false"`.
- Orbit drag, wheel zoom, reset-view activation, and Escape return.
- The selected index and metadata persisted when returning to the shelf.
- No console errors.
- No uncaught page errors.
- No external browser requests. In particular, the runtime made no request to
  Mint MCP or a remote Draco decoder.

Desktop state trace:

```text
initial 00 → next 01 → marker 08 → ArrowRight 09 → drag 07
→ inspect 07 → Escape → browse 07
```

Mobile state trace:

```text
initial 00 → next 01 → marker 08 → ArrowRight 09 → swipe/drag 10
→ inspect 10 → Escape → browse 10
```

## Visual evidence

- `docs/design-references/complete-shelf/qa/clone-1440.png`
- `docs/design-references/complete-shelf/qa/clone-inspect-1440.png`
- `docs/design-references/complete-shelf/qa/comparison-1440.png`
- `docs/design-references/complete-shelf/qa/clone-390.png`
- `docs/design-references/complete-shelf/qa/clone-inspect-390.png`
- `docs/design-references/complete-shelf/qa/comparison-390.png`

## Mint asset status

Mint MCP is configured and the exact 19-item auto-mode generation request is
saved in `MINT_ASSET_PLAN.md`. The OAuth callback was not approved during this
run, so no Mint generation was started and no artifact manifest was invented.

The current build therefore uses clearly labeled procedural development
hardcovers. Each book switches automatically to the shared Draco-capable GLB
loader when its clone-local `modelUrl` is populated from a synchronized Mint
manifest. All decoder files are already self-hosted under the clone namespace.
