import { TRENDS } from "@/data/trends";
import { ROADMAP_THIAGO, ROADMAP_RODRIGO } from "@/data/roadmaps";
import { WAREHOUSE_ITEMS } from "@/data/warehouse";
import { INFO_SOURCES } from "@/data/sources";
import { SCENARIO_OVERVIEW } from "@/data/overview";
import { STAGES, HORIZONS } from "@/types";
import type { FounderRoadmap } from "@/types";

function dumpRoadmap(r: FounderRoadmap): string {
  const lines: string[] = [];
  lines.push(`### Roadmap de ${r.name} (${r.role})`);
  lines.push(`Situação atual: ${r.currentSnapshot}`);
  lines.push(`Princípio orientador: ${r.philosophy}`);
  for (const m of r.milestones) {
    lines.push(`- [${m.period} · ${m.level}] ${m.title}`);
    lines.push(`  Objetivo: ${m.goal}`);
    for (const track of m.tracks) {
      lines.push(`  Trilha ${track.label}: ${track.items.join(" | ")}`);
    }
    lines.push(
      `  Recursos: ${m.resources.map((res) => `${res.title} (${res.provider})`).join(", ")}`
    );
  }
  return lines.join("\n");
}

export function buildJaguaraContext(): string {
  const sections: string[] = [];

  sections.push(`## Estágios da empresa
${STAGES.map((s) => `- ${s.label} (${s.years}): ${s.tagline}. ${s.description}`).join("\n")}`);

  sections.push(`## Panorama geral do cenário atual

### Internacional
${SCENARIO_OVERVIEW.internacional.paragraphs.join("\n\n")}
Fontes: ${SCENARIO_OVERVIEW.internacional.sources.map((s) => `${s.title} (${s.publisher ?? ""}) ${s.url}`).join("; ")}

### Brasil
${SCENARIO_OVERVIEW.brasil.paragraphs.join("\n\n")}
Fontes: ${SCENARIO_OVERVIEW.brasil.sources.map((s) => `${s.title} (${s.publisher ?? ""}) ${s.url}`).join("; ")}`);

  sections.push(`## Tendências mapeadas (${TRENDS.length} tópicos)

${TRENDS.map((t) => `### ${t.title} (${t.pillar}, ${HORIZONS[t.horizon].label})
Resumo: ${t.summary}
Relevância global: ${t.relevanceInternational.level} — ${t.relevanceInternational.note}
Relevância Brasil: ${t.relevanceBrazil.level} — ${t.relevanceBrazil.note}
Brecha Brasil/exterior: ${t.brazilGapNote}
Panorama internacional: ${t.panorama.internacional.paragraphs.join(" ")}
Panorama Brasil: ${t.panorama.brasil.paragraphs.join(" ")}
Relevância por estágio: ${t.stageRelevance.map((s) => `${s.stage}: ${s.note}`).join(" | ")}
Ideias sugeridas: ${t.suggestedIdeas.map((i) => `${i.title} — ${i.description}`).join(" | ")}
Trajeto de estudo: ${t.studyPath.map((r) => `${r.title} (${r.provider})`).join(", ")}`).join("\n\n")}`);

  sections.push(`## Roadmaps individuais

${dumpRoadmap(ROADMAP_THIAGO)}

${dumpRoadmap(ROADMAP_RODRIGO)}`);

  sections.push(`## Armazém (drives, links, anotações)

${WAREHOUSE_ITEMS.map((w) => `- [${w.category}/${w.status}] ${w.title}: ${w.description}${w.url ? ` (${w.url})` : ""}`).join("\n")}`);

  sections.push(`## Fontes de acompanhamento (imprensa e pesquisa de mercado)

${INFO_SOURCES.map((s) => `- ${s.name} (${s.region}, ${s.category}): ${s.note} — ${s.url}`).join("\n")}`);

  return sections.join("\n\n");
}

export const JAGUARA_PERSONA = `Você é o Jaguara, o assistente de IA interno do KVLT — o painel privado de estruturação da empresa que Thiago e Rodrigo estão construindo, do estágio Bootstrap até Big Tech. Só vocês dois usam isto, então o tom é de implicância entre amigos, não atendimento ao cliente.

Estilo de resposta:
- Fale estilo "caveman": direto, frases curtas, sem enrolação, sem gentileza artificial, sem "claro!" ou "ótima pergunta!". Vá direto ao ponto.
- Seja grosseiro e zoeiro com quem pergunta — pode xingar, cutucar, tirar sarro. É brincadeira entre fundadores, não atendimento formal. Não use preconceito, discurso de ódio ou ataque a características pessoais reais (raça, corpo, etc) — o deboche é sobre a pergunta/situação, não sobre quem a pessoa é.
- Mesmo debochando, a resposta técnica tem que estar certa. Piada não substitui informação.

Regras de busca e fonte:
- Se a pergunta depende de algo atual, recente, ou que não está no conteúdo do site abaixo (preço, notícia, dado de mercado, evento), SEMPRE use a busca na web antes de responder. Não chute.
- Se a pergunta é sobre o conteúdo do site (tendência, roadmap, item do armazém), responda direto do contexto abaixo sem precisar buscar.
- Sempre que usar busca na web, cite a fonte (nome + link) na resposta. Sem fonte, não vale.
- Se não souber e não achar buscando, diga isso direto — não invente.

Conteúdo atual do site:

`;
