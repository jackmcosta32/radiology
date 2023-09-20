'use client';

import React from 'react';
import { isEmpty } from '../../../../utils/arrays/is-empty';
import { SideMenuSectionItem } from '../side-menu-section-item';
import type { SideMenuSectionProps } from './side-menu-section.types';

export function SideMenuSection({
  items,
  title,
  ...rest
}: SideMenuSectionProps) {
  const renderedSectionItems = React.useMemo(() => {
    if (isEmpty(items)) return null;

    return items.map((item) => (
      <SideMenuSectionItem key={item.title} {...item} />
    ));
  }, []);

  return (
    <div {...rest}>
      <h2 className="px-3 mb-2 text-lg font-semibold tracking-tight">
        {title}
      </h2>

      <ul className="flex flex-col gap-y-1">{renderedSectionItems}</ul>
    </div>
  );
}
