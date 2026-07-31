# ShelfScene Specification

## Overview

- **Target file:** `src/clones/complete-shelf/lib/ShelfApp.ts`
- **Screenshot:** `docs/design-references/complete-shelf/original-1440.png`
- **Interaction model:** deterministic animation loop with explicit browse and
  inspect camera ownership

## Scene Structure

- Scene root
  - paper background/support planes
  - lighting rig
  - continuous walnut shelf
  - shelf presentation group
    - nineteen book canonical wrappers
      - normalized imported Mint scene
      - transparent pick proxy
  - shadow receiver

## Renderer

- WebGL2 when available.
- `SRGBColorSpace`.
- ACES filmic tone mapping with restrained exposure.
- Alpha enabled so the CSS paper surface remains visible.
- DPR cap: desktop `2`, mobile `1.5`.
- One animation loop and one resize owner.

## Imported Assets

- Load local paths from the synchronized `mint-assets.json`.
- Create all GLTF loaders through one shared Draco-capable helper.
- Compute box bounds and normalize each book to its planned real-world
  height/thickness.
- Preserve generated geometry, materials, textures, and UVs.
- Keep canonical and presentation transforms separate.

## Browse Behavior

- Canonical state: continuous `browsePosition` clamped to `[0, 18]`.
- Drag and wheel change proposed position.
- Release resolves the nearest integer index.
- Scene group x-position is derived from measured book centers.
- Camera stays fixed while the shelf group moves.

## Inspect Behavior

- Selected book presentation wrapper moves forward and slightly upward.
- Neighboring shelf recedes and lowers contrast without mutating materials.
- Camera interpolation completes before enabling OrbitControls.
- Orbit limits prevent viewing below the shelf plane or losing the subject.

## Diagnostics

- Expose calls, triangles, geometries, textures, loaded assets, selected index,
  and current camera owner in development.

