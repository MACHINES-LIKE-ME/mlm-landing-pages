import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';

import { projectRoot } from './pages.mjs';

const distRoot = resolve(projectRoot, 'dist');

const budgets = {
  html: Number(process.env.COMPACT_MAX_HTML_BYTES ?? 150 * 1024),
  css: Number(process.env.COMPACT_MAX_CSS_BYTES ?? 50 * 1024),
  js: Number(process.env.COMPACT_MAX_JS_BYTES ?? 50 * 1024),
  image: Number(process.env.COMPACT_MAX_IMAGE_BYTES ?? 500 * 1024),
  total: Number(process.env.COMPACT_MAX_TOTAL_BYTES ?? 3000 * 1024),
};

const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp']);

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(fullPath)));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  return `${(bytes / 1024).toFixed(1)} KB`;
}

function budgetFor(filePath) {
  const extension = extname(filePath);

  if (extension === '.html') {
    return budgets.html;
  }

  if (extension === '.css') {
    return budgets.css;
  }

  if (extension === '.js') {
    return budgets.js;
  }

  if (imageExtensions.has(extension)) {
    return budgets.image;
  }

  return null;
}

const distStats = await stat(distRoot).catch(() => null);

if (!distStats?.isDirectory()) {
  throw new Error('dist/ does not exist. Run npm run build first.');
}

const files = await listFiles(distRoot);
const errors = [];
let totalBytes = 0;

for (const filePath of files) {
  const fileStats = await stat(filePath);
  const relativePath = relative(distRoot, filePath);
  const extension = extname(filePath);
  const maxBytes = budgetFor(filePath);

  totalBytes += fileStats.size;

  if (extension === '.map') {
    errors.push(`${relativePath} is a source map. Production builds must not publish source maps.`);
  }

  if (maxBytes && fileStats.size > maxBytes) {
    errors.push(
      `${relativePath} is ${formatBytes(fileStats.size)}, above the ${formatBytes(maxBytes)} budget.`,
    );
  }

    const isVitePage = !relativePath.includes('/') || relativePath.startsWith('pages/');
        if (extension === '.html' && isVitePage) {
    const html = await readFile(filePath, 'utf8');

    if (!html.includes('http-equiv="Content-Security-Policy"')) {
      errors.push(`${relativePath} is missing a Content-Security-Policy meta tag.`);
    }

    if (!html.includes('name="referrer"')) {
      errors.push(`${relativePath} is missing a referrer policy meta tag.`);
    }
  }
}

if (totalBytes > budgets.total) {
  errors.push(
    `dist/ is ${formatBytes(totalBytes)}, above the ${formatBytes(budgets.total)} total budget.`,
  );
}

if (errors.length > 0) {
  throw new Error(`Compact build check failed:\n- ${errors.join('\n- ')}`);
}

console.info(`Compact build check passed. dist/ size: ${formatBytes(totalBytes)}.`);
