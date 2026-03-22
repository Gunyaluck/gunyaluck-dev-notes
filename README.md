# Gunyaluck Dev Notes

A full-stack developer blog platform for writing and sharing technical articles and dev notes.  
Built as a personal project to document my learning journey — from bootcamp through real-world development.

🔗 **Live Demo:** [https://pjsdf.online](https://pjsdf.online)  
📦 **Frontend Repo:** [gunyaluck-dev-notes](https://github.com/Gunyaluck/gunyaluck-dev-notes.git)  
📦 **Backend Repo:** [gunyaluck-dev-notes-backend](https://github.com/Gunyaluck/gunyaluck-dev-notes-backend.git)

---

## Demo Accounts

> These accounts are provided for reviewers. Please do not change passwords or delete content.

| Role | Email | Password |
|------|-------|----------|
| Admin | testadmin@gmail.com | DevNotes2026! |
| Member | testuser@gmail.com | DevNotes2026! |

**Admin** can create/edit/delete articles, manage categories, and view notifications.  
**Member** can read articles, comment, and like posts.

---

## Features

**Public**
- Browse and read articles with Markdown rendering
- Search articles by title (with debounce)
- Filter by category

**Member (requires login)**
- Sign up / Login / Reset password
- Edit profile
- Like and comment on articles

**Admin**
- Create, edit, and publish articles with thumbnail upload
- Draft / Publish status management
- Category management (CRUD)
- Notification center

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, React Router v7, Vite 7 |
| Styling | Tailwind CSS v4, Radix UI |
| HTTP | Axios |
| Auth (client) | jwt-decode |
| Backend | Node.js, Express |
| Database | PostgreSQL (via Supabase) |
| Server | Ubuntu, Nginx, PM2 |
| CI/CD | GitHub Actions |

---

## Architecture

Two separate repositories — frontend SPA calls backend REST API via environment variable.

```
Browser (React SPA)
  └── Axios → VITE_API_BASE_URL
        └── Express API
              └── PostgreSQL (Supabase)
```

**Authentication:** JWT-based — token stored on client, decoded with `jwt-decode` to read role.  
**Route guards:** Three types — `GuestRoute`, `AuthenticationRoute`, `ProtectedRoute (admin only)`  
**CI/CD:** Push to `main` → GitHub Actions builds → SCP to Ubuntu server → PM2 restart

---

## Project Structure

```
gunyaluck-dev-notes/          ← frontend (this repo)
gunyaluck-dev-notes-backend/  ← backend (separate repo)
```

**Backend layers:** `routes → controllers → services → repositories`

**Main API endpoints:**

| Endpoint | Description |
|----------|-------------|
| `/auth` | Login, register, password reset |
| `/posts` | Article CRUD, draft/publish |
| `/categories` | Category management |
| `/notifications` | User notifications |
| `/statuses` | Post status management |

---

## Local Development

### Prerequisites

- Node.js 20+
- PostgreSQL (or Supabase project)

### 1. Clone both repos

```bash
git clone https://github.com/<your-username>/gunyaluck-dev-notes
git clone https://github.com/<your-username>/gunyaluck-dev-notes-backend
```

### 2. Backend setup

```bash
cd gunyaluck-dev-notes-backend
npm install
```

Create `.env`:

```bash
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_ANON_KEY=<your-anon-key>
PORT=3000
```

```bash
npm run start
# Running at http://localhost:3000
```

### 3. Frontend setup

```bash
cd gunyaluck-dev-notes
npm install
```

Copy `.env.example` to `.env` and adjust if needed:

```bash
cp .env.example .env
```

Example:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

```bash
npm run dev
# Running at http://localhost:5173 (see vite.config.js for port)
```

---

## Deployment

**Frontend** — Vercel (originally) → migrated to Ubuntu server with Nginx + PM2  
**Backend** — Ubuntu server, managed via PM2 (`ecosystem.config.cjs`)  
**CI/CD** — GitHub Actions: build → SCP dist to server → SSH pm2 restart

Environment variables are injected at build time via GitHub Actions Secrets (`VITE_*`).

---

## Key Challenges

**Case sensitivity (Windows → Linux)**  
Developed on Windows (case-insensitive filesystem), deployed on Linux (case-sensitive).  
Import paths like `./Profile` worked locally but failed on Vercel/Ubuntu.  
Fixed by resetting Git tracking (`git rm --cached`) and enforcing consistent file naming convention.

**Self-hosted deployment**  
Migrated from Vercel to a real Ubuntu server — configured Nginx as reverse proxy, PM2 for process management, and GitHub Actions for automated deployment pipeline.

---

## Scripts

**Frontend**

```bash
npm run dev      # start dev server (port 5173)
npm run build    # production build
npm run preview  # preview build (port 4173)
npm run lint     # ESLint
```

**Backend**

```bash
npm run start    # start Express server (port 3000)
```

Health checks: `GET /` and `GET /health`

---

## What I'd Improve Next

- [ ] Add TypeScript for type safety
- [ ] Write unit and integration tests (Vitest)
- [ ] Migrate to SSR/SSG (Next.js) for better SEO
- [ ] Add error monitoring (Sentry)
- [ ] Complete comment and like system on backend

---

*Built by Gunyaluck · Full-stack Developer*