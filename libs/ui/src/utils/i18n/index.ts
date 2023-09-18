import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import languageDetector from 'i18next-browser-languagedetector';

export function initializeI18n(options?: InitOptions) {
  if (i18n.isInitialized) return;

  const initializeOptions = Object.assign(
    {
      debug: false,
      fallbackLng: 'pt-BR',
      keySeparator: false,
      defaultNS: 'generics',
      interpolation: { escapeValue: false },
    },
    options
  );

  return i18n
    .use(initReactI18next)
    .use(languageDetector)
    .init(initializeOptions);
}

export default i18n;
