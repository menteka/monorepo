import { Store } from "@tauri-apps/plugin-store";
import type { SupportedLanguage } from "@menteka/types";
import { supportedLangs } from "@translations";

export const themes = [
  "neobrutalism",
  "classic",
  "frutiger-aero",
  "monochrome",
  "neumorphism",
  "vaporwave",
  "bedtime",
] as const;

type Theme = (typeof themes)[number];
type Mode = "light" | "dark" | "auto";

type Setting<T> = {
  isSynced: boolean;
  value: T;
};

type Settings = {
  theme: Setting<Theme>;
  mode: Setting<Mode>;
  language: Setting<SupportedLanguage>;
};

// Constants
const DEFAULT_THEME: Theme = "neobrutalism";
const STORE_FILE = "settings.json";
const DEFAULT_MODE: Mode = "auto";
const DEFAULT_LANG: SupportedLanguage = "en";

// Create and export the settings store
function createSettingsStore() {
  // Internal state
  const state = $state<Settings>({
    theme: { value: DEFAULT_THEME, isSynced: false },
    mode: {
      value: DEFAULT_MODE,
      isSynced: false,
    },
    language: { value: DEFAULT_LANG, isSynced: false },
  });

  let tauriStore: Store | null = null;

  return {
    async initialize() {
      try {
        tauriStore = await Store.load(STORE_FILE);
        const storedTheme = await tauriStore.get<Setting<Theme>>("theme");
        if (storedTheme) state.theme = storedTheme;

        const storedMode = await tauriStore.get<Setting<Mode>>("mode");
        if (storedMode) state.mode = storedMode;

        const storedLanguage =
          await tauriStore.get<Setting<SupportedLanguage>>("language");
        if (storedLanguage) {
          state.language = storedLanguage;
        } else {
          let detectedLang: SupportedLanguage = DEFAULT_LANG;

          if (navigator.language in supportedLangs) {
            detectedLang = navigator.language as SupportedLanguage;
          } else {
            const standardizedLang = navigator.language
              .toLowerCase()
              .split("-")[0];
            if (standardizedLang && standardizedLang in supportedLangs) {
              detectedLang = standardizedLang as SupportedLanguage;
            }
          }

          state.language = { value: detectedLang, isSynced: false };
        }
      } catch (error) {
        console.error("Failed to initialize settings:", error);
      }
    },
    get theme() {
      return state.theme;
    },
    async setTheme(newTheme: Theme) {
      const setting: Setting<Theme> = { ...state.theme, value: newTheme };
      if (tauriStore) {
        await tauriStore.set("theme", setting);
      }
      state.theme.value = newTheme;
    },
    get mode() {
      return state.mode;
    },
    async setMode(newMode: Mode) {
      const setting: Setting<Mode> = { ...state.mode, value: newMode };
      if (tauriStore) {
        await tauriStore.set("mode", setting);
      }
      state.mode.value = newMode;
    },
    get language() {
      return state.language;
    },
    async setLanguage(newLanguage: SupportedLanguage) {
      const setting: Setting<SupportedLanguage> = {
        ...state.language,
        value: newLanguage,
      };
      if (tauriStore) {
        await tauriStore.set("language", setting);
      }
      state.language.value = newLanguage;
    },
    async toggleSynched(key: "theme" | "mode" | "language") {
      const newSyncState = !state[key].isSynced;

      if (tauriStore) {
        await tauriStore.set(key, {
          ...state[key],
          isSynced: newSyncState,
        });
      }
      state[key].isSynced = newSyncState;
    },
    get isInitialized() {
      return tauriStore !== null;
    },
  };
}

export const settings = createSettingsStore();
