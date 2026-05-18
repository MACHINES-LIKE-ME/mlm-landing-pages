# AGENTS.md

This repository is for compact, public, static landing pages. Treat every change as production-facing because GitHub Pages publishes the output from `main`.

## Stack Decision

- Author pages in plain HTML, CSS, and browser JavaScript.
- Use Vite only as a build tool for multi-page static output, asset hashing, and JS/CSS minification.
- Do not introduce a runtime framework, client router, CMS, server, or hydration layer unless the maintainer explicitly approves it.
- Keep `dependencies` empty. Build tools belong in `devDependencies` only.
- Publish only static files from `dist/` through GitHub Pages.

## Non-Negotiables

- Run `npm run validate` before every commit. The Husky pre-commit hook runs the same gate.
- Do not bypass hooks with `--no-verify`.
- Do not commit secrets, `.env` files, credentials, analytics tokens, API keys, or private customer material.
- Do not add CDNs, external scripts, external stylesheets, tracking pixels, remote fonts, or third-party forms by default.
- Do not use unsafe DOM APIs such as `innerHTML =`, `insertAdjacentHTML`, `document.write`, `eval`, or `new Function`.
- Keep pages responsive on mobile and desktop.
- Keep each page linked from the public index and from `src/landing-pages.json`.
- Keep the GitHub repository homepage set to the public Pages URL: `https://machines-like-me.github.io/mlm-landing-pages/`.

## Standard Agent Workflow

1. Inspect the current worktree with `git status --short --branch` before editing.
2. Read the relevant HTML, CSS, JS, workflow, and tool files before deciding on changes.
3. Make the smallest correct change. Avoid generic boilerplate and avoid adding new tools unless they solve a concrete problem.
4. If adding a landing page, create `src/pages/<slug>/index.html`, update `src/landing-pages.json`, and add a visible card/link in `src/index.html`.
5. Run `npm run validate` locally.
6. If validation fails, fix the failure instead of loosening checks.
7. Commit only after validation passes.
8. Push to `main` only when the maintainer requested it or the current task explicitly requires deployment.

## Human Operator Guide

- Ask the agent for a clear goal, for example: "Add a new landing page for <campaign> and keep the existing quality gates passing."
- Provide final copy, brand constraints, and required links before asking the agent to build a page.
- Ask the agent to show the validation result before committing if you want manual review.
- Review `git diff` for copy, URLs, legal claims, and campaign accuracy before approving a commit.
- If a page needs a third-party script, analytics, a form backend, or remote media, require an explicit security note and a reason it cannot be local.
- If `npm audit` reports a vulnerability, update or replace the affected package before committing. Do not ignore the audit without a documented maintainer decision.

## Codespaces

- Codespaces use `.devcontainer/devcontainer.json` with Node 24 and GitHub CLI support.
- A new Codespace runs `npm ci && npm run validate` during creation.
- On attach, Codespaces starts `npm run dev` and forwards port `5173` for the Vite dev server.
- Use port `4173` after running `npm run preview` to inspect the production build.
- If dependency installation or validation fails during creation, fix the repository rather than removing the devcontainer checks.

## Security Review Checklist

- HTML files include a Content Security Policy meta tag and `referrer` policy.
- Links that open a new tab include `rel="noopener noreferrer"`.
- Public pages do not include sensitive internal wording, hidden credentials, customer data, or unpublished URLs.
- Forms are absent unless the maintainer approves the endpoint, spam controls, privacy language, and data handling.
- Assets are local, compressed, and licensed for public use.
- JavaScript uses safe DOM APIs such as `textContent`, `classList`, `addEventListener`, `createElement`, and `append`.
- All local links and assets pass `npm run smoke` after the production build.

## Compactness Rules

- Prefer text, CSS gradients, SVG, AVIF, WebP, and compressed images over large raster assets.
- Keep page-specific JavaScript small. If a page works without JavaScript, prefer HTML and CSS.
- Do not add UI libraries, icon packs, animation libraries, or font packages for one-off landing pages.
- If a size budget needs to change, document the reason in the commit or pull request.
- Keep source readable; the build step handles minification.

## Commands

```sh
npm ci
npm run dev
npm run validate
npm run build
npm run preview
```

`npm run validate` runs ESLint, Prettier, the static build, compact output checks, security review, smoke tests, and `npm audit --audit-level=moderate`.

## Deployment

- GitHub Actions builds on pull requests and pushes to `main`.
- Pushes to `main` upload `dist/` as a GitHub Pages artifact and deploy it.
- The public index page and README must contain visible links to every published landing page.
- The repository should remain public so the Pages site and repository links are accessible without authentication.
