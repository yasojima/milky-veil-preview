// Motion adapted from Codrops OnScrollTypographyAnimations, effect19.
// License and source: vendor/codrops-typography/SOURCE.md.
export function mountConceptTypography(stage, name, { gsap, ScrollTrigger }) {
  const title = document.createElement("div");
  title.className = "concept-type-title";
  title.setAttribute("aria-label", name);
  for (const word of name.trim().split(/\s+/u)) {
    const row = document.createElement("span");
    row.className = "concept-type-word";
    for (const { segment } of new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(word)) {
      const char = document.createElement("span");
      char.className = "concept-type-char";
      char.textContent = segment;
      row.append(char);
    }
    title.append(row);
  }
  stage.replaceChildren(title);
  const chars = title.querySelectorAll(".concept-type-char");
  const region = stage.parentElement;
  const heroTrigger = document.querySelector(".js-home-mv-trigger");
  const startOffset = () => heroTrigger.offsetHeight;
  // Translate the reference's center-bottom / bottom-top+20% travel
  // past the split hero, which otherwise conceals the animation's first half.
  const travel = () => innerHeight * .8 + title.offsetHeight * .5;
  const sizeRegion = () => { region.style.height = `${startOffset() + travel() + innerHeight}px`; };
  sizeRegion();
  ScrollTrigger.addEventListener("refreshInit", sizeRegion);
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", () => {
    chars.forEach(char => gsap.set(char.parentNode, { perspective: 1000 }));
    const initial = {
      "will-change": "opacity, transform",
      transformOrigin: "50% 0%",
      opacity: 0,
      rotationX: -90,
      z: -200
    };
    // Keep not-yet-started stagger targets hidden when the scrub seeks backward.
    gsap.set(chars, initial);
    gsap.fromTo(chars, initial, {
      ease: "power1",
      opacity: 1,
      stagger: 0.05,
      rotationX: 0,
      z: 0,
      scrollTrigger: {
        trigger: region,
        start: () => `top top-=${startOffset()}`,
        end: () => `+=${travel()}`,
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  });
  document.fonts.ready.then(() => ScrollTrigger.refresh());
  addEventListener("pagehide", event => {
    if (!event.persisted) {
      media.revert();
      ScrollTrigger.removeEventListener("refreshInit", sizeRegion);
    }
  });
}
