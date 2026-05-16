import type { Trait } from "./big5";
import { TRAIT_INFO, scoreLevel } from "./big5";

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

export async function generateResultImage(
  scores: Record<Trait, number>,
): Promise<Blob | null> {
  const width = 1080;
  const height = 1350;
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

  // Header
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "600 28px system-ui, -apple-system, sans-serif";
  ctx.fillText("BIG FIVE PERSONALITY", 80, 120);

  ctx.fillStyle = "#ffffff";
  ctx.font = "700 64px system-ui, -apple-system, sans-serif";
  ctx.fillText("나의 성격 진단 결과", 80, 200);

  // Score bars
  const order: Trait[] = ["O", "C", "E", "A", "N"];
  const startY = 300;
  const rowH = 180;

  order.forEach((t, i) => {
    const y = startY + i * rowH;
    const info = TRAIT_INFO[t];
    const score = scores[t];

    // Name
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 36px system-ui, -apple-system, sans-serif";
    ctx.fillText(info.name, 80, y);

    // Score number
    ctx.font = "700 56px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(String(score), width - 80, y);

    // Level
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "500 22px system-ui, -apple-system, sans-serif";
    ctx.fillText(scoreLevel(score), width - 80, y + 32);
    ctx.textAlign = "left";

    // Bar bg
    const barY = y + 60;
    const barH = 18;
    const barW = width - 160;
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    roundRect(ctx, 80, barY, barW, barH, 9);
    ctx.fill();

    // Bar fill
    const fillGrad = ctx.createLinearGradient(80, 0, 80 + barW, 0);
    fillGrad.addColorStop(0, "#a78bfa");
    fillGrad.addColorStop(1, "#f0abfc");
    ctx.fillStyle = fillGrad;
    roundRect(ctx, 80, barY, (barW * score) / 100, barH, 9);
    ctx.fill();
  });

  // Footer
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "500 24px system-ui, -apple-system, sans-serif";
  ctx.fillText("Big5 성격유형 진단 · 직접 해보기", 80, height - 80);

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
