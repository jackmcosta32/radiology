'use client';

import React from 'react';
import '../../styles/global.css';
import { TLocale } from '@/constants/locales';
import { useTranslation } from 'react-i18next';
import { DEFAULTS } from '../../config/defaults';
import { PALETTE_MODES, TPaletteMode } from '@/constants/palette-modes';
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

  const handleSetLocale = (locale: TLocale) => {
    if (!ready || !i18n) return;

    i18n.changeLanguage(locale);
    setLocale(locale);
  };

  const handleSetMode = (mode: TPaletteMode) => {
    setMode(mode);

    if (typeof document === 'undefined') return;

    const classList = document.documentElement.classList;

    if (classList.contains(mode)) return;

    const toDarkMode = mode === 'dark';

    if (toDarkMode) {
      classList.add(PALETTE_MODES.DARK);
      classList.remove(PALETTE_MODES.LIGHT);

      return;
    }

    classList.add(PALETTE_MODES.LIGHT);
    classList.remove(PALETTE_MODES.DARK);
  };

  return (
    <ThemeContext.Provider
      value={{
        mode: mode,
        locale: locale,
        setMode: handleSetMode,
        setLocale: handleSetLocale,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
