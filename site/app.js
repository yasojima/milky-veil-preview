import { usesMobileLayout, layoutQueries } from "./responsive-policy.js";
import { staffPageContent } from "./staff-page-content.js?v=20260917-351";
import { MENU_MOVIE_ASSETS } from "./shared-salon-videos.js";
import { translationSettings, storedTranslationLanguage, ensureGoogleTranslate, mountGoogleTranslateWidgets, selectTranslationTarget } from "./shared-translation.js?v=20260922-512";
import { socialIcons, translationControl } from "./shared-social-tools.js";
import { resolveMedia, responsiveSrcset } from "./responsive-media.js?v=20260917-351";
import { reservationLabel, showContactDemo } from "./shared-contact-details.js?v=20260913-244";
import { bindSharedFixedShell } from "./shared-fixed-shell.js?v=20260926-546";
import { clearSharedBottomUi, mountSharedBottomUi, sharedBottomUiReady } from "./shared-bottom-ui.js?v=20260919-425&closing=20260922-530&contact=20260926-546&privacy=20260926-552&footer=20260927-586";
import { sharedScrollCueMarkup } from "./shared-scroll-cue.js?v=20260902-01";
import { bindSharedConceptMenu, mountSharedConceptMenu, sharedConceptMenuMarkup, sharedHeaderLogoLink } from "./shared-concept-menu.js?v=20260926-551";
import { sharedBrandLogo, sharedBrandEyebrow, sharedBrandHeadlineLines, sharedBrandSupportingLines, sharedPrimaryRouteIds, sharedPrivacyPolicyAnchorId, sharedRouteIds, sharedRouteRegistry, sharedSalonData, sharedSecondaryRouteIds, sharedSocials } from "./shared-site-data.js?v=20260926-552";
import { applySharedDocumentBrand } from "./shared-document-brand.js?v=20260922-513";
import { createConceptTypography } from "./concept-typography.js?v=20260926-538";

const A = "/milky-veil-preview/assets/generated/";
const P = `${A}light-salon-pack/`;
const HF = `${A}home-feature-roles-v1/`;

const routeRegistry = sharedRouteRegistry;
const routeIds = sharedRouteIds;
const routeIdByPath = Object.freeze(Object.fromEntries(routeIds.map((id) => [routeRegistry[id].path, id])));
const routePath = (id) => routeRegistry[id].path;
const navPrimary = sharedPrimaryRouteIds;
const navSecondary = sharedSecondaryRouteIds;
const homeHeroMedia = Object.freeze({
  type: "image",
  src: `${A}home-owner-4k-v1/home-hero-owner-4k-v1.png`,
  alt: "白い店内でヘアカットを受ける女性",
  fetchPriority: "high",
});
const shellData = Object.freeze({
  salon: sharedSalonData,
  socials: sharedSocials,
  navigation: Object.freeze({
    primary: navPrimary,
    secondary: navSecondary,
  }),
  actions: Object.freeze({
    contact: Object.freeze({ kind: "route", routeId: "contact", label: "お問い合わせはこちら" }),
    demoReservation: Object.freeze({ kind: "demo", label: reservationLabel }),
    translate: translationSettings,
  }),
});

const pageCopy = {
  CONCEPT: {
    text: "髪の履歴と今の状態を丁寧に読み取り、仕上がりだけでなく色落ちの途中まできれいなデザインをつくります。",
  },
  STAFF: {
    lead: "6つの感性で、ひとりの“好き”を形に。",
    text: "得意な色、質感、シルエットが異なる6名のスタイリストが、一人ひとりのなりたいムードへ向き合います。",
  },
  MENU: {
    lead: "デザインカラーを軸に、必要なメニューを組み合わせる。",
    text: "下記はデモ用の仮メニュー・仮価格です。履歴や長さに合わせて無理のない施術プランをご案内します。",
  },
  ITEMS: {
    lead: "きれいな色を、家でも長く楽しむ。",
    text: "ブリーチ毛、カラーヘア、パーマヘアのためのホームケアを、毎日続けやすい形でご提案します。",
  },
  ACCESS: {
    lead: "渋谷の街から、少しだけ気分を切り替える場所へ。",
    text: "白と乳白色を基調にした明るい空間で、カラーを相談しやすい落ち着いた時間をご用意します。",
  },
  CONTACT: { lead: "ご相談・お問い合わせ", text: "こちらはデモフォームです。入力内容は送信・保存されません。" },
  "PRIVACY POLICY": { lead: "プライバシーポリシー", text: "MILKY VEILにおけるお客様の個人情報の取り扱いについてご案内します。" },
};

const homeSplitSections = Object.freeze([
  Object.freeze({
    label: "CONCEPT",
    heading: Object.freeze(["カラーをもっと自由に"]),
    text: "髪への負担に配慮しながら<br>ブリーチでつくる明るさや透明感まで丁寧に調整<br>あなたらしい髪色をデザインします。",
    image: `${P}02-concept-closeup-purple.png`,
    reverse: false,
    routeId: "concept",
    sectionId: "concept-home",
  }),
  Object.freeze({
    label: "MENU",
    heading: Object.freeze(["自分らしく似合わせる"]),
    text: "今の気分やトレンドを取り入れながら<br>デザインカラーを軸にカットや質感を組み合わせて<br>骨格や髪質とファッションに合うバランスに仕上げます。",
    image: `${A}home-role-locked-pack-v1/home-service-customer-05-v1.png`,
    reverse: true,
    routeId: "menu",
    sectionId: "menu-home",
  }),
]);

const homeFeatureCards = [
  ["COLOR", `${HF}color-lavender-customer-v2.png`, "LAVENDER", "ラベンダー"],
  ["TEXTURE", `${HF}texture-white-bob-customer-v2.png`, "WHITE BOB", "ホワイトボブ"],
  ["SILHOUETTE", `${HF}silhouette-long-blonde-customer-v2.png`, "BLONDE", "ブロンド"],
  ["MOOD", `${HF}mood-root-white-bob-customer-v3.png`, "ROOT SHADOW", "ルーツシャドウ"],
  ["IDENTITY", `${HF}identity-white-purple-updo-customer-v3.png`, "TWO-TONE", "ツートーン"],
];

const staffProfiles = Object.freeze([
  Object.freeze({
    name: "MIU",
    role: "STYLIST",
    image: staffPageContent.detail.src,
    career: "4年",
    specialty: "ペールブロンド / ホワイトカラー",
    design: "ミルキー・ガーリー・透明感",
    technique: "ケアブリーチ / ムラ修正 / 色落ちまでの設計",
    profile: "ペールトーンでも肌が沈まない、やわらかな白さと透け感を大切にしています。初めてのブリーチも不安が残らないよう、必要な工程とおうちでのケアまで丁寧にお伝えします。",
  }),
  Object.freeze({
    name: "RENA",
    role: "STYLIST",
    image: `${A}staff-shibuya/staff-rena-editorial-v4.png`,
    career: "6年",
    specialty: "デザインカラー / ヘアセット",
    design: "モード・エッジ・フォトジェニック",
    technique: "コントラストカラー / 質感を生かす似合わせセット",
    profile: "ファッションやメイクの空気まで含めた、少しエッジのあるデザインが得意です。写真に残したくなる存在感と、毎日扱いやすいバランスをどちらも大切に仕上げます。",
  }),
  Object.freeze({
    name: "YUNA",
    role: "STYLIST",
    image: `${A}staff-shibuya/staff-yuna-editorial-v4.png`,
    career: "5年",
    specialty: "エクステ / 顔まわりデザイン",
    design: "韓国ムード・ロング・やわらかい質感",
    technique: "地毛になじむエクステ / 顔まわりレイヤー",
    profile: "長さを足すだけではなく、顔まわりと毛流れまで自然につながるエクステをご提案します。巻いた日もストレートの日も重く見えない、軽やかなロングバランスにこだわります。",
  }),
  Object.freeze({
    name: "SORA",
    role: "STYLIST",
    image: `${A}staff-shibuya/staff-sora-editorial-v4.png`,
    career: "3年",
    specialty: "ボブ / ショート / ストレート",
    design: "ミニマル・クリーン・タイト",
    technique: "ラインカット / やわらかなナチュラルストレート",
    profile: "首元やフェイスラインがきれいに見える、コンパクトなシルエットが得意です。乾かすだけでも形が整うよう、骨格と髪質に合わせてラインと量感を細かく調整します。",
  }),
  Object.freeze({
    name: "NAGI",
    role: "STYLIST",
    image: `${A}staff-shibuya/staff-nagi-editorial-v4.png`,
    career: "4年",
    specialty: "ウェーブ / デザインパーマ",
    design: "ドリーミー・フェミニン・ニュアンス",
    technique: "低ダメージパーマ / カラーと動きの質感設計",
    profile: "色と動きが重なったときに生まれる、やわらかなニュアンスを大切にしています。スタイリングが苦手な方にも、朝の少ない手順で可愛く再現できるカールをご提案します。",
  }),
  Object.freeze({
    name: "LUA",
    role: "STYLIST",
    image: `${A}staff-shibuya/staff-lua-editorial-v4.png`,
    career: "5年",
    specialty: "ベージュカラー / ハイトーンケア",
    design: "エフォートレス・サニー・グロウ",
    technique: "肌色に合わせるベージュ設計 / ツヤを守る補修カラー",
    profile: "肌のトーンやいつもの服になじむ、やわらかなベージュと自然なツヤを大切にしています。明るさを楽しみながら髪の負担を抑えられるよう、履歴に合わせた工程と次回来店までのケアを組み立てます。",
  }),
]);

