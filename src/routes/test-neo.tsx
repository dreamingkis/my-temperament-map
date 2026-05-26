import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ChevronDown, Download, Link2 } from "lucide-react";
import { generateNeoResultImage } from "@/lib/neo120-share";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  NEO_QUESTIONS,
  NEO_FACETS,
  NEO_SCALE_LABELS,
  computeNeoScores,
  type NeoTrait,
} from "@/lib/neo120";
import { TRAIT_INFO } from "@/lib/big5";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { IntakeForm } from "@/components/IntakeForm";
import { PersonalizedInsight } from "@/components/PersonalizedInsight";
import { submitIntake, type IntakeInput } from "@/lib/intake";

export const Route = createFileRoute("/test-neo")({
  head: () => ({
    meta: [
      { title: "IPIP-NEO-120 심층 성격 진단 — 30가지 하위 facet" },
      {
        name: "description",
        content:
          "Big5 5요인을 30개 하위 facet으로 세분화한 IPIP-NEO-120 무료 진단. Johnson(2014) 공개 도구 기반.",
      },
    ],
  }),
  component: NeoTest,
});

type Stage = "intro" | "quiz" | "intake" | "result";

const TRAITS: NeoTrait[] = ["O", "C", "E", "A", "N"];

function levelLabel(score: number) {
  if (score < 35) return "낮음";
  if (score < 65) return "보통";
  return "높음";
}

function renderAxisTick(props: any) {
  const { payload, x, y, textAnchor } = props;
  const entry = TRAITS.find((t) => TRAIT_INFO[t].name === payload.value);
  const color = entry ? TRAIT_INFO[entry].color : "var(--foreground)";
  return (
    <text x={x} y={y} textAnchor={textAnchor} fill={color} fontSize={14} fontWeight={600}>
      {payload.value}
    </text>
  );
}

function renderRadarDot(props: any) {
  const { cx, cy, index: i } = props;
  const color = TRAIT_INFO[TRAITS[i]].color;
  return <circle cx={cx} cy={cy} r={6} fill={color} stroke="var(--background)" strokeWidth={2} />;
}

