import { getMe } from "@/lib/server/me";
import { prisma } from "@/lib/server/prisma";

export default async function Dashboard() {
  const me = await getMe();

  if (!me) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-neutral-700">
          Please <a href="/login">login</a> or <a href="/register">create an account</a>.
        </p>
      </div>
    );
  }

  const accounts = await prisma.instagramAccount.findMany({
    where: { userId: me.id },
    orderBy: { createdAt: "desc" },
  });

  const latest = await prisma.insightSnapshot.findFirst({
    where: { userId: me.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <section className="rounded-xl border p-4 space-y-2">
        <div className="text-sm text-neutral-600">Signed in as</div>
        <div className="font-medium">{me.email}</div>
        <form action="/api/auth/logout" method="post" className="pt-2">
          <button className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50">
            Logout
          </button>
        </form>
      </section>

      <section className="rounded-xl border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Instagram Accounts</h2>
          <a
            href="/settings"
            className="text-sm text-neutral-700 hover:text-neutral-900"
          >
            Connect →
          </a>
        </div>
        {accounts.length === 0 ? (
          <p className="text-sm text-neutral-700">
            No accounts connected yet. Go to <a href="/settings">Settings</a> to connect via Meta OAuth.
          </p>
        ) : (
          <ul className="text-sm">
            {accounts.map(a => (
              <li key={a.id} className="flex items-center justify-between border-t py-2">
                <div>
                  <div className="font-medium">{a.igUserName ?? "Instagram Account"}</div>
                  <div className="text-neutral-600">IG User ID: {a.igUserId}</div>
                </div>
                <div className="text-neutral-600">{a.scope}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-xl border p-4 space-y-2">
        <h2 className="text-lg font-semibold">Latest Snapshot</h2>
        {latest ? (
          <div className="text-sm text-neutral-700 space-y-1">
            <div>Followers: <span className="font-medium">{latest.followers}</span></div>
            <div>Reach (7d): <span className="font-medium">{latest.reach7d}</span></div>
            <div>Impressions (7d): <span className="font-medium">{latest.impressions7d}</span></div>
            <div className="text-neutral-600">Saved at {new Date(latest.createdAt).toLocaleString()}</div>
          </div>
        ) : (
          <div className="text-sm text-neutral-700">
            No snapshots yet. Create a test snapshot from Settings.
          </div>
        )}
      </section>
    </div>
  );
}
