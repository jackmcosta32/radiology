import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import { ReactRenderer } from '@tiptap/react';
import { COMMANDS } from '../editor.commands';
import tippy, { type Instance } from 'tippy.js';
import type { TBaseEditor, TEditorCommand, TRange } from '../editor.types';
import { filterCommandSuggestions } from '../utils/filter-command-suggestions';
import { toggleDocumentScroll } from '@/ui/utils/scroll/toggle-document-scroll';
import {
  EditorCommandList,
  MAPPED_KEYS,
} from '../components/editor-command-list';

interface TippyInstance<TProps> extends Instance<TProps> {
  getReferenceClientRect: DOMRect;
}

export const SLASH_MENU_ID = 'slash-command';
export const SLASH_MENU_MAPPED_KEYS = MAPPED_KEYS;

const SLASH_MENU_COMMANDS: TEditorCommand[] = [
  COMMANDS['text'],
  COMMANDS['to-do'],
  COMMANDS['heading-1'],
  COMMANDS['heading-2'],
  COMMANDS['heading-3'],
  COMMANDS['bullet-list'],
  COMMANDS['numbered-list'],
  COMMANDS['quote'],
  COMMANDS['code'],
];

const handleCommandSuggestions = (params: { query: string }) => {
  const { query } = params;

  return filterCommandSuggestions(SLASH_MENU_COMMANDS, query);
};

const renderItems = () => {
  let popup: TippyInstance<typeof EditorCommandList> | null = null;
  let component: ReactRenderer<typeof EditorCommandList> | null = null;

  return {
    onStart: (props: { editor: TBaseEditor; clientRect: DOMRect }) => {
      component = new ReactRenderer(EditorCommandList, {
        props: {
          ...props,
          id: SLASH_MENU_ID,
          className:
            'z-50 h-80 rounded-md border border-border bg-white px-1 py-2 shadow-md transition-all',
        },
        editor: props.editor,
      });

      popup = tippy(document.body, {
        trigger: 'manual',
        interactive: true,
        showOnCreate: true,
        placement: 'bottom-start',
        content: component.element,
        appendTo: () => document.body,
        onCreate: () => toggleDocumentScroll(false),
        onDestroy: () => toggleDocumentScroll(true),
        getReferenceClientRect: props.clientRect,
      });
    },
    onUpdate: (props: { editor: TBaseEditor; clientRect: DOMRect }) => {
      component?.updateProps(props);

      if (!popup) return;

      popup.setProps({
        getReferenceClientRect: props.clientRect,
      });
    },
    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === 'Escape') {
        popup?.hide();

        return true;
      }

      const onKeyDown = component?.ref ?? {};

      if (typeof onKeyDown !== 'function') return false;

      return onKeyDown(props);
    },
    onExit: () => {
      popup?.destroy();
      component?.destroy();
    },
  };
};

const Command = Extension.create({
  name: 'slash-command',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({
          editor,
          range,
          props,
        }: {
          editor: TBaseEditor;
          range: TRange;
          props: any;
        }) => {
          props.command({ editor, range });
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export const EditorSlashCommand = Command.configure({
  suggestion: {
    render: renderItems,
    items: handleCommandSuggestions,
  },
});
