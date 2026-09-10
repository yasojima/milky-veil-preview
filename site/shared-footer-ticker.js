import { sharedFooterTickerText } from "./shared-site-data.js?v=20260906-02&pages=20260910-115";

const tickerItems = Object.freeze(Array.from({ length: 5 }, () => sharedFooterTickerText));

export function sharedFooterTickerMarkup() {
  return `
    <section class="shared-footer-ticker" aria-label="${sharedFooterTickerText}">
      <div class="content_wrapper" aria-hidden="true">
        <div class="wrapper_item">
          ${tickerItems.map((text) => `
            <div class="inner_item">
              <div class="inner_item_txt">
                <div class="heading block_header_4 align-left">
                  <h3 class="h">${text}</h3>
                </div>
              </div>
            </div>`).join("")}
        </div>
      </div>
    </section>`;
}

export function sharedFooterTickerRuleMarkup() {
  return `
    <div class="shared-footer-ticker-rule contents_hr block_line_1 pt0 pb100 width_full" aria-hidden="true">
      <hr>
    </div>`;
}
