import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Download, Link2, MessageCircle } from "lucide-react";
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
  computeScores,
  scoreLevel,
  type Trait,
} from "@/lib/big5";
import { decodeScores, encodeScores, generateResultImage } from "@/lib/big5-share";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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
            <Button size="lg" className="mt-8" onClick={() => setStage("quiz")}>
              진단 시작하기
            </Button>

            <div className="mt-12 grid gap-3 text-left sm:grid-cols-2">
              {(Object.keys(TRAIT_INFO) as Trait[]).map((t) => (
                <Card key={t} className="p-4">
                  <div className="text-sm font-semibold">{TRAIT_INFO[t].name}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{TRAIT_INFO[t].desc}</p>
                </Card>
              ))}
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

            <div className="mt-8 space-y-4">
              {(Object.keys(TRAIT_INFO) as Trait[]).map((t) => {
                const info = TRAIT_INFO[t];
                const score = scores[t];
                const level = scoreLevel(score);
                return (
                  <Card key={t} className="p-5">
                    <div className="flex items-baseline justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold">{info.name}</h3>
                        <p className="text-xs text-muted-foreground">{info.desc}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold tabular-nums">{score}</div>
                        <div className="text-xs text-muted-foreground">{level}</div>
                      </div>
                    </div>
                    <Progress value={score} className="mt-3" />
                    <p className="mt-3 text-sm text-muted-foreground">
                      {score >= 50 ? info.high : info.low}
                    </p>
                  </Card>
                );
              })}
            </div>

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
