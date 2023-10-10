import type { ScrollAreaProps } from '@radix-ui/react-scroll-area';
import type { TBaseEditor, TEditorCommand } from '../../editor.types';

export interface EditorCommandListProps extends ScrollAreaProps {
  editor: TBaseEditor;
  items: TEditorCommand[];
}
