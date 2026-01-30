import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");

  if (!email || password.length < 8) {
    return NextResponse.redirect(new URL("/register", process.env.APP_URL), 303);
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.redirect(new URL("/login", process.env.APP_URL), 303);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { email, passwordHash } });

  return NextResponse.redirect(new URL("/login", process.env.APP_URL), 303);
}
