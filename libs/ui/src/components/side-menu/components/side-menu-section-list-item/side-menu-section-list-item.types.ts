import type { TSectionListItem } from '../../side-menu.types';

export interface SideMenuSectionListItemProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, 'title'>,
    TSectionListItem {}
