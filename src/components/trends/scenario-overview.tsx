"use client";

import { ExternalLink, Globe2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SCENARIO_OVERVIEW } from "@/data/overview";

export function ScenarioOverview() {
  return (
    <div className="rounded-xl border border-border/60 bg-card/30 p-5 md:p-6">
      <Tabs defaultValue="internacional">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Globe2 className="size-4 text-accent-vivid" />
            <h2 className="text-[15px] font-semibold">Panorama do cenário atual</h2>
          </div>
          <TabsList>
            <TabsTrigger value="internacional" className="text-[13px]">Internacional</TabsTrigger>
            <TabsTrigger value="brasil" className="text-[13px]">Brasil</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="internacional" className="flex flex-col gap-3">
          {SCENARIO_OVERVIEW.internacional.paragraphs.map((p, i) => (
            <p key={i} className="text-[14px] leading-relaxed text-foreground/90">
              {p}
            </p>
          ))}
          <SourceRow sources={SCENARIO_OVERVIEW.internacional.sources} />
        </TabsContent>
        <TabsContent value="brasil" className="flex flex-col gap-3">
          {SCENARIO_OVERVIEW.brasil.paragraphs.map((p, i) => (
            <p key={i} className="text-[14px] leading-relaxed text-foreground/90">
              {p}
            </p>
          ))}
          <SourceRow sources={SCENARIO_OVERVIEW.brasil.sources} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SourceRow({ sources }: { sources: { title: string; url: string; publisher?: string }[] }) {
  return (
    <div className="mt-1 flex flex-wrap gap-2">
      {sources.map((s) => (
        <a
          key={s.url}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-border/60 px-2.5 py-1 text-[12px] text-muted-foreground hover:border-primary/40 hover:text-foreground"
        >
          {s.publisher ?? s.title}
          <ExternalLink className="size-2.5" />
        </a>
      ))}
    </div>
  );
}
