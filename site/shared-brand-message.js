import { sharedBrandEyebrow, sharedBrandHeadlineLines, sharedBrandSupportingLines } from "./shared-site-data.js?v=20260906-02&pages=20260913-244";

export const sharedBrandMessageEyebrow = sharedBrandEyebrow;
export const sharedBrandMessageLines = sharedBrandHeadlineLines;
export const sharedBrandMessageSupportingLines = sharedBrandSupportingLines;

export function sharedBrandMessageMarkup() {
  const headline = sharedBrandMessageLines.map(line => line.split(" ").map(word => `<span class="brand-headline-word">${word}</span>`).join(" ")).join("<br>");
  return `<section class="shared-brand-message"><div class="shared-brand-message-copy"><small>${sharedBrandMessageEyebrow}</small><p>${headline}</p><span>${sharedBrandMessageSupportingLines.join("<br>")}</span></div></section>`;
}

export function mountSharedBrandMessage(host) {
  if (!(host instanceof HTMLElement)) return null;
  host.innerHTML = sharedBrandMessageMarkup();
  return host.firstElementChild;
}
