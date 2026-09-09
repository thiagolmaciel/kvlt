import Link from "next/link";
import { Radar, Route, Archive, Newspaper, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TRENDS } from "@/data/trends";
import { STAGES } from "@/types";

const QUICK_LINKS = [
  {
    href: "/tendencias",
    icon: Radar,
    title: "Tendências",
    description: `${TRENDS.length} tópicos mapeados: IA, infraestrutura, regulação e o gap brasileiro.`,
  },
  {
    href: "/roadmaps",
    icon: Route,
    title: "Roadmaps",
    description: "Trajetória individual de Thiago e Rodrigo até maestria técnica e de liderança.",
  },
  {
    href: "/armazem",
    icon: Archive,
    title: "Armazém",
    description: "Drives, links de referência e anotações do dia a dia.",
  },
  {
    href: "/fontes",
    icon: Newspaper,
    title: "Fontes",
    description: "Curadoria de imprensa e pesquisa de mercado, Brasil e internacional.",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Visão Geral"
        description="Estruturação da empresa em 4 estágios, do primeiro serviço faturado até Big Tech."
      />

      <div className="px-6 py-6 md:px-8 flex flex-col gap-8">
        <section>
          <h2 className="mb-3 text-[14px] font-medium text-muted-foreground">
            Estágios da empresa
          </h2>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {STAGES.map((stage, i) => (
              <Card key={stage.id} className="relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="text-[12px] text-muted-foreground">
                    Estágio {i + 1}
                  </div>
                  <div className="mt-1 text-[16px] font-semibold">{stage.label}</div>
                  <div className="mt-1 text-[13px] text-muted-foreground">
                    {stage.years}
                  </div>
                </CardContent>
                {i === 0 && (
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-primary" />
                )}
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-[14px] font-medium text-muted-foreground">
            Navegar
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {QUICK_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <Card className="h-full transition-colors hover:border-primary/40 hover:bg-card/80">
                  <CardHeader className="gap-2">
                    <link.icon className="size-5 text-accent-vivid" />
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
    </div>
  );
}
