import { sharedPrimaryRouteIds, sharedRouteRegistry } from "./shared-site-data.js?v=20260906-02&pages=20260909-035";

export const sharedConceptMenuRoutes = Object.freeze(sharedPrimaryRouteIds.map((routeId) => sharedRouteRegistry[routeId]));

const normalizePath = (path) => {
  if (!path || path === "/") return "/";
  return `/${String(path).replace(/^\/+|\/+$/g, "")}/`;
};

export function sharedConceptMenuMarkup(currentPath = "/concept/") {
  const activePath = normalizePath(currentPath);
  const items = sharedConceptMenuRoutes.map(({ path, label }) => `
    <li class="l-nav-list__item" itemprop="name">
      <a class="l-nav-list__item-link u-font-en u-uppercase" href="${path}" data-link itemprop="URL"${path === activePath ? ' aria-current="page"' : ""}>${label}</a>
    </li>`).join("");
  return `<header class="shared-concept-menu l-header" data-shared-concept-menu>
    <div class="l-header__inner">
      <button class="js-nav-btn l-nav-btn u-alpha" type="button" aria-expanded="false" aria-controls="global-nav" aria-label="メニューを開く">
        <span class="js-nav-btn-txt l-nav-btn__txt u-font-en u-uppercase">menu</span>
      </button>
      <nav id="global-nav" class="js-nav-content l-nav" aria-label="グローバルナビゲーション" aria-hidden="true" inert itemscope itemtype="http://www.schema.org/SiteNavigationElement">
        <ul class="l-nav-list">${items}</ul>
      </nav>
    </div>
  </header>`;
}

export function mountSharedConceptMenu(host, currentPath = "/concept/") {
  if (!(host instanceof HTMLElement)) return null;
  host.innerHTML = sharedConceptMenuMarkup(currentPath);
  return host.querySelector("[data-shared-concept-menu]");
}

let disposeActiveMenu = () => {};

export function bindSharedConceptMenu(scope = document) {
  disposeActiveMenu();
  const menu = scope.querySelector?.("[data-shared-concept-menu]");
  const toggle = menu?.querySelector(".js-nav-btn");
  const nav = menu?.querySelector(".js-nav-content");
  if (!(menu instanceof HTMLElement) || !(toggle instanceof HTMLButtonElement) || !(nav instanceof HTMLElement)) {
    disposeActiveMenu = () => {};
    return disposeActiveMenu;
  }

  const controller = new AbortController();
  const { signal } = controller;
  const text = toggle.querySelector(".js-nav-btn-txt");
  const surfaceRoot = menu.closest("#app, .l-wrapper");
  const surfaceTargets = surfaceRoot
    ? [...surfaceRoot.children].filter((target) => target !== menu && !target.contains(menu))
    : [];
  const inertTargets = [...new Set([...surfaceTargets, ...document.querySelectorAll("#main, #shared-bottom-ui-root")])];

  const setOpen = (open, { restoreFocus = false } = {}) => {
    nav.classList.toggle("is-open", open);
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    nav.setAttribute("aria-hidden", String(!open));
    nav.inert = !open;
    if (text) text.textContent = open ? "close" : "menu";
    inertTargets.forEach((target) => { target.inert = open; });
    if (!open && restoreFocus) requestAnimationFrame(() => toggle.focus());
  };

  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const open = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!open, { restoreFocus: open });
  }, { capture: true, signal });
  toggle.addEventListener("keydown", (event) => {
    if (event.key !== "Tab" || event.shiftKey || toggle.getAttribute("aria-expanded") !== "true") return;
    const firstLink = nav.querySelector("a[href]");
    if (!(firstLink instanceof HTMLElement)) return;
    event.preventDefault();
    firstLink.focus();
  }, { signal });
  nav.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a[href]")) setOpen(false);
  }, { signal });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setOpen(false, { restoreFocus: true });
  }, { signal });

  setOpen(false);
  disposeActiveMenu = () => {
    controller.abort();
    inertTargets.forEach((target) => { target.inert = false; });
  };
  return disposeActiveMenu;
}
