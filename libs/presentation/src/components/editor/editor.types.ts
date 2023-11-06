import type { Extension, JSONContent } from '@tiptap/react';
import type { EditorProps as BaseEditorProps } from '@tiptap/pm/view';
import type { Editor as TBaseEditor, Range as TRange } from '@tiptap/core';

export type {
  Range as TRange,
  Editor as TBaseEditor,
  EditorOptions as TBaseEditorOptions,
  ChainedCommands as TChainedCommands,
} from '@tiptap/core';

export type {
  EditorView as TBaseEditorView,
  EditorProps as BaseEditorProps,
} from '@tiptap/pm/view';

export interface TEditorCommandParams {
  range?: TRange;
  inline?: boolean;
  focused?: boolean;
  editor: TBaseEditor;
}

export interface TEditorCommand {
  key: string;
  label: string;
  description?: string;
  previewImage?: string;
  icon?: React.ReactNode;
  searchTerms?: string[];
  execute: (params: TEditorCommandParams) => void;
  isActive: (params: { editor: TBaseEditor }) => boolean;
}

export interface EditorProps {
  /**
   * Additional classes to add to the editor container.
   * Defaults to "relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg".
   */
  className?: string;
  /**
   * The default value to use for the editor.
   * Defaults to defaultEditorContent.
   */
  defaultValue?: JSONContent | string;
  /**
   * A list of extensions to use for the editor, in addition to the default Novel extensions.
   */
  extensions?: Extension[];
  /**
   * Props to pass to the underlying Tiptap editor, in addition to the default Novel editor props.
   */
  editorProps?: BaseEditorProps;
  /**
   * A callback function that is called whenever the editor is updated.
   */
  onUpdate?: (editor?: TBaseEditor) => void | Promise<void>;
  /**
   * A callback function that is called whenever the editor cache is updated.
   */
  onCacheContent?: (editor?: TBaseEditor) => void | Promise<void>;
  /**
   * The duration (in milliseconds) to debounce the onDebouncedUpdate callback.
   * Defaults to 750.
   */
  debounceDuration?: number;
  /**
   * The key to use for storing the editor's value in local storage.
   * Defaults to "editor_content".
   */
  storageKey?: string;
  /**
   * Disable local storage read/save.
   * Defaults to false.
   */
  disableLocalStorage?: boolean;
}
