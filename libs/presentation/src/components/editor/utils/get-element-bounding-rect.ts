import { LIST_ELEMENT_SELECTOR } from '../editor.config';

export const getElementBoundingRect = (element: Element) => {
  const rect = element.getBoundingClientRect();
  const elementStyles = window.getComputedStyle(element);
  const paddingTop = parseInt(elementStyles.paddingTop, 10);
  const lineHeight = parseInt(elementStyles.lineHeight, 10);
  const isListElement = element.matches(LIST_ELEMENT_SELECTOR);

  const boundingRect = {
    ...rect,
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY + paddingTop + lineHeight / 2,
  };

  if (!isListElement) return boundingRect;

  const parentElement = element.parentElement;

  if (!parentElement) return boundingRect;

  const parentElementStyles = window.getComputedStyle(parentElement);
  const paddingLeft = parseInt(parentElementStyles.paddingLeft, 10);

  boundingRect.left -= paddingLeft;

  return boundingRect;
};
