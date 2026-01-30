import { getMe } from "@/lib/server/me";

export default async function SettingsPage() {
  const me = await getMe();
  if (!me) return <p>Please <a href="/login">login</a>.</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <section className="rounded-xl border p-4 space-y-2">
        <h2 className="text-lg font-semibold">Connect Instagram (Meta OAuth)</h2>
        <p className="text-sm text-neutral-700">
          This uses the official Meta login flow. You must configure your Meta app and add env vars.
        </p>
        <a
          className="inline-block rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50"
          href="/api/meta/login"
        >
          Connect via Meta
        </a>
      </section>

      <section className="rounded-xl border p-4 space-y-2">
        <h2 className="text-lg font-semibold">Create test snapshot</h2>
        <p className="text-sm text-neutral-700">
          Useful to validate DB + dashboard before wiring real insights.
        </p>
        <form action="/api/insights/snapshot" method="post">
          <button className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50">
            Create snapshot
          </button>
        </form>
      </section>
    </div>
  );
}
