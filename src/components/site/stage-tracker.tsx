import { STAGES } from "@/types";
import { cn } from "@/lib/utils";

export function StageTracker({
  currentIndex = 0,
  orientation = "vertical",
  onBrand = false,
  className,
}: {
  currentIndex?: number;
  orientation?: "vertical" | "horizontal";
  onBrand?: boolean;
  className?: string;
}) {
  if (orientation === "horizontal") {
    return (
      <div className={cn("flex items-center", className)}>
        {STAGES.map((stage, i) => (
          <div key={stage.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <span
                className={cn(
                  "flex size-2.5 rounded-full",
                  onBrand
                    ? i <= currentIndex
                      ? "bg-white"
                      : "bg-white/30"
                    : cn(
                        i < currentIndex && "bg-accent-vivid",
                        i === currentIndex && "bg-primary",
                        i > currentIndex && "bg-border"
                      ),
                  i === currentIndex && "animate-ring-pulse"
                )}
              />
              <span
                className={cn(
                  "text-[12px] font-medium",
                  onBrand
                    ? i === currentIndex
                      ? "text-white"
                      : "text-white/55"
                    : i === currentIndex
                      ? "text-foreground"
                      : "text-muted-foreground"
                )}
              >
                {stage.label}
              </span>
            </div>
            {i < STAGES.length - 1 && (
              <span
                className={cn(
                  "mx-2 h-px flex-1",
                  onBrand
                    ? i < currentIndex
                      ? "bg-white/60"
                      : "bg-white/20"
                    : i < currentIndex
                      ? "bg-accent-vivid"
                      : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("relative flex flex-col gap-4 pl-3", className)}>
      <span className="absolute left-[3px] top-1.5 bottom-1.5 w-px bg-border" />
      {STAGES.map((stage, i) => (
        <div key={stage.id} className="relative flex items-start gap-2.5">
          <span
            className={cn(
              "absolute -left-3 top-1 size-[7px] rounded-full",
              i < currentIndex && "bg-accent-vivid",
              i === currentIndex && "bg-primary animate-ring-pulse",
              i > currentIndex && "bg-border"
            )}
          />
          <div>
            <div
              className={cn(
                "text-[13px] leading-none font-medium",
                i === currentIndex ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {stage.label}
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground/80">
              {stage.years}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
