# MLM Landing Pages

[![Build and deploy GitHub Pages](https://github.com/MACHINES-LIKE-ME/mlm-landing-pages/actions/workflows/pages.yml/badge.svg)](https://github.com/MACHINES-LIKE-ME/mlm-landing-pages/actions/workflows/pages.yml)

Compact public landing pages built from plain HTML, CSS, and JavaScript. The repo uses Vite only as a static build tool, so published pages are minified static files with no runtime framework and no runtime package dependencies.

## Public Links

Public site: <https://machines-like-me.github.io/mlm-landing-pages/>

Landing pages:

- [Landing page index](https://machines-like-me.github.io/mlm-landing-pages/)
- [Compact Landing Page Starter](https://machines-like-me.github.io/mlm-landing-pages/pages/starter/)
- [Generated page manifest](https://machines-like-me.github.io/mlm-landing-pages/landing-pages.json)

## Stack

- Source: plain HTML, CSS, and browser JavaScript in `src/`
- Build: Vite multi-page app mode with production minification
- Post-build: HTML minification, generated page manifest, compact size-budget checks
- Quality gates: ESLint, Prettier, custom static security review, local smoke test, `npm audit`
- Hosting: GitHub Pages deployed by GitHub Actions from `dist/`
- Runtime dependencies: none

## Commands

Use Node 24 LTS and npm 11.

```sh
npm ci
npm run dev
npm run validate
npm run build
npm run preview
```

`npm run validate` is the full pre-commit and CI gate. It runs linting, formatting checks, build, security review, smoke tests, and `npm audit --audit-level=moderate`.

## Codespaces

This repo includes a devcontainer for GitHub Codespaces.

- Runtime image: Node 24 on Debian Bookworm
- Setup: `npm ci && npm run validate` runs when the Codespace is created
- Developer server: `npm run dev` starts when the Codespace attaches
- Forwarded ports: `5173` for Vite dev and `4173` for production preview
- Included extensions: ESLint, Prettier, and GitHub Actions support

If the Codespace does not auto-open the preview, open the forwarded port for `5173` from the Codespaces Ports panel.

## Add A Landing Page

1. Create `src/pages/<slug>/index.html` with a lowercase kebab-case slug.
2. Keep CSS, JavaScript, images, icons, and manifests local. Do not use CDNs by default.
3. Add the page to `src/landing-pages.json`.
4. Add a visible link on `src/index.html` so GitHub Pages visitors can find it.
5. Run `npm run validate` before committing.

## Compact Build Rules

The build fails if output files exceed the default budgets in `tools/check-output.mjs`:

- HTML file: 35 KB
- CSS file: 50 KB
- JS file: 50 KB
- Image file: 220 KB
- Whole `dist/`: 350 KB

Budgets can be adjusted with `COMPACT_MAX_HTML_BYTES`, `COMPACT_MAX_CSS_BYTES`, `COMPACT_MAX_JS_BYTES`, `COMPACT_MAX_IMAGE_BYTES`, and `COMPACT_MAX_TOTAL_BYTES` when a real page needs a justified exception.

## Security Baseline

The static security review blocks common regressions before deploy:

- Plain `http://` URLs
- External script and stylesheet CDNs
- Inline event handlers such as `onclick`
- Dynamic JavaScript execution such as `eval` and `new Function`
- Unsafe HTML injection patterns such as `innerHTML =`, `insertAdjacentHTML`, and `document.write`
- Missing Content Security Policy and referrer policy metadata
- `target="_blank"` links without `rel="noopener noreferrer"`
- Common secret formats such as private keys, GitHub tokens, OpenAI-style keys, and AWS access keys

See `AGENTS.md` and `docs/security-review.md` for the contributor and agent workflow.
