import { VALID_ELEMENT_SELECTOR, EDITOR_ID } from '../editor.config';

export const getHoveredElement = (
  event: MouseEvent,
  options?: { offsetX?: number; offsetY?: number }
) => {
  const { clientX, clientY } = event;
  const { offsetX = 0, offsetY = 0 } = options ?? {};

  const elements = document.elementsFromPoint(
    clientX + offsetX,
    clientY + offsetY
  );

  const hoveredElement = elements.find((element) => {
    const isValid = element.matches(VALID_ELEMENT_SELECTOR);
    const isEditorChild = element.parentElement?.matches(EDITOR_ID);

    return isValid || isEditorChild;
  });

  return hoveredElement;
};
