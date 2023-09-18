import type { ReactNode } from 'react';
import type { TLocale } from '@/constants/locales';
import type { TPaletteMode } from '@/constants/palette-modes';

export interface ThemeContextProps {
  locale: string;
  mode: TPaletteMode;
  children?: ReactNode;
  setLocale: (locale: TLocale) => void;
  setMode: (mode: TPaletteMode) => void;
}

export interface ThemeProviderProps {
  children?: ReactNode;
  defaultLocale?: TLocale;
  defaultMode?: TPaletteMode;
}