const HOME_STAFF_AUTO_INTERVAL_MS = 5000;
const HOME_STAFF_TRANSITION_MS = 700;
const HOME_STAFF_MOBILE_TRANSITION_MS = 240;
const HOME_STAFF_TRANSITION_FALLBACK_MS = 900;
let disposeHomeStaffCarousel = () => {};
let disposeSubpageMotion = () => {};

function link(routeId, cls = "", currentPath = "", labelOverride = "") {
  const { path, label } = routeRegistry[routeId];
  const normalizedCurrent = currentPath.endsWith("/") ? currentPath : `${currentPath}/`;
  const isCurrent = currentPath && path === normalizedCurrent;
  return `<a class="${cls}" href="${path}" data-link${isCurrent ? ' aria-current="page"' : ""}>${labelOverride || label}</a>`;
}


function header(isHome = false, currentPath = "/") {
  const { salon, navigation, actions } = shellData;
  return `
    <header class="site-header ${isHome ? "header-on-hero" : "header-on-page"}">
      <a class="brand" ${sharedHeaderLogoLink}>
        <img class="brand-mark" src="${sharedBrandLogo}" width="497" height="640" alt="" aria-hidden="true">
      </a>
      <div class="header-desktop">
          ${isHome ? `<p class="header-message">${salon.headerMessage}</p>` : ""}
          <div class="header-utility">
            <div class="header-phone"><strong>${salon.phone}</strong></div>
            <div class="header-actions">
              <a class="header-action wave-cta" href="${routePath(actions.contact.routeId)}" data-link>${actions.contact.label}</a>
              <button class="header-action wave-cta" type="button" data-demo-reserve>${actions.demoReservation.label}</button>
            </div>
            <div class="header-social-tools">
              ${socialIcons()}
              ${translationControl("header")}
            </div>
          </div>
          <nav class="header-primary-nav" aria-label="グローバルナビゲーション">
            ${navigation.primary.map((r)=>link(r, "", currentPath)).join("")}
          </nav>
      </div>
      ${isHome ? "" : `<button class="menu-toggle" aria-expanded="false" aria-controls="global-nav">
        <span></span><span></span><span></span><b>MENU</b>
      </button>`}
    </header>`;
}

function conceptHeader(currentPath = "/") {
  return sharedConceptMenuMarkup(currentPath);
}

function globalMenuContent(currentPath = "/") {
  const { navigation, salon } = shellData;
  return `<div class="nav-main">${navigation.primary.map((r) => link(r, "", currentPath)).join("")}</div>
      <div class="nav-sub">${navigation.secondary.map((r) => link(r, "", currentPath)).join("")}</div>
      <div class="nav-meta"><span>${salon.headerMessage}</span>${socialIcons()}${translationControl("overlay")}</div>`;
}

function globalOverlay(currentPath = "/") {
  return `<nav id="global-nav" class="global-nav" aria-label="グローバルナビゲーション" aria-hidden="true" inert>
    ${globalMenuContent(currentPath)}
  </nav>`;
}

function routeBreadcrumb(routeId) {
  const ancestors = [];
  let parentId = routeRegistry[routeId]?.parentId;
  while (parentId && routeRegistry[parentId]) {
    ancestors.unshift(parentId);
    parentId = routeRegistry[parentId].parentId;
  }
  return `<nav class="page-breadcrumb" aria-label="パンくず"><a href="${routePath("home")}" data-link>HOME</a>${ancestors.map((id)=>`<span>/</span><a href="${routePath(id)}" data-link>${routeRegistry[id].label}</a>`).join("")}<span>/</span><span aria-current="page">${routeRegistry[routeId].label}</span></nav>`;
}

function pageHead(routeId, title, lead, text) {
  return `
    <section class="page-head">
      ${routeBreadcrumb(routeId)}
      <h1>${title}</h1>
      <div class="page-head-copy">
        <h2>${lead}</h2>
        <p>${text}</p>
      </div>
    </section>`;
}

function splitSection(title, sub, body, image, reverse = false, routeId = "", id = "") {
  const homeIntro = id === "concept-home" || id === "menu-home";
  const heading = Array.isArray(sub)
    ? sub.map((line) => `<span class="split-heading-line">${line}</span>`).join("")
    : sub;
  return `
    <section class="split ${reverse ? "reverse" : ""}" ${id ? `id="${id}"` : ""}>
      <div class="split-media">${homeIntro ? `<button type="button" class="split-image-open" data-image-src="${image}" aria-label="${title}の写真を拡大" aria-haspopup="dialog">` : ""}${responsiveImage(image, "", { sizes: "(max-width: 900px) 100vw, 50vw" })}${homeIntro ? "</button>" : ""}</div>
      <div class="split-copy">
        ${homeIntro ? '<header class="split-heading-frame">' : ""}
        <p class="eyebrow">${title}</p>
        <h2>${heading}</h2>
        ${homeIntro ? "</header>" : ""}
        <p>${body}</p>
        ${routeId ? `<a class="outline-link wave-cta" href="${routePath(routeId)}" data-link>${homeIntro ? title : `VIEW ${title}`}</a>` : ""}
      </div>
    </section>`;
}

function bindHomeImageViewer() {
  const buttons = document.querySelectorAll(".split-image-open");
  if (!buttons.length) return;
  const dialog = document.createElement("dialog");
  dialog.className = "home-image-viewer";
  dialog.setAttribute("aria-label", "写真の拡大表示");
  dialog.innerHTML = '<button type="button" class="home-image-close" aria-label="写真を閉じる" autofocus>×</button><img alt="">';
  document.querySelector(".home-page").append(dialog);
  let opener;
  let previousOverflow = "";
  let scrollPosition = 0;
  buttons.forEach(button => button.addEventListener("click", () => {
    opener = button;
    const image = dialog.querySelector("img");
    image.src = button.dataset.imageSrc;
    image.alt = button.getAttribute("aria-label").replace("を拡大", "");
    scrollPosition = window.scrollY;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
  }));
  function closeViewer() {
    if (!dialog.open || dialog.classList.contains("is-closing")) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dialog.close();
      return;
    }
    dialog.classList.add("is-closing");
    const finish = () => {
      dialog.removeEventListener("animationend", onEnd);
      clearTimeout(timer);
      if (dialog.open) dialog.close();
    };
    const onEnd = event => { if (event.target === dialog && event.animationName === "home-photo-dismiss") finish(); };
    const timer = setTimeout(finish, 450);
    dialog.addEventListener("animationend", onEnd);
  }
  dialog.querySelector("button").addEventListener("click", closeViewer);
  dialog.addEventListener("click", event => { if (event.target === dialog) closeViewer(); });
  dialog.addEventListener("cancel", event => { event.preventDefault(); closeViewer(); });
  dialog.addEventListener("close", () => {
    dialog.classList.remove("is-closing");
    document.body.style.overflow = previousOverflow;
    opener?.focus({ preventScroll: true });
    const restorePosition = scrollPosition;
    window.scrollTo({ top: restorePosition, behavior: "instant" });
    requestAnimationFrame(() => {
      if (!dialog.open) window.scrollTo({ top: restorePosition, behavior: "instant" });
    });
  });
}

function related() {
  return `
    <section class="related">
      <p class="eyebrow">EXPLORE MILKY VEIL</p>
      <h2>もっと自分らしいスタイルへ。</h2>
      <div class="related-grid">
        ${["concept", "menu", "staff", "items"].map((id) => link(id, "related-link")).join("")}
      </div>
      <div class="tag-row"><span>#BLEACH</span><span>#COLOR</span><span>#EXTENSION</span><span>#PERM</span></div>
    </section>`;
}

