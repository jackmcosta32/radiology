import type { TSectionItem } from '../../side-menu.types';

export interface SideMenuSectionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string;
  items: TSectionItem[];
}
