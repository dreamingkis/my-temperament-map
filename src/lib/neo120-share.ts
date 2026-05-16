import { TRAIT_INFO, type Trait } from "./big5";
import { NEO_FACETS, type NeoScores, type NeoTrait } from "./neo120";

function resolveColor(value: string): string {
  if (typeof window === "undefined") return "#a78bfa";
  const match = value.match(/var\((--[\w-]+)\)/);
  if (!match) return value;
  const resolved = getComputedStyle(document.documentElement)
    .getPropertyValue(match[1])
    .trim();
  return resolved || "#a78bfa";
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function levelLabel(score: number) {
  if (score < 35) return "낮음";
  if (score < 65) return "보통";
  return "높음";
}

export async function generateNeoResultImage(scores: NeoScores): Promise<Blob | null> {
  const width = 1080;
  const height = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Background
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "#1e1b4b");
  grad.addColorStop(0.5, "#312e81");
  grad.addColorStop(1, "#4c1d95");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  const radial = ctx.createRadialGradient(width / 2, 300, 50, width / 2, 300, 900);
  radial.addColorStop(0, "rgba(255,255,255,0.15)");
  radial.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, width, height);

  // Header
  ctx.fillStyle = "rgba(255,255,255,0.65)";
  ctx.font = "600 28px Pretendard, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("IPIP-NEO-120 · 30 FACETS", width / 2, 110);

  ctx.fillStyle = "#ffffff";
  ctx.font = "700 58px Pretendard, system-ui, sans-serif";
  ctx.fillText("심층 성격 진단 결과", width / 2, 185);

  const order: NeoTrait[] = ["O", "C", "E", "A", "N"];
  const colors: Record<Trait, string> = {
    O: resolveColor(TRAIT_INFO.O.color),
    C: resolveColor(TRAIT_INFO.C.color),
    E: resolveColor(TRAIT_INFO.E.color),
    A: resolveColor(TRAIT_INFO.A.color),
    N: resolveColor(TRAIT_INFO.N.color),
  };

  // Radar
  const cx = width / 2;
  const cy = 620;
  const radius = 270;
  const n = order.length;
  const angleFor = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;

  const ringSteps = [20, 40, 60, 80, 100];
  ctx.lineWidth = 1.5;
  ringSteps.forEach((step) => {
    const r = (radius * step) / 100;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const a = angleFor(i);
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.stroke();
  });

  for (let i = 0; i < n; i++) {
    const a = angleFor(i);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius);
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.stroke();
  }

  const points = order.map((t, i) => {
    const a = angleFor(i);
    const r = (radius * scores.domain[t]) / 100;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
  });

  ctx.beginPath();
  points.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
  ctx.closePath();
  ctx.fillStyle = "rgba(167, 139, 250, 0.35)";
  ctx.fill();
  ctx.strokeStyle = "rgba(240, 171, 252, 0.9)";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.font = "700 26px Pretendard, system-ui, sans-serif";
  ctx.textBaseline = "middle";
  order.forEach((t, i) => {
    const a = angleFor(i);
    const labelR = radius + 55;
    const x = cx + Math.cos(a) * labelR;
    const y = cy + Math.sin(a) * labelR;
    ctx.fillStyle = colors[t];
    ctx.textAlign = Math.abs(Math.cos(a)) < 0.2 ? "center" : Math.cos(a) > 0 ? "left" : "right";
    ctx.fillText(TRAIT_INFO[t].name, x, y);
  });

  ctx.font = "700 20px Pretendard, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  points.forEach((p, i) => {
    const t = order[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = colors[t];
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    const a = angleFor(i);
    const px = p.x + Math.cos(a) * 26;
    const py = p.y + Math.sin(a) * 26;
    ctx.fillStyle = colors[t];
    roundRect(ctx, px - 26, py - 15, 52, 30, 15);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.fillText(String(scores.domain[t]), px, py);
  });

  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";

  // Domain + top 2 facets per trait
  const startY = 1010;
  const blockH = 165;

  order.forEach((t, i) => {
    const y = startY + i * blockH;
    const info = TRAIT_INFO[t];
    const score = scores.domain[t];
    const color = colors[t];

    // Header row
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 32px Pretendard, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(info.name, 80, y);

    ctx.fillStyle = color;
    ctx.font = "700 38px Pretendard, system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(String(score), width - 80, y);

    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "500 18px Pretendard, system-ui, sans-serif";
    ctx.fillText(levelLabel(score), width - 80, y + 24);
    ctx.textAlign = "left";

    // Bar
    const barY = y + 42;
    const barH = 12;
    const barW = width - 160;
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    roundRect(ctx, 80, barY, barW, barH, 6);
    ctx.fill();
    ctx.fillStyle = color;
    roundRect(ctx, 80, barY, (barW * score) / 100, barH, 6);
    ctx.fill();

    // Top 2 facets (highest absolute deviation from 50 → most distinctive)
    const facetEntries = Object.entries(scores.facet[t]).map(([k, v]) => ({
      key: Number(k),
      value: v,
    }));
    const top = facetEntries
      .slice()
      .sort((a, b) => Math.abs(b.value - 50) - Math.abs(a.value - 50))
      .slice(0, 2);

    const facetY = y + 82;
    top.forEach((f, idx) => {
      const fx = 80 + idx * 470;
      const facets = NEO_FACETS[t];
      const facetLabel = facets[f.key]?.ko ?? `facet ${f.key}`;

      // chip
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      roundRect(ctx, fx, facetY, 450, 56, 10);
      ctx.fill();

      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "600 22px Pretendard, system-ui, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(facetLabel, fx + 18, facetY + 24);

      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.font = "500 16px Pretendard, system-ui, sans-serif";
      ctx.fillText(levelLabel(f.value), fx + 18, facetY + 45);

      ctx.fillStyle = color;
      ctx.font = "700 26px Pretendard, system-ui, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(String(f.value), fx + 432, facetY + 36);
    });
  });

  // Footer
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "500 22px Pretendard, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("IPIP-NEO-120 · Johnson (2014) · 직접 해보기", width / 2, height - 60);

  return await new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png"));
}
