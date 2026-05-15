import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { projectRoot, readLandingConfig } from './pages.mjs';

const config = readLandingConfig();
const distRoot = resolve(projectRoot, 'dist');
const manifest = {
  repository: config.repository,
  publishedUrl: config.publishedUrl,
  generatedAt: new Date().toISOString(),
  pages: config.pages.map((page) => ({
    slug: page.slug,
    title: page.title,
    description: page.description,
    href: page.href,
  })),
};

await mkdir(distRoot, { recursive: true });
await writeFile(resolve(distRoot, 'landing-pages.json'), `${JSON.stringify(manifest, null, 2)}\n`);

console.info(`Wrote dist/landing-pages.json with ${manifest.pages.length} landing page(s).`);
