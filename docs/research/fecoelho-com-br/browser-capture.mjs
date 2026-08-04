import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const sourceUrl = "https://fecoelho.com.br/card/";
const slug = "fecoelho-com-br";
const outputDir = path.join(projectRoot, "docs", "design-references", slug);
const researchDir = path.join(projectRoot, "docs", "research", slug);
const chromeBinary =
  process.env.CHROME_BINARY ??
  "/home/jaypy/.cache/ms-playwright/chromium-1232/chrome-linux64/chrome";
const debuggingPort = 43137;
const profileDir = `/tmp/${slug}-chromium-profile`;

await mkdir(outputDir, { recursive: true });
await mkdir(researchDir, { recursive: true });

class CdpClient {
  constructor(url) {
    this.url = url;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
  }

  async connect() {
    this.socket = new WebSocket(this.url);
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const deferred = this.pending.get(message.id);
        if (!deferred) return;
        this.pending.delete(message.id);
        if (message.error) deferred.reject(new Error(JSON.stringify(message.error)));
        else deferred.resolve(message.result ?? {});
        return;
      }

      const listeners = this.listeners.get(message.method) ?? [];
      for (const listener of listeners) listener(message.params ?? {});
    });

    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("CDP WebSocket timed out")), 10_000);
      this.socket.addEventListener("open", () => {
        clearTimeout(timeout);
        resolve();
      });
      this.socket.addEventListener("error", reject, { once: true });
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  waitFor(method, timeoutMs = 20_000) {
    return new Promise((resolve, reject) => {
      const listeners = this.listeners.get(method) ?? [];
      const listener = (params) => {
        clearTimeout(timeout);
        this.listeners.set(
          method,
          (this.listeners.get(method) ?? []).filter((candidate) => candidate !== listener),
        );
        resolve(params);
      };
      listeners.push(listener);
      this.listeners.set(method, listeners);
      const timeout = setTimeout(() => {
        this.listeners.set(
          method,
          (this.listeners.get(method) ?? []).filter((candidate) => candidate !== listener),
        );
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeoutMs);
    });
  }

  close() {
    this.socket.close();
  }
}

async function waitForDebugger() {
  const endpoint = `http://127.0.0.1:${debuggingPort}/json/list`;
  const deadline = Date.now() + 20_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) return response.json();
    } catch {
      // Chromium is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error("Chromium remote debugging endpoint did not start");
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description ?? "Runtime evaluation failed");
  }
  return result.result?.value;
}

async function navigate(client, url) {
  const loaded = client.waitFor("Page.loadEventFired");
  await client.send("Page.navigate", { url });
  await loaded;
  await evaluate(
    client,
    `(async () => {
      await document.fonts.ready;
      await new Promise(resolve => setTimeout(resolve, 900));
      return true;
    })()`,
  );
}

async function setViewport(client, { width, height, mobile = false, colorScheme = "light" }) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
    screenWidth: width,
    screenHeight: height,
  });
  await client.send(
    "Emulation.setTouchEmulationEnabled",
    mobile ? { enabled: true, maxTouchPoints: 5 } : { enabled: false },
  );
  await client.send("Emulation.setEmulatedMedia", {
    media: "screen",
    features: [
      { name: "prefers-color-scheme", value: colorScheme },
      { name: "hover", value: mobile ? "none" : "hover" },
      { name: "any-hover", value: mobile ? "none" : "hover" },
      { name: "pointer", value: mobile ? "coarse" : "fine" },
      { name: "any-pointer", value: mobile ? "coarse" : "fine" },
    ],
  });
  await evaluate(client, "window.scrollTo(0, 0)");
  await new Promise((resolve) => setTimeout(resolve, 250));
}

async function captureFullPage(client, filename) {
  const metrics = await client.send("Page.getLayoutMetrics");
  const size = metrics.cssContentSize ?? metrics.contentSize;
  const result = await client.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: true,
    clip: {
      x: 0,
      y: 0,
      width: size.width,
      height: size.height,
      scale: 1,
    },
  });
  await writeFile(path.join(outputDir, filename), Buffer.from(result.data, "base64"));
  return { width: size.width, height: size.height, deviceScaleFactor: 1 };
}

