import { sharedBrandEyebrow, sharedRouteRegistry, sharedSalonData } from "../../shared-site-data.js?v=20260913-251";
import { homeFeatureCards } from "../../shared-hair-gallery.js?pages=20260921-489";
import { MENU_STILL_ASSETS } from "../../shared-salon-videos.js?pages=20260921-489";
import { responsiveImageAttributes } from "../../responsive-media.js?pages=20260921-489";
import { priceItems } from "../menu-price/menu-data.js?pages=20260921-489";
import { mountSharedBottomUi } from "../../shared-bottom-ui.js?v=20260919-425";
import { bindSharedFixedShell } from "../../shared-fixed-shell.js?v=20260913-244";
import { mountSharedConceptMenu, bindSharedConceptMenu } from "../../shared-concept-menu.js?v=20260919-423";
import { reservationLabel } from "../../shared-contact-details.js?v=20260913-244";


for (const [selector,src] of [
  ["[data-hero-photo]","/milky-veil-preview/assets/generated/journal-model-06-pack-v2/02-first-bleach-feature-model-06-v2.png"],
  ["[data-booking-photo]","/milky-veil-preview/assets/generated/journal-model-06-pack-v2/04-extension-hair-detail-model-06-v2.png"],
]) {
  const photo = document.querySelector(selector);
  const photoTemplate = document.createElement("template");
  photoTemplate.innerHTML = `<img ${responsiveImageAttributes(src,"(max-width:600px) 1100px, 2200px")}>`;
  for (const attribute of photoTemplate.content.firstElementChild.attributes) photo.setAttribute(attribute.name, attribute.value);
}

document.querySelector("[data-header-name]").setAttribute("aria-label",`${sharedSalonData.name} このページの先頭へ`);
document.querySelector("[data-header-wordmark]").textContent = sharedSalonData.name;
document.querySelector("[data-brand-eyebrow]").textContent = sharedBrandEyebrow;
const heroTitle = document.getElementById("hero-title");
heroTitle.setAttribute("aria-label",heroTitle.textContent);
for (const part of heroTitle.children) {
  const characters = [...part.textContent];
  part.textContent = "";
  part.setAttribute("aria-hidden","true");
  for (const character of characters) {
    const glyph = document.createElement("span");
    glyph.className = "hero-character";
    const ink = document.createElement("span");
    ink.className = "hero-ink";
    ink.textContent = character;
    const outline = document.createElement("span");
    outline.className = "hero-outline";
    outline.textContent = character;
    glyph.append(ink,outline);
    part.append(glyph);
  }
}
const heroPrices = [
  { english:"CUT", item:priceItems[5] },
  { english:"COLOR", item:priceItems[3] },
  { english:"BLEACH", item:priceItems[0] },
];
document.querySelector("[data-hero-prices]").innerHTML = heroPrices.map(({english,item}) => `<a class="price-circle" href="#price" aria-label="${item[0]} 税込${item[1]}円、料金表へ">
  <span class="circle-english">${english}</span>
  <strong><small>¥</small>${item[1]}</strong>
</a>`).join("");

document.querySelector("[data-design-grid]").innerHTML = homeFeatureCards.map(([,src,label,alt]) => `<figure class="design-photo">
  <img ${responsiveImageAttributes(src,"(max-width: 600px) 46vw, 34vw")} alt="${alt}のヘアデザイン" width="900" height="1200" loading="lazy" decoding="async">
  <figcaption><b>${label}</b></figcaption>
</figure>`).join("");

