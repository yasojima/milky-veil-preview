import { usesMobileLayout } from "./responsive-policy.js";
import { mobileClosingMetrics } from "./mobile-layout-policy.js?v=20260916-332";

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
  let fittedWidth = window.innerWidth;
  let fittedHeight = window.innerHeight;
  let fittedMobileHeight = 0;
  let atBottom = false;
  const centerHeadline = () => {
    const context = document.createElement("canvas").getContext("2d");
    const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
    let left = Infinity;
    let right = -Infinity;
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const textStyle = getComputedStyle(node.parentElement);
      context.font = `${textStyle.fontWeight} ${textStyle.fontSize} ${textStyle.fontFamily}`;
      for (let index = 0; index < node.length; index += 1) {
        if (/\s/.test(node.data[index])) continue;
        const range = document.createRange();
        range.setStart(node, index);
        range.setEnd(node, index + 1);
        const bounds = range.getBoundingClientRect();
        const ink = context.measureText(node.data[index]);
        left = Math.min(left, bounds.left - ink.actualBoundingBoxLeft);
        right = Math.max(right, bounds.left + ink.actualBoundingBoxRight);
      }
    }
    if (Number.isFinite(left) && Number.isFinite(right)) {
      title.parentElement.style.setProperty("--closing-group-offset", (document.documentElement.clientWidth / 2 - (left + right) / 2) + "px");
    }
  };
  const fit = () => {
    frame = 0;
    if (!component.isConnected) return;
    const keepBottom = atBottom && (fittedHeight !== window.innerHeight || fittedWidth !== window.innerWidth);

    brand.style.removeProperty("padding-top");
    brand.style.removeProperty("padding-bottom");
    title.style.removeProperty("font-size");
    title.style.removeProperty("line-height");
    rule.style.removeProperty("padding-bottom");
    footer.style.removeProperty("padding-top");
    footer.style.removeProperty("padding-bottom");
    tickers.forEach(ticker => ticker.style.removeProperty("font-size"));
    title.parentElement.style.removeProperty("--closing-group-offset");
    if (getComputedStyle(brand).display === "none") {
      fittedWidth = window.innerWidth;
      fittedHeight = window.innerHeight;
      fittedMobileHeight = parseFloat(getComputedStyle(component).minHeight);
      if (keepBottom) window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" });
      return;
    }
    const viewport = usesMobileLayout() ? parseFloat(getComputedStyle(component).minHeight) : window.innerHeight;
    const style = getComputedStyle(brand);
    const metrics = mobileClosingMetrics(viewport);
    const { headlineTop, minimumBottom } = metrics;
    if (metrics.lineHeight !== null) title.style.lineHeight = metrics.lineHeight;
    // The large viewport stays stable while mobile browser chrome expands or retracts.
    if (usesMobileLayout()) {
      const logo = root.querySelector(".closing-brand");
      const targetHeight = parseFloat(getComputedStyle(component).minHeight);
      const layoutMobileHeadline = size => {
        title.style.fontSize = size + "px";
        const overlapsLogo = logo && title.parentElement.getBoundingClientRect().left < logo.getBoundingClientRect().right + 16;
        const logoClearance = logo && (viewport > 600 || window.innerWidth <= 600 || overlapsLogo) ? parseFloat(getComputedStyle(logo).top) + logo.offsetHeight + 12 : 0;
        brand.style.paddingTop = Math.max(viewport <= 600 ? 24 : headlineTop, logoClearance) + Math.max(0, targetHeight - viewport) + "px";
      };
      brand.style.paddingBottom = minimumBottom + "px";
      const availableWidth = brand.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);

      const shortfall = Math.max(0, 600 - targetHeight);
      brand.style.paddingBottom = Math.max(8, (minimumBottom - shortfall * .12) * 2 / 3) + "px";
      rule.style.paddingBottom = Math.max(8, 20 - shortfall * .4) + "px";
      footer.style.paddingBottom = Math.max(10, 16 - shortfall * .2) + "px";
      let lower = 32;
      let upper = availableWidth;
      for (let iteration = 0; iteration < 12; iteration += 1) {
        const candidate = (lower + upper) / 2;
        layoutMobileHeadline(candidate);
        if (title.scrollWidth <= availableWidth + .5 && component.getBoundingClientRect().height <= targetHeight) lower = candidate;
        else upper = candidate;
      }
      let headlineSize = Math.max(32, lower * .9);
      if (window.innerWidth > 450 && window.innerWidth <= 600 && window.innerWidth <= window.innerHeight && viewport > 600) {
        const supporting = title.nextElementSibling;
        const supportingStyle = getComputedStyle(supporting);
        const canvas = document.createElement("canvas").getContext("2d");
        canvas.font = supportingStyle.font;
        const spacing = parseFloat(supportingStyle.letterSpacing) || 0;
        const lineWidth = Math.max(...[...supporting.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).map(node => canvas.measureText(node.textContent).width + spacing * node.textContent.length));
        title.style.fontSize = headlineSize + "px";
        const wordWidths = [...title.querySelectorAll(".brand-headline-word")].map(word => {
          const range = document.createRange();
          range.selectNodeContents(word);
          return range.getBoundingClientRect().width;
        });
        const headlineWidth = Math.max(...wordWidths);
        // Keep the shared left edge and two-line supporting copy without shifting the headline alone.
        if (lineWidth + 2 <= availableWidth) headlineSize = Math.max(headlineSize, headlineSize * (lineWidth + 2) / headlineWidth);
      }
      layoutMobileHeadline(headlineSize);
      if (window.innerWidth > 450) centerHeadline();
      fittedWidth = window.innerWidth;
      fittedHeight = window.innerHeight;
      fittedMobileHeight = targetHeight;
      if (keepBottom) window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" });
      return;
    }
    const availableWidth = brand.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const preferredSize = parseFloat(getComputedStyle(title).fontSize);
    let lower = 32;
    let upper = preferredSize;
    for (let iteration = 0; iteration < 12; iteration += 1) {
      const candidate = (lower + upper) / 2;
      title.style.fontSize = candidate + "px";
      if (title.scrollWidth <= availableWidth + .5) lower = candidate;
      else upper = candidate;
    }
    title.style.fontSize = lower + "px";
    centerHeadline();
    fittedWidth = window.innerWidth;
    fittedHeight = window.innerHeight;
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
    if (window.innerHeight === fittedHeight) atBottom = document.documentElement.scrollHeight - fittedHeight - window.scrollY <= 2;
  };
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("scroll", scroll, { passive: true });
  document.fonts.ready.then(schedule);
  bindings.set(root, () => {
    window.removeEventListener("resize", resize);
    window.removeEventListener("scroll", scroll);
    cancelAnimationFrame(frame);
  });
  fit();
}

export function clearBottomFit(root) {
  bindings.get(root)?.();
  bindings.delete(root);
}
