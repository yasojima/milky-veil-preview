import { mobileLayout, usesMobileLayout } from "./responsive-policy.js";
import { ensureGoogleTranslate, selectTranslationTarget, storedTranslationLanguage } from "./shared-translation.js";
import { socialIcons, translationControl } from "./shared-social-tools.js";
import { menuContactMarkup, showContactDemo } from "./shared-contact-details.js?v=20260913-244&pages=20260913-244";
import { sharedBrandLogo, sharedPrimaryRouteIds, sharedRouteRegistry } from "./shared-site-data.js?v=20260906-02&pages=20260913-244";

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
  const syncHomeHeaderVisibility = () => {
    const headerBottom = homeHeader ? Math.max(homeHeader.getBoundingClientRect().bottom, homeHeader.querySelector(".brand")?.getBoundingClientRect().bottom || 0) : 0;
    const visible = Boolean(homeHeader && headerBottom > 0 && !usesMobileLayout());
    menu.classList.toggle("home-header-visible", visible);
    toggle.inert = visible && !nav.classList.contains("is-open");
  };
  syncHomeHeaderVisibility();
  const homeHeaderObserver = new ResizeObserver(syncHomeHeaderVisibility);
  if (homeHeader) homeHeaderObserver.observe(homeHeader);
  window.addEventListener("scroll", syncHomeHeaderVisibility, { passive: true, signal });
  window.addEventListener("resize", syncHomeHeaderVisibility, { passive: true, signal });
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
  let swipe = null;
  let suppressSwipeClick = false;
  const resetSwipe = () => {
    swipe = null;
    nav.style.removeProperty("transform");
    nav.style.removeProperty("transition");
  };
  nav.addEventListener("touchstart", event => {
    resetSwipe();
    suppressSwipeClick = false;
    if (!releaseMobileLock || event.touches.length !== 1) return;
    const touch = event.touches[0];
    swipe = { x: touch.clientX, y: touch.clientY, distance: 0, started: event.timeStamp, dragging: false };
  }, { passive: true, signal });
  const preventMobileDrag = event => {
    if (!releaseMobileLock) return;
    if (swipe && event.type === "touchmove") {
      if (event.touches.length !== 1) resetSwipe();
      else {
        const touch = event.touches[0];
        const dx = touch.clientX - swipe.x;
        const dy = touch.clientY - swipe.y;
        if (!swipe.dragging && Math.abs(dy) > 12 && Math.abs(dy) >= Math.abs(dx)) resetSwipe();
        else if (swipe && (swipe.dragging || (dx > 12 && dx > Math.abs(dy) * 1.25))) {
          swipe.dragging = true;
          swipe.distance = Math.max(0, dx);
          nav.style.transition = "none";
          nav.style.transform = `translateX(${swipe.distance}px)`;
        }
      }
    }
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
    resetSwipe();
    if (open) suppressSwipeClick = false;
    bottomBar?.toggleAttribute("data-global-menu-open", open);
    syncBottomSpace();
    if (compact) {
      bottomBar?.toggleAttribute("data-menu-open", open);
      if (shareRail) shareRail.style.display = open ? "none" : "";
      if (open) { nav.scrollTop = 0; requestAnimationFrame(fitMenu); }
    }
    nav.classList.toggle("is-open", open);
    syncHomeHeaderVisibility();
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

  const finishSwipe = event => {
    if (!swipe) return;
    const { distance, dragging, started } = swipe;
    const elapsed = Math.max(1, event.timeStamp - started);
    const close = event.type !== "touchcancel" && dragging &&
      (distance >= Math.max(64, nav.clientWidth * .2) || (distance >= 40 && distance / elapsed > .5));
    suppressSwipeClick = dragging;
    if (dragging && event.cancelable) event.preventDefault();
    if (close) setOpen(false, { restoreFocus: true });
    else resetSwipe();
  };
  window.addEventListener("touchend", finishSwipe, { capture: true, passive: false, signal });
  window.addEventListener("touchcancel", finishSwipe, { capture: true, passive: false, signal });
  nav.addEventListener("click", event => {
    if (!suppressSwipeClick) return;
    suppressSwipeClick = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, { capture: true, signal });
  mobileQuery.addEventListener("change", resetSwipe, { signal });

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
    homeHeaderObserver.disconnect();
    itemsObserver.disconnect();
    if (compact && shareRail) shareRail.style.display = "";
  };
  return disposeActiveMenu;
}
