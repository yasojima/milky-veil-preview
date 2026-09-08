const dialog = document.createElement("dialog");
dialog.className = "menu-movie-dialog";
dialog.setAttribute("aria-label", "店内紹介動画");
dialog.innerHTML = '<button type="button" class="menu-movie-close" aria-label="動画を閉じる">閉じる ×</button><video controls playsinline preload="metadata"></video><p role="status" hidden>動画を読み込めませんでした。再度お試しください。</p>';
document.body.append(dialog);
const player = dialog.querySelector("video");
const status = dialog.querySelector('[role="status"]');
dialog.querySelector("button").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => {
  player.pause();
  player.removeAttribute("src");
  player.load();
});
player.addEventListener("error", () => { status.hidden = false; });
document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-menu-movie]");
  if (!trigger) return;
  status.hidden = true;
  player.src = trigger.dataset.menuMovie;
  dialog.showModal();
  player.play().catch(() => { /* Native controls remain available if autoplay is denied. */ });
});
