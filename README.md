# solidjs-app

A [SolidJS](https://solidjs.com) app built with [Vite](https://vitejs.dev) and styled with [Tailwind CSS](https://tailwindcss.com).

## Running locally

### Prerequisites

- [Node.js](https://nodejs.org) 18 or newer (required by Vite 5)
- npm (comes with Node.js). pnpm or yarn also work.

### 1. Clone the repository

```bash
git clone <repository-url>
cd solidjs-app
```

### 2. Install dependencies

```bash
npm install
```

The repo has both a `package-lock.json` and a `pnpm-lock.yaml`. Use the lockfile that matches your package manager (`npm install` or `pnpm install`).

### 3. Start the dev server

```bash
npm run dev
```

This runs two processes at the same time:

- **Tailwind CLI** watches `src/index.css` and writes the compiled styles to `src/output.css`.
- **Vite** serves the app with hot reloading.

Open [http://localhost:3000](http://localhost:3000) in your browser. The page reloads when you save changes.

> **Note:** `npm start` runs only Vite, without the Tailwind watcher. If you use it, new Tailwind classes won't show up until you rebuild `src/output.css`. Use `npm run dev` for local development.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts Vite and the Tailwind watcher together (recommended) |
| `npm start` | Starts only the Vite dev server |
| `npm run build` | Builds the app for production into `dist/` |
| `npm run serve` | Serves the production build from `dist/` locally to preview it |

## Building for production

```bash
npm run build
npm run serve   # optional: preview the build locally
```

`npm run build` does not run Tailwind. If you changed any Tailwind classes, run `npm run dev` (or `npx tailwindcss -i ./src/index.css -o ./src/output.css`) first so that `src/output.css` is up to date.

You can deploy the `dist` folder to any static host (Netlify, Vercel, Surge, etc.).

## Optional: Solid DevTools

`solid-devtools` is installed but turned off. To turn it on, uncomment the `devtools` import and the `devtools()` plugin line in `vite.config.js`.

## Learn more

- [Solid documentation](https://docs.solidjs.com)
- [Solid Discord](https://discord.com/invite/solidjs)
