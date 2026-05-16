import { NEO_QUESTIONS, NEO_FACETS, type NeoTrait, type NeoItem } from "./neo120-items";

export { NEO_QUESTIONS, NEO_FACETS };
export type { NeoTrait, NeoItem };

export type NeoScores = {
  domain: Record<NeoTrait, number>;
  facet: Record<NeoTrait, Record<number, number>>;
};

export function computeNeoScores(answers: Record<number, number>): NeoScores {
  const domainTot: Record<NeoTrait, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 };
  const domainCnt: Record<NeoTrait, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 };
  const facetTot: Record<NeoTrait, Record<number, number>> = {
    O: {}, C: {}, E: {}, A: {}, N: {},
  };
  const facetCnt: Record<NeoTrait, Record<number, number>> = {
    O: {}, C: {}, E: {}, A: {}, N: {},
  };

  for (const q of NEO_QUESTIONS) {
    const raw = answers[q.id];
    if (!raw) continue;
    const value = q.keyed === 1 ? raw : 6 - raw;
    domainTot[q.trait] += value;
    domainCnt[q.trait] += 1;
    facetTot[q.trait][q.facet] = (facetTot[q.trait][q.facet] ?? 0) + value;
    facetCnt[q.trait][q.facet] = (facetCnt[q.trait][q.facet] ?? 0) + 1;
  }

  const norm = (sum: number, n: number) =>
    n === 0 ? 0 : Math.round(((sum - n) / (n * 4)) * 100);

  const domain: Record<NeoTrait, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 };
  const facet: Record<NeoTrait, Record<number, number>> = {
    O: {}, C: {}, E: {}, A: {}, N: {},
  };

  (Object.keys(domainTot) as NeoTrait[]).forEach((t) => {
    domain[t] = norm(domainTot[t], domainCnt[t]);
    for (const f of Object.keys(facetTot[t])) {
      const k = Number(f);
      facet[t][k] = norm(facetTot[t][k], facetCnt[t][k]);
    }
  });

  return { domain, facet };
}

export const NEO_SCALE_LABELS = [
  "전혀 그렇지 않다",
  "그렇지 않다",
  "보통이다",
  "그렇다",
  "매우 그렇다",
];
