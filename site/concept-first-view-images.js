import { responsiveImageAttributes } from "./responsive-media.js?v=20260909-009&pages=20260910-084";
const firstViewImages = {
  concept: {
    left: { src: "/milky-veil-preview/assets/references/concept-first-view/customer-left.png", alt: "水色の服と白いボブヘアのお客様モデル", width: 1152, height: 2048, position: "50% 20%", scale: 1.37, origin: "50% 24%" },
    right: { src: "/milky-veil-preview/assets/references/concept-first-view/stylist-right.png", alt: "グレーの服とブロンドヘアのスタイリスト", width: 1152, height: 2048, position: "50% 20%", scale: 1, origin: "center" },
  },
  menu: {
    left: { src: "/milky-veil-preview/assets/references/service-story/service-fv-left-shampoo-room-v1.png", alt: "暖色の間接照明に照らされたMILKY VEILのシャンプースペース", width: 1008, height: 1792, position: "50% 50%", scale: 1, origin: "center" },
    right: { src: "/milky-veil-preview/assets/references/service-story/service-fv-right-reception-v1.png", alt: "暖色の間接照明に照らされたMILKY VEILの受付とセット面", width: 1008, height: 1792, position: "50% 50%", scale: 1, origin: "center" },
  },
};

export function firstViewImage(side, routeId = "concept") {
  const routeImages = firstViewImages[routeId] || firstViewImages.concept;
  const portrait = routeImages[side];
  return `<img ${responsiveImageAttributes(portrait.src, "(max-width: 767px) 100vw, 50vw")} alt="${portrait.alt}" width="${portrait.width}" height="${portrait.height}" fetchpriority="high" decoding="async" data-concept-fv-image style="display:block;width:100%;height:100%;object-fit:cover;object-position:${portrait.position};transform:scale(${portrait.scale});transform-origin:${portrait.origin};">`;
}

export function conceptFirstViewImage(side) {
  return firstViewImage(side, "concept");
}

function waitForImageDecode(image) {
  return new Promise((resolve) => {
    const settle = async () => {
      if (!image.naturalWidth) {
        resolve(false);
        return;
      }
      try {
        await image.decode();
        resolve(true);
      }
      catch {
        resolve(image.complete && image.naturalWidth > 0);
      }
    };

    if (image.complete) {
      void settle();
      return;
    }

    image.addEventListener("load", settle, { once: true });
    image.addEventListener("error", () => resolve(false), { once: true });
  });
}

export async function waitForConceptFirstViewImages(root = document) {
  const images = [...root.querySelectorAll("[data-concept-fv-image]")];
  if (images.length !== 2) return false;
  const results = await Promise.all(images.map(waitForImageDecode));
  return results.every(Boolean);
}
