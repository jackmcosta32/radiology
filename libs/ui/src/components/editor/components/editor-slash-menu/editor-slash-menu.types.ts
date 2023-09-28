import type { BaseEditor } from '../../editor.types';

export interface CommandItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface EditorSlashMenuProps {
  editor: BaseEditor;
  items: CommandItemProps[];
  command: (item: CommandItemProps) => void;
}
