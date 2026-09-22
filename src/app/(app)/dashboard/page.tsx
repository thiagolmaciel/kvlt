import Link from "next/link";
import { Radar, Route, Archive, Newspaper, ArrowRight, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StageSelector } from "@/components/dashboard/stage-selector";
import { AiNewsBand } from "@/components/dashboard/ai-news-band";
import { JaguaraInvite } from "@/components/jaguara/jaguara-invite";
import { TrendIcon } from "@/components/trends/trend-icon";
import { TRENDS } from "@/data/trends";
import { ROADMAP_THIAGO, ROADMAP_RODRIGO } from "@/data/roadmaps";
import { WAREHOUSE_ITEMS } from "@/data/warehouse";
import { INFO_SOURCES } from "@/data/sources";

const QUICK_LINKS = [
  {
    href: "/tendencias",
    icon: Radar,
    title: "Tendências",
    description: "Panorama internacional e brasileiro, tópico a tópico.",
    stat: `${TRENDS.length} tópicos`,
  },
  {
    href: "/roadmaps/completo",
    icon: Route,
    title: "Roadmaps",
    description: "Trajetória de Thiago e Rodrigo até maestria e liderança.",
    stat: `${ROADMAP_THIAGO.milestones.length + ROADMAP_RODRIGO.milestones.length} marcos`,
  },
  {
    href: "/armazem",
    icon: Archive,
    title: "Armazém",
    description: "Drives, links de referência e anotações operacionais.",
    stat: `${WAREHOUSE_ITEMS.length} itens`,
  },
  {
    href: "/fontes",
    icon: Newspaper,
    title: "Fontes",
    description: "Curadoria de imprensa, Brasil e internacional.",
    stat: `${INFO_SOURCES.length} fontes`,
  },
];

const FOCUS_IDEAS = TRENDS.filter((t) =>
  t.stageRelevance.some((s) => s.stage === "money-maker")
)
  .slice(0, 3)
  .map((t) => ({ trend: t, idea: t.suggestedIdeas[0] }));

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-10 px-6 py-8 md:px-10">
      <AiNewsBand />

      <section className="relative flex items-center justify-between gap-8 overflow-hidden">
        <div className="relative z-10 animate-fade-up">
          <div className="text-[13px] font-medium uppercase tracking-wide text-accent-vivid">
            Painel privado
          </div>
          <h1 className="mt-2 text-[32px] font-semibold leading-[1.1] tracking-tight md:text-[40px]">
            De prestação de serviço a{" "}
            <span className="bg-gradient-to-r from-accent-vivid to-primary bg-clip-text text-transparent">
              Big Tech
            </span>
            .
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            Quatro estágios, um plano mutável. Esta é a base de estruturação da
            empresa: tendências pesquisadas, rota individual de cada fundador e
            o material de referência acumulado no caminho.
          </p>
        </div>

        <JaguaraInvite />
      </section>

      <section>
        <h2 className="mb-3 text-[13px] font-medium uppercase tracking-wide text-muted-foreground">
          Estágios da empresa
        </h2>
        <StageSelector currentIndex={0} />
      </section>

      {FOCUS_IDEAS.length > 0 && (
        <section className="animate-fade-up" style={{ animationDelay: "180ms" }}>
          <div className="mb-3 flex items-center gap-1.5">
            <Flame className="size-4 text-accent-vivid" />
            <h2 className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground">
              Foco agora, estágio Bootstrap
            </h2>
          </div>
          <div className="flex flex-col gap-2.5">
            {FOCUS_IDEAS.map(({ trend, idea }) => (
              <Link key={trend.slug} href={`/tendencias/${trend.slug}`}>
                <Card className="transition-colors hover:border-primary/40 hover:bg-card/80">
                  <CardContent className="flex items-start gap-3 p-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-accent-vivid">
                      <TrendIcon icon={trend.icon} className="size-[18px]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] font-semibold leading-snug">
                        {idea.title}
                      </div>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground line-clamp-2">
                        {idea.description}
                      </p>
                      <div className="mt-1.5 text-[11px] text-muted-foreground/80">
                        de {trend.title}
                      </div>
                    </div>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-[13px] font-medium uppercase tracking-wide text-muted-foreground">
          Navegar
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {QUICK_LINKS.map((link, i) => (
            <Link key={link.href} href={link.href}>
              <Card
                style={{ animationDelay: `${i * 60}ms` }}
                className="h-full animate-fade-up transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card/80"
              >
                <CardHeader className="gap-2">
                  <div className="flex items-center justify-between">
                    <link.icon className="size-5 text-accent-vivid" />
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
                      {link.stat}
                    </span>
                  </div>
                  <CardTitle className="text-[16px]">{link.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">
                    {link.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[13px] text-accent-vivid">
                    Abrir <ArrowRight className="size-3" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
