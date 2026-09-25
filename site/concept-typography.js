// Motion adapted from Codrops OnScrollTypographyAnimations, effect19.
// License and source: vendor/codrops-typography/SOURCE.md.
export function createConceptTypography(stage, name) {
  const title = document.createElement("div");
  title.className = "concept-type-title";
  title.classList.add("notranslate");
  title.setAttribute("translate", "no");
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
  return title.querySelectorAll(".concept-type-char");
}

export function mountConceptTypography(stage, name, { gsap }) {
  const chars = createConceptTypography(stage, name);
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

export async function playHomeConceptTypography(stage, name) {
  const chars = createConceptTypography(stage, name);
  const duration = 3000 - (chars.length - 1) * 50;
  const animations = [...chars].map((char, index) => {
    char.parentNode.style.perspective = "1000px";
    char.style.transformOrigin = "50% 0%";
    return char.animate([
      { opacity: 0, transform: "translateZ(-200px) rotateX(-90deg)" },
      { opacity: 1, transform: "translateZ(0) rotateX(0deg)" },
    ], { duration, delay: index * 50, easing: "cubic-bezier(.333333,.666667,.666667,1)", fill: "forwards" });
  });
  await Promise.all(animations.map(animation => animation.finished));
  await new Promise(resolve => setTimeout(resolve, 1000));
}
