import { fitMobileBottom } from "./shared-bottom-fit-mobile.js?v=20260922-529";
import { usesMobileLayout } from "./responsive-policy.js";

const bindings = new WeakMap();

export function bindBottomFit(root) {
  if (bindings.has(root)) return;
  const component = root.querySelector("[data-shared-bottom-ui-component]");
  const brand = root.querySelector(".shared-brand-message");
  const copy = brand?.querySelector(".shared-brand-message-copy");
  const title = copy?.querySelector("p");
  if (!component || !brand || !title) return;
  const eyebrow = copy.querySelector("small");
  const supporting = copy.querySelector(":scope > span");
  const logo = root.querySelector(".closing-brand");
  const tickers = [...root.querySelectorAll(".shared-footer-ticker .h")];
  let frame = 0;
  let fittedWidth = window.innerWidth;
  let fittedHeight = window.innerHeight;
  let fittedMobileHeight = 0;
  let atBottom = false;

  const fit = () => {
    frame = 0;
    if (!component.isConnected) return;
    const mobile = usesMobileLayout();
    const keepBottom = atBottom && (fittedHeight !== window.innerHeight || fittedWidth !== window.innerWidth);
    for (const element of [title, eyebrow, supporting]) element.style.removeProperty("font-size");
    copy.style.removeProperty("row-gap");
    brand.style.removeProperty("padding-top");
    brand.style.removeProperty("padding-bottom");
    brand.style.removeProperty("padding-inline");
    tickers.forEach(ticker => ticker.style.removeProperty("font-size"));
    const targetHeight = mobile ? parseFloat(getComputedStyle(component).minHeight) : window.innerHeight;
    if (mobile) {
      fitMobileBottom({ component, brand, copy, title, eyebrow, supporting, logo, tickers, targetHeight });
    } else {
    if (getComputedStyle(brand).display !== "none") {
      const style = getComputedStyle(brand);
      if (logo) {
        // Equal side reservations keep the center stable while clearing the left logo.
        brand.style.paddingInline = Math.max(parseFloat(style.paddingLeft), logo.getBoundingClientRect().right + 16) + "px";
      }
      const availableWidth = brand.clientWidth - parseFloat(getComputedStyle(brand).paddingLeft) - parseFloat(getComputedStyle(brand).paddingRight);
      const eyebrowMaximum = parseFloat(getComputedStyle(eyebrow).fontSize);
      const supportingMaximum = parseFloat(getComputedStyle(supporting).fontSize);
      const gapMaximum = parseFloat(getComputedStyle(copy).rowGap);
      const preferredTitle = parseFloat(getComputedStyle(title).fontSize);
      const tickerMaximum = parseFloat(getComputedStyle(tickers[0]).fontSize);
      tickers.forEach(ticker => ticker.style.setProperty("font-size", Math.min(tickerMaximum, Math.max(28, targetHeight * .075)) + "px", "important"));
      const applySize = size => {
        const scale = size > 204 ? size / 204 : Math.min(1, size / 120);
        title.style.fontSize = size + "px";
        eyebrow.style.fontSize = Math.max(10, eyebrowMaximum * scale) + "px";
        supporting.style.fontSize = Math.max(12, supportingMaximum * scale) + "px";
        copy.style.rowGap = Math.max(6, gapMaximum * scale) + "px";
      };
      // Fit the whole copy block, keeping readable text and equal space around the headline.
      let lower = 32;
      let upper = Math.max(lower, preferredTitle);
      for (let iteration = 0; iteration < 14; iteration += 1) {
        const candidate = (lower + upper) / 2;
        applySize(candidate);
        if (copy.scrollWidth <= availableWidth + .5 && component.getBoundingClientRect().height <= targetHeight + .5) lower = candidate;
        else upper = candidate;
      }
      applySize(lower);
    }
    }
    fittedWidth = window.innerWidth;
    fittedHeight = window.innerHeight;
    fittedMobileHeight = targetHeight;
    if (keepBottom) window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" });
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(fit);
  };
  const resize = () => {
    if (usesMobileLayout() && window.innerWidth === fittedWidth && parseFloat(getComputedStyle(component).minHeight) === fittedMobileHeight) return;
    schedule();
  };
  const scroll = () => {
    if (window.innerHeight === fittedHeight && window.innerWidth === fittedWidth) atBottom = document.documentElement.scrollHeight - fittedHeight - window.scrollY <= 2;
  };
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("milky-translation-layout", schedule);
  window.addEventListener("scroll", scroll, { passive: true });
  document.fonts.ready.then(schedule);
  bindings.set(root, () => {
    window.removeEventListener("resize", resize);
    window.removeEventListener("milky-translation-layout", schedule);
    window.removeEventListener("scroll", scroll);
    cancelAnimationFrame(frame);
  });
  fit();
}

export function clearBottomFit(root) {
  bindings.get(root)?.();
  bindings.delete(root);
}
