import { sharedSalonData, sharedRouteRegistry } from "./shared-site-data.js?v=20261008-614";

export const contactLabel = "お問い合わせはこちら";
export const reservationLabel = "ご予約はこちら";
export const contactDemoMessage = "デモ表示のためリンク未設定です。";

export function showContactDemo() {
  alert(contactDemoMessage);
}

export function menuContactMarkup() {
  const openingHours = sharedSalonData.hours.slice(0, -1).join(" / ").replace(/\d{1,2}:\d{2}[–-]\d{1,2}:\d{2}/g, time => `<span class="menu-hours-time">${time}</span>`);
  return `<div class="menu-contact-details" aria-label="連絡先・営業時間">
    <button type="button" data-menu-contact="phone" class="menu-contact-phone">${sharedSalonData.phone}</button>
    <div class="menu-contact-hours"><span>${openingHours}</span><span class="menu-hours-separator"> / </span><span class="menu-contact-closed">${sharedSalonData.hours.at(-1)}</span></div>
    <div class="menu-contact-actions">
    <a href="${sharedRouteRegistry.contact.path}" data-link>${contactLabel}</a>
    <button type="button" data-menu-contact="reserve">${reservationLabel}</button>
    </div>
  </div>`;
}
