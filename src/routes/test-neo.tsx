import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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

type Stage = "intro" | "quiz" | "result";

const TRAITS: NeoTrait[] = ["O", "C", "E", "A", "N"];

function levelLabel(score: number) {
  if (score < 35) return "낮음";
  if (score < 65) return "보통";
  return "높음";
}

function NeoTest() {
  const [stage, setStage] = useState<Stage>("intro");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [index, setIndex] = useState(0);
  const [expandedTrait, setExpandedTrait] = useState<NeoTrait | null>(null);

  const current = NEO_QUESTIONS[index];
  const progress = (index / NEO_QUESTIONS.length) * 100;
  const scores = useMemo(() => computeNeoScores(answers), [answers]);

  const handleAnswer = (value: number) => {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    if (index < NEO_QUESTIONS.length - 1) {
      setIndex(index + 1);
    } else {
      const finalDomain = computeNeoScores(next).domain;
      const top = TRAITS.reduce((a, b) => (finalDomain[b] > finalDomain[a] ? b : a));
      setExpandedTrait(top);
      setStage("result");
    }
  };

  const reset = () => {
    setAnswers({});
    setIndex(0);
    setStage("intro");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("페이지 링크가 복사되었습니다");
    } catch {
      toast.error("복사에 실패했습니다");
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

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" onClick={() => setStage("quiz")}>
                진단 시작하기
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link to="/">← 다른 진단 보기</Link>
              </Button>
            </div>
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
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={(props: any) => {
                        const { payload, x, y, textAnchor } = props;
                        const entry = TRAITS.find((t) => TRAIT_INFO[t].name === payload.value);
                        const color = entry ? TRAIT_INFO[entry].color : "var(--foreground)";
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
                      dot={(props: any) => {
                        const { cx, cy, index: i } = props;
                        const color = TRAIT_INFO[TRAITS[i]].color;
                        return <circle cx={cx} cy={cy} r={6} fill={color} stroke="var(--background)" strokeWidth={2} />;
                      }}
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
