const clone = value => structuredClone(value);
const path = (vertices, closed = false) => ({
  i: vertices.map(() => [0, 0]), o: vertices.map(() => [0, 0]), v: vertices, c: closed,
});

// New straight-sided glyphs use the reference's tapered Roman stroke proportions.
const drawnGlyphs = {
  M: { width: 110, strokes: [[8, 160, 8, 40, 7], [8, 40, 55, 139, 12], [55, 139, 102, 40, 6], [102, 40, 102, 160, 12]] },
  K: { width: 85, strokes: [[8, 40, 8, 160, 12], [77, 40, 8, 110, 6], [35, 82, 79, 160, 12]] },
  Y: { width: 90, strokes: [[7, 40, 45, 103, 12], [83, 40, 45, 103, 6], [45, 103, 45, 160, 11]] },
  V: { width: 100, strokes: [[7, 40, 50, 160, 12], [50, 160, 93, 40, 6]] },
};

export function brandConceptLogoMotion(source, name) {
  const data = clone(source);
  const composition = data.assets.find(asset => asset.id === data.layers[0].refId);
  const originals = composition.layers;
  const base = originals.at(-1);
  const template = originals.find(layer => layer.nm === "I_close");
  const glyphs = { I: { group: 8, x: 331.959, width: 18.436, time: 2.298 }, L: { group: 0, x: 541.82, width: 65.998, time: 6.896 }, E: { group: 1, x: 655.195, width: 64.8, time: 9.194 } };
  const ink = base.shapes[0].it.find(item => item.ty === "fl");
  const transform = base.shapes[0].it.find(item => item.ty === "tr");
  const masks = [], artwork = [];
  let cursor = 0, ordinal = 0;
  const letters = [...name.toUpperCase()];
  const count = letters.filter(letter => letter !== " ").length;
  const shiftTimes = (node, offset) => {
    if (!node || typeof node !== "object") return;
    if (typeof node.t === "number") node.t += offset;
    Object.values(node).forEach(child => shiftTimes(child, offset));
  };
  const mask = (phase, points, offset, position = [0, 0, 0]) => {
    const layer = clone(originals.find(item => item.nm === `I_${phase}`));
    layer.ks.p.k = position;
    layer.shapes[0].it.find(item => item.ty === "sh").ks.k = path(points);
    layer.shapes[0].it.find(item => item.ty === "st").w.k = 26;
    shiftTimes(layer.shapes, offset);
    masks.push(layer);
  };
  for (const letter of letters) {
    if (letter === " ") { cursor += 36; continue; }
    const time = ordinal * 11.492 / (count - 1);
    const existing = glyphs[letter];
    if (existing) {
      const group = clone(base.shapes[existing.group]);
      const tr = group.it.find(item => item.ty === "tr");
      tr.p.k[0] += cursor - existing.x + 10;
      tr.p.k[1] += 36.5;
      artwork.push(group);
      for (const original of originals.filter(item => item.nm.startsWith(`${letter}_`))) {
        const layer = clone(original);
        layer.ks.p.k[0] += cursor - existing.x;
        shiftTimes(layer.shapes, time - existing.time);
        masks.push(layer);
      }
      cursor += existing.width;
    } else {
      const glyph = drawnGlyphs[letter];
      if (!glyph) throw new Error(`Unsupported logo glyph: ${letter}`);
      for (const [x1, y1, x2, y2, width] of glyph.strokes) {
        const length = Math.hypot(x2 - x1, y2 - y1);
        const nx = -(y2 - y1) / length, ny = (x2 - x1) / length;
        const a = width * .52, b = width * .43;
        const polygon = [[x1 + nx*a, y1 + ny*a], [x2 + nx*b, y2 + ny*b], [x2 - nx*b, y2 - ny*b], [x1 - nx*a, y1 - ny*a]].map(([x,y]) => [x + cursor, y]);
        const tr = clone(transform); tr.p.k = [0, 0];
        artwork.push({ ty: "gr", it: [{ ty: "sh", ks: { a: 0, k: path(polygon, true) } }, clone(ink), tr] });
        for (const phase of ["open", "close"]) mask(phase, [[cursor+x1,y1],[cursor+x2,y2]], time - 2.298);
      }
      cursor += glyph.width;
    }
    cursor += 20; ordinal++;
  }
  const offset = (data.w - (cursor - 20)) / 2;
  const art = clone(template);
  art.nm = name;
  art.ks.p.k = [0, 0, 0];
  art.shapes = artwork;
  composition.layers = [...masks, art].map((layer, index) => {
    layer.ind = index + 1;
    layer.ks.p.k[0] += offset;
    return layer;
  });
  data.nm = `${name} logo motion`;
  return data;
}
