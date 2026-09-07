const VENDOR_RUNTIME_SRC = "/milky-veil-preview/site/vendor/uniplex/wp-content/themes/uniplex/js/script.js?ver=1.0.4";
const TOC_RUNTIME_SRC = "https://uniplex.jp/wp-content/plugins/table-of-contents-plus/assets/front.min.js?ver=202608.2";
const POLL_INTERVAL_MS = 50;

let pollTimer = 0;

const hasVideoModals = () => Boolean(document.querySelector(".js-c-modal01-mov[data-yt-video-id]"));
const youtubePlayerReady = () => typeof window.YT?.Player === "function";

const loadVendorRuntime = () => {
  if (document.getElementById("jquery-js")) return;
  if (hasVideoModals() && !youtubePlayerReady()) {
    pollTimer = window.setTimeout(loadVendorRuntime, POLL_INTERVAL_MS);
    return;
  }

  const script = document.createElement("script");
  script.id = "jquery-js";
  script.src = VENDOR_RUNTIME_SRC;
  script.addEventListener("load", () => {
    const tocScript = document.createElement("script");
    tocScript.id = "toc-front-js";
    tocScript.src = TOC_RUNTIME_SRC;
    document.body.append(tocScript);
  }, { once: true });
  document.body.append(script);
};

loadVendorRuntime();

addEventListener("pagehide", () => {
  if (pollTimer) window.clearTimeout(pollTimer);
}, { once: true });