function responsiveImage(src, alt = "", options = {}) {
  const {
    loading = "lazy",
    sizes = "100vw",
    fetchPriority = "auto",
    className = "",
    width = "",
    height = "",
  } = options;
  const media = resolveMedia(src);
  const srcset = responsiveSrcset(src);
  const intrinsicWidth = width || media.width;
  const intrinsicHeight = height || media.height;
  return `<img${className ? ` class="${className}"` : ""} src="${media.src}"${srcset ? ` srcset="${srcset}" sizes="${sizes}"` : ""} alt="${alt}" loading="${loading}" decoding="async" fetchpriority="${fetchPriority}"${intrinsicWidth ? ` width="${intrinsicWidth}"` : ""}${intrinsicHeight ? ` height="${intrinsicHeight}"` : ""}>`;
}

function heroMediaFrame(media) {
  if (media.type === "video") {
    return `<div class="hero-media" data-media-type="video"><video src="${media.src}" ${media.poster ? `poster="${media.poster}"` : ""} autoplay muted loop playsinline aria-label="${media.alt || ""}"></video></div>`;
  }
  return `<div class="hero-media" data-media-type="image">${responsiveImage(media.src, media.alt || "", { loading: "eager", sizes: "100vw", fetchPriority: media.fetchPriority || "high" })}</div>`;
}

const instagramProfile = Object.freeze({ username: "m___amakawa", url: "https://www.instagram.com/m___amakawa/" });

const instagramPosts = Object.freeze([
  { title: homeFeatureCards[0][2], caption: "やわらかなラベンダーに透けるようなツヤ", images: [homeFeatureCards[0][1]], alt: homeFeatureCards[0][3] },
  { title: "SALON MOMENTS", caption: "MILKY VEILの空間を動画で", images: [MENU_MOVIE_ASSETS[0].replace(".mp4", ".webp")], video: MENU_MOVIE_ASSETS[0], alt: "MILKY VEIL 店内紹介" },
  { title: "BLONDE COLLECTION", caption: "ボブもロングもなりたい印象に合わせたブロンド", images: [homeFeatureCards[1][1], homeFeatureCards[2][1]], alt: "ブロンドのヘアデザイン" },
]);

function instagramIcon(id) {
  return `<svg viewBox="0 0 24 24" fill="none"><defs><linearGradient id="instagram-stroke-${id}" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse"><stop stop-color="#ffb846"/><stop offset=".45" stop-color="#ff285c"/><stop offset="1" stop-color="#c02bdd"/></linearGradient></defs><g stroke="url(#instagram-stroke-${id})" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></g><circle cx="17.5" cy="6.5" r="1.2" fill="#e8349c"/></svg>`;
}

function instagramFeed() {
  return `<section class="instagram-home" id="instagram-home" aria-labelledby="instagram-heading">
    <header class="instagram-heading"><h2 id="instagram-heading"><img src="/milky-veil-preview/assets/ui/social/${sharedSocials.find(social => social.name === "Instagram").file}" alt="" aria-hidden="true">INSTAGRAM</h2></header>
    <div class="instagram-track" aria-label="Instagram投稿サンプル">
      ${instagramPosts.map((post, index) => `<article class="instagram-card"><div class="instagram-card-media">
        <button type="button" class="instagram-open" data-instagram-post="${index}" aria-haspopup="dialog" aria-label="${post.title}の${post.video ? "動画" : "写真と本文"}を見る">
          ${responsiveImage(post.images[0], post.alt, { sizes: "(max-width: 767px) 85vw, 33vw" })}
          <span class="instagram-card-icon" aria-hidden="true">${instagramIcon(index)}</span><span class="instagram-card-hover">${post.video ? "VIEW REEL" : "VIEW FEED"}</span>
          ${post.video ? '<span class="instagram-play" aria-hidden="true">▶</span>' : ""}
        </button><a class="instagram-card-account" href="${instagramProfile.url}" target="_blank" rel="noopener noreferrer" aria-label="@${instagramProfile.username}のInstagramを見る"><span class="instagram-account-logo"><img src="${sharedBrandLogo}" alt=""></span><span>@${instagramProfile.username}</span></a></div><div class="instagram-caption"><h3>${post.title}</h3></div>
      </article>`).join("")}
    </div>
    <dialog class="instagram-dialog" tabindex="-1" aria-labelledby="instagram-post-heading"><button type="button" class="instagram-close" aria-label="投稿を閉じる" autofocus><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg></button><button type="button" class="instagram-post-prev instagram-post-arrow" data-post-step="-1" aria-label="前の投稿を見る"><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 5 8 12 15 19"/></svg></button><button type="button" class="instagram-post-next instagram-post-arrow" data-post-step="1" aria-label="次の投稿を見る"><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 5 16 12 9 19"/></svg></button><div class="instagram-detail"></div><span class="sr-only" data-post-status aria-live="polite"></span></dialog>
  </section>`;
}

function bindInstagramFeed() {
  const section = document.querySelector(".instagram-home");
  if (!section) return;
  const track = section.querySelector(".instagram-track");
  const cards = [...track.children];
  const dialog = section.querySelector("dialog");
  const detail = section.querySelector(".instagram-detail");
  let active = 0;
  let opener;
  const sync = () => {
    active = cards.reduce((best, card, i) => Math.abs(card.offsetLeft - cards[0].offsetLeft - track.scrollLeft) < Math.abs(cards[best].offsetLeft - cards[0].offsetLeft - track.scrollLeft) ? i : best, 0);
  };
  let scrollTimer;
  track.addEventListener("scroll", () => { clearTimeout(scrollTimer); scrollTimer = setTimeout(sync, 120); }, { passive: true });
  const go = index => track.scrollTo({ left: cards[Math.max(0, Math.min(cards.length - 1, index))].offsetLeft - cards[0].offsetLeft, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  track.addEventListener("keydown", event => {
    if (!matchMedia(layoutQueries.instagramCompact).matches || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    go(active + (event.key === "ArrowRight" ? 1 : -1));
  });
  let currentPost = 0;
  let touchOrigin;
  let currentPhoto = 0;
  const fitDetail = () => {
    if (!dialog.open) return;
    const media = detail.querySelector("video") || detail.querySelectorAll(".instagram-album img")[currentPhoto];
    if (!media) return;
    const width = media.videoWidth || media.naturalWidth;
    const height = media.videoHeight || media.naturalHeight;
    if (!width || !height) return;
    const ratio = width / height;
    const mobile = matchMedia(layoutQueries.instagramCompact).matches;
    const copyWidth = mobile ? 0 : Math.min(360, innerWidth * .34);
    const maxWidth = mobile ? innerWidth - 32 : Math.min(1200, innerWidth - 144) - copyWidth;
    const maxHeight = mobile ? innerHeight * .58 : Math.min(740, innerHeight - 128);
    const mediaWidth = mobile ? maxWidth : Math.min(maxWidth, maxHeight * ratio);
    const mediaHeight = mobile ? mediaWidth / ratio : Math.min(maxHeight, mediaWidth / ratio);
    dialog.style.setProperty("--detail-width", `${mediaWidth + copyWidth}px`);
    dialog.style.setProperty("--detail-media-width", `${mediaWidth}px`);
    dialog.style.setProperty("--detail-media-height", `${mediaHeight}px`);
  };
  const showPost = index => {
    currentPost = (index + instagramPosts.length) % instagramPosts.length;
    currentPhoto = 0;
    const post = instagramPosts[currentPost];
    detail.querySelector("video")?.pause();
    detail.innerHTML = `<div class="instagram-detail-image">${post.video ? `<video controls playsinline preload="metadata" poster="${post.images[0]}" src="${post.video}" aria-label="${post.alt}"></video>` : `<div class="instagram-album">${post.images.map(image => responsiveImage(image, post.alt, { sizes: "(max-width: 767px) 90vw, 50vw", loading: "eager" })).join("")}</div>${post.images.length > 1 ? `<div class="instagram-album-controls"><button type="button" data-album-step="-1" aria-label="前の写真" disabled>←</button><span class="instagram-album-count" aria-live="polite">1 / ${post.images.length}</span><button type="button" data-album-step="1" aria-label="次の写真">→</button></div>` : ""}`}</div><div class="instagram-detail-copy"><header class="instagram-detail-account"><a href="${instagramProfile.url}" target="_blank" rel="noopener noreferrer"><img src="${sharedBrandLogo}" alt="MILKY VEIL"><span>@${instagramProfile.username}</span></a><span class="instagram-detail-icon" aria-hidden="true">${instagramIcon("detail")}</span></header><div class="instagram-detail-text"><h3 id="instagram-post-heading">${post.title}</h3><p>${post.caption}</p></div><a class="instagram-detail-link" ${post.permalink ? `href="${post.permalink}" target="_blank" rel="noopener noreferrer"` : 'aria-disabled="true" title="実投稿URLは未接続です"'}><span>元の投稿を見る</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7M21 3l-11 11M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/></svg></a></div>`;
    detail.querySelectorAll("img").forEach(image => image.addEventListener("load", fitDetail, { once: true }));
    detail.querySelector("video")?.addEventListener("loadedmetadata", fitDetail, { once: true });
    dialog.querySelector("[data-post-status]").textContent = `${currentPost + 1} / ${instagramPosts.length} ${post.title}`;
    const album = detail.querySelector(".instagram-album");
    if (album && post.images.length > 1) {
      const albumButtons = [...detail.querySelectorAll("[data-album-step]")];
      let photoIndex = 0;
      album.addEventListener("scroll", () => {
        photoIndex = Math.round(album.scrollLeft / album.clientWidth);
        currentPhoto = photoIndex;
        fitDetail();
        detail.querySelector(".instagram-album-count").textContent = `${photoIndex + 1} / ${post.images.length}`;
        albumButtons[0].disabled = photoIndex === 0;
        albumButtons[1].disabled = photoIndex === post.images.length - 1;
      }, { passive: true });
      albumButtons.forEach(control => control.addEventListener("click", () => album.scrollTo({ left: (photoIndex + Number(control.dataset.albumStep)) * album.clientWidth, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })));
    }
    if (!dialog.open) dialog.showModal();
    window.addEventListener("resize", fitDetail);
    dialog.scrollTop = 0;
    fitDetail();
  };
  section.querySelectorAll("[data-instagram-post]").forEach(button => button.addEventListener("click", event => {
    opener = button;
    showPost(Number(button.dataset.instagramPost));
    if (event.detail > 0) dialog.focus({ preventScroll: true });
  }));
  detail.addEventListener("touchstart", event => {
    if (event.touches.length !== 1 || event.target.closest("video,a,button,.instagram-detail-copy") || detail.querySelectorAll(".instagram-album img").length > 1) return;
    touchOrigin = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });
  detail.addEventListener("touchend", event => {
    if (!touchOrigin || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchOrigin.x;
    const dy = event.changedTouches[0].clientY - touchOrigin.y;
    touchOrigin = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) showPost(currentPost + (dx < 0 ? 1 : -1));
  }, { passive: true });
  detail.addEventListener("touchcancel", () => { touchOrigin = null; }, { passive: true });
  dialog.querySelectorAll("[data-post-step]").forEach(button => button.addEventListener("click", () => showPost(currentPost + Number(button.dataset.postStep))));
  dialog.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key) || event.target.closest("video,.instagram-album-controls")) return;
    event.preventDefault();
    showPost(currentPost + (event.key === "ArrowRight" ? 1 : -1));
  });


  section.querySelector(".instagram-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener("close", () => { window.removeEventListener("resize", fitDetail); detail.querySelector("video")?.pause(); detail.replaceChildren(); opener?.focus({ preventScroll: true }); });
  sync();
}

