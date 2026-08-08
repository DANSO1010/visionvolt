// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: replace with the real production domain once the client shares it.
  site: 'https://www.vision-volt.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), sitemap()]
});