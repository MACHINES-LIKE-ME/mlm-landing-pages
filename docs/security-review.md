# Static Security Review

This review describes the baseline used for every landing page in this repository.

## Threat Model

- Public visitors can load pages without authentication.
- GitHub Pages serves static files and does not run a backend for this repository.
- The main risks are exposed secrets, unsafe third-party scripts, broken links, mixed content, phishing-like copy, oversized assets, and DOM injection bugs introduced by future JavaScript.

## Controls In Place

- No runtime npm dependencies.
- No external scripts, external stylesheets, remote fonts, or CDN assets by default.
- Content Security Policy meta tags restrict scripts, styles, images, fonts, connections, base URI, forms, and object embeds to safe defaults.
- `referrer` policy is set to `no-referrer`.
- Custom security review blocks common unsafe patterns and common secret formats.
- Smoke tests serve `dist/` locally and fetch the public index, registered landing pages, manifest, and local assets.
- Size budgets fail builds that drift away from compact static output.
- Dependabot monitors npm package and GitHub Actions updates.

## Manual Review Required For Exceptions

- Analytics, pixels, tag managers, or session replay tools
- Form endpoints or any data collection
- External media or embed providers
- Remote fonts or icon packages
- Any script that receives untrusted input and writes to the DOM
- Any increase to compact size budgets

## Pre-Commit Gate

Run this before committing:

```sh
npm run validate
```

The command runs linting, formatting, build, security review, local smoke tests, and `npm audit --audit-level=moderate`.
