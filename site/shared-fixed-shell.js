import { sharedSalonData, sharedSocials } from "./shared-site-data.js?v=20260906-02&pages=20260909-053";

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
      <div class="cta-tel">
        <span class="cta-phone"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.7 2.8 9.3 8l-2.1 1.7c1.4 3.1 3.9 5.6 7.1 7.1l1.7-2.1 5.2 2.6-.8 3.7c-.2.8-.9 1.3-1.7 1.3C9.3 21.7 2.3 14.7 1.7 5.3c-.1-.8.5-1.5 1.3-1.7l3.7-.8Z"/></svg><strong>${sharedFixedShellData.phone}</strong></span>
        <span class="cta-hours">${sharedFixedShellData.hours.join(" / ")}</span>
      </div>
      <div class="fixed-cta-actions">
        <a class="fixed-cta-action" href="/milky-veil-preview/contact/" data-link>お問い合わせはこちら</a>
        <button class="fixed-cta-action" type="button" data-demo-reserve>ご予約はこちら</button>
      </div>
      <div class="page-top-cell">
        <button type="button" class="page-top" aria-label="ページ上部へ"></button>
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
  if (dock instanceof HTMLElement) {
    dock.removeAttribute("aria-hidden");
    dock.append(bar);
  }
  const socialRail = bar.querySelector("[data-fixed-social-rail]");
  const socialToggle = bar.querySelector("[data-fixed-social-toggle]");
  const socialItems = [...bar.querySelectorAll("[data-demo-social]")];
  const pageTop = bar.querySelector(".page-top");
  const reserveButtons = [...bar.querySelectorAll("[data-demo-reserve]")];
  const controller = new AbortController();
  const { signal } = controller;
  const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(schedule) : null;
  let frameId = 0;
  let scrollIdleTimer = 0;
  let scrolling = false;

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
    syncSharedBoundary();
    if (!(footer instanceof HTMLElement)) return;
    if (dock instanceof HTMLElement) {
      const height = `${bar.getBoundingClientRect().height}px`;
      if (dock.style.height !== height) dock.style.height = height;
    }
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
    update();
    scrollIdleTimer = window.setTimeout(() => {
      scrolling = false;
      bar.classList.remove("is-scrolling");
      schedule();
    }, 500);
  }

  function setSocialOpen(open, restoreFocus = false) {
    socialRail?.classList.toggle("is-open", open);
    if (!open) socialRail?.classList.remove("is-hovered");
    socialToggle?.setAttribute("aria-expanded", String(open));
    socialToggle?.setAttribute("aria-label", open ? "SNSを閉じる" : "SNSを表示");
    socialItems.forEach((item) => item.setAttribute("tabindex", open ? "0" : "-1"));
    if (!open && restoreFocus) socialToggle?.focus();
  }

  function keepFocusedElementVisible(event) {
    const target = event.composedPath()[0];
    if (!(target instanceof HTMLElement) || !target.closest("main, .site-footer")) return;
    requestAnimationFrame(() => {
      if (!target.isConnected) return;
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
  reserveButtons.forEach((button) => button.addEventListener("click", () => {
    alert("デモ表示のため予約リンクは未設定です。");
  }, { signal }));
  document.addEventListener("click", (event) => {
    if (!event.composedPath().includes(socialRail)) setSocialOpen(false);
  }, { signal });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && socialToggle?.getAttribute("aria-expanded") === "true") setSocialOpen(false, true);
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
  window.addEventListener("resize", schedule, { passive: true, signal });
  window.visualViewport?.addEventListener("scroll", handleScroll, { passive: true, signal });
  window.visualViewport?.addEventListener("resize", schedule, { passive: true, signal });
  [document.querySelector("main"), sharedHost, footer, bar].forEach((element) => {
    if (element instanceof HTMLElement) resizeObserver?.observe(element);
  });
  schedule();

  disposeActiveShell = () => {
    controller.abort();
    resizeObserver?.disconnect();
    window.clearTimeout(scrollIdleTimer);
    if (frameId) cancelAnimationFrame(frameId);
  };
  return disposeActiveShell;
}
