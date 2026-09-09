import { bindAmbientMotion, observeActivity } from "/milky-veil-preview/site/shared-activity.js?v=20260909-009&pages=20260909-042";
import { firstViewImage, waitForConceptFirstViewImages } from "/milky-veil-preview/site/concept-first-view-images.js?v=20260908-02&pages=20260909-042";
import { bindSharedFixedShell } from "/milky-veil-preview/site/shared-fixed-shell.js?v=20260902-06&pages=20260909-042";
import { mountSharedBottomUi } from "/milky-veil-preview/site/shared-bottom-ui.js?v=20260908-01&pages=20260909-042";
import { mountSharedScrollCue } from "/milky-veil-preview/site/shared-scroll-cue.js?v=20260902-01&pages=20260909-042";
import { bindSharedConceptMenu, mountSharedConceptMenu } from "/milky-veil-preview/site/shared-concept-menu.js?v=20260902-03&pages=20260909-042";
import { sharedRouteRegistry } from "/milky-veil-preview/site/shared-site-data.js?v=20260906-02&pages=20260909-042";

const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
const pageRouteId = document.body.dataset.pageRouteId || (pathname.endsWith("/menu") || pathname.endsWith("/service") ? "menu" : "concept");
const currentPath = sharedRouteRegistry[pageRouteId]?.path || sharedRouteRegistry.concept.path;

const pointVideo = document.querySelector(".home-point-ingredient__vi video");
if (pointVideo) {
  pointVideo.muted = true;
  observeActivity(pointVideo, active => {
    if (!active) { pointVideo.pause(); return; }
    if (!pointVideo.getAttribute("src")) pointVideo.src = pointVideo.dataset.src;
    if (pointVideo.paused) pointVideo.play().catch(() => {});
  });
}
bindAmbientMotion(document);

document.querySelectorAll("[data-concept-portrait]").forEach((slot) => {
  slot.innerHTML = firstViewImage(slot.dataset.conceptPortrait, pageRouteId);
});

mountSharedConceptMenu(document.getElementById("shared-concept-menu-root"), currentPath);

const sharedBottomScope = mountSharedBottomUi(document.getElementById("shared-bottom-ui-root"), currentPath);
bindSharedConceptMenu(document);
const scrollCue = mountSharedScrollCue(document.querySelector(".l-main-img__inner"), {
  target: "#concept",
  ariaLabel: `${sharedRouteRegistry[pageRouteId]?.label || "ページ"}本文へ移動`,
});
const fvTrigger = document.querySelector(".js-home-mv-trigger");
const kaleidoscopeStage = document.querySelector(".milky-kaleidoscope-stage");

const hero = document.querySelector(".js-home-mv");
const heroImages = [...document.querySelectorAll(".js-home-mv-img")];
const heroContent = document.querySelector(".js-home-mv-content");
const revealHeroImages = () => heroImages.forEach((image) => image.classList.add("is-animated"));
const revealHeroContent = () => {
  heroContent?.classList.remove("is-hidden");
  hero?.classList.remove("is-intro-pending");
};
let pageDisposed = false;
const beginHeroIntro = async () => {
  const portraitsReady = await waitForConceptFirstViewImages(document);
  if (pageDisposed) return;
  if (!portraitsReady) return;
  hero?.classList.add("is-fv-media-ready");
  revealHeroImages();
  revealHeroContent();
  kaleidoscopeStage?.classList.add("is-fv-background-ready");
  hero?.classList.remove("is-fv-media-pending");
};
void beginHeroIntro();

addEventListener("pagehide", (event) => {
  if (event.persisted) return;
  pageDisposed = true;
});

if (scrollCue && fvTrigger) {
  new IntersectionObserver(([entry]) => {
    scrollCue.classList.toggle("is-hidden", !entry.isIntersecting);
  }).observe(fvTrigger);
}

bindSharedFixedShell(sharedBottomScope);
