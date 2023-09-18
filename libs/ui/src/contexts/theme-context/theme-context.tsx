import React from 'react';
import '../../styles/index.module.css';
import { useTranslation } from 'react-i18next';
import { DEFAULTS } from '../../config/defaults';
import type {
  ThemeContextProps,
  ThemeProviderProps,
} from './theme-context.types';

export const ThemeContext = React.createContext<ThemeContextProps>({
  locale: DEFAULTS.LOCALE,
  mode: DEFAULTS.PALETTE_MODE,
  setMode: (mode) => undefined,
  setLocale: (locale) => undefined,
});

export const ThemeProvider = ({
  children,
  defaultMode,
  defaultLocale,
}: ThemeProviderProps) => {
  const { i18n, ready } = useTranslation();
  const [mode, setMode] = React.useState(defaultMode ?? DEFAULTS.PALETTE_MODE);
  const [locale, setLocale] = React.useState(defaultLocale ?? DEFAULTS.LOCALE);

  const handleSetLocale = () => {
    if (!ready || !i18n) return;

    i18n.changeLanguage(locale);
    setLocale(locale);
  };

  return (
    <ThemeContext.Provider
      value={{
        mode: mode,
        locale: locale,
        setMode: setMode,
        setLocale: handleSetLocale,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
