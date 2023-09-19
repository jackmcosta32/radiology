import { Header } from './index';
import type { Meta } from '@storybook/react';
import type { HeaderProps } from './header.types';

const Story: Meta<typeof Header> = {
  component: Header,
  title: 'Components/common/Header',
};

export default Story;

export const Primary = {
  args: {} as HeaderProps,
};
