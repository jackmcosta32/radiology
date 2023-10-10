import type { TBaseEditor } from '../../editor.types';

export interface EditorFloatingMenuProps
  extends React.HTMLAttributes<HTMLDivElement> {
  editor?: TBaseEditor | null;
  onHoverElement?: (element: Element) => void;
}
