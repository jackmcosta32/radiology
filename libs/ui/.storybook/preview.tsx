import React from 'react';
import '../src/config/i18n';
import '../src/styles/global.scss';
import { sans, mono } from '../src/fonts';
import { ThemeProvider } from '../src/contexts/theme-context';

export const decorators = [
  (Story: React.FunctionComponent) => {
    React.useEffect(() => {
      const documentClasses = document.documentElement.classList;

      documentClasses.add(sans.variable);
      documentClasses.add(mono.variable);
    }, []);

    return (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    );
  },
];
