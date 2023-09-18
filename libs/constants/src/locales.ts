export const LOCALES = {
  PT_BR: 'pt-BR',
} as const;

export type TLocale = (typeof LOCALES)[keyof typeof LOCALES];
