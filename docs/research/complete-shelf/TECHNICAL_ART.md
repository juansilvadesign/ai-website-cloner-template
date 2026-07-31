# The Complete Shelf — Technical Art Brief

## Renderable Art Direction

Warm editorial minimalism: tactile cloth hardcovers, restrained metallic foil,
cream paper, walnut shelving, broad soft light, long quiet shadows, and sparse
ink UI. The books are the hero surfaces; shelf and paper environment are
supporting context.

## Spatial Contract

- Right-handed Three.js world.
- Units: meters; `1` unit is approximately one meter.
- World up: `+Y`.
- Camera forward: `-Z`.
- Imported book axes and pivots are normalized once at an asset wrapper.
- Canonical model transforms remain stable.
- Shelf placement and focus transforms live on separate presentation wrappers.
- Application state owns selected index and mode; scene objects only project it.

## Asset Strategy

- **Mint MCP:** nineteen individually generated clothbound hardcovers, produced
  as one coherent asset pack.
- **Procedural Three.js:** continuous walnut shelf, shadow receiver, neutral
  background planes, pick proxies, and debug helpers.
- **CSS:** paper grain, editorial panels, controls, loading and error surfaces.
- **No generated world:** the user requested discrete book assets and a
  hand-authored Three.js environment.

## Material Roles

- `paperBackground`: warm cream, matte.
- `walnutShelf`: dark warm brown, medium roughness.
- `walnutEdge`: deeper brown for the shelf front edge.
- `shadowReceiver`: transparent/neutral grounding surface.
- `selectionHalo`: subtle warm line/value change, never bloom.
- Imported book materials remain as delivered by Mint.

## Lighting Stack

- Large warm key light from upper-left.
- Lower-intensity neutral fill from the camera side.
- Soft rim from upper-right to separate spines.
- One shadow-casting directional light.
- Ambient hemisphere contribution for readable page blocks.
- No post-processing; ACES tone mapping and correct color space provide the
  final image.

## Design Frame

- Desktop browse: 42–55mm equivalent field of view; selected cover occupies
  roughly 30–38% of viewport width while nearby spines remain visible.
- Mobile browse: greater camera distance and vertical framing reserve the lower
  viewport for caption/controls.
- Inspection: selected book occupies roughly 42% of the available 3D region,
  leaving room for the desktop panel or mobile bottom sheet.

## Render Budget

| Metric | Desktop target | Mobile target |
| --- | ---: | ---: |
| Draw calls | <= 300 | <= 150 |
| Triangles | <= 750k | <= 300k |
| Geometries | <= 300 | <= 200 |
| Textures | <= 60 | <= 40 |
| Shadow lights | 1 | 1 |
| Shadow map | <= 2048 | <= 1024 |
| DPR cap | 2 | 1.5 |
| Post passes | 0 | 0 |

## Loading and Optimization

- Synchronize optimized GLBs through the Mint asset registry.
- Inspect every GLB's extension metadata.
- Use one shared `DRACOLoader` for all book models.
- Load with bounded concurrency and visible progress.
- Normalize scale and bounds after load without replacing authored materials.
- Dispose cloned scene resources, controls, renderer, and listeners on teardown.

## Diagnostics

Expose development-only diagnostics through
`window.__THREE_APP_DIAGNOSTICS__`:

- mode and selected index
- loaded/failed asset counts
- renderer `calls`, `triangles`, `geometries`, and `textures`
- DPR cap and shadow settings
- currently active camera owner

