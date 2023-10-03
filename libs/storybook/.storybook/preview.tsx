import React from 'react';
import '@/ui/config/i18n';
import '@/ui/styles/global.scss';
import { sans, mono } from '@/ui/fonts';
import { ThemeProvider } from '@/ui/contexts/theme-context';

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
