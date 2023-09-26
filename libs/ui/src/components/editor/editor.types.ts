import type { EditorContentProps } from '@tiptap/react';

export interface EditorProps extends Omit<EditorContentProps, 'editor'> {
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}
