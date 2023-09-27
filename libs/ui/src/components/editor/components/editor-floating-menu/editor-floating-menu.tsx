'use client';

import React from 'react';
import { Button } from '../../../button';
import { FloatingMenu } from '@tiptap/react';
import { ScrollArea } from '../../../scroll-area';
import type {
  TBlock,
  TBlockGroup,
  EditorFloatingMenuProps,
} from './editor-floating-menu.types';

const renderBlock = ({
  key,
  icon,
  label,
  onClick,
  autoFocus,
  description,
}: TBlock) => {
  return (
    <li key={key} className="list-none w-full">
      <Button
        variant="ghost"
        onClick={onClick}
        autoFocus={autoFocus}
        className="w-full flex flex-row justify-start gap-1 px-4 py-6 outline-none focus:bg-accent focus:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
      >
        {icon && <div>{icon}</div>}

        <div className="text-start flex flex-col">
          <span className="text-sm font-normal">{label}</span>

          {description && (
            <span className="text-xs font-normal text-zinc-500">
              {description}
            </span>
          )}
        </div>
      </Button>
    </li>
  );
};

const renderBlockGroup = ({ blocks, key, label }: TBlockGroup) => {
  const renderedBlocks = blocks.map(renderBlock);

  return (
    <div key={key} className="flex flex-col gap-2">
      <span className="px-4 text-xs font-medium text-zinc-500">{label}</span>
      <ul className="flex flex-col gap-2">{renderedBlocks}</ul>
    </div>
  );
};

export function EditorFloatingMenu({
  editor,
  ...rest
}: EditorFloatingMenuProps) {
  const focus = editor?.chain().focus();

  const blockGroups: TBlockGroup[] = [
    {
      key: 'basic-blocks',
      label: 'Basic blocks',
      blocks: [
        {
          key: 'text',
          label: 'Text',
          autoFocus: true,
          description: 'Just start writing with plain text',
          onClick: () => focus?.toggleHeading({ level: 6 }).run(),
        },
        {
          key: 'todo-list',
          label: 'To-do list',
          description: 'Track tasks with a to-do list',
          onClick: () => focus?.toggleTaskList().run(),
        },
        {
          key: 'heading-1',
          label: 'Heading 1',
          description: 'Big section heading',
          onClick: () => focus?.toggleHeading({ level: 1 }).run(),
        },
        {
          key: 'heading-2',
          label: 'Heading 2',
          description: 'Medium section heading',
          onClick: () => focus?.toggleHeading({ level: 2 }).run(),
        },
        {
          key: 'heading-3',
          label: 'Heading 3',
          description: 'Small section heading',
          onClick: () => focus?.toggleHeading({ level: 3 }).run(),
        },
      ],
    },
  ];

  const renderedBlockGroups = React.useMemo(() => {
    if (!editor) return null;

    return blockGroups.map(renderBlockGroup);
  }, [editor, blockGroups]);

  if (!editor) return null;

  return (
    <FloatingMenu
      {...rest}
      editor={editor}
      className="bg-white shadow-md border border-border shadow-black/20 rounded-lg overflow-hidden flex px-1 py-3"
    >
      <ScrollArea>{renderedBlockGroups}</ScrollArea>
    </FloatingMenu>
  );
}
