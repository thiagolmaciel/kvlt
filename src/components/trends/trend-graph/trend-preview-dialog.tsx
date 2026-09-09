import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RelevanceBadge } from "@/components/trends/relevance-badge";
import { TrendIcon } from "@/components/trends/trend-icon";
import { Badge } from "@/components/ui/badge";
import { HORIZONS } from "@/types";
import type { TrendTopic } from "@/types";

export function TrendPreviewDialog({
  trend,
  onOpenChange,
}: {
  trend: TrendTopic | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={!!trend} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        {trend && (
          <>
            <DialogHeader>
              <div className="mb-1 flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent-vivid">
                  <TrendIcon icon={trend.icon} className="size-5" />
                </span>
                <div className="min-w-0">
                  <Badge variant="secondary" className="mb-1 text-[10px]">
                    {trend.pillar}
                  </Badge>
                  <DialogTitle className="text-[16px] leading-snug">
                    {trend.title}
                  </DialogTitle>
                </div>
              </div>
            </DialogHeader>

            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {trend.summary}
            </p>

            <div className="flex flex-wrap gap-1.5">
              <RelevanceBadge prefix="Global" level={trend.relevanceInternational.level} />
              <RelevanceBadge prefix="Brasil" level={trend.relevanceBrazil.level} />
              <Badge variant="outline" className="text-[11px] text-muted-foreground">
                {HORIZONS[trend.horizon].label}
              </Badge>
            </div>

            <Button
              render={<Link href={`/tendencias/${trend.slug}`} />}
              nativeButton={false}
              className="mt-1 w-full gap-1.5"
            >
              Ver tendência completa
              <ArrowUpRight className="size-4" />
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
