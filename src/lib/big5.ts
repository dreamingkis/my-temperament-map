export type Trait = "O" | "C" | "E" | "A" | "N";

export const TRAIT_INFO: Record<Trait, { name: string; desc: string; high: string; low: string }> = {
  O: {
    name: "개방성",
    desc: "새로운 경험과 아이디어에 대한 호기심",
    high: "상상력이 풍부하고 호기심이 많으며 새로운 것을 추구합니다.",
    low: "전통과 익숙한 것을 선호하며 현실적이고 실용적입니다.",
  },
  C: {
    name: "성실성",
    desc: "목표를 위해 자신을 통제하고 계획하는 성향",
    high: "체계적이고 책임감이 강하며 목표 지향적입니다.",
    low: "유연하고 즉흥적이며 자유로운 방식을 선호합니다.",
  },
  E: {
    name: "외향성",
    desc: "사회적 상호작용과 활동에서 에너지를 얻는 정도",
    high: "사교적이고 활동적이며 사람들과의 교류에서 에너지를 얻습니다.",
    low: "조용하고 내성적이며 혼자만의 시간을 통해 에너지를 얻습니다.",
  },
  A: {
    name: "친화성",
    desc: "타인에 대한 공감과 협력의 정도",
    high: "타인에게 따뜻하고 협조적이며 신뢰를 잘 형성합니다.",
    low: "독립적이고 비판적이며 자신의 입장을 분명히 합니다.",
  },
  N: {
    name: "신경성",
    desc: "스트레스와 부정적 감정에 대한 민감도",
    high: "감정의 기복이 있고 스트레스에 민감하게 반응할 수 있습니다.",
    low: "정서적으로 안정적이며 스트레스 상황에서도 침착함을 유지합니다.",
  },
};

export interface Question {
  id: number;
  text: string;
  trait: Trait;
  reverse: boolean;
}

