import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, Brain, Compass, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TRAIT_INFO, type Trait } from "@/lib/big5";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Big5 성격유형 진단 — 나를 더 잘 이해하는 시작" },
      {
        name: "description",
        content:
          "국제 표준 IPIP-50 문항으로 진행하는 무료 Big5 성격유형 진단. 5가지 요인 점수와 자기이해 가이드를 제공합니다.",
      },
      { property: "og:title", content: "Big5 성격유형 진단" },
      {
        property: "og:description",
        content: "개방성·성실성·외향성·친화성·신경성을 점수로 확인하는 자기이해 도구.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();

  // 기존 공유 링크 호환: '/#r=...' 로 들어오면 /test 로 이관
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash.startsWith("#r=")) {
      navigate({ to: "/test", hash: hash.slice(1) as never });
    }
  }, [navigate]);

  const traits = (Object.keys(TRAIT_INFO) as Trait[]).map((t) => ({
    key: t,
    ...TRAIT_INFO[t],
  }));

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(60% 50% at 20% 10%, color-mix(in oklab, var(--primary) 18%, transparent), transparent), radial-gradient(50% 40% at 90% 30%, color-mix(in oklab, var(--accent) 18%, transparent), transparent)",
          }}
        />
        <div className="mx-auto max-w-3xl px-4 pt-20 pb-16 text-center sm:pt-28 sm:pb-24">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Big Five Personality Test
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            나를 더 잘 이해하는
            <br />
            <span className="text-primary">5가지 성격 지도</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            국제 표준 IPIP-50 문항으로 알아보는 무료 Big5 성격유형 진단.
            <br className="hidden sm:block" />
            점수가 아니라, 나를 이해하는 대화의 출발점입니다.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="group">
              <Link to="/test">
                진단 시작하기
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">50문항 · 약 7분 · 로그인 불필요</p>
          </div>
        </div>
      </section>

      {/* 5 traits preview */}
      <section className="mx-auto max-w-4xl px-4 pb-16">
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          진단하는 5가지 요인
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {traits.map((t) => (
            <Card key={t.key} className="p-4 text-center">
              <div
                className="mx-auto h-8 w-8 rounded-full"
                style={{ backgroundColor: t.color }}
              />
              <div className="mt-3 text-sm font-semibold" style={{ color: t.color }}>
                {t.name}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{t.desc}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Why / How */}
      <section className="mx-auto max-w-4xl px-4 pb-20">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-6">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h3 className="mt-3 text-base font-semibold">학문적으로 검증된 문항</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              심리학에서 가장 널리 쓰이는 5요인 모델(Goldberg, 1992)의 공개 문항 IPIP-50을 사용합니다.
            </p>
          </Card>
          <Card className="p-6">
            <Brain className="h-6 w-6 text-primary" />
            <h3 className="mt-3 text-base font-semibold">유형이 아닌 스펙트럼</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              한 가지 유형으로 가두지 않고, 각 요인을 0~100점 스펙트럼으로 보여줍니다.
            </p>
          </Card>
          <Card className="p-6">
            <Compass className="h-6 w-6 text-primary" />
            <h3 className="mt-3 text-base font-semibold">자기이해 가이드 제공</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              점수의 의미와 일·관계·학습에 적용하는 방법을 요인별로 자세히 안내합니다.
            </p>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link to="/test">
              진단 시작하기
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            결과는 저장되지 않으며, 링크로 직접 공유할 때만 전달됩니다.
          </p>
        </div>
      </section>
    </main>
  );
}
