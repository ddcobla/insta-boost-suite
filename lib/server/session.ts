import { cookies } from "next/headers";
import CryptoJS from "crypto-js";
import { z } from "zod";

const SessionSchema = z.object({
  userId: z.string().uuid(),
  iat: z.number(),
});

const COOKIE_NAME = "ibs_session";

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET missing");
  return s;
}

export function setSession(userId: string) {
  const payload = { userId, iat: Date.now() };
  const plaintext = JSON.stringify(payload);
  const ciphertext = CryptoJS.AES.encrypt(plaintext, secret()).toString();
  cookies().set(COOKIE_NAME, ciphertext, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // 14 days
  });
}

export function clearSession() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export function getSession() {
  const c = cookies().get(COOKIE_NAME)?.value;
  if (!c) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(c, secret());
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    const obj = JSON.parse(plaintext);
    return SessionSchema.parse(obj);
  } catch {
    return null;
  }
}
