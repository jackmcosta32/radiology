import type { BubbleMenuProps } from '@tiptap/react';

export interface EditorBubbleMenuProps
  extends Omit<BubbleMenuProps, 'editor' | 'children'> {
  editor?: BubbleMenuProps['editor'] | null;
}
