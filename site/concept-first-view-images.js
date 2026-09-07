const portraits = {
  left: { file: "customer-left.png", alt: "水色の服と白いボブヘアのお客様モデル", scale: 1.37, origin: "50% 24%" },
  right: { file: "stylist-right.png", alt: "グレーの服とブロンドヘアのスタイリスト", scale: 1, origin: "center" },
};

export function conceptFirstViewImage(side) {
  const portrait = portraits[side];
  return `<img src="/milky-veil-preview/assets/references/concept-first-view/${portrait.file}" alt="${portrait.alt}" width="1152" height="2048" fetchpriority="high" decoding="async" data-concept-fv-image style="display:block;width:100%;height:100%;object-fit:cover;object-position:50% 20%;transform:scale(${portrait.scale});transform-origin:${portrait.origin};">`;
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
        resolve(false);
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
