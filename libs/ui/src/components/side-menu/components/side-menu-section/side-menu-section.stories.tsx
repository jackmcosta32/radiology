import type { Meta } from '@storybook/react';
import { SideMenuSection, type SideMenuSectionProps } from './index';

const Story: Meta<typeof SideMenuSection> = {
  component: SideMenuSection,
  title: 'Components/common/SideMenuSection',
};

export default Story;

export const Primary = {
  args: {
    children: 'SideMenuSection',
    title: 'Title',
    items: [
      { title: 'Item-1', href: '/' },
      { title: 'Item-2', href: '/' },
      { title: 'Item-3', href: '/' },
      {
        title: 'Item-4',
        subItems: [
          { title: 'Item-1', href: '/' },
          { title: 'Item-2', href: '/' },
          { title: 'Item-3', href: '/' },
        ],
      },
    ],
  } as SideMenuSectionProps,
};
