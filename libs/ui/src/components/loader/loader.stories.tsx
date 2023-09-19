import type { Meta } from '@storybook/react';
import { Loader, type LoaderProps } from './index';

const Story: Meta<typeof Loader> = {
  component: Loader,
  title: 'Components/common/Loader',
};

export default Story;

export const Primary = {
  args: {} as LoaderProps,
};
