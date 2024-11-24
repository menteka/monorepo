import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  compilerOptions: {
    runes: true,
  },

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    alias: {
      "@components": "src/lib/components/index",
      "@config": "src/lib/config/index",
      "@db": "src/lib/db/index",
      "@logic/*": "src/lib/logic/*",
      "@parser": "src/lib/parser/index",
      "@translations": "src/lib/translations/index",
      "@svelte/*": "node_modules/svelte/*",
    },
  },
};

export default config;
