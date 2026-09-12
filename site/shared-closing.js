const observers = new WeakMap();

export function bindClosingLogo(root) {
  if (observers.has(root)) return;
  const logo = root.querySelector(".closing-brand");
  if (!logo) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) logo.classList.toggle("is-revealed", entry.isIntersecting);
  }, { threshold: 0.25 });
  observer.observe(logo);
  observers.set(root, observer);
}

export function clearClosingLogo(root) {
  observers.get(root)?.disconnect();
  observers.delete(root);
}
