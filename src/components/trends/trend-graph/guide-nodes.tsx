export function ZoneLabelNode({ data }: { data: { label: string; years: string } }) {
  return (
    <div className="pointer-events-none select-none whitespace-nowrap">
      <div className="text-[12px] font-semibold uppercase tracking-wider text-foreground/60">
        {data.label}
      </div>
      <div className="mt-0.5 text-[11px] text-muted-foreground/50">{data.years}</div>
    </div>
  );
}

export function ZoneDividerNode({ data }: { data: { height: number } }) {
  return (
    <div
      className="pointer-events-none w-px border-l border-dashed border-border/60"
      style={{ height: data.height }}
    />
  );
}

export function AxisNode({ data }: { data: { width: number } }) {
  return (
    <div
      className="pointer-events-none h-px bg-border/50"
      style={{ width: data.width }}
    />
  );
}

export function YearTickNode({ data }: { data: { year: string } }) {
  return (
    <div className="pointer-events-none flex select-none flex-col items-center">
      <span className="h-2 w-px bg-border/60" />
      <span className="mt-1 text-[10.5px] font-medium text-muted-foreground/60">
        {data.year}
      </span>
    </div>
  );
}
