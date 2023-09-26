'use client';

import { twMerge } from 'tailwind-merge';
import { initialContent } from './content';
import { defaultExtensions } from './extensions';
import type { EditorProps } from './editor.types';
import 'highlight.js/styles/tokyo-night-dark.css';
import { useEditor, EditorContent } from '@tiptap/react';
import { EditorBubbleMenu } from './components/editor-bubble-menu';

export function Editor({ className }: EditorProps) {
  const editor = useEditor({
    content: initialContent,
    extensions: defaultExtensions,
    editorProps: {
      attributes: {
        class: 'outline-none',
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
