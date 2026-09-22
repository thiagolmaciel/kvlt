import type { TrendSignal } from "@/types";
import trendSignalsRaw from "@/data/trend-signals.json";

const TREND_SIGNALS = trendSignalsRaw as Record<string, TrendSignal[]>;

export function getTrendSignals(slug: string): TrendSignal[] {
  return TREND_SIGNALS[slug] ?? [];
}

export function getAllTrendSignals(): (TrendSignal & { trendSlug: string })[] {
  return Object.entries(TREND_SIGNALS).flatMap(([trendSlug, signals]) =>
    signals.map((s) => ({ ...s, trendSlug }))
  );
}
