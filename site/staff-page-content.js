const portrait = (name, alt) => ({ src: `/milky-veil-preview/assets/references/staff-page/${name}.png`, alt, width: 1152, height: 2048 });

export const staffPageContent = Object.freeze({
  pointLabel: "伝えたいこと",
  firstView: {
    left: { ...portrait("fv-left", "グレーの服と白いロングヘアのスタッフ"), position: "50% 20%", scale: 1, origin: "center", headTop: 202 },
    right: { ...portrait("fv-right", "ピンクの服と白から紫のロングヘアのスタッフ"), position: "50% 10%", scale: 1, origin: "center", headTop: 88 },
  },
  detail: portrait("miu-portrait-351", "頬に手を添えた白いロングヘアのスタッフ"),
  pointMain: portrait("point-main", "グレーの服で椅子に腰掛けたスタッフ"),
  pointCards: [
    portrait("point-01", "頬に片手を添えたスタッフ"),
    portrait("point-02", "あごの下に両手を添えたスタッフ"),
    portrait("point-03", "ウインクするスタッフ"),
  ],
});

export const staffImageSources = Object.freeze([
  ...Object.values(staffPageContent.firstView), staffPageContent.detail,
  staffPageContent.pointMain, ...staffPageContent.pointCards,
].map(image => image.src));
