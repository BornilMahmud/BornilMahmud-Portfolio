# Bornil Mahmud — Portfolio

Personal portfolio website for **Bornil Mahmud**, a Creative Video Editor and Developer based in Bangladesh.

Live:https://bornilmahmud.me/

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | Framer Motion |
| Backend | Express.js |
| Database | Supabase (PostgreSQL) |
| Email | Nodemailer + Gmail |

---

## Features

- Cinematic animated intro / loader
- Dark and light theme toggle
- Animated hero with background video
- Clickable service, skill, and goal cards with rich popup modals
- Contact form with dual email (notification to owner + confirmation to sender)
- Admin panel with full CRUD for all sections and popup content editor
- Fully responsive design

---

## Getting Started

```bash
npm install
```

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Start the frontend (port 5000) and the API server (port 3001):

```bash
# Terminal 1 — frontend
npm run dev

# Terminal 2 — API server
npx tsx server/index.ts
```

---

## Environment Variables

See `.env.example` for the full list.

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `GMAIL_USER` | Gmail address used for sending emails |
| `GMAIL_APP_PASSWORD` | Gmail App Password (not your account password) |

> **Gmail App Password:** Google Account → Security → 2-Step Verification → App Passwords → create one for "Mail".

---

## Build for Production

```bash
npm run build
```

Static files are output to `dist/`. Serve the `dist/` folder from any static host and run `server/index.ts` as the API backend.

---

## Admin Panel

Click the **"Bornil Mahmud"** text in the About section **5 times within 2 seconds** to access the admin panel.

---

## License

MIT
