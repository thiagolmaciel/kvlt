import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin().from("flags").select("key, value");
    if (error) throw error;
    const map: Record<string, unknown> = {};
    for (const row of data ?? []) map[row.key] = row.value;
    return Response.json({ flags: map });
  } catch (err) {
    console.error("flags GET error", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Falha ao ler flags." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { key, value } = (await req.json()) as { key?: string; value?: unknown };
  if (!key) {
    return Response.json({ error: "Key ausente." }, { status: 400 });
  }
  try {
    const { error } = await supabaseAdmin()
      .from("flags")
      .upsert({ key, value, updated_at: new Date().toISOString() });
    if (error) throw error;
    return Response.json({ ok: true });
  } catch (err) {
    console.error("flags POST error", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Falha ao gravar flag." },
      { status: 500 }
    );
  }
}
