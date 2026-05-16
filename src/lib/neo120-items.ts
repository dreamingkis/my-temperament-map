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
    "ko": "나는 사소한 일에도 걱정이 많다.",
    "en": "Worry about things",
    "trait": "N",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 2,
    "ko": "나는 친구를 쉽게 사귄다.",
    "en": "Make friends easily",
    "trait": "E",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 3,
    "ko": "나는 상상력이 풍부하다.",
    "en": "Have a vivid imagination",
    "trait": "O",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 4,
    "ko": "나는 사람들을 잘 믿는 편이다.",
    "en": "Trust others",
    "trait": "A",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 5,
    "ko": "나는 맡은 일을 끝까지 잘 해낸다.",
    "en": "Complete tasks successfully",
    "trait": "C",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 6,
    "ko": "나는 쉽게 화를 낸다.",
    "en": "Get angry easily",
    "trait": "N",
    "facet": 2,
    "keyed": 1
  },
  {
    "id": 7,
    "ko": "나는 사람이 많은 큰 모임을 좋아한다.",
    "en": "Love large parties",
    "trait": "E",
    "facet": 2,
    "keyed": 1
  },
  {
    "id": 8,
    "ko": "나는 예술이 중요하다고 생각한다.",
    "en": "Believe in the importance of art",
    "trait": "O",
    "facet": 2,
    "keyed": 1
  },
  {
    "id": 9,
    "ko": "나는 내 이익을 위해 다른 사람을 이용할 때가 있다.",
    "en": "Use others for my own ends",
    "trait": "A",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 10,
    "ko": "나는 주변을 깔끔하게 정리하는 것을 좋아한다.",
    "en": "Like to tidy up",
    "trait": "C",
    "facet": 2,
    "keyed": 1
  },
  {
    "id": 11,
    "ko": "나는 자주 우울한 기분을 느낀다.",
    "en": "Often feel blue",
    "trait": "N",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 12,
    "ko": "나는 모임에서 주도적으로 나서는 편이다.",
    "en": "Take charge",
    "trait": "E",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 13,
    "ko": "나는 감정을 강하고 깊게 느낀다.",
    "en": "Experience my emotions intensely",
    "trait": "O",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 14,
    "ko": "나는 남을 돕는 일이 즐겁다.",
    "en": "Love to help others",
    "trait": "A",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 15,
    "ko": "나는 약속을 잘 지킨다.",
    "en": "Keep my promises",
    "trait": "C",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 16,
    "ko": "나는 처음 보는 사람에게 다가가는 것이 어렵다.",
    "en": "Find it difficult to approach others",
    "trait": "N",
    "facet": 4,
    "keyed": 1
  },
  {
    "id": 17,
    "ko": "나는 늘 바쁘게 지낸다.",
    "en": "Am always busy",
    "trait": "E",
    "facet": 4,
    "keyed": 1
  },
  {
    "id": 18,
    "ko": "나는 반복되는 일보다 새로운 일을 더 좋아한다.",
    "en": "Prefer variety to routine",
    "trait": "O",
    "facet": 4,
    "keyed": 1
  },
  {
    "id": 19,
    "ko": "나는 토론이나 말다툼을 마다하지 않는다.",
    "en": "Love a good fight",
    "trait": "A",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 20,
    "ko": "나는 열심히 일한다.",
    "en": "Work hard",
    "trait": "C",
    "facet": 4,
    "keyed": 1
  },
  {
    "id": 21,
    "ko": "나는 가끔 폭식을 한다.",
    "en": "Go on binges",
    "trait": "N",
    "facet": 5,
    "keyed": 1
  },
  {
    "id": 22,
    "ko": "나는 짜릿한 자극을 즐긴다.",
    "en": "Love excitement",
    "trait": "E",
    "facet": 5,
    "keyed": 1
  },
  {
    "id": 23,
    "ko": "나는 어려운 글을 읽는 것을 좋아한다.",
    "en": "Love to read challenging material",
    "trait": "O",
    "facet": 5,
    "keyed": 1
  },
  {
    "id": 24,
    "ko": "나는 내가 다른 사람보다 낫다고 생각한다.",
    "en": "Believe that I am better than others",
    "trait": "A",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 25,
    "ko": "나는 늘 미리 준비해 둔다.",
    "en": "Am always prepared",
    "trait": "C",
    "facet": 5,
    "keyed": 1
  },
  {
    "id": 26,
    "ko": "나는 쉽게 당황하고 안절부절못한다.",
    "en": "Panic easily",
    "trait": "N",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 27,
    "ko": "나는 기쁘면 그 감정이 겉으로 드러난다.",
    "en": "Radiate joy",
    "trait": "E",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 28,
    "ko": "나는 진보적인 후보에게 표를 주는 편이다.",
    "en": "Tend to vote for liberal political candidates",
    "trait": "O",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 29,
    "ko": "나는 노숙인을 보면 안타까운 마음이 든다.",
    "en": "Sympathize with the homeless",
    "trait": "A",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 30,
    "ko": "나는 깊이 생각하지 않고 일에 뛰어들곤 한다.",
    "en": "Jump into things without thinking",
    "trait": "C",
    "facet": 6,
    "keyed": -1
  },
  {
    "id": 31,
    "ko": "나는 최악의 상황을 자주 떠올린다.",
    "en": "Fear for the worst",
    "trait": "N",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 32,
    "ko": "나는 사람들 사이에 있어도 마음이 편하다.",
    "en": "Feel comfortable around people",
    "trait": "E",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 33,
    "ko": "나는 자유로운 공상을 즐긴다.",
    "en": "Enjoy wild flights of fantasy",
    "trait": "O",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 34,
    "ko": "나는 사람들이 대체로 선한 의도를 갖고 있다고 믿는다.",
    "en": "Believe that others have good intentions",
    "trait": "A",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 35,
    "ko": "나는 내가 하는 일에서 두각을 나타낸다.",
    "en": "Excel in what I do",
    "trait": "C",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 36,
    "ko": "나는 사소한 일에도 쉽게 짜증이 난다.",
    "en": "Get irritated easily",
    "trait": "N",
    "facet": 2,
    "keyed": 1
  },
  {
    "id": 37,
    "ko": "나는 모임에서 여러 사람과 두루 이야기한다.",
    "en": "Talk to a lot of different people at parties",
    "trait": "E",
    "facet": 2,
    "keyed": 1
  },
  {
    "id": 38,
    "ko": "나는 남들이 지나치는 것에서 아름다움을 발견한다.",
    "en": "See beauty in things that others might not notice",
    "trait": "O",
    "facet": 2,
    "keyed": 1
  },
  {
    "id": 39,
    "ko": "나는 원하는 것을 얻기 위해 규칙을 어길 때가 있다.",
    "en": "Cheat to get ahead",
    "trait": "A",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 40,
    "ko": "나는 물건을 제자리에 두는 것을 자주 잊는다.",
    "en": "Often forget to put things back in their proper place",
    "trait": "C",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 41,
    "ko": "나는 내 자신이 마음에 들지 않을 때가 많다.",
    "en": "Dislike myself",
    "trait": "N",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 42,
    "ko": "나는 사람들을 이끌고 싶어 한다.",
    "en": "Try to lead others",
    "trait": "E",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 43,
    "ko": "나는 다른 사람의 감정을 잘 느낀다.",
    "en": "Feel others' emotions",
    "trait": "O",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 44,
    "ko": "나는 다른 사람의 일에 마음을 쓴다.",
    "en": "Am concerned about others",
    "trait": "A",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 45,
    "ko": "나는 늘 사실대로 말한다.",
    "en": "Tell the truth",
    "trait": "C",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 46,
    "ko": "나는 사람들의 시선을 받는 게 부담스럽다.",
    "en": "Am afraid to draw attention to myself",
    "trait": "N",
    "facet": 4,
    "keyed": 1
  },
  {
    "id": 47,
    "ko": "나는 가만히 있지 못하고 늘 움직인다.",
    "en": "Am always on the go",
    "trait": "E",
    "facet": 4,
    "keyed": 1
  },
  {
    "id": 48,
    "ko": "나는 익숙한 방식을 고수하는 편이다.",
    "en": "Prefer to stick with things that I know",
    "trait": "O",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 49,
    "ko": "나는 화가 나면 소리를 지르곤 한다.",
    "en": "Yell at people",
    "trait": "A",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 50,
    "ko": "나는 기대 이상으로 일을 해낸다.",
    "en": "Do more than what's expected of me",
    "trait": "C",
    "facet": 4,
    "keyed": 1
  },
  {
    "id": 51,
    "ko": "나는 무엇이든 지나치게 하지 않는다.",
    "en": "Rarely overindulge",
    "trait": "N",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 52,
    "ko": "나는 모험을 즐긴다.",
    "en": "Seek adventure",
    "trait": "E",
    "facet": 5,
    "keyed": 1
  },
  {
    "id": 53,
    "ko": "나는 철학적인 이야기는 피하는 편이다.",
    "en": "Avoid philosophical discussions",
    "trait": "O",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 54,
    "ko": "나는 내 자신을 높이 평가한다.",
    "en": "Think highly of myself",
    "trait": "A",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 55,
    "ko": "나는 세운 계획을 끝까지 실행한다.",
    "en": "Carry out my plans",
    "trait": "C",
    "facet": 5,
    "keyed": 1
  },
  {
    "id": 56,
    "ko": "나는 일이 많아지면 쉽게 압도된다.",
    "en": "Become overwhelmed by events",
    "trait": "N",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 57,
    "ko": "나는 즐거움이 많은 사람이다.",
    "en": "Have a lot of fun",
    "trait": "E",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 58,
    "ko": "나는 절대적인 옳고 그름은 없다고 생각한다.",
    "en": "Believe that there is no absolute right and wrong",
    "trait": "O",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 59,
    "ko": "나는 나보다 형편이 어려운 사람을 보면 마음이 쓰인다.",
    "en": "Feel sympathy for those who are worse off than myself",
    "trait": "A",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 60,
    "ko": "나는 충동적으로 결정을 내릴 때가 있다.",
    "en": "Make rash decisions",
    "trait": "C",
    "facet": 6,
    "keyed": -1
  },
  {
    "id": 61,
    "ko": "나는 두려워하는 것이 많다.",
    "en": "Am afraid of many things",
    "trait": "N",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 62,
    "ko": "나는 사람들과의 접촉을 피하려 한다.",
    "en": "Avoid contacts with others",
    "trait": "E",
    "facet": 1,
    "keyed": -1
  },
  {
    "id": 63,
    "ko": "나는 자주 몽상에 빠진다.",
    "en": "Love to daydream",
    "trait": "O",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 64,
    "ko": "나는 사람들이 하는 말을 그대로 믿는 편이다.",
    "en": "Trust what people say",
    "trait": "A",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 65,
    "ko": "나는 일을 매끄럽게 처리한다.",
    "en": "Handle tasks smoothly",
    "trait": "C",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 66,
    "ko": "나는 화가 나면 평정을 잃기 쉽다.",
    "en": "Lose my temper",
    "trait": "N",
    "facet": 2,
    "keyed": 1
  },
  {
    "id": 67,
    "ko": "나는 혼자 있는 시간이 더 편하다.",
    "en": "Prefer to be alone",
    "trait": "E",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 68,
    "ko": "나는 시(詩)에 큰 흥미가 없다.",
    "en": "Do not like poetry",
    "trait": "O",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 69,
    "ko": "나는 다른 사람을 이용할 때가 있다.",
    "en": "Take advantage of others",
    "trait": "A",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 70,
    "ko": "나는 내 방을 자주 어지른다.",
    "en": "Leave a mess in my room",
    "trait": "C",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 71,
    "ko": "나는 자주 기운이 빠지고 가라앉는다.",
    "en": "Am often down in the dumps",
    "trait": "N",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 72,
    "ko": "나는 상황을 주도하려 한다.",
    "en": "Take control of things",
    "trait": "E",
    "facet": 3,
    "keyed": 1
  },
  {
    "id": 73,
    "ko": "나는 내 감정의 변화를 잘 알아차리지 못한다.",
    "en": "Rarely notice my emotional reactions",
    "trait": "O",
    "facet": 3,
    "keyed": -1
  },
  {
    "id": 74,
    "ko": "나는 다른 사람의 감정에 무덤덤하다.",
    "en": "Am indifferent to the feelings of others",
    "trait": "A",
    "facet": 3,
    "keyed": -1
  },
  {
    "id": 75,
    "ko": "나는 규칙을 어길 때가 있다.",
    "en": "Break rules",
    "trait": "C",
    "facet": 3,
    "keyed": -1
  },
  {
    "id": 76,
    "ko": "나는 친한 사람들과 있을 때만 마음이 편하다.",
    "en": "Only feel comfortable with friends",
    "trait": "N",
    "facet": 4,
    "keyed": 1
  },
  {
    "id": 77,
    "ko": "나는 여가 시간에도 많은 일을 한다.",
    "en": "Do a lot in my spare time",
    "trait": "E",
    "facet": 4,
    "keyed": 1
  },
  {
    "id": 78,
    "ko": "나는 변화가 부담스럽다.",
    "en": "Dislike changes",
    "trait": "O",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 79,
    "ko": "나는 사람들에게 모진 말을 할 때가 있다.",
    "en": "Insult people",
    "trait": "A",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 80,
    "ko": "나는 딱 필요한 만큼만 일한다.",
    "en": "Do just enough work to get by",
    "trait": "C",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 81,
    "ko": "나는 유혹을 잘 이겨낸다.",
    "en": "Easily resist temptations",
    "trait": "N",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 82,
    "ko": "나는 무모하게 행동하는 것을 즐긴다.",
    "en": "Enjoy being reckless",
    "trait": "E",
    "facet": 5,
    "keyed": 1
  },
  {
    "id": 83,
    "ko": "나는 추상적인 개념을 이해하는 데 어려움을 느낀다.",
    "en": "Have difficulty understanding abstract ideas",
    "trait": "O",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 84,
    "ko": "나는 내 자신에 대해 좋은 평가를 내린다.",
    "en": "Have a high opinion of myself",
    "trait": "A",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 85,
    "ko": "나는 시간을 자주 허비한다.",
    "en": "Waste my time",
    "trait": "C",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 86,
    "ko": "나는 일에 휘둘려 어쩔 줄 모를 때가 있다.",
    "en": "Feel that I'm unable to deal with things",
    "trait": "N",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 87,
    "ko": "나는 살아 있다는 것이 좋다.",
    "en": "Love life",
    "trait": "E",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 88,
    "ko": "나는 보수적인 후보에게 표를 주는 편이다.",
    "en": "Tend to vote for conservative political candidates",
    "trait": "O",
    "facet": 6,
    "keyed": -1
  },
  {
    "id": 89,
    "ko": "나는 다른 사람의 문제에는 별 관심이 없다.",
    "en": "Am not interested in other people's problems",
    "trait": "A",
    "facet": 6,
    "keyed": -1
  },
  {
    "id": 90,
    "ko": "나는 일을 서둘러 시작한다.",
    "en": "Rush into things",
    "trait": "C",
    "facet": 6,
    "keyed": -1
  },
  {
    "id": 91,
    "ko": "나는 쉽게 스트레스를 받는다.",
    "en": "Get stressed out easily",
    "trait": "N",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 92,
    "ko": "나는 사람들과 거리를 두는 편이다.",
    "en": "Keep others at a distance",
    "trait": "E",
    "facet": 1,
    "keyed": -1
  },
  {
    "id": 93,
    "ko": "나는 깊은 생각에 잠기는 것을 좋아한다.",
    "en": "Like to get lost in thought",
    "trait": "O",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 94,
    "ko": "나는 사람들을 잘 믿지 않는다.",
    "en": "Distrust people",
    "trait": "A",
    "facet": 1,
    "keyed": -1
  },
  {
    "id": 95,
    "ko": "나는 일을 어떻게 풀어가야 할지 잘 안다.",
    "en": "Know how to get things done",
    "trait": "C",
    "facet": 1,
    "keyed": 1
  },
  {
    "id": 96,
    "ko": "나는 웬만해서는 짜증을 내지 않는다.",
    "en": "Am not easily annoyed",
    "trait": "N",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 97,
    "ko": "나는 사람이 붐비는 곳을 피한다.",
    "en": "Avoid crowds",
    "trait": "E",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 98,
    "ko": "나는 미술관에 가는 것을 별로 좋아하지 않는다.",
    "en": "Do not enjoy going to art museums",
    "trait": "O",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 99,
    "ko": "나는 다른 사람의 일을 방해할 때가 있다.",
    "en": "Obstruct others' plans",
    "trait": "A",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 100,
    "ko": "나는 내 물건을 여기저기 흘리고 다닌다.",
    "en": "Leave my belongings around",
    "trait": "C",
    "facet": 2,
    "keyed": -1
  },
  {
    "id": 101,
    "ko": "나는 내 자신과 함께 있는 시간이 편안하다.",
    "en": "Feel comfortable with myself",
    "trait": "N",
    "facet": 3,
    "keyed": -1
  },
  {
    "id": 102,
    "ko": "나는 다른 사람이 먼저 나서기를 기다린다.",
    "en": "Wait for others to lead the way",
    "trait": "E",
    "facet": 3,
    "keyed": -1
  },
  {
    "id": 103,
    "ko": "나는 감정적으로 행동하는 사람을 잘 이해하지 못한다.",
    "en": "Don't understand people who get emotional",
    "trait": "O",
    "facet": 3,
    "keyed": -1
  },
  {
    "id": 104,
    "ko": "나는 다른 사람에게 시간을 잘 내지 않는다.",
    "en": "Take no time for others",
    "trait": "A",
    "facet": 3,
    "keyed": -1
  },
  {
    "id": 105,
    "ko": "나는 약속을 어길 때가 있다.",
    "en": "Break my promises",
    "trait": "C",
    "facet": 3,
    "keyed": -1
  },
  {
    "id": 106,
    "ko": "나는 어색한 자리에서도 크게 개의치 않는다.",
    "en": "Am not bothered by difficult social situations",
    "trait": "N",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 107,
    "ko": "나는 편안하고 여유롭게 지내는 것을 좋아한다.",
    "en": "Like to take it easy",
    "trait": "E",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 108,
    "ko": "나는 전통적인 방식을 소중히 여긴다.",
    "en": "Am attached to conventional ways",
    "trait": "O",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 109,
    "ko": "나는 당한 일에 대해 되갚아 주려 한다.",
    "en": "Get back at others",
    "trait": "A",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 110,
    "ko": "나는 일에 시간과 노력을 별로 들이지 않는다.",
    "en": "Put little time and effort into my work",
    "trait": "C",
    "facet": 4,
    "keyed": -1
  },
  {
    "id": 111,
    "ko": "나는 내 욕구를 잘 절제한다.",
    "en": "Am able to control my cravings",
    "trait": "N",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 112,
    "ko": "나는 가끔 거칠고 엉뚱하게 행동한다.",
    "en": "Act wild and crazy",
    "trait": "E",
    "facet": 5,
    "keyed": 1
  },
  {
    "id": 113,
    "ko": "나는 이론적인 토론에는 흥미가 없다.",
    "en": "Am not interested in theoretical discussions",
    "trait": "O",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 114,
    "ko": "나는 내가 잘한 일을 자랑하곤 한다.",
    "en": "Boast about my virtues",
    "trait": "A",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 115,
    "ko": "나는 일을 시작하는 것이 어렵다.",
    "en": "Have difficulty starting tasks",
    "trait": "C",
    "facet": 5,
    "keyed": -1
  },
  {
    "id": 116,
    "ko": "나는 압박이 심해도 침착함을 유지한다.",
    "en": "Remain calm under pressure",
    "trait": "N",
    "facet": 6,
    "keyed": -1
  },
  {
    "id": 117,
    "ko": "나는 인생의 밝은 면을 보려 한다.",
    "en": "Look at the bright side of life",
    "trait": "E",
    "facet": 6,
    "keyed": 1
  },
  {
    "id": 118,
    "ko": "나는 범죄에는 엄격하게 대응해야 한다고 생각한다.",
    "en": "Believe that we should be tough on crime",
    "trait": "O",
    "facet": 6,
    "keyed": -1
  },
  {
    "id": 119,
    "ko": "나는 어려운 사람들을 떠올리는 것을 피한다.",
    "en": "Try not to think about the needy",
    "trait": "A",
    "facet": 6,
    "keyed": -1
  },
  {
    "id": 120,
    "ko": "나는 깊이 생각하지 않고 행동할 때가 있다.",
    "en": "Act without thinking",
    "trait": "C",
    "facet": 6,
    "keyed": -1
  }
];
