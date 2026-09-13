import { mobileLayout, usesMobileLayout } from "./responsive-policy.js";
import { ensureGoogleTranslate, selectTranslationTarget, storedTranslationLanguage } from "./shared-translation.js";
import { socialIcons, translationControl } from "./shared-social-tools.js";
import { menuContactMarkup, showContactDemo } from "./shared-contact-details.js?v=20260910-120&pages=20260913-228";
import { sharedBrandLogo, sharedPrimaryRouteIds, sharedRouteRegistry } from "./shared-site-data.js?v=20260906-02&pages=20260913-228";

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
      <a class="menu-brand" href="${sharedRouteRegistry.home.path}" data-link aria-label="MILKY VEIL HOME"><img src="${sharedBrandLogo}" alt="MILKY VEIL"></a>
      <button class="shared-nav-toggle l-nav-btn u-alpha" type="button" aria-expanded="false" aria-controls="global-nav" aria-label="メニューを開く">
        <span class="shared-nav-label l-nav-btn__txt u-font-en u-uppercase">menu</span>
      </button>
      <nav id="global-nav" class="shared-nav-content l-nav is-compact-menu" aria-label="グローバルナビゲーション" aria-hidden="true" inert itemscope itemtype="http://www.schema.org/SiteNavigationElement">
        <ul class="l-nav-list">${items}</ul><div class="menu-social-tools">${socialIcons()}${translationControl("compact-menu")}</div>
        ${menuContactMarkup()}
      </nav>
    </div>
  </header>`;
}

export function mountSharedConceptMenu(host, currentPath = "/concept/") {
  if (!(host instanceof HTMLElement)) return null;
  if (document.querySelector(".js-home-mv")) {
    host.classList.add("has-split-hero", "is-logo-hidden");
  }
  host.innerHTML = sharedConceptMenuMarkup(currentPath);
  if (host.classList.contains("has-split-hero")) host.prepend(host.querySelector(".menu-brand"));
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

  document.dispatchEvent(new Event("mv:menu-mounted"));
  const bottomHost = document.getElementById("shared-bottom-ui-root");
  const bottomBar = bottomHost?.shadowRoot?.querySelector(".fixed-cta") || document.querySelector(".fixed-cta");
  const syncBottomSpace = () => {
    const barHeight = usesMobileLayout() ? 0 : bottomBar?.getBoundingClientRect().height || 0;
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
  const homeHeader = document.querySelector(".header-on-hero");
  const syncHomeHeaderOffset = () => {
    const offset = homeHeader ? parseFloat(getComputedStyle(homeHeader).getPropertyValue("--home-header-lower-offset")) || 0 : 0;
    menu.style.setProperty("--home-menu-lower-offset", Math.max(0, offset - window.scrollY) + "px");
  };
  syncHomeHeaderOffset();
  window.addEventListener("scroll", syncHomeHeaderOffset, { passive: true, signal });
  window.addEventListener("resize", syncHomeHeaderOffset, { passive: true, signal });
  const mobileQuery = mobileLayout();
  const menuParent = menu.parentNode;
  const menuNextSibling = menu.nextSibling;
  let disposed = false;
  const syncDesktopLayer = () => {
    // The page wrapper creates a stacking context below the sibling footer host.
    if (!disposed && !mobileQuery.matches) {
      if (menu.parentNode !== document.body) document.body.append(menu);
    } else if (menu.parentNode !== menuParent) {
      menuParent.insertBefore(menu, menuNextSibling?.parentNode === menuParent ? menuNextSibling : null);
    }
  };
  let releaseMobileLock = null;
  const syncMobileLock = () => {
    const lock = mobileQuery.matches && nav.classList.contains("is-open");
    if (lock === Boolean(releaseMobileLock)) return;
    if (!lock) {
      releaseMobileLock?.();
      releaseMobileLock = null;
      return;
    }
    const position = { left: window.scrollX, top: window.scrollY, behavior: "instant" };
    const elements = [document.documentElement, document.body];
    const properties = ["overflow", "overscroll-behavior", "touch-action"];
    const saved = elements.map(element => properties.map(property => [property, element.style.getPropertyValue(property), element.style.getPropertyPriority(property)]));
    elements.forEach(element => {
      element.style.setProperty("overflow", "hidden");
      element.style.setProperty("overscroll-behavior", "none");
      element.style.setProperty("touch-action", "none");
    });
    // Keep the document in flow so opening the mobile menu cannot reset scroll-linked sections.
    releaseMobileLock = () => {
      elements.forEach((element, index) => saved[index].forEach(([property, value, priority]) => {
        if (value) element.style.setProperty(property, value, priority);
        else element.style.removeProperty(property);
      }));
      window.scrollTo(position);
    };
  };
  const preventMobileDrag = event => {
    if (!releaseMobileLock) return;
    if (event.cancelable) event.preventDefault();
    event.stopImmediatePropagation();
  };
  window.addEventListener("touchmove", preventMobileDrag, { capture: true, passive: false, signal });
  window.addEventListener("wheel", preventMobileDrag, { capture: true, passive: false, signal });
  window.addEventListener("keydown", event => {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key) && !(event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable]"))) preventMobileDrag(event);
  }, { capture: true, signal });
  mobileQuery.addEventListener("change", syncMobileLock, { signal });
  mobileQuery.addEventListener("change", syncDesktopLayer, { signal });
  const compact = nav.classList.contains("is-compact-menu");
  window.addEventListener("resize", syncBottomSpace, { signal });
  window.visualViewport?.addEventListener("resize", syncBottomSpace, { signal });
  window.visualViewport?.addEventListener("scroll", syncBottomSpace, { signal });
  const text = toggle.querySelector(".shared-nav-label");
  const shareRail = bottomHost?.shadowRoot?.querySelector(".fixed-social-rail");
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
      bottomBar?.toggleAttribute("data-menu-open", open);
      if (shareRail) shareRail.style.display = open ? "none" : "";
      if (open) { nav.scrollTop = 0; requestAnimationFrame(fitMenu); }
    }
    nav.classList.toggle("is-open", open);
    syncMobileLock();
    syncDesktopLayer();
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    nav.setAttribute("aria-hidden", String(!open));
    nav.inert = !open;
    syncBottomSpace();
    if (text) text.textContent = open ? "close" : "menu";
    if (!open && restoreFocus) requestAnimationFrame(() => toggle.focus({ preventScroll: true }));
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
    disposed = true;
    bottomBar?.removeAttribute("data-global-menu-open");
    setOpen(false);
    controller.abort();
    bottomObserver.disconnect();
    itemsObserver.disconnect();
    if (compact && shareRail) shareRail.style.display = "";
  };
  return disposeActiveMenu;
}
