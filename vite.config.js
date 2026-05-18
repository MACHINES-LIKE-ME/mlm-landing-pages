import { defineConfig } from 'vite';

import { getHtmlInputs } from './tools/pages.mjs';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'mlm-landing-pages';
const productionBase = process.env.GITHUB_ACTIONS ? `/${repositoryName}/` : '/';
const devHost = process.env.CODESPACES ? '0.0.0.0' : '127.0.0.1';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  base: process.env.BASE_PATH ?? productionBase,
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    cssMinify: 'esbuild',
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      input: getHtmlInputs(),
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  server: {
    host: devHost,
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: devHost,
    port: 4173,
    strictPort: true,
  },
});
