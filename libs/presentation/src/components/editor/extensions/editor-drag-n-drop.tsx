import throttle from 'lodash.throttle';
import { Extension } from '@tiptap/core';
import { NodeSelection, Plugin } from '@tiptap/pm/state';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { __serializeForClipboard, EditorView } from '@tiptap/pm/view';

export interface DragHandleOptions {
  /**
   * The width of the drag handle
   */
  dragHandleWidth: number;
}

function absoluteRect(node: Element) {
  const data = node.getBoundingClientRect();

  return {
    width: data.width,
    top: data.top + window.scrollY,
    left: data.left + window.scrollX,
  };
}

function nodeDOMAtCoords(event: MouseEvent, options?: DragHandleOptions) {
  const { clientX, clientY } = event;
  const dragHandleWidth = options?.dragHandleWidth ?? 0;

  const elements = document.elementsFromPoint(
    clientX + dragHandleWidth + 50,
    clientY
  );

  const allowedElementTypes = [
    'li',
    'p:not(:first-child)',
    'pre',
    'blockquote',
    'h1, h2, h3, h4, h5, h6',
  ].join(', ');

  return elements.find(
    (element) =>
      element.parentElement?.matches?.('.ProseMirror') ||
      element.matches(allowedElementTypes)
  );
}

function nodePosAtDOM(node: Element, view: EditorView) {
  const boundingRect = node.getBoundingClientRect();

  return view.posAtCoords({
    left: boundingRect.left + 1,
    top: boundingRect.top + 1,
  })?.inside;
}

function DragHandle(options: DragHandleOptions) {
  let dragHandleElement: HTMLElement | null = null;

  const handleDragStart = (event: DragEvent, view: EditorView) => {
    view.focus();

    if (!event.dataTransfer) return;

    const node = nodeDOMAtCoords(event, options);

    if (!(node instanceof Element)) return;

    const nodePos = nodePosAtDOM(node, view);
    if (nodePos == null || nodePos < 0) return;

    view.dispatch(
      view.state.tr.setSelection(NodeSelection.create(view.state.doc, nodePos))
    );

    const slice = view.state.selection.content();
    const { dom, text } = __serializeForClipboard(view, slice);

    event.dataTransfer.clearData();
    event.dataTransfer.setData('text/html', dom.innerHTML);
    event.dataTransfer.setData('text/plain', text);
    event.dataTransfer.effectAllowed = 'copyMove';

    event.dataTransfer.setDragImage(node, 0, 0);

    view.dragging = { slice, move: event.ctrlKey };
  };

  const handleClick = (event: MouseEvent, view: EditorView) => {
    view.focus();

    view.dom.classList.remove('dragging');

    const node = nodeDOMAtCoords(event, options);

    if (!(node instanceof Element)) return;

    const nodePos = nodePosAtDOM(node, view);
    if (!nodePos) return;

    view.dispatch(
      view.state.tr.setSelection(NodeSelection.create(view.state.doc, nodePos))
    );
  };

  const handleOnMouseMove = (view: EditorView, event: MouseEvent) => {
    if (!view.editable) return;

    const node = nodeDOMAtCoords(event, options);

    if (!(node instanceof Element) || node.matches('ul, ol')) {
      hideDragHandle();
      return;
    }

    const compStyle = window.getComputedStyle(node);
    const lineHeight = parseInt(compStyle.lineHeight, 10);
    const paddingTop = parseInt(compStyle.paddingTop, 10);

    const rect = absoluteRect(node);

    rect.top += (lineHeight - 24) / 2;
    rect.top += paddingTop;

    // Li markers
    if (node.matches('ul:not([data-type=taskList]) li, ol li')) {
      rect.left -= options.dragHandleWidth;
    }
    rect.width = options.dragHandleWidth;

    if (!dragHandleElement) return;

    dragHandleElement.style.left = `${rect.left - rect.width}px`;
    dragHandleElement.style.top = `${rect.top}px`;
    showDragHandle();
  };

  const hideDragHandle = () => {
    if (dragHandleElement) {
      dragHandleElement.classList.add('hide');
    }
  };

  const showDragHandle = () => {
    if (dragHandleElement) {
      dragHandleElement.classList.remove('hide');
    }
  };

  return new Plugin({
    view: (view) => {
      dragHandleElement = document.createElement('div');
      dragHandleElement.draggable = true;
      dragHandleElement.dataset.dragHandle = '';
      dragHandleElement.classList.add('drag-handle');
      dragHandleElement.addEventListener('dragstart', (e) => {
        handleDragStart(e, view);
      });
      dragHandleElement.addEventListener('click', (e) => {
        handleClick(e, view);
      });

      hideDragHandle();

      view?.dom?.parentElement?.appendChild(dragHandleElement);

      return {
        destroy: () => {
          dragHandleElement?.remove?.();
          dragHandleElement = null;
        },
      };
    },
    props: {
      handleDOMEvents: {
        keydown: hideDragHandle,
        mousewheel: hideDragHandle,
        mousemove: throttle(handleOnMouseMove, 300),
        // dragging class is used for CSS
        dragstart: (view) => {
          view.dom.classList.add('dragging');
        },
        drop: (view) => {
          view.dom.classList.remove('dragging');
          hideDragHandle();
        },
        dragend: (view) => {
          view.dom.classList.remove('dragging');
        },
      },
    },
  });
}

export const EditorDragAndDrop = Extension.create<DragHandleOptions>({
  name: 'dragAndDrop',

  addProseMirrorPlugins() {
    return [
      DragHandle({
        dragHandleWidth: 24,
      }),
    ];
  },
});
