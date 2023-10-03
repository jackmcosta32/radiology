import { twMerge } from 'tailwind-merge';
import { GripVertical } from 'lucide-react';
import { NodeSelection } from '@tiptap/pm/state';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { __serializeForClipboard } from '@tiptap/pm/view';
import { getElementPosition } from '../../utils/get-element-position';
import type { EditorDragHandleProps } from './editor-drag-handle.types';

export function EditorDragHandle({
  editor,
  className,
  onDragEnd,
  hoveredElement,
  ...rest
}: EditorDragHandleProps) {
  const view = editor?.view;

  const handleOnDragStart: React.DragEventHandler<HTMLDivElement> = (event) => {
    if (!view || !hoveredElement) return;

    view.focus();
    view.dom.classList.add('dragging');

    const dataTransfer = event?.dataTransfer;

    if (!dataTransfer) return;

    const position = getElementPosition(hoveredElement, view);
    const depth = position?.inside;

    if (typeof depth !== 'number' || depth < 0) return;

    const nodeSelection = NodeSelection.create(view.state.doc, depth);
    const selectionTransaction = view.state.tr.setSelection(nodeSelection);

    view.dispatch(selectionTransaction);

    const slice = view.state.selection.content();
    const { dom, text } = __serializeForClipboard(view, slice);

    dataTransfer.clearData();
    dataTransfer.setData('text/html', dom.innerHTML);
    dataTransfer.setData('text/plain', text);
    dataTransfer.effectAllowed = 'copyMove';
    dataTransfer.setDragImage(hoveredElement, 0, 0);

    view.dragging = { slice, move: event.ctrlKey };
  };

  const handleOnDragEnd: React.DragEventHandler<HTMLDivElement> = (event) => {
    if (!view || !hoveredElement) return;

    view.focus();

    view.dom.classList.remove('dragging');

    if (typeof onDragEnd !== 'function') return;

    onDragEnd(event);
  };

  return (
    <div
      {...rest}
      draggable
      onDragEnd={handleOnDragEnd}
      onDragStart={handleOnDragStart}
      className={twMerge(
        'hover:bg-accent text-zinc-500 p-[0.1rem] rounded transition-colors cursor-grab active:cursor-grabbing',
        className
      )}
    >
      <GripVertical className="w-4 h-6" />
    </div>
  );
}
