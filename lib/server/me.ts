import { prisma } from "./prisma";
import { getSession } from "./session";

export async function getMe() {
  const sess = getSession();
  if (!sess) return null;
  return prisma.user.findUnique({ where: { id: sess.userId } });
}
