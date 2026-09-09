import Anthropic from "@anthropic-ai/sdk";
import { JAGUARA_PERSONA, buildJaguaraContext } from "@/lib/jaguara-context";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 1024;
const MAX_WEB_SEARCHES = 3;
const MAX_HISTORY_MESSAGES = 20;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

let cachedSystemText: string | null = null;
function systemPromptText() {
  if (!cachedSystemText) {
    cachedSystemText = JAGUARA_PERSONA + buildJaguaraContext();
  }
  return cachedSystemText;
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      "Chave ANTHROPIC_API_KEY não configurada no servidor. Veja .env.local.example.",
      { status: 500 }
    );
  }

  const body = (await req.json()) as { messages: ChatMessage[] };
  const messages = (body.messages ?? [])
    .slice(-MAX_HISTORY_MESSAGES)
    .filter((m) => m.content?.trim());

  if (messages.length === 0) {
    return new Response("Nenhuma mensagem enviada.", { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        const anthropicStream = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: [
            {
              type: "text",
              text: systemPromptText(),
              cache_control: { type: "ephemeral" },
            },
          ],
          tools: [
            {
              type: "web_search_20250305",
              name: "web_search",
              max_uses: MAX_WEB_SEARCHES,
            },
          ],
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        });

        anthropicStream.on("text", (delta) => {
          controller.enqueue(encoder.encode(delta));
        });

        anthropicStream.on("error", (err) => {
          console.error("Jaguara stream error", err);
          controller.enqueue(
            encoder.encode("\n\n[Erro ao consultar o Jaguara. Tente de novo.]")
          );
        });

        await anthropicStream.finalMessage();
        controller.close();
      } catch (err) {
        console.error("Jaguara request error", err);
        controller.enqueue(
          encoder.encode("[Erro ao consultar o Jaguara. Verifique a chave de API e tente de novo.]")
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
