"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrendGraph } from "@/components/trends/trend-graph/trend-graph";
import type { TrendTopic } from "@/types";

export function TrendMapDialog({ trends }: { trends: TrendTopic[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="gap-1.5 text-[12.5px]" />
        }
      >
        <Maximize2 className="size-3.5" />
        Abrir mapa
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="flex h-[88vh] w-[95vw] max-w-[1400px] flex-col gap-0 overflow-hidden p-0 sm:max-w-[1400px]"
      >
        <DialogHeader className="flex-row items-center justify-between gap-3 border-b border-border/60 px-5 py-3.5">
          <DialogTitle className="text-[15px]">Mapa de tendências</DialogTitle>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Fechar
          </Button>
        </DialogHeader>

        <TrendGraph trends={trends} className="min-h-0 flex-1" />
      </DialogContent>
    </Dialog>
  );
}
