import React from 'react';
import { isEmpty } from '@/ui/utils/arrays/is-empty';
import type { EditorSlashMenuProps } from './editor-slash-menu.types';
import { isClientSide } from '../../../../utils/server-side/is-client-side';

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

  const menuItems = items.map((item, index) => (
    <button
      key={item.title}
      data-active={index === selectedIndex}
      onClick={() => handleItemSelection(index, items, command)}
      className={
        'flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm text-stone-900 hover:bg-stone-100 data-[active=true]:bg-stone-100 data-[active=true]:text-stone-900'
      }
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 bg-white">
        {item.icon}
      </div>
      <div>
        <p className="font-medium">{item.title}</p>
        <p className="text-xs text-stone-500">{item.description}</p>
      </div>
    </button>
  ));

  return menuItems;
};

export function EditorSlashMenu({ items, command }: EditorSlashMenuProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const hasItems = Array.isArray(items) && items.length;

  const handleOnKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    console.log({ key });
    const mappedKeys = ['ArrowUp', 'ArrowDown', 'Enter'];

    if (!mappedKeys.includes(key)) return;

    event.preventDefault();

    switch (key) {
      case 'ArrowUp':
        setSelectedIndex((selectedIndex + items.length - 1) % items.length);
        break;

      case 'ArrowDown':
        setSelectedIndex((selectedIndex + 1) % items.length);
        break;

      case 'Enter':
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
  }, [items, selectedIndex, handleOnKeyDown]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, []);

  React.useEffect(() => {
    const wrapper = wrapperRef?.current;
    const item = wrapper?.children[selectedIndex] as HTMLElement;

    updateScrollView(wrapper, item);
  }, [selectedIndex]);

  if (!hasItems) return null;

  return (
    <div
      ref={wrapperRef}
      id="slash-command"
      className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-stone-200 bg-white px-1 py-2 shadow-md transition-all"
    >
      {renderMenuItems(selectedIndex, items, command)}
    </div>
  );
}
