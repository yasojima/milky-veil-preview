const portrait = (name, alt) => ({ src: `/milky-veil-preview/assets/references/staff-page/${name}.png`, alt, width: 1152, height: 2048 });

export const staffPageContent = Object.freeze({
  pointLabel: "伝えたいこと",
  slots: {
    "intro-heading-first": "トレンドに敏感",
    "intro-heading-second": "",
    "detail-label": "OUR PEOPLE",
    "detail-heading": "笑顔が絶えないスタッフたち",
    "point01-lead": "私自身、髪やファッションを通して、<br>自分の好きなところを増やしていくのが好きです。",
    "point01-heading": "あなたの「これが好き」を、<br>もっと似合うかたちに。",
    "point01-body": "好きな色を選ぶこと。なりたい雰囲気を楽しむこと。<br>その人のこだわりには、その人らしい魅力があると思っています。<br>一人ひとりの「好き」に向き合うことが、MILKY VEILのデザインの出発点です。",
    "card1-label": "MY STYLE",
    "card1-heading": "私も、自分らしい可愛さを探しています。",
    "card1-body": "髪色を変えたり、いつものメイクとの組み合わせを考えたり。私自身、自分の魅力がもっと伝わるデザインを探すのが好きです。だから、新しい髪に挑戦するときの楽しみも、少し迷う気持ちも大切にしたい。そんな気持ちで、お客様のお話を聞いています。",
    "card2-label": "YOUR STYLE",
    "card2-heading": "どこが好きなのか、聞かせてください。",
    "card2-body": "同じ写真を見ても、惹かれるところは人それぞれ。色の柔らかさなのか、顔まわりの雰囲気なのか、その方が好きになった理由を知りたいと思っています。まだうまく言葉にならなくても大丈夫です。お話を重ねながら、あなたらしいデザインを一緒に見つけていきます。",
    "card3-label": "OUR TEAM",
    "card3-heading": "一人ひとりに向き合う姿勢を、みんなで。",
    "card3-body": "スタッフに普段から伝えているのは、目の前のお客様に合わせて考えることです。技術を指導するときも、色や形のつくり方と、そのデザインを選ぶ理由を一緒に話しています。それぞれの感性を磨きながら、お客様の個性を引き出せるチームでありたいと思っています。",
  },
  paragraphs: {
    "intro-copy": [
      "おしゃれが好きで人と話すことが大好きなスタッフばかりです。ファッションやセンスはそれぞれ違っても、お客様と一緒に「可愛いトレンド」をみつける時間がみんな大好きです。",
      "髪色や髪型を変えればお互いに褒めあったり真似したり、お客様と何気ないお話しで盛り上がったり。そんな、自然に会話が生まれる雰囲気を大切にしています。",
      "ここで過ごす楽しみや通うたびに話せるスタッフが増えていく、そんなお店でありたいと思っています。",
    ],
    "detail-copy": [
      "代表としてお店の自慢をひとつ挙げるなら、和気あいあいとした陽気なスタッフたちです。みんな気さくで、お客様との会話を楽しみにしている人ばかりです。",
      "施術が終わってもお互いに時間があると話しの続きが気になってこちらから声をかけにいくことも。担当のスタッフ以外とも顔なじみになっていただけたら嬉しいです(笑)",
    ],
  },
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
