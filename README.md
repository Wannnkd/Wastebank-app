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
- `feature/location`
- `feature/price-list`

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

Do not recreate these features in a new PR unless the PR is improving or fixing one of them.

## Missing Features

These features are intentionally not included yet. Each one should be implemented later in a separate branch and pull request:

| Feature | Branch name | Scope |
| --- | --- | --- |
| Vendor directory/detail | `feature/vendors` | Add vendor listing, vendor detail page, backend endpoints, seed data, and tests/manual verification. |
| Guides/articles | `feature/guides` | Add education article listing/detail pages, backend endpoints, seed data, and navigation. |
| Bank login/dashboard | `feature/bank-dashboard` | Add bank account login, profile management, catalog management, protected routes, and backend auth/API support. |
| Admin panel | `feature/admin-panel` | Add Filament/admin resources for managing waste types, banks, vendors, guides, and related data. |
| Location integration | `feature/location` | Add backend Google Places/location integration for realtime bank sampah search without exposing API keys in frontend code. |
| Price list | `feature/price-list` | Add external/reference price sources, API endpoints, display pages, and refresh/update workflow. |

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
- React app shell and shared layout
- setup documentation
- ignore rules for local/generated artifacts
