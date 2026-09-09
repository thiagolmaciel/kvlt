"use client";

import { useRouter } from "next/navigation";
import { TrendIcon } from "@/components/trends/trend-icon";
import { cn } from "@/lib/utils";
import type { RelevanceLevel, TrendTopic, Horizon } from "@/types";
import { HORIZONS } from "@/types";

const HORIZON_ORDER: Record<Horizon, number> = { curto: 0, medio: 1, longo: 2 };

const DOT_SIZE: Record<RelevanceLevel, string> = {
  critica: "size-3",
  alta: "size-2.5",
  media: "size-2",
  baixa: "size-[6px]",
};

const DOT_STYLE: Record<RelevanceLevel, string> = {
  critica: "bg-primary",
  alta: "bg-accent-vivid",
  media: "bg-muted-foreground/70",
  baixa: "bg-muted-foreground/40",
};

export function TrendProgressionTree({
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
    <div className="flex h-full max-h-[420px] flex-col rounded-lg border border-border/60 bg-background/40 p-3">
      <div className="mb-1 px-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70">
        Progressão no tempo
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="relative flex flex-col pl-4">
          <span className="absolute left-[5px] top-2 bottom-2 w-px bg-border" />
          {items.map(({ trend: t, showHeader }) => {
            const level =
              region === "internacional"
                ? t.relevanceInternational.level
                : t.relevanceBrazil.level;
            return (
              <div key={t.slug}>
                {showHeader && (
                  <div className="relative mt-3 mb-1.5 first:mt-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                      {HORIZONS[t.horizon].label}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => router.push(`/tendencias/${t.slug}`)}
                  className="group relative flex w-full items-center gap-2.5 rounded-md py-1.5 pr-1 text-left transition-colors hover:bg-secondary"
                >
                  <span
                    className={cn(
                      "absolute -left-4 top-1/2 -translate-y-1/2 rounded-full transition-transform group-hover:scale-125",
                      DOT_SIZE[level],
                      DOT_STYLE[level]
                    )}
                  />
                  <TrendIcon
                    icon={t.icon}
                    className="size-3.5 shrink-0 text-muted-foreground group-hover:text-accent-vivid"
                  />
                  <span className="truncate text-[12.5px] leading-tight text-foreground/90 group-hover:text-foreground">
                    {t.title.split(" (")[0]}
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
