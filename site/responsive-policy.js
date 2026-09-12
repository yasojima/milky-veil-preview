// Shared UI boundaries must match the 900px CSS media blocks.
export const layoutQueries = Object.freeze({
  mobile: "(max-width: 900px)",
  desktop: "(min-width: 901px)",
  instagramCompact: "(max-width: 767px)",
  legacyMotionCompact: "(max-width: 700px)",
});
export const mobileLayout = () => window.matchMedia(layoutQueries.mobile);
export const usesMobileLayout = () => mobileLayout().matches;
