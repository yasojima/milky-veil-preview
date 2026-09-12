const bindings = new WeakMap();

export function bindBottomFit(root) {
  if (bindings.has(root)) return;
  const component = root.querySelector("[data-shared-bottom-ui-component]");
  const brand = root.querySelector(".shared-brand-message");
  const title = brand?.querySelector("p");
  const rule = root.querySelector(".shared-footer-ticker-rule");
  if (!component || !brand || !title || !rule) return;
  const footer = root.querySelector(".site-footer");
  const tickers = [...root.querySelectorAll(".shared-footer-ticker .h")];
  let frame = 0;
  const fit = () => {
    frame = 0;
    if (!component.isConnected) return;

    brand.style.removeProperty("padding-top");
    brand.style.removeProperty("padding-bottom");
    title.style.removeProperty("font-size");
    rule.style.removeProperty("padding-bottom");
    footer.style.removeProperty("padding-top");
    footer.style.removeProperty("padding-bottom");
    tickers.forEach(ticker => ticker.style.removeProperty("font-size"));
    const viewport = window.innerHeight;
    const style = getComputedStyle(brand);
    const minimumTop = window.innerWidth <= 900 ? 92 : 136;
    const minimumBottom = window.innerWidth <= 900 ? 40 : 56;
    let top = Math.max(minimumTop, parseFloat(style.paddingTop));
    let bottom = Math.max(minimumBottom, parseFloat(style.paddingBottom));
    brand.style.paddingTop = top + "px";
    brand.style.paddingBottom = bottom + "px";
    const originalFont = parseFloat(getComputedStyle(title).fontSize);
    const gap = parseFloat(getComputedStyle(rule).paddingBottom);
    const footerStyle = getComputedStyle(footer);
    const footerTop = parseFloat(footerStyle.paddingTop);
    const footerBottom = parseFloat(footerStyle.paddingBottom);
    const tickerFont = parseFloat(getComputedStyle(tickers[0]).fontSize);
    let excess = component.getBoundingClientRect().height - viewport;
    // Spend decorative space before reducing the headline; keep utility text unchanged.
    const spare = Math.max(0, top - minimumTop) + Math.max(0, bottom - minimumBottom) + Math.max(0, gap - 16) + Math.max(0, footerTop - 12) + Math.max(0, footerBottom - 12);
    const fraction = spare ? Math.min(1, Math.max(0, excess) / spare) : 0;
    top -= Math.max(0, top - minimumTop) * fraction;
    bottom -= Math.max(0, bottom - minimumBottom) * fraction;
    brand.style.paddingTop = top + "px";
    brand.style.paddingBottom = bottom + "px";
    rule.style.paddingBottom = (gap - Math.max(0, gap - 16) * fraction) + "px";
    footer.style.paddingTop = (footerTop - Math.max(0, footerTop - 12) * fraction) + "px";
    footer.style.paddingBottom = (footerBottom - Math.max(0, footerBottom - 12) * fraction) + "px";
    excess = component.getBoundingClientRect().height - viewport;
    if (excess > 0) {
      const titleHeight = title.getBoundingClientRect().height;
      const tickerHeight = root.querySelector(".shared-footer-ticker").getBoundingClientRect().height;
      const scale = Math.max(0, 1 - excess / (titleHeight + tickerHeight));
      title.style.fontSize = Math.max(32, originalFont * scale) + "px";
      tickers.forEach(ticker => ticker.style.setProperty("font-size", Math.max(28, tickerFont * scale) + "px", "important"));
    }
    const remaining = viewport - component.getBoundingClientRect().height;
    if (remaining > 0) {
      brand.style.paddingTop = (top + remaining / 2) + "px";
      brand.style.paddingBottom = (bottom + remaining / 2) + "px";
    }
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(fit);
  };
  window.addEventListener("resize", schedule, { passive: true });
  document.fonts.ready.then(schedule);
  bindings.set(root, () => {
    window.removeEventListener("resize", schedule);
    cancelAnimationFrame(frame);
  });
  fit();
}

export function clearBottomFit(root) {
  bindings.get(root)?.();
  bindings.delete(root);
}
