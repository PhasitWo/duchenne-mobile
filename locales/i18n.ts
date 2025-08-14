import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import th from "./th.json";
import en from "./en.json";

i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    resources: {
        th: { translation: th },
        en: { translation: en },
    },
    lng: "th", // Set a default language
    fallbackLng: "th", // Fallback if a translation is missing
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
