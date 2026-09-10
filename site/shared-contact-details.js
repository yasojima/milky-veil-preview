import { sharedSalonData, sharedRouteRegistry } from "./shared-site-data.js?v=20260906-02&pages=20260911-123";

export const contactLabel = "お問い合わせはこちら";
export const reservationLabel = "ご予約はこちら";

export function showContactDemo(kind) {
  alert(kind === "phone" ? "デモ表示のため電話リンクは未設定です。" : "デモ表示のため予約リンクは未設定です。");
}

export function menuContactMarkup() {
  return `<div class="menu-contact-details" aria-label="連絡先・営業時間">
    <button type="button" data-menu-contact="phone" class="menu-contact-phone">${sharedSalonData.phone}</button>
    <div class="menu-contact-hours">${sharedSalonData.hours.join(" / ")}</div>
    <div class="menu-contact-actions">
    <a href="${sharedRouteRegistry.contact.path}" data-link>${contactLabel}</a>
    <button type="button" data-menu-contact="reserve">${reservationLabel}</button>
    </div>
  </div>`;
}
