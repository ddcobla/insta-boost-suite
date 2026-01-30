import { NextResponse } from "next/server";
import { getMe } from "@/lib/server/me";

export async function GET() {
  const me = await getMe();
  return NextResponse.json({ me: me ? { id: me.id, email: me.email } : null });
}
