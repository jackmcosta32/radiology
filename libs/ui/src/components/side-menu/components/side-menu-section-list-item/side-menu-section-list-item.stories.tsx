import type { Meta } from '@storybook/react';
import {
  SideMenuSectionListItem,
  type SideMenuSectionListItemProps,
} from './index';

const Story: Meta<typeof SideMenuSectionListItem> = {
  component: SideMenuSectionListItem,
  title: 'Components/common/SideMenu/SideMenuSectionListItem',
};

export default Story;

export const Primary = {
  args: {
    children: 'SideMenuSectionListItem',
    title: 'Item',
    subItems: [
      { title: 'SubItem-1', href: '/', variant: 'link' },
      { title: 'SubItem-2', variant: 'button' },
      { title: 'SubItem-3', href: '/', variant: 'link' },
      {
        title: 'SubItem-4',
        variant: 'list',
        subItems: [
          { title: 'SubItem-1', href: '/' },
          { title: 'SubItem-2', href: '/' },
          { title: 'SubItem-3', href: '/' },
        ],
      },
    ],
  } as SideMenuSectionListItemProps,
};
