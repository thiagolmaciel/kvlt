import { createSession, type Founder } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const thiagoPassword = process.env.THIAGO_PASSWORD;
  const rodrigoPassword = process.env.RODRIGO_PASSWORD;
  if (!thiagoPassword && !rodrigoPassword) {
    return Response.json(
      { error: "THIAGO_PASSWORD / RODRIGO_PASSWORD não configuradas no servidor." },
      { status: 500 }
    );
  }

  const { password } = (await req.json()) as { password?: string };

  let founder: Founder | null = null;
  if (password && thiagoPassword && password === thiagoPassword) founder = "thiago";
  else if (password && rodrigoPassword && password === rodrigoPassword) founder = "rodrigo";

  if (!founder) {
    return Response.json({ error: "Chave inválida." }, { status: 401 });
  }

  await createSession(founder);
  return Response.json({ ok: true, founder });
}
