import type { Meta } from '@storybook/react';
import { SideMenuSection, type SideMenuSectionProps } from './index';

const Story: Meta<typeof SideMenuSection> = {
  component: SideMenuSection,
  title: 'Components/common/SideMenu/SideMenuSection',
};

export default Story;

export const Primary = {
  args: {
    children: 'SideMenuSection',
    title: 'Title',
    items: [
      { title: 'Item-1', href: '/', variant: 'link' },
      { title: 'Item-2', variant: 'button' },
      { title: 'Item-3', href: '/', variant: 'link' },
      {
        title: 'Item-4',
        variant: 'list',
        subItems: [
          { title: 'Item-1', href: '/' },
          { title: 'Item-2', href: '/' },
          { title: 'Item-3', href: '/' },
        ],
      },
    ],
  } as SideMenuSectionProps,
};
