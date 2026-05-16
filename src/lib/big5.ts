export type Trait = "O" | "C" | "E" | "A" | "N";

export const TRAIT_INFO: Record<Trait, { name: string; desc: string; high: string; low: string; color: string }> = {
  O: {
    name: "개방성",
    desc: "새로운 경험과 아이디어에 대한 호기심",
    high: "상상력이 풍부하고 호기심이 많으며 새로운 것을 추구합니다.",
    low: "전통과 익숙한 것을 선호하며 현실적이고 실용적입니다.",
    color: "var(--trait-o)",
  },
  C: {
    name: "성실성",
    desc: "목표를 위해 자신을 통제하고 계획하는 성향",
    high: "체계적이고 책임감이 강하며 목표 지향적입니다.",
    low: "유연하고 즉흥적이며 자유로운 방식을 선호합니다.",
    color: "var(--trait-c)",
  },
  E: {
    name: "외향성",
    desc: "사회적 상호작용과 활동에서 에너지를 얻는 정도",
    high: "사교적이고 활동적이며 사람들과의 교류에서 에너지를 얻습니다.",
    low: "조용하고 내성적이며 혼자만의 시간을 통해 에너지를 얻습니다.",
    color: "var(--trait-e)",
  },
  A: {
    name: "친화성",
    desc: "타인에 대한 공감과 협력의 정도",
    high: "타인에게 따뜻하고 협조적이며 신뢰를 잘 형성합니다.",
    low: "독립적이고 비판적이며 자신의 입장을 분명히 합니다.",
    color: "var(--trait-a)",
  },
  N: {
    name: "신경성",
    desc: "스트레스와 부정적 감정에 대한 민감도",
    high: "감정의 기복이 있고 스트레스에 민감하게 반응할 수 있습니다.",
    low: "정서적으로 안정적이며 스트레스 상황에서도 침착함을 유지합니다.",
    color: "var(--trait-n)",
  },
};

