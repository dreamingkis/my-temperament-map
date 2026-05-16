// IPIP-NEO-120 items (Johnson 2014). Items are public domain via IPIP (ipip.ori.org).
// Translations & item ordering adapted from Alheimsins/b5-johnson-120-ipip-neo-pi-r (MIT).

export type NeoTrait = 'O' | 'C' | 'E' | 'A' | 'N';
export type NeoItem = { id: number; ko: string; en: string; trait: NeoTrait; facet: number; keyed: 1 | -1 };

export const NEO_FACETS: Record<NeoTrait, Record<number, { en: string; ko: string }>> = {
  "N": {
    "1": {
      "en": "Anxiety",
      "ko": "불안"
    },
    "2": {
      "en": "Anger",
      "ko": "분노"
    },
    "3": {
      "en": "Depression",
      "ko": "우울"
    },
    "4": {
      "en": "Self-Consciousness",
      "ko": "자의식"
    },
    "5": {
      "en": "Immoderation",
      "ko": "자기절제 부족"
    },
    "6": {
      "en": "Vulnerability",
      "ko": "상처받기 쉬움"
    }
  },
  "E": {
    "1": {
      "en": "Friendliness",
      "ko": "친근함"
    },
    "2": {
      "en": "Gregariousness",
      "ko": "사교성"
    },
    "3": {
      "en": "Assertiveness",
      "ko": "자기주장"
    },
    "4": {
      "en": "Activity Level",
      "ko": "활동성"
    },
    "5": {
      "en": "Excitement-Seeking",
      "ko": "자극 추구"
    },
    "6": {
      "en": "Cheerfulness",
      "ko": "쾌활함"
    }
  },
  "O": {
    "1": {
      "en": "Imagination",
      "ko": "상상력"
    },
    "2": {
      "en": "Artistic Interests",
      "ko": "예술적 관심"
    },
    "3": {
      "en": "Emotionality",
      "ko": "정서 민감성"
    },
    "4": {
      "en": "Adventurousness",
      "ko": "모험심"
    },
    "5": {
      "en": "Intellect",
      "ko": "지적 호기심"
    },
    "6": {
      "en": "Liberalism",
      "ko": "진보적 사고"
    }
  },
  "A": {
    "1": {
      "en": "Trust",
      "ko": "신뢰"
    },
    "2": {
      "en": "Morality",
      "ko": "도덕성"
    },
    "3": {
      "en": "Altruism",
      "ko": "이타심"
    },
    "4": {
      "en": "Cooperation",
      "ko": "협동"
    },
    "5": {
      "en": "Modesty",
      "ko": "겸손"
    },
    "6": {
      "en": "Sympathy",
      "ko": "공감"
    }
  },
  "C": {
    "1": {
      "en": "Self-Efficacy",
      "ko": "자기효능감"
    },
    "2": {
      "en": "Orderliness",
      "ko": "정돈성"
    },
    "3": {
      "en": "Dutifulness",
      "ko": "책임감"
    },
    "4": {
      "en": "Achievement-Striving",
      "ko": "성취 추구"
    },
    "5": {
      "en": "Self-Discipline",
      "ko": "자기훈련"
    },
    "6": {
      "en": "Cautiousness",
      "ko": "신중성"
    }
  }
};

