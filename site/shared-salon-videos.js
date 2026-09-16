export const MENU_MOVIE_ASSETS = [
  "/milky-veil-preview/assets/generated/web-video/menu-movie-01.mp4",
  "/milky-veil-preview/assets/generated/web-video/menu-movie-02.mp4",
  "/milky-veil-preview/assets/generated/web-video/menu-movie-03.mp4",
];

export const MENU_STILL_ASSETS = MENU_MOVIE_ASSETS.map(src => src.replace(".mp4", "-first-frame.webp"));
