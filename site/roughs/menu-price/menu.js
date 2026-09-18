import { sharedSalonData } from "../../shared-site-data.js?pages=20260918-405";
import { priceItems } from "./menu-data.js?pages=20260918-405";

if (new URLSearchParams(location.search).has("embed")) document.body.dataset.embedded = "true";

document.querySelector("[data-brand]").textContent = sharedSalonData.name;
const container = document.querySelector("#price-groups");
const list = document.createElement("dl");
for (const [name, price, description] of priceItems) {
  const row = document.createElement("div");
  row.className = "price-row";
  const term = document.createElement("dt");
  term.textContent = name;
  const value = document.createElement("dd");
  value.className = "amount";
  value.textContent = price.startsWith("+") ? `+ ¥${price.slice(1)}` : `¥${price}`;
  const tax = document.createElement("span");
  tax.className = "tax";
  tax.textContent = "（税込）";
  value.append(tax);
  row.append(term, value);
  if (description) {
    const detail = document.createElement("dd");
    detail.className = "detail";
    detail.textContent = description;
    row.append(detail);
  }
  list.append(row);
}
container.append(list);
