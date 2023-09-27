'use client';

import { twMerge } from 'tailwind-merge';
import { initialContent } from './content';
import { defaultExtensions } from './extensions';
import type { EditorProps } from './editor.types';
import 'highlight.js/styles/tokyo-night-dark.css';
import { useEditor, EditorContent } from '@tiptap/react';
import { EditorBubbleMenu } from './components/editor-bubble-menu';
import {
  SLASH_MENU_ID,
  SLASH_MENU_MAPPED_KEYS,
} from './components/editor-slash-menu';

export function Editor({ className }: EditorProps) {
  const editor = useEditor({
    content: initialContent,
    extensions: defaultExtensions,
    editorProps: {
      attributes: {
        class: 'outline-none px-4 md:px-24',
      },
      handleKeyDown(view, event) {
        const key = event.key;
        const slashCommand = document.getElementById(SLASH_MENU_ID);

        return Boolean(slashCommand && SLASH_MENU_MAPPED_KEYS.includes(key));
      },
    },
  });

  return (
    <>
      <EditorContent
        editor={editor}
        className={twMerge('prose prose-primary', className)}
      />

      <EditorBubbleMenu editor={editor} />
    </>
  );
}
