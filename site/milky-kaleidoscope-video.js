import { responsiveImageAttributes } from "./responsive-media.js?v=20260909-009&pages=20260909-046";
export const MILKY_KALEIDOSCOPE_VIDEO = Object.freeze({
  videoSrc: "/milky-veil-preview/assets/generated/web-video/kaleidoscope-hd.mp4",
  posterSrc: "/milky-veil-preview/assets/generated/concept-fv-kaleidoscope/kaleidoscope-white-poster.png",
});

export const MILKY_MENU_FIRST_VIEW_MEDIA = Object.freeze({
  videoSrc: "",
  posterSrc: "/milky-veil-preview/assets/references/service-story/service-fv-crystal-v1.png",
});

export function milkyKaleidoscopeVideoMarkup(media = MILKY_KALEIDOSCOPE_VIDEO) {
  const video = media.videoSrc
    ? `<video class="milky-kaleidoscope-video" src="${media.videoSrc}" muted loop playsinline preload="none" aria-hidden="true"></video>`
    : "";
  return `<div class="milky-kaleidoscope-media">
    <img class="milky-kaleidoscope-poster" ${responsiveImageAttributes(media.posterSrc)} alt="" decoding="async" />
    ${video}
  </div>`;
}

export function bindMilkyKaleidoscopeVideo(stage, { endElement } = {}) {
  if (!(stage instanceof HTMLElement)) return () => {};
  const video = stage.querySelector(".milky-kaleidoscope-video");
  if (!(video instanceof HTMLVideoElement)) return () => {};

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let frameId = 0;
  let disposed = false;

  video.muted = true;
  video.defaultMuted = true;

  const markReady = () => stage.classList.add("is-video-ready");
  const markError = () => stage.classList.add("is-video-fallback");
  const endPosition = () => endElement instanceof HTMLElement
    ? endElement.getBoundingClientRect().top + scrollY
    : Number.POSITIVE_INFINITY;

  const play = () => {
    if (reducedMotion.matches || disposed) return;
    const playback = video.play();
    playback?.catch(() => stage.classList.add("is-video-awaiting-gesture"));
  };

  const render = () => {
    frameId = 0;
    if (disposed) return;
    const ended = scrollY >= endPosition();
    stage.classList.toggle("is-end", ended);
    if (ended || scrollY <= 0 || reducedMotion.matches || document.hidden) {
      video.pause();
      return;
    }
    if (video.paused) play();
  };

  const requestRender = () => {
    if (frameId || disposed) return;
    frameId = requestAnimationFrame(render);
  };

  const retryPlayback = () => {
    stage.classList.remove("is-video-awaiting-gesture");
    requestRender();
  };

  video.addEventListener("loadeddata", markReady);
  video.addEventListener("canplay", markReady);
  video.addEventListener("error", markError);
  addEventListener("scroll", requestRender, { passive: true });
  addEventListener("resize", requestRender, { passive: true });
  addEventListener("pointerdown", retryPlayback, { passive: true });
  addEventListener("touchstart", retryPlayback, { passive: true });
  document.addEventListener("visibilitychange", requestRender);

  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) markReady();
  render();

  return () => {
    disposed = true;
    if (frameId) cancelAnimationFrame(frameId);
    video.pause();
    video.removeEventListener("loadeddata", markReady);
    video.removeEventListener("canplay", markReady);
    video.removeEventListener("error", markError);
    removeEventListener("scroll", requestRender);
    removeEventListener("resize", requestRender);
    removeEventListener("pointerdown", retryPlayback);
    removeEventListener("touchstart", retryPlayback);
    document.removeEventListener("visibilitychange", requestRender);
  };
}
