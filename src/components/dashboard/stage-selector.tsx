"use client";

import { useState } from "react";
import { Lock, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { STAGES } from "@/types";

export function StageSelector({ currentIndex = 0 }: { currentIndex?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openStage = openIndex !== null ? STAGES[openIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {STAGES.map((stage, i) => {
          const isCurrent = i === currentIndex;
          const isPast = i < currentIndex;
          const isFuture = i > currentIndex;
          return (
            <button
              key={stage.id}
              onClick={() => setOpenIndex(i)}
              style={{ animationDelay: `${i * 70}ms` }}
              className={cn(
                "group relative flex animate-fade-up flex-col overflow-hidden rounded-xl border p-4 text-left transition-all duration-200",
                isCurrent
                  ? "border-primary/50 bg-primary/[0.06] shadow-[0_0_0_1px_rgba(60,0,255,0.15)] hover:shadow-[0_0_0_1px_rgba(60,0,255,0.3)]"
                  : "border-border/60 bg-card/40 hover:border-border hover:bg-card",
                isFuture && "opacity-70 hover:opacity-100"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-muted-foreground">
                  Estágio {i + 1}
                </span>
                {isCurrent && (
                  <span className="flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                    <Sparkles className="size-2.5" /> AGORA
                  </span>
                )}
                {isFuture && (
                  <Lock className="size-3 text-muted-foreground/60" />
                )}
                {isPast && (
                  <span className="text-[10px] font-medium text-accent-vivid">
                    concluído
                  </span>
                )}
              </div>

              <div
                className={cn(
                  "mt-2 text-[19px] font-semibold leading-tight",
                  isCurrent && "text-foreground"
                )}
              >
                {stage.label}
              </div>
              <div className="mt-0.5 text-[12px] text-muted-foreground">
                {stage.years}
              </div>
              <div className="mt-2 text-[12px] leading-snug text-muted-foreground/90">
                {stage.tagline}
              </div>

              {isCurrent && (
                <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
              )}
            </button>
          );
        })}
      </div>

      <Dialog open={openIndex !== null} onOpenChange={(v) => !v && setOpenIndex(null)}>
        <DialogContent className="max-w-md">
          {openStage && (
            <>
              <DialogHeader>
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-[11px] font-medium text-muted-foreground">
                    Estágio {(openIndex ?? 0) + 1} · {openStage.years}
                  </span>
                  {openIndex === currentIndex && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                      AGORA
                    </span>
                  )}
                </div>
                <DialogTitle className="text-[20px]">{openStage.label}</DialogTitle>
              </DialogHeader>
              <p className="text-[14px] leading-relaxed text-muted-foreground">
                {openStage.description}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
