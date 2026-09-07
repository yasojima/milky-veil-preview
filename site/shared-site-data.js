export const sharedRouteRegistry = Object.freeze({
  home: Object.freeze({ path: "/milky-veil-preview/", label: "HOME" }),
  concept: Object.freeze({ path: "/milky-veil-preview/concept/", label: "CONCEPT", navigationMode: "document" }),
  service: Object.freeze({ path: "/milky-veil-preview/service/", label: "SERVICE", navigationMode: "document" }),
  staff: Object.freeze({ path: "/milky-veil-preview/staff/", label: "STAFF" }),
  menu: Object.freeze({ path: "/milky-veil-preview/menu/", label: "MENU" }),
  items: Object.freeze({ path: "/milky-veil-preview/items/", label: "ITEMS" }),
  access: Object.freeze({ path: "/milky-veil-preview/access/", label: "ACCESS" }),
  blog: Object.freeze({ path: "/milky-veil-preview/blog/", label: "JOURNAL" }),
  feature: Object.freeze({ path: "/milky-veil-preview/feature/", label: "FEATURE" }),
  featureColor: Object.freeze({ path: "/milky-veil-preview/feature/color/", label: "COLOR", parentId: "feature" }),
  featurePerm: Object.freeze({ path: "/milky-veil-preview/feature/perm/", label: "PERM", parentId: "feature" }),
  featureStraight: Object.freeze({ path: "/milky-veil-preview/feature/hair-straightening/", label: "STRAIGHT", parentId: "feature" }),
  featureTreatment: Object.freeze({ path: "/milky-veil-preview/feature/treatment/", label: "TREATMENT", parentId: "feature" }),
  featureMens: Object.freeze({ path: "/milky-veil-preview/feature/mens/", label: "MEN'S", parentId: "feature" }),
  contact: Object.freeze({ path: "/milky-veil-preview/contact/", label: "CONTACT" }),
  privacy: Object.freeze({ path: "/milky-veil-preview/privacy/", label: "PRIVACY POLICY" }),
  sitemap: Object.freeze({ path: "/milky-veil-preview/sitemap/", label: "SITE MAP" }),
  column: Object.freeze({ path: "/milky-veil-preview/column/", label: "COLUMN" }),
});

export const sharedRouteIds = Object.freeze(Object.keys(sharedRouteRegistry));
export const sharedPrimaryRouteIds = Object.freeze(["home", "concept", "service", "staff", "menu", "items", "access", "blog"]);
export const sharedSecondaryRouteIds = Object.freeze(["feature", "featureColor", "featurePerm", "featureStraight", "featureTreatment", "featureMens", "column", "contact", "privacy", "sitemap"]);
export const sharedFooterRouteIds = Object.freeze(["home", "concept", "service", "staff", "menu", "items", "access", "blog", "feature", "contact", "privacy", "sitemap", "column"]);
export const sharedBrandEyebrow = "COLOR & DESIGN SALON";
export const sharedBrandHeadlineLines = Object.freeze(["BLEACH", "THE RULES."]);
export const sharedBrandSupportingLines = Object.freeze([
  "これがいいの。",
  "だって、昨日より今日のほうが可愛いんだもん。",
]);
export const sharedFooterTickerText = "MORE COLOR, MORE ME.";

export const sharedSalonData = Object.freeze({
  name: "MILKY VEIL",
  phone: "000-0000-0000",
  postalCode: "000-0000",
  addressLines: Object.freeze(["東京都渋谷区△△0-00-00", "MILKY VEIL BLDG. 0F"]),
  hours: Object.freeze(["平日 12:00–21:00", "土日祝 11:00–20:00", "定休日 月曜日"]),
  locationLabel: "DEMO SALON / SHIBUYA",
  accessLabel: "渋谷駅△△出口より徒歩約○分",
  headerMessage: "まだ知らない“かわいい”に、渋谷で出会う。",
});

export const sharedSocials = Object.freeze([
  Object.freeze({ name: "X", file: "x.png" }),
  Object.freeze({ name: "Instagram", file: "instagram.png" }),
  Object.freeze({ name: "TikTok", file: "tiktok.png" }),
  Object.freeze({ name: "YouTube", file: "youtube.png" }),
]);
