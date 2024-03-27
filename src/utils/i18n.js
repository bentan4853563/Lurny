import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend) // Load translations through http (e.g., from your server)
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Pass the i18n instance to react-i18next.
  .init({
    fallbackLng: "en", // use en if detected lng is not available

    detection: {
      order: ["queryString", "cookie", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
