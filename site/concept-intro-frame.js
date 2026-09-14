// Content fits the canonical frame; sticky rules and layer travel remain untouched.
export function fitConceptPointFrame() {
  const template = document.getElementById("concept-point02-frame");
  const section = document.getElementById("point02");
  if (!template || !section) return;
  const selectors = [
    ".home-point-section__inner",
    ".c-head01",
    ".c-head01__sub",
    ".c-head01 > .home-point-section__lead",
    ".c-head01__main",
    ".home-point-section__inner > .home-point-section__lead",
    ".home-point-section__note",
  ];
  const properties = ["box-sizing", "block-size", "padding-top", "padding-right", "padding-bottom", "padding-left", "margin-top", "margin-bottom"];
  const elements = selectors.map(selector => section.querySelector(selector));
  const measure = () => {
    elements.forEach(element => properties.forEach(property => element.style.removeProperty(property)));
    if (!matchMedia("(min-width: 901px)").matches) return;
    const probe = template.content.firstElementChild.cloneNode(true);
    probe.removeAttribute("id");
    probe.querySelectorAll("[id]").forEach(element => element.removeAttribute("id"));
    probe.inert = true;
    probe.style.cssText = `position:absolute;top:0;left:0;visibility:hidden;pointer-events:none;width:${section.getBoundingClientRect().width}px;`;
    section.after(probe);
    // The complete description frame and each text slot use the canonical rendered dimensions.
    selectors.forEach((selector, index) => {
      const reference = probe.querySelector(selector);
      const style = getComputedStyle(reference);
      properties.forEach(property => elements[index].style.setProperty(property, style.getPropertyValue(property)));
      elements[index].style.boxSizing = "border-box";
      elements[index].style.blockSize = `${reference.getBoundingClientRect().height}px`;
    });
    probe.remove();
  };
  let width = -1;
  const observer = new ResizeObserver(entries => {
    const nextWidth = entries[0].contentRect.width;
    if (nextWidth === width) return;
    width = nextWidth;
    measure();
  });
  observer.observe(section);
  let disposed = false;
  document.fonts.ready.then(() => { if (!disposed) measure(); });
  addEventListener("resize", measure);
  measure();
  addEventListener("pagehide", event => {
    if (event.persisted) return;
    disposed = true;
    observer.disconnect();
    removeEventListener("resize", measure);
  });
}

export function fitConceptIntroFrame() {
  const template = document.getElementById("concept-intro-frame");
  const inner = document.querySelector(".home-concept__inner");
  if (!template || !inner) return;
  const card = inner.querySelector(".milky-detail-card");
  const image = card.querySelector(".home-concept-box__img");
  const head = inner.querySelector(".home-concept__head");
  const before = [[inner, "padding-top", 16], [head, "margin-bottom", 8], [card, "margin-top", 8]];
  const after = [[inner, "padding-bottom", 16], [card, "padding-bottom", 16]];
  const gaps = [...before, ...after];
  const adjust = (items, difference) => {
    for (const [element, property, minimum] of items) {
      if (Math.abs(difference) < .01) break;
      const current = parseFloat(getComputedStyle(element).getPropertyValue(property));
      const change = difference > 0 ? difference : Math.max(difference, minimum - current);
      element.style.setProperty(property, `${current + change}px`);
      difference -= change;
    }
    return difference;
  };
  const measure = () => {
    gaps.forEach(([element, property]) => element.style.removeProperty(property));
    if (!matchMedia("(min-width: 901px)").matches) {
      inner.removeAttribute("data-frame-overflow");
      return;
    }
    const probe = template.content.firstElementChild.cloneNode(true);
    probe.removeAttribute("id");
    probe.querySelectorAll("[id]").forEach(element => element.removeAttribute("id"));
    probe.inert = true;
    probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;width:${inner.getBoundingClientRect().width}px;`;
    inner.after(probe);
    const referenceHeight = probe.getBoundingClientRect().height;
    const referenceOffset = probe.querySelector(".home-concept-box__img").getBoundingClientRect().top - probe.getBoundingClientRect().top;
    const actualOffset = image.getBoundingClientRect().top - inner.getBoundingClientRect().top;
    const remainingBefore = adjust(before, referenceOffset - actualOffset);
    const remainingAfter = adjust(after, referenceHeight - inner.getBoundingClientRect().height);
    probe.remove();
    // Excess copy stays readable rather than overflowing a forced-height frame.
    inner.toggleAttribute("data-frame-overflow", Math.abs(remainingBefore) > 1 || Math.abs(remainingAfter) > 1);
  };
  const observer = new ResizeObserver(measure);
  [head, inner.querySelector(".home-concept__txt"), image, card.querySelector(".home-concept-box__content")].forEach(element => observer.observe(element));
  addEventListener("resize", measure);
  let disposed = false;
  document.fonts.ready.then(() => { if (!disposed) measure(); });
  measure();
  addEventListener("pagehide", event => {
    if (event.persisted) return;
    disposed = true;
    observer.disconnect();
    removeEventListener("resize", measure);
  });
}