export const NEO_QUESTIONS: NeoItem[] = [
  {
    "id": 1,
    "ko": "나는 걱정이 많은 편이다.",
    "en": "Worry about things",
    "trait": "N",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 2,
    "ko": "나는 쉽게 친구를 사귀는 편이다.",
    "en": "Make friends easily",
    "trait": "E",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 3,
    "ko": "나는 상상력이 풍부한 편이다.",
    "en": "Have a vivid imagination",
    "trait": "O",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 4,
    "ko": "나는 다른 사람들을 신뢰하는 편이다.",
    "en": "Trust others",
    "trait": "A",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 5,
    "ko": "나는 일을 제대로 끝 마치는 편이다.",
    "en": "Complete tasks successfully",
    "trait": "C",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 6,
    "ko": "나는 쉽게 화를 내는 편이다.",
    "en": "Get angry easily",
    "trait": "N",
    "facet": 2,
    "keyed": 1
  },
  {
    "id": 7,
    "ko": "나는 다른 사람들이 많은 파티를 좋아하는 편이다.",
    "en": "Love large parties",
    "trait": "E",
    "facet": 2,
    "keyed": 1
  },
  {
    "id": 8,
    "ko": "나는 예술이 중요하다고 믿는 편이다.",
    "en": "Believe in the importance of art",
    "trait": "O",
    "facet": 2,
    "keyed": 1
  },
  {
    "id": 9,
    "ko": "나는 내 목적을 위해 다른 사람들을 이용하는 편이다.",
    "en": "Use others for my own ends",
    "trait": "A",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 10,
    "ko": "나는 정리하는 것을 좋아하는 편이다.",
    "en": "Like to tidy up",
    "trait": "C",
    "facet": 2,
    "keyed": 1
  },
  {
    "id": 11,
    "ko": "나는 종종 우울함을 느끼는 편이다.",
    "en": "Often feel blue",
    "trait": "N",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 12,
    "ko": "나는 리더로서 자질을 가졌다고 생각하는 편이다.",
    "en": "Take charge",
    "trait": "E",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 13,
    "ko": "나는 종종 감정에 지배당하는 편이다.",
    "en": "Experience my emotions intensely",
    "trait": "O",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 14,
    "ko": "나는 남을 돕는 것을 좋아하는 편이다.",
    "en": "Love to help others",
    "trait": "A",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 15,
    "ko": "나는 약속을 잘 지키는 편이다.",
    "en": "Keep my promises",
    "trait": "C",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 16,
    "ko": "나는 다른 사람에게 다가가는 것을 어려워하는 편이다.",
    "en": "Find it difficult to approach others",
    "trait": "N",
    "facet": 4,
    "keyed": 1
  },
  {
    "id": 17,
    "ko": "나는 항상 바쁜 편이다.",
    "en": "Am always busy",
    "trait": "E",
    "facet": 4,
    "keyed": 1
  },
  {
    "id": 18,
    "ko": "나는 틀에 박히지 않은 것을 좋아하는 편이다.",
    "en": "Prefer variety to routine",
    "trait": "O",
    "facet": 4,
    "keyed": 1
  },
  {
    "id": 19,
    "ko": "나는 건강한 논쟁을 즐기는 편이다.",
    "en": "Love a good fight",
    "trait": "A",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 20,
    "ko": "나는 열심히 일하는 편이다.",
    "en": "Work hard",
    "trait": "C",
    "facet": 4,
    "keyed": 1
  },
  {
    "id": 21,
    "ko": "나는 폭식을 하는 편이다.",
    "en": "Go on binges",
    "trait": "N",
    "facet": 5,
    "keyed": 1
  },
  {
    "id": 22,
    "ko": "나는 신나는 걸 좋아하는 편이다.",
    "en": "Love excitement",
    "trait": "E",
    "facet": 5,
    "keyed": 1
  },
  {
    "id": 23,
    "ko": "나는 도전적인 자료를 읽는 것을 좋아하는 편이다.",
    "en": "Love to read challenging material",
    "trait": "O",
    "facet": 5,
    "keyed": 1
  },
  {
    "id": 24,
    "ko": "나는 내가 다른 사람보다 낫다고 믿는 편이다.",
    "en": "Believe that I am better than others",
    "trait": "A",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 25,
    "ko": "나는 항상 준비되어있는 편이다.",
    "en": "Am always prepared",
    "trait": "C",
    "facet": 5,
    "keyed": 1
  },
  {
    "id": 26,
    "ko": "나는 공황 상태에 쉽게 빠지는 편이다.",
    "en": "Panic easily",
    "trait": "N",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 27,
    "ko": "나는 기쁠 때, 티내는 편이다.",
    "en": "Radiate joy",
    "trait": "E",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 28,
    "ko": "나는 진보적인 정치가에게 투표하는 경향이 있는 편이다.",
    "en": "Tend to vote for liberal political candidates",
    "trait": "O",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 29,
    "ko": "나는 노숙자들에게 동정을 느끼는 편이다.",
    "en": "Sympathize with the homeless",
    "trait": "A",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 30,
    "ko": "나는 앞뒤 생각 없이 뛰어드는 경향이 있는 편이다.",
    "en": "Jump into things without thinking",
    "trait": "C",
    "facet": 6,
    "keyed": -1
  },
  {
    "id": 31,
    "ko": "나는 안 좋은 일에 대해 두려워하는 편이다.",
    "en": "Fear for the worst",
    "trait": "N",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 32,
    "ko": "나는 다른 사람들 주변에 있을 때, 편안함을 느끼는 편이다.",
    "en": "Feel comfortable around people",
    "trait": "E",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 33,
    "ko": "나는 공상의 나래를 즐기는 편이다.",
    "en": "Enjoy wild flights of fantasy",
    "trait": "O",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 34,
    "ko": "나는 다른 사람들이 좋은 의도를 가지고 있다고 믿는 편이다.",
    "en": "Believe that others have good intentions",
    "trait": "A",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 35,
    "ko": "나는 내가 하는 일에 대해 남들보다 뛰어난 편이다.",
    "en": "Excel in what I do",
    "trait": "C",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 36,
    "ko": "나는 쉽게 짜증을 내는 편이다.",
    "en": "Get irritated easily",
    "trait": "N",
    "facet": 2,
    "keyed": 1
  },
  {
    "id": 37,
    "ko": "나는 파티에서 많은 다른 사람들과 이야기를 하는 편이다.",
    "en": "Talk to a lot of different people at parties",
    "trait": "E",
    "facet": 2,
    "keyed": 1
  },
  {
    "id": 38,
    "ko": "나는 다른 사람들이 알아차리지 못하는 것에서 아름다움을 보는 편이다.",
    "en": "See beauty in things that others might not notice",
    "trait": "O",
    "facet": 2,
    "keyed": 1
  },
  {
    "id": 39,
    "ko": "나는 원하는 것을 얻기 위해 부정 행위를 하는 편이다.",
    "en": "Cheat to get ahead",
    "trait": "A",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 40,
    "ko": "나는 물건을 제자리에 놓는 것을 종종 잊어버리는 편이다.",
    "en": "Often forget to put things back in their proper place",
    "trait": "C",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 41,
    "ko": "나는 내 자신을 싫어하는 편이다.",
    "en": "Dislike myself",
    "trait": "N",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 42,
    "ko": "나는 다른 사람들을 이끄려고 노력하는 편이다.",
    "en": "Try to lead others",
    "trait": "E",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 43,
    "ko": "나는 다른 사람들의 감정에 공감하는 편이다.",
    "en": "Feel others' emotions",
    "trait": "O",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 44,
    "ko": "나는 다른 사람들을 걱정하는 편이다.",
    "en": "Am concerned about others",
    "trait": "A",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 45,
    "ko": "나는 진실대로 말하는 편이다.",
    "en": "Tell the truth",
    "trait": "C",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 46,
    "ko": "나는 나에 대해 관심을 가지는 것을 두려워하는 편이다.",
    "en": "Am afraid to draw attention to myself",
    "trait": "N",
    "facet": 4,
    "keyed": 1
  },
  {
    "id": 47,
    "ko": "나는 언제나 바쁘게 움직이는 편이다.",
    "en": "Am always on the go",
    "trait": "E",
    "facet": 4,
    "keyed": 1
  },
  {
    "id": 48,
    "ko": "나는 내가 아는 것에 생각하는 것을 선호하는 편이다.",
    "en": "Prefer to stick with things that I know",
    "trait": "O",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 49,
    "ko": "나는 다른 사람들에게 호통치는 편이다.",
    "en": "Yell at people",
    "trait": "A",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 50,
    "ko": "나는 내게 기대했던 것 보다 더 많은 일을 하는 편이다.",
    "en": "Do more than what's expected of me",
    "trait": "C",
    "facet": 4,
    "keyed": 1
  },
  {
    "id": 51,
    "ko": "나는 과식을 하지 않는 편이다.",
    "en": "Rarely overindulge",
    "trait": "N",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 52,
    "ko": "나는 무언가 색다른 일을 찾아 다니는 편이다.",
    "en": "Seek adventure",
    "trait": "E",
    "facet": 5,
    "keyed": 1
  },
  {
    "id": 53,
    "ko": "나는 철학적인 논쟁을 피하는 편이다.",
    "en": "Avoid philosophical discussions",
    "trait": "O",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 54,
    "ko": "나는 내 자신을 높게 평가하는 편이다.",
    "en": "Think highly of myself",
    "trait": "A",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 55,
    "ko": "나는 내 계획들을 잘 실행하는 편이다.",
    "en": "Carry out my plans",
    "trait": "C",
    "facet": 5,
    "keyed": 1
  },
  {
    "id": 56,
    "ko": "나는 어떤 일 때문에 어쩔 줄 모르게 되는 편이다.",
    "en": "Become overwhelmed by events",
    "trait": "N",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 57,
    "ko": "나는 재미있는 사람인 편이다.",
    "en": "Have a lot of fun",
    "trait": "E",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 58,
    "ko": "나는 절대적으로 옮고 그름은 없다고 믿는 편이다.",
    "en": "Believe that there is no absolute right and wrong",
    "trait": "O",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 59,
    "ko": "나는 나보다 가난한 사람에게 동정을 느끼는 편이다.",
    "en": "Feel sympathy for those who are worse off than myself",
    "trait": "A",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 60,
    "ko": "나는 성급하게 결정을 내리는 편이다.",
    "en": "Make rash decisions",
    "trait": "C",
    "facet": 6,
    "keyed": -1
  },
  {
    "id": 61,
    "ko": "나는 많은 것들을 두려워하는 편이다.",
    "en": "Am afraid of many things",
    "trait": "N",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 62,
    "ko": "나는 다른 사람들과 접촉을 피하는 편이다.",
    "en": "Avoid contacts with others",
    "trait": "E",
    "facet": 1,
    "keyed": -1
  },
  {
    "id": 63,
    "ko": "나는 몽상을 좋아하는 편이다.",
    "en": "Love to daydream",
    "trait": "O",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 64,
    "ko": "나는 다른 사람들이 말하는 것을 믿는 편이다.",
    "en": "Trust what people say",
    "trait": "A",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 65,
    "ko": "나는 일을 매끄럽게 처리하는 편이다.",
    "en": "Handle tasks smoothly",
    "trait": "C",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 66,
    "ko": "나는 화가날 때 평정을 유지하기 어려운 편이다.",
    "en": "Lose my temper",
    "trait": "N",
    "facet": 2,
    "keyed": 1
  },
  {
    "id": 67,
    "ko": "나는 혼자 있는게 더 좋은 편이다.",
    "en": "Prefer to be alone",
    "trait": "E",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 68,
    "ko": "나는 시를 좋아하지 않는 편이다.",
    "en": "Do not like poetry",
    "trait": "O",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 69,
    "ko": "나는 다른 사람들을 이용하는 편이다.",
    "en": "Take advantage of others",
    "trait": "A",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 70,
    "ko": "나는 내 방을 어지르는 편이다.",
    "en": "Leave a mess in my room",
    "trait": "C",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 71,
    "ko": "나는 자주 의기소침하는 편이다.",
    "en": "Am often down in the dumps",
    "trait": "N",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 72,
    "ko": "나는 일을 내가 원하는대로 추진하려고 하는 편이다.",
    "en": "Take control of things",
    "trait": "E",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 73,
    "ko": "나는 내 감정에 대해 둔한 편이다.",
    "en": "Rarely notice my emotional reactions",
    "trait": "O",
    "facet": 3,
    "keyed": -1
  },
  {
    "id": 74,
    "ko": "나는 다른 사람들의 감정에 대해 무관심한 편이다.",
    "en": "Am indifferent to the feelings of others",
    "trait": "A",
    "facet": 3,
    "keyed": -1
  },
  {
    "id": 75,
    "ko": "나는 규칙을 어기는 편이다.",
    "en": "Break rules",
    "trait": "C",
    "facet": 3,
    "keyed": -1
  },
  {
    "id": 76,
    "ko": "나는 친구들과 함께 있을 때 편안함을 느끼는 편이다.",
    "en": "Only feel comfortable with friends",
    "trait": "N",
    "facet": 4,
    "keyed": 1
  },
  {
    "id": 77,
    "ko": "나는 여가 시간에 많은 것을 하는 편이다.",
    "en": "Do a lot in my spare time",
    "trait": "E",
    "facet": 4,
    "keyed": 1
  },
  {
    "id": 78,
    "ko": "나는 변화가 싫은 편이다.",
    "en": "Dislike changes",
    "trait": "O",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 79,
    "ko": "나는 다른 사람들을 욕하는 편이다.",
    "en": "Insult people",
    "trait": "A",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 80,
    "ko": "나는 그럭 저럭 살아갈 만큼 일하는 편이다.",
    "en": "Do just enough work to get by",
    "trait": "C",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 81,
    "ko": "나는 유혹에 잘 빠져들지 않는 편이다.",
    "en": "Easily resist temptations",
    "trait": "N",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 82,
    "ko": "나는 앞 뒤 재지 않고 행동하는 편이다.",
    "en": "Enjoy being reckless",
    "trait": "E",
    "facet": 5,
    "keyed": 1
  },
  {
    "id": 83,
    "ko": "나는 추상적인 개념을 이해하는 것이 어려운 편이다.",
    "en": "Have difficulty understanding abstract ideas",
    "trait": "O",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 84,
    "ko": "나는 나 자신이 괜찮은 사람이라 생각하는 편이다.",
    "en": "Have a high opinion of myself",
    "trait": "A",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 85,
    "ko": "나는 내 시간을 낭비하는 편이다.",
    "en": "Waste my time",
    "trait": "C",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 86,
    "ko": "나는 내가 일을 감당할 수 없다고 느끼는 편이다.",
    "en": "Feel that I'm unable to deal with things",
    "trait": "N",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 87,
    "ko": "나는 살아있는게 좋은 편이다.",
    "en": "Love life",
    "trait": "E",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 88,
    "ko": "나는 보수적인 정치인에게 투표하는 경향이 있는 편이다.",
    "en": "Tend to vote for conservative political candidates",
    "trait": "O",
    "facet": 6,
    "keyed": -1
  },
  {
    "id": 89,
    "ko": "나는 남들의 문제에 관심이 없는 편이다.",
    "en": "Am not interested in other people's problems",
    "trait": "A",
    "facet": 6,
    "keyed": -1
  },
  {
    "id": 90,
    "ko": "나는 서둘러 일을 처리하는 편이다.",
    "en": "Rush into things",
    "trait": "C",
    "facet": 6,
    "keyed": -1
  },
  {
    "id": 91,
    "ko": "나는 쉽게 스트레스를 받는 편이다.",
    "en": "Get stressed out easily",
    "trait": "N",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 92,
    "ko": "나는 남과 거리를 두는 편이다.",
    "en": "Keep others at a distance",
    "trait": "E",
    "facet": 1,
    "keyed": -1
  },
  {
    "id": 93,
    "ko": "나는 사색에 잠기는 것을 즐기는 편이다.",
    "en": "Like to get lost in thought",
    "trait": "O",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 94,
    "ko": "나는 다른 사람들을 잘 믿지 않는 편이다.",
    "en": "Distrust people",
    "trait": "A",
    "facet": 1,
    "keyed": -1
  },
  {
    "id": 95,
    "ko": "나는 일을 어떻게 해나가야하는지 잘 아는 편이다.",
    "en": "Know how to get things done",
    "trait": "C",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 96,
    "ko": "나는 쉽게 짜증 내지 않는 편이다.",
    "en": "Am not easily annoyed",
    "trait": "N",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 97,
    "ko": "나는 다른 사람들이 많은 곳을 피하는 편이다.",
    "en": "Avoid crowds",
    "trait": "E",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 98,
    "ko": "나는 미술관에 가는 것을 좋아하지 않는 편이다.",
    "en": "Do not enjoy going to art museums",
    "trait": "O",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 99,
    "ko": "나는 다른 사람들의 계획을 방해하는 편이다.",
    "en": "Obstruct others' plans",
    "trait": "A",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 100,
    "ko": "나는 내 물건을 잘 잃어버리는 편이다.",
    "en": "Leave my belongings around",
    "trait": "C",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 101,
    "ko": "나는 내 자신에 대해 편안함을 느끼는 편이다.",
    "en": "Feel comfortable with myself",
    "trait": "N",
    "facet": 3,
    "keyed": -1
  },
  {
    "id": 102,
    "ko": "나는 남들이 앞서길 기다리는 편이다.",
    "en": "Wait for others to lead the way",
    "trait": "E",
    "facet": 3,
    "keyed": -1
  },
  {
    "id": 103,
    "ko": "나는 감정적인 사람들이 이해 못 하는 편이다.",
    "en": "Don't understand people who get emotional",
    "trait": "O",
    "facet": 3,
    "keyed": -1
  },
  {
    "id": 104,
    "ko": "나는 남을 위해 시간을 들이지 않는 편이다.",
    "en": "Take no time for others",
    "trait": "A",
    "facet": 3,
    "keyed": -1
  },
  {
    "id": 105,
    "ko": "나는 약속을 어기는 편이다.",
    "en": "Break my promises",
    "trait": "C",
    "facet": 3,
    "keyed": -1
  },
  {
    "id": 106,
    "ko": "나는 어려운 사회 상황에 개의치 않는 편이다.",
    "en": "Am not bothered by difficult social situations",
    "trait": "N",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 107,
    "ko": "나는 느긋하게 지내는 것을 좋아하는 편이다.",
    "en": "Like to take it easy",
    "trait": "E",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 108,
    "ko": "나는 전통적인 방식에 대해 애착을 가지고 있는 편이다.",
    "en": "Am attached to conventional ways",
    "trait": "O",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 109,
    "ko": "나는 당한 것에 대해 남들에게 (앙)갚는 편이다.",
    "en": "Get back at others",
    "trait": "A",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 110,
    "ko": "나는 내 일에 시간과 노력을 들이지 않는 편이다.",
    "en": "Put little time and effort into my work",
    "trait": "C",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 111,
    "ko": "나는 내 갈망을 조절 할 수 있는 편이다.",
    "en": "Am able to control my cravings",
    "trait": "N",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 112,
    "ko": "나는 미친 듯이 행동하는 편이다.",
    "en": "Act wild and crazy",
    "trait": "E",
    "facet": 5,
    "keyed": 1
  },
  {
    "id": 113,
    "ko": "나는 이론적인 토론에 대해 관심이 없는 편이다.",
    "en": "Am not interested in theoretical discussions",
    "trait": "O",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 114,
    "ko": "나는 내 선행에 대해 자랑하는 편이다.",
    "en": "Boast about my virtues",
    "trait": "A",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 115,
    "ko": "나는 작업을 시작하는데 어려움이 있는 편이다.",
    "en": "Have difficulty starting tasks",
    "trait": "C",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 116,
    "ko": "나는 중압감 속에서 침착함을 유지하는 편이다.",
    "en": "Remain calm under pressure",
    "trait": "N",
    "facet": 6,
    "keyed": -1
  },
  {
    "id": 117,
    "ko": "나는 인생을 긍정적으로 바라보는 편이다.",
    "en": "Look at the bright side of life",
    "trait": "E",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 118,
    "ko": "나는 우리가 범죄에 엄격해야한다고 믿는 편이다.",
    "en": "Believe that we should be tough on crime",
    "trait": "O",
    "facet": 6,
    "keyed": -1
  },
  {
    "id": 119,
    "ko": "나는 가난한 사람에 대해 별로 생각하고 싶지 않아하는 편이다.",
    "en": "Try not to think about the needy",
    "trait": "A",
    "facet": 6,
    "keyed": -1
  },
  {
    "id": 120,
    "ko": "나는 별 생각 없이 행동하는 편이다.",
    "en": "Act without thinking",
    "trait": "C",
    "facet": 6,
    "keyed": -1
  }
];
