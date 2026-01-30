import { NextResponse } from "next/server";

export async function GET() {
  const appId = process.env.META_APP_ID;
  const redirectUri = process.env.META_REDIRECT_URI;

  if (!appId || !redirectUri) {
    return NextResponse.json({ error: "META_APP_ID or META_REDIRECT_URI not set" }, { status: 400 });
  }

  // Scopes vary. For insights you typically need permissions for Instagram Graph API.
  // You must configure these in your Meta app + get approval where required.
  const scope = [
    "instagram_basic",
    "instagram_manage_insights",
    "pages_show_list",
    "pages_read_engagement"
  ].join(",");

  const url = new URL("https://www.facebook.com/v19.0/dialog/oauth");
  url.searchParams.set("client_id", appId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", scope);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("state", "ibs_" + Math.random().toString(36).slice(2));

  return NextResponse.redirect(url.toString(), 302);
}
