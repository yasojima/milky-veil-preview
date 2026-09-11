import { sharedSalonData } from "./shared-site-data.js";
import { applyCustomEffect_7 } from "./vendor/text-clip/js/effect.js?v=20260911-131";

function loadScript(path) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = new URL(path, import.meta.url).href;
    script.onload = resolve;
    script.onerror = reject;
    document.head.append(script);
  });
}

export async function mountConceptTextClip(stage) {
  if (!stage) return;
  let disposed = false;
  let context;
  addEventListener("pagehide", event => {
    if (event.persisted) return;
    disposed = true;
    context?.revert();
  });
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = new URL("./concept-text-clip.css?v=20260911-131", import.meta.url).href;
  const ready = new Promise((resolve, reject) => {
    stylesheet.onload = resolve;
    stylesheet.onerror = reject;
  });
  document.head.append(stylesheet);
  try {
    await ready;
    await loadScript("./vendor/text-clip/js/gsap.min.js");
    await loadScript("./vendor/text-clip/js/ScrollTrigger.min.js");
    await document.fonts.load('100px "h19a_lunaluna"');
    const image = new Image();
    image.src = new URL("./vendor/text-clip/img/2.jpg", import.meta.url).href;
    await image.decode();
    if (disposed || !stage.isConnected) return;
    stage.classList.add("concept-text-clip");
    stage.closest(".home-concept")?.classList.add("has-text-clip");
    const content = document.createElement("div");
    content.className = "content";
    const letters = [...sharedSalonData.name.toLowerCase()].map((letter, index) => `<text x="${index}ch" y="50%" dominant-baseline="middle" text-anchor="start" class="font-6 size-3">${letter}</text>`).join("");
    content.innerHTML = `<svg><clipPath id="concept-original-clip">${letters}</clipPath></svg><div class="poster" style="clip-path:url(#concept-original-clip)"><div class="poster__inner"></div></div>`;
    content.querySelector(".poster__inner").style.backgroundImage = `url("${image.src}")`;
    stage.replaceChildren(content);
    const layoutLetters = () => {
      const texts = [...content.querySelectorAll("text")];
      window.gsap.set(texts, { clearProps: "transform" });
      const boxes = texts.map(text => {
        text.style.fontSize = "100px";
        text.setAttribute("x", "0");
        return text.getBBox();
      });
      let cursor = 0;
      const positions = boxes.map((box, index) => {
        if (!texts[index].textContent.trim()) {
          cursor += 12;
          return cursor;
        }
        const position = cursor - box.x;
        cursor += box.width + 1.5;
        return position;
      });
      const width = cursor - 1.5;
      const scale = stage.clientWidth * 0.92 / width;
      const left = stage.clientWidth * 0.04;
      texts.forEach((text, index) => {
        text.style.fontSize = `${100 * scale}px`;
        text.setAttribute("x", String(left + positions[index] * scale));
      });
    };
    layoutLetters();
    context = window.gsap.context(() => {
      applyCustomEffect_7(content, layoutLetters);
    }, stage);
    window.ScrollTrigger.refresh();
  } catch (error) {
    console.error("CONCEPT text animation could not load", error);
  }
}
