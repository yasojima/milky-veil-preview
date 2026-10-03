// Mobile layout owns its fitting rules independently of the desktop composition.
export function fitMobileBottom({ component, brand, copy, title, eyebrow, supporting, logo, tickers, targetHeight }) {
  supporting.style.removeProperty("width");
  supporting.style.removeProperty("translate");
  eyebrow.style.removeProperty("--closing-eyebrow-offset");
  if (window.innerHeight > 600) {
      const style = getComputedStyle(brand);
      const availableWidth = brand.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const words = [...title.querySelectorAll(".brand-headline-word")];
      const stackedWords = words.length > 0 && getComputedStyle(words[0]).display === "block";
      const logoClearance = logo ? parseFloat(getComputedStyle(logo).top) + logo.offsetHeight + 12 : 0;
      brand.style.paddingTop = Math.max(92, logoClearance) + "px";
      brand.style.paddingBottom = "12px";
      let lower = 32;
      let upper = availableWidth;
      for (let iteration = 0; iteration < 12; iteration += 1) {
        const candidate = (lower + upper) / 2;
        title.style.fontSize = candidate + "px";
        // Fit intrinsic line widths independently of the visual glyph centering offsets.
        const headlineWidth = stackedWords ? Math.max(...words.map(word => word.scrollWidth)) : title.scrollWidth;
        if (headlineWidth <= availableWidth + .5 && component.getBoundingClientRect().height <= targetHeight + .5) lower = candidate;
        else upper = candidate;
      }
      title.style.fontSize = Math.max(32, lower) + "px";
  } else {
    if (getComputedStyle(brand).display !== "none") {
      const style = getComputedStyle(brand);
      if (window.innerWidth <= 600 && logo) brand.style.paddingTop = (parseFloat(getComputedStyle(logo).top) + logo.offsetHeight + 12) + "px";
      else if (logo) brand.style.paddingInline = Math.max(parseFloat(style.paddingLeft), logo.getBoundingClientRect().right + 16) + "px";
      const availableWidth = brand.clientWidth - parseFloat(getComputedStyle(brand).paddingLeft) - parseFloat(getComputedStyle(brand).paddingRight);
      const eyebrowMaximum = parseFloat(getComputedStyle(eyebrow).fontSize);
      const supportingMaximum = parseFloat(getComputedStyle(supporting).fontSize);
      const gapMaximum = parseFloat(getComputedStyle(copy).rowGap);
      const preferredTitle = parseFloat(getComputedStyle(title).fontSize);
      const tickerMaximum = parseFloat(getComputedStyle(tickers[0]).fontSize);
      tickers.forEach(ticker => ticker.style.setProperty("font-size", Math.min(tickerMaximum, Math.max(28, targetHeight * .075)) + "px", "important"));
      const applySize = size => {
        const scale = Math.min(1, size / 120);
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
  if (logo && eyebrow) {
    const image = logo.querySelector("img").getBoundingClientRect();
    // The lower monogram tip is at x=269 in the shared logo's 497px-wide source.
    const tipX = image.left + image.width * 269 / 497;
    eyebrow.style.setProperty("--closing-eyebrow-offset", (tipX - eyebrow.getBoundingClientRect().left) + "px");
  }
  if (getComputedStyle(brand).display !== "none") {
    const lines = document.createRange();
    lines.selectNodeContents(supporting);
    const lineWidth = Math.max(...[...lines.getClientRects()].map(rect => rect.width));
    if (lineWidth > 0) supporting.style.width = Math.ceil(lineWidth) + "px";
    const textLines = new Map();
    for (const node of supporting.childNodes) {
      if (node.nodeType !== Node.TEXT_NODE) continue;
      for (let index = 0; index < node.length; index += 1) {
        lines.setStart(node, index);
        lines.setEnd(node, index + 1);
        const rect = lines.getBoundingClientRect();
        const key = Math.round(rect.y);
        if (!textLines.has(key)) textLines.set(key, { left:rect.left, right:rect.right, last:"" });
        const line = textLines.get(key);
        line.right = rect.right;
        line.last = node.textContent[index];
      }
    }
    const longest = [...textLines.values()].sort((a,b) => (b.right-b.left)-(a.right-a.left))[0];
    // The shared Japanese font leaves a wider blank after a final full stop.
    supporting.style.translate = longest?.last === "。" ? ".32em 0" : ".05em 0";
  }
}
