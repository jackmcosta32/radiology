import type { LinkProps } from '../link';
import type { ButtonProps } from '../button';

export interface TSectionBaseItem {
  title: string;
  icon?: React.ReactNode;
}

export interface TSectionLinkItem
  extends TSectionBaseItem,
    Omit<LinkProps, 'title' | 'variant'> {
  variant: 'link';
}

export interface TSectionButtonItem
  extends TSectionBaseItem,
    Omit<ButtonProps, 'title' | 'variant'> {
  variant: 'button';
}

export interface TSectionListItem extends TSectionBaseItem {
  variant: 'list';
  subItems?: Array<TSectionLinkItem | TSectionButtonItem | TSectionListItem>;
}

export const SECTION_ITEM_VARIANTS = {
  LIST: 'list',
  LINK: 'link',
  BUTTON: 'button',
} as const;
