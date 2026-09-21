import { sharedSalonData } from "./shared-site-data.js?v=20260913-251";

export const sharedDocumentBrand = Object.freeze({
  title: sharedSalonData.name,
  icon: "/milky-veil-preview/assets/generated/logo-concepts/favicon-mv-monogram-v3.png?v=20260902-04",
});

export function applySharedDocumentBrand(documentRoot = document) {
  documentRoot.title = sharedDocumentBrand.title;
  documentRoot.head.querySelector("title")?.setAttribute("translate", "no");

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

export function brandDocumentHtml(html) {
  const escape = value => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
  const head = `<title translate="no">${escape(sharedDocumentBrand.title)}</title>\n<link rel="icon" type="image/png" href="${escape(sharedDocumentBrand.icon)}">\n<link rel="apple-touch-icon" type="image/png" href="${escape(sharedDocumentBrand.icon)}">`;
  return html.replace(/<head\b[^>]*>[\s\S]*?<\/head>/i, source => source
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>\s*/gi, "")
    .replace(/<link\b(?=[^>]*\brel=["'](?:shortcut icon|icon|apple-touch-icon)["'])[^>]*>\s*/gi, "")
    .replace(/<\/head>/i, `${head}\n</head>`));
}

if (typeof document !== "undefined") applySharedDocumentBrand();
