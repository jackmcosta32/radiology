'use client';

import React from 'react';
import { Button } from '@/ui/components/button';
import { COMMANDS } from '../../editor.commands';
import { Menubar } from '@/ui/components/menubar';
import { BubbleMenu, isNodeSelection } from '@tiptap/react';
import { EditorCommandDropdown } from '../editor-command-dropdown';
import type { TBaseEditor, TEditorCommand } from '../../editor.types';
import type { EditorBubbleMenuProps } from './editor-bubble-menu.types';

const MENU_COMMANDS: TEditorCommand[] = [
  COMMANDS['bold'],
  COMMANDS['italic'],
  COMMANDS['underline'],
  COMMANDS['strike'],
  COMMANDS['code'],
];

const NODE_SELECTOR_COMMANDS: TEditorCommand[] = [
  COMMANDS['text'],
  COMMANDS['heading-1'],
  COMMANDS['heading-2'],
  COMMANDS['heading-3'],
  COMMANDS['to-do'],
  COMMANDS['bullet-list'],
  COMMANDS['numbered-list'],
  COMMANDS['code'],
  COMMANDS['quote'],
];

const renderMenuCommands = (editor: TBaseEditor) => {
  return MENU_COMMANDS.map((command) => {
    const { key, icon, executeInline, isActive } = command;
    const active = isActive({ editor });

    return (
      <Button
        key={key}
        variant="ghost"
        data-active={active}
        onClick={() => executeInline({ editor })}
        className="p-2 data-[active=true]:text-primary"
      >
        {icon}
      </Button>
    );
  });
};

export function EditorBubbleMenu({
  editor,
  shouldShow,
  ...rest
}: EditorBubbleMenuProps) {
  const [openNodeSelector, setOpenNodeSelector] = React.useState(false);

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
      {...rest}
      editor={editor}
      shouldShow={handleShouldShow}
      tippyOptions={{
        onHidden: handleOnHidden,
        moveTransition: 'transform 0.15s ease-out',
      }}
    >
      <Menubar className="relative py-6 gap-1">
        <EditorCommandDropdown
          editor={editor}
          onOpen={setOpenNodeSelector}
          commands={NODE_SELECTOR_COMMANDS}
        />

        {renderMenuCommands(editor)}
      </Menubar>
    </BubbleMenu>
  );
}