const styleTreeExpression = String.raw`(() => {
  const props = [
    'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
    'textTransform','textDecoration','backgroundColor','background','backgroundImage',
    'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
    'margin','marginTop','marginRight','marginBottom','marginLeft',
    'width','height','maxWidth','minWidth','maxHeight','minHeight',
    'display','flexDirection','justifyContent','alignItems','gap',
    'gridTemplateColumns','gridTemplateRows','placeItems',
    'borderRadius','border','borderTop','borderBottom','borderLeft','borderRight',
    'boxShadow','overflow','overflowX','overflowY',
    'position','top','right','bottom','left','zIndex',
    'opacity','transform','transition','cursor',
    'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
    'whiteSpace','textOverflow','WebkitLineClamp'
  ];
  function styles(element) {
    const computed = getComputedStyle(element);
    return Object.fromEntries(props.map(prop => [prop, computed[prop]]));
  }
  function walk(element, depth = 0) {
    const children = [...element.children];
    return {
      tag: element.tagName.toLowerCase(),
      classes: element.className?.toString() ?? '',
      text: [...element.childNodes]
        .filter(node => node.nodeType === Node.TEXT_NODE)
        .map(node => node.textContent.trim())
        .filter(Boolean)
        .join(' '),
      rect: element.getBoundingClientRect().toJSON(),
      styles: styles(element),
      image: element instanceof HTMLImageElement ? {
        src: element.currentSrc || element.src,
        alt: element.alt,
        naturalWidth: element.naturalWidth,
        naturalHeight: element.naturalHeight,
      } : null,
      children: depth < 5 ? children.map(child => walk(child, depth + 1)) : [],
    };
  }
  return walk(document.querySelector('.card'));
})()`;

const globalExtractionExpression = String.raw`(() => {
  const root = getComputedStyle(document.documentElement);
  const selectors = ['body', '.card', '.avatar-wrap', '.avatar', '.name', '.role', '.tagline', '.links', '.link', '.link.primary', '.ico', '.txt', '.sub', '.arr', '.foot'];
  const pickedProperties = [
    'display','alignItems','justifyContent','flexDirection','gap','width','height','maxWidth','minHeight',
    'padding','margin','fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color',
    'background','backgroundColor','border','borderColor','borderRadius','boxShadow','transition',
    'transform','objectFit','objectPosition','textAlign','flex','placeItems'
  ];
  const computed = Object.fromEntries(selectors.map(selector => {
    const element = document.querySelector(selector);
    if (!element) return [selector, null];
    const styles = getComputedStyle(element);
    return [selector, Object.fromEntries(pickedProperties.map(property => [property, styles[property]]))];
  }));
  return {
    sourceUrl: location.href,
    capturedAt: new Date().toISOString(),
    title: document.title,
    lang: document.documentElement.lang,
    meta: [...document.querySelectorAll('meta')].map(meta => ({
      name: meta.name || meta.getAttribute('property'),
      content: meta.content,
    })),
    links: [...document.querySelectorAll('link')].map(link => ({ rel: link.rel, href: link.href, sizes: link.sizes?.value ?? '' })),
    anchors: [...document.querySelectorAll('a')].map(anchor => ({
      text: anchor.innerText,
      href: anchor.href,
      target: anchor.target,
      rel: anchor.rel,
      download: anchor.download,
      ariaLabel: anchor.getAttribute('aria-label'),
    })),
    images: [...document.images].map(image => ({
      src: image.currentSrc || image.src,
      alt: image.alt,
      width: image.naturalWidth,
      height: image.naturalHeight,
      position: getComputedStyle(image).position,
      zIndex: getComputedStyle(image).zIndex,
      siblingImages: image.parentElement?.querySelectorAll('img').length ?? 0,
    })),
    videos: [...document.querySelectorAll('video')].map(video => ({
      src: video.currentSrc || video.src || video.querySelector('source')?.src,
      poster: video.poster,
      autoplay: video.autoplay,
      loop: video.loop,
      muted: video.muted,
    })),
    backgrounds: [...document.querySelectorAll('*')]
      .map(element => ({ element: element.tagName.toLowerCase() + (element.className ? '.' + String(element.className).replaceAll(' ', '.') : ''), backgroundImage: getComputedStyle(element).backgroundImage }))
      .filter(item => item.backgroundImage !== 'none'),
    inlineSvgCount: document.querySelectorAll('svg').length,
    scripts: [...document.scripts].map(script => script.src || 'inline'),
    motionSignals: {
      canvas: document.querySelectorAll('canvas').length,
      lottie: document.querySelectorAll('.lottie, [data-lottie]').length,
      lenis: document.documentElement.classList.contains('lenis') || Boolean(document.querySelector('.lenis')),
      locomotive: Boolean(document.querySelector('.locomotive-scroll, [data-scroll-container]')),
      framer: Boolean(document.querySelector('[data-framer-name], [data-framer-component-type]')),
      animationCount: document.getAnimations().length,
    },
    media: {
      colorSchemeDark: matchMedia('(prefers-color-scheme: dark)').matches,
      hover: matchMedia('(hover: hover)').matches,
      pointerFine: matchMedia('(pointer: fine)').matches,
      reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    },
    customProperties: Object.fromEntries([
      '--bg','--bg-elev','--bg-soft','--ink','--ink-soft','--ink-mute','--line','--accent','--accent-2','--accent-ink','--shadow','--shadow-sm','--radius','--font-sans','--font-display'
    ].map(name => [name, root.getPropertyValue(name).trim()])),
    computed,
    bodyText: document.body.innerText,
    html: document.documentElement.outerHTML,
  };
})()`;

