"use client";

import { useState } from "react";
import { ExternalLink, Code2, Briefcase, Users, Brain, Layers3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { FounderRoadmap, RoadmapLevel, RoadmapTrack } from "@/types";

const LEVEL_LABEL: Record<RoadmapLevel, string> = {
  fundacao: "Fundação",
  consolidacao: "Consolidação",
  maestria: "Maestria",
  lideranca: "Liderança",
};

const TRACK_ICONS: Record<RoadmapTrack["icon"], typeof Code2> = {
  "code-2": Code2,
  briefcase: Briefcase,
  users: Users,
  brain: Brain,
};

function RoadmapPanel({ roadmap }: { roadmap: FounderRoadmap }) {
  const totalResources = roadmap.milestones.reduce(
    (acc, m) => acc + m.resources.length,
    0
  );

  return (
    <div className="grid min-w-0 gap-8 lg:grid-cols-[1fr_280px]">
      <div className="relative order-2 min-w-0 flex flex-col gap-10 pl-7 before:absolute before:left-[9px] before:top-3 before:bottom-3 before:w-px before:bg-border lg:order-1">
        {roadmap.milestones.map((m, i) => (
          <div
            key={i}
            id={`${roadmap.name}-m${i}`}
            className="relative scroll-mt-20 animate-fade-up"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <span className="absolute -left-7 top-1.5 flex size-[19px] items-center justify-center rounded-full border-2 border-primary bg-background">
              <span
                className={`size-2 rounded-full bg-primary ${i === 0 ? "animate-ring-pulse" : ""}`}
              />
            </span>

            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-[12px] text-muted-foreground">
                {m.period}
              </Badge>
              <Badge className="text-[12px] bg-secondary text-secondary-foreground">
                {LEVEL_LABEL[m.level]}
              </Badge>
            </div>

            <h3 className="text-[19px] font-semibold leading-snug">{m.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground max-w-2xl">
              {m.goal}
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {m.tracks.map((track, ti) => {
                const Icon = TRACK_ICONS[track.icon];
                return (
                  <div
                    key={ti}
                    className="rounded-lg border border-border/60 bg-card/40 p-3.5"
                  >
                    <div className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-accent-vivid">
                      <Icon className="size-3.5" />
                      {track.label}
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {track.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-[14px] leading-relaxed text-foreground/90"
                        >
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {m.resources.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 rounded-full border border-border/60 px-2.5 py-1 text-[13px] hover:border-primary/40 hover:bg-card/60"
                  title={r.note}
                >
                  {r.title}
                  <ExternalLink className="size-3 text-muted-foreground group-hover:text-accent-vivid" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <aside className="order-1 lg:order-2">
        <div className="flex flex-col gap-4 lg:sticky lg:top-6">
          <Card className="border-primary/25 bg-primary/[0.05]">
            <CardContent className="p-4 flex flex-col gap-2.5">
              <div className="text-[12px] font-semibold uppercase tracking-wide text-accent-vivid">
                Snapshot atual
              </div>
              <p className="text-[14px] leading-relaxed">{roadmap.currentSnapshot}</p>
              <div className="mt-1 text-[13px] leading-relaxed text-muted-foreground italic">
                {roadmap.philosophy}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-2.5">
            <Card>
              <CardContent className="p-3.5">
                <div className="text-[20px] font-semibold">{roadmap.milestones.length}</div>
                <div className="text-[12px] text-muted-foreground">marcos</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3.5">
                <div className="text-[20px] font-semibold">{totalResources}</div>
                <div className="text-[12px] text-muted-foreground">recursos</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="mb-2.5 flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
                <Layers3 className="size-3.5" />
                Nesta rota
              </div>
              <nav className="flex flex-col gap-1">
                {roadmap.milestones.map((m, i) => (
                  <a
                    key={i}
                    href={`#${roadmap.name}-m${i}`}
                    className="rounded-md px-2 py-1.5 text-[13px] text-muted-foreground leading-snug hover:bg-secondary hover:text-foreground"
                  >
                    {LEVEL_LABEL[m.level]}
                    <span className="block text-[11px] text-muted-foreground/70">
                      {m.period}
                    </span>
                  </a>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>
      </aside>
    </div>
  );
}

export function RoadmapView({
  thiago,
  rodrigo,
}: {
  thiago: FounderRoadmap;
  rodrigo: FounderRoadmap;
}) {
  const [tab, setTab] = useState("thiago");

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList>
        <TabsTrigger value="thiago" className="text-[15px]">
          Thiago
        </TabsTrigger>
        <TabsTrigger value="rodrigo" className="text-[15px]">
          Rodrigo
        </TabsTrigger>
      </TabsList>
      <TabsContent value="thiago" className="mt-6">
        <RoadmapPanel roadmap={thiago} />
      </TabsContent>
      <TabsContent value="rodrigo" className="mt-6">
        <RoadmapPanel roadmap={rodrigo} />
      </TabsContent>
    </Tabs>
  );
}
