// Motion adapted from Codrops OnScrollTypographyAnimations, effect19.
// License and source: vendor/codrops-typography/SOURCE.md.
export function mountConceptTypography(stage, name, { gsap }) {
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
  const hero = document.querySelector(".js-home-mv");
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
    gsap.set(chars, initial);
    const animation = gsap.fromTo(chars, initial, {
      paused: true,
      ease: "power1",
      opacity: 1,
      stagger: 0.05,
      rotationX: 0,
      z: 0,
      onComplete: () => stage.classList.add("is-end"),
    });
    // UNIPLEX bg_logo01.json: frames 0..92 at 24fps, default playback speed.
    animation.timeScale(animation.totalDuration() / (92 / 24));
    const syncHero = () => {
      stage.classList.remove("is-end");
      if (hero.classList.contains("is-out")) animation.restart();
      else animation.pause(0);
    };
    let wasOut = hero.classList.contains("is-out");
    syncHero();
    const observer = new MutationObserver(() => {
      const isOut = hero.classList.contains("is-out");
      if (isOut !== wasOut) {
        wasOut = isOut;
        syncHero();
      }
    });
    observer.observe(hero, { attributes: true, attributeFilter: ["class"] });
    return () => {
      observer.disconnect();
      stage.classList.remove("is-end");
    };
  });
  addEventListener("pagehide", event => {
    if (!event.persisted) {
      media.revert();
    }
  });
}
