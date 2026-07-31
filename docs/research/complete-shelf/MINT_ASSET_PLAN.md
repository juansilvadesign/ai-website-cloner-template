# The Complete Shelf — Mint Asset Plan

## Production Request

- **Tool:** `start_asset_pack_generation`
- **Mode:** `auto`
- **Type:** `general_asset_pack`
- **Item count:** 19
- **Display name:** `The Complete Shelf — Clothbound Library`
- **Runtime:** discrete GLB models composed in vanilla Three.js
- **World generation:** not requested

## Shared Prompt

A cohesive editorial library of nineteen closed, upright clothbound hardcovers
for a warm minimalist 3D bookshelf. Each volume is a distinct physical book
with subtly rounded boards, visible page block, spine joints, cloth weave, and
restrained abstract brass/gold foil decoration. No readable text, logos,
publisher marks, environment, shelf, bookends, props, or baked dramatic
lighting. Consistent real-world scale and material quality; varied height,
width, and thickness; neutral product-ready orientation.

## Style Guide

Tactile mid-century editorial design photographed as premium product objects.
Muted navy, slate, sage, moss, oxblood, burgundy, terracotta, brick, ochre,
mustard, taupe, linen, and deep teal cloth. Warm ivory page blocks. Foil motifs
use thin circles, arcs, portals, grids, contours, moons, horizons, and
constellation-like dots. PBR cloth is matte and subtly woven; foil is restrained
metallic brass rather than glossy yellow. All items share the same craft
language while remaining individually recognizable from their silhouette and
motif.

## View Guide

One closed upright hardcover per asset. Bottom edge rests at world origin.
Spine is on the model's left when viewing the front cover. Front cover faces
mostly forward with no presentation tilt. Preserve empty space around the
object. Do not generate hands, stands, backgrounds, extra books, or typography.

## Item Matrix

| Key | Working title | Cloth | Proportion | Foil motif |
| --- | --- | --- | --- | --- |
| `quiet-rooms` | The Atlas of Quiet Rooms | muted sage | tall, medium-thick | nested imperfect rings |
| `tidal-logic` | Tidal Logic | midnight navy | short, thick | paired crescent arcs |
| `common-light` | A Theory of Common Light | ochre | tall, narrow | vertical rounded portal and sun |
| `after-rain` | Notes After Rain | terracotta | medium, slim | offset circles and one descending line |
| `listening-fields` | The Listening Fields | oxblood | tall, thick | sparse diagonal lattice |
| `small-rituals` | Small Rituals | warm linen | short, slim | radial dots around a small disc |
| `index-winds` | An Index of Winds | slate blue | tall, slim | mirrored crescents and fine rules |
| `patient-machines` | Patient Machines | moss green | medium, thick | central column with orbiting arc |
| `longitude-care` | The Longitude of Care | deep teal | tall, medium | high arch, small moon, horizon line |
| `gardens-time` | Gardens for Slow Time | burnt rust | wide, thick | organic contour loops |
| `luminous-ordinary` | The Luminous Ordinary | mushroom taupe | medium, slim | ascending bars and one foil dot |
| `soft-infrastructure` | Soft Infrastructure | muted mustard | tall, thick | nested offset frames |
| `material-memory` | Material Memory | burgundy | short, thick | split oval with fine parallel lines |
| `future-vernacular` | Future Vernacular | grey-green | tall, slim | compass arcs and four points |
| `rooms-between` | Rooms Between Rooms | ivory | medium, thick | two overlapping door outlines |
| `weather-things` | The Weather of Things | dusty coral | tall, medium | falling vertical lines and half circle |
| `measured-wonder` | Measured Wonder | dark teal | short, slim | concentric squares and corner dot |
| `public-silence` | A Public Silence | brick red | medium, thick | half sun crossing a vertical rule |
| `stubborn-horizons` | Stubborn Horizons | blue-black | tall, medium | layered horizontal rules and crescent |

## Integration Contract

- Wait for final status and follow the returned Mint `nextSteps`.
- Prefer optimized GLBs when available.
- Fetch the complete artifact manifest.
- Synchronize through the installed `sync-mint-assets.mjs`.
- Use a project-root `mint-assets.json` with asset root
  `public/clones/complete-shelf/models/mint`.
- Keep stable logical keys prefixed with `complete-shelf/`.
- Inspect actual GLB extension metadata.
- Load every Mint GLB through one shared Draco-capable helper.
- Keep handoff URLs in developer documentation/final reporting only.
- Never expose raw asset IDs, generation links, or MCP calls in browser code.

