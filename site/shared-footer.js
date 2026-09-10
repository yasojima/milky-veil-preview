import { sharedBrandLogo, sharedFooterRouteIds, sharedRouteRegistry } from "./shared-site-data.js?v=20260906-02&pages=20260910-102";

export const sharedFooterRoutes = Object.freeze(sharedFooterRouteIds.map((routeId) => sharedRouteRegistry[routeId]));

const normalizePath = (path) => {
  if (!path || path === "/") return "/";
  return `/${String(path).replace(/^\/+|\/+$/g, "")}/`;
};

export function sharedFooterMarkup(currentPath = "/") {
  const activePath = normalizePath(currentPath);
  return `
    <footer class="site-footer">
      <div class="footer-shell">
        <nav class="footer-links" aria-label="フッターナビゲーション">
          ${sharedFooterRoutes.map(({ path, label }) => `<a href="${path}" data-link${path === activePath ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
        </nav>
        <div class="footer-signature" aria-label="MILKY VEIL">
          <img src="${sharedBrandLogo}" width="497" height="640" alt="MILKY VEIL">
        </div>
      </div>
    </footer>`;
}

export function sharedFooterClearanceMarkup() {
  return `<div class="fixed-cta-clearance" aria-hidden="true"></div>`;
}
