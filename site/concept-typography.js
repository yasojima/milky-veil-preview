// Motion adapted from Codrops OnScrollTypographyAnimations, effect19.
// License and source: vendor/codrops-typography/SOURCE.md.
function bindMobileTypography(stage, title, hero) {
  // Browser-owned opacity/translation avoids per-frame glyph scaling on iOS.
  const rows = [...title.children];
  const animations = rows.map((row, index) => {
    const animation = row.animate([
      { opacity: 0, transform: "translate3d(0, 24px, 0)", offset: 0 },
      { opacity: 1, transform: "translate3d(0, 0, 0)", offset: .45 },
      { opacity: 1, transform: "translate3d(0, 0, 0)", offset: .85 },
      { opacity: 0, transform: "translate3d(12px, 8px, 0)", offset: 1 },
    ], { duration: 4000 - index * 100, delay: index * 100, fill: "both", easing: "ease-in-out" });
    animation.pause();
    return animation;
  });
  animations.at(-1).onfinish = () => stage.classList.add("is-end");
  const sync = () => {
    stage.classList.remove("is-end");
    animations.forEach(animation => {
      animation.pause();
      animation.currentTime = 0;
      if (hero.classList.contains("is-out")) animation.play();
    });
  };
  let wasOut = hero.classList.contains("is-out");
  sync();
  const observer = new MutationObserver(() => {
    const isOut = hero.classList.contains("is-out");
    if (isOut !== wasOut) { wasOut = isOut; sync(); }
  });
  observer.observe(hero, { attributes: true, attributeFilter: ["class"] });
  return () => {
    observer.disconnect();
    animations.forEach(animation => animation.cancel());
    stage.classList.remove("is-end");
  };
}

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
  media.add({ motion: "(prefers-reduced-motion: no-preference)", mobile: "(max-width: 900px)" }, context => {
    if (!context.conditions.motion) return;
    if (context.conditions.mobile) return bindMobileTypography(stage, title, hero);
    chars.forEach(char => gsap.set(char.parentNode, { perspective: 1000 }));
    const initial = {
      "will-change": "opacity, transform",
      transformOrigin: "50% 0%",
      opacity: 0,
      rotationX: -90,
      z: -200
    };
    gsap.set(chars, initial);
    const animation = gsap.timeline({ paused: true }).fromTo(chars, initial, {
      duration: 3 - (chars.length - 1) * 0.05,
      ease: "power1",
      opacity: 1,
      stagger: 0.05,
      rotationX: 0,
      z: 0,
    }).call(() => stage.classList.add("is-end"), [], 4);
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
