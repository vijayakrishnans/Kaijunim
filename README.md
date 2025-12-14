# Kaijunim / VidSocial Monorepo

This repo contains a minimal, production-oriented scaffold for **VidSocial**, a digital marketplace and social platform. The goal is to give a single codebase with a Next.js frontend, an Axum-based Rust API, and a small worker for background maintenance. The codebase is organized for local development with Docker Compose.

## Folder structure proposal

- `apps/web`: Next.js (App Router) frontend using TypeScript, Tailwind CSS, shadcn/ui primitives, lucide-react icons, and @tanstack/react-query.
- `apps/api`: Rust + Axum REST and WebSocket API using SQLx for Postgres and Redis for pub/sub + rate limiting. Includes Supabase JWT verification helpers and stub routes.
- `apps/worker`: Rust background worker to clean expired media and keep cache fresh.
- `infra`: Docker Compose for local Postgres, Redis, and a placeholder Supabase-compatible database. Includes example env files.
- `packages/ui`: (future) Shared UI primitives; current web app embeds light shadcn-style components.
- `seed`: Dev-only seed script for inserting sample data to Postgres.

## Implementation plan

1. **Initialize workspaces** for Node (Next.js) and Rust (Cargo) with consistent tooling and lint settings.
2. **Frontend (apps/web)**
   - Configure Tailwind, shadcn-like primitives, theming with `next-themes`, and React Query provider.
   - Implement global layout with navigation, dark-mode toggle, and route stubs for all required pages.
   - Provide data mocks (at least 6 entries per entity) and hook utilities that simulate server fetching with React Query.
   - Add key pages: Feed, Explore, Marketplace (Products + Jobs tabs), Jobs, Tutorials, Upload, Messages, Dashboard, Profile, Library, Open Source, Tools, and detail/create forms for products, jobs, tutorials. Each page handles loading/empty states gracefully.
   - Add simple chat UI with mock WebSocket events.
3. **Backend (apps/api)**
   - Create Axum server with typed routes, stub data handlers, and JWT validation placeholder for Supabase.
   - Wire SQLx/Postgres configuration, Redis client, and WebSocket broadcast skeleton.
4. **Worker (apps/worker)**
   - Implement scheduled cleanup loop for expired posts/stories and R2 object deletion placeholders.
5. **Infra**
   - Provide docker-compose for Postgres + Redis, and `.env.example` files for Supabase, R2, and Redis config.
6. **Seed data**
   - Supply a TypeScript/SQL seed script with realistic sample records per entity.
7. **Docs and scripts**
   - Update README with setup steps for Supabase, R2, Redis, and Stripe placeholders; include run/test commands.

## Quick start (high level)

1. Copy `.env.example` files to `.env` and fill in Supabase, R2, and Redis credentials.
2. Run `docker compose -f infra/docker-compose.yml up -d` to start Postgres and Redis.
3. Install JS deps with `npm install` (workspace-aware) and Rust toolchain.
4. Start frontend with `npm run dev --workspace web` and API with `cargo run -p api`.
5. Use `npm run seed` to populate dev data.

Each package contains more detailed instructions in its README or comments.