// 25 questions, 5 per trait (mix of regular and reverse-scored)
// IPIP Big-Five Factor Markers (50 items, Goldberg 1992) — public domain
// Source: https://ipip.ori.org/New_IPIP-50-item-scale.htm
export const QUESTIONS: Question[] = [
  // Extraversion (E) — 10 items
  { id: 1, text: "나는 모임에서 분위기를 주도하는 편이다.", trait: "E", reverse: false },
  { id: 2, text: "나는 평소 말수가 적은 편이다.", trait: "E", reverse: true },
  { id: 3, text: "나는 사람들과 어울릴 때 마음이 편안하다.", trait: "E", reverse: false },
  { id: 4, text: "나는 무리에서 한 발 뒤로 빠져 있는 편이다.", trait: "E", reverse: true },
  { id: 5, text: "나는 먼저 다가가 말을 거는 편이다.", trait: "E", reverse: false },
  { id: 6, text: "나는 딱히 할 말이 떠오르지 않을 때가 많다.", trait: "E", reverse: true },
  { id: 7, text: "나는 모임에서 다양한 사람들과 두루 이야기를 나눈다.", trait: "E", reverse: false },
  { id: 8, text: "나는 남들의 시선이 내게 쏠리는 것이 부담스럽다.", trait: "E", reverse: true },
  { id: 9, text: "나는 사람들의 주목을 받는 상황이 싫지 않다.", trait: "E", reverse: false },
  { id: 10, text: "나는 처음 보는 사람들 앞에서는 말이 없어진다.", trait: "E", reverse: true },

  // Agreeableness (A) — 10 items
  { id: 11, text: "나는 솔직히 타인의 일에는 별로 마음이 쓰이지 않는다.", trait: "A", reverse: true },
  { id: 12, text: "나는 사람 자체에 흥미를 느낀다.", trait: "A", reverse: false },
  { id: 13, text: "나는 상대방에게 상처가 될 만한 말을 할 때가 있다.", trait: "A", reverse: true },
  { id: 14, text: "나는 다른 사람의 기분을 헤아릴 줄 안다.", trait: "A", reverse: false },
  { id: 15, text: "나는 남의 고민에는 크게 신경 쓰지 않는다.", trait: "A", reverse: true },
  { id: 16, text: "나는 정이 많고 마음이 따뜻한 편이다.", trait: "A", reverse: false },
  { id: 17, text: "나는 다른 사람에 대해 굳이 알고 싶다는 생각이 들지 않는다.", trait: "A", reverse: true },
  { id: 18, text: "나는 바쁘더라도 다른 사람을 위해 시간을 내준다.", trait: "A", reverse: false },
  { id: 19, text: "나는 다른 사람의 감정에 쉽게 동화된다.", trait: "A", reverse: false },
  { id: 20, text: "나는 사람들이 내 곁에서 편안함을 느끼게 한다.", trait: "A", reverse: false },

  // Conscientiousness (C) — 10 items
  { id: 21, text: "나는 무슨 일이든 미리 준비해두는 편이다.", trait: "C", reverse: false },
  { id: 22, text: "나는 내 물건을 아무 데나 두곤 한다.", trait: "C", reverse: true },
  { id: 23, text: "나는 사소한 부분까지 꼼꼼하게 챙긴다.", trait: "C", reverse: false },
  { id: 24, text: "나는 일을 어수선하게 만들곤 한다.", trait: "C", reverse: true },
  { id: 25, text: "나는 해야 할 일은 미루지 않고 바로 처리한다.", trait: "C", reverse: false },
  { id: 26, text: "나는 물건을 제자리에 두는 것을 종종 잊는다.", trait: "C", reverse: true },
  { id: 27, text: "나는 주변이 잘 정돈되어 있는 것을 좋아한다.", trait: "C", reverse: false },
  { id: 28, text: "나는 내가 맡은 일을 슬쩍 미루거나 피할 때가 있다.", trait: "C", reverse: true },
  { id: 29, text: "나는 정해진 계획과 일정에 따라 움직인다.", trait: "C", reverse: false },
  { id: 30, text: "나는 맡은 일을 빈틈없이 처리하려 한다.", trait: "C", reverse: false },

  // Neuroticism (N) — 10 items
  { id: 31, text: "나는 작은 일에도 쉽게 스트레스를 받는다.", trait: "N", reverse: false },
  { id: 32, text: "나는 평소 마음이 차분하고 여유로운 편이다.", trait: "N", reverse: true },
  { id: 33, text: "나는 이런저런 일을 자주 곱씹으며 걱정한다.", trait: "N", reverse: false },
  { id: 34, text: "나는 우울해지는 일이 거의 없다.", trait: "N", reverse: true },
  { id: 35, text: "나는 작은 자극에도 마음이 쉽게 흔들린다.", trait: "N", reverse: false },
  { id: 36, text: "나는 사소한 일에도 금세 속이 상한다.", trait: "N", reverse: false },
  { id: 37, text: "나는 기분이 자주 바뀌는 편이다.", trait: "N", reverse: false },
  { id: 38, text: "나는 감정의 기복이 큰 편이다.", trait: "N", reverse: false },
  { id: 39, text: "나는 별것 아닌 일에도 쉽게 짜증이 난다.", trait: "N", reverse: false },
  { id: 40, text: "나는 이유 없이 울적해질 때가 많다.", trait: "N", reverse: false },

  // Openness (O) — 10 items
  { id: 41, text: "나는 다양한 단어를 자유롭게 구사한다.", trait: "O", reverse: false },
  { id: 42, text: "나는 추상적인 개념을 이해하는 것이 어렵다.", trait: "O", reverse: true },
  { id: 43, text: "나는 머릿속에 생생한 상상이 잘 떠오른다.", trait: "O", reverse: false },
  { id: 44, text: "나는 추상적인 주제에는 흥미가 가지 않는다.", trait: "O", reverse: true },
  { id: 45, text: "나는 종종 기발한 아이디어를 떠올린다.", trait: "O", reverse: false },
  { id: 46, text: "나는 상상력이 풍부한 편은 아니다.", trait: "O", reverse: true },
  { id: 47, text: "나는 새로운 개념을 빠르게 이해하는 편이다.", trait: "O", reverse: false },
  { id: 48, text: "나는 평소 어려운 단어도 자연스럽게 사용한다.", trait: "O", reverse: false },
  { id: 49, text: "나는 어떤 일에 대해 깊이 생각하는 시간을 즐긴다.", trait: "O", reverse: false },
  { id: 50, text: "나는 늘 새로운 아이디어로 가득 차 있다.", trait: "O", reverse: false },
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
