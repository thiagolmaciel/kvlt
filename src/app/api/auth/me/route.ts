import { cookies } from "next/headers";
import { verifySessionCookie, SESSION_COOKIE_NAME } from "@/lib/session";

export const runtime = "nodejs";

export async function GET() {
  const founder = await verifySessionCookie(
    (await cookies()).get(SESSION_COOKIE_NAME)?.value
  );
  if (!founder) {
    return Response.json({ error: "Não autenticado." }, { status: 401 });
  }
  return Response.json({ founder });
}
