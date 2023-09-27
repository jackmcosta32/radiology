'use client';

import React from 'react';
import { Button } from '../../../button';
import { isEmpty } from '../../../../utils/arrays/is-empty';
import { ScrollArea } from '../../../scroll-area/scroll-area';
import type { EditorSlashMenuProps } from './editor-slash-menu.types';
import { isClientSide } from '../../../../utils/server-side/is-client-side';

export const SLASH_MENU_ID = 'slash-command';
export const SLASH_MENU_MAPPED_KEYS = ['ArrowUp', 'ArrowDown', 'Enter'];

const handleItemSelection = (
  index: number,
  items: EditorSlashMenuProps['items'],
  command: EditorSlashMenuProps['command']
) => {
  const item = items[index];

  if (!item) return;

  command(item);
};

const updateScrollView = (
  wrapper: HTMLElement | null,
  item: HTMLElement | null
) => {
  if (!wrapper || !item) return;

  item.scrollIntoView({ behavior: 'smooth' });
};

const renderMenuItems = (
  selectedIndex: number,
  items: EditorSlashMenuProps['items'],
  command: EditorSlashMenuProps['command']
) => {
  if (isEmpty(items)) return;

  const menuItems = items.map(({ icon, title, description }, index) => {
    const active = index === selectedIndex;

    return (
      <Button
        key={title}
        variant="ghost"
        data-active={active}
        onClick={() => handleItemSelection(index, items, command)}
        className="w-full flex flex-row justify-start gap-1 px-4 py-6 data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
      >
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border">
            {icon}
          </div>
        )}

        <div className="text-start flex flex-col">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-xs font-normal text-zinc-500">
            {description}
          </span>
        </div>
      </Button>
    );
  });

  return menuItems;
};

export function EditorSlashMenu({ items, command }: EditorSlashMenuProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const hasItems = Array.isArray(items) && items.length;

  const handleOnKeyDown = (event: KeyboardEvent) => {
    const key = event.key;

    if (!SLASH_MENU_MAPPED_KEYS.includes(key)) return;

    event.preventDefault();

    switch (key) {
      case 'ArrowUp':
        setSelectedIndex((selectedIndex + items.length - 1) % items.length);
        break;

      case 'ArrowDown':
        setSelectedIndex((selectedIndex + 1) % items.length);
        break;

      default:
        handleItemSelection(selectedIndex, items, command);
        break;
    }
  };

  React.useEffect(() => {
    if (isClientSide(document)) {
      document.addEventListener('keydown', handleOnKeyDown);
    }

    return () => {
      if (isClientSide(document)) {
        document.removeEventListener('keydown', handleOnKeyDown);
      }
    };
  }, [handleOnKeyDown]);

  React.useEffect(() => {
    const wrapper = wrapperRef?.current;
    const item = wrapper?.children[selectedIndex] as HTMLElement;

    updateScrollView(wrapper, item);
  }, [selectedIndex]);

  if (!hasItems) return null;

  return (
    <ScrollArea
      ref={wrapperRef}
      id={SLASH_MENU_ID}
      className="z-50 max-h-[30rem] rounded-md border border-border bg-white px-1 py-2 shadow-md transition-all"
    >
      {renderMenuItems(selectedIndex, items, command)}
    </ScrollArea>
  );
}
