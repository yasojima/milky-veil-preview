import { mountConceptTypography } from "../../concept-typography.js?v=20260912-162";
import { sharedSalonData } from "../../shared-site-data.js?v=20260906-02";
const stage = document.body.dataset.pageRouteId === "concept" ? document.querySelector(".concept-fv-background-stage") : null;
if (stage) stage.classList.remove("milky-kaleidoscope-stage", "js-home-concept-lt");
const VENDOR_RUNTIME_SRC = "/milky-veil-preview/site/vendor/uniplex/wp-content/themes/uniplex/js/script.js?ver=20260912-162";
const script = document.createElement("script");
script.id = "jquery-js";
script.src = VENDOR_RUNTIME_SRC;
script.addEventListener("load", () => {
  if (stage) mountConceptTypography(stage, sharedSalonData.name, window.milkyMotionRuntime);
}, { once: true });
document.body.append(script);
