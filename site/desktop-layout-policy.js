export function desktopClosingMetrics(height, readSpacing) {
  const progress = Math.max(0, Math.min(1, (height - 550) / 250));
  return {
    headlineTop: readSpacing("--closing-min-top", 64),
    minimumTop: 136,
    minimumBottom: readSpacing("--closing-min-bottom", 56),
    lineHeight: height < 800 ? String(1.02 - .18 * (1 - progress) ** 2) : null,
  };
}
