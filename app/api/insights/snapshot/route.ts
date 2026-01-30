import { NextResponse } from "next/server";
import { getMe } from "@/lib/server/me";
import { prisma } from "@/lib/server/prisma";

export async function POST() {
  const me = await getMe();
  if (!me) return NextResponse.redirect(new URL("/login", process.env.APP_URL), 303);

  // Placeholder numbers so UI works. Replace with real Graph API fetch.
  await prisma.insightSnapshot.create({
    data: {
      userId: me.id,
      followers: Math.floor(1000 + Math.random() * 500),
      reach7d: Math.floor(5000 + Math.random() * 2000),
      impressions7d: Math.floor(12000 + Math.random() * 4000),
    },
  });

  return NextResponse.redirect(new URL("/", process.env.APP_URL), 303);
}
