import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import { fileURLToPath, URL } from 'node:url';

// https://astro.build/config
export default defineConfig({
  site: 'https://jdosorio.github.io',
  base: '/esuite',
  output: 'static',
  build: {
    // Example: Generate `page.html` instead of `page/index.html` during build.
    format: 'file'
  },
  markdown: {
    shikiConfig: {
      theme: 'dark-plus'
    }
  },
  integrations: [mdx()],
  srcDir: './src/html',
  publicDir: './src/html/public',
  cacheDir: './dist/.astro',
  outDir: './dist/html',
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  vite: {
    resolve: {
      alias: {
        '@components': fileURLToPath(new URL('../html/components', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      watch: {
        ignored: ['!**/dist/**']
      }
    }
  }
})
