import type { BubbleMenuProps } from '@tiptap/react';

export type TActionVariant = 'toggle' | 'menu';

export interface TAction {
  key: string;
  active?: boolean;
  label: React.ReactNode;
  variant?: TActionVariant;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface EditorBubbleMenuProps
  extends Omit<BubbleMenuProps, 'editor' | 'children'> {
  editor?: BubbleMenuProps['editor'] | null;
}
