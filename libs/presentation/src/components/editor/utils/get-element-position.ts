import type { TBaseEditorView } from '../editor.types';

export const getElementPosition = (element: Element, view: TBaseEditorView) => {
  const rect = element.getBoundingClientRect();

  const position = view.posAtCoords({
    top: rect.top + 1,
    left: rect.left + 1,
  });

  return position;
};
