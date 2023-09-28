import type { BaseEditor } from '../../editor.types';

export interface EditorDragHandleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  editor?: BaseEditor;
  hoveredElement?: Element | null;
}
