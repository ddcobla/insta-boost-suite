import { getMe } from "@/lib/server/me";
import { prisma } from "@/lib/server/prisma";

export default async function CRMPage() {
  const me = await getMe();
  if (!me) return <p>Please <a href="/login">login</a>.</p>;

  const contacts = await prisma.contact.findMany({
    where: { userId: me.id },
    orderBy: { updatedAt: "desc" },
    take: 100,
  });

  const stages = ["Contacted", "Negotiating", "Booked", "Delivered"] as const;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Outreach CRM</h1>

      <form action="/api/crm/contact" method="post" className="rounded-xl border p-4 space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="block text-sm">
            Name / Brand
            <input name="name" required className="mt-1 w-full rounded-lg border p-2" />
          </label>
          <label className="block text-sm">
            Email (optional)
            <input name="email" type="email" className="mt-1 w-full rounded-lg border p-2" />
          </label>
        </div>
        <label className="block text-sm">
          Stage
          <select name="stage" className="mt-1 w-full rounded-lg border p-2">
            {stages.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label className="block text-sm">
          Notes
          <textarea name="notes" rows={4} className="mt-1 w-full rounded-lg border p-2" />
        </label>
        <button className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50">Add contact</button>
      </form>

      <div className="rounded-xl border p-4">
        <h2 className="text-lg font-semibold">Contacts</h2>
        {contacts.length === 0 ? (
          <p className="text-sm text-neutral-700 pt-2">No contacts yet.</p>
        ) : (
          <ul className="pt-2 text-sm">
            {contacts.map(c => (
              <li key={c.id} className="border-t py-3 space-y-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-neutral-600">{c.stage}</div>
                </div>
                {c.email ? <div className="text-neutral-700">{c.email}</div> : null}
                {c.notes ? <div className="text-neutral-700 whitespace-pre-wrap">{c.notes}</div> : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
