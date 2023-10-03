'use client';

import React from 'react';
import { isEmpty } from '../../../../utils/arrays/is-empty';
import { SECTION_ITEM_VARIANTS } from '../../side-menu.types';
import type { SideMenuSectionProps } from './side-menu-section.types';
import { SideMenuSectionLinkItem } from '../side-menu-section-link-item';
import { SideMenuSectionListItem } from '../side-menu-section-list-item';
import { SideMenuSectionButtonItem } from '../side-menu-section-button-item';

export function SideMenuSection({
  items,
  title,
  ...rest
}: SideMenuSectionProps) {
  const renderedSectionItems = React.useMemo(() => {
    if (isEmpty(items)) return null;

    return items.map((item, index) => {
      const key = item.title ?? index;

      switch (item.variant) {
        case SECTION_ITEM_VARIANTS.LINK:
          return <SideMenuSectionLinkItem key={key} {...item} />;
        case SECTION_ITEM_VARIANTS.BUTTON:
          return <SideMenuSectionButtonItem key={key} {...item} />;
        case SECTION_ITEM_VARIANTS.LIST:
          return <SideMenuSectionListItem key={key} {...item} />;
        default:
          return null;
      }
    });
  }, [items]);

  return (
    <div {...rest}>
      {title && (
        <h2 className="px-2 mb-2 text-lg font-semibold tracking-tight">
          {title}
        </h2>
      )}

      <ul className="flex flex-col">{renderedSectionItems}</ul>
    </div>
  );
}
