import { mobileLayout as createMobileLayout } from "./responsive-policy.js";
import { sharedSalonData, sharedSocials } from "./shared-site-data.js?v=20260906-02&pages=20260913-226";
import { contactLabel, reservationLabel, showContactDemo } from "./shared-contact-details.js?v=20260910-120&pages=20260913-226";

const sharedFixedShellData = Object.freeze({
  phone: sharedSalonData.phone,
  hours: sharedSalonData.hours,
  socials: sharedSocials,
});

export function sharedFixedCtaMarkup() {
  return `
    <div class="fixed-cta" aria-label="固定お問い合わせ導線">
      <aside class="fixed-social-rail" aria-label="SNS（デモ・リンク未設定）" data-fixed-social-rail>
        <button class="fixed-social-toggle" type="button" aria-expanded="false" aria-controls="fixed-social-panel" aria-label="SNSを表示" data-fixed-social-toggle>
          <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="8" cy="16" r="3.2"/><circle cx="24" cy="8" r="3.2"/><circle cx="24" cy="24" r="3.2"/><path d="m10.8 14.6 10.3-5.2M10.8 17.4l10.3 5.2"/></svg>
        </button>
        <div class="fixed-social-panel" id="fixed-social-panel">
          ${sharedFixedShellData.socials.map(({ name, file }) => `<button class="fixed-social-item" type="button" tabindex="-1" aria-label="${name}（デモ・リンク未設定）" title="${name}（デモ）" data-demo-social><img src="/milky-veil-preview/assets/ui/social/${file}" alt=""></button>`).join("")}
        </div>
      </aside>
      <button class="fixed-contact-toggle" type="button" aria-expanded="false" aria-controls="fixed-contact-panel" aria-label="お問い合わせ・予約を表示" data-fixed-contact-toggle>
        <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="7" width="24" height="18" rx="2"/><path d="m5 9 11 8 11-8"/></svg>
      </button>
      <div class="fixed-contact-panel" id="fixed-contact-panel">
      <div class="cta-tel">
        <button type="button" class="cta-phone" data-demo-phone aria-label="電話（デモ・リンク未設定）"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.7 2.8 9.3 8l-2.1 1.7c1.4 3.1 3.9 5.6 7.1 7.1l1.7-2.1 5.2 2.6-.8 3.7c-.2.8-.9 1.3-1.7 1.3C9.3 21.7 2.3 14.7 1.7 5.3c-.1-.8.5-1.5 1.3-1.7l3.7-.8Z"/></svg><strong>${sharedFixedShellData.phone}</strong></button>
        <span class="cta-hours">${sharedFixedShellData.hours.join(" / ")}</span>
      </div>
      <div class="fixed-cta-actions">
        <a class="fixed-cta-action" href="/milky-veil-preview/contact/" data-link>${contactLabel}</a>
        <button class="fixed-cta-action" type="button" data-demo-reserve>${reservationLabel}</button>
      </div>
      <div class="page-top-cell">
        <button type="button" class="page-top" aria-label="ページ上部へ"></button>
      </div>
      </div>
    </div>`;
}

let disposeActiveShell = () => {};

