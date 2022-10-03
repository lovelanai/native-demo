import i18n from "i18next";
import { initReactI18next } from "react-i18next";


// Importing translation files

import translationEN from "./en.json";
import translationSV from "./sv.json";


//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
  },
  sv: {
    translation: translationSV,
  },
};




//i18N Initialization

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:"en", //default language
 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;