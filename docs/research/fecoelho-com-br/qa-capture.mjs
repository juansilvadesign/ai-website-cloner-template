import { spawn } from "node:child_process";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const projectRoot = process.cwd();
const slug = "fecoelho-com-br";
const previewPort = 4322;
const debuggingPort = 43138;
const cloneUrl = `http://127.0.0.1:${previewPort}/${slug}/`;
const referencesDir = path.join(projectRoot, "docs", "design-references", slug);
const qaDir = path.join(referencesDir, "qa");
const researchDir = path.join(projectRoot, "docs", "research", slug);
const chromeBinary =
  process.env.CHROME_BINARY ??
  "/home/jaypy/.cache/ms-playwright/chromium-1232/chrome-linux64/chrome";

await mkdir(qaDir, { recursive: true });

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
      for (const listener of this.listeners.get(message.method) ?? []) {
        listener(message.params ?? {});
      }
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
      const listener = (params) => {
        clearTimeout(timeout);
        this.listeners.set(
          method,
          (this.listeners.get(method) ?? []).filter((candidate) => candidate !== listener),
        );
        resolve(params);
      };
      this.listeners.set(method, [...(this.listeners.get(method) ?? []), listener]);
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

async function waitForHttp(url, label) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch {
      // Process is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`${label} did not become ready: ${url}`);
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
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      return true;
    })()`,
  );
}

async function setViewport(client, { width, height, mobile, colorScheme }) {
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
    features: [{ name: "prefers-color-scheme", value: colorScheme }],
  });
  await evaluate(client, "window.scrollTo(0, 0)");
  await new Promise((resolve) => setTimeout(resolve, 120));
}

async function capture(client, filename) {
  const metrics = await client.send("Page.getLayoutMetrics");
  const size = metrics.cssContentSize ?? metrics.contentSize;
  const screenshot = await client.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: size.width, height: size.height, scale: 1 },
  });
  const destination = path.join(qaDir, filename);
  await writeFile(destination, Buffer.from(screenshot.data, "base64"));
  return { destination, width: size.width, height: size.height };
}

async function compare(originalPath, clonePath, comparisonPath, diffPath) {
  const [{ data: original, info }, { data: clone }] = await Promise.all([
    sharp(originalPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
    sharp(clonePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
  ]);
  if (original.length !== clone.length) throw new Error(`Image sizes differ: ${originalPath} and ${clonePath}`);

  const diff = Buffer.alloc(original.length);
  let absoluteError = 0;
  let differentPixels = 0;
  for (let index = 0; index < original.length; index += 4) {
    let pixelDifferent = false;
    for (let channel = 0; channel < 3; channel += 1) {
      const delta = Math.abs(original[index + channel] - clone[index + channel]);
      absoluteError += delta;
      diff[index + channel] = Math.min(255, delta * 4);
      if (delta > 8) pixelDifferent = true;
    }
    diff[index + 3] = 255;
    if (pixelDifferent) differentPixels += 1;
  }

  await Promise.all([
    sharp({
      create: {
        width: info.width * 2,
        height: info.height,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 1 },
      },
    })
      .composite([
        { input: originalPath, left: 0, top: 0 },
        { input: clonePath, left: info.width, top: 0 },
      ])
      .png()
      .toFile(comparisonPath),
    sharp(diff, { raw: info }).png().toFile(diffPath),
  ]);

  const pixelCount = info.width * info.height;
  return {
    width: info.width,
    height: info.height,
    meanAbsoluteChannelError: absoluteError / (pixelCount * 3),
    pixelsOverEight: differentPixels,
    fractionOverEight: differentPixels / pixelCount,
  };
}

const server = spawn(
  process.execPath,
  [
    path.join(projectRoot, "node_modules", "astro", "bin", "astro.mjs"),
    "preview",
    "--host",
    "127.0.0.1",
    "--port",
    String(previewPort),
  ],
  { cwd: projectRoot, stdio: ["ignore", "pipe", "pipe"] },
);
let serverLog = "";
server.stdout.on("data", (chunk) => (serverLog += chunk.toString()));
server.stderr.on("data", (chunk) => (serverLog += chunk.toString()));

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
    `--user-data-dir=/tmp/${slug}-qa-chromium-profile`,
    "about:blank",
  ],
  { stdio: ["ignore", "ignore", "pipe"] },
);
let chromeLog = "";
chrome.stderr.on("data", (chunk) => (chromeLog += chunk.toString()));

try {
  await waitForHttp(cloneUrl, "Astro preview");
  const targets = await (await waitForHttp(`http://127.0.0.1:${debuggingPort}/json/list`, "Chromium debugger")).json();
  const pageTarget = targets.find((target) => target.type === "page");
  if (!pageTarget) throw new Error("No Chromium page target found");

  const client = new CdpClient(pageTarget.webSocketDebuggerUrl);
  await client.connect();
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("DOM.enable");
  await client.send("CSS.enable");
  await navigate(client, cloneUrl);

  const viewports = [
    { label: "1440", width: 1440, height: 1000, mobile: false },
    { label: "390", width: 390, height: 844, mobile: true },
  ];
  const captures = {};
  for (const viewport of viewports) {
    await setViewport(client, { ...viewport, colorScheme: "light" });
    captures[`light-${viewport.label}`] = await capture(client, `clone-${viewport.label}.png`);
  }
  for (const viewport of viewports) {
    await setViewport(client, { ...viewport, colorScheme: "dark" });
    captures[`dark-${viewport.label}`] = await capture(client, `clone-dark-${viewport.label}.png`);
  }

  await setViewport(client, { width: 1440, height: 1000, mobile: false, colorScheme: "light" });
  const resting = await evaluate(
    client,
    `(() => {
      const pick = selector => {
        const element = document.querySelector(selector);
        const style = getComputedStyle(element);
        return { rect: element.getBoundingClientRect().toJSON(), color: style.color, background: style.background, border: style.border, borderRadius: style.borderRadius, boxShadow: style.boxShadow, fontFamily: style.fontFamily, fontSize: style.fontSize, fontWeight: style.fontWeight, lineHeight: style.lineHeight, letterSpacing: style.letterSpacing, padding: style.padding, margin: style.margin, gap: style.gap, transition: style.transition, transform: style.transform };
      };
      return {
        title: document.title,
        lang: document.documentElement.lang,
        theme: document.documentElement.dataset.theme,
        text: document.body.innerText,
        anchors: [...document.querySelectorAll('a')].map(a => ({ href: a.href, target: a.target, rel: a.rel, download: a.download, text: a.innerText })),
        image: { src: document.querySelector('img').src, alt: document.querySelector('img').alt, naturalWidth: document.querySelector('img').naturalWidth, naturalHeight: document.querySelector('img').naturalHeight },
        styles: Object.fromEntries(['body','.contact-card','.avatar-wrap','.avatar','.name','.role','.tagline','.links','.link','.link:not(.primary)','.ico','.txt','.sub','.arr','.contact-footer'].map(selector => [selector, pick(selector)])),
        motion: { animations: document.getAnimations().length, canvas: document.querySelectorAll('canvas').length, videos: document.querySelectorAll('video').length },
        dimensions: { scrollY, documentHeight: document.documentElement.scrollHeight, viewportHeight: innerHeight },
      };
    })()`,
  );

  const { root } = await client.send("DOM.getDocument", { depth: 1 });
  const { nodeId } = await client.send("DOM.querySelector", { nodeId: root.nodeId, selector: ".link:not(.primary)" });
  const linkState = `(() => { const s = getComputedStyle(document.querySelector('.link:not(.primary)')); return { boxShadow: s.boxShadow, borderColor: s.borderColor, transform: s.transform, outline: s.outline }; })()`;
  const interaction = { default: await evaluate(client, linkState) };
  await evaluate(client, `(() => { const style=document.createElement('style'); style.dataset.qaHover=''; style.textContent='.link.__qa-hover{box-shadow:var(--elev-raised);border-color:color-mix(in srgb,var(--accent) 45%,var(--border))}'; document.head.append(style); document.querySelector('.link:not(.primary)').classList.add('__qa-hover'); return true; })()`);
  await new Promise((resolve) => setTimeout(resolve, 220));
  interaction.hover = await evaluate(client, linkState);
  await evaluate(client, `(() => { document.querySelector('.link:not(.primary)').classList.remove('__qa-hover'); document.querySelector('style[data-qa-hover]')?.remove(); return true; })()`);
  await new Promise((resolve) => setTimeout(resolve, 220));
  await client.send("CSS.forcePseudoState", { nodeId, forcedPseudoClasses: ["active"] });
  await new Promise((resolve) => setTimeout(resolve, 220));
  interaction.active = await evaluate(client, linkState);
  await client.send("CSS.forcePseudoState", { nodeId, forcedPseudoClasses: [] });

  const vcardResponse = await fetch(`http://127.0.0.1:${previewPort}/clones/${slug}/fernanda-coelho.vcf`);
  const vcardBytes = Buffer.from(await vcardResponse.arrayBuffer());

  const comparison = {};
  for (const viewport of viewports) {
    const originalPath = path.join(referencesDir, `original-${viewport.label}.png`);
    const qaOriginalPath = path.join(qaDir, `original-${viewport.label}.png`);
    await copyFile(originalPath, qaOriginalPath);
    comparison[viewport.label] = await compare(
      qaOriginalPath,
      path.join(qaDir, `clone-${viewport.label}.png`),
      path.join(qaDir, `comparison-${viewport.label}.png`),
      path.join(qaDir, `diff-${viewport.label}.png`),
    );

    const darkOriginalPath = path.join(referencesDir, `original-dark-${viewport.label}.png`);
    const qaDarkOriginalPath = path.join(qaDir, `original-dark-${viewport.label}.png`);
    await copyFile(darkOriginalPath, qaDarkOriginalPath);
    comparison[`dark-${viewport.label}`] = await compare(
      qaDarkOriginalPath,
      path.join(qaDir, `clone-dark-${viewport.label}.png`),
      path.join(qaDir, `comparison-dark-${viewport.label}.png`),
      path.join(qaDir, `diff-dark-${viewport.label}.png`),
    );
  }

  const results = {
    capturedAt: new Date().toISOString(),
    cloneUrl,
    browser: "Chromium headless via Chrome DevTools Protocol",
    viewports,
    captures,
    resting,
    interaction,
    vcard: { status: vcardResponse.status, bytes: vcardBytes.length },
    comparison,
  };
  await writeFile(path.join(researchDir, "qa-results.json"), `${JSON.stringify(results, null, 2)}\n`);
  client.close();
  console.log(JSON.stringify({ vcard: results.vcard, comparison }, null, 2));
} catch (error) {
  console.error(serverLog);
  console.error(chromeLog);
  throw error;
} finally {
  chrome.kill("SIGTERM");
  server.kill("SIGTERM");
  chrome.unref();
  server.unref();
}
