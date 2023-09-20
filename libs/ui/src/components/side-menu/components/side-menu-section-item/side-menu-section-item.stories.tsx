import type { Meta } from '@storybook/react';
import { SideMenuSectionItem, type SideMenuSectionItemProps } from './index';

const Story: Meta<typeof SideMenuSectionItem> = {
  component: SideMenuSectionItem,
  title: 'Components/common/SideMenuSectionItem',
};

export default Story;

export const Primary = {
  args: {
    children: 'SideMenuSectionItem',
    title: 'Item',
    subItems: [
      { title: 'SubItem-1', href: '/' },
      { title: 'SubItem-2', href: '/' },
      { title: 'SubItem-3', href: '/' },
      {
        title: 'SubItem-4',
        subItems: [
          { title: 'SubItem-1', href: '/' },
          { title: 'SubItem-2', href: '/' },
          { title: 'SubItem-3', href: '/' },
        ],
      },
    ],
  } as SideMenuSectionItemProps,
};
