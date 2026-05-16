import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  ArrowRight,
  Brain,
  ClipboardList,
  Clock,
  Compass,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";


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
            국제 표준 공개 문항으로 알아보는 무료 성격 진단.
            <br className="hidden sm:block" />
            점수가 아니라, 나를 이해하는 대화의 출발점입니다.
          </p>
        </div>
      </section>

      {/* Pick a test */}
      <section className="mx-auto max-w-4xl px-4 pb-16">
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          진단을 선택하세요
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card className="flex flex-col p-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              빠른 진단 · IPIP-50
            </div>
            <h3 className="mt-2 text-xl font-bold">Big5 기본 진단</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              5요인(개방성·성실성·외향성·친화성·신경성) 점수를 빠르게 확인합니다.
              처음이라면 여기서 시작하세요.
            </p>
            <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
              <li>· 50문항 · 약 7분</li>
              <li>· 5요인 점수 + 요인별 해석</li>
              <li>· 결과 이미지 9:16 저장 / 링크 공유</li>
            </ul>
            <div className="mt-6">
              <Button asChild className="group w-full">
                <Link to="/test">
                  기본 진단 시작
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </Card>

          <Card
            className="flex flex-col border-primary/40 p-6"
            style={{ backgroundColor: "color-mix(in oklab, var(--primary) 5%, transparent)" }}
          >
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              심층 진단 · IPIP-NEO-120
            </div>
            <h3 className="mt-2 text-xl font-bold">30 facet 심층 진단</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              5요인을 각각 6개 하위 facet으로 나눠 살펴봅니다. 같은 ‘외향성’ 안에서도 어느 면이 강한지 보입니다.
            </p>
            <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
              <li>· 120문항 · 약 12~15분</li>
              <li>· 5요인 + 30 facet 점수</li>
              <li>· Johnson(2014) 공개 도구 기반</li>
            </ul>
            <div className="mt-6">
              <Button asChild className="group w-full">
                <Link to="/test-neo">
                  심층 진단 시작
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          모든 진단은 로그인 없이 진행되며, 결과는 브라우저에만 남습니다.
        </p>
      </section>

      {/* Why / How */}
      <section className="mx-auto max-w-4xl px-4 pb-20">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-6">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h3 className="mt-3 text-base font-semibold">학문적으로 검증된 문항</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              IPIP-50, IPIP-NEO-120 등 학계에서 공개한 퍼블릭 도메인 문항을 사용합니다.
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
      </section>
    </main>
  );
}
