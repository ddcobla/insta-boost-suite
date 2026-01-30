import "./globals.css";

export const metadata = {
  title: "Insta Boost Suite",
  description: "Compliant growth toolkit for musicians & influencers"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="mx-auto max-w-5xl p-6">
          <header className="flex items-center justify-between gap-4 border-b pb-4">
            <div className="space-y-1">
              <div className="text-xl font-semibold">Insta Boost Suite</div>
              <div className="text-sm text-neutral-600">
                Analytics • Planner • Outreach CRM
              </div>
            </div>
            <nav className="flex items-center gap-4 text-sm">
              <a href="/">Dashboard</a>
              <a href="/planner">Planner</a>
              <a href="/crm">CRM</a>
              <a href="/settings">Settings</a>
            </nav>
          </header>
          <main className="py-6">{children}</main>
          <footer className="border-t pt-4 text-xs text-neutral-600">
            Built with official APIs. No bot actions.
          </footer>
        </div>
      </body>
    </html>
  );
}
