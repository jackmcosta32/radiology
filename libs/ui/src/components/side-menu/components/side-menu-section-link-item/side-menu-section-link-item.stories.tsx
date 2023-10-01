import type { Meta } from '@storybook/react';
import {
  SideMenuSectionLinkItem,
  type SideMenuSectionLinkItemProps,
} from './index';

const Story: Meta<typeof SideMenuSectionLinkItem> = {
  component: SideMenuSectionLinkItem,
  title: 'Components/common/SideMenu/SideMenuSectionLinkItem',
};

export default Story;

export const Primary = {
  args: {
    title: 'SideMenuSectionLinkItem',
  } as SideMenuSectionLinkItemProps,
};
