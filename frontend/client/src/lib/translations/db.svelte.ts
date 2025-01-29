import { Store } from "@tauri-apps/plugin-store";
import Database from "@tauri-apps/plugin-sql";
import type { SupportedLanguage } from "@menteka/types";
import { getVersion } from "@tauri-apps/api/app";
import { readFile } from "@tauri-apps/plugin-fs";
import { supportedLangs } from "./meta";
import { resolveResource } from "@tauri-apps/api/path";
import type { Key } from "./types";

function createTranslationsStore() {
  // Internal state
  let db: Database | null = $state(null);
  let isInitialized = $state(false);
  let cache = $state<Record<string, string>>({});

  return {
    async initialize() {
      const STORE_FILE = "i18n.json";
      const STORE_KEY = "translation-version";
      const tauriStore = await Store.load(STORE_FILE);
      const storedVersion = await tauriStore.get<string>(STORE_KEY);
      const appVersion = await getVersion();
      console.log(import.meta.env.MODE);
      //Only load translations the first time the app loads after an update or in development mode
      //All other times, it will reuse the existing database.
      if (
        import.meta.env.MODE === "development" ||
        storedVersion !== appVersion
      ) {
        for (const lang of supportedLangs) {
          try {
            const resourcePath = await resolveResource(
              `resources/translations/${lang}.json`
            );
            const data = await readFile(resourcePath);
            const json = flattenObject(
              JSON.parse(new TextDecoder().decode(data))
            );

            const db = await Database.load(`sqlite:translations${lang}.db`);
            await db.execute(`DROP TABLE IF EXISTS translations;
              CREATE TABLE translations (key TEXT PRIMARY KEY, value TEXT);`);
            const values = Object.entries(json).map(([key, value]) => ({
              key,
              value,
            }));
            const placeholders = values.map(() => "(?, ?)").join(",");
            await db.execute(
              `INSERT INTO translations (key, value) VALUES ${placeholders}`,
              values.flatMap(({ key, value }) => [key, value])
            );
          } catch (e) {
            console.log("error", e);
          }
        }
      }
      isInitialized = true;
    },
    get isReady() {
      return isInitialized;
    },
    async loadTranslations(lang: SupportedLanguage) {
      db = await Database.load(`sqlite:translations${lang}.db`);
      cache = {};
    },
    get(key: Key) {
      const result = cache[key];
      if (!result) {
        this.fetchTranslation(key);
      }
      return result ?? key;
    },
    async fetchTranslation(key: Key) {
      if (db) {
        try {
          const result = (
            await db.select<{ value: string }[]>(
              "SELECT value FROM translations WHERE key = ?",
              [key]
            )
          )[0];
          if (result?.value) {
            cache[key] = result.value;
          }
        } catch (error) {
          console.error("Translation error:", error);
        }
      }
    },
  };
}

export const translations = createTranslationsStore();

export function t(key: Key) {
  return translations.get(key);
}

function flattenObject(
  obj: Record<string, string | Record<string, string>>,
  parentKey = ""
) {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof obj[key] === "object" && obj[key] !== null) {
        Object.assign(acc, flattenObject(obj[key], newKey));
      } else {
        acc[newKey] = obj[key]!;
      }

      return acc;
    },
    {} as Record<string, string>
  );
}
