'use client';

import React from 'react';
import { EditorDragHandle } from '../editor-drag-handle';
import { useThrottle } from '../../../../hooks/use-throttle';
import { INVALID_ELEMENT_SELECTOR } from '../../editor.config';
import { getHoveredElement } from '../../utils/get-hovered-element';
import { getElementPosition } from '../../utils/get-element-position';
import { isClientSide } from '../../../../utils/server-side/is-client-side';
import type { EditorFloatingMenuProps } from './editor-floating-menu.types';
import { getElementBoundingRect } from '../../utils/get-element-bounding-rect';
import { EditorElementAdditionButton } from '../editor-element-addition-button';

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

  const handleOnClick: React.MouseEventHandler<HTMLDivElement> = () => {
    if (!editor || !view || !hoveredElement) return;

    const position = getElementPosition(hoveredElement, view);
    const depth = position?.inside;

    if (typeof depth !== 'number' || depth < 0) return;

    editor.commands.focus(depth);

    view.dom.classList.remove('dragging');
  };

  const handleOnMouseMove = (event: MouseEvent) => {
    if (!wrapper) return hideMenuContent();

    const hoveredElement = getHoveredElement(event, {
      offsetX: wrapper.clientWidth + 50,
    });

    const isElement = hoveredElement instanceof Element;

    if (!isElement) return hideMenuContent();

    const isInvalid = hoveredElement.matches(INVALID_ELEMENT_SELECTOR);

    if (isInvalid) return hideMenuContent();

    const wrapperStyles = window.getComputedStyle(wrapper);
    const paddingTop = parseInt(wrapperStyles.paddingTop, 10);

    const hoveredElementRect = getElementBoundingRect(hoveredElement);

    wrapper.style.top = `${hoveredElementRect.top - paddingTop}px`;
    wrapper.style.left = `${hoveredElementRect.left - wrapper.clientWidth}px`;

    if (typeof onHoverElement === 'function') {
      onHoverElement(hoveredElement);
    }

    setHoveredElement(hoveredElement);

    showMenuContent();
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
      onClick={handleOnClick}
      className="flex flex-row gap-1 absolute data-[hidden=true]:opacity-0 data-[hidden=true]:pointer-events-none transition-opacity p-1"
    >
      {children}

      <EditorElementAdditionButton
        editor={editor}
        hoveredElement={hoveredElement}
      />

      <EditorDragHandle
        editor={editor}
        onDragEnd={hideMenuContent}
        hoveredElement={hoveredElement}
      />
    </div>
  );
}
