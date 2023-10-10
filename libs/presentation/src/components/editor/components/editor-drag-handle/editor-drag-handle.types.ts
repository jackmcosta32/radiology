import type { TBaseEditor } from '../../editor.types';

export interface EditorDragHandleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  editor?: TBaseEditor;
  hoveredElement?: Element | null;
}
