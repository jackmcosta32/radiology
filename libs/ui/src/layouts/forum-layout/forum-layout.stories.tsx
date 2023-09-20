import { ForumLayout } from './index';
import type { Meta } from '@storybook/react';
import type { ForumLayoutProps } from './forum-layout.types';

const Story: Meta<typeof ForumLayout> = {
  component: ForumLayout,
  title: 'Layouts/ForumLayout',
};

export default Story;

export const Primary = {
  args: {
    children: 'Some content',
    sections: [
      {
        title: 'Discover',
        items: [
          { title: 'Listen Now', href: '/' },
          { title: 'Browse', href: '/' },
          { title: 'Radio', href: '/' },
        ],
      },
    ],
  } as ForumLayoutProps,
};