const chrome = spawn(
  chromeBinary,
  [
    "--headless=new",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--disable-background-networking",
    "--no-first-run",
    "--no-default-browser-check",
    "--no-sandbox",
    "--hide-scrollbars",
    "--force-color-profile=srgb",
    `--remote-debugging-port=${debuggingPort}`,
    `--user-data-dir=${profileDir}`,
    "about:blank",
  ],
  { stdio: ["ignore", "ignore", "pipe"] },
);

let chromeErrors = "";
chrome.stderr.on("data", (chunk) => {
  chromeErrors += chunk.toString();
});

try {
  const targets = await waitForDebugger();
  const pageTarget = targets.find((target) => target.type === "page");
  if (!pageTarget) throw new Error("No page target was available");

  const client = new CdpClient(pageTarget.webSocketDebuggerUrl);
  await client.connect();
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Network.enable");
  await client.send("DOM.enable");
  await client.send("CSS.enable");
  await navigate(client, sourceUrl);

  const captures = {};
  const viewports = [
    { label: "1440", width: 1440, height: 1000, mobile: false },
    { label: "768", width: 768, height: 1024, mobile: false },
    { label: "390", width: 390, height: 844, mobile: true },
  ];

  const states = {};
  for (const viewport of viewports) {
    await setViewport(client, { ...viewport, colorScheme: "light" });
    captures[`light-${viewport.label}`] = await captureFullPage(client, `original-${viewport.label}.png`);
    states[`light-${viewport.label}`] = {
      global: await evaluate(client, globalExtractionExpression),
      cardTree: await evaluate(client, styleTreeExpression),
    };
  }

  await setViewport(client, { width: 1440, height: 1000, mobile: false, colorScheme: "dark" });
  captures["dark-1440"] = await captureFullPage(client, "original-dark-1440.png");
  states["dark-1440"] = {
    global: await evaluate(client, globalExtractionExpression),
    cardTree: await evaluate(client, styleTreeExpression),
  };

  await setViewport(client, { width: 390, height: 844, mobile: true, colorScheme: "dark" });
  captures["dark-390"] = await captureFullPage(client, "original-dark-390.png");
  states["dark-390"] = {
    global: await evaluate(client, globalExtractionExpression),
    cardTree: await evaluate(client, styleTreeExpression),
  };

  await setViewport(client, { width: 1440, height: 1000, mobile: false, colorScheme: "light" });
  const linkStyleExpression = `(() => {
    const element = document.querySelector('.link:not(.primary)');
    const style = getComputedStyle(element);
    return { boxShadow: style.boxShadow, borderColor: style.borderColor, transform: style.transform, transition: style.transition, outline: style.outline };
  })()`;
  const { root } = await client.send("DOM.getDocument", { depth: 1 });
  const { nodeId: linkNodeId } = await client.send("DOM.querySelector", {
    nodeId: root.nodeId,
    selector: ".link:not(.primary)",
  });
  const interaction = {
    beforeHover: await evaluate(client, linkStyleExpression),
    hoverInspection:
      "Headless Chromium reports (hover: none), so the authored @media (hover: hover) declaration was promoted to an equivalent temporary class and resolved through getComputedStyle().",
  };
  await evaluate(
    client,
    `(() => {
      const style = document.createElement('style');
      style.dataset.captureHover = 'true';
      style.textContent = '.link.__capture-hover { box-shadow: var(--shadow); border-color: color-mix(in srgb, var(--accent) 45%, var(--line)); }';
      document.head.append(style);
      document.querySelector('.link:not(.primary)').classList.add('__capture-hover');
      return true;
    })()`,
  );
  await new Promise((resolve) => setTimeout(resolve, 220));
  interaction.afterHover = await evaluate(client, linkStyleExpression);
  await evaluate(
    client,
    `(() => {
      document.querySelector('.link:not(.primary)').classList.remove('__capture-hover');
      document.querySelector('style[data-capture-hover]')?.remove();
      return true;
    })()`,
  );
  await new Promise((resolve) => setTimeout(resolve, 220));
  await client.send("CSS.forcePseudoState", { nodeId: linkNodeId, forcedPseudoClasses: ["active"] });
  await new Promise((resolve) => setTimeout(resolve, 220));
  interaction.active = await evaluate(client, linkStyleExpression);
  await client.send("CSS.forcePseudoState", { nodeId: linkNodeId, forcedPseudoClasses: [] });
  await new Promise((resolve) => setTimeout(resolve, 220));
  await client.send("CSS.forcePseudoState", { nodeId: linkNodeId, forcedPseudoClasses: ["focus-visible"] });
  await new Promise((resolve) => setTimeout(resolve, 80));
  interaction.focusVisible = await evaluate(client, linkStyleExpression);
  await client.send("CSS.forcePseudoState", { nodeId: linkNodeId, forcedPseudoClasses: [] });
  await navigate(client, sourceUrl);
  await setViewport(client, { width: 1440, height: 1000, mobile: false, colorScheme: "light" });
  interaction.scroll = {
    startY: await evaluate(client, "scrollY"),
    documentHeight: await evaluate(client, "document.documentElement.scrollHeight"),
    viewportHeight: await evaluate(client, "innerHeight"),
  };
  await evaluate(client, "window.scrollTo(0, document.documentElement.scrollHeight)");
  await new Promise((resolve) => setTimeout(resolve, 350));
  interaction.scroll.endY = await evaluate(client, "scrollY");
  interaction.scroll.animationCount = await evaluate(client, "document.getAnimations().length");

  const evidence = {
    sourceUrl,
    slug,
    browser: "Chromium headless via Chrome DevTools Protocol",
    chromiumBinary: chromeBinary,
    capturedAt: new Date().toISOString(),
    captures,
    interaction,
    states,
  };
  await writeFile(path.join(researchDir, "browser-evidence.json"), `${JSON.stringify(evidence, null, 2)}\n`);
  client.close();
  console.log(JSON.stringify({ captures, interaction }, null, 2));
} catch (error) {
  console.error(chromeErrors);
  throw error;
} finally {
  chrome.kill("SIGTERM");
}
