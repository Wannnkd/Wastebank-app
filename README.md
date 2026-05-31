# Wastebank App

Runnable baseline for the Bank Sampah group project. The `main` branch already contains the agreed starter features, and every new feature must be added through a focused pull request from its own feature branch.

## Requirements

- PHP 8.2+
- Composer 2+
- Node.js 20+
- npm 10+

## Backend

```bash
cd backend
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Health check:

```bash
curl http://127.0.0.1:8000/api/health
```

Tests:

```bash
cd backend
php artisan test
```

## Frontend

```bash
cd frontend
npm install
npm start
```

Build:

```bash
cd frontend
npm run build
```

## Demo Deployment

Use Railway for the Laravel backend and Vercel for the React frontend.

### Railway Backend

Create a Railway project from this GitHub repository and set the service root directory to `backend`.
Add a Railway PostgreSQL database, then set these backend environment variables in Railway:

```env
APP_NAME=Wastebank App
APP_ENV=production
APP_DEBUG=false
APP_KEY=<run: php artisan key:generate --show>
APP_URL=<your Railway backend URL>

DB_CONNECTION=pgsql
DB_HOST=<Railway PostgreSQL host>
DB_PORT=<Railway PostgreSQL port>
DB_DATABASE=<Railway PostgreSQL database>
DB_USERNAME=<Railway PostgreSQL user>
DB_PASSWORD=<Railway PostgreSQL password>

CACHE_STORE=database
QUEUE_CONNECTION=database
SESSION_DRIVER=database

GOOGLE_MAPS_API_KEY=<your Google Maps API key>
```

Railway will use `backend/nixpacks.toml` to install Composer dependencies, run migrations and seeders, cache Laravel config/routes, and start the API server.

After deploy, verify:

```text
https://<your-railway-backend-url>/api/health
```

### Vercel Frontend

Create a Vercel project from this GitHub repository and set:

- Root directory: `frontend`
- Framework preset: Create React App
- Build command: `npm run build`
- Output directory: `build`

Set these frontend environment variables in Vercel:

```env
REACT_APP_USE_REAL_API=true
REACT_APP_BACKEND_URL=<your Railway backend URL>
REACT_APP_GOOGLE_MAPS_API_KEY=
```

`frontend/vercel.json` already rewrites React Router routes to `index.html`, so direct refreshes such as `/panduan/1` should work.

## Pull Request Workflow

Use fork-based pull requests for group work:

1. Fork this repository to your own GitHub account.
2. Clone your fork.
3. Create a new branch from your fork's `main`.
4. Build one feature only.
5. Push the branch to your fork.
6. Open a pull request into `PutuReyvan/Wastebank-app:main`.

```bash
git clone https://github.com/<your-username>/Wastebank-app.git
cd Wastebank-app
git checkout -b feature/vendors
```

Each pull request must represent exactly one feature. Do not combine unrelated work in one branch. Use branch names that clearly match the feature being implemented, for example:

- `feature/vendors`
- `feature/guides`
- `feature/bank-dashboard`
- `feature/admin-panel`

Do not commit secrets or local files:

- no `.env`
- no API keys
- no `node_modules`
- no `vendor`
- no build output
- no logs/cache files
- no local planning files

Each pull request must include a short summary, screenshots for frontend changes, API routes changed, migration/seed changes, and manual test steps.

## Current Baseline Features

The `main` branch already includes these starter features:

- Waste catalog
- Waste value calculator
- Waste bank directory
- Location integration
- Price list

Do not recreate these features in a new PR unless the PR is improving or fixing one of them.

## Missing Features

These features are intentionally not included yet. Each one should be implemented later in a separate branch and pull request:

| Feature | Branch name | Scope |
| --- | --- | --- |
| Vendor directory/detail | `feature/vendors` | Add vendor listing, vendor detail page, backend endpoints, seed data, and tests/manual verification. |
| Guides/articles | `feature/guides` | Add education article listing/detail pages, backend endpoints, seed data, and navigation. |
| Bank login/dashboard | `feature/bank-dashboard` | Add bank account login, profile management, catalog management, protected routes, and backend auth/API support. |
| Admin panel | `feature/admin-panel` | Add Filament/admin resources for managing waste types, banks, vendors, guides, and related data. |

Recommended merge order:

1. Backend schema/domain models
2. Public API endpoints
3. Frontend pages consuming those APIs
4. Admin/dashboard features
5. External integrations

## Baseline Scope

Current baseline includes:

- Laravel app shell and API routes
- `GET /api/health`
- Waste type catalog backend/frontend
- Waste value calculator backend/frontend
- Waste bank directory backend/frontend
- Google Places/location backend integration
- Price list backend/frontend
- React app shell and shared layout
- setup documentation
- ignore rules for local/generated artifacts
