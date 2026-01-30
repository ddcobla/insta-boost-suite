import { NextResponse } from "next/server";
import { getMe } from "@/lib/server/me";
import { prisma } from "@/lib/server/prisma";

/**
 * Meta OAuth callback (SKELETON).
 * In production you must exchange ?code= for an access token, then:
 * 1) Get Pages for the user
 * 2) Get connected Instagram Business Account
 * 3) Store ig_user_id, username, access_token, expires_at
 *
 * This starter stores a placeholder record so you can verify DB wiring.
 */
export async function GET(req: Request) {
  const me = await getMe();
  if (!me) return NextResponse.redirect(new URL("/login", process.env.APP_URL), 303);

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  // TODO: Exchange code -> token via:
  // https://graph.facebook.com/v19.0/oauth/access_token
  // Then use Graph API to find the IG account and username.

  await prisma.instagramAccount.create({
    data: {
      userId: me.id,
      scope: "global",
      igUserId: "PLACEHOLDER_" + Math.random().toString(16).slice(2),
      igUserName: "connected_via_meta",
      accessToken: "PLACEHOLDER_TOKEN",
      tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  });

  return NextResponse.redirect(new URL("/", process.env.APP_URL), 303);
}
