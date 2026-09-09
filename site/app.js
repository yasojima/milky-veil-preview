import { conceptFirstViewImage, waitForConceptFirstViewImages } from "./concept-first-view-images.js?v=20260907-01&pages=20260909-029";
import { resolveMedia, responsiveSrcset } from "./responsive-media.js?v=20260909-009&pages=20260909-029";
import { bindMilkyKaleidoscopeVideo, milkyKaleidoscopeVideoMarkup } from "./milky-kaleidoscope-video.js?v=20260904-01&pages=20260909-029";
import { bindSharedFixedShell } from "./shared-fixed-shell.js?v=20260902-06&pages=20260909-029";
import { clearSharedBottomUi, mountSharedBottomUi } from "./shared-bottom-ui.js?v=20260908-01&pages=20260909-029";
import { sharedScrollCueMarkup } from "./shared-scroll-cue.js?v=20260902-01&pages=20260909-029";
import { bindSharedConceptMenu, sharedConceptMenuMarkup } from "./shared-concept-menu.js?v=20260902-03&pages=20260909-029";
import { sharedBrandEyebrow, sharedBrandHeadlineLines, sharedBrandSupportingLines, sharedPrimaryRouteIds, sharedRouteIds, sharedRouteRegistry, sharedSalonData, sharedSecondaryRouteIds, sharedSocials } from "./shared-site-data.js?v=20260906-02&pages=20260909-029";
import { applySharedDocumentBrand } from "./shared-document-brand.js?v=20260902-04&pages=20260909-029";

const A = "/milky-veil-preview/assets/generated/";
const P = `${A}light-salon-pack/`;
const J = `${A}journal-model-06-pack-v2/`;
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
    demoReservation: Object.freeze({ kind: "demo", label: "ご予約はこちら" }),
    hotpepper: Object.freeze({ kind: "external", label: "ご予約はこちら", href: "https://beauty.hotpepper.jp/" }),
    translate: Object.freeze({
      kind: "embedded-service",
      provider: "Google Translate",
      scriptSrc: "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",
      includedLanguages: "af,sq,am,ar,hy,az,eu,be,bn,bs,bg,ca,ceb,zh-CN,zh-TW,co,hr,cs,da,nl,en,eo,et,fi,fr,fy,gl,ka,de,el,gu,ht,ha,haw,he,hi,hmn,hu,is,ig,id,ga,it,ja,jv,kn,kk,km,rw,ko,ku,ky,lo,la,lv,lt,lb,mk,mg,ms,ml,mt,mi,mr,mn,my,ne,no,ny,or,ps,fa,pl,pt,pa,ro,ru,sm,gd,sr,st,sn,sd,si,sk,sl,so,es,su,sw,sv,tl,tg,ta,tt,te,th,tr,tk,uk,ur,ug,uz,vi,cy,xh,yi,yo,zu",
    }),
  }),
  assistChannels: Object.freeze([
    Object.freeze({ id: "webChat", label: "WEB CHAT", enabled: false, href: null, placement: "floating-support" }),
    Object.freeze({ id: "lineChat", label: "LINE CHAT", enabled: false, href: null, placement: "floating-support" }),
  ]),
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
    lead: "カラーを軸に、必要なメニューを組み合わせる。",
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
  JOURNAL: { lead: "髪とファッションの、いまを静かに記録する。", text: "色、質感、ケア、渋谷の空気。MILKY VEILの視点で編集したデモマガジンです。" },
  COLUMN: { lead: "髪の選択肢を、わかりやすく。", text: "ブリーチ、カラー、エクステ、パーマ、ケアに関する基本情報を整理します。" },
  FEATURE: { lead: "髪色と質感から、今のムードを更新する。", text: "カラーを中心に、カット、エクステ、パーマ、ケアをひとつのデザインとして考えます。" },
  COLOR: { lead: "色落ちの先まできれいな、自由なカラー。", text: "現在の明るさ、残留色素、ダメージを確認し、無理のない工程で理想へ近づけます。" },
  PERM: { lead: "動きがあるだけで、いつもの服が変わって見える。", text: "骨格、毛流れ、髪の太さを見ながら、毎日扱いやすいカールをつくります。" },
  STRAIGHT: { lead: "伸ばすのではなく、扱いやすい質感へ整える。", text: "うねりを抑えながら、自然な丸みとやわらかさを残します。" },
  TREATMENT: { lead: "次のカラーを楽しむための、補修と保護。", text: "乾燥、切れ毛、褪色、熱ダメージを確認し、必要なケアを選びます。" },
  "MEN'S": { lead: "性別ではなく、好きなムードから選ぶ。", text: "カット、カラー、パーマ、エクステまで、ファッションになじむデザインをつくります。" },
  CONTACT: { lead: "ご相談・お問い合わせ", text: "こちらはデモフォームです。入力内容は送信・保存されません。" },
  "PRIVACY POLICY": { lead: "プライバシーポリシー", text: "本ページはデモサイトの個人情報取り扱い方針を示す仮原稿です。" },
  "SITE MAP": { lead: "サイトマップ", text: "MILKY VEILデモサイトの全17ページをご案内します。" },
};

const homeSplitSections = Object.freeze([
  Object.freeze({
    label: "CONCEPT",
    heading: Object.freeze(["ダメージを抑えて", "カラーをもっと自由に。"]),
    text: "繰り返すブリーチやハイトーンを前提に、髪の状態へ合わせて薬剤とケア工程を細かく調整します。",
    image: `${P}02-concept-closeup-purple.png`,
    reverse: false,
    routeId: "concept",
    sectionId: "concept-home",
  }),
  Object.freeze({
    label: "MENU",
    heading: Object.freeze(["今っぽさを", "自分らしく似合わせる。"]),
    text: "トレンドカラー、エクステ、デザインパーマ、カットまで。骨格、髪質、ファッションへ合わせてあなたのバランスへ落とし込みます。",
    image: `${A}home-role-locked-pack-v1/home-service-customer-05-v1.png`,
    reverse: true,
    routeId: "menu",
    sectionId: "menu-home",
  }),
]);

const featureCards = [
  ["COLOR", "featureColor", `${P}08-lavender-hair-back.png`, "光と色落ちまで設計するカラー"],
  ["PERM", "featurePerm", `${P}09-short-curl-portrait.png`, "服になじむ動きと質感"],
  ["STRAIGHT", "featureStraight", `${P}03-service-closeup-blonde.png`, "やわらかく扱いやすいストレート"],
  ["TREATMENT", "featureTreatment", `${P}05-bleach-treatment.png`, "次のデザインへつなぐ補修"],
  ["MEN'S", "featureMens", `${P}09-short-curl-portrait.png`, "性別で区切らないデザイン"],
];

const homeFeatureCards = [
  ["COLOR", `${HF}color-lavender-customer-v2.png`],
  ["TEXTURE", `${HF}texture-white-bob-customer-v2.png`],
  ["SILHOUETTE", `${HF}silhouette-long-blonde-customer-v2.png`],
  ["MOOD", `${HF}mood-root-white-bob-customer-v3.png`],
  ["IDENTITY", `${HF}identity-white-purple-updo-customer-v3.png`],
];

