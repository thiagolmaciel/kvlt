export const runtime = "nodejs";

export async function POST(req: Request) {
  const { text } = (await req.json()) as { text?: string };
  if (!text?.trim()) {
    return Response.json({ error: "Texto ausente." }, { status: 400 });
  }

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    text.slice(0, 490)
  )}&langpair=en|pt-BR`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = (await res.json()) as {
      responseData?: { translatedText?: string };
    };
    const translated = data.responseData?.translatedText;
    if (!translated) throw new Error("resposta vazia");
    return Response.json({ translated });
  } catch (err) {
    console.error("translate error", err);
    return Response.json({ error: "Falha ao traduzir." }, { status: 502 });
  }
}
