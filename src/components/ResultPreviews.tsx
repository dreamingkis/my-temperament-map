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

export function DeepResultPreview() {
  // pentagon radar — use a viewBox so it scales responsively
  const vbSize = 180;
  const cx = vbSize / 2;
  const cy = vbSize / 2 + 4;
  const radius = 62;
  const n = 5;
  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;

  const point = (i: number, r: number) => ({
    x: cx + Math.cos(angle(i)) * r,
    y: cy + Math.sin(angle(i)) * r,
  });

  const ringPath = (r: number) =>
    TRAITS.map((_, i) => {
      const p = point(i, r);
      return `${i === 0 ? "M" : "L"}${p.x},${p.y}`;
    }).join(" ") + " Z";

  const dataPath =
    TRAITS.map((t, i) => {
      const p = point(i, (radius * t.score) / 100);
      return `${i === 0 ? "M" : "L"}${p.x},${p.y}`;
    }).join(" ") + " Z";

  return (
    <div
      className="pointer-events-none w-full max-h-48 sm:max-h-56 overflow-hidden rounded-2xl border border-white/10 p-3 sm:p-4 shadow-inner"
      style={{
        background:
          "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)",
      }}
    >
      <div className="mb-1 sm:mb-2 text-center">
        <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-white/60">
          IPIP-NEO-120 · 30 Facets
        </p>
        <p className="mt-0.5 text-[11px] sm:text-xs font-bold text-white">심층 성격 진단 결과</p>
      </div>
      <div className="flex justify-center">
        <svg className="w-full h-auto max-w-[140px] sm:max-w-[160px]" viewBox={`0 0 ${vbSize} ${vbSize}`}>
          {[0.25, 0.5, 0.75, 1].map((s) => (
            <path
              key={s}
              d={ringPath(radius * s)}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={1}
            />
          ))}
          {TRAITS.map((_, i) => {
            const p = point(i, radius);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={p.x}
                y2={p.y}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={1}
              />
            );
          })}
          <path
            d={dataPath}
            fill="rgba(167,139,250,0.4)"
            stroke="#f0abfc"
            strokeWidth={2}
            strokeLinejoin="round"
          />
          {TRAITS.map((t, i) => {
            const p = point(i, (radius * t.score) / 100);
            return (
              <circle key={t.key} cx={p.x} cy={p.y} r={3} fill={t.color} stroke="#fff" strokeWidth={1.5} />
            );
          })}
          {TRAITS.map((t, i) => {
            const p = point(i, radius + 12);
            return (
              <text
                key={t.key}
                x={p.x}
                y={p.y}
                fontSize={8}
                fontWeight={700}
                fill={t.color}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {t.name}
              </text>
            );
          })}
        </svg>
      </div>
      <div className="mt-1 grid grid-cols-5 gap-1">
        {TRAITS.map((t) => (
          <div key={t.key} className="text-center">
            <div className="text-[8px] sm:text-[9px] font-bold" style={{ color: t.color }}>
              {t.score}
            </div>
            <div className="text-[7px] sm:text-[8px] text-white/50">{t.name[0]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