const staffProfiles = Object.freeze([
  Object.freeze({
    name: "MIU",
    role: "STYLIST",
    image: `${A}staff-shibuya/staff-miu-editorial-v4.png`,
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
const HOME_STAFF_TRANSITION_FALLBACK_MS = 900;
let disposeHomeStaffCarousel = () => {};
let disposeSubpageMotion = () => {};

const posts = [
  "はじめてのブリーチ。予約前に伝えてほしい3つのこと",
  "色落ちまでかわいい、ラベンダーカラーのつくり方",
  "エクステを自然になじませるための本数とケア",
  "ブリーチ毛にパーマはできる？判断のポイント",
  "ハイトーンを守るアイロン温度",
  "顔まわりを変えるポイントカラー",
  "カラーシャンプーの選び方",
  "次回カラーまでのケアカレンダー",
  "ショートパーマのスタイリング",
  "複雑履歴のカウンセリングについて",
];

const journalIssue = Object.freeze({
  number: "07",
  label: "2026.07",
  season: "SUMMER / 2026",
  cover: `${J}01-journal-cover-model-06-v3.png`,
  featureSlug: "first-bleach",
  supportingSlugs: Object.freeze(["lavender-color", "salon-hours", "extension-care", "bleach-perm"]),
  categories: Object.freeze(["ALL", "HAIR", "COLOR", "CARE", "LIFESTYLE", "SALON", "NEWS"]),
});

const journalMedia = (src, extra = {}) => Object.freeze({
  listFeature: src,
  card: src,
  ...extra,
});

const journalPosts = Object.freeze([
  Object.freeze({
    slug: "first-bleach",
    category: "FEATURE",
    date: "2026.07.02",
    title: "はじめてのブリーチ。予約前に伝えてほしい3つのこと",
    listTitleLines: Object.freeze(["はじめてのブリーチ", "予約前に伝えてほしい", "3つのこと"]),
    media: journalMedia(`${J}02-first-bleach-feature-model-06-v2.png`),
  }),
  Object.freeze({
    slug: "lavender-color",
    category: "COLOR",
    date: "2026.07.06",
    title: "色落ちまでかわいい、ラベンダーカラーのつくり方",
    media: journalMedia(`${J}03-color-fade-model-06-approved.png`),
  }),
  Object.freeze({
    slug: "salon-hours",
    category: "SALON",
    date: "2026.07.11",
    title: "渋谷で見つける、静かなヘアサロンの時間",
    media: journalMedia(journalIssue.cover, { indexCard: `${J}01-interior-wide.png`, homeCover: journalIssue.cover }),
  }),
  Object.freeze({
    slug: "extension-care",
    category: "CARE",
    date: "2026.07.17",
    title: "エクステを自然になじませるための本数とケア",
    media: journalMedia(`${J}04-extension-hair-detail-model-06-v2.png`),
  }),
  Object.freeze({
    slug: "bleach-perm",
    category: "HAIR",
    date: "2026.07.23",
    title: "ブリーチ毛にパーマはできる？判断のポイント",
    media: journalMedia(`${J}05-bleached-perm-model-06-approved.png`),
  }),
]);

const columns = [
  "ケアブリーチと通常ブリーチの違い",
  "エクステの種類と、自然に見える選び方",
  "カラー前に伝えたい施術履歴",
  "ハイトーンをきれいに保つアイロン温度",
  "色落ちを味方にするカラー設計",
  "パーマの強さと日々の扱いやすさ",
  "ブリーチ後に必要なホームケア",
  "顔まわりデザインの考え方",
  "髪色とファッションのバランス",
  "次のデザインにつなげるメンテナンス",
];

function link(routeId, cls = "", currentPath = "", labelOverride = "") {
  const { path, label } = routeRegistry[routeId];
  const normalizedCurrent = currentPath.endsWith("/") ? currentPath : `${currentPath}/`;
  const isCurrent = currentPath && path === normalizedCurrent;
  return `<a class="${cls}" href="${path}" data-link${isCurrent ? ' aria-current="page"' : ""}>${labelOverride || label}</a>`;
}

function socialIcons() {
  return `<div class="social-icons" aria-label="SNS（デモ・リンク未設定）">
    ${shellData.socials.map(({name,file})=>`<span class="social-icon social-${name.toLowerCase()}" title="${name}"><img src="/milky-veil-preview/assets/ui/social/${file}" alt="${name}"></span>`).join("")}
  </div>`;
}

function translationControl(id = "header") {
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

let activeTranslateTargetId = "google-translate-header";
let googleTranslateGadget = null;
const translationStorageKey = "milky-veil-translation-language";

function storedTranslationLanguage() {
  try {
    return sessionStorage.getItem(translationStorageKey) || "";
  } catch {
    return "";
  }
}

function rememberTranslationLanguage(language) {
  try {
    if (!language || language === "ja") sessionStorage.removeItem(translationStorageKey);
    else sessionStorage.setItem(translationStorageKey, language);
  } catch {
    // Translation still works for the current page when storage is unavailable.
  }
}

function connectGoogleTranslateCombo(gadget) {
  const combo = gadget?.querySelector(".goog-te-combo");
  if (!combo || combo.dataset.milkyVeilBound === "true") return;
  combo.dataset.milkyVeilBound = "true";
  combo.addEventListener("change", () => rememberTranslationLanguage(combo.value));
  const storedLanguage = storedTranslationLanguage();
  if (storedLanguage && combo.value !== storedLanguage) {
    combo.value = storedLanguage;
    combo.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

function mountGoogleTranslateWidgets() {
  if (!window.google?.translate?.TranslateElement) return;
  if (googleTranslateGadget && !googleTranslateGadget.isConnected) googleTranslateGadget = null;
  const target = document.getElementById(activeTranslateTargetId)
    || document.querySelector("[data-google-translate]");
  if (!target) return;
  googleTranslateGadget ||= document.querySelector(".goog-te-gadget");
  if (googleTranslateGadget) {
    target.replaceChildren(googleTranslateGadget);
    connectGoogleTranslateCombo(googleTranslateGadget);
    return;
  }
  if (target.dataset.initialized === "true") return;
  target.dataset.initialized = "true";
  new window.google.translate.TranslateElement({
    pageLanguage: "ja",
    includedLanguages: shellData.actions.translate.includedLanguages,
    autoDisplay: false,
  }, target.id);
  googleTranslateGadget = target.querySelector(".goog-te-gadget");
  connectGoogleTranslateCombo(googleTranslateGadget);
  if (!googleTranslateGadget) {
    requestAnimationFrame(() => {
      googleTranslateGadget = target.querySelector(".goog-te-gadget");
      connectGoogleTranslateCombo(googleTranslateGadget);
    });
  }
}

window.googleTranslateElementInit = mountGoogleTranslateWidgets;

function ensureGoogleTranslate() {
  if (window.google?.translate?.TranslateElement) {
    mountGoogleTranslateWidgets();
    return;
  }
  if (document.getElementById("google-translate-script")) return;
  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src = shellData.actions.translate.scriptSrc;
  script.async = true;
  script.onerror = () => {
    document.querySelectorAll("[data-google-translate]").forEach((element) => {
      element.textContent = "翻訳機能を読み込めませんでした。";
    });
  };
  document.head.append(script);
}

function header(isHome = false, currentPath = "/") {
  const { salon, navigation, actions } = shellData;
  return `
    <header class="site-header ${isHome ? "header-on-hero" : "header-on-page"}">
      <a class="brand" href="/milky-veil-preview/" data-link aria-label="MILKY VEIL ホーム">
        <img class="brand-mark" src="/milky-veil-preview/assets/generated/logo-concepts/logo-mv-monogram-transparent-v2.png" width="497" height="640" alt="" aria-hidden="true">
      </a>
      <div class="header-desktop">
          <p class="header-message">${salon.headerMessage}</p>
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
      <button class="menu-toggle" aria-expanded="false" aria-controls="global-nav">
        <span></span><span></span><span></span><b>MENU</b>
      </button>
    </header>`;
}

function conceptHeader(currentPath = "/") {
  return sharedConceptMenuMarkup(currentPath);
}

function globalOverlay(currentPath = "/") {
  const { navigation, salon } = shellData;
  const content = `<div class="nav-main">${navigation.primary.map((r) => link(r, "", currentPath)).join("")}</div>
      <div class="nav-sub">${navigation.secondary.map((r) => link(r, "", currentPath)).join("")}</div>
      <div class="nav-meta"><span>${salon.headerMessage}</span>${socialIcons()}${translationControl("overlay")}</div>`;
  return `<nav id="global-nav" class="global-nav" aria-label="グローバルナビゲーション" aria-hidden="true" inert>
    ${content}
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
  const heading = Array.isArray(sub)
    ? sub.map((line) => `<span class="split-heading-line">${line}</span>`).join("")
    : sub;
  return `
    <section class="split ${reverse ? "reverse" : ""}" ${id ? `id="${id}"` : ""}>
      <div class="split-media">${responsiveImage(image, "", { sizes: "(max-width: 900px) 100vw, 50vw" })}</div>
      <div class="split-copy">
        <p class="eyebrow">${title}</p>
        <h2>${heading}</h2>
        <p>${body}</p>
        ${routeId ? `<a class="outline-link wave-cta" href="${routePath(routeId)}" data-link>VIEW ${title}</a>` : ""}
      </div>
    </section>`;
}

function related() {
  return `
    <section class="related">
      <p class="eyebrow">EXPLORE MILKY VEIL</p>
      <h2>もっと自分らしいスタイルへ。</h2>
      <div class="related-grid">
        ${["concept", "menu", "staff", "feature"].map((id) => link(id, "related-link")).join("")}
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

function home() {
  const { hotpepper } = shellData.actions;
  return `
    <main id="main">
      <section class="hero">
        ${heroMediaFrame(homeHeroMedia)}
        <div class="hero-shade"></div>
        <div class="hero-copy">
          <p>${sharedBrandEyebrow}</p>
          <h1>${sharedBrandHeadlineLines.join("<br>")}</h1>
          <span>${sharedBrandSupportingLines.join("<br>")}</span>
          <a class="hero-reserve wave-cta" href="${hotpepper.href}" target="_blank" rel="noopener noreferrer" aria-label="Hot Pepper Beautyを新しいタブで開きます"><span>${hotpepper.label}</span><i aria-hidden="true"></i></a>
        </div>
        ${sharedScrollCueMarkup({ target: "#concept-home", ariaLabel: "コンセプトセクションへ移動" })}
      </section>
      <section class="intro">
        <div class="intro-image">${responsiveImage(`${A}home-introduction/three-model-editorial-collage-v1.png`, "ラベンダー、ホワイトパープル、ブロンドのスタイルを楽しむ3人の女性", { sizes: "(max-width: 900px) 100vw, 55vw" })}</div>
        <div class="intro-copy">
          <p class="eyebrow">INTRODUCTION</p>
          <h2><span class="split-heading-line">なりたい色を</span><span class="split-heading-line">諦めない</span></h2>
          <p>ブリーチも、エクステも、パーマも。髪への負担をできる限り抑えながら、いまの気分にいちばん似合うスタイルを形にする、渋谷のデザインサロンです。</p>
        </div>
      </section>
      ${homeSplitSections.map(({ label, heading, text, image, reverse, routeId, sectionId }) => splitSection(label, heading, text, image, reverse, routeId, sectionId)).join("")}
      <section class="duo">
        <a href="${routePath("menu")}" data-link>${responsiveImage(`${A}home-role-locked-pack-v1/home-menu-color-service-v4.png`, "", { sizes: "(max-width: 900px) 100vw, 50vw" })}<span><b>MENU</b></span></a>
        <a href="${routePath("items")}" data-link>${responsiveImage(`${A}home-role-locked-pack-v1/home-items-customer-06-v1.png`, "", { sizes: "(max-width: 900px) 100vw, 50vw" })}<span><b>ITEMS</b></span></a>
      </section>
      ${staffStrip()}
      ${journalPreview()}
      <section class="access-home">
        ${responsiveImage(`${A}home-access/interior-collage-night-v1.png`, "夜の渋谷を望むMILKY VEILの店内コラージュ")}
        <div><p class="eyebrow">ACCESS</p><h2>SHIBUYA<br>COLOR SALON</h2><p>${shellData.salon.accessLabel}</p>${link("access","outline-link light wave-cta","","VIEW ACCESS")}</div>
      </section>
      <section class="feature-home">
        <div class="section-title"><p class="eyebrow">FEATURE</p><h2>DESIGN<br>WITHOUT LIMITS.</h2></div>
        <div class="feature-grid">${homeFeatureCards.map(([n,img])=>`<article class="feature-card feature-card-${n.toLowerCase()}">${responsiveImage(img, "", { sizes: "(max-width: 900px) 75vw, 20vw" })}<span><b>${n}</b></span></article>`).join("")}</div>
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
        <h2 id="home-staff-title">6つの感性で、<br>ひとりの“好き”を形に。</h2>
        <p>カラー、エクステ、パーマ、カット。異なる得意分野を持つ6名が、髪の履歴と今の気分から、あなただけのバランスを見つけます。</p>
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

function articlePreview(title, items, routeId) {
  return `
    <section class="article-preview">
      <div class="section-title"><p class="eyebrow">${title}</p><h2>NEW<br>${title}</h2></div>
      <div class="article-list">${items.slice(0,4).map((p,i)=>`<article><span>2026.0${i+1}.00</span><h3>${p}</h3><i>↗</i></article>`).join("")}</div>
      ${link(routeId,"outline-link wave-cta","",`VIEW ${title}`)}
    </section>`;
}

function journalIssueBadge(modifier = "") {
  return `<div class="journal-issue ${modifier}" aria-label="ISSUE ${journalIssue.label}"><span>ISSUE</span><strong>${journalIssue.number}</strong><small>${journalIssue.season}</small></div>`;
}

function journalCard(post, className = "", mediaRole = "card") {
  const mediaSource = post.media[mediaRole] || post.media.card;
  return `<article class="journal-card ${className}">
    <figure>${responsiveImage(mediaSource, "", { sizes: mediaRole === "indexCard" ? "(max-width: 900px) 50vw, 25vw" : "(max-width: 900px) 100vw, 33vw" })}</figure>
    <p><span>${post.category}</span><time datetime="${post.date.replaceAll(".", "-")}">${post.date}</time></p>
    <h3>${post.title}</h3><i aria-hidden="true">→</i>
  </article>`;
}

function journalPreview() {
  const secondary = journalPosts.slice(1);
  return `<section class="journal-preview" aria-labelledby="journal-preview-title">
    <div class="journal-cover-rail" aria-hidden="true"><span>MILKY VEIL</span><small>SHIBUYA</small><i></i></div>
    <div class="journal-cover-media">
      <div class="journal-cover-image" aria-hidden="true">${responsiveImage(journalIssue.cover, "", { loading: "eager", sizes: "(max-width: 900px) 116px, 34vw", fetchPriority: "high" })}</div>
      ${journalIssueBadge("journal-issue--cover")}
    </div>
    <div class="journal-cover-copy">
      <h2 id="journal-preview-title">MILKY<br>JOURNAL</h2>
      <p class="journal-cover-lead">髪からはじまるファッションとカルチャー<br>新しい私に出会う瞬間をそっと集めて<br>髪と私をつなぐ小さな物語</p>
      <article class="journal-cover-feature">
        <p>FEATURE STORY</p>
        <h3>はじめてのブリーチ<br>予約前に伝えてほしい<br>3つのこと</h3>
        <a class="journal-read" href="${routePath("blog")}" data-link>READ STORY <i aria-hidden="true">→</i></a>
      </article>
      <div class="journal-cover-list">${secondary.slice(0,2).map((post,index)=>`<a href="${routePath("blog")}" data-link><span>0${index+2}</span><strong>${post.title}</strong><i aria-hidden="true">→</i></a>`).join("")}</div>
      <a class="journal-explore wave-cta" href="${routePath("blog")}" data-link><span>EXPLORE JOURNAL</span><i aria-hidden="true">→</i></a>
    </div>
  </section>`;
}

function subpageImageSlot(label, description) {
  return `<figure class="subpage-image-slot" role="img" aria-label="${description}" data-image-role="${label}"><span>${label}</span><i aria-hidden="true"></i></figure>`;
}

function conceptPage() {
  const C = `${A}concept-family-two-model-pack-v1/`;
  const P = "/milky-veil-preview/assets/generated/concept-point02-framing/";
  return `<main id="main" class="subpage subpage-concept concept-uniplex-mainline">
    <div id="top" class="concept-uniplex-content">
      <div class="intro-sequence" data-motion="intro-sequence">
        <div class="intro-logo-motion home-concept__bg"><div class="intro-logo-viewport"><div class="intro-logo-stage home-concept__bg-in milky-kaleidoscope-stage concept-fv-background-stage" aria-hidden="true">${milkyKaleidoscopeVideoMarkup()}</div></div></div>
        <div class="hero-layer">
          <section class="hero js-home-mv l-main-img is-intro-pending is-fv-media-pending" data-motion="hero" aria-labelledby="hero-title">
            <span class="concept-fv-trigger js-home-mv-trigger l-main-img__trigger" data-motion="hero-trigger" aria-hidden="true"></span>
            <div class="hero-stage l-main-img__inner">
              <div class="l-main-img-bg">
                <div class="hero-media hero-media-left l-main-img-bg__col is-col01"><span class="concept-fv-portrait l-main-img-bg__col-img">${conceptFirstViewImage("left")}</span></div>
                <div class="hero-media hero-media-right l-main-img-bg__col is-col02"><span class="concept-fv-portrait js-home-mv-img is-reverse l-main-img-bg__col-img">${conceptFirstViewImage("right")}</span></div>
              </div>
              <div class="concept-fv-content js-home-mv-content l-main-img__content is-hidden">
                <h1 id="hero-title" class="l-main-img__logo"><svg viewBox="0 0 1920 285" aria-hidden="true" focusable="false"><text x="0" y="250" textLength="1920" lengthAdjust="spacingAndGlyphs">MILKY VEIL</text></svg><span class="sr-only">MILKY VEIL</span></h1>
              </div>
              ${sharedScrollCueMarkup({ target: "#concept", ariaLabel: "コンセプトセクションへ移動" })}
            </div>
          </section>
        </div>
        <div class="concept-layer">
          <div class="concept-layer-spacer" aria-hidden="true"></div>
          <section class="concept" id="concept" data-motion="concept" aria-labelledby="concept-title">
            <div class="concept-sticky" aria-hidden="true"><img src="${C}S03-concept-consultation-v1.png" alt=""><span class="concept-word">LISTEN</span></div>
            <div class="concept-copy">
              <p class="eyebrow">MILKY VEILが大切にしていること</p><h2 id="concept-title"><span class="copy-line">髪を変えたら、</span><span class="copy-line">新しい自分が見えてくる。</span></h2>
              <p class="concept-intro"><span class="copy-line">いつもの服やメイクはそのままなのに、髪を変えたら、鏡の中の自分が少し新しく見える。</span><span class="copy-line">カラーを中心に、ブリーチ、エクステ、パーマまで組み合わせて、これまで選ばなかったかわいさをご提案します。</span><span class="copy-line">「こんな自分も好きかも」と思える変化を、ここから始めてみませんか。</span></p>
              <dl class="concept-notes"><div><dt>01 / LISTEN</dt><dd><span class="copy-line">最近気になる色や</span><span class="copy-line">いつも選ぶ服を教えてください</span></dd></div><div><dt>02 / TOUCH</dt><dd><span class="copy-line">今の髪を一緒に見ながら</span><span class="copy-line">できる色とケアを相談していく</span></dd></div><div><dt>03 / LIGHT</dt><dd><span class="copy-line">店内でも 外に出たときでも</span><span class="copy-line">顔まわりがきれいに見える色を選ぶ</span></dd></div></dl>
            </div>
          </section>
        </div>
      </div>
      <div class="foreground-sheet">
        <section class="point" id="point" aria-labelledby="point-heading">
          <div class="point-heading-wrap"><h2 id="point-heading">POINT</h2><p><span class="copy-line">今の髪に無理をさせず</span><span class="copy-line">これからも楽しめる色へ</span></p></div>
          <article class="point-one" data-motion="point-one" aria-labelledby="point-one-title"><div class="point-one-sticky">
            <div class="point-one-visual"><img src="${C}S05-point1-length-texture-v1.png" alt="スタイリストが毛先の質感を確かめる様子"></div>
            <div class="point-one-copy"><p class="chapter">POINT 01 / READ</p><h3 id="point-one-title"><span class="copy-line">根元と毛先では</span><span class="copy-line">状態が少しずつ違う</span></h3><p><span class="copy-line">だから 同じ色を重ねるのではなく</span><span class="copy-line">それぞれに合う染め方を考える</span></p></div>
            <div class="point-one-cards" aria-label="髪の診断項目"><figure><img src="${C}S04-point1-root-check-v1.png" alt="スタイリストが髪の根元を確認する様子"><figcaption><span>ROOT</span>根元の状態</figcaption></figure><figure><img src="${C}S06-point1-color-compare-v1.png" alt="スタイリストがカラーチャートを髪に合わせる様子"><figcaption><span>COLOR</span>毛先に残る色</figcaption></figure></div>
            <div class="point-progress" aria-hidden="true"><span></span></div>
          </div></article>
          <article class="point-two" data-motion="point-two" aria-labelledby="point-two-title"><div class="point-two-sticky">
            <div class="phase phase-before"><img src="${P}point02-before-long-aligned-v1.png" alt="施術前の暗い根元が見える長いブロンドヘア"><div class="phase-copy"><p class="chapter">POINT 02 / BEFORE</p><h3 id="point-two-title"><span class="copy-line">まずは今の髪を見ながら</span><span class="copy-line">できることを一緒に確認する</span></h3></div></div>
            <div class="phase phase-process"><img src="${P}point02-before-light-aligned-v1.png" alt="施術前の白いロングヘア"><div class="phase-copy"><p class="chapter">POINT 02 / BEFORE</p><h3><span class="copy-line">肌や服にも合わせながら</span><span class="copy-line">いちばん似合う色を選んでいく</span></h3></div></div>
            <div class="phase phase-after" id="point-after"><img src="${P}point02-after-short-aligned-v1.png" alt="施術後の短いホワイトブロンドヘア"><div class="phase-copy"><p class="chapter">POINT 02 / AFTER</p><h3><span class="copy-line">今日きれいなのはもちろん</span><span class="copy-line">色落ちしてからも楽しめる色に</span></h3></div></div>
            <div class="wipe-boundary" aria-hidden="true"></div><div class="phase-index" aria-hidden="true"><span>BEFORE</span><span>BEFORE</span><span>AFTER</span></div>
          </div></article>
        </section>
        <section class="story" id="story" aria-labelledby="story-title">
          <div class="story-title-wrap"><h2 id="story-title"><span class="copy-line">今日の髪のことも</span><span class="copy-line">次にしてみたい色も</span></h2></div>
          <div class="marquee marquee-top" aria-hidden="true"><div>HAIR MEMORY&nbsp;&nbsp;LIGHT AND COLOR&nbsp;&nbsp;HAIR MEMORY&nbsp;&nbsp;LIGHT AND COLOR&nbsp;&nbsp;</div></div>
          <div class="story-rail-window"><div class="story-rail" aria-label="MILKY VEILの施術工程"><div class="story-rail-group"><figure><img src="${C}S01-customer-first-view-v1.png" alt="来店時の顧客"><figcaption>ARRIVAL</figcaption></figure><figure><img src="${C}S04-point1-root-check-v1.png" alt="髪の根元の診断"><figcaption>ROOT CHECK</figcaption></figure><figure><img src="${C}S06-point1-color-compare-v1.png" alt="色の比較"><figcaption>COLOR DESIGN</figcaption></figure><figure><img src="${C}S09-point2-after-v1.png" alt="仕上がりの確認"><figcaption>FINISH</figcaption></figure></div><div class="story-rail-group" aria-hidden="true"><figure><img src="${C}S01-customer-first-view-v1.png" alt=""><figcaption>ARRIVAL</figcaption></figure><figure><img src="${C}S04-point1-root-check-v1.png" alt=""><figcaption>ROOT CHECK</figcaption></figure><figure><img src="${C}S06-point1-color-compare-v1.png" alt=""><figcaption>COLOR DESIGN</figcaption></figure><figure><img src="${C}S09-point2-after-v1.png" alt=""><figcaption>FINISH</figcaption></figure></div></div></div>
          <div class="marquee marquee-bottom" aria-hidden="true"><div>MILKY VEIL STORIES / MILKY VEIL STORIES / MILKY VEIL STORIES / MILKY VEIL STORIES /&nbsp;&nbsp;</div></div>
        </section>
        <section class="closing" id="concept-closing" aria-labelledby="closing-title"><img src="${C}S10-closing-v1.png" alt="施術後に同じ鏡を見ながら自然に微笑む顧客とスタイリスト"><div class="closing-shade" aria-hidden="true"></div><div class="closing-copy"><p class="eyebrow">MILKY VEIL / SHIBUYA</p><h2 id="closing-title"><span class="copy-line">いつもの服にも</span><span class="copy-line">自然になじむ髪色へ</span></h2><a href="#top">BACK TO TOP <span aria-hidden="true">→</span></a></div></section>
      </div>
    </div>
  </main>`;
}

function staffPage() {
  const positions = ["p1","p2","p3","p4","p5","p6"];
  return `<main id="main" class="subpage subpage-staff">${routeBreadcrumb("staff")}
    <section class="staff-casting-wall">
      <header class="staff-casting-title mv-reveal"><small>SIX DIFFERENT EYES</small><h1>同じ“かわいい”を<br>見ていないから<span class="staff-mobile-break"><br></span>面白い</h1><p>技術も視点も違う6人が<br>ひとりの好きに向き合う</p></header>
      ${staffProfiles.map((profile,index)=>`<article class="staff-cast ${positions[index]}">${subpageImageSlot(`${profile.name} / ${profile.role}`,`${profile.name}のページ専用ポートレート`)}<div><small>${profile.role}</small><h2>${profile.name}</h2><p>${profile.specialty}</p></div></article>`).join("")}
      <div class="staff-casting-ticker" aria-hidden="true"><span>${staffProfiles.map(({name})=>name).join("　")}　</span><span>${staffProfiles.map(({name})=>name).join("　")}　</span></div>
    </section>
  </main>`;
}

function menuPage() {
  const chips = [["COLOR","90min","15%","20%"],["CARE","45min","38%","10%"],["BLEACH","180min","62%","52%"],["EXTENSION","120min","82%","34%"]];
  return `<main id="main" class="subpage subpage-menu">${routeBreadcrumb("menu")}
    <section class="menu-range-map">
      <header class="mv-reveal"><small>FIND YOUR RANGE</small><h1>時間と予算から<br>今日できることを探す</h1><p>迷っている時間も<br>きれいになるための大切な準備</p></header>
      <div class="menu-budget-chart" role="group" aria-label="時間と予算の目安"><span class="menu-axis menu-axis-y">PRICE</span><span class="menu-axis menu-axis-x">TIME</span>${chips.map(([name,time,left,bottom],index)=>`<button type="button" class="menu-range-chip c${index+1}" style="--chip-left:${left};--chip-bottom:${bottom}" data-menu-range="${name} / ${time}"><span>${name}<br>${time}</span></button>`).join("")}</div>
      <div class="menu-range-note"><p>正確な金額は髪の履歴と長さを見てから<br>ここでは相談できそうな範囲を先に見つける</p><strong data-menu-range-result>気になる施術を選んでください</strong></div>
      <div class="menu-consultation-slot">${subpageImageSlot("CONSULTATION / MIRROR","鏡の前で時間と予算を相談する場面")}</div>
    </section>
  </main>`;
}

function itemsPage() {
  const products = [["SHAMPOO","VEIL WASH","髪色をやさしく洗うポンプボトル","pump"],["TREATMENT","MILK REPAIR","毛先を包むトリートメントチューブ","tube"],["DAMAGE CARE","LAVENDER DROP","熱の前に使う補修ドロッパー","dropper"],["HAIR BRUSH","AIR VEIL BRUSH","濡れた髪をほどくエアブラシ","brush"],["HAND TOWEL","SOFT VEIL TOWEL","水分を奪いすぎないハンドタオル","towel"]];
  return `<main id="main" class="subpage subpage-items">${routeBreadcrumb("items")}
    <section class="items-original-store"><header class="mv-reveal"><small>MILKY VEIL ORIGINALS / 01–05</small><h1>サロンの棚から<br>あなたのバスルームへ</h1><p>あの日の手触りを<br>次に会う日まで途切れさせないために</p></header>
      <div class="items-product-rail">${products.map(([kind,name,alt,shape])=>`<article class="items-product"><div class="items-product-media ${shape}" role="img" aria-label="${alt}"><em>MV</em><small>MILKY VEIL</small><span>${kind}</span></div><p>${kind}</p><h2>${name}</h2><b>PRICE TBA</b></article>`).join("")}</div>
      <div class="items-store-marquee" aria-hidden="true"><span>MILKY VEIL ORIGINAL CARE　 MADE FROM SALON EXPERIENCE　</span><span>MILKY VEIL ORIGINAL CARE　 MADE FROM SALON EXPERIENCE　</span></div>
    </section>
  </main>`;
}

function accessPage() {
  const { salon } = shellData;
  return `<main id="main" class="subpage subpage-access">${routeBreadcrumb("access")}
    <section class="access-map-poster">
      <div class="access-map-copy mv-reveal"><small>SHIBUYA / 6 MIN WALK</small><h1>街のざわめきから<br>白い入口へ</h1><p>迷いやすい交差点だけを<br>私たちが歩いた目線で残す</p></div>
      <div class="access-graphic-map"><svg viewBox="0 0 600 420" role="img" aria-label="渋谷駅からMILKY VEILまでの抽象案内図"><path d="M40 340 C160 300 150 170 290 205 S440 110 570 65"/><path class="road" d="M30 120 L570 300 M190 20 L230 400 M430 10 L350 410"/><circle cx="44" cy="340" r="10"/><circle cx="568" cy="65" r="16"/></svg><span class="station">SHIBUYA ST</span><strong>MILKY<br>VEIL</strong><i>6 MIN</i></div>
      <div class="access-landmarks"><span>01 GLASS BUILDING</span><span>02 WHITE CORNER</span><span>03 MV SIGN</span></div>
    </section>
    <section class="access-arrival"><div>${subpageImageSlot("ENTRANCE / WHITE LIGHT","白い入口と小さなMVサイン")}</div><dl><div><dt>ADDRESS</dt><dd>〒${salon.postalCode}<br>${salon.addressLines.join(" ")}</dd></div><div><dt>HOURS</dt><dd>${salon.hours.join("<br>")}</dd></div><div><dt>ACCESS</dt><dd>${salon.accessLabel}</dd></div></dl></section>
  </main>`;
}

function archivePage(kind) {
  if (kind === "JOURNAL") return journalPage();
  const list = kind==="BLOG" ? posts : columns;
  return `<main id="main">${pageHead(kind === "COLUMN" ? "column" : "blog",kind,pageCopy[kind].lead,pageCopy[kind].text)}
    <section class="archive-layout"><div class="archive-list">${list.map((p,i)=>`<article><span>2026.${String((i%9)+1).padStart(2,"0")}.00</span><h2>${p}</h2><p>髪の選択肢をわかりやすく解説するデモ記事です。正式な記事本文は準備中です。</p><i>READ ↗</i></article>`).join("")}<nav class="pagination"><b>01</b><span>02</span><span>03</span><span>→</span></nav></div><aside><h3>CATEGORIES</h3><p>COLOR<br>BLEACH<br>EXTENSION<br>PERM<br>CARE<br>STYLE</p><h3>RECENT POSTS</h3>${list.slice(0,4).map(p=>`<a>${p}</a>`).join("")}<h3>TAGS</h3><div class="tag-row"><span>#COLOR</span><span>#CARE</span><span>#SHIBUYA</span></div></aside></section></main>`;
}

function journalPage() {
  const featured = journalPosts.find((post)=>post.slug===journalIssue.featureSlug) || journalPosts[0];
  const stories = journalIssue.supportingSlugs.map((slug)=>journalPosts.find((post)=>post.slug===slug)).filter(Boolean);
  return `<main id="main" class="journal-page">
    <div class="journal-index-canvas">
      <nav class="journal-breadcrumb journal-index-breadcrumb" aria-label="パンくず"><a href="${routePath("home")}" data-link>HOME</a><span>/</span><span aria-current="page">JOURNAL</span></nav>
      <section class="journal-masthead">
        <h1>JOURNAL</h1>
        ${journalIssueBadge("journal-issue--index")}
      </section>
      <div class="journal-categories" aria-label="記事カテゴリ">${journalIssue.categories.map((category,index)=>index===0?`<strong aria-current="true">${category}</strong>`:`<span>${category}</span>`).join("")}</div>
      <article class="journal-feature-surface" aria-labelledby="journal-feature-title">
        <figure>${responsiveImage(featured.media.listFeature, "", { loading: "eager", sizes: "100vw", fetchPriority: "high" })}</figure>
        <div class="journal-feature-copy"><p><span>${featured.category}</span><time datetime="${featured.date.replaceAll(".", "-")}">${featured.date}</time></p><h2 id="journal-feature-title">${(featured.listTitleLines||[featured.title]).map((line)=>`<span>${line}</span>`).join("")}</h2><span class="journal-feature-read">READ STORY <i aria-hidden="true">→</i></span></div>
      </article>
      <section class="journal-story-grid" id="journal-stories" aria-label="最新記事">${stories.map((post,index)=>journalCard(post,`journal-story-${index+1}`,"indexCard")).join("")}</section>
      <div class="journal-pagination" aria-label="ページネーション"><b>01</b><span>02</span><span>03</span><span>…</span><span class="journal-pagination-next">NEXT →</span></div>
    </div>
  </main>`;
}

function featurePage() {
  return `<main id="main">${pageHead("feature","FEATURE",pageCopy.FEATURE.lead,pageCopy.FEATURE.text)}${featureCards.map(([n,routeId,img,t],i)=>splitSection(n,t,pageCopy[n]?.text || pageCopy["MEN'S"].text,img,i%2===1,routeId)).join("")}<section class="same-links">${featureCards.map(([,routeId])=>link(routeId)).join("")}</section></main>`;
}

function featureDetail(name) {
  const { salon } = shellData;
  const copy = pageCopy[name];
  const current = featureCards.find((x)=>x[0]===name) || featureCards[0];
  const points = {
    COLOR:["ケアブリーチという選択","複雑履歴も、まずは共有から"],
    PERM:["カラー履歴と髪の体力を確認","朝のセットをシンプルに"],
    STRAIGHT:["ハイトーン履歴へ慎重に対応","毛先が硬く見えない設計"],
    TREATMENT:["ブリーチ後の乾燥へ","熱と摩擦から守る"],
    "MEN'S":["ハイトーンとデザインカラー","扱いやすいパーマ"],
  }[name];
  return `<main id="main">${pageHead(current[1],name,copy.lead,copy.text)}
    ${splitSection("01",points[0],"髪の状態を確認し、できることと避けるべきことを共有したうえで施術計画をご提案します。",current[2])}
    ${splitSection("02",points[1],"毎日無理なく再現でき、次のデザインにもつながる仕上がりを目指します。",name==="COLOR"?`${P}05-bleach-treatment.png`:`${P}09-short-curl-portrait.png`,true)}
    ${articlePreview("RELATED ARTICLES",posts,"blog")}
    <section class="salon-callout">${responsiveImage(`${J}01-interior-wide.png`, "", { sizes: "(max-width: 900px) 100vw, 50vw" })}<div><p class="eyebrow">SALON OVERVIEW</p><h2>${salon.name}<br>SHIBUYA</h2><p>${salon.phone}<br>${salon.accessLabel}</p>${link("access","outline-link wave-cta")}</div></section>
    <section class="supporting"><p>DESIGN FOR<br>YOUR NEXT COLOR.</p><span>髪の今と、次の選択肢を大切に。</span></section>
    <section class="same-links">${featureCards.map(([,routeId])=>link(routeId)).join("")}</section></main>`;
}

function contactPage() {
  const { salon } = shellData;
  return `<main id="main">${pageHead("contact","CONTACT",pageCopy.CONTACT.lead,pageCopy.CONTACT.text)}
    <section class="contact-form"><div class="demo-notice">DEMO FORM — 入力内容は送信・保存されません。</div><form data-demo-form novalidate>
      <div class="form-error-summary" data-form-error-summary role="alert" tabindex="-1" hidden><p>入力内容を確認してください。</p><ul></ul></div>
      <label>お名前<input id="contact-name" name="name" maxlength="80" aria-describedby="contact-name-error" placeholder="△△ △△"><span id="contact-name-error" class="field-error" data-field-error="name"></span></label>
      <label>フリガナ<input name="kana" placeholder="△△△△ △△△△"></label>
      <label>電話番号<input name="tel" inputmode="tel" placeholder="${salon.phone}"></label>
      <label>メールアドレス<input id="contact-email" name="email" type="email" maxlength="254" aria-describedby="contact-email-error" placeholder="demo@example.invalid"><span id="contact-email-error" class="field-error" data-field-error="email"></span></label>
      <label>お問い合わせ種別<select id="contact-type" name="type" aria-describedby="contact-type-error"><option value="">選択してください</option><option value="施術相談">施術相談</option><option value="予約について">予約について</option><option value="採用について">採用について</option><option value="その他">その他</option></select><span id="contact-type-error" class="field-error" data-field-error="type"></span></label>
      <label>お問い合わせ内容<textarea id="contact-message" name="message" rows="8" maxlength="2000" aria-describedby="contact-message-error"></textarea><span id="contact-message-error" class="field-error" data-field-error="message"></span></label>
      <label class="check"><input id="contact-privacy" name="privacy" type="checkbox" aria-describedby="contact-privacy-error"> プライバシーポリシーを確認しました。</label><span id="contact-privacy-error" class="field-error" data-field-error="privacy"></span>
      <button class="wave-cta">CONFIRM</button><p class="form-result" aria-live="polite"></p>
    </form></section>${related()}</main>`;
}

const contactFieldIds = Object.freeze({
  name: "contact-name",
  email: "contact-email",
  type: "contact-type",
  message: "contact-message",
  privacy: "contact-privacy",
});

function contactFieldError(name, form) {
  const field = form.elements.namedItem(name);
  const value = field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement
    ? field.value.trim()
    : "";
  if (name === "name") {
    if (!value) return "お名前を入力してください。";
    if (value.length > 80) return "お名前は80文字以内で入力してください。";
  }
  if (name === "email") {
    if (!value) return "メールアドレスを入力してください。";
    if (value.length > 254) return "メールアドレスは254文字以内で入力してください。";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "メールアドレスの形式を確認してください。";
  }
  if (name === "type" && !value) return "お問い合わせ種別を選択してください。";
  if (name === "message") {
    if (!value) return "お問い合わせ内容を入力してください。";
    if (value.length > 2000) return "お問い合わせ内容は2000文字以内で入力してください。";
  }
  if (name === "privacy" && field instanceof HTMLInputElement && !field.checked) {
    return "プライバシーポリシーの確認が必要です。";
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
  const summary = form.querySelector("[data-form-error-summary]");
  const list = summary?.querySelector("ul");
  if (summary && list) {
    list.replaceChildren(...errors.map(({ name, message }) => {
      const item = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.href = `#${contactFieldIds[name]}`;
      anchor.textContent = message;
      item.append(anchor);
      return item;
    }));
    summary.hidden = errors.length === 0;
  }
  return { errors, summary };
}

function privacyPage() {
  const blocks = [
    ["基本方針","MILKY VEILデモサイトは、個人情報を適切に取り扱う想定で制作しています。"],
    ["取得を想定する情報","氏名、電話番号、メールアドレス、お問い合わせ内容を取得する想定です。"],
    ["収集方法","正式運用時には、利用者がフォームへ入力した情報を安全な方法で取得します。"],
    ["利用目的","お問い合わせへの回答、予約連絡、サービス改善のために利用する想定です。"],
    ["第三者提供","法令に基づく場合を除き、本人の同意なく第三者へ提供しない想定です。"],
    ["開示","本人からの請求に対し、正式運用時の手続きに従って対応します。"],
    ["訂正・削除","内容の訂正または削除の申し出へ、本人確認後に対応する想定です。"],
    ["利用停止等","利用停止の申し出へ、法令と正式運用時の規程に基づき対応します。"],
    ["方針変更","必要に応じて本方針を見直し、変更内容を本サイトで案内します。"],
  ];
  return `<main id="main">${pageHead("privacy","PRIVACY POLICY",pageCopy["PRIVACY POLICY"].lead,pageCopy["PRIVACY POLICY"].text)}<section class="policy">${blocks.map(([h,p],i)=>`<article><span>0${i+1}</span><h2>${h}</h2><p>${p}</p></article>`).join("")}</section>${related()}</main>`;
}

function sitemapPage() {
  const rootIds = routeIds.filter((routeId)=>!routeRegistry[routeId].parentId);
  return `<main id="main">${pageHead("sitemap","SITE MAP",pageCopy["SITE MAP"].lead,pageCopy["SITE MAP"].text)}<section class="sitemap-grid" aria-label="サイト階層"><ul>${rootIds.map((routeId)=>{
    const children = routeIds.filter((candidate)=>routeRegistry[candidate].parentId === routeId);
    return `<li data-route-id="${routeId}">${link(routeId)}${children.length?`<ul>${children.map((childId)=>`<li data-route-id="${childId}">${link(childId)}</li>`).join("")}</ul>`:""}</li>`;
  }).join("")}</ul></section></main>`;
}

function resolveRoute(path = location.pathname) {
  const normalized = path.endsWith("/") ? path : `${path}/`;
  const routeId = routeIdByPath[normalized];
  if (routeId) return Object.freeze({ routeId, view: routeId === "blog" ? "index" : "page", slug: "" });
  if (/^\/milky-veil-preview\/blog\/[^/]+\/$/.test(normalized)) return Object.freeze({ routeId: "blog", view: "index", slug: "" });
  return Object.freeze({ routeId: "home", view: "fallback", slug: "" });
}

function renderPage(path) {
  const resolved = resolveRoute(path);
  const routeId = resolved.routeId;
  const normalized = path.endsWith("/") ? path : `${path}/`;
  const key = routeRegistry[routeId].label;
  if (normalized === "/milky-veil-preview/") return home();
  if (key === "CONCEPT") return conceptPage();
  if (key === "STAFF") return staffPage();
  if (key === "MENU") return menuPage();
  if (key === "ITEMS") return itemsPage();
  if (key === "ACCESS") return accessPage();
  if (key === "JOURNAL") return journalPage();
  if (key === "COLUMN") return archivePage(key);
  if (key === "FEATURE") return featurePage();
  if (["COLOR","PERM","STRAIGHT","TREATMENT","MEN'S"].includes(key)) return featureDetail(key);
  if (key === "CONTACT") return contactPage();
  if (key === "PRIVACY POLICY") return privacyPage();
  if (key === "SITE MAP") return sitemapPage();
  return home();
}

function bindConceptUniplexMotion() {
  const scope = document.querySelector(".concept-uniplex-mainline");
  if (!(scope instanceof HTMLElement)) return () => {};
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const portrait = matchMedia("(orientation: portrait)");
  const nodes = {
    intro: scope.querySelector('[data-motion="intro-sequence"]'),
    hero: scope.querySelector('[data-motion="hero"]'),
    heroTrigger: scope.querySelector('[data-motion="hero-trigger"]'),
    concept: scope.querySelector('[data-motion="concept"]'),
    foreground: scope.querySelector(".foreground-sheet"),
    pointOne: scope.querySelector('[data-motion="point-one"]'),
    pointTwo: scope.querySelector('[data-motion="point-two"]'),
  };
  const introLogoStage = scope.querySelector(".intro-logo-stage");
  const disposeKaleidoscopeVideo = bindMilkyKaleidoscopeVideo(introLogoStage, { endElement: nodes.foreground });
  let frameId = 0;
  let disposed = false;
  let heroObserver = null;
  let fvMediaReady = false;
  const completeHeroIntro = () => {
    nodes.hero?.classList.add("is-images-ready", "is-content-ready");
    nodes.hero?.classList.remove("is-intro-pending");
    scope.querySelector(".js-home-mv-content")?.classList.remove("is-hidden");
  };
  const beginHeroIntro = async () => {
    const portraitsReady = await waitForConceptFirstViewImages(scope);
    if (disposed) return;
    if (!portraitsReady) return;
    fvMediaReady = true;
    nodes.hero?.classList.add("is-fv-media-ready");
    completeHeroIntro();
    introLogoStage?.classList.add("is-fv-background-ready");
    nodes.hero?.classList.remove("is-fv-media-pending");
  };
  void beginHeroIntro();

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const smoothstep = (start, end, value) => {
    const x = clamp((value - start) / Math.max(.0001, end - start));
    return x * x * (3 - 2 * x);
  };
  const progress = (node, startOffset = 0, endOffset = 0) => {
    if (!(node instanceof HTMLElement)) return 0;
    const rect = node.getBoundingClientRect();
    const range = Math.max(1, node.offsetHeight - innerHeight - startOffset - endOffset);
    return clamp((-rect.top - startOffset) / range);
  };
  if (nodes.heroTrigger instanceof HTMLElement) {
    heroObserver = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting || reduced.matches) {
        nodes.hero?.classList.remove("is-split-out", "is-out");
      } else {
        nodes.hero?.classList.add("is-split-out", "is-out");
      }
    });
    heroObserver.observe(nodes.heroTrigger);
  }

  const renderConceptMotion = () => {
    frameId = 0;
    if (disposed) return;
    if (reduced.matches) {
      if (fvMediaReady) completeHeroIntro();
      introLogoStage?.classList.remove("is-end");
      nodes.hero?.classList.remove("is-split-out");
      Object.entries({ "--hero-p": 0, "--concept-p": 0, "--p1": 1, "--p2": 1, "--p2-wipe": 1, "--p2-after": 1, "--p2-before-copy": 0, "--p2-process-copy": 0, "--p2-after-copy": 1 }).forEach(([name, value]) => scope.style.setProperty(name, String(value)));
      return;
    }
    const heroP = progress(nodes.hero);
    const conceptP = progress(nodes.concept);
    const p1 = progress(nodes.pointOne);
    const p1Main = smoothstep(.04, .60, p1);
    const p1CardA = smoothstep(.20, .74, p1);
    const p1CardB = smoothstep(.34, .84, p1);
    const p2 = progress(nodes.pointTwo);
    const p2Wipe = smoothstep(.08, .48, p2);
    const p2After = smoothstep(.48, .74, p2);
    const p2BeforeCopy = clamp(1 - p2Wipe * 1.65);
    const p2ProcessCopy = clamp(p2Wipe * 2) * clamp(1 - p2After * 3);
    const p2AfterCopy = clamp((p2After - .45) * 2);
    scope.style.setProperty("--hero-p", heroP.toFixed(4));
    scope.style.setProperty("--concept-p", conceptP.toFixed(4));
    scope.style.setProperty("--p1", p1.toFixed(4));
    scope.style.setProperty("--p1-main", p1Main.toFixed(4));
    scope.style.setProperty("--p1-card-a", p1CardA.toFixed(4));
    scope.style.setProperty("--p1-card-b", p1CardB.toFixed(4));
    scope.style.setProperty("--p2", p2.toFixed(4));
    scope.style.setProperty("--p2-wipe", p2Wipe.toFixed(4));
    scope.style.setProperty("--p2-after", p2After.toFixed(4));
    scope.style.setProperty("--p2-before-copy", p2BeforeCopy.toFixed(4));
    scope.style.setProperty("--p2-process-copy", p2ProcessCopy.toFixed(4));
    scope.style.setProperty("--p2-after-copy", p2AfterCopy.toFixed(4));
  };
  const requestConceptMotion = () => {
    if (frameId || disposed) return;
    frameId = requestAnimationFrame(renderConceptMotion);
  };
  addEventListener("scroll", requestConceptMotion, { passive: true });
  addEventListener("resize", requestConceptMotion, { passive: true });
  reduced.addEventListener("change", requestConceptMotion);
  portrait.addEventListener("change", requestConceptMotion);
  requestConceptMotion();

  const storyRail = scope.querySelector(".story-rail");
  const storyRailGroup = storyRail?.querySelector(".story-rail-group");
  const syncStoryRailSpeed = () => {
    if (!(storyRail instanceof HTMLElement) || !(storyRailGroup instanceof HTMLElement)) return;
    const gap = Number.parseFloat(getComputedStyle(storyRail).columnGap) || 0;
    storyRail.style.setProperty("--story-duration", `${Math.max(1, (storyRailGroup.getBoundingClientRect().width + gap) / 24).toFixed(2)}s`);
  };
  syncStoryRailSpeed();
  addEventListener("resize", syncStoryRailSpeed, { passive: true });
  return () => {
    disposed = true;
    if (frameId) cancelAnimationFrame(frameId);
    disposeKaleidoscopeVideo();
    heroObserver?.disconnect();
    removeEventListener("scroll", requestConceptMotion);
    removeEventListener("resize", requestConceptMotion);
    removeEventListener("resize", syncStoryRailSpeed);
    reduced.removeEventListener("change", requestConceptMotion);
    portrait.removeEventListener("change", requestConceptMotion);
  };
}

function bindSubpageMotion() {
  const disposeConceptUniplexMotion = bindConceptUniplexMotion();
  const motionNodes = [...document.querySelectorAll(".mv-reveal,.mv-marker-reveal")];
  const point = document.querySelector("[data-motion-zone='concept-point']");
  const pointSticky = point?.querySelector(".concept-point-sticky");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let frameId = 0;
  const clamp = (value) => Math.max(0, Math.min(1, value));
  const sectionProgress = (node) => {
    if (!(node instanceof HTMLElement)) return 0;
    const rect = node.getBoundingClientRect();
    return clamp(-rect.top / Math.max(1, rect.height - innerHeight));
  };
  const renderMotion = () => {
    frameId = 0;
    if (innerWidth <= 700 || reducedMotion.matches) {
      document.documentElement.style.removeProperty("--concept-hero-title-y");
      document.documentElement.style.removeProperty("--concept-asset-shift");
      document.documentElement.style.removeProperty("--concept-asset-scale");
      document.documentElement.style.removeProperty("--concept-point-x");
      document.documentElement.style.removeProperty("--concept-point-scale");
      document.documentElement.style.removeProperty("--concept-point-progress");
      document.documentElement.style.removeProperty("--concept-point-progress-pct");
      document.documentElement.style.removeProperty("--concept-point-lens-x");
      document.documentElement.style.removeProperty("--concept-point-rotation");
      document.documentElement.style.removeProperty("--concept-point-rotation-reverse");
      document.documentElement.style.removeProperty("--concept-point-rise");
      ["p","o","i","n","t"].forEach((letter) => {
        document.documentElement.style.removeProperty(`--concept-point-${letter}-fill`);
        document.documentElement.style.removeProperty(`--concept-point-${letter}-shadow`);
        document.documentElement.style.removeProperty(`--concept-point-${letter}-rise`);
      });
      if (pointSticky) pointSticky.dataset.pointStep = "3";
      return;
    }
    const pointProgress = sectionProgress(point);
    const stagedFill = (start, end, minimum = .03, power = 1) => minimum + (1 - minimum) * Math.pow(clamp((pointProgress - start) / (end - start)), power);
    const letterFills = {
      p: 1,
      o: stagedFill(0, .55, .08, 1.5),
      i: stagedFill(.26, .58),
      n: stagedFill(.5, .82),
      t: stagedFill(.64, .9),
    };
    document.documentElement.style.setProperty("--concept-point-x", `${pointProgress * -3.2}vw`);
    document.documentElement.style.setProperty("--concept-point-scale", `${1 + pointProgress * .075}`);
    document.documentElement.style.setProperty("--concept-point-progress", pointProgress.toFixed(4));
    document.documentElement.style.setProperty("--concept-point-progress-pct", `${pointProgress * 100}%`);
    document.documentElement.style.setProperty("--concept-point-lens-x", `${-18 + pointProgress * 92}vw`);
    document.documentElement.style.setProperty("--concept-point-rotation", `${pointProgress * 210}deg`);
    document.documentElement.style.setProperty("--concept-point-rotation-reverse", `${pointProgress * -210}deg`);
    document.documentElement.style.setProperty("--concept-point-rise", `${(pointProgress - .5) * -18}vh`);
    Object.entries(letterFills).forEach(([letter, fill]) => {
      document.documentElement.style.setProperty(`--concept-point-${letter}-fill`, fill.toFixed(4));
      document.documentElement.style.setProperty(`--concept-point-${letter}-shadow`, (.004 + fill * .116).toFixed(4));
      document.documentElement.style.setProperty(`--concept-point-${letter}-rise`, `${(.018 - fill * .053).toFixed(4)}em`);
    });
    if (pointSticky) pointSticky.dataset.pointStep = pointProgress < .38 ? "1" : pointProgress < .72 ? "2" : "3";
  };
  const requestMotion = () => {
    if (frameId) return;
    frameId = requestAnimationFrame(renderMotion);
  };
  const observer = motionNodes.length ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: .24 }) : null;
  motionNodes.forEach((node) => observer?.observe(node));
  if (point) {
    addEventListener("scroll", requestMotion, { passive: true });
    addEventListener("resize", requestMotion, { passive: true });
    reducedMotion.addEventListener("change", requestMotion);
    requestMotion();
  }
  document.querySelectorAll("[data-menu-range]").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll("[data-menu-range]").forEach((candidate) => candidate.classList.toggle("is-selected", candidate === button));
    const output = document.querySelector("[data-menu-range-result]");
    if (output) output.textContent = `${button.dataset.menuRange} を相談の入口にする`;
  }));
  disposeSubpageMotion = () => {
    disposeConceptUniplexMotion();
    observer?.disconnect();
    if (frameId) cancelAnimationFrame(frameId);
    removeEventListener("scroll", requestMotion);
    removeEventListener("resize", requestMotion);
    reducedMotion.removeEventListener("change", requestMotion);
  };
}

function bind(sharedBottomScope) {
  bindSubpageMotion();
  bindSharedFixedShell(sharedBottomScope);
  document.querySelectorAll("[data-link]").forEach((el)=>el.addEventListener("click",(e)=>{
    if (e.metaKey || e.ctrlKey) return;
    if (storedTranslationLanguage()) return;
    const target = new URL(el.getAttribute("href"), location.href);
    const targetRoute = resolveRoute(target.pathname);
    if (target.origin === location.origin && routeRegistry[targetRoute.routeId].navigationMode === "document") return;
    e.preventDefault();
    history.pushState({}, "", el.getAttribute("href"));
    render({ focusRoute: true });
  }));
  bindSharedConceptMenu(document);
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#global-nav.global-nav");
  const translateToggles = [...document.querySelectorAll(".translate-toggle")];
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
      activeTranslateTargetId = button.closest(".translate-control")?.querySelector("[data-google-translate]")?.id
        || "google-translate-header";
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
    const result = form.querySelector(".form-result");
    form.dataset.validationActive = "true";
    const { errors, summary } = validateContactForm(form);
    if (errors.length) {
      if (result) result.textContent = "";
      summary?.focus();
      return;
    }
    if (result) result.textContent="デモのため送信されません。入力内容も保存していません。";
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
      track.style.transitionDuration = animate && !reducedMotion ? `${HOME_STAFF_TRANSITION_MS}ms` : "0ms";
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
        transitionFallbackId = window.setTimeout(completeTransition, HOME_STAFF_TRANSITION_FALLBACK_MS);
      }
      if (request.focusDot) dots[request.target]?.focus();
    };
    const requestSlide = (nextIndex, focusDot = false, origin = "manual", direction = "direct") => {
      clearTimer();
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
    const onPointerDown = () => { keyboardModality = false; };
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

function render({ focusRoute = false } = {}) {
  disposeHomeStaffCarousel();
  disposeHomeStaffCarousel = () => {};
  disposeSubpageMotion();
  disposeSubpageMotion = () => {};
  document.body.classList.remove("nav-open");
  if (/^\/milky-veil-preview\/blog\/[^/]+\/?$/.test(location.pathname)) history.replaceState({}, "", routePath("blog"));
  const resolved = resolveRoute(location.pathname);
  const currentRouteId = resolved.routeId;
  const current = routeRegistry[currentRouteId];
  const embedQuery = new URLSearchParams(location.search).get("embed");
  const embedMode = window.self !== window.top
    || embedQuery === "subpage-family"
    || embedQuery === "family-rough"
    || (window.self !== window.top && /subpage-uniplex-family/.test(document.referrer || ""));
  const suppressSharedShell = embedMode
    && (current.path === routePath("concept") || current.path === routePath("blog"));
  applySharedDocumentBrand();
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    const description = current.path === "/milky-veil-preview/"
      ? "渋谷のカラーデザインサロン MILKY VEIL デモサイト"
        : currentRouteId === "blog"
        ? "髪色、ケア、スタイルをMILKY VEILの視点で編集したデモマガジンです。"
        : pageCopy[current.label]?.text || `${current.label} | MILKY VEIL デモサイト`;
    metaDescription.setAttribute("content", description);
  }
  const isConceptRoute = currentRouteId === "concept";
  const routeShell = isConceptRoute
    ? conceptHeader(current.path)
    : `${header(current.path === "/milky-veil-preview/", current.path)}${globalOverlay(current.path)}`;
  const appBody = suppressSharedShell
    ? renderPage(location.pathname)
    : `${routeShell}${renderPage(location.pathname)}`;
  document.getElementById("app").innerHTML = appBody;
  const sharedBottomUiRoot = document.getElementById("shared-bottom-ui-root");
  const sharedBottomScope = suppressSharedShell
    ? (clearSharedBottomUi(sharedBottomUiRoot), null)
    : mountSharedBottomUi(sharedBottomUiRoot, current.path);
  bind(sharedBottomScope);
  if (focusRoute && currentRouteId === "blog") {
    const routeHeading = document.querySelector(".journal-masthead h1");
    if (routeHeading instanceof HTMLElement) {
      routeHeading.tabIndex = -1;
      routeHeading.focus({ preventScroll: true });
    }
  }
  if (storedTranslationLanguage()) ensureGoogleTranslate();
  else mountGoogleTranslateWidgets();
  window.scrollTo(0,0);
}

addEventListener("popstate",()=>render({ focusRoute: true }));
render();
