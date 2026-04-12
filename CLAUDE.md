# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`create-new-express-app` is a CLI scaffolding tool (like `create-react-app` but for Express.js). Users run `npx create-new-express-app my-app` and get a fully configured TypeScript Express project with validation, logging, testing, linting, and Docker support.

Published to npm as a binary (`create-new-express-app`). The CLI itself is written in TypeScript, compiled to `dist/`, and ships with template files that get copied into the user's new project.

## Build & Development Commands

```bash
pnpm run build          # Compile TypeScript CLI (src/ -> dist/)
node dist/index.js my-app           # Test the CLI locally
node dist/index.js my-app --no-install  # Test without installing deps
```

There are no test or lint scripts configured for the CLI tool itself. Testing is manual: generate an app and verify it builds/runs.

## Architecture

Two distinct codebases live in this repo:

### 1. CLI Tool (`src/`)
- `src/index.ts` - Entry point. Uses Commander for arg parsing, Prompts for interactive input, validates project name via `validate-npm-package-name`.
- `src/create-express-app.ts` - Orchestrator: copies template -> prompts for package manager -> installs deps -> inits git repo.
- `src/cli/package-manager.ts` - Package manager detection (from `npm_config_user_agent`), interactive selection prompt, and `installDependencies()` using cross-spawn.
- `src/git.ts` - Git init logic. Renames `.gitignore-copy` to `.gitignore` (npm strips `.gitignore` during publish), creates initial commit.
- `src/install.ts` - Legacy install module (superseded by `src/cli/package-manager.ts`).

### 2. Generated App Template (`templates/app-ts/`)
This is what gets copied into the user's new project. It's a complete Express 5 + TypeScript app:
- MVC-like structure: `controllers/`, `routers/`, `middlewares/`, `schemas/`, `exceptions/`
- Zod-based env validation (`config/env.config.ts`) - app fails fast on invalid config
- Zod request validation middleware (`middlewares/validation.middleware.ts`)
- Winston + Morgan logging, Helmet security, CORS, Swagger docs at `/api/docs`
- Jest + Supertest tests, ESLint + Prettier, Husky pre-commit hooks
- Docker + compose setup

### Template Helpers (`templates/helpers/`)
Utilities for template installation, file copying, and package validation. These are imported by the CLI but also shipped as part of the template system.

## Key Gotchas

- **`.gitignore-copy` rename**: The template ships `.gitignore-copy` because npm strips `.gitignore` files during `npm publish`. The `src/git.ts` module renames it to `.gitignore` during project generation.
- **`dist/` is committed**: The compiled CLI output is tracked in git (it's in the npm `files` array). Run `pnpm run build` after changes to `src/`.
- **Two `PackageManager` types exist**: `src/cli/package-manager.ts` (current) and `src/get-pkg-manager.ts` (legacy). New code should use `src/cli/package-manager.ts`.
- **Template path resolution**: `create-express-app.ts` resolves templates relative to `__dirname` (i.e., `dist/`), so the `templates/` directory must be at the package root.
- **Node >= 18.18.0 required** (see `engines` in package.json).
- **pnpm is the package manager** for this repo (pnpm-lock.yaml).
