import React from 'react';
import '../src/config/i18n';
import '../src/styles/global.css';
import { ThemeProvider } from '../src/contexts/theme-context';

export const decorators = [
  (Story: React.FunctionComponent) => {
    return (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    );
  },
];
