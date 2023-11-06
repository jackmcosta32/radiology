'use client';

import React from 'react';
import { useThrottle } from '@/ui/hooks/use-throttle';
import { EditorDragHandle } from '../editor-drag-handle';
import { INVALID_ELEMENT_SELECTOR } from '../../editor.config';
import { isClientSide } from '@/utils/server-side/is-client-side';
import { getHoveredElement } from '../../utils/get-hovered-element';
import { getElementPosition } from '../../utils/get-element-position';
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

    const { clientHeight, clientWidth } = wrapper;

    const hoveredElement = getHoveredElement(event, {
      offsetX: clientWidth + 50,
    });

    const isElement = hoveredElement instanceof Element;

    if (!isElement) return hideMenuContent();

    const isInvalid = hoveredElement.matches(INVALID_ELEMENT_SELECTOR);

    if (isInvalid) return hideMenuContent();

    const hoveredElementRect = getElementBoundingRect(hoveredElement);

    wrapper.style.left = `${hoveredElementRect.left - clientWidth}px`;
    wrapper.style.top = `${hoveredElementRect.top - clientHeight / 2}px`;

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
