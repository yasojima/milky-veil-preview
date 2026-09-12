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
  let resizeTimer = 0;
  let fittedWidth = window.innerWidth;
  let fittedHeight = window.innerHeight;
  let atBottom = false;
  const fit = () => {
    frame = 0;
    if (!component.isConnected) return;
    const keepBottom = window.innerWidth > 900 && atBottom && fittedHeight !== window.innerHeight;

    brand.style.removeProperty("padding-top");
    brand.style.removeProperty("padding-bottom");
    title.style.removeProperty("font-size");
    title.style.removeProperty("line-height");
    rule.style.removeProperty("padding-bottom");
    footer.style.removeProperty("padding-top");
    footer.style.removeProperty("padding-bottom");
    tickers.forEach(ticker => ticker.style.removeProperty("font-size"));
    const viewport = window.innerHeight;
    if (window.innerWidth > 900 && viewport < 800) {
      const progress = Math.max(0, Math.min(1, (viewport - 550) / 250));
      const compact = (1 - progress) ** 2;
      title.style.lineHeight = String(1.02 - .18 * compact);
    }
    const style = getComputedStyle(brand);
    const readSpacing = (property, fallback) => {
      brand.style.paddingTop = `var(${property}, ${fallback}px)`;
      const value = parseFloat(getComputedStyle(brand).paddingTop);
      brand.style.removeProperty("padding-top");
      return value;
    };
    const headlineTop = window.innerWidth <= 900 ? 92 : readSpacing("--closing-min-top", 64);
    const minimumTop = window.innerWidth <= 900 ? 92 : 136;
    const minimumBottom = window.innerWidth <= 900 ? (viewport < 650 ? 20 : 40) : readSpacing("--closing-min-bottom", 56);
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
    const copy = title.parentElement;
    const logo = root.querySelector(".closing-brand");
    const availableWidth = brand.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const layoutHeadline = size => {
      title.style.fontSize = size + "px";
      top = headlineTop;
      if (logo && copy.getBoundingClientRect().left < logo.getBoundingClientRect().right + 24) {
        top = Math.max(top, logo.offsetTop + logo.offsetHeight + 24);
      }
      bottom = minimumBottom;
      brand.style.paddingTop = top + "px";
      brand.style.paddingBottom = bottom + "px";
    };
    // Maximize the headline against both viewport axes, reserving the logo's space.
    let lower = 32;
    let upper = availableWidth;
    for (let iteration = 0; iteration < 12; iteration += 1) {
      const candidate = (lower + upper) / 2;
      layoutHeadline(candidate);
      if (title.scrollWidth <= availableWidth + .5 && component.getBoundingClientRect().height <= viewport) {
        lower = candidate;
      } else {
        upper = candidate;
      }
    }
    layoutHeadline(lower);
    const remaining = viewport - component.getBoundingClientRect().height;
    if (remaining > 0) {
      brand.style.paddingTop = (top + remaining / 2) + "px";
      brand.style.paddingBottom = (bottom + remaining / 2) + "px";
    }
    fittedWidth = window.innerWidth;
    fittedHeight = window.innerHeight;
    if (keepBottom) window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" });
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(fit);
  };
  const resize = () => {
    window.clearTimeout(resizeTimer);
    // Mobile browser chrome changes height during a swipe; fit once it settles.
    if (window.innerWidth <= 900 && window.innerWidth === fittedWidth) {
      resizeTimer = window.setTimeout(() => { resizeTimer = 0; schedule(); }, 180);
    } else schedule();
  };
  const scroll = () => {
    if (window.innerHeight === fittedHeight) atBottom = document.documentElement.scrollHeight - fittedHeight - window.scrollY <= 2;
    if (resizeTimer) resize();
  };
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("scroll", scroll, { passive: true });
  document.fonts.ready.then(schedule);
  bindings.set(root, () => {
    window.removeEventListener("resize", resize);
    window.removeEventListener("scroll", scroll);
    window.clearTimeout(resizeTimer);
    cancelAnimationFrame(frame);
  });
  fit();
}

export function clearBottomFit(root) {
  bindings.get(root)?.();
  bindings.delete(root);
}
