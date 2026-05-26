import type { Trait } from "./big5";
import { TRAIT_INFO } from "./big5";

// Encode scores to a compact hash like #r=O45-C72-E60-A55-N30
export function encodeScores(scores: Record<Trait, number>): string {
  const order: Trait[] = ["O", "C", "E", "A", "N"];
  return order.map((t) => `${t}${scores[t]}`).join("-");
}

export function decodeScores(str: string): Record<Trait, number> | null {
  try {
    const parts = str.split("-");
    const out: Record<string, number> = {};
    for (const p of parts) {
      const trait = p[0];
      const value = parseInt(p.slice(1), 10);
      if (!["O", "C", "E", "A", "N"].includes(trait) || isNaN(value)) return null;
      out[trait] = Math.max(0, Math.min(100, value));
    }
    if (Object.keys(out).length !== 5) return null;
    return out as Record<Trait, number>;
  } catch {
    return null;
  }
}

// Resolve a CSS variable like "var(--trait-o)" to a concrete color string usable in canvas.
function resolveColor(value: string): string {
  if (typeof window === "undefined") return "#a78bfa";
  const match = value.match(/var\((--[\w-]+)\)/);
  if (!match) return value;
  const resolved = getComputedStyle(document.documentElement)
    .getPropertyValue(match[1])
    .trim();
  return resolved || "#a78bfa";
}

export async function generateResultImage(
  scores: Record<Trait, number>,
): Promise<Blob | null> {
  // 9:16 aspect ratio for stories / shorts
  const width = 1080;
  const height = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Gradient background
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "#1e1b4b");
  grad.addColorStop(0.5, "#312e81");
  grad.addColorStop(1, "#4c1d95");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Subtle radial highlight
  const radial = ctx.createRadialGradient(width / 2, 300, 50, width / 2, 300, 900);
  radial.addColorStop(0, "rgba(255,255,255,0.15)");
  radial.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, width, height);

  // Header
  ctx.fillStyle = "rgba(255,255,255,0.65)";
  ctx.font = "600 30px Pretendard, system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("BIG FIVE PERSONALITY", width / 2, 130);

  ctx.fillStyle = "#ffffff";
  ctx.font = "700 64px Pretendard, system-ui, -apple-system, sans-serif";
  ctx.fillText("나의 성격 5요인 진단", width / 2, 215);
  ctx.textAlign = "left";

  // ===== Radar chart at top =====
  const order: Trait[] = ["O", "C", "E", "A", "N"];
  const colors: Record<Trait, string> = {
    O: resolveColor(TRAIT_INFO.O.color),
    C: resolveColor(TRAIT_INFO.C.color),
    E: resolveColor(TRAIT_INFO.E.color),
    A: resolveColor(TRAIT_INFO.A.color),
    N: resolveColor(TRAIT_INFO.N.color),
  };

  const cx = width / 2;
  const cy = 720;
  const radius = 320;
  const n = order.length;
  // start at top (-90deg) and go clockwise
  const angleFor = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;

  // Grid rings
  const ringSteps = [20, 40, 60, 80, 100];
  ctx.lineWidth = 1.5;
  ringSteps.forEach((step) => {
    const r = (radius * step) / 100;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const a = angleFor(i);
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.stroke();
  });

  // Axis lines + scale ticks
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1;
  for (let i = 0; i < n; i++) {
    const a = angleFor(i);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius);
    ctx.stroke();
  }

  // Scale labels on vertical axis (top)
  ctx.font = "500 20px Pretendard, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ringSteps.forEach((step) => {
    const r = (radius * step) / 100;
    const x = cx;
    const y = cy - r;
    // pill background
    ctx.fillStyle = "rgba(15, 12, 50, 0.85)";
    const pillW = 50;
    const pillH = 26;
    roundRect(ctx, x - pillW / 2, y - pillH / 2, pillW, pillH, 13);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillText(String(step), x, y);
  });

  // Data polygon
  const points = order.map((t, i) => {
    const a = angleFor(i);
    const r = (radius * scores[t]) / 100;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
  });

  ctx.beginPath();
  points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(167, 139, 250, 0.35)";
  ctx.fill();
  ctx.strokeStyle = "rgba(240, 171, 252, 0.9)";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Trait name labels (outside)
  ctx.font = "700 30px Pretendard, system-ui, sans-serif";
  ctx.textBaseline = "middle";
  order.forEach((t, i) => {
    const a = angleFor(i);
    const labelR = radius + 60;
    const x = cx + Math.cos(a) * labelR;
    const y = cy + Math.sin(a) * labelR;
    ctx.fillStyle = colors[t];
    ctx.textAlign = Math.abs(Math.cos(a)) < 0.2 ? "center" : Math.cos(a) > 0 ? "left" : "right";
    ctx.fillText(TRAIT_INFO[t].name, x, y);
  });

  // Score pills at each vertex
  ctx.font = "700 22px Pretendard, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  points.forEach((p, i) => {
    const t = order[i];
    // dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
    ctx.fillStyle = colors[t];
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.stroke();

    // score pill pushed outward
    const a = angleFor(i);
    const px = p.x + Math.cos(a) * 28;
    const py = p.y + Math.sin(a) * 28;
    const pillW = 56;
    const pillH = 32;
    ctx.fillStyle = colors[t];
    roundRect(ctx, px - pillW / 2, py - pillH / 2, pillW, pillH, 16);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.fillText(String(scores[t]), px, py);
  });

  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";

  // ===== Score bars below radar =====
  const startY = 1180;
  const rowH = 120;

  order.forEach((t, i) => {
    const y = startY + i * rowH;
    const info = TRAIT_INFO[t];
    const score = scores[t];
    const color = colors[t];

    // Name
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 34px Pretendard, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(info.name, 80, y);

    // Score number
    ctx.fillStyle = color;
    ctx.font = "700 44px Pretendard, system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(String(score), width - 80, y);
    ctx.textAlign = "left";

    // Bar bg
    const barY = y + 48;
    const barH = 14;
    const barW = width - 160;
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    roundRect(ctx, 80, barY, barW, barH, 7);
    ctx.fill();

    // Bar fill (trait color)
    ctx.fillStyle = color;
    roundRect(ctx, 80, barY, (barW * score) / 100, barH, 7);
    ctx.fill();
  });

  // Footer
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "500 24px Pretendard, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Big5 성격유형 진단 · 직접 해보기", width / 2, height - 70);

  return await new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png"));
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
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
