import { mobileLayout as createMobileLayout } from "./responsive-policy.js";
const bindings = new WeakMap();

// One state owns the handoff from the page logo to the closing logo on every route.
export function bindClosingLogo(root) {
  if (bindings.has(root)) return;
  const logo = root.querySelector(".closing-brand");
  const component = root.querySelector("[data-shared-bottom-ui-component]");
  if (!logo || !component) return;
  const mobileLayout = createMobileLayout();
  let frame = 0;
  let heroWasOpen = false;
  let headerClosing = false;
  const update = () => {
    frame = 0;
    const bounds = component.getBoundingClientRect();
    const mobileMenuOpen = mobileLayout.matches && !!document.querySelector(".shared-nav-content.is-open");
    const entering = bounds.top < window.innerHeight && bounds.bottom > 0;
    const ready = entering && bounds.top + logo.offsetTop + logo.offsetHeight * .25 < window.innerHeight;
    const state = mobileMenuOpen ? "menu" : ready ? "active" : entering ? "entering" : "outside";
    document.documentElement.dataset.mvClosing = state;
    component.dataset.closingState = state;
    logo.classList.toggle("is-revealed", state === "active");
    logo.inert = state !== "active";
    const header = document.querySelector(".has-split-hero");
    const headerLogo = header?.querySelector(":scope > .menu-brand");
    if (headerLogo) {
      const heroOpen = !!document.querySelector(".js-home-mv.is-out");
      if (heroOpen) headerClosing = false;
      else if (heroWasOpen) headerClosing = true;
      heroWasOpen = heroOpen;
      const scene = [...document.querySelectorAll("[data-logo-scene]")].find(element => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        const end = element.dataset.logoSceneEnd && document.querySelector(element.dataset.logoSceneEnd);
        const visual = element.dataset.logoSceneVisual && element.querySelector(element.dataset.logoSceneVisual);
        const endBoundary = visual ? visual.getBoundingClientRect().bottom : window.innerHeight;
        if (end && end.getBoundingClientRect().top < endBoundary) return false;
        if (style.position !== "sticky") return false;
        return element.dataset.logoScene === "bottom"
          ? Math.abs(rect.bottom - window.innerHeight) <= 2
          : Math.abs(rect.top - (parseFloat(style.top) || 0)) <= 2 && rect.bottom > 180;
      });
      const intro = document.querySelector("[data-logo-intro-end]");
      const initialScene = intro && intro.getBoundingClientRect().top >= window.innerHeight;
      const headerState = mobileMenuOpen ? "menu" : entering ? "covered" : headerClosing ? "closing" : heroOpen ? (scene ? "scene" : initialScene ? "active" : "reading") : "behind-hero";
      header.dataset.logoState = headerState;
      headerLogo.inert = !["active", "scene", "menu"].includes(headerState);
    }
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  const resizeObserver = new ResizeObserver(schedule);
  resizeObserver.observe(component);
  const menuObserver = new MutationObserver(schedule);
  const observeMenu = () => {
    menuObserver.disconnect();
    const hero = document.querySelector(".js-home-mv");
    if (hero) menuObserver.observe(hero, { attributes: true, attributeFilter: ["class"] });
    document.querySelectorAll(".shared-nav-content").forEach(nav => menuObserver.observe(nav, { attributes: true, attributeFilter: ["class"] }));
    schedule();
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  document.addEventListener("mv:menu-mounted", observeMenu);
  observeMenu();
  update();
  bindings.set(root, () => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    document.removeEventListener("mv:menu-mounted", observeMenu);
    resizeObserver.disconnect();
    menuObserver.disconnect();
    cancelAnimationFrame(frame);
    delete document.documentElement.dataset.mvClosing;
    delete component.dataset.closingState;
    const header = document.querySelector(".has-split-hero");
    if (header) delete header.dataset.logoState;
  });
}

export function clearClosingLogo(root) {
  bindings.get(root)?.();
  bindings.delete(root);
}
