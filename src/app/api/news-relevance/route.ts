import Anthropic from "@anthropic-ai/sdk";
import { TRENDS } from "@/data/trends";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 200;

const PROJECT_BLURB =
  "KVLT é uma empresa em estágio Bootstrap migrando de prestação de serviço para produto: agentes de IA verticais, desenvolvimento IA-nativo, defesa anti-fraude/deepfake, squads nearshore.";

const TREND_LIST = TRENDS.map((t) => `${t.slug}: ${t.title}`).join("\n");

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY não configurada no servidor." },
      { status: 500 }
    );
  }

  const { title, summary } = (await req.json()) as { title?: string; summary?: string };
  if (!title) {
    return Response.json({ error: "Título ausente." }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: `${PROJECT_BLURB}

Áreas de interesse existentes (slug: título):
${TREND_LIST}

Dada a notícia, responda SOMENTE um JSON válido, sem markdown, sem texto fora do JSON:
{"trendSlug": "<slug da área mais relacionada, exatamente como listada>", "relevance": "<1-2 frases curtas em português, diretas, sem repetir o título, dizendo por que a notícia importa para essa área>"}`,
      messages: [
        {
          role: "user",
          content: `Título: ${title}\nResumo: ${summary ?? ""}`,
        },
      ],
    });

    const raw = message.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join(" ")
      .trim();

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Resposta sem JSON.");
    const parsed = JSON.parse(jsonMatch[0]) as { trendSlug?: string; relevance?: string };

    const validSlug = TRENDS.some((t) => t.slug === parsed.trendSlug);
    if (!validSlug || !parsed.relevance) throw new Error("JSON inválido.");

    return Response.json({ trendSlug: parsed.trendSlug, relevance: parsed.relevance });
  } catch (err) {
    console.error("news-relevance error", err);
    return Response.json({ error: "Falha ao gerar análise." }, { status: 502 });
  }
}
