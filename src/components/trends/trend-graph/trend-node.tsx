import { Handle, Position, type NodeProps } from "@xyflow/react";
import { TrendIcon } from "@/components/trends/trend-icon";
import { cn } from "@/lib/utils";
import type { RelevanceLevel, TrendIcon as TrendIconType } from "@/types";

const NODE_STYLE: Record<RelevanceLevel, string> = {
  critica: "border-primary bg-primary text-primary-foreground",
  alta: "border-primary/60 bg-primary/20 text-accent-vivid",
  media: "border-border bg-secondary text-muted-foreground",
  baixa: "border-border bg-secondary/60 text-muted-foreground/70",
};

const SIZE: Record<RelevanceLevel, number> = {
  critica: 46,
  alta: 40,
  media: 34,
  baixa: 30,
};

export interface TrendNodeData extends Record<string, unknown> {
  label: string;
  icon: TrendIconType;
  level: RelevanceLevel;
  [key: string]: unknown;
}

export function TrendNode({ data, selected }: NodeProps) {
  const d = data as TrendNodeData;
  const size = SIZE[d.level];
  return (
    <div className="flex flex-col items-center gap-1.5" style={{ width: 110 }}>
      <Handle type="target" position={Position.Left} className="opacity-0" />
      <span
        className={cn(
          "flex items-center justify-center rounded-full border-2 transition-transform",
          NODE_STYLE[d.level],
          selected && "scale-110 ring-2 ring-accent-vivid ring-offset-2 ring-offset-background"
        )}
        style={{ width: size, height: size }}
      >
        <TrendIcon icon={d.icon} className="size-[45%]" />
      </span>
      <span className="max-w-[110px] text-balance text-center text-[11px] font-medium leading-tight text-foreground/90">
        {d.label}
      </span>
      <Handle type="source" position={Position.Right} className="opacity-0" />
    </div>
  );
}
