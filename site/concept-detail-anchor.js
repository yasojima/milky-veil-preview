// MENU measures the canonical CONCEPT copy at its actual column width.
// Only resize/font changes recalculate geometry; scrolling stays native CSS sticky.
export function bindConceptDetailAnchor() {
  const template = document.getElementById("concept-detail-reference");
  const card = document.querySelector(".milky-detail-card");
  const content = card?.querySelector(".home-concept-box__content");
  const image = card?.querySelector(".home-concept-box__img");
  const inner = card?.closest(".home-concept__inner");
  if (!template || !content || !image || !inner) return;
  const desktop = matchMedia("(min-width: 901px)");
  const measure = () => {
    if (!desktop.matches) { inner.style.removeProperty("--concept-detail-bottom"); return; }
    const probe = document.createElement("div");
    probe.className = content.className;
    probe.inert = true;
    probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;width:${content.getBoundingClientRect().width}px;`;
    probe.append(template.content.cloneNode(true));
    card.append(probe);
    const referenceHeight = Math.max(image.getBoundingClientRect().height, probe.getBoundingClientRect().height);
    probe.remove();
    const actualHeight = Math.max(image.getBoundingClientRect().height, content.getBoundingClientRect().height);
    inner.style.setProperty("--concept-detail-bottom", `${referenceHeight - actualHeight}px`);
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
