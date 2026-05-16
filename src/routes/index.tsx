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
import { BasicResultPreview, DeepResultPreview } from "@/components/ResultPreviews";

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
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
          원하는 깊이에 맞는 성격 분석을 선택해 보세요.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {/* IPIP-50 */}
          <Link
            to="/test"
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1.5"
              style={{ backgroundColor: "var(--primary)" }}
            />
            <div className="mb-6 flex items-start justify-between">
              <div
                className="rounded-2xl p-3"
                style={{
                  backgroundColor: "color-mix(in oklab, var(--primary) 10%, transparent)",
                  color: "var(--primary)",
                }}
              >
                <ClipboardList className="h-6 w-6" />
              </div>
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: "color-mix(in oklab, var(--primary) 10%, transparent)",
                  color: "var(--primary)",
                }}
              >
                기본 · Standard
              </span>
            </div>

            <h3 className="mb-2 text-2xl font-bold">BIG5 기본진단</h3>
            <p className="mb-5 leading-relaxed text-muted-foreground">
              5가지 핵심 성격 요인(개방성·성실성·외향성·친화성·신경성)의
              전체적인 성향을 빠르게 파악합니다. 각 요인을 0~100점 스펙트럼으로
              확인하며, 자신의 대략적인 성격 지도를 그리기에 적합합니다.
            </p>

            <div className="mb-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                결과 화면 미리보기
              </p>
              <BasicResultPreview />
            </div>

            <div className="mb-8 space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <ClipboardList className="mr-2 h-4 w-4" />
                50문항 · IPIP-50
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                약 5~8분 소요
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Sparkles className="mr-2 h-4 w-4" />
                5요인 점수 + 결과 공유 이미지
              </div>
            </div>

            <div className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-semibold text-primary-foreground transition-all group-hover:gap-3 group-active:scale-[0.98]">
              기본 진단 시작
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* IPIP-NEO-120 */}
          <Link
            to="/test-neo"
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1.5"
              style={{ backgroundColor: "var(--chart-2)" }}
            />
            <div className="mb-6 flex items-start justify-between">
              <div
                className="rounded-2xl p-3"
                style={{
                  backgroundColor: "color-mix(in oklab, var(--chart-2) 12%, transparent)",
                  color: "var(--chart-2)",
                }}
              >
                <Layers className="h-6 w-6" />
              </div>
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: "color-mix(in oklab, var(--chart-2) 12%, transparent)",
                  color: "var(--chart-2)",
                }}
              >
                심층 · In-Depth
              </span>
            </div>

            <h3 className="mb-2 text-2xl font-bold">BIG5 심층진단</h3>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              5요인을 각각 6개 하위 facet(세부 성향)으로 세분화해 분석합니다.
              예를 들어 같은 &apos;외향성&apos; 안에서도 사교성·자기주장성·활동성 등
              구체적인 면면을 살펴볼 수 있어, 훨씬 정교한 자기 이해가 가능합니다.
            </p>

            <div className="mb-8 space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <ClipboardList className="mr-2 h-4 w-4" />
                120문항 · IPIP-NEO-120
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                약 12~15분 소요
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Layers className="mr-2 h-4 w-4" />
                30 facet 세부 분석 + 결과 공유 이미지
              </div>
            </div>

            <div className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-semibold text-primary-foreground transition-all group-hover:gap-3 group-active:scale-[0.98]">
              심층 진단 시작
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          모든 진단은 로그인 없이 진행되며, 결과는 브라우저에만 남습니다.
        </p>
      </section>

      {/* Comparison / Guide */}
      <section className="mx-auto max-w-4xl px-4 pb-20">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h2 className="mb-6 text-center text-xl font-bold">
            어떤 진단을 선택해야 할까요?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-base font-semibold text-primary">
                BIG5 기본진단이 더 적합한 경우
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  처음 성격 진단을 접해보는 경우
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  전체적인 성격 윤곽을 빠르게 파악하고 싶은 경우
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  5~8분 내외의 짧은 시간만 투자할 수 있는 경우
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-base font-semibold" style={{ color: "var(--chart-2)" }}>
                BIG5 심층진단이 더 적합한 경우
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--chart-2)" }} />
                  기본 진단을 이미 해보고 더 깊이 알고 싶은 경우
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--chart-2)" }} />
                  같은 요인 안에서도 세부 성향 차이가 궁금한 경우
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--chart-2)" }} />
                  구체적인 성격 프로파일을 바탕으로 자기 계발을 계획하고 싶은 경우
                </li>
              </ul>
            </div>
          </div>
        </div>
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
