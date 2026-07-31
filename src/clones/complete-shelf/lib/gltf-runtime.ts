import { LoadingManager } from "three";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import {
  GLTFLoader,
  type GLTF,
} from "three/addons/loaders/GLTFLoader.js";

/** Project-local, version-matched decoder files are copied during integration. */
export const DEFAULT_DRACO_DECODER_PATH =
  "/clones/complete-shelf/draco/gltf/";

export interface ShelfGltfRuntime {
  load(
    url: string,
    onProgress?: (event: ProgressEvent<EventTarget>) => void,
  ): Promise<GLTF>;
  dispose(): void;
}

/**
 * Creates one GLTFLoader and one DRACOLoader for the complete shelf lifecycle.
 * Every book model goes through this helper; no caller constructs a bare
 * GLTFLoader that could fail on a Mint-optimized asset.
 */
export function createShelfGltfRuntime(
  decoderPath = DEFAULT_DRACO_DECODER_PATH,
): ShelfGltfRuntime {
  const manager = new LoadingManager();
  const dracoLoader = new DRACOLoader(manager);
  dracoLoader.setDecoderPath(decoderPath);

  const gltfLoader = new GLTFLoader(manager);
  gltfLoader.setDRACOLoader(dracoLoader);

  let disposed = false;

  return {
    async load(url, onProgress) {
      if (disposed) {
        throw new Error("The shelf model loader has already been disposed.");
      }

      return gltfLoader.loadAsync(url, onProgress);
    },
    dispose() {
      if (disposed) {
        return;
      }

      disposed = true;
      dracoLoader.dispose();
    },
  };
}
