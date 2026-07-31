import {
  ACESFilmicToneMapping,
  Box3,
  BoxGeometry,
  DirectionalLight,
  DoubleSide,
  Group,
  HemisphereLight,
  Line,
  MathUtils,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  Raycaster,
  Scene,
  ShadowMaterial,
  SRGBColorSpace,
  Texture,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { shelfBooks, type ShelfBook } from "../data/books";
import { createDevelopmentPlaceholderHardcover } from "./development-placeholder-book";
import {
  createShelfGltfRuntime,
  type ShelfGltfRuntime,
} from "./gltf-runtime";

type AppMode =
  | "loading"
  | "browsing"
  | "transitioning"
  | "inspecting"
  | "error"
  | "unsupported";
type CameraOwner = "browse" | "transition" | "orbit";
type TransitionKind = "inspect" | "browse";

interface ShelfState {
  mode: AppMode;
  cameraOwner: CameraOwner;
  selectedIndex: number;
  browsePosition: number;
  browseTarget: number;
  focusProgress: number;
  loadedAssets: number;
  failedAssets: number;
  loadingProgress: number;
}

interface BookVisual {
  presentation: Group;
  canonical: Group;
  pickProxy: Mesh;
  baseX: number;
  selectionMix: number;
  content: Object3D | null;
  assetKind: "pending" | "model" | "development-placeholder";
}

interface CameraTransition {
  kind: TransitionKind;
  startedAt: number;
  duration: number;
  fromPosition: Vector3;
  fromTarget: Vector3;
}

interface PointerDrag {
  active: boolean;
  pointerId: number;
  startX: number;
  startY: number;
  startPosition: number;
  distanceSquared: number;
}

interface DomHooks {
  previous: HTMLButtonElement | null;
  next: HTMLButtonElement | null;
  inspect: HTMLButtonElement | null;
  back: HTMLButtonElement | null;
  reset: HTMLButtonElement | null;
  retry: readonly HTMLButtonElement[];
  markers: readonly HTMLButtonElement[];
  details: HTMLElement | null;
  status: HTMLElement | null;
  loadingProgress: HTMLElement | null;
  loadingScreen: HTMLElement | null;
  errorScreen: HTMLElement | null;
  errorMessage: HTMLElement | null;
  live: HTMLElement | null;
  captionTitle: HTMLElement | null;
  captionAuthor: HTMLElement | null;
  captionPosition: HTMLElement | null;
  detailsTitle: HTMLElement | null;
  detailsAuthor: HTMLElement | null;
  detailsDescription: HTMLElement | null;
  detailsQuote: HTMLElement | null;
  detailsQuoteBy: HTMLElement | null;
  detailsFormat: HTMLElement | null;
  detailsYear: HTMLElement | null;
  detailsPosition: HTMLElement | null;
}

export interface ShelfAppDiagnostics {
  app: "complete-shelf";
  mode: AppMode;
  selectedIndex: number;
  loadedAssets: number;
  failedAssets: number;
  developmentPlaceholders: number;
  cameraOwner: CameraOwner;
  calls: number;
  triangles: number;
  geometries: number;
  textures: number;
  dprCap: number;
  shadowLights: 1;
  shadowMapSize: number;
  postPasses: 0;
  lastError?: string;
}

declare global {
  interface Window {
    __THREE_APP_DIAGNOSTICS__?: ShelfAppDiagnostics;
  }
}

const activeMounts = new WeakMap<HTMLElement, () => void>();
const PICK_LAYER = 1;
const BOOK_GAP = 0.038;
const MAX_LOAD_CONCURRENCY = 3;
const HALF_PI = Math.PI * 0.5;

const clampIndex = (index: number): number =>
  MathUtils.clamp(Math.round(index), 0, shelfBooks.length - 1);

const formatPosition = (index: number): string =>
  String(index + 1).padStart(2, "0");

const setText = (element: HTMLElement | null, value: string): void => {
  if (element) {
    element.textContent = value;
  }
};

const damp = (
  current: number,
  target: number,
  lambda: number,
  deltaSeconds: number,
): number =>
  MathUtils.lerp(
    current,
    target,
    1 - Math.exp(-lambda * Math.min(deltaSeconds, 0.05)),
  );

const easeEditorial = (amount: number): number =>
  1 - Math.pow(1 - MathUtils.clamp(amount, 0, 1), 3);

function disposeMaterial(
  material: Material,
  disposedMaterials: Set<Material>,
  disposedTextures: Set<Texture>,
): void {
  if (disposedMaterials.has(material)) {
    return;
  }

  disposedMaterials.add(material);
  const values = Object.values(
    material as unknown as Record<string, unknown>,
  );
  for (const value of values) {
    if (value instanceof Texture && !disposedTextures.has(value)) {
      disposedTextures.add(value);
      value.dispose();
    }
  }
  material.dispose();
}

function disposeObjectTree(root: Object3D): void {
  const geometries = new Set<{ dispose(): void }>();
  const materials = new Set<Material>();
  const textures = new Set<Texture>();

  root.traverse((object) => {
    if (!(object instanceof Mesh || object instanceof Line || object instanceof Points)) {
      return;
    }

    if (!geometries.has(object.geometry)) {
      geometries.add(object.geometry);
      object.geometry.dispose();
    }

    const meshMaterials = Array.isArray(object.material)
      ? object.material
      : [object.material];
    for (const material of meshMaterials) {
      disposeMaterial(material, materials, textures);
    }
  });
}

function collectDomHooks(root: HTMLElement): DomHooks {
  return {
    previous: root.querySelector<HTMLButtonElement>("[data-shelf-prev]"),
    next: root.querySelector<HTMLButtonElement>("[data-shelf-next]"),
    inspect: root.querySelector<HTMLButtonElement>("[data-shelf-inspect]"),
    back: root.querySelector<HTMLButtonElement>("[data-shelf-back]"),
    reset: root.querySelector<HTMLButtonElement>("[data-shelf-reset]"),
    retry: Array.from(
      root.querySelectorAll<HTMLButtonElement>(
        "[data-error-retry], [data-shelf-retry]",
      ),
    ),
    markers: Array.from(
      root.querySelectorAll<HTMLButtonElement>("[data-marker-index]"),
    ),
    details: root.querySelector<HTMLElement>("[data-shelf-details]"),
    status: root.querySelector<HTMLElement>("[data-status-text]"),
    loadingProgress: root.querySelector<HTMLElement>(
      "[data-loading-progress]",
    ),
    loadingScreen: root.querySelector<HTMLElement>("[data-loading-screen]"),
    errorScreen: root.querySelector<HTMLElement>("[data-error-screen]"),
    errorMessage: root.querySelector<HTMLElement>("[data-error-message]"),
    live: root.querySelector<HTMLElement>("[data-live-region]"),
    captionTitle: root.querySelector<HTMLElement>("[data-book-title]"),
    captionAuthor: root.querySelector<HTMLElement>("[data-book-author]"),
    captionPosition: root.querySelector<HTMLElement>(
      "[data-position-current]",
    ),
    detailsTitle: root.querySelector<HTMLElement>("[data-details-title]"),
    detailsAuthor: root.querySelector<HTMLElement>("[data-details-author]"),
    detailsDescription: root.querySelector<HTMLElement>(
      "[data-details-description]",
    ),
    detailsQuote: root.querySelector<HTMLElement>("[data-details-quote]"),
    detailsQuoteBy: root.querySelector<HTMLElement>(
      "[data-details-quote-by]",
    ),
    detailsFormat: root.querySelector<HTMLElement>("[data-details-format]"),
    detailsYear: root.querySelector<HTMLElement>("[data-details-year]"),
    detailsPosition: root.querySelector<HTMLElement>(
      "[data-details-position]",
    ),
  };
}

function normalizeImportedBook(source: Object3D, book: ShelfBook): Group {
  source.updateMatrixWorld(true);
  const bounds = new Box3().setFromObject(source);
  const size = bounds.getSize(new Vector3());
  const center = bounds.getCenter(new Vector3());

  if (
    bounds.isEmpty() ||
    size.x < Number.EPSILON ||
    size.y < Number.EPSILON ||
    size.z < Number.EPSILON
  ) {
    throw new Error(`The local model for “${book.title}” has empty bounds.`);
  }

  source.traverse((object) => {
    if (object instanceof Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

  const recentered = new Group();
  recentered.name = "Imported model pivot normalization";
  recentered.position.set(-center.x, -bounds.min.y, -center.z);
  recentered.add(source);

  const scaled = new Group();
  scaled.name = "Imported model dimension normalization";
  scaled.scale.set(
    book.width / size.x,
    book.height / size.y,
    book.thickness / size.z,
  );
  scaled.add(recentered);

  const spineFacing = new Group();
  spineFacing.name = "Imported model canonical spine orientation";
  spineFacing.rotation.y = HALF_PI;
  spineFacing.add(scaled);
  return spineFacing;
}

class ShelfExperienceOwner {
  private readonly root: HTMLElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly dom: DomHooks;
  private readonly state: ShelfState = {
    mode: "loading",
    cameraOwner: "browse",
    selectedIndex: 0,
    browsePosition: 0,
    browseTarget: 0,
    focusProgress: 0,
    loadedAssets: 0,
    failedAssets: 0,
    loadingProgress: 0,
  };

  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(35, 1, 0.08, 100);
  private readonly shelfGroup = new Group();
  private readonly bookVisuals: BookVisual[] = [];
  private readonly bookCenters: number[] = [];
  private readonly pickTargets: Object3D[] = [];
  private readonly raycaster = new Raycaster();
  private readonly pointerNdc = new Vector2();
  private readonly browseCameraPosition = new Vector3(0, 1.35, 5.55);
  private readonly browseLookTarget = new Vector3(0, 1.13, 0);
  private readonly inspectCameraPosition = new Vector3();
  private readonly inspectLookTarget = new Vector3();
  private readonly currentLookTarget = new Vector3(0, 1.13, 0);
  private readonly panMinimum = new Vector3();
  private readonly panMaximum = new Vector3();
  private readonly panCorrection = new Vector3();
  private readonly drag: PointerDrag = {
    active: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    startPosition: 0,
    distanceSquared: 0,
  };
  private readonly disposers: Array<() => void> = [];
  private readonly reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  private renderer: WebGLRenderer | null = null;
  private controls: OrbitControls | null = null;
  private gltfRuntime: ShelfGltfRuntime | null = null;
  private keyLight: DirectionalLight | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private transition: CameraTransition | null = null;
  private animationFrame = 0;
  private previousFrameTime = 0;
  private loadAttempt = 0;
  private fatalLoadError: Error | null = null;
  private wheelTimer: number | null = null;
  private disposed = false;
  private reducedMotion = this.reducedMotionQuery.matches;
  private viewportWidth = 1;
  private viewportHeight = 1;
  private dprCap = 2;
  private shadowMapSize = 2048;
  private focusOffsetX = -1.15;
  private focusOffsetY = 0.1;
  private diagnostics: ShelfAppDiagnostics | null = null;

  constructor(root: HTMLElement) {
    const canvas = root.querySelector<HTMLCanvasElement>("[data-shelf-canvas]");
    if (!canvas) {
      throw new Error(
        "The Complete Shelf requires a [data-shelf-canvas] element.",
      );
    }

    this.root = root;
    this.canvas = canvas;
    this.dom = collectDomHooks(root);
  }

  start(): void {
    this.projectSelectedBook();
    this.projectLoading();
    this.projectMode();

    const context = this.canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      depth: true,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      stencil: false,
    });

    if (!context) {
      this.setUnsupported();
      return;
    }

    try {
      this.renderer = new WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: true,
        depth: true,
        powerPreference: "high-performance",
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        stencil: false,
      });
    } catch {
      this.setUnsupported();
      return;
    }

    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.04;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setClearColor(0x000000, 0);

    this.scene.name = "The Complete Shelf scene";
    this.shelfGroup.name = "Book shelf presentation group";
    this.scene.add(this.shelfGroup);
    this.createEnvironment();
    this.createBookSlots();

    const decoderPath =
      this.root.dataset.dracoDecoderPath ??
      "/clones/complete-shelf/draco/gltf/";
    this.gltfRuntime = createShelfGltfRuntime(decoderPath);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enabled = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.07;
    this.controls.enablePan = true;
    this.controls.enableZoom = true;
    this.controls.enableRotate = true;
    this.controls.screenSpacePanning = true;
    this.controls.zoomToCursor = true;
    this.controls.minDistance = 2.4;
    this.controls.maxDistance = 7;
    this.controls.minPolarAngle = 0.38;
    this.controls.maxPolarAngle = Math.PI * 0.49;
    this.controls.minAzimuthAngle = -Math.PI * 0.38;
    this.controls.maxAzimuthAngle = Math.PI * 0.38;

    this.raycaster.layers.set(PICK_LAYER);
    this.installListeners();
    this.installResizeOwner();
    this.resize();
    this.camera.position.copy(this.browseCameraPosition);
    this.camera.lookAt(this.browseLookTarget);
    this.currentLookTarget.copy(this.browseLookTarget);
    this.initializeDiagnostics();

    this.animationFrame = window.requestAnimationFrame(this.tick);
    void this.beginLoadingAttempt();
  }

  dispose(): void {
    if (this.disposed) {
      return;
    }

    this.disposed = true;
    this.loadAttempt += 1;
    window.cancelAnimationFrame(this.animationFrame);
    if (this.wheelTimer) {
      window.clearTimeout(this.wheelTimer);
      this.wheelTimer = null;
    }
    this.cancelDrag();
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    for (const disposeListener of this.disposers.splice(0)) {
      disposeListener();
    }
    this.controls?.dispose();
    this.controls = null;
    this.gltfRuntime?.dispose();
    this.gltfRuntime = null;

    disposeObjectTree(this.scene);
    this.scene.clear();
    this.renderer?.renderLists.dispose();
    this.renderer?.dispose();
    this.renderer?.forceContextLoss();
    this.renderer = null;

    this.root.classList.remove(
      "is-loading",
      "is-browsing",
      "is-transitioning",
      "is-focused",
      "has-error",
      "is-unsupported",
      "is-dragging",
    );
    delete this.root.dataset.shelfMode;
    delete this.root.dataset.selectedIndex;
    this.canvas.removeAttribute("aria-busy");
    this.canvas.removeAttribute("aria-hidden");

    if (
      this.diagnostics &&
      window.__THREE_APP_DIAGNOSTICS__ === this.diagnostics
    ) {
      delete window.__THREE_APP_DIAGNOSTICS__;
    }
    this.diagnostics = null;
  }

  private createEnvironment(): void {
    const environment = new Group();
    environment.name = "Procedural paper and walnut environment";

    const paperMaterial = new MeshBasicMaterial({
      color: 0xf1ede4,
      side: DoubleSide,
    });
    const paper = new Mesh(new PlaneGeometry(38, 15), paperMaterial);
    paper.name = "Cream paper support";
    paper.position.set(0, 4.2, -2.35);
    environment.add(paper);

    const walnutMaterial = new MeshStandardMaterial({
      color: 0x714832,
      metalness: 0.01,
      roughness: 0.66,
    });
    const walnutEdgeMaterial = new MeshStandardMaterial({
      color: 0x3b2116,
      metalness: 0.015,
      roughness: 0.61,
    });

    const shelf = new Mesh(
      new BoxGeometry(36, 0.24, 2.5),
      walnutMaterial,
    );
    shelf.name = "Continuous walnut shelf";
    shelf.position.set(0, -0.14, 0);
    shelf.castShadow = true;
    shelf.receiveShadow = true;
    environment.add(shelf);

    const shelfEdge = new Mesh(
      new BoxGeometry(36, 0.34, 0.19),
      walnutEdgeMaterial,
    );
    shelfEdge.name = "Walnut shelf front edge";
    shelfEdge.position.set(0, -0.25, 1.17);
    shelfEdge.castShadow = true;
    shelfEdge.receiveShadow = true;
    environment.add(shelfEdge);

    const shadowReceiver = new Mesh(
      new PlaneGeometry(36, 2.45),
      new ShadowMaterial({
        color: 0x321c13,
        opacity: 0.18,
        transparent: true,
        depthWrite: false,
      }),
    );
    shadowReceiver.name = "Book contact shadow receiver";
    shadowReceiver.rotation.x = -HALF_PI;
    shadowReceiver.position.y = -0.012;
    shadowReceiver.receiveShadow = true;
    environment.add(shadowReceiver);

    const hemisphere = new HemisphereLight(0xfff8e9, 0x745744, 2.35);
    hemisphere.name = "Editorial ambient hemisphere";
    environment.add(hemisphere);

    const key = new DirectionalLight(0xffe8cb, 4.7);
    key.name = "Warm upper-left key";
    key.position.set(-5.4, 7.8, 7.2);
    key.target.position.set(0, 1.05, 0);
    key.castShadow = true;
    key.shadow.bias = -0.00035;
    key.shadow.normalBias = 0.018;
    key.shadow.radius = 2.2;
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 28;
    key.shadow.camera.left = -10;
    key.shadow.camera.right = 10;
    key.shadow.camera.top = 8;
    key.shadow.camera.bottom = -2;
    environment.add(key, key.target);
    this.keyLight = key;

    const fill = new DirectionalLight(0xe8eef2, 1.25);
    fill.name = "Neutral camera fill";
    fill.position.set(3.8, 3.4, 6.8);
    environment.add(fill);

    const rim = new DirectionalLight(0xffd8b3, 1.5);
    rim.name = "Warm upper-right rim";
    rim.position.set(6.2, 6.5, -1.4);
    environment.add(rim);

    this.scene.add(environment);
  }

  private createBookSlots(): void {
    let center = 0;
    const pickMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      colorWrite: false,
      depthWrite: false,
      opacity: 0,
      transparent: true,
    });

    shelfBooks.forEach((book, index) => {
      if (index > 0) {
        const previous = shelfBooks[index - 1];
        center +=
          previous.thickness * 0.5 +
          BOOK_GAP +
          book.thickness * 0.5;
      }
      this.bookCenters.push(center);

      const presentation = new Group();
      presentation.name = `Presentation wrapper: ${book.id}`;
      presentation.position.set(center, 0, 0);

      const canonical = new Group();
      canonical.name = `Canonical asset wrapper: ${book.id}`;

      const pickProxy = new Mesh(
        new BoxGeometry(
          book.thickness * 1.15,
          book.height * 1.035,
          book.width * 1.035,
        ),
        pickMaterial,
      );
      pickProxy.name = `Pick proxy: ${book.id}`;
      pickProxy.position.y = book.height * 0.5;
      pickProxy.layers.set(PICK_LAYER);
      pickProxy.userData.bookIndex = index;

      presentation.add(canonical, pickProxy);
      this.shelfGroup.add(presentation);
      this.pickTargets.push(pickProxy);
      this.bookVisuals.push({
        presentation,
        canonical,
        pickProxy,
        baseX: center,
        selectionMix: index === 0 ? 1 : 0,
        content: null,
        assetKind: "pending",
      });
    });
  }

  private listen(
    target: EventTarget,
    type: string,
    listener: EventListener,
    options?: AddEventListenerOptions,
  ): void {
    target.addEventListener(type, listener, options);
    this.disposers.push(() => target.removeEventListener(type, listener, options));
  }

  private installListeners(): void {
    this.listen(
      this.canvas,
      "pointerdown",
      this.onPointerDown as EventListener,
    );
    this.listen(
      this.canvas,
      "pointermove",
      this.onPointerMove as EventListener,
    );
    this.listen(this.canvas, "pointerup", this.onPointerUp as EventListener);
    this.listen(
      this.canvas,
      "pointercancel",
      this.onPointerCancel as EventListener,
    );
    this.listen(
      this.canvas,
      "lostpointercapture",
      this.onPointerCancel as EventListener,
    );
    this.listen(this.root, "wheel", this.onWheel as EventListener, {
      passive: false,
    });
    this.listen(this.root, "keydown", this.onKeyDown as EventListener);
    this.listen(window, "blur", this.onWindowBlur);
    this.listen(document, "visibilitychange", this.onVisibilityChange);
    this.listen(
      this.reducedMotionQuery,
      "change",
      this.onReducedMotionChange as EventListener,
    );

    this.listenButton(this.dom.previous, () => {
      this.selectIndex(this.state.selectedIndex - 1, true);
    });
    this.listenButton(this.dom.next, () => {
      this.selectIndex(this.state.selectedIndex + 1, true);
    });
    this.listenButton(this.dom.inspect, () => this.enterInspect());
    this.listenButton(this.dom.back, () => this.exitInspect());
    this.listenButton(this.dom.reset, () => this.resetInspectView(true));
    for (const retry of this.dom.retry) {
      this.listenButton(retry, () => {
        if (this.state.mode === "error") {
          void this.beginLoadingAttempt();
        }
      });
    }

    for (const marker of this.dom.markers) {
      const markerIndex = Number(marker.dataset.markerIndex);
      if (!Number.isInteger(markerIndex)) {
        continue;
      }
      this.listenButton(marker, () => this.selectIndex(markerIndex, true));
    }

    this.listen(
      this.canvas,
      "webglcontextlost",
      this.onContextLost as EventListener,
    );
    this.listen(
      this.canvas,
      "webglcontextrestored",
      this.onContextRestored,
    );
  }

  private listenButton(
    button: HTMLButtonElement | null,
    action: () => void,
  ): void {
    if (!button) {
      return;
    }
    const listener = (): void => action();
    this.listen(button, "click", listener);
  }

  private installResizeOwner(): void {
    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(this.root);
    } else {
      this.listen(window, "resize", this.onWindowResize);
    }
  }

  private readonly onWindowResize = (): void => this.resize();

  private readonly onWindowBlur = (): void => {
    this.cancelDrag(true);
  };

  private readonly onVisibilityChange = (): void => {
    if (document.visibilityState !== "visible") {
      this.cancelDrag(true);
    }
  };

  private readonly onReducedMotionChange = (
    event: MediaQueryListEvent,
  ): void => {
    this.reducedMotion = event.matches;
    if (event.matches) {
      this.state.browsePosition = this.state.browseTarget;
      if (this.transition) {
        this.transition.startedAt = performance.now() - this.transition.duration;
      }
    }
  };

  private readonly onContextLost = (event: WebGLContextEvent): void => {
    event.preventDefault();
    if (this.disposed) {
      return;
    }
    this.fatalLoadError = new Error("The WebGL context was interrupted.");
    this.state.mode = "error";
    this.state.failedAssets = Math.max(1, this.state.failedAssets);
    this.setStatus("3D rendering was interrupted");
    setText(
      this.dom.errorMessage,
      "The 3D renderer was interrupted. Restore or reload the page to continue.",
    );
    if (this.diagnostics) {
      this.diagnostics.lastError = "The WebGL context was interrupted.";
    }
    this.projectMode();
  };

  private readonly onContextRestored = (): void => {
    if (this.disposed) {
      return;
    }
    this.fatalLoadError = null;
    this.state.focusProgress = 0;
    this.state.cameraOwner = "browse";
    this.transition = null;
    if (this.controls) {
      this.controls.enabled = false;
    }
    this.camera.position.copy(this.browseCameraPosition);
    this.currentLookTarget.copy(this.browseLookTarget);
    this.camera.lookAt(this.browseLookTarget);
    this.state.mode =
      this.state.loadedAssets === shelfBooks.length ? "browsing" : "loading";
    this.projectMode();
    if (this.state.mode === "loading") {
      void this.beginLoadingAttempt();
    }
  };

  private readonly onPointerDown = (event: PointerEvent): void => {
    if (
      this.state.mode !== "browsing" ||
      !event.isPrimary ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    this.canvas.focus({ preventScroll: true });
    this.drag.active = true;
    this.drag.pointerId = event.pointerId;
    this.drag.startX = event.clientX;
    this.drag.startY = event.clientY;
    this.drag.startPosition = this.state.browsePosition;
    this.drag.distanceSquared = 0;
    this.root.classList.add("is-dragging");
    this.canvas.setPointerCapture(event.pointerId);
  };

  private readonly onPointerMove = (event: PointerEvent): void => {
    if (!this.drag.active || event.pointerId !== this.drag.pointerId) {
      return;
    }

    event.preventDefault();
    const deltaX = event.clientX - this.drag.startX;
    const deltaY = event.clientY - this.drag.startY;
    this.drag.distanceSquared = deltaX * deltaX + deltaY * deltaY;
    const pixelsPerBook = Math.max(92, this.viewportWidth * 0.115);
    const proposed = MathUtils.clamp(
      this.drag.startPosition - deltaX / pixelsPerBook,
      0,
      shelfBooks.length - 1,
    );
    this.state.browsePosition = proposed;
    this.state.browseTarget = proposed;
    this.setNearestSelectedIndex(false);
  };

  private readonly onPointerUp = (event: PointerEvent): void => {
    if (!this.drag.active || event.pointerId !== this.drag.pointerId) {
      return;
    }

    event.preventDefault();
    const wasClick = this.drag.distanceSquared < 36;
    this.finishPointerCapture(event.pointerId);
    if (wasClick) {
      this.pickBook(event.clientX, event.clientY);
    } else {
      this.snapToNearest(true);
    }
  };

  private readonly onPointerCancel = (event: PointerEvent): void => {
    if (this.drag.active && event.pointerId === this.drag.pointerId) {
      this.finishPointerCapture(event.pointerId);
      this.snapToNearest(true);
    }
  };

  private finishPointerCapture(pointerId: number): void {
    if (this.canvas.hasPointerCapture(pointerId)) {
      this.canvas.releasePointerCapture(pointerId);
    }
    this.drag.active = false;
    this.drag.pointerId = -1;
    this.root.classList.remove("is-dragging");
  }

  private cancelDrag(snap = false): void {
    if (!this.drag.active) {
      return;
    }
    this.finishPointerCapture(this.drag.pointerId);
    if (snap) {
      this.snapToNearest(false);
    }
  }

  private readonly onWheel = (event: WheelEvent): void => {
    if (this.state.mode !== "browsing" || this.drag.active) {
      return;
    }

    event.preventDefault();
    const dominantDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;
    const normalizedDelta =
      event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? dominantDelta * 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? dominantDelta * this.viewportHeight
          : dominantDelta;

    const proposed = MathUtils.clamp(
      this.state.browsePosition + normalizedDelta / 300,
      0,
      shelfBooks.length - 1,
    );
    this.state.browsePosition = proposed;
    this.state.browseTarget = proposed;
    this.setNearestSelectedIndex(false);

    if (this.wheelTimer) {
      window.clearTimeout(this.wheelTimer);
    }
    this.wheelTimer = window.setTimeout(() => {
      this.wheelTimer = null;
      this.snapToNearest(true);
    }, 135);
  };

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      if (this.state.mode === "inspecting") {
        event.preventDefault();
        this.exitInspect();
      }
      return;
    }

    if (this.state.mode !== "browsing") {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.selectIndex(this.state.selectedIndex - 1, true);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      this.selectIndex(this.state.selectedIndex + 1, true);
    } else if (event.key === "Enter") {
      event.preventDefault();
      this.enterInspect();
    }
  };

  private pickBook(clientX: number, clientY: number): void {
    if (this.state.mode !== "browsing") {
      return;
    }

    const bounds = this.canvas.getBoundingClientRect();
    if (bounds.width <= 0 || bounds.height <= 0) {
      return;
    }
    this.pointerNdc.set(
      ((clientX - bounds.left) / bounds.width) * 2 - 1,
      -((clientY - bounds.top) / bounds.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(this.pointerNdc, this.camera);
    const intersections: ReturnType<Raycaster["intersectObjects"]> = [];
    this.raycaster.intersectObjects(this.pickTargets, false, intersections);
    const hit = intersections[0]?.object;
    const bookIndex = hit?.userData.bookIndex;
    if (typeof bookIndex !== "number") {
      return;
    }

    if (bookIndex === this.state.selectedIndex) {
      this.enterInspect();
    } else {
      this.selectIndex(bookIndex, true);
    }
  }

  private selectIndex(index: number, announce: boolean): void {
    if (this.state.mode !== "browsing") {
      return;
    }
    const nextIndex = clampIndex(index);
    this.state.selectedIndex = nextIndex;
    this.state.browseTarget = nextIndex;
    if (this.reducedMotion) {
      this.state.browsePosition = nextIndex;
    }
    this.projectSelectedBook();
    this.projectMode();
    if (announce) {
      this.announceSelection();
    }
  }

  private setNearestSelectedIndex(announce: boolean): void {
    const nextIndex = clampIndex(this.state.browsePosition);
    if (nextIndex === this.state.selectedIndex) {
      return;
    }
    this.state.selectedIndex = nextIndex;
    this.projectSelectedBook();
    this.projectMode();
    if (announce) {
      this.announceSelection();
    }
  }

  private snapToNearest(announce: boolean): void {
    const nextIndex = clampIndex(this.state.browsePosition);
    this.state.selectedIndex = nextIndex;
    this.state.browseTarget = nextIndex;
    if (this.reducedMotion) {
      this.state.browsePosition = nextIndex;
    }
    this.projectSelectedBook();
    this.projectMode();
    if (announce) {
      this.announceSelection();
    }
  }

  private enterInspect(): void {
    if (this.state.mode !== "browsing") {
      return;
    }

    this.state.browsePosition = this.state.selectedIndex;
    this.state.browseTarget = this.state.selectedIndex;
    this.state.mode = "transitioning";
    this.state.cameraOwner = "transition";
    this.controls!.enabled = false;
    this.computeInspectFrame();
    this.transition = {
      kind: "inspect",
      startedAt: performance.now(),
      duration: this.reducedMotion ? 1 : 720,
      fromPosition: this.camera.position.clone(),
      fromTarget: this.currentLookTarget.clone(),
    };
    this.setStatus(`Opening ${shelfBooks[this.state.selectedIndex].shortTitle}`);
    this.projectMode();
  }

  private exitInspect(): void {
    if (this.state.mode !== "inspecting" || !this.controls) {
      return;
    }

    this.controls.enabled = false;
    this.state.mode = "transitioning";
    this.state.cameraOwner = "transition";
    this.transition = {
      kind: "browse",
      startedAt: performance.now(),
      duration: this.reducedMotion ? 1 : 620,
      fromPosition: this.camera.position.clone(),
      fromTarget: this.controls.target.clone(),
    };
    this.setStatus("Returning to the shelf");
    this.projectMode();
  }

  private resetInspectView(announce: boolean): void {
    if (this.state.mode !== "inspecting" || !this.controls) {
      return;
    }

    this.computeInspectFrame();
    this.camera.position.copy(this.inspectCameraPosition);
    this.controls.target.copy(this.inspectLookTarget);
    this.currentLookTarget.copy(this.inspectLookTarget);
    this.controls.update();
    if (announce) {
      this.announce("Inspection view reset.");
    }
  }

  private computeInspectFrame(): void {
    const book = shelfBooks[this.state.selectedIndex];
    const isMobile = this.viewportWidth <= 760;
    this.focusOffsetX = isMobile ? 0 : -1.18;
    this.focusOffsetY = isMobile ? 0.67 : 0.11;

    const centerY = this.focusOffsetY + book.height * 0.51;
    this.inspectLookTarget.set(this.focusOffsetX, centerY, 0.78);
    this.inspectCameraPosition.set(
      this.focusOffsetX,
      centerY + (isMobile ? 0.12 : 0.2),
      isMobile ? 5.2 : 4.72,
    );
    this.panMinimum.set(
      this.inspectLookTarget.x - (isMobile ? 0.5 : 0.72),
      this.inspectLookTarget.y - 0.48,
      this.inspectLookTarget.z - 0.3,
    );
    this.panMaximum.set(
      this.inspectLookTarget.x + (isMobile ? 0.5 : 0.72),
      this.inspectLookTarget.y + 0.48,
      this.inspectLookTarget.z + 0.3,
    );
  }

  private resize(): void {
    if (!this.renderer || this.disposed) {
      return;
    }

    const bounds = this.root.getBoundingClientRect();
    const previousMobile = this.viewportWidth <= 760;
    this.viewportWidth = Math.max(1, Math.round(bounds.width));
    this.viewportHeight = Math.max(1, Math.round(bounds.height));
    const isMobile = this.viewportWidth <= 760;
    this.dprCap = isMobile ? 1.5 : 2;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, this.dprCap);
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(this.viewportWidth, this.viewportHeight, false);

    this.camera.aspect = this.viewportWidth / this.viewportHeight;
    this.camera.fov = isMobile ? 42 : 35;
    this.camera.updateProjectionMatrix();

    const nextShadowSize = isMobile ? 1024 : 2048;
    if (this.keyLight && nextShadowSize !== this.shadowMapSize) {
      this.keyLight.shadow.map?.dispose();
      this.keyLight.shadow.map = null;
      this.keyLight.shadow.mapSize.set(nextShadowSize, nextShadowSize);
      this.keyLight.shadow.needsUpdate = true;
    } else if (this.keyLight && !this.keyLight.shadow.map) {
      this.keyLight.shadow.mapSize.set(nextShadowSize, nextShadowSize);
    }
    this.shadowMapSize = nextShadowSize;
    this.computeInspectFrame();

    if (this.state.mode === "browsing") {
      this.camera.position.copy(this.browseCameraPosition);
      this.camera.lookAt(this.browseLookTarget);
      this.currentLookTarget.copy(this.browseLookTarget);
    } else if (
      this.state.mode === "inspecting" &&
      previousMobile !== isMobile
    ) {
      this.resetInspectView(false);
    }
    this.updateDiagnostics();
  }

  private readonly tick = (time: number): void => {
    if (this.disposed || !this.renderer) {
      return;
    }

    const deltaSeconds =
      this.previousFrameTime === 0
        ? 1 / 60
        : Math.min((time - this.previousFrameTime) / 1000, 0.05);
    this.previousFrameTime = time;

    this.updateBrowsePresentation(deltaSeconds);
    this.updateFocusTransition(time);
    if (this.state.mode === "inspecting" && this.controls) {
      this.controls.update(deltaSeconds);
      this.constrainOrbitPan();
      this.currentLookTarget.copy(this.controls.target);
    }

    this.renderer.render(this.scene, this.camera);
    this.updateDiagnostics();
    this.animationFrame = window.requestAnimationFrame(this.tick);
  };

  private updateBrowsePresentation(deltaSeconds: number): void {
    if (!this.drag.active) {
      const browseLambda = this.reducedMotion ? 1000 : 10.5;
      this.state.browsePosition = damp(
        this.state.browsePosition,
        this.state.browseTarget,
        browseLambda,
        deltaSeconds,
      );
      if (
        Math.abs(this.state.browsePosition - this.state.browseTarget) < 0.0001
      ) {
        this.state.browsePosition = this.state.browseTarget;
      }
    }

    this.shelfGroup.position.x = -this.centerAtPosition(
      this.state.browsePosition,
    );
    const selectionLambda = this.reducedMotion ? 1000 : 11;
    const focus = this.state.focusProgress;

    for (let index = 0; index < this.bookVisuals.length; index += 1) {
      const visual = this.bookVisuals[index];
      const selectedTarget = index === this.state.selectedIndex ? 1 : 0;
      visual.selectionMix = damp(
        visual.selectionMix,
        selectedTarget,
        selectionLambda,
        deltaSeconds,
      );
      if (Math.abs(visual.selectionMix - selectedTarget) < 0.0001) {
        visual.selectionMix = selectedTarget;
      }

      const selected = visual.selectionMix;
      const selectedFocus = selected * focus;
      visual.presentation.rotation.y = selected * -HALF_PI;
      visual.presentation.position.x =
        visual.baseX + selectedFocus * this.focusOffsetX;
      visual.presentation.position.y =
        selected * 0.015 +
        selectedFocus * this.focusOffsetY -
        (1 - selected) * focus * 0.045;
      visual.presentation.position.z =
        selected * 0.5 +
        selectedFocus * 0.88 -
        (1 - selected) * focus * 0.52;
      const scale =
        1 +
        selected * 0.018 +
        selectedFocus * 0.055 -
        (1 - selected) * focus * 0.025;
      visual.presentation.scale.setScalar(scale);
    }
  }

  private updateFocusTransition(time: number): void {
    if (this.state.mode !== "transitioning" || !this.transition) {
      return;
    }

    const transition = this.transition;
    const rawProgress = MathUtils.clamp(
      (time - transition.startedAt) / transition.duration,
      0,
      1,
    );
    const progress = easeEditorial(rawProgress);
    this.computeInspectFrame();

    if (transition.kind === "inspect") {
      this.state.focusProgress = progress;
      this.camera.position.lerpVectors(
        transition.fromPosition,
        this.inspectCameraPosition,
        progress,
      );
      this.currentLookTarget.lerpVectors(
        transition.fromTarget,
        this.inspectLookTarget,
        progress,
      );
    } else {
      this.state.focusProgress = 1 - progress;
      this.camera.position.lerpVectors(
        transition.fromPosition,
        this.browseCameraPosition,
        progress,
      );
      this.currentLookTarget.lerpVectors(
        transition.fromTarget,
        this.browseLookTarget,
        progress,
      );
    }
    this.camera.lookAt(this.currentLookTarget);

    if (rawProgress < 1) {
      return;
    }

    if (transition.kind === "inspect") {
      this.state.focusProgress = 1;
      this.state.mode = "inspecting";
      this.state.cameraOwner = "orbit";
      this.controls!.target.copy(this.inspectLookTarget);
      this.controls!.enabled = true;
      this.controls!.update();
      this.setStatus(`Inspecting ${shelfBooks[this.state.selectedIndex].shortTitle}`);
      this.announce(
        `Inspecting ${shelfBooks[this.state.selectedIndex].title}. Drag to rotate, scroll to zoom, and press Escape to return.`,
      );
    } else {
      this.state.focusProgress = 0;
      this.state.mode = "browsing";
      this.state.cameraOwner = "browse";
      this.camera.position.copy(this.browseCameraPosition);
      this.currentLookTarget.copy(this.browseLookTarget);
      this.camera.lookAt(this.browseLookTarget);
      this.setStatus(`${shelfBooks.length} volumes ready`);
      this.announce(
        `Returned to the shelf. ${shelfBooks[this.state.selectedIndex].title} selected.`,
      );
    }
    this.transition = null;
    this.projectMode();
  }

  private constrainOrbitPan(): void {
    if (!this.controls) {
      return;
    }

    this.panCorrection
      .copy(this.controls.target)
      .clamp(this.panMinimum, this.panMaximum)
      .sub(this.controls.target);
    if (this.panCorrection.lengthSq() > 0) {
      this.controls.target.add(this.panCorrection);
      this.camera.position.add(this.panCorrection);
    }
  }

  private centerAtPosition(position: number): number {
    const lowerIndex = Math.floor(position);
    const upperIndex = Math.min(lowerIndex + 1, this.bookCenters.length - 1);
    const fraction = position - lowerIndex;
    return MathUtils.lerp(
      this.bookCenters[lowerIndex] ?? 0,
      this.bookCenters[upperIndex] ?? 0,
      fraction,
    );
  }

  private async beginLoadingAttempt(): Promise<void> {
    if (this.disposed || !this.gltfRuntime) {
      return;
    }

    const attempt = ++this.loadAttempt;
    this.fatalLoadError = null;
    this.clearBookContent();
    this.state.loadedAssets = 0;
    this.state.failedAssets = 0;
    this.state.loadingProgress = 0;
    this.state.mode = "loading";
    this.state.cameraOwner = "browse";
    this.setStatus(`Preparing 0 of ${shelfBooks.length} volumes`);
    setText(this.dom.errorMessage, "");
    if (this.diagnostics) {
      delete this.diagnostics.lastError;
    }
    this.projectLoading();
    this.projectMode();

    const itemProgress = new Array<number>(shelfBooks.length).fill(0);
    let nextBookIndex = 0;
    const workerCount = Math.min(MAX_LOAD_CONCURRENCY, shelfBooks.length);

    const worker = async (): Promise<void> => {
      while (
        nextBookIndex < shelfBooks.length &&
        !this.disposed &&
        attempt === this.loadAttempt &&
        !this.fatalLoadError
      ) {
        const index = nextBookIndex;
        nextBookIndex += 1;
        try {
          const content = await this.loadBookVisual(
            shelfBooks[index],
            index,
            (progress) => {
              if (
                attempt !== this.loadAttempt ||
                this.disposed ||
                this.fatalLoadError
              ) {
                return;
              }
              itemProgress[index] = progress;
              this.updateAggregateProgress(itemProgress);
            },
          );

          if (
            attempt !== this.loadAttempt ||
            this.disposed ||
            this.fatalLoadError
          ) {
            disposeObjectTree(content);
            continue;
          }

          this.bookVisuals[index].content = content;
          this.bookVisuals[index].canonical.add(content);
          this.bookVisuals[index].assetKind =
            shelfBooks[index].modelUrl === undefined
              ? "development-placeholder"
              : "model";
          this.state.loadedAssets += 1;
          itemProgress[index] = 1;
          this.updateAggregateProgress(itemProgress);
        } catch (error) {
          this.latchLoadingFailure(error, attempt);
        }
      }
    };

    await Promise.all(Array.from({ length: workerCount }, () => worker()));

    if (
      this.disposed ||
      attempt !== this.loadAttempt ||
      this.fatalLoadError
    ) {
      return;
    }

    this.state.loadingProgress = 1;
    this.state.mode = "browsing";
    this.state.cameraOwner = "browse";
    this.setStatus(`${shelfBooks.length} volumes ready`);
    this.projectLoading();
    this.projectMode();
    this.announceSelection();
  }

  private async loadBookVisual(
    book: ShelfBook,
    index: number,
    onProgress: (progress: number) => void,
  ): Promise<Object3D> {
    if (book.modelUrl === undefined) {
      onProgress(1);
      return createDevelopmentPlaceholderHardcover(book, index);
    }
    if (book.modelUrl.trim().length === 0) {
      throw new Error(`The modelUrl for “${book.title}” is empty.`);
    }
    if (!book.modelUrl.startsWith("/clones/complete-shelf/")) {
      throw new Error(
        `The modelUrl for “${book.title}” must use the clone-local asset namespace.`,
      );
    }

    const gltf = await this.gltfRuntime!.load(book.modelUrl, (event) => {
      if (event.lengthComputable && event.total > 0) {
        onProgress(MathUtils.clamp(event.loaded / event.total, 0, 0.98));
      }
    });
    onProgress(1);
    return normalizeImportedBook(gltf.scene, book);
  }

  private updateAggregateProgress(itemProgress: readonly number[]): void {
    let completed = 0;
    for (const progress of itemProgress) {
      completed += progress;
    }
    this.state.loadingProgress = completed / shelfBooks.length;
    this.setStatus(
      `Preparing ${this.state.loadedAssets} of ${shelfBooks.length} volumes`,
    );
    this.projectLoading();
  }

  private latchLoadingFailure(error: unknown, attempt: number): void {
    if (
      attempt !== this.loadAttempt ||
      this.disposed ||
      this.fatalLoadError
    ) {
      return;
    }

    const normalizedError =
      error instanceof Error
        ? error
        : new Error("An unknown local model loading error occurred.");
    this.fatalLoadError = normalizedError;
    this.state.failedAssets = 1;
    this.state.mode = "error";
    this.setStatus("A volume could not be prepared");
    setText(
      this.dom.errorMessage,
      "A local 3D volume could not be prepared. Check the synchronized model and decoder files, then try again.",
    );
    if (this.diagnostics) {
      this.diagnostics.lastError = normalizedError.message;
    }
    this.projectMode();
  }

  private clearBookContent(): void {
    for (const visual of this.bookVisuals) {
      if (visual.content) {
        visual.canonical.remove(visual.content);
        disposeObjectTree(visual.content);
        visual.content = null;
      }
      visual.assetKind = "pending";
    }
  }

  private projectSelectedBook(): void {
    const book = shelfBooks[this.state.selectedIndex];
    const position = formatPosition(this.state.selectedIndex);
    const total = formatPosition(shelfBooks.length - 1);
    setText(this.dom.captionTitle, book.shortTitle);
    setText(this.dom.captionAuthor, book.author);
    setText(this.dom.captionPosition, position);
    setText(this.dom.detailsTitle, book.title);
    setText(this.dom.detailsAuthor, book.author);
    setText(this.dom.detailsDescription, book.description);
    setText(this.dom.detailsQuote, book.quote);
    setText(this.dom.detailsQuoteBy, book.quoteBy);
    setText(this.dom.detailsFormat, book.format);
    setText(this.dom.detailsYear, book.year);
    setText(this.dom.detailsPosition, `${position} / ${total}`);
    this.root.dataset.selectedIndex = String(this.state.selectedIndex);
  }

  private projectMode(): void {
    const enteringInspect =
      this.state.mode === "transitioning" &&
      this.transition?.kind === "inspect";
    const focused = this.state.mode === "inspecting" || enteringInspect;
    const loading = this.state.mode === "loading";
    const transitioning = this.state.mode === "transitioning";
    const error = this.state.mode === "error";
    const unsupported = this.state.mode === "unsupported";

    this.root.classList.toggle("is-loading", loading);
    this.root.classList.toggle("is-browsing", this.state.mode === "browsing");
    this.root.classList.toggle("is-transitioning", transitioning);
    this.root.classList.toggle("is-focused", focused);
    this.root.classList.toggle("has-error", error);
    this.root.classList.toggle("is-unsupported", unsupported);
    this.root.dataset.shelfMode = this.state.mode;
    this.root.setAttribute("aria-busy", String(loading));
    this.canvas.setAttribute("aria-busy", String(loading));
    this.canvas.setAttribute("aria-hidden", String(unsupported));
    this.dom.details?.setAttribute("aria-hidden", String(!focused));
    this.dom.loadingScreen?.setAttribute("aria-hidden", String(!loading));
    this.dom.errorScreen?.setAttribute("aria-hidden", String(!error));

    const canBrowse = this.state.mode === "browsing";
    if (this.dom.previous) {
      this.dom.previous.disabled =
        !canBrowse || this.state.selectedIndex === 0;
    }
    if (this.dom.next) {
      this.dom.next.disabled =
        !canBrowse || this.state.selectedIndex === shelfBooks.length - 1;
    }
    if (this.dom.inspect) {
      this.dom.inspect.disabled = !canBrowse;
    }
    if (this.dom.back) {
      this.dom.back.disabled = this.state.mode !== "inspecting";
    }
    if (this.dom.reset) {
      this.dom.reset.disabled = this.state.mode !== "inspecting";
    }

    for (const marker of this.dom.markers) {
      const markerIndex = Number(marker.dataset.markerIndex);
      marker.disabled = !canBrowse;
      if (markerIndex === this.state.selectedIndex) {
        marker.setAttribute("aria-current", "true");
      } else {
        marker.removeAttribute("aria-current");
      }
    }
    this.updateDiagnostics();
  }

  private projectLoading(): void {
    const percent = Math.round(this.state.loadingProgress * 100);
    setText(this.dom.loadingProgress, `${percent}%`);
    this.root.style.setProperty("--shelf-loading-progress", `${percent}%`);
    if (this.dom.loadingProgress) {
      this.dom.loadingProgress.setAttribute("aria-valuemin", "0");
      this.dom.loadingProgress.setAttribute("aria-valuemax", "100");
      this.dom.loadingProgress.setAttribute("aria-valuenow", String(percent));
    }
  }

  private setUnsupported(): void {
    this.state.mode = "unsupported";
    this.state.cameraOwner = "browse";
    this.setStatus("WebGL 2 is unavailable");
    this.projectMode();
    this.announce(
      "The 3D shelf is unavailable in this browser. The complete book catalog remains available below.",
    );
  }

  private setStatus(message: string): void {
    setText(this.dom.status, message);
  }

  private announceSelection(): void {
    const book = shelfBooks[this.state.selectedIndex];
    this.announce(
      `Volume ${this.state.selectedIndex + 1} of ${shelfBooks.length}: ${book.title}, by ${book.author}.`,
    );
  }

  private announce(message: string): void {
    setText(this.dom.live, message);
  }

  private initializeDiagnostics(): void {
    if (!import.meta.env.DEV || !this.renderer) {
      return;
    }
    this.diagnostics = {
      app: "complete-shelf",
      mode: this.state.mode,
      selectedIndex: this.state.selectedIndex,
      loadedAssets: this.state.loadedAssets,
      failedAssets: this.state.failedAssets,
      developmentPlaceholders: 0,
      cameraOwner: this.state.cameraOwner,
      calls: 0,
      triangles: 0,
      geometries: 0,
      textures: 0,
      dprCap: this.dprCap,
      shadowLights: 1,
      shadowMapSize: this.shadowMapSize,
      postPasses: 0,
    };
    window.__THREE_APP_DIAGNOSTICS__ = this.diagnostics;
  }

  private updateDiagnostics(): void {
    if (!this.diagnostics || !this.renderer) {
      return;
    }
    this.diagnostics.mode = this.state.mode;
    this.diagnostics.selectedIndex = this.state.selectedIndex;
    this.diagnostics.loadedAssets = this.state.loadedAssets;
    this.diagnostics.failedAssets = this.state.failedAssets;
    let developmentPlaceholders = 0;
    for (const visual of this.bookVisuals) {
      if (visual.assetKind === "development-placeholder") {
        developmentPlaceholders += 1;
      }
    }
    this.diagnostics.developmentPlaceholders = developmentPlaceholders;
    this.diagnostics.cameraOwner = this.state.cameraOwner;
    this.diagnostics.calls = this.renderer.info.render.calls;
    this.diagnostics.triangles = this.renderer.info.render.triangles;
    this.diagnostics.geometries = this.renderer.info.memory.geometries;
    this.diagnostics.textures = this.renderer.info.memory.textures;
    this.diagnostics.dprCap = this.dprCap;
    this.diagnostics.shadowMapSize = this.shadowMapSize;
  }
}

/**
 * Mounts the complete state-driven Three.js shelf and returns its permanent
 * teardown. The Promise resolves immediately after ownership is established;
 * asset loading continues under that owner's visible progress/error states.
 */
export async function mountShelfExperience(
  root: HTMLElement,
): Promise<() => void> {
  activeMounts.get(root)?.();

  const owner = new ShelfExperienceOwner(root);
  let cleaned = false;
  const cleanup = (): void => {
    if (cleaned) {
      return;
    }
    cleaned = true;
    owner.dispose();
    if (activeMounts.get(root) === cleanup) {
      activeMounts.delete(root);
    }
  };

  try {
    owner.start();
  } catch (error) {
    cleanup();
    throw error;
  }

  activeMounts.set(root, cleanup);
  return cleanup;
}
