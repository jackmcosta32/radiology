import type { Meta } from '@storybook/react';
import { Link, type LinkProps } from './index';

const Story: Meta<typeof Link> = {
  component: Link,
  title: 'Components/common/Link',
};

export default Story;

export const Primary = {
  args: {
    children: 'Link',
  } as LinkProps,
};
