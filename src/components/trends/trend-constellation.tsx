"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrendIcon } from "@/components/trends/trend-icon";
import type { RelevanceLevel, TrendTopic } from "@/types";
import { HORIZONS } from "@/types";
import { cn } from "@/lib/utils";

const POSITIONS: Record<string, { x: number; y: number }> = {
  "ia-agentica": { x: 14, y: 20 },
  "ia-nativa-desenvolvimento": { x: 24, y: 55 },
  "talento-remoto-nearshoring": { x: 10, y: 82 },
  "seguranca-fraude-ia": { x: 30, y: 15 },
  "pix-infraestrutura-financeira": { x: 27, y: 88 },
  "ia-vertical-saas": { x: 50, y: 22 },
  "governanca-regulacao-ia": { x: 58, y: 58 },
  "upskilling-corporativo-ia": { x: 48, y: 86 },
  "edge-ai-modelos-pequenos": { x: 82, y: 40 },
  "energia-datacenters-ia": { x: 88, y: 74 },
};

const RADIUS: Record<RelevanceLevel, number> = {
  critica: 15,
  alta: 12,
  media: 10,
  baixa: 8,
};

function combinedLevel(t: TrendTopic): RelevanceLevel {
  const order: RelevanceLevel[] = ["baixa", "media", "alta", "critica"];
  const a = order.indexOf(t.relevanceInternational.level);
  const b = order.indexOf(t.relevanceBrazil.level);
  return order[Math.max(a, b)];
}

export function TrendConstellation({ trends }: { trends: TrendTopic[] }) {
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);
  const activeTrend = trends.find((t) => t.slug === active);

  return (
    <div className="rounded-lg border border-border/60 bg-card/30">
      <div className="relative h-[440px] w-full overflow-hidden">
        {(["curto", "medio", "longo"] as const).map((h, i) => (
          <div
            key={h}
            className="pointer-events-none absolute inset-y-0 flex flex-col justify-between py-3"
            style={{ left: `${i * (100 / 3)}%`, width: `${100 / 3}%` }}
          >
            <span className="px-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
              {HORIZONS[h].label}
            </span>
            {i > 0 && (
              <span className="absolute inset-y-0 left-0 w-px bg-border/50" />
            )}
          </div>
        ))}

        {trends.map((t) => {
          const pos = POSITIONS[t.slug] ?? { x: 50, y: 50 };
          const level = combinedLevel(t);
          const r = RADIUS[level];
          const isActive = active === t.slug;
          return (
            <button
              key={t.slug}
              onMouseEnter={() => setActive(t.slug)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(t.slug)}
              onBlur={() => setActive(null)}
              onClick={() => router.push(`/tendencias/${t.slug}`)}
              className="group absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-200 ease-out"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: r * 2 + 16,
                height: r * 2 + 16,
                transform: `translate(-50%, -50%) scale(${isActive ? 1.15 : 1})`,
              }}
              aria-label={t.title}
            >
              <span
                className={cn(
                  "flex items-center justify-center rounded-full border transition-colors",
                  level === "critica"
                    ? "border-primary bg-primary text-primary-foreground"
                    : level === "alta"
                      ? "border-primary/60 bg-primary/20 text-accent-vivid"
                      : "border-border bg-secondary text-muted-foreground"
                )}
                style={{ width: r * 2, height: r * 2 }}
              >
                <TrendIcon icon={t.icon} className="size-[55%]" />
              </span>
            </button>
          );
        })}

        {activeTrend && (
          <div
            className="pointer-events-none absolute z-10 w-64 rounded-lg border border-border bg-popover p-3.5 text-popover-foreground shadow-lg"
            style={{
              left: `${Math.min(Math.max(POSITIONS[activeTrend.slug]?.x ?? 50, 14), 86)}%`,
              top: `${(POSITIONS[activeTrend.slug]?.y ?? 50) > 55 ? (POSITIONS[activeTrend.slug]?.y ?? 50) - 8 : (POSITIONS[activeTrend.slug]?.y ?? 50) + 8}%`,
              transform: `translate(-50%, ${(POSITIONS[activeTrend.slug]?.y ?? 50) > 55 ? "-100%" : "0"})`,
            }}
          >
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
              {activeTrend.pillar}
            </div>
            <div className="mt-0.5 text-[14px] font-semibold leading-snug">
              {activeTrend.title}
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
              {activeTrend.summary}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-border/60 px-4 py-3 text-[12px] text-muted-foreground">
        <span className="font-medium text-foreground/80">Relevância combinada:</span>
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-full border border-primary bg-primary" /> Crítica
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-full border border-primary/60 bg-primary/20" /> Alta
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-full border border-border bg-secondary" /> Média / baixa
        </span>
      </div>
    </div>
  );
}
