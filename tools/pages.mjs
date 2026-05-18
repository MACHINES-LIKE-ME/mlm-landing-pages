import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const sourceRoot = resolve(projectRoot, 'src');

const landingConfigPath = resolve(sourceRoot, 'landing-pages.json');
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function readLandingConfig() {
  const config = JSON.parse(readFileSync(landingConfigPath, 'utf8'));

  if (!Array.isArray(config.pages)) {
    throw new Error('src/landing-pages.json must contain a pages array.');
  }

  for (const page of config.pages) {
    if (!slugPattern.test(page.slug)) {
      throw new Error(`Invalid landing page slug "${page.slug}". Use lowercase kebab-case.`);
    }

    if (!page.title || !page.description || !page.href) {
      throw new Error(`Landing page "${page.slug}" must define title, description, and href.`);
    }

    const expectedHref = `./pages/${page.slug}/`;

    if (page.href !== expectedHref) {
      throw new Error(`Landing page "${page.slug}" href must be "${expectedHref}".`);
    }

    const htmlPath = resolve(sourceRoot, 'pages', page.slug, 'index.html');

    if (!existsSync(htmlPath)) {
      throw new Error(`Landing page "${page.slug}" is missing ${htmlPath}.`);
    }
  }

  return config;
}

export function getLandingPages() {
  return readLandingConfig().pages;
}

export function getHtmlInputs() {
  const inputs = {
    index: resolve(sourceRoot, 'index.html'),
    404: resolve(sourceRoot, '404.html'),
  };

  for (const page of getLandingPages()) {
    inputs[`pages/${page.slug}/index`] = resolve(sourceRoot, 'pages', page.slug, 'index.html');
  }

  return inputs;
}
