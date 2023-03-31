import "server-only";
import type { Locale } from "@/i18n-config";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  de: () => import("@/dictionaries/de.json").then((module) => module.default),
};

export default async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
