import { responsiveImageManifest } from "./responsive-image-manifest.js?v=20260909-008&pages=20260910-102";

export function resolveMedia(src) {
  return responsiveImageManifest[src] || { src, width: 0, height: 0, candidates: [] };
}

export function responsiveSrcset(src) {
  return resolveMedia(src).candidates.map(candidate => `${candidate.src} ${candidate.width}w`).join(", ");
}

export function responsiveImageAttributes(src, sizes = "100vw") {
  const media = resolveMedia(src);
  const candidates = responsiveSrcset(src);
  return `src="${media.src}"${candidates ? ` srcset="${candidates}" sizes="${sizes}"` : ""}`;
}
