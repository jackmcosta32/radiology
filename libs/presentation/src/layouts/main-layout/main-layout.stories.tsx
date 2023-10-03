import { MainLayout } from './index';
import type { Meta } from '@storybook/react';
import type { MainLayoutProps } from './main-layout.types';

const Story: Meta<typeof MainLayout> = {
  component: MainLayout,
  title: 'Layouts/MainLayout',
};

export default Story;

export const Primary = {
  args: {} as MainLayoutProps,
};
