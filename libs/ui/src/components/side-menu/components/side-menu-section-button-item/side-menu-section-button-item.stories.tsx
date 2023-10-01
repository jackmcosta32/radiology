import type { Meta } from '@storybook/react';
import {
  SideMenuSectionButtonItem,
  type SideMenuSectionButtonItemProps,
} from './index';

const Story: Meta<typeof SideMenuSectionButtonItem> = {
  component: SideMenuSectionButtonItem,
  title: 'Components/common/SideMenu/SideMenuSectionButtonItem',
};

export default Story;

export const Primary = {
  args: {
    title: 'SideMenuSectionButtonItem',
  } as SideMenuSectionButtonItemProps,
};
