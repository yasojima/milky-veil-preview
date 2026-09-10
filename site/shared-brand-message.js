import { sharedBrandEyebrow, sharedBrandHeadlineLines, sharedBrandSupportingLines } from "./shared-site-data.js?v=20260906-02&pages=20260910-119";

export const sharedBrandMessageEyebrow = sharedBrandEyebrow;
export const sharedBrandMessageLines = sharedBrandHeadlineLines;
export const sharedBrandMessageSupportingLines = sharedBrandSupportingLines;

export function sharedBrandMessageMarkup() {
  return `<section class="shared-brand-message"><div class="shared-brand-message-copy"><small>${sharedBrandMessageEyebrow}</small><p>${sharedBrandMessageLines.join("<br>")}</p><span>${sharedBrandMessageSupportingLines.join("<br>")}</span></div></section>`;
}

export function mountSharedBrandMessage(host) {
  if (!(host instanceof HTMLElement)) return null;
  host.innerHTML = sharedBrandMessageMarkup();
  return host.firstElementChild;
}
