# ITDEV-164 — Web Programming 2

AI-native full-stack development with Next.js, Tailwind CSS, and Supabase.

## Prerequisites

- **Node.js** 20 or later — [Download](https://nodejs.org/)
- **VS Code** with the **GitHub Copilot** extension installed
- A **GitHub** account with Copilot access

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see the **Course Dashboard** with six assignment cards.

## Setting Up AI-Assisted Development

This course uses **GitHub Copilot Agent Mode** for an AI-assisted workflow.

### Enable Agent Mode in VS Code

1. Open VS Code and press **Ctrl+Shift+I** (Windows/Linux) or **Cmd+Shift+I** (Mac) to open Copilot Chat.
2. At the top of the chat panel, click the mode dropdown and select **"Agent"**.
3. You are now in Agent Mode — Copilot can edit files, run terminal commands, and reason across your project.

> **Tip:** You can also type `@workspace` in the chat to give Copilot context about your full project.

## Verify Your Setup

Give Copilot this prompt to confirm everything is working:

```
Look at my project structure and tell me:
1. What framework and version am I using?
2. What styling solution is configured?
3. What components exist so far?
Then add a small "Setup verified ✓" badge to the bottom of the home page.
```

If Copilot correctly identifies Next.js, Tailwind CSS, and the existing components — and successfully adds the badge — your environment is ready.

## Project Structure

```
src/
├── app/            # Routes and layouts (App Router)
│   ├── layout.tsx  # Root layout with theme support
│   ├── page.tsx    # Course Dashboard home page
│   └── globals.css # Tailwind theme tokens
├── components/     # Reusable UI components
│   ├── header.tsx
│   ├── mode-toggle.tsx
│   └── theme-provider.tsx
└── lib/
    └── utils.ts    # cn() class name utility
```

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start dev server (Turbopack) |
| `npm run build` | Production build             |
| `npm run start` | Serve production build       |
| `npm run lint`  | Run ESLint                   |











## Live Site

Deployed at: [your-vercel-url](https://aiibreed-app.vercel.app)