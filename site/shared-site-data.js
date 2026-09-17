export const sharedBrandLogo = "/milky-veil-preview/assets/generated/logo-concepts/logo-mv-monogram-transparent-v2.png";
export const sharedRouteRegistry = Object.freeze({
  home: Object.freeze({ path: "/milky-veil-preview/", label: "HOME" }),
  colorDesign: Object.freeze({ path: "/milky-veil-preview/#color-design", label: "HAIR GALLERY", navigationMode: "document" }),
  concept: Object.freeze({ path: "/milky-veil-preview/concept/", label: "CONCEPT", navigationMode: "document" }),
  menu: Object.freeze({ path: "/milky-veil-preview/menu/", label: "MENU", navigationMode: "document", introTitle: "MILKY VEILがお約束すること" }),
  staff: Object.freeze({ path: "/milky-veil-preview/staff/", label: "STAFF", navigationMode: "document", introTitle: "MILKY VEILが誇るスタッフ" }),
  items: Object.freeze({ path: "/milky-veil-preview/items/", label: "ITEMS", navigationMode: "document", introTitle: "MILKY VEILが選んだアイテム" }),
  access: Object.freeze({ path: "/milky-veil-preview/access/", label: "ACCESS", navigationMode: "document", introTitle: "MILKY VEILがお迎えする場所" }),
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
export const sharedFooterRouteIds = Object.freeze([...sharedPrimaryRouteIds, "contact", "privacy"]);
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
  demoLocation: Object.freeze({
    area: "東京都渋谷区・渋谷駅周辺",
    station: "渋谷駅",
    mapQuery: "渋谷駅",
    mapPlaceId: "ChIJnxAAO1aLGGARJqvi8d4oczM",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7701633469483!2d139.697129688855!3d35.658033900000035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b563b00109f%3A0x337328def1e2ab26!2z5riL6LC36aeF!5e0!3m2!1sja!2sjp!4v1789649689122!5m2!1sja!2sjp",
    notice: "MILKY VEILは架空のサロンです。地図のピンはデモ用に渋谷駅を示しており、実在する店舗の所在地ではありません。",
  }),
  headerMessage: "まだ知らない“かわいい”に、渋谷で出会う。",
});

export const sharedSocials = Object.freeze([
  Object.freeze({ name: "X", file: "x.png" }),
  Object.freeze({ name: "Instagram", file: "instagram.png" }),
  Object.freeze({ name: "TikTok", file: "tiktok.png" }),
  Object.freeze({ name: "YouTube", file: "youtube.png" }),
]);