export const TRAIT_DETAIL: Record<Trait, {
  meaning: string;
  highTraits: string[];
  lowTraits: string[];
  tips: string[];
}> = {
  O: {
    meaning:
      "개방성(Openness to Experience)은 새로운 아이디어, 예술, 추상적 사고, 다양한 경험에 얼마나 끌리는지를 나타냅니다. 지능이 아니라 호기심과 상상력의 폭에 가깝습니다.",
    highTraits: [
      "새로운 자극과 학습을 동력으로 삼습니다",
      "추상적·은유적 사고에 강합니다",
      "관습보다 가능성을 먼저 봅니다",
    ],
    lowTraits: [
      "검증된 방법과 익숙한 환경을 선호합니다",
      "구체적이고 실용적인 정보를 신뢰합니다",
      "변화보다 안정성에서 안정감을 얻습니다",
    ],
    tips: [
      "높다면: 호기심이 분산되기 쉬우니 ‘이번 분기에 깊게 팔 주제 1~2개’를 정해 보세요.",
      "낮다면: 익숙함이 강점이지만, 한 달에 한 번 작고 안전한 새 시도(낯선 작가·도구·동선)를 의도적으로 끼워 보세요.",
      "콘텐츠·기획 일이라면 개방성을 ‘아이디어 양산’ 단계에, 낮은 개방성은 ‘선별·실행’ 단계에 활용할 수 있습니다.",
    ],
  },
  C: {
    meaning:
      "성실성(Conscientiousness)은 목표를 위해 충동을 조절하고 체계적으로 행동하는 경향입니다. 장기적 성취·건강·직무 수행과 가장 일관되게 연관되는 요인으로 보고됩니다(Roberts et al., 2007).",
    highTraits: [
      "계획·마감·일관성에 강합니다",
      "약속과 디테일을 잘 지킵니다",
      "장기 목표를 단계로 쪼개 실행합니다",
    ],
    lowTraits: [
      "유연하고 즉흥적으로 상황에 반응합니다",
      "여러 선택지를 열어두는 편입니다",
      "엄격한 구조보다 자유로운 흐름을 선호합니다",
    ],
    tips: [
      "높다면: 자기기준이 높아 번아웃 위험이 있어요. ‘충분히 좋음(good enough)’의 기준을 미리 정해두세요.",
      "낮다면: 의지보다 환경 설계로 보완하세요. 캘린더 블록, 체크리스트, 같이 하는 동료 등 외부 구조가 효과적입니다.",
      "팀에서는 성실성이 높은 사람이 ‘실행·운영’을, 낮은 사람이 ‘탐색·적응’을 맡을 때 보완적입니다.",
    ],
  },
  E: {
    meaning:
      "외향성(Extraversion)은 외부 자극과 사회적 상호작용에서 에너지를 얻는 정도입니다. 사교성뿐 아니라 활력·긍정정서·자극 추구를 포괄합니다.",
    highTraits: [
      "사람·대화에서 에너지가 충전됩니다",
      "주도적으로 먼저 움직이는 편입니다",
      "활기차고 긍정적인 분위기를 만듭니다",
    ],
    lowTraits: [
      "혼자만의 시간에서 에너지가 회복됩니다",
      "깊이 있는 1:1 관계를 선호합니다",
      "관찰하고 정리한 뒤 말하는 편입니다",
    ],
    tips: [
      "높다면: 발산이 많은 만큼 ‘듣기·기록’ 시간을 의도적으로 확보해 보세요.",
      "낮다면: 내향성은 결함이 아닙니다. 회의 전 메모, 비동기 커뮤니케이션 등 자기 페이스에 맞는 채널을 설계하세요.",
      "에너지 회복 루틴(혼자/함께)을 주간 일정에 미리 배치하면 번아웃을 줄일 수 있습니다.",
    ],
  },
  A: {
    meaning:
      "친화성(Agreeableness)은 타인에 대한 신뢰·공감·협력의 경향입니다. 관계의 따뜻함뿐 아니라 갈등에서 자기 입장을 어떻게 다루는지와도 연결됩니다.",
    highTraits: [
      "타인의 감정과 맥락을 잘 읽습니다",
      "협력과 조화를 우선시합니다",
      "신뢰 관계를 빠르게 형성합니다",
    ],
    lowTraits: [
      "자기 입장과 기준을 분명히 합니다",
      "비판적·분석적으로 의견을 정리합니다",
      "필요할 때 어려운 말을 꺼낼 수 있습니다",
    ],
    tips: [
      "높다면: ‘거절·협상’을 미리 연습해 두세요. 갈등 회피가 장기적으로 관계와 에너지를 갉아먹을 수 있습니다.",
      "낮다면: 의도가 좋아도 표현이 날카로워 보일 수 있어요. 결론 앞에 ‘상대 맥락 한 줄’을 붙이는 습관이 도움이 됩니다.",
      "협업에서 친화성은 ‘관계’를, 낮은 친화성은 ‘기준·품질’을 지키는 역할로 서로 보완됩니다.",
    ],
  },
  N: {
    meaning:
      "신경성(Neuroticism)은 스트레스·부정정서에 대한 민감도입니다. 약점이 아니라 위험을 빠르게 감지하는 신호 시스템에 가까우며, 회복 자원과 함께 볼 때 의미가 분명해집니다.",
    highTraits: [
      "변화·불확실성에 민감하게 반응합니다",
      "위험 신호를 빨리 감지합니다",
      "감정의 진폭이 크고 깊습니다",
    ],
    lowTraits: [
      "스트레스 상황에서도 비교적 침착합니다",
      "감정 회복이 빠른 편입니다",
      "압박 속에서도 일관된 페이스를 유지합니다",
    ],
    tips: [
      "높다면: 감정은 정보입니다. ‘무엇이 신호인지’를 적어보면 막연한 불안이 구체적 행동 항목으로 바뀝니다.",
      "높다면: 수면·운동·관계 같은 회복 자원의 ‘기본값’을 평소에 단단히 만들어 두세요.",
      "낮다면: 안정감이 강점인 만큼, 주변의 감정 신호를 의도적으로 묻고 듣는 연습이 협업에 도움이 됩니다.",
    ],
  },
};

export interface Question {
  id: number;
  text: string;
  en: string;
  trait: Trait;
  reverse: boolean;
}

