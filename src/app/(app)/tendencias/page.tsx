"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { RelevanceBadge } from "@/components/trends/relevance-badge";
import { TrendIcon } from "@/components/trends/trend-icon";
import { TrendConstellation } from "@/components/trends/trend-constellation";
import { ScenarioOverview } from "@/components/trends/scenario-overview";
import { PanoramaTrendMap } from "@/components/trends/panorama-trend-map";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TRENDS } from "@/data/trends";
import { HORIZONS, STAGES } from "@/types";

export default function TendenciasPage() {
  const [region, setRegion] = useState<"internacional" | "brasil">("internacional");

  return (
    <div>
      <PageHeader
        title="Tendências"
        description="Panorama de até 10 anos à frente, com foco no exterior, sempre marcando onde o delay sul-americano vira oportunidade."
      />

      <div className="px-6 py-6 md:px-10 flex flex-col gap-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <ScenarioOverview region={region} onRegionChange={setRegion} />
          <PanoramaTrendMap trends={TRENDS} region={region} />
        </div>

        <Tabs defaultValue="todas">
          <TabsList>
            <TabsTrigger value="todas" className="text-[15px]">Grade</TabsTrigger>
            <TabsTrigger value="mapa" className="text-[15px]">Mapa</TabsTrigger>
            <TabsTrigger value="estagios" className="text-[15px]">Por estágio</TabsTrigger>
          </TabsList>

          <TabsContent value="todas" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {TRENDS.map((trend) => (
                <Link key={trend.slug} href={`/tendencias/${trend.slug}`}>
                  <Card className="h-full transition-colors hover:border-primary/40 hover:bg-card/80">
                    <CardHeader className="gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex size-9 items-center justify-center rounded-md bg-secondary text-accent-vivid">
                          <TrendIcon icon={trend.icon} className="size-[18px]" />
                        </span>
                        <span className="inline-flex items-center gap-1 text-[12px] text-muted-foreground">
                          <Clock className="size-3" />
                          {HORIZONS[trend.horizon].label}
                        </span>
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-1.5 text-[11px]">
                          {trend.pillar}
                        </Badge>
                        <h3 className="text-[17px] font-semibold leading-snug">
                          {trend.title}
                        </h3>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                      <p className="text-[14px] leading-relaxed text-muted-foreground line-clamp-3">
                        {trend.summary}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        <RelevanceBadge prefix="Global" level={trend.relevanceInternational.level} />
                        <RelevanceBadge prefix="Brasil" level={trend.relevanceBrazil.level} />
                      </div>
                      <span className="inline-flex items-center gap-1 text-[13px] text-accent-vivid">
                        Ver detalhes <ArrowRight className="size-3" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mapa" className="mt-6">
            <p className="mb-4 text-[14px] leading-relaxed text-muted-foreground">
              Cada ponto é um tópico posicionado no tempo (eixo horizontal) e dimensionado pela relevância combinada. Passe o cursor para ler o resumo, clique para abrir.
            </p>
            <TrendConstellation trends={TRENDS} />
          </TabsContent>

          <TabsContent value="estagios" className="mt-6">
            <div className="flex flex-col gap-8">
              {STAGES.map((stage) => {
                const items = TRENDS.filter((t) =>
                  t.stageRelevance.some((s) => s.stage === stage.id)
                );
                if (items.length === 0) return null;
                return (
                  <section key={stage.id}>
                    <div className="mb-3 flex items-baseline gap-2">
                      <h3 className="text-[16px] font-semibold">{stage.label}</h3>
                      <span className="text-[13px] text-muted-foreground">
                        {stage.years}
                      </span>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                      {items.map((trend) => {
                        const rel = trend.stageRelevance.find(
                          (s) => s.stage === stage.id
                        )!;
                        return (
                          <Link key={trend.slug} href={`/tendencias/${trend.slug}`}>
                            <Card className="h-full transition-colors hover:border-primary/40">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2 text-[15px] font-medium">
                                  <TrendIcon icon={trend.icon} className="size-4 text-accent-vivid" />
                                  {trend.title}
                                </div>
                                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                                  {rel.note}
                                </p>
                              </CardContent>
                            </Card>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
