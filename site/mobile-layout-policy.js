export function mobileClosingMetrics(height) {
  return {
    headlineTop: 92,
    minimumTop: 92,
    minimumBottom: height < 650 ? 20 : 40,
    lineHeight: null,
  };
}
