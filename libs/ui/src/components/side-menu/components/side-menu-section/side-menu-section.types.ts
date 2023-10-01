import type {
  TSectionButtonItem,
  TSectionLinkItem,
  TSectionListItem,
} from '../../side-menu.types';

export interface SideMenuSectionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: string;
  items: Array<TSectionButtonItem | TSectionLinkItem | TSectionListItem>;
}
