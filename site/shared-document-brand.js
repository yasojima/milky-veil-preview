export const sharedDocumentBrand = Object.freeze({
  title: "MILKY VEIL",
  icon: "/milky-veil-preview/assets/generated/logo-concepts/favicon-mv-monogram-v3.png?v=20260902-04",
});

export function applySharedDocumentBrand(documentRoot = document) {
  documentRoot.title = sharedDocumentBrand.title;

  for (const { rel, href, type } of [
    { rel: "icon", href: sharedDocumentBrand.icon, type: "image/png" },
    { rel: "apple-touch-icon", href: sharedDocumentBrand.icon, type: "image/png" },
  ]) {
    let link = documentRoot.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = documentRoot.createElement("link");
      link.rel = rel;
      documentRoot.head.append(link);
    }
    link.type = type;
    link.href = href;
  }
}

applySharedDocumentBrand();
