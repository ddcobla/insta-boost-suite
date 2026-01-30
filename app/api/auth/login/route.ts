import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";
import bcrypt from "bcryptjs";
import { setSession } from "@/lib/server/session";

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.redirect(new URL("/login", process.env.APP_URL), 303);

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return NextResponse.redirect(new URL("/login", process.env.APP_URL), 303);

  setSession(user.id);
  return NextResponse.redirect(new URL("/", process.env.APP_URL), 303);
}
