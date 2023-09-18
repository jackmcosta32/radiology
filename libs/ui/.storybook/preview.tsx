import React from 'react';
import '../src/config/i18n';
import { ThemeProvider } from '../src/contexts/theme-context';

export const decorators = [
  (Story: React.ReactNode) => {
    if (!Story) return null;

    return (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    );
  },
];
