'use client';

import React from 'react';
import { Link } from '../../../link';
import { twMerge } from 'tailwind-merge';
import { Button } from '../../../button/button';
import { isEmpty } from '../../../../utils/arrays/is-empty';
import type { SideMenuSectionItemProps } from './side-menu-section-item.types';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../collapsible';

export function SideMenuSectionItem({
  icon,
  href,
  title,
  subItems,
  className,
  ...rest
}: SideMenuSectionItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const hasSubItems = !isEmpty(subItems);
  const hasHref = href && !hasSubItems;

  const renderedSubItems = React.useMemo(() => {
    if (!hasSubItems) return null;

    return subItems?.map((item) => (
      <SideMenuSectionItem key={item.title} {...item} />
    ));
  }, [subItems, hasSubItems]);

  if (!hasHref && !hasSubItems) return null;

  if (hasHref) {
    return (
      <li className={twMerge('list-none', className)} {...rest}>
        <Link href={href} variant="ghost" className="w-full justify-start">
          <span className="text-sm font-medium flex flex-row gap-3">
            {icon}
            {title}
          </span>
        </Link>
      </li>
    );
  }

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
