import type { TSectionItem } from '../../side-menu.types';

export interface SideMenuSectionItemProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, 'title'>,
    TSectionItem {}
