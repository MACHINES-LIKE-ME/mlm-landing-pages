import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

import { getLandingPages, projectRoot } from './pages.mjs';

const distRoot = resolve(projectRoot, 'dist');
const basePath = normalizeBasePath(process.env.BASE_PATH ?? '/');
const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webmanifest', 'application/manifest+json; charset=utf-8'],
]);

function normalizeBasePath(value) {
  let normalized = value || '/';

  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }

  if (!normalized.endsWith('/')) {
    normalized = `${normalized}/`;
  }

  return normalized;
}

function stripBasePath(pathname) {
  if (basePath !== '/' && pathname.startsWith(basePath)) {
    return `/${pathname.slice(basePath.length)}`;
  }

  return pathname;
}

function toRequestPath(route) {
  if (route === '/') {
    return basePath;
  }

  return `${basePath}${route.replace(/^\//, '')}`;
}

function resolveDistPath(requestUrl) {
  const url = new URL(requestUrl, 'http://local.test');
  let pathname = decodeURIComponent(stripBasePath(url.pathname));

  if (pathname.endsWith('/')) {
    pathname = `${pathname}index.html`;
  }

  const filePath = resolve(distRoot, `.${pathname}`);

  if (!filePath.startsWith(distRoot)) {
    return null;
  }

  return filePath;
}

function extractLocalReferences(html, currentPath) {
  const references = new Set();
  const pattern = /(?:href|src)=["']([^"']+)["']/gi;
  let match = pattern.exec(html);

  while (match) {
    const rawReference = match[1];

    if (/^(#|mailto:|tel:|data:|javascript:)/i.test(rawReference)) {
      match = pattern.exec(html);
      continue;
    }

    const resolved = new URL(rawReference, `http://local.test${currentPath}`);

    if (resolved.origin === 'http://local.test') {
      references.add(resolved.pathname);
    }

    match = pattern.exec(html);
  }

  return references;
}

const server = createServer(async (request, response) => {
  try {
    const filePath = resolveDistPath(request.url ?? '/');

    if (!filePath) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    const fileStats = await stat(filePath).catch(() => null);

    if (!fileStats?.isFile()) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }

    const extension = extname(filePath);
    const body = await readFile(filePath);

    response.writeHead(200, {
      'content-length': body.length,
      'content-type': mimeTypes.get(extension) ?? 'application/octet-stream',
    });
    response.end(body);
  } catch (error) {
    response.writeHead(500);
    response.end(error instanceof Error ? error.message : 'Unknown server error');
  }
});

await new Promise((resolveServer) => {
  server.listen(0, '127.0.0.1', resolveServer);
});

const address = server.address();

if (!address || typeof address === 'string') {
  throw new Error('Unable to start smoke-test server.');
}

const origin = `http://127.0.0.1:${address.port}`;

try {
  const htmlRoutes = [
    '/',
    ...getLandingPages().map((page) => `/${page.href.replace(/^\.\//, '')}`),
  ];
  const localReferences = new Set(['/landing-pages.json', ...htmlRoutes]);

  for (const route of htmlRoutes) {
    const requestPath = toRequestPath(route);
    const response = await fetch(`${origin}${requestPath}`);

    if (!response.ok) {
      throw new Error(`${requestPath} returned ${response.status}.`);
    }

    const html = await response.text();

    for (const reference of extractLocalReferences(html, requestPath)) {
      localReferences.add(reference);
    }
  }

  for (const reference of localReferences) {
    const response = await fetch(`${origin}${toRequestPath(stripBasePath(reference))}`);

    if (!response.ok) {
      throw new Error(`${reference} returned ${response.status}.`);
    }
  }

  console.info(`Smoke test passed for ${localReferences.size} local route(s) and asset(s).`);
} finally {
  server.close();
}
