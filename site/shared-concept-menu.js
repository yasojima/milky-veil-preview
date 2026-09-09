import { socialIcons, translationControl } from "./shared-social-tools.js";
import { sharedPrimaryRouteIds, sharedRouteRegistry } from "./shared-site-data.js?v=20260906-02&pages=20260909-041";

export const sharedConceptMenuRoutes = Object.freeze(sharedPrimaryRouteIds.map((routeId) => sharedRouteRegistry[routeId]));

const normalizePath = (path) => {
  if (!path || path === "/") return "/";
  return `/${String(path).replace(/^\/+|\/+$/g, "")}/`;
};

export function sharedConceptMenuMarkup(currentPath = "/concept/", { content } = {}) {
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
      <nav id="global-nav" class="js-nav-content l-nav${content === undefined ? " is-compact-menu" : ""}" aria-label="グローバルナビゲーション" aria-hidden="true" inert itemscope itemtype="http://www.schema.org/SiteNavigationElement">
        ${content ?? `<ul class="l-nav-list">${items}</ul><div class="menu-social-tools">${socialIcons()}${translationControl("compact-menu")}</div>`}
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

  const bottomHost = document.getElementById("shared-bottom-ui-root");
  const bottomBar = bottomHost?.shadowRoot?.querySelector(".fixed-cta") || document.querySelector(".fixed-cta");
  const syncBottomSpace = () => {
    const barHeight = bottomBar?.getBoundingClientRect().height || 0;
    const viewportHeight = window.visualViewport?.height || window.innerHeight;
    nav.style.setProperty("--shared-menu-viewport-height", Math.max(160, viewportHeight - barHeight) + "px");
  };
  const bottomObserver = new ResizeObserver(syncBottomSpace);
  if (bottomBar) bottomObserver.observe(bottomBar);
  syncBottomSpace();
  const controller = new AbortController();
  const { signal } = controller;
  const compact = nav.classList.contains("is-compact-menu");
  let reviewSpace = Math.max(window.innerHeight * 3, 2400);
  if (!compact) nav.style.setProperty("--menu-review-space", reviewSpace + "px");
  nav.addEventListener("scroll", () => {
    if (compact) return;
    if (nav.scrollHeight - nav.scrollTop - nav.clientHeight > nav.clientHeight) return;
    reviewSpace += Math.max(window.innerHeight * 3, 2400);
    nav.style.setProperty("--menu-review-space", reviewSpace + "px");
  }, { passive: true, signal });
  window.addEventListener("resize", syncBottomSpace, { signal });
  window.visualViewport?.addEventListener("resize", syncBottomSpace, { signal });
  const text = toggle.querySelector(".js-nav-btn-txt");
  const surfaceRoot = menu.closest("#app, .l-wrapper");
  const surfaceTargets = surfaceRoot
    ? [...surfaceRoot.children].filter((target) => target !== menu && !target.contains(menu))
    : [];
  const inertTargets = [...new Set([...surfaceTargets, ...document.querySelectorAll("#main, #shared-bottom-ui-root")])].filter(target => !compact || target !== bottomHost);
  const shareRail = bottomHost?.shadowRoot?.querySelector(".fixed-social-rail");
  const previousOverflow = document.documentElement.style.overflow;
  const list = nav.querySelector(".l-nav-list");
  const fitMenu = () => {
    if (!compact || !list) return;
    const available = Math.max(100, nav.clientHeight - 150);
    const item = list.firstElementChild;
    const naturalHeight = item?.getBoundingClientRect().height || 78;
    const rows = Math.max(1, Math.min(list.children.length, Math.floor(available / naturalHeight)));
    list.style.gridTemplateRows = "repeat(" + rows + ", max-content)";
    list.style.gridTemplateColumns = "repeat(" + Math.ceil(list.children.length / rows) + ", minmax(0, 1fr))";
  };
  const layoutObserver = new ResizeObserver(fitMenu);
  if (compact) layoutObserver.observe(nav);
  const itemsObserver = new MutationObserver(fitMenu);
  if (list) itemsObserver.observe(list, { childList: true });

  const setOpen = (open, { restoreFocus = false } = {}) => {
    syncBottomSpace();
    if (compact) {
      document.documentElement.style.overflow = open ? "hidden" : previousOverflow;
      if (shareRail) shareRail.style.display = open ? "none" : "";
      if (open) { nav.scrollTop = 0; requestAnimationFrame(fitMenu); }
    }
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

  const translateButton = nav.querySelector(".menu-social-tools .translate-toggle");
  if (translateButton && !document.getElementById("app")) {
    translateButton.addEventListener("click", () => {
      const control = translateButton.closest(".translate-control");
      const panel = control.querySelector(".translate-menu");
      const open = translateButton.getAttribute("aria-expanded") !== "true";
      control.classList.toggle("is-open", open);
      translateButton.setAttribute("aria-expanded", String(open));
      panel.setAttribute("aria-hidden", String(!open));
      panel.inert = !open;
      if (!open) return;
      const target = panel.querySelector("[data-google-translate]");
      const mount = () => {
        if (target.childElementCount || !window.google?.translate?.TranslateElement) return;
        new window.google.translate.TranslateElement({ pageLanguage: "ja", autoDisplay: false }, target.id);
      };
      if (window.google?.translate?.TranslateElement) { mount(); return; }
      window.milkyMenuTranslationReady = mount;
      if (!document.getElementById("menu-translation-script")) {
        const script = document.createElement("script");
        script.id = "menu-translation-script";
        script.src = "https://translate.google.com/translate_a/element.js?cb=milkyMenuTranslationReady";
        script.async = true;
        script.onerror = () => { target.textContent = "翻訳機能を読み込めませんでした。"; };
        document.head.append(script);
      }
    }, { signal });
  }
  setOpen(false);
  disposeActiveMenu = () => {
    controller.abort();
    bottomObserver.disconnect();
    layoutObserver.disconnect();
    itemsObserver.disconnect();
    if (compact) { document.documentElement.style.overflow = previousOverflow; if (shareRail) shareRail.style.display = ""; }
    inertTargets.forEach((target) => { target.inert = false; });
  };
  return disposeActiveMenu;
}
