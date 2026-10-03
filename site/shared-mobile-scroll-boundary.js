import { usesMobileLayout } from "./responsive-policy.js";

let bound = false;

// Older WebKit ports lack overscroll-behavior; leave ordinary and nested scrolling native.
export function bindMobileScrollBoundary() {
  if (bound || CSS.supports("overscroll-behavior-y", "none")) return;
  bound = true;
  let touch = null;
  window.addEventListener("touchstart", event => {
    touch = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  }, { passive: true });
  window.addEventListener("touchmove", event => {
    if (!touch || !usesMobileLayout() || event.touches.length !== 1) return;
    const current = event.touches[0];
    const dx = current.clientX - touch.x;
    const dy = current.clientY - touch.y;
    touch = { x: current.clientX, y: current.clientY };
    if (!dy || Math.abs(dx) >= Math.abs(dy)) return;
    const nestedCanScroll = event.composedPath().some(element => {
      if (!(element instanceof HTMLElement) || element === document.body || element === document.documentElement) return false;
      if (!/auto|scroll/.test(getComputedStyle(element).overflowY) || element.scrollHeight <= element.clientHeight + 1) return false;
      return dy > 0 ? element.scrollTop > 0 : element.scrollTop < element.scrollHeight - element.clientHeight - 1;
    });
    if (nestedCanScroll) return;
    const limit = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const atBoundary = dy > 0 ? window.scrollY <= 0 : window.scrollY >= limit - 1;
    if (atBoundary && event.cancelable) event.preventDefault();
  }, { passive: false });
  const clear = () => { touch = null; };
  window.addEventListener("touchend", clear, { passive: true });
  window.addEventListener("touchcancel", clear, { passive: true });
}