// IPIP Big-Five Factor Markers (50 items, Goldberg 1992) — public domain
// Source: https://ipip.ori.org/New_IPIP-50-item-scale.htm
export const QUESTIONS: Question[] = [
  // Extraversion (E) — 10 items
  { id: 1, text: "나는 모임에서 분위기를 주도하는 편이다.", en: "Am the life of the party.", trait: "E", reverse: false },
  { id: 2, text: "나는 평소 말수가 적은 편이다.", en: "Don't talk a lot.", trait: "E", reverse: true },
  { id: 3, text: "나는 사람들과 어울릴 때 마음이 편안하다.", en: "Feel comfortable around people.", trait: "E", reverse: false },
  { id: 4, text: "나는 무리에서 한 발 뒤로 빠져 있는 편이다.", en: "Keep in the background.", trait: "E", reverse: true },
  { id: 5, text: "나는 먼저 다가가 말을 거는 편이다.", en: "Start conversations.", trait: "E", reverse: false },
  { id: 6, text: "나는 딱히 할 말이 떠오르지 않을 때가 많다.", en: "Have little to say.", trait: "E", reverse: true },
  { id: 7, text: "나는 모임에서 다양한 사람들과 두루 이야기를 나눈다.", en: "Talk to a lot of different people at parties.", trait: "E", reverse: false },
  { id: 8, text: "나는 남들의 시선이 내게 쏠리는 것이 부담스럽다.", en: "Don't like to draw attention to myself.", trait: "E", reverse: true },
  { id: 9, text: "나는 사람들의 주목을 받는 상황이 싫지 않다.", en: "Don't mind being the center of attention.", trait: "E", reverse: false },
  { id: 10, text: "나는 처음 보는 사람들 앞에서는 말이 없어진다.", en: "Am quiet around strangers.", trait: "E", reverse: true },

  // Agreeableness (A) — 10 items
  { id: 11, text: "나는 솔직히 타인의 일에는 별로 마음이 쓰이지 않는다.", en: "Feel little concern for others.", trait: "A", reverse: true },
  { id: 12, text: "나는 사람 자체에 흥미를 느낀다.", en: "Am interested in people.", trait: "A", reverse: false },
  { id: 13, text: "나는 상대방에게 상처가 될 만한 말을 할 때가 있다.", en: "Insult people.", trait: "A", reverse: true },
  { id: 14, text: "나는 다른 사람의 기분을 헤아릴 줄 안다.", en: "Sympathize with others' feelings.", trait: "A", reverse: false },
  { id: 15, text: "나는 남의 고민에는 크게 신경 쓰지 않는다.", en: "Am not interested in other people's problems.", trait: "A", reverse: true },
  { id: 16, text: "나는 정이 많고 마음이 따뜻한 편이다.", en: "Have a soft heart.", trait: "A", reverse: false },
  { id: 17, text: "나는 다른 사람에 대해 굳이 알고 싶다는 생각이 들지 않는다.", en: "Am not really interested in others.", trait: "A", reverse: true },
  { id: 18, text: "나는 바쁘더라도 다른 사람을 위해 시간을 내준다.", en: "Take time out for others.", trait: "A", reverse: false },
  { id: 19, text: "나는 다른 사람의 감정에 쉽게 동화된다.", en: "Feel others' emotions.", trait: "A", reverse: false },
  { id: 20, text: "나는 사람들이 내 곁에서 편안함을 느끼게 한다.", en: "Make people feel at ease.", trait: "A", reverse: false },

  // Conscientiousness (C) — 10 items
  { id: 21, text: "나는 무슨 일이든 미리 준비해두는 편이다.", en: "Am always prepared.", trait: "C", reverse: false },
  { id: 22, text: "나는 내 물건을 아무 데나 두곤 한다.", en: "Leave my belongings around.", trait: "C", reverse: true },
  { id: 23, text: "나는 사소한 부분까지 꼼꼼하게 챙긴다.", en: "Pay attention to details.", trait: "C", reverse: false },
  { id: 24, text: "나는 일을 어수선하게 만들곤 한다.", en: "Make a mess of things.", trait: "C", reverse: true },
  { id: 25, text: "나는 해야 할 일은 미루지 않고 바로 처리한다.", en: "Get chores done right away.", trait: "C", reverse: false },
  { id: 26, text: "나는 물건을 제자리에 두는 것을 종종 잊는다.", en: "Often forget to put things back in their proper place.", trait: "C", reverse: true },
  { id: 27, text: "나는 주변이 잘 정돈되어 있는 것을 좋아한다.", en: "Like order.", trait: "C", reverse: false },
  { id: 28, text: "나는 내가 맡은 일을 슬쩍 미루거나 피할 때가 있다.", en: "Shirk my duties.", trait: "C", reverse: true },
  { id: 29, text: "나는 정해진 계획과 일정에 따라 움직인다.", en: "Follow a schedule.", trait: "C", reverse: false },
  { id: 30, text: "나는 맡은 일을 빈틈없이 처리하려 한다.", en: "Am exacting in my work.", trait: "C", reverse: false },

  // Neuroticism (N) — 10 items
  { id: 31, text: "나는 작은 일에도 쉽게 스트레스를 받는다.", en: "Get stressed out easily.", trait: "N", reverse: false },
  { id: 32, text: "나는 평소 마음이 차분하고 여유로운 편이다.", en: "Am relaxed most of the time.", trait: "N", reverse: true },
  { id: 33, text: "나는 이런저런 일을 자주 곱씹으며 걱정한다.", en: "Worry about things.", trait: "N", reverse: false },
  { id: 34, text: "나는 우울해지는 일이 거의 없다.", en: "Seldom feel blue.", trait: "N", reverse: true },
  { id: 35, text: "나는 작은 자극에도 마음이 쉽게 흔들린다.", en: "Am easily disturbed.", trait: "N", reverse: false },
  { id: 36, text: "나는 사소한 일에도 금세 속이 상한다.", en: "Get upset easily.", trait: "N", reverse: false },
  { id: 37, text: "나는 기분이 자주 바뀌는 편이다.", en: "Change my mood a lot.", trait: "N", reverse: false },
  { id: 38, text: "나는 감정의 기복이 큰 편이다.", en: "Have frequent mood swings.", trait: "N", reverse: false },
  { id: 39, text: "나는 별것 아닌 일에도 쉽게 짜증이 난다.", en: "Get irritated easily.", trait: "N", reverse: false },
  { id: 40, text: "나는 이유 없이 울적해질 때가 많다.", en: "Often feel blue.", trait: "N", reverse: false },

  // Openness (O) — 10 items
  { id: 41, text: "나는 다양한 단어를 자유롭게 구사한다.", en: "Have a rich vocabulary.", trait: "O", reverse: false },
  { id: 42, text: "나는 추상적인 개념을 이해하는 것이 어렵다.", en: "Have difficulty understanding abstract ideas.", trait: "O", reverse: true },
  { id: 43, text: "나는 머릿속에 생생한 상상이 잘 떠오른다.", en: "Have a vivid imagination.", trait: "O", reverse: false },
  { id: 44, text: "나는 추상적인 주제에는 흥미가 가지 않는다.", en: "Am not interested in abstract ideas.", trait: "O", reverse: true },
  { id: 45, text: "나는 종종 기발한 아이디어를 떠올린다.", en: "Have excellent ideas.", trait: "O", reverse: false },
  { id: 46, text: "나는 상상력이 풍부한 편은 아니다.", en: "Do not have a good imagination.", trait: "O", reverse: true },
  { id: 47, text: "나는 새로운 개념을 빠르게 이해하는 편이다.", en: "Am quick to understand things.", trait: "O", reverse: false },
  { id: 48, text: "나는 평소 어려운 단어도 자연스럽게 사용한다.", en: "Use difficult words.", trait: "O", reverse: false },
  { id: 49, text: "나는 어떤 일에 대해 깊이 생각하는 시간을 즐긴다.", en: "Spend time reflecting on things.", trait: "O", reverse: false },
  { id: 50, text: "나는 늘 새로운 아이디어로 가득 차 있다.", en: "Am full of ideas.", trait: "O", reverse: false },
];

export const SCALE_LABELS = [
  "전혀 그렇지 않다",
  "그렇지 않다",
  "보통이다",
  "그렇다",
  "매우 그렇다",
];

export function computeScores(answers: Record<number, number>): Record<Trait, number> {
  const totals: Record<Trait, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 };
  const counts: Record<Trait, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 };

  for (const q of QUESTIONS) {
    const raw = answers[q.id];
    if (!raw) continue;
    const value = q.reverse ? 6 - raw : raw;
    totals[q.trait] += value;
    counts[q.trait] += 1;
  }

  const scores: Record<Trait, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 };
  (Object.keys(totals) as Trait[]).forEach((t) => {
    // normalize to 0-100
    const max = counts[t] * 5;
    const min = counts[t] * 1;
    scores[t] = counts[t] === 0 ? 0 : Math.round(((totals[t] - min) / (max - min)) * 100);
  });
  return scores;
}

export function scoreLevel(score: number): "낮음" | "보통" | "높음" {
  if (score < 40) return "낮음";
  if (score < 70) return "보통";
  return "높음";
}
