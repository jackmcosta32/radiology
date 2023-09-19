import type { Meta } from '@storybook/react';
import { CircularProgress, type CircularProgressProps } from './index';

const Story: Meta<typeof CircularProgress> = {
  component: CircularProgress,
  title: 'Components/common/CircularProgress',
};

export default Story;

export const Primary = {
  args: {} as CircularProgressProps,
};
