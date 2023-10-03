import { Plus } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { LIST_ELEMENT_SELECTOR } from '../../editor.config';
import { getElementPosition } from '../../utils/get-element-position';
import type { EditorDragHandleProps } from './editor-element-addition-button.types';

export function EditorElementAdditionButton({
  editor,
  className,
  hoveredElement,
  ...rest
}: EditorDragHandleProps) {
  const view = editor?.view;

  const handleOnClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();

    if (!editor || !view || !hoveredElement) return;

    const position = getElementPosition(hoveredElement, view);
    const depth = position?.pos;

    if (typeof depth !== 'number' || depth < 0) return;

    const isList = hoveredElement.matches(LIST_ELEMENT_SELECTOR);

    if (isList) {
      editor.commands.setNodeSelection(depth);
    } else {
      editor.commands.focus(depth);
    }

    editor.commands.selectTextblockEnd();

    if (isList) {
      editor.commands.createParagraphNear();
      editor.commands.focus();
    }

    editor.commands.enter();
  };

  return (
    <div
      {...rest}
      role="button"
      onClick={handleOnClick}
      className={twMerge(
        'hover:bg-accent text-zinc-500 p-[0.1rem] rounded transition-colors',
        className
      )}
    >
      <Plus className="w-4 h-6" />
    </div>
  );
}
