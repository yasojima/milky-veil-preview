if (new URLSearchParams(location.search).get("point-check") === "background-end") {
  document.documentElement.dataset.pointBackgroundCheck = "end";
  const label = document.createElement("span");
  label.className = "point-background-check-label";
  label.textContent = "比較版：水色のはみ出し停止";
  document.body.append(label);
}

// Match the reference's 30ms character stagger and six substitutions per letter.
const title = document.querySelector("[data-menu-point] .menu-point-title");
if (title) {
  const text = title.textContent.trim();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/!@#$%&()[]{}|;:?+-=~*^,.<>_";
  let timer;
  title.textContent = "";
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    let tick = 0;
    timer = setInterval(() => {
      tick += 1;
      title.textContent = [...text].map((letter, index) => {
        if (tick <= index) return "";
        return tick - index <= 6 ? alphabet[Math.floor(Math.random() * alphabet.length)] : letter;
      }).join("");
      if (tick >= text.length + 6) {
        clearInterval(timer);
        title.textContent = text;
      }
    }, 30);
  }, { rootMargin: "0% 0% -25% 0%", threshold: 0 });
  observer.observe(title);
  addEventListener("pagehide", () => {
    observer.disconnect();
    clearInterval(timer);
    title.textContent = text;
  }, { once: true });
}
