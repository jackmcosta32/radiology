import type { Meta } from '@storybook/react';
import { Header, type HeaderProps } from './index';

const Story: Meta<typeof Header> = {
  component: Header,
  title: 'Components/common/Header',
};

export default Story;

export const Primary = {
  args: {} as HeaderProps,
};
