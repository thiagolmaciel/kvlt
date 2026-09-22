import { TRENDS } from "@/data/trends";
import type { TrendSignal } from "@/types";

export const runtime = "nodejs";

const FILE_PATH = "src/data/trend-signals.json";
const REPO = process.env.GITHUB_REPO ?? "thiagolmaciel/kvlt";
const BRANCH = process.env.GITHUB_BRANCH ?? "master";

interface Body {
  trendSlug: string;
  newsTitle: string;
  newsUrl: string;
  source: string;
  relevance: string;
}

export async function POST(req: Request) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return Response.json(
      { error: "GITHUB_TOKEN não configurado no servidor. Veja .env.local.example." },
      { status: 500 }
    );
  }

  const body = (await req.json()) as Partial<Body>;
  const { trendSlug, newsTitle, newsUrl, source, relevance } = body;

  if (!trendSlug || !newsTitle || !newsUrl || !source || !relevance?.trim()) {
    return Response.json({ error: "Campos obrigatórios ausentes." }, { status: 400 });
  }
  if (!TRENDS.some((t) => t.slug === trendSlug)) {
    return Response.json({ error: "Área de interesse desconhecida." }, { status: 400 });
  }

  const apiUrl = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };

  const getRes = await fetch(`${apiUrl}?ref=${BRANCH}`, { headers });
  if (!getRes.ok) {
    return Response.json(
      { error: `Falha ao ler ${FILE_PATH} do repositório (${getRes.status}).` },
      { status: 502 }
    );
  }
  const getData = (await getRes.json()) as { content: string; sha: string };
  const current = JSON.parse(
    Buffer.from(getData.content, "base64").toString("utf-8")
  ) as Record<string, TrendSignal[]>;

  const entry: TrendSignal = {
    id: crypto.randomUUID(),
    newsTitle,
    newsUrl,
    source,
    relevance: relevance.trim(),
    capturedAt: new Date().toISOString(),
  };
  current[trendSlug] = [...(current[trendSlug] ?? []), entry];

  const newContent = Buffer.from(JSON.stringify(current, null, 2) + "\n", "utf-8").toString(
    "base64"
  );

  const putRes = await fetch(apiUrl, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: `chore: incorporar sinal em ${trendSlug}`,
      content: newContent,
      sha: getData.sha,
      branch: BRANCH,
    }),
  });

  if (!putRes.ok) {
    const detail = await putRes.text();
    return Response.json(
      { error: `Falha ao commitar no repositório (${putRes.status}): ${detail}` },
      { status: 502 }
    );
  }

  return Response.json({ ok: true, entry });
}