function NeoTest() {
  const STORAGE_KEY = "big5-neo-test-progress";

  const [stage, setStage] = useState<Stage>("intro");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [index, setIndex] = useState(0);
  const [expandedTrait, setExpandedTrait] = useState<NeoTrait | null>(null);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [personalized, setPersonalized] = useState(false);
  const [intakeData, setIntakeData] = useState<IntakeInput | null>(null);
  const [submittingIntake, setSubmittingIntake] = useState(false);

  const current = NEO_QUESTIONS[index];
  const progress = (index / NEO_QUESTIONS.length) * 100;
  const scores = useMemo(() => computeNeoScores(answers), [answers]);

  useEffect(() => {
    if (typeof window === "undefined") return;
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
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    if (index < NEO_QUESTIONS.length - 1) {
      setIndex(index + 1);
    } else {
      const finalDomain = computeNeoScores(next).domain;
      const top = TRAITS.reduce((a, b) => (finalDomain[b] > finalDomain[a] ? b : a));
      setExpandedTrait(top);
      setHasSavedProgress(false);
      setStage("result");
    }
  };

  const handleIntakeSubmit = async (data: IntakeInput) => {
    setSubmittingIntake(true);
    try {
      const s = computeNeoScores(answers);
      await submitIntake({
        ...data,
        test_type: "deep",
        scores: s.domain,
        facet_scores: s.facet,
      });
      setIntakeData(data);
      setStage("result");
      toast.success("맞춤 해석을 준비했어요");
    } catch (e) {
      console.error(e);
      toast.error("저장 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
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
    setHasSavedProgress(false);
    setIntakeData(null);
    setPersonalized(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
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
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("페이지 링크가 복사되었습니다");
    } catch {
      toast.error("복사에 실패했습니다");
    }
  };

  const [isSaving, setIsSaving] = useState(false);
  const handleDownloadImage = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const blob = await generateNeoResultImage(scores);
      if (!blob) throw new Error("no blob");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `neo120-result-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("결과 이미지가 저장되었습니다");
    } catch {
      toast.error("이미지 저장에 실패했습니다");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-20">
        {stage === "intro" && (
          <section className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              IPIP-NEO-120 · Johnson (2014)
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              심층 성격 진단 (120문항)
            </h1>
            <p className="mt-5 text-base text-muted-foreground sm:text-lg">
              Big5 5요인을 각각 6개씩, 총 <strong>30개의 하위 facet</strong>으로 나누어 살펴봅니다.
              약 12~15분이 소요됩니다.
            </p>

            <Card className="mt-8 p-6 text-left sm:p-7">
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                <p>
                  이 검사는 IPIP-NEO-120 (Johnson, 2014)를 사용합니다. 문항은 IPIP(ipip.ori.org)에서
                  공개한 <span className="font-medium text-foreground">퍼블릭 도메인</span> 항목입니다.
                </p>
                <p>
                  답할 때는 미래의 이상적인 모습이 아니라, <span className="font-medium text-foreground">최근 3~6개월의 현재 모습</span>을
                  떠올려주세요. 결과는 유형이 아니라 자기이해를 돕는 자료입니다.
                </p>
                <p>
                  같은 요인이라도 facet에 따라 점수가 갈릴 수 있어요. 예) 외향성은 평균이지만 ‘자기주장’만 높을 수 있습니다.
                  세분화된 결과가 일·관계·학습 맥락에 더 잘 맞붙습니다.
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
                    120문항을 풀고 5요인 + 30 facet 점수만 확인합니다.
                  </p>
                  <Button className="mt-4 w-full" variant="outline" onClick={() => startQuiz(false)}>
                    바로 시작
                  </Button>
                </Card>
                <Card className="border-primary/40 bg-primary/5 p-5 text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold">맞춤 해석까지 받기</h3>
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">추천</span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    직업·연령·고민을 입력하면 당신의 점수를 그 맥락에서 해석합니다. 비스타가 후속 가이드에 활용합니다.
                  </p>
                  <Button className="mt-4 w-full" onClick={() => startQuiz(true)}>
                    맞춤 해석으로 시작
                  </Button>
                </Card>
              </div>
            )}
            <div className="mt-4 text-center">
              <Button asChild size="sm" variant="ghost">
                <Link to="/">← 다른 진단 보기</Link>
              </Button>
            </div>
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
                    / {NEO_QUESTIONS.length} 문항
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
                {current.ko}
              </h2>
              <p className="mt-3 text-base italic text-muted-foreground sm:text-lg">
                I {current.en.charAt(0).toLowerCase() + current.en.slice(1)}
              </p>
              <div className="mt-10 flex flex-col gap-4">
                {NEO_SCALE_LABELS.map((label, i) => (
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
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">심층 진단 결과</h1>
            <p className="mt-2 text-muted-foreground">
              5개 요인 + 30개 하위 facet 점수 (0~100). 각 요인을 눌러 facet 세부 결과를 확인하세요.
            </p>

            {intakeData && <PersonalizedInsight intake={intakeData} scores={scores.domain} />}

            <Card className="mt-6 p-4">
              <div className="h-80 w-full sm:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={TRAITS.map((t) => ({
                      subject: TRAIT_INFO[t].name,
                      score: scores.domain[t],
                      trait: t,
                    }))}
                    margin={{ top: 24, right: 40, bottom: 24, left: 40 }}
                    outerRadius="75%"
                  >
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="subject" tick={renderAxisTick} />
                    <PolarRadiusAxis
                      domain={[0, 100]}
                      tickCount={6}
                      angle={90}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Radar
                      dataKey="score"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      fill="var(--primary)"
                      fillOpacity={0.2}
                      dot={renderRadarDot}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="mt-6 space-y-4">
              {TRAITS.map((t) => {
                const info = TRAIT_INFO[t];
                const score = scores.domain[t];
                const isOpen = expandedTrait === t;
                const facets = NEO_FACETS[t];
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
                          <h3 className="text-lg font-semibold" style={{ color: info.color }}>
                            {info.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">{info.desc}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold tabular-nums" style={{ color: info.color }}>
                            {score}
                          </div>
                          <div className="text-xs text-muted-foreground">{levelLabel(score)}</div>
                        </div>
                      </div>
                      <Progress
                        value={score}
                        className="mt-3"
                        indicatorClassName={`bg-trait-${t.toLowerCase()}`}
                      />
                      <div
                        className="mt-4 flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition-colors"
                        style={{
                          borderColor: info.color,
                          color: isOpen ? "#ffffff" : info.color,
                          backgroundColor: isOpen
                            ? info.color
                            : `color-mix(in oklab, ${info.color} 10%, transparent)`,
                        }}
                      >
                        {isOpen ? "facet 접기" : "6가지 하위 facet 보기"}
                        <ChevronDown
                          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
                        />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-border px-5 pb-5 pt-4">
                        <div className="space-y-4">
                          {Object.keys(facets)
                            .map(Number)
                            .sort((a, b) => a - b)
                            .map((fk) => {
                              const fScore = scores.facet[t][fk] ?? 0;
                              const f = facets[fk];
                              return (
                                <div key={fk}>
                                  <div className="flex items-baseline justify-between">
                                    <div>
                                      <span className="text-sm font-semibold text-foreground">
                                        {f.ko}
                                      </span>
                                      <span className="ml-2 text-xs text-muted-foreground">
                                        {f.en}
                                      </span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                      <span
                                        className="text-lg font-bold tabular-nums"
                                        style={{ color: info.color }}
                                      >
                                        {fScore}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {levelLabel(fScore)}
                                      </span>
                                    </div>
                                  </div>
                                  <Progress
                                    value={fScore}
                                    className="mt-1.5 h-1.5"
                                    indicatorClassName={`bg-trait-${t.toLowerCase()}`}
                                  />
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button onClick={handleDownloadImage} disabled={isSaving}>
                <Download className="mr-2 h-4 w-4" />
                {isSaving ? "이미지 생성 중..." : "결과 이미지 저장 (PNG)"}
              </Button>
              <Button onClick={handleCopyLink} variant="outline">
                <Link2 className="mr-2 h-4 w-4" />
                페이지 링크 복사
              </Button>
              <Button onClick={reset} variant="ghost">
                다시 진단하기
              </Button>
              <Button asChild variant="ghost">
                <Link to="/">다른 진단 보기</Link>
              </Button>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              IPIP-NEO-120 · Johnson, J. A. (2014), Journal of Research in Personality, 51, 78-89.
              Items in the public domain via IPIP (ipip.ori.org).
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
