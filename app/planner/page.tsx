import { getMe } from "@/lib/server/me";
import { prisma } from "@/lib/server/prisma";

export default async function PlannerPage() {
  const me = await getMe();
  if (!me) {
    return <p>Please <a href="/login">login</a>.</p>;
  }

  const drafts = await prisma.contentDraft.findMany({
    where: { userId: me.id },
    orderBy: { scheduledAt: "asc" },
    take: 50,
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Planner</h1>

      <form action="/api/planner/draft" method="post" className="rounded-xl border p-4 space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="block text-sm">
            Title
            <input name="title" required className="mt-1 w-full rounded-lg border p-2" />
          </label>
          <label className="block text-sm">
            Scheduled At (optional)
            <input name="scheduledAt" type="datetime-local" className="mt-1 w-full rounded-lg border p-2" />
          </label>
        </div>
        <label className="block text-sm">
          Caption
          <textarea name="caption" rows={5} className="mt-1 w-full rounded-lg border p-2" />
        </label>
        <label className="block text-sm">
          Hashtag Set
          <input name="hashtags" placeholder="#music #afrobeats ..." className="mt-1 w-full rounded-lg border p-2" />
        </label>
        <button className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50">Save draft</button>
      </form>

      <div className="rounded-xl border p-4">
        <h2 className="text-lg font-semibold">Drafts</h2>
        {drafts.length === 0 ? (
          <p className="text-sm text-neutral-700 pt-2">No drafts yet.</p>
        ) : (
          <ul className="pt-2 text-sm">
            {drafts.map(d => (
              <li key={d.id} className="border-t py-3 space-y-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">{d.title}</div>
                  <div className="text-neutral-600">
                    {d.scheduledAt ? new Date(d.scheduledAt).toLocaleString() : "Not scheduled"}
                  </div>
                </div>
                {d.caption ? <div className="text-neutral-700 whitespace-pre-wrap">{d.caption}</div> : null}
                {d.hashtags ? <div className="text-neutral-600">{d.hashtags}</div> : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
