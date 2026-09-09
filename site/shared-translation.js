export const translationSettings = Object.freeze({
      kind: "embedded-service",
      provider: "Google Translate",
      scriptSrc: "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",
      includedLanguages: "af,sq,am,ar,hy,az,eu,be,bn,bs,bg,ca,ceb,zh-CN,zh-TW,co,hr,cs,da,nl,en,eo,et,fi,fr,fy,gl,ka,de,el,gu,ht,ha,haw,he,hi,hmn,hu,is,ig,id,ga,it,ja,jv,kn,kk,km,rw,ko,ku,ky,lo,la,lv,lt,lb,mk,mg,ms,ml,mt,mi,mr,mn,my,ne,no,ny,or,ps,fa,pl,pt,pa,ro,ru,sm,gd,sr,st,sn,sd,si,sk,sl,so,es,su,sw,sv,tl,tg,ta,tt,te,th,tr,tk,uk,ur,ug,uz,vi,cy,xh,yi,yo,zu",
});

let activeTranslateTargetId = "google-translate-header";
let googleTranslateGadget = null;
const translationStorageKey = "milky-veil-translation-language";

export function storedTranslationLanguage() {
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

export function mountGoogleTranslateWidgets() {
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
  target.replaceChildren();
  target.dataset.initialized = "true";
  new window.google.translate.TranslateElement({
    pageLanguage: "ja",
    includedLanguages: translationSettings.includedLanguages,
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

export function ensureGoogleTranslate() {
  if (window.google?.translate?.TranslateElement) {
    mountGoogleTranslateWidgets();
    return;
  }
  if (document.getElementById("google-translate-script")) return;
  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src = translationSettings.scriptSrc;
  script.async = true;
  script.onerror = () => {
    script.remove();
    document.querySelectorAll("[data-google-translate]").forEach((element) => {
      element.textContent = "翻訳機能を読み込めませんでした。";
    });
  };
  document.head.append(script);
}

export function selectTranslationTarget(id) { activeTranslateTargetId = id; }