const homeDuoCards = Object.freeze([
  { routeId: "menu", image: `${A}home-role-locked-pack-v1/home-menu-color-service-v4.png` },
  { routeId: "items", image: `${A}home-role-locked-pack-v1/home-items-customer-06-v1.png` },
]);

function homeOpeningMarkup() {
  return `<div class="home-opening" aria-hidden="true"><div class="home-opening__stage"></div></div>`;
}

function bindHomeOpening() {
  const opening = document.querySelector(".home-opening");
  if (!opening) return;
  document.documentElement.classList.remove("home-opening-pending");
  document.body.classList.add("home-opening-active");
  document.body.classList.add("home-opening-content-pending");
  createConceptTypography(opening.querySelector(".home-opening__stage"), sharedSalonData.name, { splitChars: false });
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  void (async () => {
    await wait(2000);
    if (!opening.isConnected) return;
    opening.classList.add("is-exiting");
    await wait(1000);
    opening.remove();
    document.body.classList.remove("home-opening-active");
    await wait(200);
    document.body.classList.replace("home-opening-content-pending", "home-opening-content-visible");
    await wait(800);
    document.body.classList.remove("home-opening-content-visible");
  })();
}

function home() {
  const { demoReservation } = shellData.actions;
  return `
    <main id="main" class="home-page">
      <section class="hero">
        ${heroMediaFrame(homeHeroMedia)}
        <div class="hero-shade"></div>
        <div class="hero-copy">
          <p>${sharedBrandEyebrow}</p>
          <h1>${sharedBrandHeadlineLines.join("<br>")}</h1>
          <span>${sharedBrandSupportingLines.join("<br>")}</span>
          <button class="hero-reserve wave-cta" type="button" data-demo-reserve><span>${demoReservation.label}</span><i aria-hidden="true"></i></button>
        </div>
        ${sharedScrollCueMarkup({ target: "#concept-home", ariaLabel: "CONCEPTセクションへ移動" })}
      </section>
      ${instagramFeed()}
      ${homeSplitSections.map(({ label, heading, text, image, reverse, routeId, sectionId }) => splitSection(label, heading, text, image, reverse, routeId, sectionId)).join("")}
      <section class="duo">
        <div class="duo-atmosphere" aria-hidden="true">${homeDuoCards.map(({ image }) => responsiveImage(image, "", { sizes: "50vw" })).join("")}</div>
        ${homeDuoCards.map(({ routeId, image }) => `<a href="${routePath(routeId)}" data-link>${responsiveImage(image, "", { sizes: "(max-width: 1100px) 90vw, 45vw" })}<span><b>${routeRegistry[routeId].label}</b></span></a>`).join("")}
      </section>
      ${staffStrip()}
      <section class="access-home">
        ${responsiveImage(`${A}home-access/interior-collage-night-v1.png`, "夜の渋谷を望むMILKY VEILの店内コラージュ")}
        <div><h2>SHIBUYA<br>COLOR SALON</h2><p>${shellData.salon.accessLabel}</p>${link("access","outline-link light wave-cta","","VIEW ACCESS")}</div>
      </section>
      <section class="feature-home" id="color-design">
        <div class="section-title"><h2>HAIR GALLERY</h2></div>
        <div class="feature-grid">${homeFeatureCards.map(([n,img,label,description])=>`<article class="feature-card feature-card-${n.toLowerCase()}">${responsiveImage(img, description, { sizes: "(max-width: 900px) 50vw, 20vw" })}<span><b>${label}</b></span></article>`).join("")}</div>
      </section>
    </main>`;
}

function staffStrip() {
  const physicalProfiles = [staffProfiles.at(-1), ...staffProfiles, staffProfiles[0]];
  const staffSlide = (profile, physicalIndex) => {
    const isClone = physicalIndex === 0 || physicalIndex === physicalProfiles.length - 1;
    const logicalIndex = isClone
      ? (physicalIndex === 0 ? staffProfiles.length - 1 : 0)
      : physicalIndex - 1;
    const active = physicalIndex === 1;
    return `
      <article class="home-staff-slide" data-home-staff-slide data-home-staff-logical="${logicalIndex}" data-home-staff-clone="${isClone}" role="group" aria-roledescription="スライド" aria-label="${logicalIndex + 1} / ${staffProfiles.length}、${profile.name}" aria-hidden="${active ? "false" : "true"}" ${active ? "" : "inert"}>
        <figure class="home-staff-photo">${responsiveImage(profile.image, isClone ? "" : `${profile.name} スタイリスト、渋谷でのポートレート`, { sizes: "(max-width: 900px) calc(100vw - 80px), 323px", width: "1086", height: "1448" })}</figure>
        <div class="home-staff-profile">
          <div class="home-staff-identity"><span>${profile.role}</span><h3>${profile.name}</h3></div>
          <dl>
            <div class="home-staff-intro"><dt>紹介文</dt><dd>${profile.profile}</dd></div>
            <div><dt>スタイリスト歴</dt><dd>${profile.career}</dd></div>
            <div><dt>得意なメニュー</dt><dd>${profile.specialty}</dd></div>
            <div><dt>デザインムード</dt><dd>${profile.design}</dd></div>
            <div><dt>こだわりの技術</dt><dd>${profile.technique}</dd></div>
          </dl>
        </div>
      </article>`;
  };
  return `
    <section class="staff-strip" aria-labelledby="home-staff-title">
      <header class="staff-strip-heading">
        <p class="eyebrow">STAFF</p>
        <h2 id="home-staff-title">「好き」を気軽に話せる、6人のスタッフ</h2>
        <p>おしゃれが好きで、人と話すことが好きな私たち。やってみたい髪色も、いつもの髪の悩みも、気軽に聞かせてください。それぞれの得意を生かして、あなたに似合うスタイルを一緒に見つけます。</p>
      </header>
      <div class="home-staff-carousel-root" data-home-staff-carousel role="region" aria-roledescription="カルーセル" aria-label="MILKY VEIL スタイリスト紹介">
        <div class="home-staff-controls">
          <button class="home-staff-rotation" type="button" data-home-staff-rotation aria-label="自動切替を停止" title="自動切替を停止"><span aria-hidden="true"></span></button>
          <div class="home-staff-dots" role="group" aria-label="スタイリストを選択">
            ${staffProfiles.map((profile,index)=>`<button type="button" data-home-staff-dot="${index}" aria-label="${profile.name}を表示" aria-controls="home-staff-slide" aria-current="${index===0?"true":"false"}"></button>`).join("")}
          </div>
        </div>
        <div class="home-staff-carousel">
          <div class="home-staff-viewport">
            <div class="home-staff-track" data-home-staff-track style="--home-staff-physical-index:1">
              ${physicalProfiles.map(staffSlide).join("")}
            </div>
          </div>
          <button class="home-staff-arrow home-staff-prev" type="button" data-home-staff-prev aria-label="前のスタイリストを表示"><span aria-hidden="true"></span></button>
          <button class="home-staff-arrow home-staff-next" type="button" data-home-staff-next aria-label="次のスタイリストを表示"><span aria-hidden="true"></span></button>
        </div>
      </div>
      <p class="sr-only" data-home-staff-status aria-live="off" aria-atomic="true">1 / ${staffProfiles.length}、${staffProfiles[0].name}</p>
      ${link("staff","outline-link staff-strip-link wave-cta","","STAFF")}
    </section>`;
}









