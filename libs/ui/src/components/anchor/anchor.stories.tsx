import type { Meta } from '@storybook/react';
import { Anchor, AnchorProps } from './index';

const Component = (args?: AnchorProps) => <Anchor {...args}>Anchor</Anchor>;

const Story: Meta<typeof Anchor> = {
  component: Component,
  title: 'Components/common/Anchor',
};
export default Story;

export const Primary = {
  args: {},
};
