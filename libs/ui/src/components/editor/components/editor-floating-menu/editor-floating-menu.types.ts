import type { FloatingMenuProps } from '@tiptap/react';

export interface TBlock {
  key: string;
  autoFocus?: boolean;
  icon?: React.ReactNode;
  label: React.ReactNode;
  preview?: React.ReactNode;
  description?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface TBlockGroup {
  key: string;
  label: string;
  blocks: TBlock[];
}

export interface EditorFloatingMenuProps
  extends Omit<FloatingMenuProps, 'editor' | 'children'> {
  editor?: FloatingMenuProps['editor'] | null;
}
