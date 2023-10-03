import type { BaseEditor } from '../../editor.types';

export interface EditorFloatingMenuProps
  extends React.HTMLAttributes<HTMLDivElement> {
  editor?: BaseEditor | null;
  onHoverElement?: (element: Element) => void;
}
