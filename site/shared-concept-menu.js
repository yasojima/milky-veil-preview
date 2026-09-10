import { ensureGoogleTranslate, selectTranslationTarget, storedTranslationLanguage } from "./shared-translation.js";
import { socialIcons, translationControl } from "./shared-social-tools.js";
import { menuContactMarkup, showContactDemo } from "./shared-contact-details.js?v=20260910-120";
import { sharedBrandLogo, sharedPrimaryRouteIds, sharedRouteRegistry } from "./shared-site-data.js?v=20260906-02&pages=20260910-120";

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
      <button class="shared-nav-toggle l-nav-btn u-alpha" type="button" aria-expanded="false" aria-controls="global-nav" aria-label="メニューを開く">
        <span class="shared-nav-label l-nav-btn__txt u-font-en u-uppercase">menu</span>
      </button>
      <nav id="global-nav" class="shared-nav-content l-nav is-compact-menu" aria-label="グローバルナビゲーション" aria-hidden="true" inert itemscope itemtype="http://www.schema.org/SiteNavigationElement">
        <a class="menu-brand" href="${sharedRouteRegistry.home.path}" data-link aria-label="MILKY VEIL HOME"><img src="${sharedBrandLogo}" alt="MILKY VEIL"></a>
        <ul class="l-nav-list">${items}</ul><div class="menu-social-tools">${socialIcons()}${translationControl("compact-menu")}</div>
        ${menuContactMarkup()}
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
  const toggle = menu?.querySelector(".shared-nav-toggle");
  const nav = menu?.querySelector(".shared-nav-content");
  if (!(menu instanceof HTMLElement) || !(toggle instanceof HTMLButtonElement) || !(nav instanceof HTMLElement)) {
    disposeActiveMenu = () => {};
    return disposeActiveMenu;
  }

  const bottomHost = document.getElementById("shared-bottom-ui-root");
  const bottomBar = bottomHost?.shadowRoot?.querySelector(".fixed-cta") || document.querySelector(".fixed-cta");
  let lockedScroll = null;
  let savedBodyStyle;
  const savedRootBackground = document.documentElement.style.background;
  const syncBottomSpace = () => {
    const barHeight = window.matchMedia("(max-width: 900px)").matches ? 0 : bottomBar?.getBoundingClientRect().height || 0;
    const viewportHeight = window.visualViewport?.height || window.innerHeight;
    nav.style.setProperty("--shared-menu-bar-height", barHeight + "px");
    nav.style.setProperty("--shared-menu-screen-height", viewportHeight + "px");
    nav.style.setProperty("--shared-menu-screen-top", (window.visualViewport?.offsetTop || 0) + "px");
    bottomBar?.style.setProperty("--menu-dock-top", ((window.visualViewport?.offsetTop || 0) + viewportHeight - barHeight) + "px");
    nav.style.setProperty("--shared-menu-viewport-height", Math.max(160, viewportHeight - barHeight) + "px");
  };
  const bottomObserver = new ResizeObserver(syncBottomSpace);
  if (bottomBar) bottomObserver.observe(bottomBar);
  syncBottomSpace();
  const controller = new AbortController();
  const { signal } = controller;
  const compact = nav.classList.contains("is-compact-menu");
  window.addEventListener("resize", syncBottomSpace, { signal });
  window.visualViewport?.addEventListener("resize", syncBottomSpace, { signal });
  window.visualViewport?.addEventListener("scroll", syncBottomSpace, { signal });
  const text = toggle.querySelector(".shared-nav-label");
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
    const columns = Math.max(1, Math.ceil(list.children.length / 10));
    const rows = Math.max(1, Math.ceil(list.children.length / columns));
    nav.style.setProperty("--menu-row-count", rows);
    list.style.gridTemplateRows = "repeat(" + rows + ", var(--menu-row-height))";
    list.style.gridTemplateColumns = "repeat(" + Math.ceil(list.children.length / rows) + ", minmax(0, 1fr))";
  };
  const itemsObserver = new MutationObserver(fitMenu);
  if (list) itemsObserver.observe(list, { childList: true });

  const setOpen = (open, { restoreFocus = false } = {}) => {
    bottomBar?.toggleAttribute("data-global-menu-open", open);
    syncBottomSpace();
    if (compact) {
      if (open && lockedScroll === null) {
        lockedScroll = window.scrollY;
        savedBodyStyle = document.body.getAttribute("style");
        Object.assign(document.body.style, { position: "fixed", top: -lockedScroll + "px", width: "100%", overflow: "hidden" });
        document.documentElement.style.background = "#fff";
      } else if (!open && lockedScroll !== null) {
        const scrollY = lockedScroll;
        lockedScroll = null;
        if (savedBodyStyle === null) document.body.removeAttribute("style");
        else document.body.setAttribute("style", savedBodyStyle);
        document.documentElement.style.background = savedRootBackground;
        window.scrollTo({ top: scrollY, behavior: "instant" });
      }
      bottomBar?.toggleAttribute("data-menu-open", open);
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
    syncBottomSpace();
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
    const action = event.target instanceof Element && event.target.closest("[data-menu-contact]");
    if (action) showContactDemo(action.dataset.menuContact);
    if (event.target instanceof Element && event.target.closest("a[href]")) setOpen(false);
  }, { signal });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setOpen(false, { restoreFocus: true });
  }, { signal });

  const translateButton = nav.querySelector(".menu-social-tools .translate-toggle");
  if (translateButton && !document.getElementById("app")) {
    const control = translateButton.closest(".translate-control");
    const panel = control.querySelector(".translate-menu");
    const setTranslationOpen = (open) => {
      control.classList.toggle("is-open", open);
      translateButton.setAttribute("aria-expanded", String(open));
      panel.setAttribute("aria-hidden", String(!open));
      panel.inert = !open;
    };
    document.addEventListener("pointerdown", (event) => {
      if (!event.composedPath().includes(control)) setTranslationOpen(false);
    }, { capture: true, signal });
    translateButton.addEventListener("click", () => {
      const open = translateButton.getAttribute("aria-expanded") !== "true";
      setTranslationOpen(open);
      if (!open) return;
      const target = panel.querySelector("[data-google-translate]");
      selectTranslationTarget(target.id);
      ensureGoogleTranslate();
    }, { signal });
  }
  setOpen(false);
  if (storedTranslationLanguage()) ensureGoogleTranslate();
  disposeActiveMenu = () => {
    bottomBar?.removeAttribute("data-global-menu-open");
    if (compact) setOpen(false);
    controller.abort();
    bottomObserver.disconnect();
    itemsObserver.disconnect();
    if (compact) { document.documentElement.style.overflow = previousOverflow; if (shareRail) shareRail.style.display = ""; }
    inertTargets.forEach((target) => { target.inert = false; });
  };
  return disposeActiveMenu;
}
