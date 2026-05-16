import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ChevronDown, Download, Link2, MessageCircle } from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  QUESTIONS,
  SCALE_LABELS,
  TRAIT_INFO,
  TRAIT_DETAIL,
  computeScores,
  scoreLevel,
  type Trait,
} from "@/lib/big5";
import { decodeScores, encodeScores, generateResultImage } from "@/lib/big5-share";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Big5 성격유형 진단 — 5가지 성격 점수 확인" },
      {
        name: "description",
        content:
          "공인된 IPIP-50 문항(Goldberg, 1992)으로 알아보는 Big5 성격유형 진단. 개방성, 성실성, 외향성, 친화성, 신경성을 점수로 확인하세요.",
      },
      { property: "og:title", content: "Big5 성격유형 진단" },
      {
        property: "og:description",
        content: "Big5 성격 5요인을 점수로 확인하는 무료 진단 테스트.",
      },
    ],
  }),
  component: Index,
});

type Stage = "intro" | "quiz" | "result";

function Index() {
  const [stage, setStage] = useState<Stage>("intro");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [index, setIndex] = useState(0);
  const [sharedScores, setSharedScores] = useState<Record<Trait, number> | null>(null);
  const [expandedTrait, setExpandedTrait] = useState<Trait | null>(null);

  const current = QUESTIONS[index];
  const progress = (index / QUESTIONS.length) * 100;
  const computedScores = useMemo(() => computeScores(answers), [answers]);
  const scores = sharedScores ?? computedScores;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const match = window.location.hash.match(/r=([^&]+)/);
    if (match) {
      const decoded = decodeScores(decodeURIComponent(match[1]));
      if (decoded) {
        setSharedScores(decoded);
        setStage("result");
      }
    }
  }, []);

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [current.id]: value };
    setAnswers(newAnswers);
    if (index < QUESTIONS.length - 1) {
      setIndex(index + 1);
    } else {
      setStage("result");
    }
  };

  const reset = () => {
    setAnswers({});
    setIndex(0);
    setSharedScores(null);
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    setStage("intro");
  };

  const handleCopyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#r=${encodeScores(scores)}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("결과 링크가 복사되었습니다");
    } catch {
      toast.error("링크 복사에 실패했습니다");
    }
  };

  const handleDownloadImage = async () => {
    const blob = await generateResultImage(scores);
    if (!blob) {
      toast.error("이미지 생성에 실패했습니다");
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "big5-result.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("결과 이미지를 저장했습니다");
  };

  const handleKakaoShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}#r=${encodeScores(scores)}`;
    const text = `Big5 성격유형 진단 결과를 확인해보세요!\n개방성 ${scores.O} · 성실성 ${scores.C} · 외향성 ${scores.E} · 친화성 ${scores.A} · 신경성 ${scores.N}`;

    // 모바일: Web Share API로 카카오톡 선택 가능
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Big5 성격유형 진단 결과", text, url });
        return;
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return;
      }
    }

    // 데스크탑 폴백: 링크 복사 + 카카오톡 웹 열기 안내
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      toast.success("결과 링크가 복사되었습니다", {
        description: "카카오톡 대화창에 붙여넣어 공유하세요",
      });
      window.open("https://web.kakao.com/", "_blank", "noopener,noreferrer");
    } catch {
      toast.error("공유에 실패했습니다");
    }
  };
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-20">
        {stage === "intro" && (
          <section className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Big Five Personality Test
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              나의 성격 5요인 진단
            </h1>
            <p className="mt-5 text-base text-muted-foreground sm:text-lg">
              국제 표준 IPIP-50 문항으로 개방성·성실성·외향성·친화성·신경성을 점수로 확인해 보세요.
              약 7분 정도 소요됩니다.
            </p>

            <Card className="mt-8 p-6 text-left sm:p-7">
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                <p>
                  이 체크는 나를 진단하거나 유형으로 고정하기 위한 검사가 아닙니다.
                  <br />
                  현재 내가 반복적으로 보이는 성향을 살펴보기 위한 자기이해 자료입니다.
                </p>
                <p>
                  답할 때는 미래에 되고 싶은 모습이 아니라,{" "}
                  <span className="font-medium text-foreground">최근 3~6개월 동안의 현재 모습</span>을 떠올려주세요.
                  <br />
                  친한 사람 앞의 나와 낯선 사람 앞의 나, 일할 때의 나와 일상 속의 나는 다를 수 있습니다.
                  그럴 때는 특정한 한 장면만 기준으로 삼기보다, 여러 상황을 통틀어 대체로 더 자주 반복되는 모습을 골라주세요.
                </p>
                <p>
                  만약 이 체크를 일과 브랜드 방향을 이해하기 위해 사용한다면,
                  일·학습·고객/동료와의 관계·콘텐츠를 만들거나 사람을 만나는 장면을 함께 떠올려도 좋습니다.
                </p>
                <p>
                  <span className="font-medium text-foreground">좋은 답이나 나쁜 답은 없습니다.</span>
                  <br />
                  점수는 나를 평가하는 결과가 아니라, 나를 더 잘 이해하기 위한 대화의 출발점입니다.
                </p>
              </div>
            </Card>

            <Button size="lg" className="mt-8" onClick={() => setStage("quiz")}>
              진단 시작하기
            </Button>
          </section>
        )}

        {stage === "quiz" && (
          <section>
            <div className="mb-6">
              <div className="mb-2 flex items-baseline justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold tabular-nums text-foreground">
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    / {QUESTIONS.length} 문항
                  </span>
                </div>
                <span className="text-sm font-semibold tabular-nums text-primary">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} />
            </div>

            <Card className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold sm:text-2xl">{current.text}</h2>
              <p className="mt-2 text-sm italic text-muted-foreground">I {current.en.charAt(0).toLowerCase() + current.en.slice(1)}</p>
              <div className="mt-6 flex flex-col gap-2">
                {SCALE_LABELS.map((label, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="h-auto justify-start py-3 text-left"
                    onClick={() => handleAnswer(i + 1)}
                  >
                    <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-semibold">
                      {i + 1}
                    </span>
                    {label}
                  </Button>
                ))}
              </div>
            </Card>

            {index > 0 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setIndex(index - 1)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  ← 이전 문항
                </button>
              </div>
            )}
          </section>
        )}

        {stage === "result" && (
          <section>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">진단 결과</h1>
            <p className="mt-2 text-muted-foreground">
              각 요인별 점수는 0~100점으로 표시됩니다.
            </p>

            <Card className="mt-6 p-4">
              <div className="h-72 w-full sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={[
                      { subject: TRAIT_INFO.O.name, score: scores.O, trait: "O" as Trait },
                      { subject: TRAIT_INFO.C.name, score: scores.C, trait: "C" as Trait },
                      { subject: TRAIT_INFO.E.name, score: scores.E, trait: "E" as Trait },
                      { subject: TRAIT_INFO.A.name, score: scores.A, trait: "A" as Trait },
                      { subject: TRAIT_INFO.N.name, score: scores.N, trait: "N" as Trait },
                    ]}
                    margin={{ top: 16, right: 16, bottom: 16, left: 16 }}
                  >
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={(props: any) => {
                        const { payload, x, y, textAnchor } = props;
                        const entry = [
                          { subject: TRAIT_INFO.O.name, trait: "O" as Trait },
                          { subject: TRAIT_INFO.C.name, trait: "C" as Trait },
                          { subject: TRAIT_INFO.E.name, trait: "E" as Trait },
                          { subject: TRAIT_INFO.A.name, trait: "A" as Trait },
                          { subject: TRAIT_INFO.N.name, trait: "N" as Trait },
                        ].find((d) => d.subject === payload.value);
                        const color = entry ? TRAIT_INFO[entry.trait].color : "hsl(var(--foreground))";
                        return (
                          <text x={x} y={y} textAnchor={textAnchor} fill={color} fontSize={13}>
                            {payload.value}
                          </text>
                        );
                      }}
                    />
                    <PolarRadiusAxis
                      domain={[0, 100]}
                      tickCount={6}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                      stroke="hsl(var(--border))"
                    />
                    <Radar
                      name="점수"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.25}
                      label={(props: any) => {
                        const { x, y, index, value } = props;
                        const traits: Trait[] = ["O", "C", "E", "A", "N"];
                        const color = TRAIT_INFO[traits[index]].color;
                        return (
                          <text x={x} y={y} fill={color} fontSize={12} textAnchor="middle" dy={-10}>
                            {value}
                          </text>
                        );
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="mt-6 space-y-4">
              {(Object.keys(TRAIT_INFO) as Trait[]).map((t) => {
                const info = TRAIT_INFO[t];
                const detail = TRAIT_DETAIL[t];
                const score = scores[t];
                const level = scoreLevel(score);
                const isOpen = expandedTrait === t;
                const isHigh = score >= 50;
                return (
                  <Card key={t} className="overflow-hidden border-l-4 p-0" style={{ borderLeftColor: info.color }}>
                    <button
                      type="button"
                      onClick={() => setExpandedTrait(isOpen ? null : t)}
                      aria-expanded={isOpen}
                      className="w-full p-5 text-left transition-colors hover:bg-muted/40"
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold" style={{ color: info.color }}>{info.name}</h3>
                          <p className="text-xs text-muted-foreground">{info.desc}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-3xl font-bold tabular-nums" style={{ color: info.color }}>{score}</div>
                            <div className="text-xs text-muted-foreground">{level}</div>
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 text-muted-foreground transition-transform",
                              isOpen && "rotate-180",
                            )}
                          />
                        </div>
                      </div>
                      <Progress value={score} className="mt-3" indicatorClassName={`bg-trait-${t.toLowerCase()}`} />
                      <p className="mt-3 text-sm text-muted-foreground">
                        {isHigh ? info.high : info.low}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {isOpen ? "접기" : "자세히 보기 ↓"}
                      </p>
                    </button>

                    {isOpen && (
                      <div className="border-t border-border px-5 pb-5 pt-4">
                        <h4 className="text-sm font-semibold text-foreground">이 요인이 의미하는 것</h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {detail.meaning}
                        </p>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <div
                            className={cn(
                              "rounded-md border p-3",
                              isHigh ? "border-current/40" : "border-border",
                            )}
                            style={isHigh ? { borderColor: info.color, color: info.color } : undefined}
                          >
                            <div className="text-xs font-semibold uppercase tracking-wide">
                              높은 점수의 특징
                            </div>
                            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                              {detail.highTraits.map((s, i) => (
                                <li key={i}>· {s}</li>
                              ))}
                            </ul>
                          </div>
                          <div
                            className={cn(
                              "rounded-md border p-3",
                              !isHigh ? "border-current/40" : "border-border",
                            )}
                            style={!isHigh ? { borderColor: info.color, color: info.color } : undefined}
                          >
                            <div className="text-xs font-semibold uppercase tracking-wide">
                              낮은 점수의 특징
                            </div>
                            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                              {detail.lowTraits.map((s, i) => (
                                <li key={i}>· {s}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <h4 className="mt-5 text-sm font-semibold text-foreground">자기이해에 활용하는 팁</h4>
                        <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
                          {detail.tips.map((s, i) => (
                            <li key={i} className="flex gap-2">
                              <span style={{ color: info.color }}>●</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>

            <Card className="mt-8 p-6 sm:p-7">
              <h2 className="text-lg font-semibold sm:text-xl">점수를 어떻게 이해하면 좋을까요</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                <p>
                  Big Five는 성격을 다섯 개의 <span className="font-medium text-foreground">연속적인 차원</span>으로 보는 모델입니다.
                  점수는 한 사람을 특정 유형으로 분류하는 라벨이 아니라, 각 성향이 나에게 얼마나 자주·강하게 나타나는지를 보여주는 상대적인 위치입니다.
                  높다고 좋고 낮다고 나쁜 점수는 없으며, 각 위치마다 잘 어울리는 환경과 강점이 다릅니다.
                </p>
                <p>
                  성격 특질은 비교적 안정적이지만 고정된 것은 아닙니다. 연구에 따르면 성인기 동안에도 환경, 역할, 인생 경험에 따라
                  <span className="font-medium text-foreground"> 점진적으로 변화</span>합니다(Roberts &amp; Mroczek, 2008).
                  오늘의 점수는 ‘지금의 나’를 비추는 스냅샷에 가깝습니다.
                </p>
                <p>
                  또한 성격은 상황에 따라 다르게 표현됩니다(person-situation interaction).
                  같은 외향성 점수여도 친한 사람 앞과 회의실에서의 모습은 다를 수 있어요.
                  점수보다 <span className="font-medium text-foreground">어떤 상황에서 그 성향이 강하게 드러나는지</span>를 함께 살펴보면 더 유용합니다.
                </p>
              </div>

              <h3 className="mt-6 text-base font-semibold text-foreground">자기이해에 활용하는 방법</h3>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                <li>
                  <span className="font-medium text-foreground">강점으로 다시 읽기.</span>{" "}
                  각 요인의 점수는 잘 맞는 환경과 일하는 방식의 단서입니다. 예: 성실성이 높다면 구조화된 계획이, 개방성이 높다면 새로운 자극이 동력이 됩니다.
                </li>
                <li>
                  <span className="font-medium text-foreground">대비되는 두 요인을 함께 보기.</span>{" "}
                  외향성 × 친화성, 성실성 × 개방성처럼 조합으로 볼 때 협업 스타일과 의사결정 패턴이 더 분명히 보입니다.
                </li>
                <li>
                  <span className="font-medium text-foreground">신경성은 ‘민감도’로 읽기.</span>{" "}
                  점수가 높다면 약점이 아니라 스트레스 신호를 빠르게 감지하는 신호 시스템이라고 보고, 회복 루틴을 함께 설계해보세요.
                </li>
                <li>
                  <span className="font-medium text-foreground">시간을 두고 다시 측정해 보기.</span>{" "}
                  6개월~1년 뒤 다시 해보면, 환경 변화에 따라 어떤 차원이 어떻게 움직였는지 관찰할 수 있습니다.
                </li>
                <li>
                  <span className="font-medium text-foreground">결과를 대화의 출발점으로.</span>{" "}
                  가까운 사람과 점수에 대해 이야기 나누면, 내가 인식하는 나와 타인이 보는 나 사이의 간극을 확인할 수 있습니다.
                </li>
              </ul>

              <p className="mt-5 text-xs text-muted-foreground">
                ※ 본 결과는 IPIP-50(Goldberg, 1992) 문항을 기반으로 한 자기이해용 자료이며, 임상적 진단이나 인사 의사결정의 근거가 아닙니다.
              </p>
            </Card>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                onClick={handleKakaoShare}
                className="bg-[#FEE500] text-[#191600] hover:bg-[#FEE500]/90"
              >
                <MessageCircle className="mr-2 h-4 w-4" /> 카카오톡으로 공유
              </Button>
              <Button onClick={handleCopyLink} variant="default">
                <Link2 className="mr-2 h-4 w-4" /> 결과 링크 복사
              </Button>
              <Button onClick={handleDownloadImage} variant="secondary">
                <Download className="mr-2 h-4 w-4" /> 이미지로 저장
              </Button>
              <Button onClick={reset} variant="outline">
                다시 진단하기
              </Button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