const privacyPolicyBlocks = [
  ["個人情報の取得と利用目的", "MILKY VEIL（以下「当店」）は、お問い合わせやご予約の際にお知らせいただく氏名、電話番号、メールアドレス、ご相談内容を、お問い合わせへの回答、ご予約の確認・連絡およびこれらに伴うお客様情報の管理に利用します。法令で認められる場合を除き、あらかじめお知らせした目的の範囲を超えて利用する際は、ご本人の同意を得ます。"],
  ["第三者への提供", "当店が管理するお客様の個人データを第三者へ提供するときは、事前にご本人へ確認し、同意を得ます。ただし、法令に基づく場合など、法律で同意を必要としない場合はこの限りではありません。"],
  ["業務委託時の取り扱い", "お問い合わせ対応などの業務を外部の事業者へ委託する場合は、その業務に必要な情報に限って取り扱いを任せます。委託先の管理体制を確認し、秘密保持や情報管理に関する取り決めを行ったうえで、適切な取り扱いが継続されるよう監督します。"],
  ["個人情報の管理", "個人情報への不正なアクセスや、漏えい・紛失・改ざんを防ぐため、情報の性質や取り扱いの状況に応じた安全管理措置を講じます。取り扱う担当者には適切な管理を徹底し、保管の必要がなくなった情報は、法令上の保存義務がある場合を除き、適切な方法で消去します。"],
  ["情報のご提供について", "個人情報をお知らせいただくかどうかは、お客様ご自身でお決めいただけます。電話番号の入力は任意です。お名前、メールアドレス、ご相談内容など、回答に必要な情報が不足している場合や内容に誤りがある場合は、お問い合わせへの対応ができないことがあります。"],
  ["開示・訂正・削除・利用停止", "当店が保有するご本人の情報について、利用目的の通知、開示、内容の訂正・追加・削除、利用停止・消去、第三者への提供停止を希望される場合は、当店のお問い合わせ窓口へお申し出ください。ご本人からのお申し出であることを確認したうえで、関係法令に従って対応し、結果をご案内します。"],
];

function contactPage() {
  return `<main id="main" class="contact-main">
    <header class="contact-heading"><h1>CONTACT</h1><p>${pageCopy.CONTACT.lead}</p></header>
    <section class="contact-form" aria-label="お問い合わせフォーム">
    <section id="${sharedPrivacyPolicyAnchorId}" class="contact-policy" tabindex="-1" aria-labelledby="contact-policy-title">
      <h2 id="contact-policy-title">プライバシーポリシー</h2>
      <div class="contact-policy-text" tabindex="0" role="region" aria-label="プライバシーポリシー本文">${privacyPolicyBlocks.map(([heading, text]) => `<article><h3>${heading}</h3><p>${text}</p></article>`).join("")}</div>
    </section>
    <form data-demo-form novalidate><div data-contact-fields>
      <p class="contact-required-note"><span class="contact-required">※</span> は必須項目です。</p>
      <div class="contact-row"><label for="contact-name">お名前 <span class="contact-required" aria-hidden="true">※</span></label><div><input id="contact-name" name="name" maxlength="80" autocomplete="name" required aria-describedby="contact-name-error"><span id="contact-name-error" class="field-error" aria-live="polite" data-field-error="name"></span></div></div>
      <div class="contact-row"><label for="contact-tel">お電話番号 <span class="contact-optional">任意</span></label><div><input id="contact-tel" name="tel" type="tel" inputmode="tel" maxlength="30" autocomplete="tel"></div></div>
      <div class="contact-row"><label for="contact-email">メールアドレス <span class="contact-required" aria-hidden="true">※</span></label><div><input id="contact-email" name="email" type="email" maxlength="254" autocomplete="email" required aria-describedby="contact-email-error"><span id="contact-email-error" class="field-error" aria-live="polite" data-field-error="email"></span></div></div>
      <div class="contact-row"><label for="contact-message">お問い合わせ内容 <span class="contact-required" aria-hidden="true">※</span></label><div><textarea id="contact-message" name="message" rows="8" maxlength="2000" required aria-describedby="contact-message-error"></textarea><span id="contact-message-error" class="field-error" aria-live="polite" data-field-error="message"></span></div></div>
      <button class="wave-cta" type="submit">入力内容を確認する</button>
    </div><section class="contact-confirmation" data-contact-confirmation tabindex="-1" hidden aria-labelledby="contact-confirm-title"><h2 id="contact-confirm-title">入力内容の確認</h2><dl data-contact-review></dl><p class="form-result" role="status">デモのため送信されません。入力内容も保存していません。</p><button class="wave-cta" type="button" data-contact-edit>入力内容を修正する</button></section>
    </form></section></main>`;
}

const contactFieldIds = Object.freeze({
  name: "contact-name",
  email: "contact-email",
  message: "contact-message",
});

function contactFieldError(name, form) {
  const field = form.elements.namedItem(name);
  const value = field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement
    ? field.value.trim()
    : "";
  if (name === "name") {
    if (!value) return "お名前が未入力です。";
    if (value.length > 80) return "お名前は80文字以内で入力してください。";
  }
  if (name === "email") {
    if (!value) return "メールアドレスが未入力です。";
    if (value.length > 254) return "メールアドレスは254文字以内で入力してください。";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "メールアドレスの形式を確認してください。";
  }
  if (name === "message") {
    if (!value) return "お問い合わせ内容が未入力です。";
    if (value.length > 2000) return "お問い合わせ内容は2000文字以内で入力してください。";
  }
  return "";
}

function updateContactFieldState(form, name) {
  const field = form.elements.namedItem(name);
  const error = contactFieldError(name, form);
  const errorNode = form.querySelector(`[data-field-error="${name}"]`);
  if (field instanceof HTMLElement) field.setAttribute("aria-invalid", error ? "true" : "false");
  if (errorNode) errorNode.textContent = error;
  return error;
}

function validateContactForm(form) {
  const errors = Object.keys(contactFieldIds)
    .map((name) => ({ name, message: updateContactFieldState(form, name) }))
    .filter(({ message }) => message);
  return errors;
}

function privacyPage() {
  return `<main id="main">${pageHead("privacy","PRIVACY POLICY",pageCopy["PRIVACY POLICY"].lead,pageCopy["PRIVACY POLICY"].text)}<section class="policy">${privacyPolicyBlocks.map(([h,p],i)=>`<article><span>0${i+1}</span><h2>${h}</h2><p>${p}</p></article>`).join("")}</section>${related()}</main>`;
}

function resolveRoute(path = location.pathname) {
  const normalized = path.endsWith("/") ? path : `${path}/`;
  const routeId = routeIdByPath[normalized];
  if (routeId) return Object.freeze({ routeId, view: "page", slug: "" });
  return Object.freeze({ routeId: "home", view: "fallback", slug: "" });
}

