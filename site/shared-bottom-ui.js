import { sharedFooterClearanceMarkup, sharedFooterMarkup } from "./shared-footer.js?v=20260902-02&pages=20260909-002";
import { sharedFixedCtaMarkup } from "./shared-fixed-shell.js?v=20260902-06&pages=20260909-002";
import { sharedBrandMessageMarkup } from "./shared-brand-message.js?v=20260906-02&pages=20260909-002";
import { sharedFooterTickerMarkup, sharedFooterTickerRuleMarkup } from "./shared-footer-ticker.js?v=20260907-01&pages=20260909-002";

const SHARED_BOTTOM_STYLES = Object.freeze([
  "/milky-veil-preview/site/shared-fonts.css?v=20260906-01",
  "/milky-veil-preview/site/shared-brand-message.css?v=20260906-03",
  "/milky-veil-preview/site/shared-footer-ticker.css?v=20260908-01",
  "/milky-veil-preview/site/shared-footer.css?v=20260902-09",
  "/milky-veil-preview/site/shared-fixed-shell.css?v=20260907-07",
]);

export function mountSharedBottomUi(host, currentPath) {
  if (!(host instanceof HTMLElement)) return null;
  const root = host.shadowRoot || host.attachShadow({ mode: "open" });
  if (!root.querySelector("[data-shared-bottom-ui-component]")) {
    root.innerHTML = `
      <style>
        :host {
          all: initial !important;
          display: block !important;
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
        [data-shared-bottom-ui-component] {
          display: block;
          box-sizing: border-box;
          width: 100%;
          margin: 0;
          padding-block-start: var(--shared-bottom-boundary-offset, 0px);
          background: #fff6fa;
        }
      </style>
      ${SHARED_BOTTOM_STYLES.map((href) => `<link rel="stylesheet" href="${href}">`).join("")}
      <div data-shared-bottom-ui-component>
        ${sharedBrandMessageMarkup()}
        ${sharedFooterTickerMarkup()}
        ${sharedFooterTickerRuleMarkup()}
        ${sharedFooterClearanceMarkup()}
        ${sharedFooterMarkup(currentPath)}
        ${sharedFixedCtaMarkup()}
      </div>
    `;
  }
  const activePath = currentPath === "/" ? "/" : `/${String(currentPath).replace(/^\/+|\/+$/g, "")}/`;
  root.querySelectorAll(".footer-links a").forEach((anchor) => {
    if (anchor.getAttribute("href") === activePath) anchor.setAttribute("aria-current", "page");
    else anchor.removeAttribute("aria-current");
  });
  return root;
}

export function clearSharedBottomUi(host) {
  if (!(host instanceof HTMLElement)) return;
  host.shadowRoot?.replaceChildren();
  host.replaceChildren();
}
