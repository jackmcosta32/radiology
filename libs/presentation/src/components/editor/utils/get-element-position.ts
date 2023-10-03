import type { BaseEditorView } from '../editor.types';

export const getElementPosition = (element: Element, view: BaseEditorView) => {
  const rect = element.getBoundingClientRect();

  const position = view.posAtCoords({
    top: rect.top + 1,
    left: rect.left + 1,
  });

  return position;
};