function renderPage(path) {
  const resolved = resolveRoute(path);
  const routeId = resolved.routeId;
  if (resolved.view === "fallback") return `<main id="main"><section class="page-head"><p class="eyebrow">404</p><h1>ページが見つかりません</h1><p>URLをご確認ください。</p>${link("home", "outline-link", "", "HOMEへ戻る")}</section></main>`;
  const normalized = path.endsWith("/") ? path : `${path}/`;
  const key = routeRegistry[routeId].label;
  if (normalized === "/milky-veil-preview/") return home();
  if (["CONCEPT", "STAFF", "MENU"].includes(key)) { location.replace(routeRegistry[routeId].path); return ""; }
  if (key === "ITEMS") { location.replace(routeRegistry.items.path); return ""; }
  if (key === "ACCESS") { location.replace(routeRegistry.access.path); return ""; }
  if (key === "CONTACT") return contactPage();
  if (key === "PRIVACY POLICY") return privacyPage();
  return home();
}



function bindSubpageMotion() {
  const nodes = [...document.querySelectorAll(".mv-reveal,.mv-marker-reveal")];
  const observer = nodes.length ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: .24 }) : null;
  nodes.forEach(node => observer?.observe(node));
  disposeSubpageMotion = () => observer?.disconnect();
}

function bind(sharedBottomScope) {
  bindInstagramFeed();
  bindHomeImageViewer();
  bindSubpageMotion();
  bindSharedFixedShell(sharedBottomScope);
  document.querySelectorAll("[data-demo-reserve]").forEach((button) => button.addEventListener("click", () => showContactDemo("reserve")));
  document.querySelectorAll("[data-link]").forEach((el)=>el.addEventListener("click",(e)=>{
    if (e.metaKey || e.ctrlKey) return;
    if (storedTranslationLanguage()) return;
    const target = new URL(el.getAttribute("href"), location.href);
    if (target.hash) return;
    const targetRoute = resolveRoute(target.pathname);
    if (target.origin === location.origin && routeRegistry[targetRoute.routeId].navigationMode === "document") return;
    e.preventDefault();
    history.pushState({}, "", el.getAttribute("href"));
    render({ focusRoute: true });
  }));
  bindSharedConceptMenu(document);
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#global-nav.global-nav");
  const translateToggles = [...document.querySelectorAll(".translate-toggle")].filter(button => !button.closest(".shared-concept-menu"));
  const setTranslateOpen = (button, open) => {
    translateToggles.forEach((candidate) => {
      const control = candidate.closest(".translate-control");
      const menu = control?.querySelector(".translate-menu");
      const active = candidate === button && open;
      candidate.setAttribute("aria-expanded", String(active));
      control?.classList.toggle("is-open", active);
      if (menu instanceof HTMLElement) {
        menu.setAttribute("aria-hidden", String(!active));
        menu.inert = !active;
      }
    });
  };
  const setMenuOpen = (open, { restoreFocus = false } = {}) => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
    nav.inert = !open;
    nav.setAttribute("aria-hidden", String(!open));
    document.querySelectorAll("#main, .site-footer, .fixed-cta, .site-header .brand, .site-header .header-desktop").forEach((element)=>{
      element.inert = open;
    });
    if (!open && restoreFocus) {
      requestAnimationFrame(() => toggle.focus());
    }
  };
  toggle?.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen, { restoreFocus: isOpen });
  });
  toggle?.addEventListener("keydown", (event) => {
    if (event.key !== "Tab" || event.shiftKey || toggle.getAttribute("aria-expanded") !== "true") return;
    const firstNavigationLink = nav?.querySelector("a[href]");
    if (!(firstNavigationLink instanceof HTMLElement)) return;
    event.preventDefault();
    firstNavigationLink.focus();
  });
  nav?.addEventListener("click", (event) => {
    if (event.target === nav || (event.target instanceof Element && event.target.closest("[data-nav-close]"))) {
      setMenuOpen(false, { restoreFocus: true });
    }
  });
  document.onkeydown = (event) => {
    if (event.key === "Escape" && toggle?.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false, { restoreFocus: true });
    }
    if (event.key === "Escape") {
      const openTranslateToggle = translateToggles.find((button)=>button.getAttribute("aria-expanded") === "true");
      translateToggles.forEach((button)=>setTranslateOpen(button, false));
      openTranslateToggle?.focus();
    }
  };
  translateToggles.forEach((button)=>button.addEventListener("click",(event)=>{
    event.stopPropagation();
    const willOpen = button.getAttribute("aria-expanded") !== "true";
    setTranslateOpen(button, willOpen);
    if (willOpen) {
      selectTranslationTarget(button.closest(".translate-control")?.querySelector("[data-google-translate]")?.id || "google-translate-header");
      ensureGoogleTranslate();
      mountGoogleTranslateWidgets();
    }
  }));
  const isInsideTranslateControl = (event) => {
    const path = typeof event.composedPath === "function" ? event.composedPath() : [];
    if (path.some((node)=>node instanceof Element && node.classList.contains("translate-control"))) return true;
    return event.target instanceof Element && event.target.closest(".translate-control") !== null;
  };
  document.onclick = (event) => {
    if (isInsideTranslateControl(event)) return;
    const openControl = translateToggles
      .find((button)=>button.getAttribute("aria-expanded") === "true")
      ?.closest(".translate-control");
    const restoreFocus = openControl instanceof HTMLElement && openControl.contains(document.activeElement);
    translateToggles.forEach((button)=>setTranslateOpen(button, false));
    if (restoreFocus) requestAnimationFrame(()=>openControl?.querySelector(".translate-toggle")?.focus());
  };
  const demoForm = document.querySelector("[data-demo-form]");
  demoForm?.addEventListener("submit",(event)=>{
    event.preventDefault();
    const form = event.currentTarget;
    form.dataset.validationActive = "true";
    const errors = validateContactForm(form);
    if (errors.length) {
      form.elements.namedItem(errors[0].name)?.focus();
      return;
    }
    const review = form.querySelector("[data-contact-review]");
    review.replaceChildren(...[
      ["name", "お名前"], ["tel", "お電話番号"], ["email", "メールアドレス"], ["message", "お問い合わせ内容"],
    ].map(([name, label]) => {
      const row = document.createElement("div");
      const term = document.createElement("dt");
      const value = document.createElement("dd");
      term.textContent = label;
      value.textContent = form.elements.namedItem(name).value.trim() || "未入力";
      row.append(term, value);
      return row;
    }));
    form.querySelector("[data-contact-fields]").hidden = true;
    const confirmation = form.querySelector("[data-contact-confirmation]");
    confirmation.hidden = false;
    confirmation.focus();
  });
  demoForm?.querySelector("[data-contact-edit]").addEventListener("click", () => {
    demoForm.querySelector("[data-contact-confirmation]").hidden = true;
    demoForm.querySelector("[data-contact-fields]").hidden = false;
    demoForm.elements.namedItem("name").focus();
  });
  demoForm?.addEventListener("input",(event)=>{
    const name = event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement
      ? event.target.name
      : "";
    if (name in contactFieldIds) {
      if (demoForm.dataset.validationActive === "true") validateContactForm(demoForm);
      else updateContactFieldState(demoForm, name);
    }
  });
  demoForm?.addEventListener("change",(event)=>{
    const name = event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement ? event.target.name : "";
    if (name in contactFieldIds) {
      if (demoForm.dataset.validationActive === "true") validateContactForm(demoForm);
      else updateContactFieldState(demoForm, name);
    }
  });
  let staffPageGeneration = 0;
  document.querySelectorAll("[data-staff]").forEach((button)=>button.addEventListener("click",async()=>{
    const index = Number(button.dataset.staff);
    const profile = staffProfiles[index];
    const generation = ++staffPageGeneration;
    const preload = new Image();
    preload.src = resolveMedia(profile.image).src;
    try {
      await preload.decode();
    } catch {
      return;
    }
    if (generation !== staffPageGeneration) return;
    document.querySelectorAll("[data-staff]").forEach((candidate)=>{
      const selected = candidate === button;
      candidate.classList.toggle("active", selected);
      candidate.setAttribute("aria-current", String(selected));
    });
    const image = document.querySelector("[data-staff-image]");
    image.src = resolveMedia(profile.image).src;
    image.srcset = responsiveSrcset(profile.image);
    image.alt = `${profile.name} スタイリスト、渋谷でのポートレート`;
    document.querySelector("[data-staff-name]").textContent = profile.name;
    document.querySelector("[data-staff-position]").textContent = profile.role;
    document.querySelector("[data-staff-specialty]").textContent = profile.specialty;
    document.querySelector("[data-staff-career]").textContent = `Stylist歴 ${profile.career}`;
    document.querySelector("[data-staff-profile]").textContent = profile.profile;
    document.querySelector("[data-staff-status]").textContent = `${index + 1} / ${staffProfiles.length}、${profile.name}`;
  }));
  const homeStaffCarousel = document.querySelector("[data-home-staff-carousel]");
  if (homeStaffCarousel) {
    disposeHomeStaffCarousel();
    let logicalIndex = 0;
    let requestedLogicalIndex = 0;
    let physicalIndex = 1;
    let animationLogicalTarget = 0;
    let actionGeneration = 0;
    let state = "idle";
    let activeRequestOrigin = "auto";
    let pendingRequest = null;
    let disposed = false;
    let timerId = 0;
    let transitionFallbackId = 0;
    let resizeFrameId = 0;
    let rotationRequested = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let focusSuspended = false;
    let reducedMotion = !rotationRequested;
    let keyboardModality = false;
    const pauseReasons = new Set(["offscreen"]);
    const rotationControl = homeStaffCarousel.querySelector("[data-home-staff-rotation]");
    const status = homeStaffCarousel.parentElement.querySelector("[data-home-staff-status]");
    const track = homeStaffCarousel.querySelector("[data-home-staff-track]");
    const slides = [...track.querySelectorAll("[data-home-staff-slide]")];
    const dots = [...homeStaffCarousel.querySelectorAll("[data-home-staff-dot]")];
    const previousButton = homeStaffCarousel.querySelector("[data-home-staff-prev]");
    const nextButton = homeStaffCarousel.querySelector("[data-home-staff-next]");
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const clearTimer = () => {
      if (timerId) window.clearTimeout(timerId);
      timerId = 0;
    };
    const clearTransitionFallback = () => {
      if (transitionFallbackId) window.clearTimeout(transitionFallbackId);
      transitionFallbackId = 0;
    };
    const canAutoRotate = () => rotationRequested && !reducedMotion && !focusSuspended && pauseReasons.size === 0 && !disposed;
    const updateRotationControl = () => {
      const running = canAutoRotate();
      const label = reducedMotion ? "自動切替は停止中" : running ? "自動切替を停止" : "自動切替を開始";
      rotationControl.setAttribute("aria-label", label);
      rotationControl.title = label;
      rotationControl.classList.toggle("is-paused", !running);
      rotationControl.disabled = reducedMotion;
      status.setAttribute("aria-live", running ? "off" : "polite");
    };
    const normalizeLogical = (index) => (index + staffProfiles.length) % staffProfiles.length;
    const setTrackPosition = (index, animate) => {
      physicalIndex = index;
      const duration = usesMobileLayout() ? HOME_STAFF_MOBILE_TRANSITION_MS : HOME_STAFF_TRANSITION_MS;
      track.style.transitionDuration = animate && !reducedMotion ? `${duration}ms` : "0ms";
      track.style.transform = `translate3d(${-100 * physicalIndex}%,0,0)`;
    };
    const syncAccessibleState = () => {
      slides.forEach((slide) => {
        const isClone = slide.dataset.homeStaffClone === "true";
        const isActive = !isClone && Number(slide.dataset.homeStaffLogical) === logicalIndex;
        slide.setAttribute("aria-hidden", String(!isActive));
        slide.inert = !isActive;
        if (isClone) slide.querySelector("img")?.setAttribute("alt", "");
      });
      dots.forEach((dot) => dot.setAttribute("aria-current", String(Number(dot.dataset.homeStaffDot) === logicalIndex)));
      status.textContent = `${logicalIndex + 1} / ${staffProfiles.length}、${staffProfiles[logicalIndex].name}`;
    };
    const preloadedProfiles = new Map();
    const decodeProfile = (index) => {
      const normalized = normalizeLogical(index);
      if (!preloadedProfiles.has(normalized)) {
        const image = new Image();
        image.src = resolveMedia(staffProfiles[normalized].image).src;
        const promise = image.decode().catch(() => {
          preloadedProfiles.delete(normalized);
          throw new Error(`staff image decode failed: ${normalized}`);
        });
        preloadedProfiles.set(normalized, promise);
      }
      return preloadedProfiles.get(normalized);
    };
    let scheduleAuto = () => {};
    let runPendingRequest = () => {};
    const completeTransition = () => {
      if (state !== "animating" && state !== "snapping") return;
      clearTransitionFallback();
      state = "snapping";
      logicalIndex = animationLogicalTarget;
      const canonicalPhysicalIndex = logicalIndex + 1;
      if (physicalIndex !== canonicalPhysicalIndex) setTrackPosition(canonicalPhysicalIndex, false);
      syncAccessibleState();
      state = "idle";
      if (pendingRequest) runPendingRequest();
      else scheduleAuto();
    };
    const animateRequest = async (request) => {
      activeRequestOrigin = request.origin;
      state = "decoding";
      const generation = ++actionGeneration;
      try {
        await decodeProfile(request.target);
      } catch {
        if (disposed || generation !== actionGeneration) return;
        state = "idle";
        requestedLogicalIndex = logicalIndex;
        if (pendingRequest) runPendingRequest();
        else scheduleAuto();
        return;
      }
      if (disposed || generation !== actionGeneration) {
        if (!disposed && state === "decoding") {
          state = "idle";
          runPendingRequest();
        }
        return;
      }
      if (request.origin === "auto" && !canAutoRotate()) {
        state = "idle";
        requestedLogicalIndex = logicalIndex;
        scheduleAuto();
        return;
      }
      animationLogicalTarget = request.target;
      let targetPhysicalIndex = request.target + 1;
      if (request.direction === "next" && logicalIndex === staffProfiles.length - 1 && request.target === 0) targetPhysicalIndex = staffProfiles.length + 1;
      if (request.direction === "prev" && logicalIndex === 0 && request.target === staffProfiles.length - 1) targetPhysicalIndex = 0;
      state = "animating";
      setTrackPosition(targetPhysicalIndex, true);
      if (reducedMotion) {
        requestAnimationFrame(completeTransition);
      } else {
        const fallback = usesMobileLayout() ? HOME_STAFF_MOBILE_TRANSITION_MS + 200 : HOME_STAFF_TRANSITION_FALLBACK_MS;
        transitionFallbackId = window.setTimeout(completeTransition, fallback);
      }
      if (request.focusDot) dots[request.target]?.focus();
    };
    const requestSlide = (nextIndex, focusDot = false, origin = "manual", direction = "direct") => {
      clearTimer();
      if (origin === "manual" && usesMobileLayout()) {
        rotationRequested = false;
        updateRotationControl();
        if (state !== "idle" && activeRequestOrigin === "auto" && direction !== "direct") {
          nextIndex = logicalIndex + (direction === "next" ? 1 : -1);
        }
      }
      requestedLogicalIndex = normalizeLogical(nextIndex);
      const request = {target: requestedLogicalIndex, focusDot, origin, direction};
      if (state !== "idle") {
        pendingRequest = request;
        if (state === "decoding") actionGeneration += 1;
        return;
      }
      animateRequest(request);
    };
    runPendingRequest = () => {
      if (disposed || state !== "idle" || !pendingRequest) return;
      const request = pendingRequest;
      pendingRequest = null;
      if (request.target === logicalIndex) {
        requestedLogicalIndex = logicalIndex;
        scheduleAuto();
        return;
      }
      animateRequest(request);
    };
    scheduleAuto = () => {
      clearTimer();
      updateRotationControl();
      if (!canAutoRotate() || state !== "idle") return;
      timerId = window.setTimeout(()=>requestSlide(logicalIndex + 1, false, "auto", "next"), HOME_STAFF_AUTO_INTERVAL_MS);
    };
    const onPrevious = () => requestSlide(requestedLogicalIndex - 1, false, "manual", "prev");
    const onNext = () => requestSlide(requestedLogicalIndex + 1, false, "manual", "next");
    const onDotClick = (event) => requestSlide(Number(event.currentTarget.dataset.homeStaffDot), false, "manual", "direct");
    const onKeyDown = (event) => {
      keyboardModality = true;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        requestSlide(requestedLogicalIndex + (event.key === "ArrowRight" ? 1 : -1), true, "manual", event.key === "ArrowRight" ? "next" : "prev");
      }
    };
    let swipeStart = null;
    const finishSwipe = () => {
      swipeStart = null;
      pauseReasons.delete("touch");
      scheduleAuto();
    };
    const onPointerDown = (event) => {
      keyboardModality = false;
      if (event.pointerType !== "touch") return;
      if (!event.isPrimary) { finishSwipe(); return; }
      if (!event.target.closest(".home-staff-photo")) return;
      rotationRequested = false;
      swipeStart = { id: event.pointerId, x: event.clientX, y: event.clientY };
      homeStaffCarousel.setPointerCapture(event.pointerId);
      pauseReasons.add("touch");
      clearTimer();
      updateRotationControl();
    };
    const onPointerUp = (event) => {
      if (!swipeStart || swipeStart.id !== event.pointerId) return;
      const dx = event.clientX - swipeStart.x;
      const dy = event.clientY - swipeStart.y;
      if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) onNext(); else onPrevious();
      }
      finishSwipe();
    };
    const onPointerCancel = () => { finishSwipe(); };
    const onMouseEnter = () => { pauseReasons.add("hover"); clearTimer(); updateRotationControl(); };
    const onMouseLeave = () => { pauseReasons.delete("hover"); scheduleAuto(); };
    const onFocusIn = (event) => {
      if (event.relatedTarget && homeStaffCarousel.contains(event.relatedTarget)) return;
      if (!keyboardModality) return;
      focusSuspended = true;
      clearTimer();
      updateRotationControl();
    };
    const onVisibilityChange = () => {
      if (document.hidden) pauseReasons.add("hidden"); else pauseReasons.delete("hidden");
      if (document.hidden && state === "animating") completeTransition();
      scheduleAuto();
    };
    const onReducedMotionChange = (event) => {
      reducedMotion = event.matches;
      if (reducedMotion) rotationRequested = false;
      scheduleAuto();
    };
    const onRotationClick = () => {
      rotationRequested = !rotationRequested;
      if (rotationRequested) focusSuspended = false;
      scheduleAuto();
    };
    const onTransitionEnd = (event) => {
      if (event.target !== track || event.propertyName !== "transform") return;
      completeTransition();
    };
    const onResize = () => {
      if (resizeFrameId) cancelAnimationFrame(resizeFrameId);
      resizeFrameId = requestAnimationFrame(() => {
        resizeFrameId = 0;
        if (state === "animating") completeTransition();
        else setTrackPosition(logicalIndex + 1, false);
      });
    };
    previousButton.addEventListener("click", onPrevious);
    nextButton.addEventListener("click", onNext);
    dots.forEach((dot) => dot.addEventListener("click", onDotClick));
    track.addEventListener("transitionend", onTransitionEnd);
    homeStaffCarousel.addEventListener("keydown", onKeyDown);
    homeStaffCarousel.addEventListener("pointerdown", onPointerDown);
    homeStaffCarousel.addEventListener("pointerup", onPointerUp);
    homeStaffCarousel.addEventListener("pointercancel", onPointerCancel);
    homeStaffCarousel.addEventListener("mouseenter", onMouseEnter);
    homeStaffCarousel.addEventListener("mouseleave", onMouseLeave);
    homeStaffCarousel.addEventListener("focusin", onFocusIn);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("resize", onResize, {passive:true});
    mediaQuery.addEventListener("change", onReducedMotionChange);
    rotationControl.addEventListener("click", onRotationClick);
    const observer = new IntersectionObserver((entries)=>{
      const visible = entries[0]?.intersectionRatio >= .4;
      if (visible) pauseReasons.delete("offscreen"); else pauseReasons.add("offscreen");
      scheduleAuto();
    }, {threshold:[0,.4]});
    observer.observe(homeStaffCarousel);
    disposeHomeStaffCarousel = () => {
      if (disposed) return;
      disposed = true;
      clearTimer();
      clearTransitionFallback();
      if (resizeFrameId) cancelAnimationFrame(resizeFrameId);
      actionGeneration += 1;
      pendingRequest = null;
      observer.disconnect();
      previousButton.removeEventListener("click", onPrevious);
      nextButton.removeEventListener("click", onNext);
      dots.forEach((dot) => dot.removeEventListener("click", onDotClick));
      track.removeEventListener("transitionend", onTransitionEnd);
      homeStaffCarousel.removeEventListener("keydown", onKeyDown);
      homeStaffCarousel.removeEventListener("pointerdown", onPointerDown);
      homeStaffCarousel.removeEventListener("pointerup", onPointerUp);
      homeStaffCarousel.removeEventListener("pointercancel", onPointerCancel);
      homeStaffCarousel.removeEventListener("mouseenter", onMouseEnter);
      homeStaffCarousel.removeEventListener("mouseleave", onMouseLeave);
      homeStaffCarousel.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", onResize);
      mediaQuery.removeEventListener("change", onReducedMotionChange);
      rotationControl.removeEventListener("click", onRotationClick);
    };
    setTrackPosition(1, false);
    syncAccessibleState();
    scheduleAuto();
  }
}