const designPhotos = [...document.querySelectorAll(".design-photo")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let designObserver;
let sceneObserver;
let sceneElements = [];
function showDesignPhotos() {
  designObserver?.disconnect();
  for (const photo of designPhotos) photo.classList.add("is-visible");
}
if (!reducedMotion.matches && "IntersectionObserver" in window) {
  for (const photo of designPhotos) photo.classList.add("will-reveal");
  designObserver = new IntersectionObserver(entries => {
    let stagger = 0;
    for (const entry of entries.filter(entry => entry.isIntersecting).sort((a,b) => designPhotos.indexOf(a.target) - designPhotos.indexOf(b.target))) {
      entry.target.style.setProperty("--reveal-delay",`${stagger++ * 120}ms`);
      entry.target.classList.add("is-visible");
      designObserver.unobserve(entry.target);
    }
  },{threshold:.08,rootMargin:"0px 0px -7% 0px"});
  for (const photo of designPhotos) designObserver.observe(photo);
}
function showScenes() {
  sceneObserver?.disconnect();
  for (const element of sceneElements) element.classList.add("is-in-view");
}
reducedMotion.addEventListener("change",event => {
  if (event.matches) { showDesignPhotos(); showScenes(); }
});

const salonDescriptions = [
  "木の質感とやわらかな光の受付",
  "渋谷の街を望むセット面",
  "間接照明が灯るシャンプースペース",
];
document.querySelector("[data-salon-grid]").innerHTML = MENU_STILL_ASSETS.map((src,index) => `<figure class="salon-photo">
  <button class="salon-media" type="button" aria-disabled="true" aria-label="${salonDescriptions[index]}の動画（静止画サンプル・再生不可）">
  <img ${responsiveImageAttributes(src,"(max-width: 600px) 52vw, 30vw")} alt="${salonDescriptions[index]}" width="720" height="1280" loading="lazy" decoding="async">
  <span class="salon-play" aria-hidden="true"><span class="salon-play-icon"></span></span>
  </button>
</figure>`).join("");

for (const button of document.querySelectorAll("[data-lp-reserve]")) {
  button.innerHTML = `<span class="reservation-label">${reservationLabel}</span><span class="reservation-arrow" aria-hidden="true"></span>`;
  button.addEventListener("click", () => document.getElementById("reservation-dialog").showModal());
}

sceneElements = [...document.querySelectorAll(".intro-card,.lp-price,.lp-design .section-heading,.design-word,.lp-salon .section-heading,.salon-photo,.lp-reviews .section-heading,.review-card,.booking-copy")];
if (!reducedMotion.matches && "IntersectionObserver" in window) {
  for (const element of sceneElements) element.classList.add("scene-enter");
  sceneObserver = new IntersectionObserver(entries => {
    let stagger = 0;
    for (const entry of entries.filter(entry => entry.isIntersecting).sort((a,b) => sceneElements.indexOf(a.target) - sceneElements.indexOf(b.target))) {
      entry.target.style.setProperty("--scene-delay",`${Math.min(stagger++ * 90,360)}ms`);
      entry.target.classList.add("is-in-view");
      sceneObserver.unobserve(entry.target);
    }
  },{threshold:.08,rootMargin:"0px 0px -4% 0px"});
  for (const element of sceneElements) sceneObserver.observe(element);
}

// The adopted price draft owns its markup and styles; match its document height without nested scrolling.
const priceFrame = document.getElementById("price-frame");
let priceObserver;
function fitPriceFrame() {
  const article = priceFrame.contentDocument?.querySelector(".price-sheet");
  if (!article) return;
  priceObserver?.disconnect();
  const update = () => { priceFrame.style.height = `${Math.ceil(article.getBoundingClientRect().height)}px`; };
  priceObserver = new ResizeObserver(update);
  priceObserver.observe(article);
  update();
}
priceFrame.addEventListener("load",fitPriceFrame);
fitPriceFrame();
window.addEventListener("pagehide",()=>{ priceObserver?.disconnect(); designObserver?.disconnect(); sceneObserver?.disconnect(); });
window.addEventListener("pageshow",event=>{ if (event.persisted) { fitPriceFrame(); showDesignPhotos(); showScenes(); } });

mountSharedConceptMenu(document.getElementById("shared-concept-menu-root"),sharedRouteRegistry.menu.path);
const bottomUi = mountSharedBottomUi(document.getElementById("shared-bottom-ui-root"),sharedRouteRegistry.menu.path);
bottomUi.querySelector(".fixed-cta").part.add("fixed-cta");
const bottomHost = document.getElementById("shared-bottom-ui-root");
const openingObserver = new IntersectionObserver(entries => {
  bottomHost.toggleAttribute("data-opening-visible",entries[0].isIntersecting);
});
const observeOpening = () => openingObserver.observe(document.querySelector(".lp-hero"));
observeOpening();
window.addEventListener("pagehide",() => openingObserver.disconnect());
window.addEventListener("pageshow",event => { if (event.persisted) observeOpening(); });
bindSharedFixedShell(bottomUi);
bindSharedConceptMenu(document);
