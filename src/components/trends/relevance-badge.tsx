import { cn } from "@/lib/utils";
import type { RelevanceLevel } from "@/types";

const CONFIG: Record<RelevanceLevel, { label: string; className: string }> = {
  baixa: {
    label: "Baixa",
    className: "bg-muted text-muted-foreground border-transparent",
  },
  media: {
    label: "Média",
    className: "bg-secondary text-secondary-foreground border-transparent",
  },
  alta: {
    label: "Alta",
    className: "bg-primary/15 text-accent-vivid border-primary/30",
  },
  critica: {
    label: "Crítica",
    className: "bg-primary text-primary-foreground border-transparent",
  },
};

export function RelevanceBadge({
  level,
  prefix,
}: {
  level: RelevanceLevel;
  prefix?: string;
}) {
  const cfg = CONFIG[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[13px] font-medium leading-none",
        cfg.className
      )}
    >
      {prefix ? `${prefix}: ` : ""}
      {cfg.label}
    </span>
  );
}
