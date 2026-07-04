import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sitesbuilder.store',
  output: 'static',
  build: {
    format: 'directory'
  }
});
