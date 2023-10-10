import type { TBaseEditor, TEditorCommand } from '../../editor.types';

export interface EditorCommandDropdownProps {
  editor: TBaseEditor;
  commands: TEditorCommand[];
  onOpen?: (open: boolean) => void;
}
