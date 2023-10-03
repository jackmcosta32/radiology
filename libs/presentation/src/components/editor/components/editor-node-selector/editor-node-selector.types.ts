import type { BaseEditor } from '../../editor.types';

export interface EditorNodeSelectorProps {
  editor: BaseEditor;
  onOpen?: (open: boolean) => void;
}
