import { SupportedLanguage, SupportedPlatforms } from "@menteka/types";
import * as data from "./static/index";

export function getPlatformData(
  platformId: SupportedPlatforms,
  langCode: SupportedLanguage = "en"
) {
  return data[langCode][platformId];
}