const scrollStorageKey = () => `milky-scroll:${location.pathname}${location.search}`;
let reloadScrollPosition;
try {
  if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
    reloadScrollPosition = JSON.parse(sessionStorage.getItem(scrollStorageKey()) || "null");
  }
} catch { reloadScrollPosition = null; }
const restoringScroll = reloadScrollPosition && Number.isFinite(reloadScrollPosition.y);
const initialOpacity = document.documentElement.style.opacity;
if (restoringScroll) {
  history.scrollRestoration = "manual";
  document.documentElement.style.opacity = "0";
}
addEventListener("pagehide", () => {
  try { sessionStorage.setItem(scrollStorageKey(), JSON.stringify({ x: scrollX, y: scrollY })); } catch { /* Storage may be disabled by browser settings. */ }
});
let renderedPathname;

function render({ focusRoute = false, resetScroll = focusRoute } = {}) {
  disposeHomeStaffCarousel();
  disposeHomeStaffCarousel = () => {};
  disposeSubpageMotion();
  disposeSubpageMotion = () => {};
  document.body.classList.remove("nav-open");
  const resolved = resolveRoute(location.pathname);
  const currentRouteId = resolved.routeId;
  const current = routeRegistry[currentRouteId];
  const embedQuery = new URLSearchParams(location.search).get("embed");
  const embedMode = window.self !== window.top
    || embedQuery === "subpage-family"
    || embedQuery === "family-rough";
  const suppressSharedShell = embedMode
    && current.path === routePath("concept");
  applySharedDocumentBrand();
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    const description = current.path === "/milky-veil-preview/"
      ? "渋谷のカラーデザインサロン MILKY VEIL デモサイト"
        : pageCopy[current.label]?.text || `${current.label} | MILKY VEIL デモサイト`;
    metaDescription.setAttribute("content", description);
  }
  const isConceptRoute = currentRouteId === "concept";
  const isContactRoute = currentRouteId === "contact";
  document.body.classList.toggle("contact-page", isContactRoute);
  const routeShell = isContactRoute
    ? '<div id="shared-concept-menu-root" class="has-split-hero" data-logo-top-only data-logo-state="active"></div>'
    : isConceptRoute
    ? conceptHeader(current.path)
    : `${header(current.path === "/milky-veil-preview/", current.path)}${currentRouteId === "home" ? `<div class="home-simple-menu">${sharedConceptMenuMarkup(current.path)}</div>` : globalOverlay(current.path)}`;
  const appBody = suppressSharedShell
    ? renderPage(location.pathname)
    : `${routeShell}${renderPage(location.pathname)}`;
  const showHomeOpening = currentRouteId === "home" && document.documentElement.classList.contains("home-opening-pending");
  document.getElementById("app").innerHTML = `${showHomeOpening ? homeOpeningMarkup() : ""}${appBody}`;
  if (isContactRoute) mountSharedConceptMenu(document.getElementById("shared-concept-menu-root"), current.path);
  if (showHomeOpening) bindHomeOpening();
  else {
    document.documentElement.classList.remove("home-opening-pending");
    document.body.classList.remove("home-opening-active");
    document.body.classList.remove("home-opening-content-pending", "home-opening-content-visible");
  }
  const sharedBottomUiRoot = document.getElementById("shared-bottom-ui-root");
  const sharedBottomScope = suppressSharedShell
    ? (clearSharedBottomUi(sharedBottomUiRoot), null)
    : mountSharedBottomUi(sharedBottomUiRoot, current.path);
  bind(sharedBottomScope);
  if (storedTranslationLanguage()) ensureGoogleTranslate();
  else mountGoogleTranslateWidgets();
  if (isContactRoute && location.hash === `#${sharedPrivacyPolicyAnchorId}`) {
    document.fonts.ready.then(() => requestAnimationFrame(() => {
      document.getElementById(sharedPrivacyPolicyAnchorId)?.scrollIntoView({ block: "start", behavior: "instant" });
    }));
  }
  renderedPathname = location.pathname;
  if (resetScroll) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

addEventListener("popstate", () => {
  if (location.pathname !== renderedPathname) render({ focusRoute: true, resetScroll: false });
});
render();
if (restoringScroll) {
  sharedBottomUiReady(document.getElementById("shared-bottom-ui-root")).then(() => document.fonts.ready).then(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      window.scrollTo({ left: reloadScrollPosition.x, top: reloadScrollPosition.y, behavior: "instant" });
      requestAnimationFrame(() => {
        document.documentElement.style.opacity = initialOpacity;
        history.scrollRestoration = "auto";
      });
    }));
  });
}
