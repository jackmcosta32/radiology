import type { Meta } from '@storybook/react';
import { Anchor, type AnchorProps } from './index';

const Story: Meta<typeof Anchor> = {
  component: Anchor,
  title: 'Components/common/Anchor',
};

export default Story;

export const Primary = {
  args: {
    children: 'Anchor',
  } as AnchorProps,
};
