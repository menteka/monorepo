//Ensure that all routes have translations for all languages
//Ensure that all translation files have parity for the same page, i.e. same content

import { load_config } from "@sveltejs/kit/src/core/config/index.js";
import { all } from "@sveltejs/kit/src/core/sync/sync.js";

(async () => {
  const conf = await load_config();

  const manifest_data = all(conf, "development");

  const routes = manifest_data.manifest_data.routes;

  console.info(routes);
})();
