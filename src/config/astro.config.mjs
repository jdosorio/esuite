// astro.config.mjs

import { defineConfig } from 'astro/config'; // Importación correcta de defineConfig
import mdx from '@astrojs/mdx'; // Renombrado para evitar conflicto con la función
import { fileURLToPath, URL } from 'node:url';

// https://astro.build/config
export default defineConfig({
  // 1. AJUSTE CLAVE PARA GITHUB PAGES: 
  // Usa la URL COMPLETA (incluyendo el base) para asegurar que Astro genere las rutas absolutas correctamente.
  site: 'https://jdosorio.github.io/esuite', 
  
  // 2. AJUSTE CLAVE: 
  // 'base' debe ser el nombre de tu repositorio.
  base: '/esuite',
  
  output: 'static',
  build: {
    // Genera `page.html` en lugar de `page/index.html`
    format: 'file',
    // 3. AJUSTE CLAVE PARA RECURSOS: 
    // Fuerza a Astro a usar rutas relativas para assets (CSS, imágenes) en el HTML final.
    // Esto asegura que carguen correctamente en el subdirectorio de GitHub Pages.
    assetPrefix: '.' 
  },
  markdown: {
    shikiConfig: {
      theme: 'dark-plus'
    }
  },
  integrations: [mdx()],
  
  // Directorios que has personalizado
  srcDir: './src/html',
  publicDir: './src/html/public',
  cacheDir: './dist/.astro',
  outDir: './dist/html', // Directorio final a desplegar
  
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
});