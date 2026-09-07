import { conceptFirstViewImage, waitForConceptFirstViewImages } from "/milky-veil-preview/site/concept-first-view-images.js?v=20260907-01&pages=2026090803";
import { bindMilkyKaleidoscopeVideo, milkyKaleidoscopeVideoMarkup } from "/milky-veil-preview/site/milky-kaleidoscope-video.js?v=20260904-01&pages=2026090803";
import { bindSharedFixedShell } from "/milky-veil-preview/site/shared-fixed-shell.js?v=20260902-06&pages=2026090803";
import { mountSharedBottomUi } from "/milky-veil-preview/site/shared-bottom-ui.js?v=20260907-13&pages=2026090803";
import { mountSharedScrollCue } from "/milky-veil-preview/site/shared-scroll-cue.js?v=20260902-01&pages=2026090803";
import { bindSharedConceptMenu, mountSharedConceptMenu } from "/milky-veil-preview/site/shared-concept-menu.js?v=20260902-03&pages=2026090803";
import { sharedRouteRegistry } from "/milky-veil-preview/site/shared-site-data.js?v=20260906-02&pages=2026090803";

const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
const pageRouteId = pathname.endsWith("/service") ? "service" : (document.body.dataset.pageRouteId || "concept");
const currentPath = sharedRouteRegistry[pageRouteId]?.path || sharedRouteRegistry.concept.path;
const videoEnabled = pageRouteId === "concept" || pageRouteId === "service";

const pointVideo = document.querySelector(".home-point-ingredient__vi video");
if (pointVideo) {
  pointVideo.muted = true;
  pointVideo.defaultMuted = true;
  pointVideo.autoplay = true;
  pointVideo.loop = true;
  pointVideo.playsInline = true;
  pointVideo.preload = "auto";
  const resumePointVideo = () => {
    if (document.hidden || !pointVideo.paused) return;
    const bounds = pointVideo.getBoundingClientRect();
    if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
    pointVideo.play().catch(() => {});
  };
  const pointVideoObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) resumePointVideo();
  }, { threshold: 0.01 });
  pointVideoObserver.observe(pointVideo);
  pointVideo.addEventListener("loadeddata", resumePointVideo);
  pointVideo.addEventListener("canplay", resumePointVideo);
  window.addEventListener("pageshow", resumePointVideo);
  document.addEventListener("visibilitychange", resumePointVideo);
  document.addEventListener("pointerdown", resumePointVideo, { passive: true });
  document.addEventListener("scroll", resumePointVideo, { passive: true });
  resumePointVideo();
}

document.querySelectorAll("[data-concept-portrait]").forEach((slot) => {
  slot.innerHTML = conceptFirstViewImage(slot.dataset.conceptPortrait);
});

mountSharedConceptMenu(document.getElementById("shared-concept-menu-root"), currentPath);
bindSharedConceptMenu(document);

const sharedBottomScope = mountSharedBottomUi(document.getElementById("shared-bottom-ui-root"), currentPath);
const scrollCue = mountSharedScrollCue(document.querySelector(".l-main-img__inner"), {
  target: pageRouteId === "service" ? "#service-menu" : "#concept",
  ariaLabel: pageRouteId === "service" ? "サービス内容へ移動" : "コンセプトセクションへ移動",
});
const fvTrigger = document.querySelector(".js-home-mv-trigger");
const pointSection = document.querySelector("#point");
const serviceMenu = document.querySelector("#service-menu");
const kaleidoscopeStage = document.querySelector(".milky-kaleidoscope-stage");
if (videoEnabled && kaleidoscopeStage instanceof HTMLElement) kaleidoscopeStage.innerHTML = milkyKaleidoscopeVideoMarkup();
const disposeKaleidoscopeVideo = videoEnabled
  ? bindMilkyKaleidoscopeVideo(kaleidoscopeStage, { endElement: pageRouteId === "service" ? serviceMenu : pointSection })
  : () => {};

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

addEventListener("pagehide", () => {
  pageDisposed = true;
  disposeKaleidoscopeVideo();
}, { once: true });

if (scrollCue && fvTrigger) {
  new IntersectionObserver(([entry]) => {
    scrollCue.classList.toggle("is-hidden", !entry.isIntersecting);
  }).observe(fvTrigger);
}

bindSharedFixedShell(sharedBottomScope);
