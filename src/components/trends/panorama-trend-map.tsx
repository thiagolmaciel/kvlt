"use client";

import { useRouter } from "next/navigation";
import { Route } from "lucide-react";
import { TrendIcon } from "@/components/trends/trend-icon";
import { cn } from "@/lib/utils";
import type { RelevanceLevel, TrendTopic, Horizon } from "@/types";
import { HORIZONS } from "@/types";

const HORIZON_ORDER: Record<Horizon, number> = { curto: 0, medio: 1, longo: 2 };

const NODE_STYLE: Record<RelevanceLevel, string> = {
  critica: "border-primary bg-primary text-primary-foreground",
  alta: "border-primary/60 bg-primary/20 text-accent-vivid",
  media: "border-border bg-secondary text-muted-foreground",
  baixa: "border-border bg-secondary/60 text-muted-foreground/70",
};

const LEVEL_LABEL: Record<RelevanceLevel, string> = {
  critica: "Crítica",
  alta: "Alta",
  media: "Média",
  baixa: "Baixa",
};

export function PanoramaTrendMap({
  trends,
  region,
}: {
  trends: TrendTopic[];
  region: "internacional" | "brasil";
}) {
  const router = useRouter();
  const ordered = [...trends].sort(
    (a, b) => HORIZON_ORDER[a.horizon] - HORIZON_ORDER[b.horizon]
  );

  const items = ordered.reduce<{ trend: TrendTopic; showHeader: boolean }[]>(
    (acc, trend) => {
      const prevHorizon = acc[acc.length - 1]?.trend.horizon;
      acc.push({ trend, showHeader: trend.horizon !== prevHorizon });
      return acc;
    },
    []
  );

  return (
    <div className="flex h-full flex-col rounded-xl border border-border/60 bg-card/30 p-5 md:p-6">
      <div className="mb-5 flex items-center gap-2">
        <Route className="size-4 text-accent-vivid" />
        <h2 className="text-[15px] font-semibold">Linha do tempo das tendências</h2>
        <span className="ml-auto text-[11px] text-muted-foreground">
          agora <span className="mx-1 text-muted-foreground/50">&rarr;</span> daqui a 10 anos
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="relative flex flex-col pl-6">
          <span className="absolute left-[13px] top-3 bottom-3 w-px bg-gradient-to-b from-primary via-border to-border" />
          {items.map(({ trend: t, showHeader }) => {
            const level =
              region === "internacional"
                ? t.relevanceInternational.level
                : t.relevanceBrazil.level;
            return (
              <div key={t.slug}>
                {showHeader && (
                  <div className="mt-5 mb-2 flex items-center gap-2 first:mt-0">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/70">
                      {HORIZONS[t.horizon].label}
                    </span>
                    <span className="text-[11px] text-muted-foreground/60">
                      {HORIZONS[t.horizon].years}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => router.push(`/tendencias/${t.slug}`)}
                  className="group relative flex w-full items-center gap-3 rounded-lg py-2 pr-2 text-left transition-colors hover:bg-secondary/70"
                >
                  <span
                    className={cn(
                      "absolute -left-6 flex size-7 items-center justify-center rounded-full border-2 transition-transform group-hover:scale-110",
                      NODE_STYLE[level]
                    )}
                  >
                    <TrendIcon icon={t.icon} className="size-[13px]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13.5px] font-medium leading-tight text-foreground/90 group-hover:text-foreground">
                      {t.title.split(" (")[0]}
                    </div>
                    <div className="mt-0.5 truncate text-[11.5px] text-muted-foreground">
                      {t.pillar}
                    </div>
                  </div>
                  <span className="shrink-0 text-[11px] text-muted-foreground/70">
                    {LEVEL_LABEL[level]}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
