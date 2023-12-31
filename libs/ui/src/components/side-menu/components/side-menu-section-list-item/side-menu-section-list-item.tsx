'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../../../button/button';
import { isEmpty } from '../../../../utils/arrays/is-empty';
import { SECTION_ITEM_VARIANTS } from '../../side-menu.types';
import { SideMenuSectionLinkItem } from '../side-menu-section-link-item';
import { SideMenuSectionButtonItem } from '../side-menu-section-button-item';
import type { SideMenuSectionListItemProps } from './side-menu-section-list-item.types';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../collapsible';

export function SideMenuSectionListItem({
  icon,
  title,
  subItems,
  className,
  ...rest
}: SideMenuSectionListItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const hasSubItems = !isEmpty(subItems);

  const renderedSubItems = React.useMemo(() => {
    if (!hasSubItems) return null;

    return subItems?.map((item) => {
      switch (item.variant) {
        case SECTION_ITEM_VARIANTS.LINK:
          return <SideMenuSectionLinkItem key={item.title} {...item} />;
        case SECTION_ITEM_VARIANTS.BUTTON:
          return <SideMenuSectionButtonItem key={item.title} {...item} />;
        case SECTION_ITEM_VARIANTS.LIST:
          return <SideMenuSectionListItem key={item.title} {...item} />;
        default:
          return null;
      }
    });
  }, [subItems, hasSubItems]);

  return (
    <li className={twMerge('list-none', className)} {...rest}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-start">
            <span className="text-sm font-medium flex flex-row gap-3">
              {icon}
              {title}
            </span>
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent asChild>
          <ul className="ml-4 space-y-1">{renderedSubItems}</ul>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}
