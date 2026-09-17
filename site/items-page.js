import { mountSharedBottomUi } from "./shared-bottom-ui.js?v=20260917-376";
import { bindSharedFixedShell } from "./shared-fixed-shell.js?v=20260913-244";
import { mountSharedConceptMenu, bindSharedConceptMenu } from "./shared-concept-menu.js?v=20260913-244";
import { sharedRouteRegistry } from "./shared-site-data.js?v=20260913-251";

const menuHost = document.getElementById("shared-concept-menu-root");
const bottomHost = document.getElementById("shared-bottom-ui-root");
mountSharedConceptMenu(menuHost, sharedRouteRegistry.items.path);
bindSharedFixedShell(mountSharedBottomUi(bottomHost, sharedRouteRegistry.items.path));
bindSharedConceptMenu(document);

const storePhoto = document.querySelector(".items-store-photo");
const storeProducts = storePhoto?.querySelector(".items-store-products");
if (storeProducts) {
  let resolutionQuery;
  const updatePhotoScale = () => {
    const resolution = Math.max(1, window.devicePixelRatio || 1);
    const nativeHeight = Number(storeProducts.getAttribute("height"));
    storePhoto.style.setProperty("--items-store-quality-height", `${nativeHeight / resolution}px`);
    resolutionQuery?.removeEventListener("change", updatePhotoScale);
    resolutionQuery = window.matchMedia(`(resolution: ${resolution}dppx)`);
    resolutionQuery.addEventListener("change", updatePhotoScale, { once:true });
  };
  updatePhotoScale();
  window.addEventListener("resize", updatePhotoScale, { passive:true });
}
