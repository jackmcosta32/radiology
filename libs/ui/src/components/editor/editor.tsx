'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { initialContent } from './content';
import { defaultExtensions } from './extensions';
import 'highlight.js/styles/tokyo-night-dark.css';
import { useEditor, EditorContent } from '@tiptap/react';
import { useLocalStorage } from '../../hooks/use-local-storage';
import { EditorBubbleMenu } from './components/editor-bubble-menu';
import { useDebounce } from '../../hooks/use-debounce/use-debounce';
import { EditorFloatingMenu } from './components/editor-floating-menu';
import {
  SLASH_MENU_ID,
  SLASH_MENU_MAPPED_KEYS,
} from './components/editor-slash-menu';
import type {
  BaseEditor,
  EditorProps,
  BaseEditorView,
  BaseEditorOptions,
} from './editor.types';

const handleKeyDown = (view: BaseEditorView, event: KeyboardEvent) => {
  const key = event.key;
  const slashCommand = document.getElementById(SLASH_MENU_ID);

  return Boolean(slashCommand && SLASH_MENU_MAPPED_KEYS.includes(key));
};

const defaultProps = {
  handleKeyDown,
  attributes: {
    class: 'outline-none px-4 md:px-24',
  },
};

export function Editor({
  onUpdate,
  className,
  editorProps,
  onCacheContent,
  extensions = [],
  debounceDuration = 750,
  disableLocalStorage = false,
  storageKey = 'editor_content',
  defaultValue = initialContent,
}: EditorProps) {
  const [hydrated, setHydrated] = React.useState(false);
  const [content, setContent] = useLocalStorage(storageKey, defaultValue);

  const mergedEditorProps = { ...defaultProps, ...editorProps };
  const mergedEditorExtensions = [...defaultExtensions, ...extensions];

  const handleContentCache = (editor: BaseEditor) => {
    const jsonDocument = editor.getJSON();

    setContent(jsonDocument);

    if (typeof onCacheContent !== 'function') return;

    onCacheContent(editor);
  };

  const debouncedHandleContentCache = useDebounce(
    { method: handleContentCache, delay: debounceDuration },
    [debounceDuration]
  );

  const handleOnUpdate: BaseEditorOptions['onUpdate'] = ({ editor }) => {
    if (typeof onUpdate === 'function') {
      onUpdate(editor);
    }

    if (disableLocalStorage) return;

    debouncedHandleContentCache(editor);
  };

  const editor = useEditor({
    onUpdate: handleOnUpdate,
    editorProps: mergedEditorProps,
    extensions: mergedEditorExtensions,
  });

  React.useEffect(() => {
    if (!editor || hydrated) return;

    const value = disableLocalStorage ? defaultValue : content;

    if (value) {
      editor.commands.setContent(value);
      setHydrated(true);
    }
  }, [editor, defaultValue, content, hydrated, disableLocalStorage]);

  return (
    <>
      <EditorContent
        editor={editor}
        className={twMerge('prose prose-primary', className)}
      />

      <EditorBubbleMenu editor={editor} />

      <EditorFloatingMenu editor={editor} />
    </>
  );
}
