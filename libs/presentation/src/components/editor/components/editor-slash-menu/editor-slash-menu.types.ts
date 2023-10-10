import type { TBaseEditor } from '../../editor.types';

export interface CommandItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface EditorSlashMenuProps {
  editor: TBaseEditor;
  items: CommandItemProps[];
  command: (item: CommandItemProps) => void;
}
