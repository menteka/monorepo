import { Platform, SupportedLanguage } from "@menteka/types";
import { writeFile, mkdir } from "fs/promises";
import { performance } from "perf_hooks";

const langs: SupportedLanguage[] = ["en", "nl"];
const disclaimer = `/** This file is auto-generated in \`packages/platforms/build.ts\`. Do not modify it manually. **/\n`;

build();

async function build() {
  const start = performance.now();

  await Promise.all(
    langs.map(async (lang) => {
      await mkdir(`./src/static/${lang}`, { recursive: true });
    })
  );

  const files = import.meta.glob<Platform>("./src/data/*.ts", {
    import: "default",
    eager: true,
  });
  const platformIds: string[] = [];
  Object.entries(files).forEach(([path, file]) => {
    const platformId = path.split("/").at(-1)!.replace(".ts", "");
    platformIds.push(platformId);

    langs.forEach((lang) => {
      const {
        params,
        feedFormulas: feedFormulaTranslations,
        description,
        name,
      } = (file as Platform).translations[lang];
      const { feedSupport, feedFormulas: feedFormulaValues } = file as Platform;
      const feedFormulas = Object.entries(feedFormulaValues).map(
        ([key, { formula, type, isBridged }]) => ({
          formula,
          type,
          isBridged: !!isBridged,
          ...feedFormulaTranslations[key],
        })
      );
      const result = { name, description, feedSupport, feedFormulas, params };

      writeFile(
        `./src/static/${lang}/${platformId}.json`,
        JSON.stringify(result, null, 2),
        {}
      );
    });
  });

  await Promise.all(
    langs.map(async (lang) => {
      const indexContent = platformIds
        .map(
          (platformId) =>
            `export { default as ${platformId} } from './${platformId}.json';`
        )
        .join("\n");

      await writeFile(
        `./src/static/${lang}/index.ts`,
        disclaimer + indexContent,
        {}
      );
    })
  );

  const genericIndexContent = langs
    .map((lang) => `export * as ${lang} from './${lang}/index';`)
    .join("\n");

  await writeFile(
    `./src/static/index.ts`,
    disclaimer + genericIndexContent,
    {}
  );

  await writeFile(
    "../types/src/platforms.ts",
    disclaimer +
      `export type SupportedPlatforms = ${platformIds.map((platformId) => `"${platformId}"`).join(" | ")}`,
    {}
  );

  const end = performance.now();
  console.log(
    `Finished generating platform library, build took ${((end - start) / 1000).toFixed(3)}s`
  );
}
