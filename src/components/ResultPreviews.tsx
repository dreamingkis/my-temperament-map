const TRAITS = [
  { key: "O", name: "개방성", score: 72, color: "#3b82f6" },
  { key: "C", name: "성실성", score: 65, color: "#22c55e" },
  { key: "E", name: "외향성", score: 48, color: "#f59e0b" },
  { key: "A", name: "친화성", score: 80, color: "#ec4899" },
  { key: "N", name: "신경성", score: 35, color: "#a855f7" },
];

export function BasicResultPreview() {
  return (
    <div className="pointer-events-none w-full max-h-48 sm:max-h-56 overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background to-muted/40 p-3 sm:p-4 shadow-inner">
      <div className="mb-2 sm:mb-3 text-center">
        <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          IPIP-50 · Big Five
        </p>
        <p className="mt-0.5 text-[11px] sm:text-xs font-bold">기본 성격 진단 결과</p>
      </div>
      <div className="space-y-1.5 sm:space-y-2.5">
        {TRAITS.map((t) => (
          <div key={t.key}>
            <div className="mb-0.5 sm:mb-1 flex items-center justify-between text-[9px] sm:text-[10px]">
              <span className="font-semibold text-foreground">{t.name}</span>
              <span className="font-bold" style={{ color: t.color }}>
                {t.score}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full"
                style={{ width: `${t.score}%`, backgroundColor: t.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const C_FACETS = [
  { name: "자기효능감", score: 78 },
  { name: "체계성", score: 64 },
  { name: "충실성", score: 82 },
  { name: "성취추구", score: 71 },
  { name: "자기통제", score: 58 },
  { name: "신중성", score: 69 },
];

export function DeepResultPreview() {
  return (
    <div
      className="pointer-events-none w-full max-h-48 sm:max-h-56 overflow-hidden rounded-2xl border border-white/10 p-3 sm:p-4 shadow-inner"
      style={{
        background:
          "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)",
      }}
    >
      <div className="mb-2 sm:mb-3 text-center">
        <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-white/60">
          IPIP-NEO-120 · Conscientiousness Facets
        </p>
        <p className="mt-0.5 text-[11px] sm:text-xs font-bold text-white">
          성실성 하위 6개 트랙
        </p>
      </div>
      <div className="space-y-1 sm:space-y-1.5">
        {C_FACETS.map((f) => (
          <div key={f.name}>
            <div className="mb-0.5 flex items-center justify-between text-[9px] sm:text-[10px]">
              <span className="font-semibold text-white/90">{f.name}</span>
              <span className="font-bold text-[#86efac]">{f.score}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${f.score}%`,
                  background: "linear-gradient(90deg, #22c55e, #86efac)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
