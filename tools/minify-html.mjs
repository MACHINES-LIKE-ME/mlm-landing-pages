import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

import { minify } from 'html-minifier-terser';

import { projectRoot } from './pages.mjs';

const distRoot = resolve(projectRoot, 'dist');

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

const distStats = await stat(distRoot).catch(() => null);

if (!distStats?.isDirectory()) {
  throw new Error('dist/ does not exist. Run Vite before HTML minification.');
}

const htmlFiles = (await listFiles(distRoot)).filter((filePath) => extname(filePath) === '.html');

for (const filePath of htmlFiles) {
  const source = await readFile(filePath, 'utf8');
  const output = await minify(source, {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    decodeEntities: true,
    minifyCSS: true,
    minifyJS: true,
    removeAttributeQuotes: false,
    removeComments: true,
    removeEmptyAttributes: true,
    removeOptionalTags: false,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    sortAttributes: true,
    sortClassName: true,
    useShortDoctype: true,
  });

  if (output !== source) {
    await writeFile(filePath, `${output}\n`);
  }
}

console.info(`Minified ${htmlFiles.length} HTML file(s).`);
