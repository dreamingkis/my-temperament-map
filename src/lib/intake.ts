import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import type { Trait } from "@/lib/big5";

export const AGE_RANGES = ["10대", "20대", "30대", "40대", "50대", "60대 이상"] as const;
export const GENDERS = ["여성", "남성", "기타/응답안함"] as const;

export const intakeSchema = z.object({
  nickname: z.string().trim().min(1, "닉네임을 입력해주세요").max(40),
  age_range: z.enum(AGE_RANGES),
  gender: z.enum(GENDERS),
  occupation: z.string().trim().min(1, "직업/역할을 입력해주세요").max(80),
  concern: z.string().trim().min(1, "한 줄 고민을 입력해주세요").max(300),
});

export type IntakeInput = z.infer<typeof intakeSchema>;

export type SubmitArgs = IntakeInput & {
  test_type: "basic" | "deep";
  scores: Record<Trait, number>;
  facet_scores?: Record<string, Record<number, number>>;
};

export async function submitIntake(args: SubmitArgs) {
  const { error } = await supabase.from("intake_responses").insert({
    test_type: args.test_type,
    nickname: args.nickname,
    age_range: args.age_range,
    gender: args.gender,
    occupation: args.occupation,
    concern: args.concern,
    scores: args.scores,
    facet_scores: args.facet_scores ?? null,
  });
  if (error) throw error;
}

const TRAIT_NAME: Record<Trait, string> = {
  O: "개방성", C: "성실성", E: "외향성", A: "친화성", N: "신경성",
};

function topTraits(scores: Record<Trait, number>) {
  const entries = (Object.keys(scores) as Trait[]).map((t) => ({ t, v: scores[t] }));
  const sorted = [...entries].sort((a, b) => b.v - a.v);
  return { top: sorted[0], second: sorted[1], bottom: sorted[sorted.length - 1] };
}

/** 직업/나이/고민을 결합해 점수를 해석하는 규칙 기반 인사이트 */
export function generatePersonalizedInsight(
  intake: IntakeInput,
  scores: Record<Trait, number>,
): { title: string; sections: { heading: string; body: string }[] } {
  const { top, second, bottom } = topTraits(scores);
  const ageHint = intake.age_range === "20대" || intake.age_range === "30대"
    ? "성격이 가장 활발히 다듬어지는 시기"
    : intake.age_range === "40대" || intake.age_range === "50대"
    ? "축적된 패턴이 강점으로 굳어지는 시기"
    : "고유한 결이 자연스럽게 드러나는 시기";

  const focus = `${TRAIT_NAME[top.t]}(${top.v})·${TRAIT_NAME[second.t]}(${second.v})`;

  const occupationLine = `‘${intake.occupation}’ 역할에서는 ${TRAIT_NAME[top.t]}이(가) 가장 자주 작동하는 엔진이 됩니다.`;

  const concernAdvice = (() => {
    const c = intake.concern;
    const map: Record<Trait, string> = {
      O: "고민의 해법을 한 가지로 정하기보다, 우선 ‘작은 실험 3개’를 설계해 보세요. 개방성이 높은 분은 가능성을 펼칠 때 가장 빠르게 움직입니다.",
      C: "고민을 ‘마감일·중간 점검·완료 기준’ 세 줄로 쪼개보세요. 성실성이 강점인 분은 구조화될 때 실행력이 폭발합니다.",
      E: "혼자 결정하기보다 대화 상대 2~3명에게 같은 질문을 던져 보세요. 외향성이 높은 분은 상호작용 속에서 답이 또렷해집니다.",
      A: "‘다른 사람에게 좋은 답’ 말고 ‘나에게도 공정한 답’ 한 줄을 먼저 쓰고 시작해 보세요. 친화성이 높을수록 자기 입장을 명확히 하는 연습이 도움이 됩니다.",
      N: "고민의 ‘사실’과 ‘감정’을 두 줄로 나눠 적어 보세요. 신경성이 높은 분은 감정을 정보로 분리해 다룰 때 가장 안정됩니다.",
    };
    return `“${c}”\n→ ${map[top.t]}`;
  })();

  const balanceLine = bottom.v < 35
    ? `반면 ${TRAIT_NAME[bottom.t]}(${bottom.v})은(는) 자연스럽게 적게 쓰는 영역입니다. 약점이 아니라 ‘에너지를 아끼는 곳’으로 보고, 필요할 때만 의식적으로 꺼내 쓰면 됩니다.`
    : `${TRAIT_NAME[bottom.t]}(${bottom.v})도 균형 있게 가지고 있어, 상황에 따라 다양한 모드를 전환할 수 있는 편입니다.`;

  return {
    title: `${intake.nickname}님을 위한 맞춤 해석`,
    sections: [
      {
        heading: "지금 가장 두드러진 두 축",
        body: `당신의 결과에서 가장 강한 신호는 ${focus}입니다. 이 둘이 함께 작동할 때 ${intake.nickname}님 특유의 일하는 결이 만들어집니다. ${intake.age_range}는 ${ageHint}이므로, 지금의 패턴을 강점으로 다듬기 좋은 시점입니다.`,
      },
      {
        heading: `‘${intake.occupation}’ 맥락에서`,
        body: `${occupationLine} ${TRAIT_NAME[second.t]}이(가) 받쳐주면서 디테일과 추진력의 균형을 잡아줍니다. ${balanceLine}`,
      },
      {
        heading: "당신의 고민에 대한 첫 단서",
        body: concernAdvice,
      },
      {
        heading: "이 해석을 어떻게 쓸까",
        body: "본 결과는 ‘오늘의 나’에 대한 스냅샷입니다. 비스타 팀이 응답을 검토해 더 깊은 맞춤 가이드가 가능한 경우 별도로 안내드릴 수 있습니다. 그 전까지는 위 세 가지 단서를 일주일 동안 한 번씩만 시도해보세요.",
      },
    ],
  };
}
