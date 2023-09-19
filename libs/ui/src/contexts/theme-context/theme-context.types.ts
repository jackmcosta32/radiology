import type { ReactNode } from 'react';
import type { TLocale, TPaletteMode } from '@/constants';

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
