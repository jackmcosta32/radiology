'use client';

import React from 'react';
import { Button } from '../../../button';
import { Menubar } from '../../../menubar';
import { BubbleMenu, isNodeSelection } from '@tiptap/react';
import { EditorNodeSelector } from '../editor-node-selector';
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

export function EditorBubbleMenu({
  editor,
  shouldShow,
  ...rest
}: EditorBubbleMenuProps) {
  const [openNodeSelector, setOpenNodeSelector] = React.useState(false);

  const menuActions: TAction[] = [
    {
      key: 'bold',
      variant: 'toggle',
      active: editor?.isActive('bold'),
      label: <FontBoldIcon className="w-4 h-4" />,
      onClick: () => editor?.chain().focus().toggleBold().run(),
    },
    {
      key: 'italic',
      variant: 'toggle',
      active: editor?.isActive('italic'),
      label: <FontItalicIcon className="w-4 h-4" />,
      onClick: () => editor?.chain().focus().toggleItalic().run(),
    },
    {
      key: 'underline',
      variant: 'toggle',
      active: editor?.isActive('underline'),
      label: <UnderlineIcon className="w-4 h-4" />,
      onClick: () => editor?.chain().focus().toggleUnderline().run(),
    },
    {
      key: 'strike',
      variant: 'toggle',
      active: editor?.isActive('strike'),
      label: <StrikethroughIcon className="w-4 h-4" />,
      onClick: () => editor?.chain().focus().toggleStrike().run(),
    },
    {
      key: 'code',
      variant: 'toggle',
      active: editor?.isActive('code'),
      label: <CodeIcon className="w-4 h-4" />,
      onClick: () => editor?.chain().focus().toggleCode().run(),
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

  const handleOnHidden = () => {
    setOpenNodeSelector(false);
  };

  const handleShouldShow: EditorBubbleMenuProps['shouldShow'] = (params) => {
    let customVerification = true;
    const { selection } = params.state;
    const emptySelection = selection.empty;
    const nodeSelection = isNodeSelection(selection);
    const imageSelection = params.editor.isActive('image');

    if (openNodeSelector) return true;

    if (typeof shouldShow === 'function') {
      customVerification = shouldShow(params);
    }

    return (
      !(emptySelection || nodeSelection || imageSelection) && customVerification
    );
  };

  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={handleShouldShow}
      tippyOptions={{
        moveTransition: 'transform 0.15s ease-out',
        onHidden: handleOnHidden,
      }}
      {...rest}
    >
      <Menubar className="relative py-6">
        <EditorNodeSelector onOpen={setOpenNodeSelector} editor={editor} />
        {renderedActions}
      </Menubar>
    </BubbleMenu>
  );
}
