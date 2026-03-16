## Gunyaluck Dev Notes – Frontend & Backend

**Gunyaluck Dev Notes** is a full‑stack platform for long‑form developer notes and articles.  
It is built as **two separate repositories** working together:

- **Frontend** – Modern React + Vite SPA (this repo)  
- **Backend** – Node.js + Express + PostgreSQL API in `gunyaluck-dev-notes-backend`

---

## Highlights

- **Clean reading experience** for technical articles and dev notes
- **Full authentication flow** – sign up, login, profile, password reset
- **Editor & admin tools** – manage posts, categories, and notifications
- **Search & filter** – quickly find articles by title or category
- **API‑driven architecture** – clear separation between frontend and backend

---

## Tech Stack

- **Frontend**
  - React 19, React Router
  - Vite
  - Tailwind CSS
  - Axios

- **Backend**
  - Node.js, Express
  - PostgreSQL
  - Supabase client

---

## Project Structure

- **Frontend (this repo)**  
  - Main features:
    - Landing page, article viewing, search, categories
    - Authentication: sign up, login, profile, password reset
    - Admin area: manage posts, categories, notifications

- **Backend (`gunyaluck-dev-notes-backend`)**  
  - Layered architecture: `routes`, `controllers`, `services`, `repositories`
  - Main endpoints:
    - `/auth` – authentication and user registration
    - `/posts` – post/article management
    - `/categories` – category management
    - `/notifications` – user notifications
    - `/statuses` – post status management

---

## Getting Started

### 1) Clone both repositories

Recommended folder structure:

```text
<root-folder>/
  gunyaluck-dev-notes/          # frontend (this repo)
  gunyaluck-dev-notes-backend/  # backend
```

---

## Frontend Setup (this repo)

### Install dependencies

```bash
cd gunyaluck-dev-notes
npm install
```

### Environment variables (Frontend)

Create a `.env` file in `gunyaluck-dev-notes` (do **not** commit real secrets) and set, for example:

```bash
VITE_API_BASE_URL=http://localhost:4000
```

`VITE_API_BASE_URL` is the base URL of the backend API and should match the Express backend port below.

### Run the frontend

```bash
npm run dev
```

By default, Vite runs at `http://localhost:5173`.

---

## Backend Setup (`gunyaluck-dev-notes-backend`)

### Install dependencies

```bash
cd gunyaluck-dev-notes-backend
npm install
```

### Environment variables (Backend)

Create a `.env` file in `gunyaluck-dev-notes-backend` and define (example keys actually used in the project – **do not put real production secrets in the README or commits**):

```bash
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
SUPABASE_URL=https://<your-supabase-project>.supabase.co
SUPABASE_ANON_KEY=<your-supabase-anon-key>
PORT=4000
```

Notes:

- **DATABASE_URL**: PostgreSQL connection string
- **SUPABASE_URL / SUPABASE_ANON_KEY**: used to connect to Supabase
- **PORT**: Express server port (default in code is 4000)

### Run the backend (development)

```bash
cd gunyaluck-dev-notes-backend
npm run start
```

The server will run at `http://localhost:4000` (or the value of `PORT`) and exposes simple health endpoints:

- `GET /` – basic server check
- `GET /health` – database connectivity check

---

## Running the Full Stack Locally

1. **Start the backend first**
   - Open a terminal in `gunyaluck-dev-notes-backend`
   - Configure `.env`, run `npm install` (first time only), then `npm run start`
2. **Start the frontend**
   - Open a new terminal in `gunyaluck-dev-notes`
   - Configure `.env` so `VITE_API_BASE_URL` points to the backend (for example `http://localhost:4000`)
   - Run `npm install` (first time only) and then `npm run dev`
3. Open `http://localhost:5173` in your browser to use the app.

---

## Common Scripts

### Frontend (`gunyaluck-dev-notes`)

- `npm run dev` – start Vite development server
- `npm run build` – build production bundle
- `npm run preview` – preview the production build
- `npm run lint` – run ESLint on the codebase

### Backend (`gunyaluck-dev-notes-backend`)

- `npm run start` – start the Express server (`app.mjs`)

---

## Deployment (High-Level Overview)

- **Frontend**: Can be deployed on Vercel / Netlify using Vite’s build output (`npm run build`). Configure `VITE_API_BASE_URL` to point to the production backend URL.
- **Backend**: Can be deployed on any Node.js platform (e.g. Railway, Render, your own server) that supports Node.js + PostgreSQL. Configure `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `PORT` as environment variables.

---

## Development Notes

- Do not commit `.env` files for either frontend or backend (keep secrets and connection strings in environment configuration only).
- If you change the backend port, update `VITE_API_BASE_URL` to match.
- When adding new backend endpoints, make sure to update the corresponding API calls in the frontend.

---

## Screenshots (Optional)

You can showcase the UI by adding images here, for example:

```markdown
![Landing page screenshot](./docs/screenshots/landing.png)
![Article detail screenshot](./docs/screenshots/article-detail.png)
![Admin dashboard screenshot](./docs/screenshots/admin-dashboard.png)
```

Create a `docs/screenshots` folder and drop your images there, then update the paths as needed.
