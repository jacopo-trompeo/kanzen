# Kanzen

An all-in-one Japanese language learning tool, currently under development. Combines an AI chat tutor, an EPUB reader for Japanese texts, a
text hooker for capturing text from external applications, and vocabulary and
grammar tools into a single web application.

## Architecture

Kanzen is a [TanStack Start](https://tanstack.com/start) application, a
full-stack React framework with server-side rendering (SSR). The codebase
follows a domain-driven layout where each feature owns its own directory with
all its UI components, hooks, server functions, types, and utilities.

The data layer is split across two stores: server-owned data lives in Postgres
via Drizzle ORM, and client-only data lives in the browser's IndexedDB via
Dexie. This means the EPUB library and text hooker logs work entirely offline,
while auth, chat messages, and settings are persisted on the server.

```
Client (React 19, Bun + Vite)                Server (Bun, TanStack Start)
┌──────────────────────────────────┐          ┌───────────────────────────────┐
│  Routes (TanStack Router)        │          │  API Routes                   │
│  ├─ /        dictionary          │          │  ├─ /api/chat     SSE stream  │
│  ├─ /ai      AI chat             │◄─────────┤  └─ /api/auth/$   better-auth │
│  ├─ /reader  EPUB reader         │ TanStack │                               │
│  ├─ /grammar grammar             │  Start   │  Server Functions (RPC)       │
│  └─ ...      text-hooker, etc.   │  RPC     │  ├─ auth middleware           │
│                                  │─────────►│  ├─ chat CRUD                 │ 
│  Domains (feature folders)       │          │  ├─ settings get/set          │
│  ├─ ai-chat/    context, ui      │          │  └─ ...                       │
│  ├─ reader/     epubjs, hooks    │          │                               │
│  ├─ text-hooker/ WebSocket, log  │          │  Data Stores                  │
│  ├─ auth/       better-auth      │          │  ├─ Postgres + Drizzle        │
│  └─ shared/     components, db   │          │  │   (auth, chats,            │
│                                  │          │  │    settings)               │ 
│  Client-only Data (IndexedDB)    │          │  └─ IndexedDB + Dexie         │
│  ├─ EPUB books + positions       │          │     (books, positions,        │
│  └─ Text hooker log entries      │          │      text log)                │
└──────────────────────────────────┘          └───────────────────────────────┘
```

Server functions use TanStack Start's RPC pattern: functions defined on the
server are callable from the client as if they were local, with input validated
by Zod schemas and auth enforced by middleware. The AI chat endpoint is a raw
API route handler that streams Server-Sent Events to the client.

## Features: Implementation Status

### Done

- [x] **Email/password authentication** via better-auth, with sign-in, sign-up,
  session management, and an auth middleware that protects server functions
- [x] **AI chat tutor** with multi-provider support (OpenAI, Gemini, Grok). Answers stream
  via SSE. Chat history is persisted to Postgres with infinite-scroll listing,
  inline rename, and delete
- [x] **Text hooker** for capturing Japanese text from external applications
  (visual novels, games, browsers). Connects via WebSocket and falls back to
  clipboard monitoring when not connected. Includes a log viewer with
  clear/undo, configurable font size, and configurable WebSocket URL
- [x] **Sidebar navigation** with links to all sections and a collapsible AI
  chat submenu showing conversation history
- [x] **API key encryption** at rest (AES-256-GCM) for AI provider keys
- [x] **Per-feature settings**: AI chat (model, system prompt, API key), text
  hooker (font size, WebSocket URL), reader (theme, font size, view mode,
  writing mode)

### Doing

- [ ] **Dictionary lookup** using resources like jmdict, kanjiVG and others to show word translations with readings, pitch accent graphs, and kanji stroke order animations 

### To Do

- [ ] **EPUB reader** with a library for uploading and managing books. The
  reader supports light/dark/sepia themes, font size adjustment, horizontal
  and vertical writing modes, paginated and continuous view modes, table of
  contents navigation, and persistent reading positions
- [ ] **Popup dictionary**: tap or hover a word in the reader for inline
  definitions
- [ ] **Video player**: a video player where the user can upload a video file and a subtitle file. The subtitles are shown on a sidebar and are synced with the video progress. The user can interact with the subtitles while watching the video
- [ ] **Global settings page**: the `/settings` route is a stub. Per-feature
  settings are accessible from within each feature but there is no unified
  settings screen
- [ ] **Light/dark theme toggle**: the database has a `global_settings` table
  with a `theme` field, but no UI control exists yet
- [ ] **Mobile mode**: the app has a `useIsMobile` hook and the sidebar
  component supports mobile, but no mobile layout has been designed or tested
- [ ] **Guest mode**: no unauthenticated access to features exists
- [ ] **Tests**: no test runner is configured
- [ ] **CI/CD**: no GitHub Actions workflows exist


## Tech Stack

| Technology | Role | Notes |
|---|---|---|
| TypeScript 5.x | Language | |
| Bun 1.3+ | Runtime / build / package manager |  |
| TanStack Start 1.x | SSR framework |  |
| TanStack Router | Routing |  |
| React 19 | UI | With React Compiler for automatic memoization |
| Tailwind CSS 4 | Styling |  |
| shadcn/ui | Components | New York style, neutral base, copied into source |
| TanStack Form | Forms | With Zod validation adapter |
| TanStack Query | Data fetching | SSR integration, infinite queries for chat list |
| TanStack AI | LLM integration | OpenAI/Gemini/Grok adapters, SSE streaming |
| Postgres | Server database |  |
| Drizzle ORM | Database layer |  |
| IndexedDB + Dexie | Client database | EPUB books, reading positions, text hooker logs |
| better-auth 1.x | Authentication | Email/password with Drizzle adapter |
| epubjs | EPUB rendering | Client-side book parsing and rendition |
| react-markdown | Markdown | Renders AI response content |
| Zod | Validation | Runtime schema validation on server and client |
| WebSocket (native) | Text capture | Real-time text streaming from external tools |
| Docker Compose | Infrastructure | Postgres container for local development |
| Biome  | Linting & formatting | |

## Install & Run

**Prerequisites:** [Bun](https://bun.sh) 1.3 or later and [Docker](https://docker.com) for Postgres.

Clone the repository and install dependencies:

```bash
git clone https://github.com/jacopo-trompeo/kanzen.git
cd kanzen
bun install
```

Create a `.env` file with the required variables. These are validated by
`src/env.ts` at startup:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
POSTGRES_USER=<user>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=<db>
BETTER_AUTH_SECRET=<any-32-character-random-string>
BETTER_AUTH_URL=http://localhost:3000
ENCRYPTION_KEY=<64-character-hex-string>       # for encrypting AI API keys
CORS_ORIGIN=http://localhost:3000              # optional
```

Start Postgres, push the database schema, and launch the dev server:

```bash
docker compose up -d db
bun run db:push
bun run dev
```

Open http://localhost:3000, create an account, and navigate to the AI chat to
configure an API key before starting a conversation.

## Development

This project follows a **domain-driven** code organization. Each feature under
`src/domains/<name>/` owns its UI, hooks, server functions, types, and
utilities. Cross-cutting code lives in `src/domains/shared/`. New features
should follow this pattern rather than using layer-based folders (no top-level
`components/`, `hooks/`, etc.).

```bash
bun run dev                    # start dev server on port 3000
bun run build                  # production build
bun run db:generate            # generate Drizzle migrations from schema
bun run db:migrate             # apply migrations
bun run db:push                # push schema directly (dev)
bun run db:studio              # open Drizzle Studio (browser DB browser)
bunx biome check --write .     # lint + format
bunx tsc --noEmit              # type check
```

There are no tests configured yet.

## Project Structure

```
kanzen/
  src/
    routes/                    TanStack Router file-based routes
      __root.tsx               root layout, populates user context
      _app/                    authenticated route group (sidebar shell)
      _auth/                   auth route group (sign-in/up)
      api/                     API handlers (chat SSE, better-auth catch-all)
    domains/
      ai-chat/                 AI chat: streaming, messages, chat list management
      auth/                    better-auth server/client, middleware, forms
      reader/                  EPUB library, reader with themes/positions
      text-hooker/             WebSocket text capture, clipboard monitor, log
      shared/                  cross-cutting code
        components/            shadcn/ui primitives, app shell, form helpers
        server/db/             Drizzle schema (auth, chat, settings) and migrations
    env.ts                     environment variable validation
    router.tsx                 TanStack Router + QueryClient setup
    styles.css                 Tailwind v4 entry, shadcn CSS variables
  biome.json                   linter and formatter configuration
  drizzle.config.ts            Drizzle Kit configuration
  docker-compose.yml           Postgres container for local development
```

## Design Decisions

**TanStack Start with server functions instead of a separate API server.**
TanStack Start's RPC model lets the client call server functions directly, with
auth middleware and Zod validation handled transparently. This avoids writing a
REST or GraphQL layer for CRUD operations. The trade-off is tighter coupling to
the framework and a younger ecosystem compared to Next.js.

**Domain-driven layout over layer-based folders.**
Each feature lives under `src/domains/<name>/` with its own slices. When
working on the reader, every file you need is in one directory.

**Dual data layer (Postgres + IndexedDB).**
Server-owned data (auth, chat history, settings) goes to Postgres. Purely
client data (EPUB files, reading positions, text hooker logs) goes to
IndexedDB. This keeps the EPUB reader and text hooker fully offline-capable and
avoids uploading large files to the server.

**better-auth for authentication.**
Chosen over NextAuth/Auth.js because it works framework-agnostically and
integrates with Drizzle directly. The email/password flow is simple to set up
and requires no third-party OAuth configuration.

**`@tanstack/ai` for LLM integration.**
Simplifies switching between AI providers by providing a uniform interface for
OpenAI, Gemini, and Grok. Streaming is handled by the framework's SSE utilities
rather than custom event handling.

**API key encryption with AES-256-GCM.**
User-provided API keys are encrypted before storage in Postgres. The encryption
key is an environment variable, not stored in the database. This means a
database compromise alone does not expose API keys.

## Limitations & Future Work

- **No tests.** The project has zero tests despite reasonably complex features
  (auth flow, AI chat streaming, EPUB parsing, WebSocket lifecycle). Unit tests
  for pure game/domain logic would be a good starting point.
- **Chat messages are loaded all at once.** `getChatMessages` returns every
  message in a conversation with no pagination. Long chat threads will degrade
  performance.
- **No production deployment configuration.** The server runs from source via
  `bun run dev`. There is no Dockerfile for the application, no static asset
  serving configuration, and no deployment target defined.

## License

MIT. Copyright 2026.
