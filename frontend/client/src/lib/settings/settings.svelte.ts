import { Store } from "@tauri-apps/plugin-store";
import type { SupportedLanguage } from "@menteka/types";
import { supportedLangs, defaultLang } from "@translations";

type Setting<T> = {
  isSynced: boolean;
  value: T;
};
export const themes = [
  "neobrutalism",
  "classic",
  "frutiger-aero",
  "monochrome",
  "neumorphism",
  "vaporwave",
] as const;

type Theme = (typeof themes)[0];

const defaultTheme = "neobrutalism";
type Mode = "light" | "dark";

export async function initializeSettings() {
  const tauriStore = await Store.load("settings.json");

  const theme = await createStore<Theme>("theme", () => defaultTheme);
  const mode = await createStore<Mode>("mode", () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const language = await createStore<SupportedLanguage>("language", () => {
    if (navigator.language in supportedLangs) {
      return navigator.language as SupportedLanguage;
    }
    const standardizedLang = navigator.language.toLowerCase().split("-")[0];
    if (standardizedLang && standardizedLang in supportedLangs) {
      return standardizedLang as SupportedLanguage;
    }
    return defaultLang;
  });

  return {
    get theme() {
      return theme.val;
    },
    set theme(newTheme: Setting<Theme>) {
      theme.val = newTheme;
    },
    get mode() {
      return mode.val;
    },
    set mode(newMode: Setting<Mode>) {
      mode.val = newMode;
    },
    get language() {
      return language.val;
    },
    set language(newLanguage: Setting<SupportedLanguage>) {
      language.val = newLanguage;
    },
  };

  async function createStore<T>(key: string, createFallbackFn: () => T) {
    const cachedVal = await tauriStore.get<Setting<T>>("some-key");
    let val: Setting<T> = cachedVal ?? {
      value: createFallbackFn(),
      isSynced: false,
    };

    return {
      get val() {
        return val;
      },
      set val(newVal: Setting<T>) {
        tauriStore.set(key, newVal);
        val = newVal;
      },
    };
  }
}
