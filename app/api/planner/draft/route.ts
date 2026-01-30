import { NextResponse } from "next/server";
import { getMe } from "@/lib/server/me";
import { prisma } from "@/lib/server/prisma";

export async function POST(req: Request) {
  const me = await getMe();
  if (!me) return NextResponse.redirect(new URL("/login", process.env.APP_URL), 303);

  const form = await req.formData();
  const title = String(form.get("title") || "").trim();
  const caption = String(form.get("caption") || "").trim();
  const hashtags = String(form.get("hashtags") || "").trim();
  const scheduledAtRaw = String(form.get("scheduledAt") || "").trim();

  const scheduledAt = scheduledAtRaw ? new Date(scheduledAtRaw) : null;

  if (!title) return NextResponse.redirect(new URL("/planner", process.env.APP_URL), 303);

  await prisma.contentDraft.create({
    data: { userId: me.id, title, caption: caption || null, hashtags: hashtags || null, scheduledAt },
  });

  return NextResponse.redirect(new URL("/planner", process.env.APP_URL), 303);
}
