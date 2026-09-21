// Mobile layout owns its fitting rules independently of the desktop composition.
export function fitMobileBottom({ component, brand, copy, title, eyebrow, supporting, logo, tickers, targetHeight }) {
  if (window.innerHeight > 600) {
      const style = getComputedStyle(brand);
      const availableWidth = brand.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const logoClearance = logo ? parseFloat(getComputedStyle(logo).top) + logo.offsetHeight + 12 : 0;
      brand.style.paddingTop = Math.max(92, logoClearance) + "px";
      brand.style.paddingBottom = "16px";
      let lower = 32;
      let upper = availableWidth;
      for (let iteration = 0; iteration < 12; iteration += 1) {
        const candidate = (lower + upper) / 2;
        title.style.fontSize = candidate + "px";
        if (title.scrollWidth <= availableWidth + .5 && component.getBoundingClientRect().height <= targetHeight + .5) lower = candidate;
        else upper = candidate;
      }
      title.style.fontSize = Math.max(32, lower * .9) + "px";
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
}
