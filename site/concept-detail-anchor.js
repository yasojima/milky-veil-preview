// MENU measures the canonical CONCEPT copy at its actual column width.
// Only resize/font changes recalculate geometry; scrolling stays native CSS sticky.
export function bindConceptDetailAnchor() {
  bindConceptCardFrames();
  const template = document.getElementById("concept-detail-reference");
  const card = document.querySelector(".milky-detail-card");
  const content = card?.querySelector(".home-concept-box__content");
  const image = card?.querySelector(".home-concept-box__img");
  const inner = card?.closest(".home-concept__inner");
  if (!template || !content || !image || !inner) return;
  const section = inner.closest(".home-concept");
  const desktop = matchMedia("(min-width: 901px)");
  const measure = () => {
    if (!desktop.matches) { section.style.removeProperty("--concept-detail-bottom"); return; }
    const probe = document.createElement("div");
    probe.className = content.className;
    probe.inert = true;
    probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;width:${content.getBoundingClientRect().width}px;`;
    probe.append(template.content.cloneNode(true));
    card.append(probe);
    const referenceHeight = Math.max(image.getBoundingClientRect().height, probe.getBoundingClientRect().height);
    probe.remove();
    const actualHeight = Math.max(image.getBoundingClientRect().height, content.getBoundingClientRect().height);
    section.style.setProperty("--concept-detail-bottom", `${referenceHeight - actualHeight}px`);
  };
  const observer = new ResizeObserver(measure);
  observer.observe(content);
  observer.observe(image);
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

// Preserve typography and content; absorb small wrapping differences in outer padding.
function bindConceptCardFrames() {
  const reference = document.getElementById("concept-card-reference");
  if (!reference) return;
  const cards = [...document.querySelectorAll(".home-point-ingredient-box")];
  const originals = [...reference.content.querySelectorAll("article")];
  const measure = () => cards.forEach((card, index) => {
    card.style.removeProperty("padding-block");
    if (!originals[index]) return;
    const probe = card.cloneNode(true);
    probe.inert = true;
    probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;width:${card.getBoundingClientRect().width}px;`;
    card.after(probe);
    const basePadding = parseFloat(getComputedStyle(probe).paddingTop);
    const actualHeight = probe.getBoundingClientRect().height;
    for (const [field, selector] of Object.entries({ label: ".home-point-ingredient-box__head span", heading: ".home-point-ingredient-box__name", body: ".home-point-ingredient-box__txt" })) {
      probe.querySelector(selector).innerHTML = originals[index].querySelector(`[data-field="${field}"]`).innerHTML;
    }
    const referenceHeight = probe.getBoundingClientRect().height;
    probe.remove();
    card.style.paddingBlock = `${Math.max(16, basePadding + (referenceHeight - actualHeight) / 2)}px`;
  });
  const observer = new ResizeObserver(measure);
  cards.forEach(card => {
    observer.observe(card.querySelector(".home-point-ingredient-box__name"));
    observer.observe(card.querySelector(".home-point-ingredient-box__txt"));
  });
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
