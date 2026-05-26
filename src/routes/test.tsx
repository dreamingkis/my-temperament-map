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
import { IntakeForm } from "@/components/IntakeForm";
import { PersonalizedInsight } from "@/components/PersonalizedInsight";
import { submitIntake, type IntakeInput } from "@/lib/intake";
import { toast as sonnerToast } from "sonner";

export const Route = createFileRoute("/test")({
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

type Stage = "intro" | "quiz" | "intake" | "result";

function Index() {
  const STORAGE_KEY = "big5-test-progress";

  const [stage, setStage] = useState<Stage>("intro");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [index, setIndex] = useState(0);
  const [sharedScores, setSharedScores] = useState<Record<Trait, number> | null>(null);
  const [expandedTrait, setExpandedTrait] = useState<Trait | null>(null);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [personalized, setPersonalized] = useState(false);
  const [intakeData, setIntakeData] = useState<IntakeInput | null>(null);
  const [submittingIntake, setSubmittingIntake] = useState(false);

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
        const traits: Trait[] = ["O", "C", "E", "A", "N"];
        const top = traits.reduce((a, b) => (decoded[b] > decoded[a] ? b : a));
        setExpandedTrait(top);
        setStage("result");
      }
    } else {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          if (data.answers && data.index != null && data.stage) {
            setAnswers(data.answers);
            setIndex(data.index);
            setStage(data.stage);
            setHasSavedProgress(data.stage === "quiz");
          }
        }
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (stage === "quiz") {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ answers, index, stage })
      );
    }
    if (stage === "result") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [answers, index, stage]);

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [current.id]: value };
    setAnswers(newAnswers);
    if (index < QUESTIONS.length - 1) {
      setIndex(index + 1);
    } else {
      const finalScores = computeScores(newAnswers);
      const traits: Trait[] = ["O", "C", "E", "A", "N"];
      const top = traits.reduce((a, b) => (finalScores[b] > finalScores[a] ? b : a));
      setExpandedTrait(top);
      setHasSavedProgress(false);
      setStage("result");
    }
  };

  const handleIntakeSubmit = async (data: IntakeInput) => {
    setSubmittingIntake(true);
    try {
      await submitIntake({ ...data, test_type: "basic", scores: computedScores });
      setIntakeData(data);
      setStage("result");
      sonnerToast.success("맞춤 해석을 준비했어요");
    } catch (e) {
      console.error(e);
      sonnerToast.error("저장 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmittingIntake(false);
    }
  };

  const handleIntakeSkip = () => {
    setIntakeData(null);
    setStage("result");
  };

  const reset = () => {
    setAnswers({});
    setIndex(0);
    setSharedScores(null);
    setHasSavedProgress(false);
    setIntakeData(null);
    setPersonalized(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
    setStage("intro");
  };

  const startQuiz = (withPersonalized: boolean) => {
    setPersonalized(withPersonalized);
    setStage("quiz");
  };



  const handleResume = () => {
    setHasSavedProgress(false);
    setStage("quiz");
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

            {hasSavedProgress ? (
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button size="lg" onClick={handleResume}>
                  이어서 진단하기 ({Math.round(progress)}% 완료)
                </Button>
                <Button size="lg" variant="outline" onClick={() => { reset(); setStage("quiz"); }}>
                  처음부터 다시 시작
                </Button>
              </div>
            ) : (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Card className="p-5 text-left">
                  <h3 className="text-base font-semibold">기본 진단만 받기</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    50문항을 풀고 5요인 점수와 일반 해석을 바로 봅니다. 정보 입력 없음.
                  </p>
                  <Button className="mt-4 w-full" variant="outline" onClick={() => startQuiz(false)}>
                    바로 시작
                  </Button>
                </Card>
                <Card className="border-primary/40 bg-primary/5 p-5 text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold">맞춤 해석까지 받기</h3>
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                      추천
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    진단 후 직업·연령·고민 한 줄을 입력하면, 당신의 점수를 그 맥락에서 해석해 드립니다.
                    응답은 비스타가 콘텐츠 개선과 후속 가이드에 활용합니다.
                  </p>
                  <Button className="mt-4 w-full" onClick={() => startQuiz(true)}>
                    맞춤 해석으로 시작
                  </Button>
                </Card>
              </div>
            )}
          </section>
        )}

        {stage === "intake" && (
          <section>
            <IntakeForm
              onSubmit={handleIntakeSubmit}
              onSkip={handleIntakeSkip}
              submitting={submittingIntake}
            />
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

            <Card className="p-7 sm:p-10">
              <h2 className="text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
                {current.text}
              </h2>
              <p className="mt-3 text-base italic text-muted-foreground sm:text-lg">
                I {current.en.charAt(0).toLowerCase() + current.en.slice(1)}
              </p>
              <div className="mt-10 flex flex-col gap-4">
                {SCALE_LABELS.map((label, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="h-auto justify-start py-4 text-left text-base"
                    onClick={() => handleAnswer(i + 1)}
                  >
                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-semibold">
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

            {intakeData && <PersonalizedInsight intake={intakeData} scores={scores} />}

            <Card className="mt-6 p-4">
              <div className="h-80 w-full sm:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={[
                      { subject: TRAIT_INFO.O.name, score: scores.O, trait: "O" as Trait },
                      { subject: TRAIT_INFO.C.name, score: scores.C, trait: "C" as Trait },
                      { subject: TRAIT_INFO.E.name, score: scores.E, trait: "E" as Trait },
                      { subject: TRAIT_INFO.A.name, score: scores.A, trait: "A" as Trait },
                      { subject: TRAIT_INFO.N.name, score: scores.N, trait: "N" as Trait },
                    ]}
                    margin={{ top: 24, right: 40, bottom: 24, left: 40 }}
                    outerRadius="75%"
                  >
                    <PolarGrid stroke="var(--border)" strokeOpacity={1} />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={(props: any) => {
                        const { payload, x, y, textAnchor } = props;
                        const traits: Trait[] = ["O", "C", "E", "A", "N"];
                        const entry = traits
                          .map((t) => ({ subject: TRAIT_INFO[t].name, trait: t }))
                          .find((d) => d.subject === payload.value);
                        const color = entry ? TRAIT_INFO[entry.trait].color : "var(--foreground)";
                        return (
                          <text x={x} y={y} textAnchor={textAnchor} fill={color} fontSize={14} fontWeight={600}>
                            {payload.value}
                          </text>
                        );
                      }}
                    />
                    <PolarRadiusAxis
                      domain={[0, 100]}
                      tickCount={6}
                      angle={90}
                      tick={{
                        fill: "var(--muted-foreground)",
                        fontSize: 10,
                        fontWeight: 500,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Radar
                      name="점수"
                      dataKey="score"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      fill="var(--primary)"
                      fillOpacity={0.2}
                      dot={(props: any) => {
                        const { cx, cy, index } = props;
                        const traits: Trait[] = ["O", "C", "E", "A", "N"];
                        const color = TRAIT_INFO[traits[index]].color;
                        return (
                          <g>
                            <circle cx={cx} cy={cy} r={6} fill={color} stroke="var(--background)" strokeWidth={2} />
                          </g>
                        );
                      }}
                      label={(props: any) => {
                        const { x, y, index, value, cx, cy } = props;
                        const traits: Trait[] = ["O", "C", "E", "A", "N"];
                        const color = TRAIT_INFO[traits[index]].color;
                        // push label outward from center
                        const dx = x - cx;
                        const dy = y - cy;
                        const len = Math.sqrt(dx * dx + dy * dy) || 1;
                        const offset = 18;
                        const lx = x + (dx / len) * offset;
                        const ly = y + (dy / len) * offset;
                        return (
                          <g>
                            <rect
                              x={lx - 16}
                              y={ly - 11}
                              width={32}
                              height={20}
                              rx={10}
                              fill={color}
                            />
                            <text
                              x={lx}
                              y={ly}
                              dy={4}
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize={11}
                              fontWeight={700}
                            >
                              {value}
                            </text>
                          </g>
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
                  <Card key={t} className="overflow-hidden p-0">
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
                        <div className="text-right">
                          <div className="text-3xl font-bold tabular-nums" style={{ color: info.color }}>{score}</div>
                          <div className="text-xs text-muted-foreground">{level}</div>
                        </div>
                      </div>
                      <Progress value={score} className="mt-3" indicatorClassName={`bg-trait-${t.toLowerCase()}`} />
                      <p className="mt-3 text-sm text-muted-foreground">
                        {isHigh ? info.high : info.low}
                      </p>
                      <div
                        className="mt-4 flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition-colors"
                        style={{
                          borderColor: info.color,
                          color: isOpen ? "#ffffff" : info.color,
                          backgroundColor: isOpen ? info.color : `color-mix(in oklab, ${info.color} 10%, transparent)`,
                        }}
                      >
                        {isOpen ? "접기" : "자세한 해석 보기"}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            isOpen && "rotate-180",
                          )}
                        />
                      </div>
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
