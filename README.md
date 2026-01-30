# Insta Boost Suite (Compliant Instagram Growth Toolkit)

A GitHub-ready starter project for a **compliant** “Instagram boost” platform for musicians & influencers:
- Insights dashboard (stores snapshots so you can plot growth)
- Content planner (calendar + drafts)
- Outreach CRM (pipeline + reminders)

✅ Uses Meta/Instagram Graph API (Business/Creator accounts)  
❌ Does **not** automate likes/follows/comments/DMs or scraping.

## Stack
- Next.js 14 (App Router) + TypeScript
- Prisma + PostgreSQL (Neon/Supabase/etc.)
- Tailwind CSS
- Simple session cookie auth (email/password) for MVP

> You can replace auth later with NextAuth/Clerk/Supabase Auth.

---

## 1) Local setup

### Requirements
- Node.js 18+ (recommended 20+)
- PostgreSQL database

### Install
```bash
npm install
```

### Configure env
Copy `.env.example` to `.env` and fill values:
```bash
cp .env.example .env
```

### Prisma
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Run dev
```bash
npm run dev
```

Open: http://localhost:3000

---

## 2) Meta / Instagram setup (OAuth)

This starter includes the **skeleton** endpoints. You must:
1. Create a Meta app (Facebook Developers)
2. Add “Instagram Graph API”
3. Configure OAuth redirect:
   - `META_REDIRECT_URI=http://localhost:3000/api/meta/callback`
4. Set `.env`:
   - `META_APP_ID`
   - `META_APP_SECRET`
   - `META_REDIRECT_URI`

> For production, use your deployed domain in `META_REDIRECT_URI`.

---

## 3) Deploy (GitHub → Cloudflare Pages)
1. Push this repo to GitHub
2. Connect in Cloudflare Pages
3. Set build:
   - Framework: Next.js
   - Build command: `npm run build`
   - Output: `.next`
4. Add env vars in Pages settings (same as `.env`)

**Database:** Use a hosted Postgres (Neon/Supabase). Cloudflare Pages can connect via `DATABASE_URL`.

---

## 4) What’s implemented (MVP)
- **Auth**: Register/Login/Logout (cookie session)
- **Models**: User, InstagramAccount, InsightSnapshot, ContentDraft, Contact, Reminder
- **UI**: Dashboard, Planner, CRM
- **API**:
  - `/api/auth/*` (register/login/logout/me)
  - `/api/meta/*` (start OAuth + callback skeleton)
  - `/api/insights/snapshot` (create a placeholder snapshot)

---

## 5) Next steps
- Replace MVP auth with Meta-only login or NextAuth
- Add scheduled snapshot job (cron/worker) to fetch insights daily
- Add charts + better analytics
- Add collaboration outreach email integration (SendGrid/Mailgun)

---

## Safety & compliance
This codebase is designed to stay within platform rules:
- Uses official Graph API
- No bot actions / no scraping / no automation of engagement

