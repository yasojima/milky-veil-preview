const activities = new Map();
let observer;
function update(record) {
  const active = record.visible && !document.hidden;
  if (active !== record.active) {
    record.active = active;
    record.callback(active);
  }
}
function visibilityChanged() { activities.forEach(update); }

export function observeActivity(element, callback) {
  if (!observer) {
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const record = activities.get(entry.target);
        if (record) { record.visible = entry.isIntersecting; update(record); }
      }
    }, { rootMargin: "100px" });
    document.addEventListener("visibilitychange", visibilityChanged);
  }
  const record = { visible: false, active: undefined, callback };
  activities.set(element, record);
  update(record);
  observer.observe(element);
  return () => {
    observer.unobserve(element);
    activities.delete(element);
    if (!activities.size) {
      observer.disconnect();
      observer = null;
      document.removeEventListener("visibilitychange", visibilityChanged);
    }
  };
}

export function bindAmbientMotion(root) {
  const cleanups = [...root.querySelectorAll(".shared-footer-ticker, .home-movie")]
    .map(element => observeActivity(element, active => element.classList.toggle("motion-is-idle", !active)));
  return () => cleanups.forEach(dispose => dispose());
}
