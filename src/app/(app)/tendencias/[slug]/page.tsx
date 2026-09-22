import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, BookOpen, Lightbulb, Radar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RelevanceBadge } from "@/components/trends/relevance-badge";
import { TrendIcon } from "@/components/trends/trend-icon";
import { TRENDS, getTrendBySlug } from "@/data/trends";
import { HORIZONS, STAGES } from "@/types";
import { getTrendSignals } from "@/lib/trend-signals";

export function generateStaticParams() {
  return TRENDS.map((t) => ({ slug: t.slug }));
}

export default async function TrendDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trend = getTrendBySlug(slug);
  if (!trend) notFound();
  const signals = getTrendSignals(slug);

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 md:px-10">
      <Link
        href="/tendencias"
        className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> Tendências
      </Link>

      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent-vivid">
          <TrendIcon icon={trend.icon} className="size-6" />
        </span>
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-[12px]">{trend.pillar}</Badge>
            <Badge variant="outline" className="text-[12px] text-muted-foreground">
              {HORIZONS[trend.horizon].label} · {HORIZONS[trend.horizon].years}
            </Badge>
          </div>
          <h1 className="text-[26px] font-semibold leading-tight tracking-tight md:text-[30px]">
            {trend.title}
          </h1>
        </div>
      </div>

      <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground max-w-2xl">
        {trend.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <RelevanceBadge prefix="Relevância global" level={trend.relevanceInternational.level} />
        <RelevanceBadge prefix="Relevância Brasil" level={trend.relevanceBrazil.level} />
      </div>

      <Separator className="my-7" />

      <Tabs defaultValue="internacional">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-[15px] font-semibold">Panorama</h2>
          <TabsList>
            <TabsTrigger value="internacional" className="text-[14px]">Internacional</TabsTrigger>
            <TabsTrigger value="brasil" className="text-[14px]">Brasil</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="internacional" className="flex flex-col gap-4">
          {trend.panorama.internacional.paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-foreground/90">
              {p}
            </p>
          ))}
          <SourceList sources={trend.panorama.internacional.sources} />
        </TabsContent>

        <TabsContent value="brasil" className="flex flex-col gap-4">
          {trend.panorama.brasil.paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-foreground/90">
              {p}
            </p>
          ))}
          <SourceList sources={trend.panorama.brasil.sources} />
        </TabsContent>
      </Tabs>

      <Card className="mt-8 border-primary/25 bg-primary/[0.05]">
        <CardContent className="p-5">
          <div className="mb-1.5 text-[12px] font-semibold uppercase tracking-wide text-accent-vivid">
            Brecha Brasil / exterior
          </div>
          <p className="text-[15px] leading-relaxed">{trend.brazilGapNote}</p>
        </CardContent>
      </Card>

      {signals.length > 0 && (
        <section className="mt-9 rounded-xl border border-accent-vivid/25 bg-accent-vivid/[0.05] p-4">
          <h2 className="mb-3 flex items-center gap-1.5 text-[15px] font-semibold">
            <Radar className="size-4 text-accent-vivid" />
            Sinais recentes
            <span className="ml-1 flex items-center gap-1 text-[11px] font-normal text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent-vivid animate-pulse" />
              área viva, atualizada via Incorporar
            </span>
          </h2>
          <div className="flex flex-col gap-2.5">
            {signals.map((s) => (
              <div key={s.id} className="rounded-lg bg-card/60 p-4 ring-1 ring-accent-vivid/15">
                <p className="text-[14px] leading-relaxed">{s.relevance}</p>
                <a
                  href={s.newsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-accent-vivid"
                >
                  {s.newsTitle}
                  <ExternalLink className="size-3 shrink-0" />
                </a>
                <div className="mt-1 text-[11px] text-muted-foreground/70">
                  {s.source} · {new Date(s.capturedAt).toLocaleDateString("pt-BR")}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-9">
        <h2 className="mb-3 text-[15px] font-semibold">Relevância por estágio</h2>
        <div className="flex flex-col gap-2.5">
          {trend.stageRelevance.map((sr) => {
            const stage = STAGES.find((s) => s.id === sr.stage)!;
            return (
              <Card key={sr.stage}>
                <CardContent className="p-4">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-[15px] font-medium">{stage.label}</span>
                    <span className="text-[12px] text-muted-foreground">
                      {stage.years}
                    </span>
                  </div>
                  <p className="text-[14px] leading-relaxed text-muted-foreground">
                    {sr.note}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mt-9">
        <h2 className="mb-3 flex items-center gap-1.5 text-[15px] font-semibold">
          <Lightbulb className="size-4 text-accent-vivid" />
          Ideias sugeridas
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {trend.suggestedIdeas.map((idea, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="text-[14px] font-semibold leading-snug">{idea.title}</div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  {idea.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-9 mb-4">
        <h2 className="mb-3 flex items-center gap-1.5 text-[15px] font-semibold">
          <BookOpen className="size-4 text-accent-vivid" />
          Trajeto de estudo, do zero à maestria
        </h2>
        <div className="flex flex-col gap-2">
          {trend.studyPath.map((r) => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-0.5 rounded-lg border border-border/60 px-4 py-3 hover:border-primary/40 hover:bg-card/60"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[14px] font-medium">{r.title}</span>
                <ExternalLink className="size-3.5 shrink-0 text-muted-foreground group-hover:text-accent-vivid" />
              </div>
              <span className="text-[13px] text-muted-foreground">
                {r.provider} · {r.format}
              </span>
              {r.note && (
                <span className="text-[13px] text-muted-foreground mt-0.5">
                  {r.note}
                </span>
              )}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function SourceList({ sources }: { sources: { title: string; url: string; publisher?: string }[] }) {
  return (
    <div className="flex flex-col gap-2">
      {sources.map((s) => (
        <a
          key={s.url}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start justify-between gap-3 rounded-lg border border-border/60 px-3.5 py-2.5 text-[14px] hover:border-primary/40 hover:bg-card/60"
        >
          <span>
            {s.title}
            {s.publisher && (
              <span className="ml-1.5 text-[13px] text-muted-foreground">
                {s.publisher}
              </span>
            )}
          </span>
          <ExternalLink className="size-3.5 shrink-0 text-muted-foreground group-hover:text-accent-vivid" />
        </a>
      ))}
    </div>
  );
}
