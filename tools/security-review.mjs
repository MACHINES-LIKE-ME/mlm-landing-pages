import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';

import { projectRoot } from './pages.mjs';

const scannedDirectories = ['src', 'public', 'dist']
  .map((directory) => resolve(projectRoot, directory))
  .filter((directory) => existsSync(directory));

const scannedExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.svg',
  '.txt',
  '.webmanifest',
]);

const blockerPatterns = [
  {
    name: 'plain HTTP URL',
    pattern: /\bhttp:\/\/(?!www\.w3\.org\/)/i,
    guidance: 'Use HTTPS or a relative URL.',
  },
  {
    name: 'external script source',
    pattern: /<script[^>]+src=["']https?:\/\//i,
    guidance: 'Avoid CDN scripts. Bundle local JavaScript instead.',
  },
  {
    name: 'external stylesheet source',
    pattern: /<link[^>]+href=["']https?:\/\/[^"']+\.css/i,
    guidance: 'Avoid CDN stylesheets. Keep CSS local.',
  },
  {
    name: 'inline event handler',
    pattern: /<[^>]+\son[a-z]+\s*=/i,
    guidance: 'Bind events from local JavaScript files instead.',
  },
  {
    name: 'eval usage',
    pattern: /\beval\s*\(/,
    guidance: 'Do not execute dynamic JavaScript.',
  },
  {
    name: 'Function constructor usage',
    pattern: /\bnew\s+Function\s*\(/,
    guidance: 'Do not execute dynamic JavaScript.',
  },
  {
    name: 'document.write usage',
    pattern: /\bdocument\.write\s*\(/,
    guidance: 'Use safe DOM APIs such as textContent and append.',
  },
  {
    name: 'innerHTML assignment',
    pattern: /\.innerHTML\s*=/,
    guidance: 'Use textContent or safe DOM construction.',
  },
  {
    name: 'insertAdjacentHTML usage',
    pattern: /\.insertAdjacentHTML\s*\(/,
    guidance: 'Use safe DOM construction.',
  },
];

const secretPatterns = [
  {
    name: 'AWS access key',
    pattern: /AKIA[0-9A-Z]{16}/,
  },
  {
    name: 'GitHub token',
    pattern: /github_pat_[A-Za-z0-9_]{20,}/,
  },
  {
    name: 'OpenAI-style API key',
    pattern: /sk-[A-Za-z0-9]{32,}/,
  },
  {
    name: 'private key block',
    pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  },
];

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(fullPath)));
    } else if (entry.isFile() && scannedExtensions.has(extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function findTargetBlankWithoutRel(html) {
  const unsafeLinks = [];
  const anchorPattern = /<a\s+[^>]*target=["']_blank["'][^>]*>/gi;
  let match = anchorPattern.exec(html);

  while (match) {
    const anchor = match[0];
    const relMatch = anchor.match(/rel=["']([^"']+)["']/i);
    const relValues = relMatch?.[1].toLowerCase().split(/\s+/) ?? [];

    if (!relValues.includes('noopener') || !relValues.includes('noreferrer')) {
      unsafeLinks.push(anchor);
    }

    match = anchorPattern.exec(html);
  }

  return unsafeLinks;
}

const files = [];

for (const directory of scannedDirectories) {
  files.push(...(await listFiles(directory)));
}

const errors = [];

for (const filePath of files) {
  const contents = await readFile(filePath, 'utf8');
  const relativePath = relative(projectRoot, filePath);

  for (const check of [...blockerPatterns, ...secretPatterns]) {
    if (check.pattern.test(contents)) {
      const guidance = 'guidance' in check ? ` ${check.guidance}` : '';
      errors.push(`${relativePath}: found ${check.name}.${guidance}`);
    }
  }

  if (extname(filePath) === '.html') {
    if (!contents.includes('http-equiv="Content-Security-Policy"')) {
      errors.push(`${relativePath}: missing Content-Security-Policy meta tag.`);
    }

    if (!contents.includes('name="referrer"')) {
      errors.push(`${relativePath}: missing referrer policy meta tag.`);
    }

    const unsafeLinks = findTargetBlankWithoutRel(contents);

    if (unsafeLinks.length > 0) {
      errors.push(`${relativePath}: target="_blank" links must include rel="noopener noreferrer".`);
    }
  }
}

if (errors.length > 0) {
  throw new Error(`Security review failed:\n- ${errors.join('\n- ')}`);
}

console.info(`Security review passed for ${files.length} file(s).`);
