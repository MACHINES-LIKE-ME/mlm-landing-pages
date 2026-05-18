# Security Policy

This repository publishes static landing pages to GitHub Pages. The security goal is to keep pages public, local, auditable, and free of secrets or unnecessary third-party execution.

## Supported Surface

- Static HTML, CSS, JavaScript, SVG, JSON, and text assets in `src/` and `public/`
- Build and validation tooling in `tools/`
- GitHub Actions workflows in `.github/workflows/`

## Baseline Controls

- `npm run validate` is required before commits and in CI.
- `npm audit --audit-level=moderate` runs in the validation gate.
- The custom security review scans built and source web assets for unsafe patterns.
- GitHub Pages deploys from a CI-built artifact, not from locally committed `dist/` output.
- Pages use local assets and a restrictive CSP meta tag because GitHub Pages cannot set custom response headers for this project.

## Reporting

Use GitHub private vulnerability reporting or contact the repository maintainers through the organization if you find a vulnerability. Do not open a public issue that includes secrets, exploit details, or sensitive campaign data.

## Maintainer Response

Security fixes should preserve the static-only architecture. If a mitigation requires a third-party service or external script, document the tradeoff and get maintainer approval before merging.
