import { sharedSocials } from "./shared-site-data.js?v=20260906-02&pages=20260911-122";

export function socialIcons() {
  return `<div class="social-icons" aria-label="SNS（デモ・リンク未設定）">
    ${sharedSocials.map(({name,file})=>`<span class="social-icon social-${name.toLowerCase()}" title="${name}"><img src="/milky-veil-preview/assets/ui/social/${file}" alt="${name}"></span>`).join("")}
  </div>`;
}

export function translationControl(id = "header") {
  const menuId = `translate-menu-${id}`;
  return `<div class="translate-control">
    <button class="translate-toggle" type="button" aria-expanded="false" aria-controls="${menuId}" aria-label="表示言語を選択">
      <img src="/milky-veil-preview/assets/ui/translation/translate-material-white-96.png" alt="">
    </button>
    <div id="${menuId}" class="translate-menu" aria-hidden="true" inert>
      <p>言語を選択</p>
      <div id="google-translate-${id}" class="google-translate-widget" data-google-translate></div>
      <small>Google 翻訳でページ本文を切り替えます。</small>
    </div>
  </div>`;
}

