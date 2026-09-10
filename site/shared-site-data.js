export const sharedBrandLogo = "/milky-veil-preview/assets/generated/logo-concepts/logo-mv-monogram-transparent-v2.png";
export const sharedRouteRegistry = Object.freeze({
  home: Object.freeze({ path: "/milky-veil-preview/", label: "HOME" }),
  colorDesign: Object.freeze({ path: "/milky-veil-preview/#color-design", label: "HAIR GALLERY", navigationMode: "document" }),
  concept: Object.freeze({ path: "/milky-veil-preview/concept/", label: "CONCEPT", navigationMode: "document" }),
  menu: Object.freeze({ path: "/milky-veil-preview/menu/", label: "MENU", navigationMode: "document" }),
  staff: Object.freeze({ path: "/milky-veil-preview/staff/", label: "STAFF", navigationMode: "document" }),
  items: Object.freeze({ path: "/milky-veil-preview/items/", label: "ITEMS", navigationMode: "document" }),
  access: Object.freeze({ path: "/milky-veil-preview/access/", label: "ACCESS", navigationMode: "document" }),
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

export const sharedRouteIds = Object.freeze(Object.keys(sharedRouteRegistry).filter(id => !sharedRouteRegistry[id].path.includes("#")));
export const sharedPrimaryRouteIds = Object.freeze(["home", "concept", "menu", "staff", "items", "access"]);
export const sharedSecondaryRouteIds = Object.freeze(["contact", "privacy", "colorDesign"]);
export const sharedFooterRouteIds = Object.freeze([...sharedPrimaryRouteIds, ...sharedSecondaryRouteIds]);
export const sharedBrandEyebrow = "DESIGN COLOR SALON";
export const sharedBrandHeadlineLines = Object.freeze(["COLOR", "YOUR WAY."]);
export const sharedBrandSupportingLines = Object.freeze([
  "これがいいの。",
  "だって、今日のほうが可愛いんだもん。",
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
