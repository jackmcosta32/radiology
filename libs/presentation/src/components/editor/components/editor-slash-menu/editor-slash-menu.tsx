'use client';

import React from 'react';
import { Button } from '@/ui/components/button';
import { isEmpty } from '@/utils/arrays/is-empty';
import { ScrollArea } from '@/ui/components/scroll-area';
import { isClientSide } from '@/utils/server-side/is-client-side';
import type { EditorSlashMenuProps } from './editor-slash-menu.types';

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

const updateScrollView = (wrapper: HTMLElement, item: HTMLElement) => {
  const itemHeight = item.offsetHeight ?? 0;
  const wrapperHeight = wrapper.offsetHeight ?? 0;

  const top = item.offsetTop;
  const bottom = top + itemHeight;

  if (top < wrapper.scrollTop) {
    wrapper.scrollTop -= wrapper.scrollTop - top + 5;
  } else if (bottom > wrapperHeight + wrapper.scrollTop) {
    wrapper.scrollTop += bottom - wrapperHeight - wrapper.scrollTop + 5;
  }
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
        role="menuitem"
        variant="ghost"
        data-active={active}
        onClick={() => handleItemSelection(index, items, command)}
        className="w-full flex flex-row justify-start gap-2 p-2 data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
      >
        {icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border">
            {icon}
          </span>
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
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
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
    if (isClientSide()) {
      document.addEventListener('keydown', handleOnKeyDown);
    }

    return () => {
      if (isClientSide()) {
        document.removeEventListener('keydown', handleOnKeyDown);
      }
    };
  }, [handleOnKeyDown]);

  React.useEffect(() => {
    const scrollArea = scrollAreaRef?.current;

    const wrapper = scrollArea?.querySelector(
      '[data-radix-scroll-area-viewport]'
    );

    const items = scrollArea?.querySelectorAll('[role="menuitem"]');

    if (!items) return;

    const item = items[selectedIndex];

    if (!wrapper || !item) return;

    updateScrollView(wrapper as HTMLElement, item as HTMLElement);
  }, [selectedIndex]);

  if (!hasItems) return null;

  return (
    <ScrollArea
      role="menu"
      id={SLASH_MENU_ID}
      ref={scrollAreaRef}
      className="z-50 h-80 rounded-md border border-border bg-white px-1 py-2 shadow-md transition-all"
    >
      <div className="gap-2 flex flex-col">
        {renderMenuItems(selectedIndex, items, command)}
      </div>
    </ScrollArea>
  );
}
