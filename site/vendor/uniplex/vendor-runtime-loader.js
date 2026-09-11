import { brandConceptLogoMotion } from "../../concept-logo-motion.js?v=20260911-142";
import { sharedSalonData } from "../../shared-site-data.js?v=20260906-02";

if (document.body.dataset.pageRouteId === "concept") {
  const stage = document.querySelector(".concept-fv-background-stage");
  if (stage) {
    stage.classList.remove("milky-kaleidoscope-stage");
    stage.classList.add("js-home-concept-lt");
    const source = new URL("./wp-content/themes/uniplex/json/bg_logo01.json", import.meta.url);
    try {
      const response = await fetch(source);
      if (!response.ok) throw new Error(`Logo motion: ${response.status}`);
      const data = brandConceptLogoMotion(await response.json(), sharedSalonData.name);
      const surface = getComputedStyle(stage.closest(".home-concept")).backgroundColor.match(/[\d.]+/g).slice(0, 3).map(value => Number(value) / 255);
      const recolor = node => {
        if (!node || typeof node !== "object") return;
        // These filled and stroked paths conceal the glyphs using the original page background.
        if ((node.ty === "fl" || node.ty === "st") && node.c?.a === 0 && Math.abs(node.c.k[0] - 227 / 255) < .001 && Math.abs(node.c.k[1] - 233 / 255) < .001) {
          node.c.k = [...surface, 1];
        }
        Object.values(node).forEach(recolor);
      };
      recolor(data);
      const url = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: "application/json" }));
      stage.dataset.src = url;
      addEventListener("pagehide", event => { if (!event.persisted) URL.revokeObjectURL(url); });
    } catch (error) {
      stage.classList.remove("js-home-concept-lt");
      console.error("CONCEPT logo animation could not load", error);
    }
  }
}

const VENDOR_RUNTIME_SRC = "/milky-veil-preview/site/vendor/uniplex/wp-content/themes/uniplex/js/script.js?ver=1.0.4";
if (!document.getElementById("jquery-js")) {
  const script = document.createElement("script");
  script.id = "jquery-js";
  script.src = VENDOR_RUNTIME_SRC;
  document.body.append(script);
}
