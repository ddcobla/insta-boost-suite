import { NextResponse } from "next/server";
import { getMe } from "@/lib/server/me";
import { prisma } from "@/lib/server/prisma";

const allowed = new Set(["Contacted", "Negotiating", "Booked", "Delivered"]);

export async function POST(req: Request) {
  const me = await getMe();
  if (!me) return NextResponse.redirect(new URL("/login", process.env.APP_URL), 303);

  const form = await req.formData();
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const stage = String(form.get("stage") || "Contacted");
  const notes = String(form.get("notes") || "").trim();

  if (!name) return NextResponse.redirect(new URL("/crm", process.env.APP_URL), 303);

  await prisma.contact.create({
    data: {
      userId: me.id,
      name,
      email: email || null,
      stage: allowed.has(stage) ? stage : "Contacted",
      notes: notes || null,
    },
  });

  return NextResponse.redirect(new URL("/crm", process.env.APP_URL), 303);
}
