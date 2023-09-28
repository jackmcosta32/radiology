import React from 'react';
import { NodeSelection } from '@tiptap/pm/state';
import { EditorDragHandle } from '../editor-drag-handle';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { __serializeForClipboard } from '@tiptap/pm/view';
import { useThrottle } from '../../../../hooks/use-throttle';
import { INVALID_ELEMENT_SELECTOR } from '../../editor.config';
import { getElementDepth } from '../../utils/get-element-depth';
import { getHoveredElement } from '../../utils/get-hovered-element';
import { isClientSide } from '../../../../utils/server-side/is-client-side';
import type { EditorFloatingMenuProps } from './editor-floating-menu.types';
import { getElementBoundingRect } from '../../utils/get-element-bounding-rect';

export function EditorFloatingMenu({
  editor,
  children,
  onHoverElement,
}: EditorFloatingMenuProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [hoveredElement, setHoveredElement] = React.useState<Element | null>(
    null
  );

  const view = editor?.view;
  const editable = view?.editable;
  const wrapper = wrapperRef.current;

  const showMenuContent = () => {
    wrapper?.removeAttribute('data-hidden');
  };

  const hideMenuContent = () => {
    wrapper?.setAttribute('data-hidden', 'true');
  };

  const handleOnMouseMove = (event: MouseEvent) => {
    if (!wrapper) return hideMenuContent();

    const hoveredElement = getHoveredElement(event, {
      offsetX: wrapper.clientWidth,
    });

    const isElement = hoveredElement instanceof Element;

    if (!isElement) return hideMenuContent();

    const isInvalid = hoveredElement.matches(INVALID_ELEMENT_SELECTOR);

    if (isInvalid) return hideMenuContent();

    const hoveredElementRect = getElementBoundingRect(hoveredElement);

    wrapper.style.left = `${hoveredElementRect.left - wrapper.clientWidth}px`;
    wrapper.style.top = `${hoveredElementRect.top}px`;

    if (typeof onHoverElement === 'function') {
      onHoverElement(hoveredElement);
    }

    setHoveredElement(hoveredElement);

    showMenuContent();
  };

  const handleOnDragStart: React.DragEventHandler<HTMLDivElement> = (event) => {
    if (!view || !hoveredElement) return;

    view.focus();

    const dataTransfer = event?.dataTransfer;

    if (!dataTransfer) return;

    const depth = getElementDepth(hoveredElement, view);

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

  const throttledHandleOnMouseMove = useThrottle(
    {
      method: handleOnMouseMove,
      delay: 300,
    },
    [wrapper]
  );

  React.useEffect(() => {
    if (isClientSide()) {
      document.addEventListener('mousemove', throttledHandleOnMouseMove);
    }

    return () => {
      if (isClientSide()) {
        document.removeEventListener('mousemove', throttledHandleOnMouseMove);
      }
    };
  }, [throttledHandleOnMouseMove]);

  if (!editor || !editable) return null;

  return (
    <div
      ref={wrapperRef}
      data-hidden={true}
      className="absolute data-[hidden=true]:opacity-0 data-[hidden=true]:pointer-events-none transition-opacity p-1"
    >
      {children}

      <EditorDragHandle
        onDragEnd={hideMenuContent}
        onDragStart={handleOnDragStart}
      />
    </div>
  );
}