export function bindSharedFixedShell(scope = document) {
  disposeActiveShell();
  const queryRoot = scope instanceof ShadowRoot ? scope : document;
  const sharedHost = queryRoot instanceof ShadowRoot ? queryRoot.host : null;
  const bar = queryRoot.querySelector(".fixed-cta");
  if (!(bar instanceof HTMLElement)) {
    disposeActiveShell = () => {};
    return disposeActiveShell;
  }

  const footer = queryRoot.querySelector(".site-footer");
  const dock = queryRoot.querySelector(".fixed-cta-clearance");
  const ticker = queryRoot.querySelector(".shared-footer-ticker");
  if (dock instanceof HTMLElement) {
    dock.removeAttribute("aria-hidden");
    dock.append(bar);
  }
  const socialRail = bar.querySelector("[data-fixed-social-rail]");
  const socialToggle = bar.querySelector("[data-fixed-social-toggle]");
  const socialItems = [...bar.querySelectorAll("[data-demo-social]")];
  const contactToggle = bar.querySelector("[data-fixed-contact-toggle]");
  const contactPanel = bar.querySelector(".fixed-contact-panel");
  const mobile = createMobileLayout();
  const pageTop = bar.querySelector(".page-top");
  const reserveButtons = [...bar.querySelectorAll("[data-demo-reserve]")];
  const controller = new AbortController();
  const { signal } = controller;
  const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(schedule) : null;
  let frameId = 0;
  let scrollIdleTimer = 0;
  let scrolling = false;
  let mobileDockTimer = 0;
  let mobileRetiring = false;

  const viewportBottom = () => {
    const viewport = window.visualViewport;
    return viewport ? viewport.offsetTop + viewport.height : window.innerHeight;
  };

  function syncSharedBoundary() {
    if (!(sharedHost instanceof HTMLElement)) return;
    const scale = Math.max(1, window.devicePixelRatio || 1);
    const documentTop = sharedHost.getBoundingClientRect().top + window.scrollY;
    const snappedTop = Math.ceil((documentTop * scale) - 0.000001) / scale;
    const offset = Math.max(0, snappedTop - documentTop);
    const value = offset < 0.000001 ? "0px" : `${offset}px`;
    if (sharedHost.style.getPropertyValue("--shared-bottom-boundary-offset") !== value) {
      sharedHost.style.setProperty("--shared-bottom-boundary-offset", value);
    }
  }

  function update() {
    frameId = 0;
    const reservedHeight = mobile.matches ? "0px" : `${bar.getBoundingClientRect().height}px`;
    if (document.documentElement.style.getPropertyValue("--shared-fixed-bar-height") !== reservedHeight) {
      document.documentElement.style.setProperty("--shared-fixed-bar-height", reservedHeight);
    }
    syncSharedBoundary();
    const closing = document.documentElement.hasAttribute("data-closing-directory");
    bar.toggleAttribute("data-closing-directory", closing);
    if (dock) dock.style.height = "0px";
    if (closing) {
      setSocialOpen(false);
      setContactOpen(false);
      bar.inert = true;
      return;
    }
    if (socialRail && ticker) {
      const hidden = !mobile.matches && ticker.getBoundingClientRect().top <= viewportBottom() - bar.getBoundingClientRect().height - 15 + 12;
      if (hidden && !socialRail.classList.contains("is-ticker-hidden")) {
        setSocialOpen(false);
        socialRail.classList.remove("is-hovered");
      }
      socialRail.classList.toggle("is-ticker-hidden", hidden);
      socialRail.inert = hidden;
    }
    if (mobile.matches) updateMobileBar();
    else updateDesktopBar();
  }

  function updateMobileBar() {
    bar.classList.remove("is-scrolling", "is-docked");
    const hidden = footer instanceof HTMLElement && footer.getBoundingClientRect().top < viewportBottom() - 1;
    if (hidden && !bar.classList.contains("is-footer-hidden")) {
      setSocialOpen(false);
      setContactOpen(false);
      mobileRetiring = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.clearTimeout(mobileDockTimer);
      if (mobileRetiring) mobileDockTimer = window.setTimeout(() => {
        mobileRetiring = false;
        schedule();
      }, 400);
    }
    if (!hidden) {
      window.clearTimeout(mobileDockTimer);
      mobileRetiring = false;
    }
    bar.classList.toggle("is-footer-hidden", hidden);
    const closingDocked = hidden && !mobileRetiring && !!dock && dock.getBoundingClientRect().bottom <= viewportBottom();
    bar.classList.toggle("is-closing-docked", closingDocked);
    bar.inert = bar.hasAttribute("data-global-menu-open") || (hidden && !closingDocked);
    if (contactPanel) contactPanel.inert = !closingDocked && !bar.classList.contains("is-contact-open");
  }

  function updateDesktopBar() {
    bar.classList.remove("is-footer-hidden", "is-closing-docked");
    window.clearTimeout(mobileDockTimer);
    mobileRetiring = false;
    bar.inert = bar.hasAttribute("data-global-menu-open");
    if (!(footer instanceof HTMLElement)) return;
    const footerRect = footer.getBoundingClientRect();
    if (footerRect.top <= viewportBottom()) {
      bar.classList.remove("is-scrolling");
      bar.classList.add("is-docked");
      return;
    }
    bar.classList.remove("is-docked");
    bar.classList.toggle("is-scrolling", scrolling);
  }

  function schedule() {
    if (frameId) return;
    frameId = requestAnimationFrame(update);
  }

  function handleScroll() {
    scrolling = true;
    window.clearTimeout(scrollIdleTimer);
    window.clearTimeout(mobileDockTimer);
    schedule();
    scrollIdleTimer = window.setTimeout(() => {
      scrolling = false;
      bar.classList.remove("is-scrolling");
      schedule();
    }, 500);
  }

  function setSocialOpen(open, restoreFocus = false) {
    if (open && mobile.matches) setContactOpen(false);
    socialRail?.classList.toggle("is-open", open);
    if (!open) socialRail?.classList.remove("is-hovered");
    socialToggle?.setAttribute("aria-expanded", String(open));
    socialToggle?.setAttribute("aria-label", open ? "SNSを閉じる" : "SNSを表示");
    socialItems.forEach((item) => item.setAttribute("tabindex", open ? "0" : "-1"));
    if (!open && restoreFocus) socialToggle?.focus();
  }

  function setContactOpen(open, restoreFocus = false) {
    const expanded = mobile.matches && open;
    bar.classList.toggle("is-contact-open", expanded);
    contactToggle?.setAttribute("aria-expanded", String(expanded));
    contactToggle?.setAttribute("aria-label", expanded ? "お問い合わせ・予約を閉じる" : "お問い合わせ・予約を表示");
    if (contactPanel) contactPanel.inert = mobile.matches && !expanded;
    if (!expanded && restoreFocus) contactToggle?.focus();
  }

  contactToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = contactToggle.getAttribute("aria-expanded") !== "true";
    if (open) setSocialOpen(false);
    setContactOpen(open);
  }, { signal });
  mobile.addEventListener("change", () => { setContactOpen(false); schedule(); }, { signal });
  setContactOpen(false);

  let tabNavigation = false;
  document.addEventListener("keydown", (event) => { tabNavigation = event.key === "Tab"; }, { capture: true, signal });
  document.addEventListener("keyup", () => { tabNavigation = false; }, { signal });
  document.addEventListener("pointerdown", () => { tabNavigation = false; }, { capture: true, signal });

  function keepFocusedElementVisible(event) {
    if (bar.hasAttribute("data-closing-directory")) return;
    const target = event.composedPath()[0];
    if (!tabNavigation || !(target instanceof HTMLElement) || !target.closest("main, .site-footer") || target.closest("dialog[open]")) return;
    requestAnimationFrame(() => {
      if (!target.isConnected || !target.matches(":focus") || document.querySelector("dialog[open]")) return;
      const overlap = target.getBoundingClientRect().bottom - (bar.getBoundingClientRect().top - 8);
      if (overlap <= 0) return;
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      root.scrollTop += overlap;
      root.style.scrollBehavior = previousScrollBehavior;
      schedule();
    });
  }

  socialToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    setSocialOpen(socialToggle.getAttribute("aria-expanded") !== "true");
  }, { signal });
  socialRail?.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse" && window.matchMedia("(hover: hover)").matches) socialRail.classList.add("is-hovered");
  }, { signal });
  socialRail?.addEventListener("pointerleave", () => socialRail.classList.remove("is-hovered"), { signal });
  socialItems.forEach((item) => item.addEventListener("click", (event) => event.preventDefault(), { signal }));
  pageTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }), { signal });
  bar.querySelector("[data-demo-phone]")?.addEventListener("click", () => {
    showContactDemo("phone");
  }, { signal });
  reserveButtons.forEach((button) => button.addEventListener("click", () => {
    showContactDemo("reserve");
  }, { signal }));
  document.addEventListener("click", (event) => {
    if (!event.composedPath().includes(socialRail)) setSocialOpen(false);
    if (!event.composedPath().includes(contactPanel) && !event.composedPath().includes(contactToggle)) setContactOpen(false);
  }, { signal });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && socialToggle?.getAttribute("aria-expanded") === "true") setSocialOpen(false, true);
    if (event.key === "Escape" && contactToggle?.getAttribute("aria-expanded") === "true") setContactOpen(false, true);
  }, { signal });
  document.addEventListener("focusin", keepFocusedElementVisible, { signal });
  if (queryRoot !== document) queryRoot.addEventListener("focusin", keepFocusedElementVisible, { signal });
  queryRoot.querySelectorAll('link[rel="stylesheet"]').forEach((stylesheet) => {
    if (stylesheet.sheet) return;
    stylesheet.addEventListener("load", schedule, { once: true, signal });
  });
  document.fonts?.ready.then(() => {
    if (!signal.aborted) schedule();
  });
  window.addEventListener("scroll", handleScroll, { passive: true, signal });
  document.addEventListener("mv:closing-directory", schedule, { signal });
  window.addEventListener("resize", schedule, { passive: true, signal });
  window.visualViewport?.addEventListener("scroll", handleScroll, { passive: true, signal });
  window.visualViewport?.addEventListener("resize", schedule, { passive: true, signal });
  [document.querySelector("main"), sharedHost, footer, bar].forEach((element) => {
    if (element instanceof HTMLElement) resizeObserver?.observe(element);
  });
  const menuObserver = new MutationObserver(() => {
    bar.inert = bar.hasAttribute("data-global-menu-open");
    schedule();
  });
  menuObserver.observe(bar, { attributes: true, attributeFilter: ["data-global-menu-open"] });
  schedule();

  disposeActiveShell = () => {
    controller.abort();
    resizeObserver?.disconnect();
    menuObserver.disconnect();
    window.clearTimeout(scrollIdleTimer);
    if (frameId) cancelAnimationFrame(frameId);
  };
  return disposeActiveShell;
}
