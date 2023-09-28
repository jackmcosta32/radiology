import { twMerge } from 'tailwind-merge';
import { GripVertical } from 'lucide-react';
import type { EditorDragHandleProps } from './editor-drag-handle.types';

export function EditorDragHandle({
  editor,
  className,
  hoveredElement,
  ...rest
}: EditorDragHandleProps) {
  return (
    <div
      {...rest}
      draggable
      className={twMerge(
        'hover:bg-zinc-200 text-zinc-400 p-[0.1rem] rounded transition-colors',
        className
      )}
    >
      <GripVertical className="w-4 h-6" />
    </div>
  );
}
