import fs from "fs/promises";
import path from "path";
import { supportedLangs } from "@translations";

const DIST_DIR = "./src-tauri/resources/translations";

async function mergeTranslations(lang: string) {
  const merged = {};
  const files = Object.keys(import.meta.glob("/src/**/content/*.json")).filter(
    (file) => file.includes(lang)
  );
  for (const file of files) {
    const content = await fs.readFile(`.${file}`, "utf-8");
    Object.assign(merged, JSON.parse(content));
  }
  return merged;
}

async function writeTranslations(lang: string, content: object) {
  await fs.mkdir(DIST_DIR, { recursive: true });
  await fs.writeFile(
    path.join(DIST_DIR, `${lang}.json`),
    JSON.stringify(content, null, 2)
  );
}

async function processTranslations() {
  let keys: string[] = [];
  for (const lang of supportedLangs) {
    const merged = await mergeTranslations(lang);
    const allKeys = Object.entries(merged).reduce(
      (acc: string[], [key, value]) => {
        acc.push(key);
        if (typeof value === "object" && value !== null) {
          Object.keys(value).forEach((subKey) => acc.push(`${key}.${subKey}`));
        }
        return acc;
      },
      []
    );

    keys = allKeys;
    await writeTranslations(lang, merged);
  }
  await fs.writeFile(
    "./src/lib/translations/types.ts",
    `/** This file is auto-generated in \`frontend/client/src/scripts/copy-translations.ts\`. Do not modify it manually. **/
export type Key = ${keys.map((key) => `"${key}"`).join(" | ")};`
  );
}

async function watchMode() {
  //   const server = await createServer({
  //     configFile: false,
  //     server: { watch: { usePolling: true } },
  //   });

  //   const patterns = dirs.map((dir) => `${dir}/*.json`);
  processTranslations();
  //   server.watcher.add(patterns);
  //   server.watcher.on("change", async (path) => {
  //     console.log(`Change detected on ${path}`);
  //     await processTranslations();
  //   });
}

// Main execution
const isWatch = process.argv.includes("--watch");

if (isWatch) {
  watchMode();
} else {
  processTranslations()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Error processing translations:", error);
      process.exit(1);
    });
}
