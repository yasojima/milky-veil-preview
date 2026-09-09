import { sharedBrandLogo, sharedFooterRouteIds, sharedRouteRegistry, sharedSalonData } from "./shared-site-data.js?v=20260906-02&pages=20260910-084";

export const sharedFooterSalon = sharedSalonData;
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
        <div class="footer-info">
          <p class="footer-kicker">COLOR YOUR OWN WAY.</p>
          <div class="footer-info-grid">
            <section>
              <h2>SALON</h2>
              <p>〒${sharedFooterSalon.postalCode}<br>${sharedFooterSalon.addressLines.join("<br>")}</p>
            </section>
            <section>
              <h2>OPEN</h2>
              <p>${sharedFooterSalon.hours.join("<br>")}</p>
            </section>
          </div>
        </div>
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
