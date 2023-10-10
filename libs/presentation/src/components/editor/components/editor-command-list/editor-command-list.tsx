'use client';

import React from 'react';
import { Button } from '@/ui/components/button';
import { isEmpty } from '@/ui/utils/arrays/is-empty';
import type { TBaseEditor } from '../../editor.types';
import { ScrollArea } from '@/ui/components/scroll-area';
import { isClientSide } from '@/ui/utils/server-side/is-client-side';
import type { EditorCommandListProps } from './editor-command-list.types';

export const MAPPED_KEYS = { UP: 'ArrowUp', DOWN: 'ArrowDown', ENTER: 'Enter' };

const handleItemSelection = (
  editor: TBaseEditor,
  index: number,
  items: EditorCommandListProps['items']
) => {
  const item = items[index];

  if (typeof item?.onClick !== 'function') return;

  item.onClick({ editor });
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
  editor: TBaseEditor,
  selectedIndex: number,
  items: EditorCommandListProps['items']
) => {
  if (isEmpty(items)) return;

  const menuItems = items.map((item, index) => {
    const { icon, label, key, description, execute, isActive } = item;

    const selected = index === selectedIndex;
    const active = isActive({ editor }) || selected;

    return (
      <Button
        key={key}
        role="menuitem"
        variant="ghost"
        data-active={active}
        onClick={() => execute({ editor })}
        className="w-full flex flex-row justify-start gap-2 p-2 data-[active=true]:bg-accent data-[active=true]:text-accent-foreground outline:none"
      >
        {icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border">
            {icon}
          </span>
        )}

        <div className="text-start flex flex-col">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-xs font-normal text-zinc-500">
            {description}
          </span>
        </div>
      </Button>
    );
  });

  return menuItems;
};

export function EditorCommandList({
  items,
  editor,
  ...rest
}: EditorCommandListProps) {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const hasItems = Array.isArray(items) && items.length;

  const handleOnKeyDown = (event: KeyboardEvent) => {
    const key = event.key;

    if (!Object.values(MAPPED_KEYS).includes(key)) return;

    event.preventDefault();

    switch (key) {
      case MAPPED_KEYS.UP:
        setSelectedIndex((selectedIndex + items.length - 1) % items.length);
        break;

      case MAPPED_KEYS.DOWN:
        setSelectedIndex((selectedIndex + 1) % items.length);
        break;

      default:
        handleItemSelection(editor, selectedIndex, items);
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
    <ScrollArea {...rest} role="menu" ref={scrollAreaRef}>
      <div className="gap-2 flex flex-col">
        {renderMenuItems(editor, selectedIndex, items)}
      </div>
    </ScrollArea>
  );
}
