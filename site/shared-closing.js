const bindings = new WeakMap();

// One state owns the handoff from the page logo to the closing logo on every route.
export function bindClosingLogo(root) {
  if (bindings.has(root)) return;
  const logo = root.querySelector(".closing-brand");
  const component = root.querySelector("[data-shared-bottom-ui-component]");
  if (!logo || !component) return;
  let frame = 0;
  const update = () => {
    frame = 0;
    const bounds = component.getBoundingClientRect();
    const menuOpen = !!document.querySelector(".shared-nav-content.is-open");
    const entering = bounds.top < window.innerHeight && bounds.bottom > 0;
    const ready = entering && bounds.top + logo.offsetTop + logo.offsetHeight * .25 < window.innerHeight;
    const state = menuOpen ? "menu" : ready ? "active" : entering ? "entering" : "outside";
    document.documentElement.dataset.mvClosing = state;
    component.dataset.closingState = state;
    logo.classList.toggle("is-revealed", state === "active");
    logo.inert = state !== "active";
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  const resizeObserver = new ResizeObserver(schedule);
  resizeObserver.observe(component);
  const menuObserver = new MutationObserver(schedule);
  const observeMenu = () => {
    menuObserver.disconnect();
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
  });
}

export function clearClosingLogo(root) {
  bindings.get(root)?.();
  bindings.delete(root);
}
