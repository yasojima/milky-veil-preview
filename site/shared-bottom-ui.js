import { bindClosingLogo, clearClosingLogo } from "./shared-closing.js?v=20260912-172";
import { bindBottomFit, clearBottomFit } from "./shared-bottom-fit.js?v=20260912-174";
import { bindAmbientMotion } from "./shared-activity.js?v=20260909-009&pages=20260911-123";
import { sharedClosingLogoMarkup, sharedFooterClearanceMarkup, sharedFooterMarkup } from "./shared-footer.js?v=20260912-170&pages=20260911-123";
import { sharedFixedCtaMarkup } from "./shared-fixed-shell.js?v=20260912-174&pages=20260911-123";
import { sharedBrandMessageMarkup } from "./shared-brand-message.js?v=20260906-02&pages=20260911-123";
import { sharedFooterTickerMarkup, sharedFooterTickerRuleMarkup } from "./shared-footer-ticker.js?v=20260907-01&pages=20260911-123";

const activityCleanup = new WeakMap();
const styleReadiness = new WeakMap();

export function sharedBottomUiReady(host) {
  return styleReadiness.get(host) || Promise.resolve();
}

const SHARED_BOTTOM_STYLES = Object.freeze([
  "/milky-veil-preview/site/shared-activity.css?v=20260909-009&pages=20260911-123",
  "/milky-veil-preview/site/shared-fonts.css?v=20260906-01&pages=20260911-123",
  "/milky-veil-preview/site/shared-font-subset.css",
  "/milky-veil-preview/site/shared-brand-message.css?v=20260906-03&pages=20260911-123",
  "/milky-veil-preview/site/shared-footer-ticker.css?v=20260908-01&pages=20260911-123",
  "/milky-veil-preview/site/shared-footer.css?v=20260912-170&pages=20260911-123",
  "/milky-veil-preview/site/shared-fixed-shell.css?v=20260912-173&pages=20260911-123",
  "/milky-veil-preview/site/shared-closing.css?v=20260912-174",
  "/milky-veil-preview/site/shared-logo-motion.css?v=20260912-174",
]);

function mountViewportHud() {
  if (document.getElementById("viewport-hud")) return;
  const hud = document.createElement("div");
  hud.id = "viewport-hud";
  const shadow = hud.attachShadow({ mode: "open" });
  shadow.innerHTML = `<style>
    :host { all:initial; position:fixed; right:0; bottom:0; z-index:2147483647; pointer-events:none; display:block; }
    output { display:block; padding:4px 7px; border-radius:3px 0 0; background:rgba(0,0,0,.85); color:#fff; font:600 10px/1.4 Arial,sans-serif; white-space:nowrap; }
  </style><output aria-label="Viewport size"></output>`;
  document.body.append(hud);
  const output = shadow.querySelector("output");
  const update = () => {
    const width = Math.round(window.innerWidth);
    const height = Math.round(window.innerHeight);
    const breakpoint = width <= 900 ? "MOBILE" : width <= 1300 ? "TABLET" : "DESKTOP";
    output.textContent = `${width} × ${height} px · ${breakpoint}`;
  };
  update();
  window.addEventListener("resize", update, { passive: true });
  window.visualViewport?.addEventListener("resize", update, { passive: true });
}

export function mountSharedBottomUi(host, currentPath) {
  mountViewportHud();
  if (!(host instanceof HTMLElement)) return null;
  const root = host.shadowRoot || host.attachShadow({ mode: "open" });
  if (!root.querySelector("[data-shared-bottom-ui-component]")) {
    root.innerHTML = `
      <style>
        :host {
          all: initial !important;
          -webkit-tap-highlight-color: transparent;
          display: block !important;
          position: relative !important;
          z-index: 3 !important;
          overflow-x: clip !important;
          width: auto !important;
          margin: 0 !important;
          padding: 0 !important;
          border: 0 !important;
          color-scheme: light;
          direction: ltr;
          font-size: 16px;
          font-weight: 400;
          line-height: normal;
          letter-spacing: normal;
          text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          zoom: 1;
        }
        [data-shared-bottom-ui-component][data-css-pending] { opacity: 0 !important; pointer-events: none !important; }
        [data-shared-bottom-ui-component] {
          display: block;
          box-sizing: border-box;
          width: 100%;
          margin: 0;
          padding-block-start: var(--shared-bottom-boundary-offset, 0px);
          background: var(--milky-home-paper, #fff);
        }
      </style>
      ${SHARED_BOTTOM_STYLES.map((href) => `<link rel="stylesheet" href="${href}">`).join("")}
      <div data-shared-bottom-ui-component data-css-pending>
        ${sharedClosingLogoMarkup()}
        ${sharedBrandMessageMarkup()}
        ${sharedFooterTickerMarkup()}
        ${sharedFooterTickerRuleMarkup()}
        ${sharedFooterClearanceMarkup()}
        ${sharedFooterMarkup(currentPath)}
        ${sharedFixedCtaMarkup()}
      </div>
    `;
    const component = root.querySelector("[data-shared-bottom-ui-component]");
    const ready = Promise.all([...root.querySelectorAll('link[rel="stylesheet"]')].map(link => {
      if (link.sheet) return true;
      return new Promise(resolve => {
        link.addEventListener("load", () => resolve(true), { once: true });
        link.addEventListener("error", () => resolve(false), { once: true });
      });
    })).then(results => {
      if (results.every(Boolean)) {
        bindBottomFit(root);
        bindClosingLogo(root);
        component.removeAttribute("data-css-pending");
      }
    });
    styleReadiness.set(host, ready);
  }
  const activePath = currentPath === "/" ? "/" : `/${String(currentPath).replace(/^\/+|\/+$/g, "")}/`;
  root.querySelectorAll(".footer-links a").forEach((anchor) => {
    if (anchor.getAttribute("href") === activePath) anchor.setAttribute("aria-current", "page");
    else anchor.removeAttribute("aria-current");
  });
  if (!activityCleanup.has(host)) activityCleanup.set(host, bindAmbientMotion(root));
  return root;
}

export function clearSharedBottomUi(host) {
  if (!(host instanceof HTMLElement)) return;
  activityCleanup.get(host)?.();
  activityCleanup.delete(host);
  styleReadiness.delete(host);
  clearBottomFit(host.shadowRoot);
  clearClosingLogo(host.shadowRoot);
  host.shadowRoot?.replaceChildren();
  host.replaceChildren();
}
