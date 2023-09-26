'use client';

import React from 'react';
import { Button } from '../../../button';
import { Menubar } from '../../../menubar';
import { BubbleMenu } from '@tiptap/react';
import type {
  TAction,
  EditorBubbleMenuProps,
} from './editor-bubble-menu.types';
import {
  CodeIcon,
  FontBoldIcon,
  UnderlineIcon,
  FontItalicIcon,
  StrikethroughIcon,
} from '@radix-ui/react-icons';

const renderToggleAction = ({ active, key, onClick, label }: TAction) => {
  return (
    <Button
      key={key}
      variant="ghost"
      onClick={onClick}
      data-active={active}
      className="data-[active=true]:text-primary"
    >
      {label}
    </Button>
  );
};

export function EditorBubbleMenu({ editor, ...rest }: EditorBubbleMenuProps) {
  const focus = editor?.chain().focus();

  const menuActions: TAction[] = [
    {
      key: 'bold',
      variant: 'toggle',
      active: editor?.isActive('bold'),
      label: <FontBoldIcon className="w-4 h-4" />,
      onClick: () => focus?.toggleBold().run(),
    },
    {
      key: 'italic',
      variant: 'toggle',
      active: editor?.isActive('italic'),
      label: <FontItalicIcon className="w-4 h-4" />,
      onClick: () => focus?.toggleItalic().run(),
    },
    {
      key: 'underline',
      variant: 'toggle',
      active: editor?.isActive('underline'),
      label: <UnderlineIcon className="w-4 h-4" />,
      onClick: () => focus?.toggleUnderline().run(),
    },
    {
      key: 'strike',
      variant: 'toggle',
      active: editor?.isActive('strike'),
      label: <StrikethroughIcon className="w-4 h-4" />,
      onClick: () => focus?.toggleStrike().run(),
    },
    {
      key: 'code',
      variant: 'toggle',
      active: editor?.isActive('code'),
      label: <CodeIcon className="w-4 h-4" />,
      onClick: () => focus?.toggleCode().run(),
    },
  ];

  const renderedActions = React.useMemo(() => {
    if (!editor) return null;

    return menuActions.map((action) => {
      switch (action.variant) {
        default:
          return renderToggleAction(action);
      }
    });
  }, [editor, menuActions]);

  if (!editor) return null;

  return (
    <BubbleMenu editor={editor} {...rest}>
      <Menubar className="relative py-6">{renderedActions}</Menubar>
    </BubbleMenu>
  );
}
