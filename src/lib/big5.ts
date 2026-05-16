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
export const QUESTIONS: Question[] = [
  // Openness
  { id: 1, text: "나는 새로운 아이디어를 떠올리는 것을 좋아한다.", trait: "O", reverse: false },
  { id: 2, text: "나는 예술이나 음악, 문학에 관심이 많다.", trait: "O", reverse: false },
  { id: 3, text: "나는 추상적인 개념에 대해 깊이 생각하는 것을 즐긴다.", trait: "O", reverse: false },
  { id: 4, text: "나는 익숙한 방식대로 하는 것을 선호한다.", trait: "O", reverse: true },
  { id: 5, text: "나는 상상력이 풍부한 편이다.", trait: "O", reverse: false },

  // Conscientiousness
  { id: 6, text: "나는 일을 계획적으로 처리한다.", trait: "C", reverse: false },
  { id: 7, text: "나는 약속과 마감일을 잘 지킨다.", trait: "C", reverse: false },
  { id: 8, text: "나는 물건을 정리정돈하는 것을 좋아한다.", trait: "C", reverse: false },
  { id: 9, text: "나는 일을 미루는 경향이 있다.", trait: "C", reverse: true },
  { id: 10, text: "나는 세부사항에 주의를 기울인다.", trait: "C", reverse: false },

  // Extraversion
  { id: 11, text: "나는 사람들과 어울리는 것을 좋아한다.", trait: "E", reverse: false },
  { id: 12, text: "나는 모임에서 대화를 주도하는 편이다.", trait: "E", reverse: false },
  { id: 13, text: "나는 활기차고 에너지가 넘친다.", trait: "E", reverse: false },
  { id: 14, text: "나는 혼자 있는 시간을 더 좋아한다.", trait: "E", reverse: true },
  { id: 15, text: "나는 새로운 사람을 만나는 것이 즐겁다.", trait: "E", reverse: false },

  // Agreeableness
  { id: 16, text: "나는 다른 사람의 감정에 공감을 잘한다.", trait: "A", reverse: false },
  { id: 17, text: "나는 타인을 돕는 것에서 기쁨을 느낀다.", trait: "A", reverse: false },
  { id: 18, text: "나는 사람들을 잘 믿는 편이다.", trait: "A", reverse: false },
  { id: 19, text: "나는 다른 사람과 자주 논쟁한다.", trait: "A", reverse: true },
  { id: 20, text: "나는 협력하는 것을 중요하게 생각한다.", trait: "A", reverse: false },

  // Neuroticism
  { id: 21, text: "나는 자주 걱정하는 편이다.", trait: "N", reverse: false },
  { id: 22, text: "나는 작은 일에도 쉽게 스트레스를 받는다.", trait: "N", reverse: false },
  { id: 23, text: "나는 기분이 자주 변한다.", trait: "N", reverse: false },
  { id: 24, text: "나는 어려운 상황에서도 침착함을 유지한다.", trait: "N", reverse: true },
  { id: 25, text: "나는 종종 우울하거나 불안함을 느낀다.", trait: "N", reverse: false },
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
