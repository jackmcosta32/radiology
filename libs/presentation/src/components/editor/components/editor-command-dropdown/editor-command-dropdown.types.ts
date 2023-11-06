import type { TBaseEditor, TEditorCommand } from '../../editor.types';

export interface EditorCommandDropdownProps {
  editor: TBaseEditor;
  autoFocus?: boolean;
  commands: TEditorCommand[];
  onOpen?: (open: boolean) => void;
}
