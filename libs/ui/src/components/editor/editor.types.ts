import type { Editor as BaseEditor } from '@tiptap/core';
import type { Extension, JSONContent } from '@tiptap/react';
import type { EditorProps as BaseEditorProps } from '@tiptap/pm/view';

export type {
  Editor as BaseEditor,
  EditorOptions as BaseEditorOptions,
} from '@tiptap/core';

export type {
  EditorView as BaseEditorView,
  EditorProps as BaseEditorProps,
} from '@tiptap/pm/view';

export interface TEditorCommand {
  key: string;
  label: string;
  description?: string;
  previewImage?: string;
  icon?: React.ReactNode;
  command: (editor: BaseEditor) => void;
  isActive: (editor: BaseEditor) => boolean;
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
  onUpdate?: (editor?: BaseEditor) => void | Promise<void>;
  /**
   * A callback function that is called whenever the editor cache is updated.
   */
  onCacheContent?: (editor?: BaseEditor) => void | Promise<void>;
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
