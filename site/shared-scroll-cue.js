function normalizeFragmentTarget(target) {
  return typeof target === "string" && /^#[A-Za-z][\w:.-]*$/.test(target) ? target : "#main";
}

export function sharedScrollCueMarkup({ target, ariaLabel }) {
  const href = normalizeFragmentTarget(target);
  const label = typeof ariaLabel === "string" && ariaLabel.trim()
    ? ariaLabel.trim()
    : "次のセクションへ移動";
  return `<div class="shared-scroll-cue" data-shared-scroll-cue>
    <a class="shared-scroll-cue__link" href="${href}" aria-label="${label}">SCROLL DOWN</a>
    <i class="shared-scroll-cue__line" aria-hidden="true"></i>
  </div>`;
}

export function mountSharedScrollCue(host, options) {
  if (!(host instanceof HTMLElement)) return null;
  host.querySelector("[data-shared-scroll-cue]")?.remove();
  host.insertAdjacentHTML("beforeend", sharedScrollCueMarkup(options));
  return host.querySelector("[data-shared-scroll-cue]");
}
