import type { Editor } from '@tiptap/core';

export interface CommandItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface EditorSlashMenuProps {
  editor: Editor;
  items: CommandItemProps[];
  command: (item: CommandItemProps) => void;
}
