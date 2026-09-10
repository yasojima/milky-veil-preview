import { sharedSalonData } from "./shared-site-data.js?v=20260906-02";

const namespace = "http://www.w3.org/2000/svg";
const clamp = value => Math.max(0, Math.min(1, value));
const expo = value => value === 0 || value === 1 ? value
  : value < .5 ? 2 ** (20 * value - 10) / 2 : (2 - 2 ** (-20 * value + 10)) / 2;

function element(name, attributes = {}) {
  const node = document.createElementNS(namespace, name);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
}

export async function mountConceptTextClip(stage, trigger) {
  if (!stage || !trigger) return;
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = new URL("./concept-text-clip.css?v=20260911-127", import.meta.url).href;
  const styleReady = new Promise((resolve, reject) => {
    stylesheet.onload = resolve;
    stylesheet.onerror = reject;
  });
  document.head.append(stylesheet);
  try {
    await styleReady;
    await document.fonts.load('100px "Milky Luna"');
  } catch { return; }
  if (!stage.isConnected) return;
  stage.classList.add("concept-text-clip");
  const svg = element("svg", { "aria-hidden": "true", focusable: "false" });
  const defs = element("defs");
  const clip = element("clipPath", { id: "concept-letter-clip", clipPathUnits: "userSpaceOnUse" });
  defs.append(clip);
  svg.append(defs);
  const image = element("image", {
    href: new URL("../assets/generated/concept-fv-floral-clip-v1.png", import.meta.url).href,
    "clip-path": "url(#concept-letter-clip)", preserveAspectRatio: "xMidYMid slice",
  });
  svg.append(image);
  stage.append(svg);
  const letters = [...sharedSalonData.name.toLowerCase()];
  const rows = Array.from({ length: 6 }, (_, rowIndex) => {
    const glyphs = letters.map(letter => {
      const glyph = element("text");
      glyph.textContent = letter === " " ? "\u00a0" : letter;
      clip.append(glyph);
      return glyph;
    });
    return { y: 0, glyphs, direction: rowIndex % 2 ? -1 : 1 };
  });
  let width = 0;
  let wordWidth = 0;
  let scale = 1;
  let offsets = [];
  let frame = 0;
  let start = null;
  let armed = true;
  let disposed = false;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const duration = 3800;
  const rowDelay = 160;
  const dock = document.getElementById("shared-bottom-ui-root")?.shadowRoot?.querySelector(".fixed-cta");
  function layout() {
    const reserve = `${innerWidth > 900 && dock ? dock.getBoundingClientRect().height : 0}px`;
    if (stage.style.getPropertyValue("--clip-dock") !== reserve) stage.style.setProperty("--clip-dock", reserve);
    width = stage.clientWidth;
    const height = stage.clientHeight;
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    image.setAttribute("width", width);
    image.setAttribute("height", height);
    let advance = 0;
    offsets = rows[0].glyphs.map(glyph => {
      const x = advance;
      advance += glyph.getComputedTextLength();
      return x;
    });
    const bounds = rows[0].glyphs.filter(glyph => glyph.textContent.trim()).map(glyph => glyph.getBBox());
    const top = Math.min(...bounds.map(box => box.y));
    const bottom = Math.max(...bounds.map(box => box.y + box.height));
    scale = Math.min(width * .9 / advance, height / (6 * (bottom - top) + 25));
    wordWidth = advance * scale;
    const inkHeight = (bottom - top) * scale;
    rows.forEach((row, index) => {
      const y = index * (height - inkHeight) / 5 - top * scale;
      row.y = y;
    });
  }
  function draw(time) {
    frame = 0;
    if (disposed || start === null || document.hidden) return;
    const elapsed = time - start;
    rows.forEach((row, rowIndex) => {
      const progress = clamp((elapsed - rowIndex * rowDelay) / duration);
      const travel = row.direction * (1 - 2 * progress) * ((width + wordWidth) / 2 + 40);
      row.glyphs.forEach((glyph, index) => {
        const order = row.direction === 1 ? index : letters.length - 1 - index;
        const entry = expo(clamp((progress - order * .03) / .25));
        glyph.setAttribute("transform", `translate(${(width - wordWidth) / 2 + travel} ${row.y}) scale(${scale}) translate(${offsets[index]} 0) rotate(${row.direction * -45 * (1 - entry)}) scale(${entry})`);
        glyph.setAttribute("opacity", entry);
      });
    });
    svg.style.opacity = elapsed >= duration + rowDelay * 5 ? "0" : "1";
    if (elapsed < duration + rowDelay * 5) frame = requestAnimationFrame(draw);
    else start = null;
  }
  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    start = null;
    svg.style.opacity = "0";
  }
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      armed = true;
      stop();
    } else if (armed && entry.boundingClientRect.bottom <= 0 && !reduced.matches) {
      armed = false;
      start = performance.now();
      frame = requestAnimationFrame(draw);
    }
  });
  const resize = new ResizeObserver(layout);
  layout();
  resize.observe(stage);
  if (dock) resize.observe(dock);
  observer.observe(trigger);
  reduced.addEventListener("change", stop);
  const onVisibility = () => { if (document.hidden) stop(); };
  document.addEventListener("visibilitychange", onVisibility);
  addEventListener("pagehide", event => {
    stop();
    if (event.persisted) return;
    disposed = true;
    observer.disconnect();
    resize.disconnect();
    reduced.removeEventListener("change", stop);
    document.removeEventListener("visibilitychange", onVisibility);
  });
}
