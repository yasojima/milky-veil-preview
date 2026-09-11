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
  const heroTrigger = document.querySelector(".js-home-mv-trigger");
  // Put the reference's center-bottom start just after the split hero opens.
  const positionTitle = () => {
    stage.style.paddingTop = `${Math.max(0, heroTrigger.offsetHeight + innerHeight - title.offsetHeight * .5)}px`;
  };
  positionTitle();
  ScrollTrigger.addEventListener("refreshInit", positionTitle);
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
      duration: .5,
      opacity: 1,
      // Reference: 13 characters with .05s between them = .6s total stagger.
      stagger: { amount: .6 },
      rotationX: 0,
      z: 0,
      scrollTrigger: {
        trigger: title,
        start: "center bottom",
        end: "bottom top+=20%",
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  });
  document.fonts.ready.then(() => ScrollTrigger.refresh());
  addEventListener("pagehide", event => {
    if (!event.persisted) {
      media.revert();
      ScrollTrigger.removeEventListener("refreshInit", positionTitle);
    }
  });
}
