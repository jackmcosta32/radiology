import type { Meta } from '@storybook/react';
import { Button, type ButtonProps } from './index';

const Story: Meta<typeof Button> = {
  component: Button,
  title: 'Components/common/Button',
};

export default Story;

export const Primary = {
  args: {
    children: 'Button',
  } as ButtonProps,
};
