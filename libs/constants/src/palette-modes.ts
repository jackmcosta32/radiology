export const PALETTE_MODES = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

export type TPaletteMode = (typeof PALETTE_MODES)[keyof typeof PALETTE_MODES];
