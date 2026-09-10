"use client";

import Link from "next/link";
import { useState } from "react";
import { Route, ArrowUpRight, ChevronDown } from "lucide-react";
import { TrendIcon } from "@/components/trends/trend-icon";
import { TrendMapDialog } from "@/components/trends/trend-map-dialog";
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
  const [expanded, setExpanded] = useState<string | null>(null);

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
    <div className="flex min-w-0 max-h-[480px] flex-col rounded-xl border border-border/60 bg-card/30 p-5 md:p-6">
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <Route className="size-4 shrink-0 text-accent-vivid" />
        <h2 className="text-[15px] font-semibold">Linha do tempo das tendências</h2>
        <div className="ml-auto">
          <TrendMapDialog trends={trends} />
        </div>
      </div>
      <div className="mb-4 text-[11px] text-muted-foreground">
        agora <span className="mx-1 text-muted-foreground/50">&rarr;</span> daqui a 10 anos
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="relative">
          <span className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-primary via-border to-border" />
          {items.map(({ trend: t, showHeader }) => {
            const level =
              region === "internacional"
                ? t.relevanceInternational.level
                : t.relevanceBrazil.level;
            const isOpen = expanded === t.slug;
            const blurb = t.panorama[region].paragraphs[0];
            return (
              <div key={t.slug}>
                {showHeader && (
                  <div className="mt-5 mb-2 flex items-center gap-2 pl-10 first:mt-0">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/70">
                      {HORIZONS[t.horizon].label}
                    </span>
                    <span className="text-[11px] text-muted-foreground/60">
                      {HORIZONS[t.horizon].years}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => setExpanded(isOpen ? null : t.slug)}
                  aria-expanded={isOpen}
                  className="group relative flex w-full items-center gap-3 rounded-lg py-2 pr-2 text-left transition-colors hover:bg-secondary/70"
                >
                  <span
                    className={cn(
                      "relative z-10 flex size-[30px] shrink-0 items-center justify-center rounded-full border-2 transition-transform group-hover:scale-110",
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
                  <ChevronDown
                    className={cn(
                      "size-3.5 shrink-0 text-muted-foreground transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="mb-2 ml-10 rounded-lg border border-border/50 bg-background/40 p-3">
                    <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                      {blurb}
                    </p>
                    <Link
                      href={`/tendencias/${t.slug}`}
                      className="mt-2 inline-flex items-center gap-1 text-[12px] font-medium text-accent-vivid hover:underline"
                    >
                      Ver tendência completa <ArrowUpRight className="size-3" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
