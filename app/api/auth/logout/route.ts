import { NextResponse } from "next/server";
import { clearSession } from "@/lib/server/session";

export async function POST() {
  clearSession();
  return NextResponse.redirect(new URL("/login", process.env.APP_URL), 303);
}
