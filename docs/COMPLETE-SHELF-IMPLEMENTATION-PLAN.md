# The Complete Shelf — Implementation Plan

## Approved Scope

- Build an Astro clone at `/complete-shelf/`.
- Recreate the embedded 3D library experience, excluding the outer Mint
  Playground navigation.
- Generate original book models and foil artwork. Do not reuse the reference
  implementation's source code or asset binaries.
- Use an original fictional 19-volume catalog unless the user later requests
  the reference's public book titles.

## 1. Preflight and Reference Capture

- Run the existing project checks before changing the scaffold.
- Capture the live reference at 1440px, 768px, and 390px.
- Document loading, browsing, selected-book, inspection, hover, keyboard, and
  mobile states.

## 2. Connect the Mint Pipeline

- Add Mint MCP with:

  ```bash
  codex mcp add mint --url https://mcp.mint.gg/mcp
  ```

- Complete the one-time OAuth flow if prompted.
- Install `mint-threejs-skills` for Codex.
- Keep all Mint calls in the development workflow. Browser runtime code must
  only load project-local files and must never call MCP.

## 3. Generate the 19-Book Asset Pack

- Call `start_asset_pack_generation` in `auto` mode with 19 explicitly
  described hardcovers.
- Use a shared style guide: cloth textures, paper page blocks, restrained
  gold/brass foil, varied proportions, and muted navy, sage, oxblood, ochre,
  terracotta, slate, and linen colors.
- Give every book a distinct abstract motif and stable logical key.
- Wait for final generation, optimize the models, retrieve the artifact
  manifest, and download Draco-compatible GLBs locally.
- Persist the Mint manifest and registry inside the clone namespace.

## 4. Emit the OpenDesign Package

- Create `design-systems/complete-shelf/`.
- Define the cream-paper, ink, walnut, hairline, serif, spacing, motion, and
  responsive tokens.
- Use locally served editorial serif and neutral sans typography.
- Validate the design system before building the experience.

## 5. Build the Astro and Three.js Foundation

- Add vanilla Three.js while preserving the existing Astro architecture.
- Create a server-rendered UI shell plus a focused client-side Three.js
  controller.
- Build the continuous walnut shelf, cream environment, soft editorial
  lighting, contact shadows, and subtle paper-grain overlay.
- Load models through a shared `GLTFLoader` and `DRACOLoader`, normalize their
  bounds, and arrange all 19 volumes continuously.

## 6. Implement the Interaction State Machine

- Use the states loading, browsing, transitioning, and inspecting.
- Support browsing through pointer drag, touch swipe, wheel, arrow keys,
  previous/next buttons, and any of 19 position markers.
- Add inertial movement followed by snapping to the nearest book.
- Support raycast selection plus Enter or Inspect activation.
- Pull the selected volume forward while the shelf recedes.
- Enable bounded orbit, pan, and zoom only during inspection.
- Return with Back, Escape, or the close control while restoring the previous
  shelf position.

## 7. Responsive and Accessible Presentation

- Desktop: caption on the left and inspection details panel on the right.
- Mobile: shelf above a scrollable bottom details sheet with touch-safe
  controls.
- Server-render all catalog labels and metadata for accessibility.
- Add canvas instructions, live selection announcements, visible focus states,
  reduced-motion behavior, and an HTML catalog fallback if WebGL fails.

## 8. Namespaced Integration

Keep the clone's assets and source under:

```text
src/clones/complete-shelf/
src/pages/complete-shelf/
public/clones/complete-shelf/
design-systems/complete-shelf/
docs/research/complete-shelf/
```

Register the clone in the existing hub without replacing the root page.

## 9. Verification

- Confirm all 19 books load and remain individually selectable.
- Replay every browsing and inspection input on desktop and mobile.
- Check resize handling, model-load failures, WebGL fallback, keyboard flow,
  and reduced motion.
- Run the design-system guard and `npm run check`.
- Produce final 1440px and 390px reference-versus-build comparison images.
- Verify that no browser request reaches Mint MCP.

## Reference Material

- Live reference: <https://play.mint.gg/complete-shelf>
- Mint MCP: <https://mcp.mint.gg/mcp>
- Mint Three.js Skills:
  <https://github.com/mintdotgg/mint-threejs-skills>

