import type { TEditorCommand } from './editor.types';
import {
  Code,
  Bold,
  Italic,
  TextIcon,
  Heading1,
  Heading2,
  Heading3,
  TextQuote,
  CheckSquare,
  ListOrdered,
  Underline,
  Strikethrough,
} from 'lucide-react';

export const COMMANDS = {
  bold: {
    key: 'bold',
    label: 'Bold',
    icon: <Bold size="1rem" />,
    execute: ({ editor }) => {
      return editor.chain().toggleBold().run();
    },
    executeInline: ({ editor }) => {
      return editor.chain().focus().toggleBold().run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('bold');
    },
  },
  italic: {
    key: 'italic',
    label: 'Italic',
    icon: <Italic size="1rem" />,
    execute: ({ editor }) => {
      return editor.chain().toggleItalic().run();
    },
    executeInline: ({ editor }) => {
      return editor.chain().focus().toggleItalic().run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('italic');
    },
  },
  underline: {
    key: 'underline',
    label: 'Underline',
    icon: <Underline size="1rem" />,
    execute: ({ editor }) => {
      return editor.chain().toggleUnderline().run();
    },
    executeInline: ({ editor }) => {
      return editor.chain().focus().toggleUnderline().run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('underline');
    },
  },
  strike: {
    key: 'strike',
    label: 'Strike',
    icon: <Strikethrough size="1rem" />,
    execute: ({ editor }) => {
      return editor.chain().toggleStrike().run();
    },
    executeInline: ({ editor }) => {
      return editor.chain().focus().toggleStrike().run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('strike');
    },
  },
  code: {
    key: 'code',
    label: 'Code',
    icon: <Code size="1rem" />,
    execute: ({ editor }) => {
      return editor.chain().toggleCodeBlock().run();
    },
    executeInline: ({ editor }) => {
      return editor.chain().focus().toggleCodeBlock().run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('codeBlock');
    },
  },
  text: {
    key: 'text',
    label: 'Text',
    icon: <TextIcon size="1rem" />,
    execute: ({ editor }) => {
      return editor.chain().toggleNode('paragraph', 'paragraph').run();
    },
    executeInline: ({ editor }) => {
      return editor.chain().focus().toggleNode('paragraph', 'paragraph').run();
    },
    isActive: ({ editor }) => {
      return (
        editor.isActive('paragraph') &&
        !editor.isActive('bulletList') &&
        !editor.isActive('orderedList')
      );
    },
  },
  'heading-1': {
    key: 'heading-1',
    label: 'Heading 1',
    icon: <Heading1 size="1rem" />,
    execute: ({ editor }) => {
      return editor.chain().toggleHeading({ level: 1 }).run();
    },
    executeInline: ({ editor }) => {
      return editor.chain().focus().toggleHeading({ level: 1 }).run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('heading', { level: 1 });
    },
  },
  'heading-2': {
    key: 'heading-2',
    label: 'Heading 2',
    icon: <Heading2 size="1rem" />,
    execute: ({ editor }) => {
      return editor.chain().toggleHeading({ level: 2 }).run();
    },
    executeInline: ({ editor }) => {
      return editor.chain().focus().toggleHeading({ level: 2 }).run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('heading', { level: 2 });
    },
  },
  'heading-3': {
    key: 'heading-3',
    label: 'Heading 3',
    icon: <Heading3 size="1rem" />,
    execute: ({ editor }) => {
      return editor.chain().toggleHeading({ level: 3 }).run();
    },
    executeInline: ({ editor }) => {
      return editor.chain().focus().toggleHeading({ level: 3 }).run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('heading', { level: 3 });
    },
  },
  'to-do': {
    key: 'to-do-list',
    label: 'To-do List',
    icon: <CheckSquare size="1rem" />,
    execute: ({ editor }) => {
      return editor.chain().toggleTaskList().run();
    },
    executeInline: ({ editor }) => {
      return editor.chain().focus().toggleTaskList().run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('taskItem');
    },
  },
  'bullet-list': {
    key: 'bullet-list',
    label: 'Bullet List',
    icon: <ListOrdered size="1rem" />,
    execute: ({ editor }) => {
      return editor.chain().toggleBulletList().run();
    },
    executeInline: ({ editor }) => {
      return editor.chain().focus().toggleBulletList().run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('bulletList');
    },
  },
  'numbered-list': {
    key: 'numbered-list',
    label: 'Numbered List',
    icon: <ListOrdered size="1rem" />,
    execute: ({ editor }) => {
      return editor.chain().toggleOrderedList().run();
    },
    executeInline: ({ editor }) => {
      return editor.chain().focus().toggleOrderedList().run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('orderedList');
    },
  },
  quote: {
    key: 'quote',
    label: 'Quote',
    icon: <TextQuote size="1rem" />,
    executeInline: ({ editor }) => {
      return editor
        .chain()
        .focus()
        .toggleNode('paragraph', 'paragraph')
        .toggleBlockquote()
        .run();
    },
    execute: ({ editor }) => {
      return editor
        .chain()
        .toggleNode('paragraph', 'paragraph')
        .toggleBlockquote()
        .run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('blockquote');
    },
  },
} satisfies Record<string, TEditorCommand>;
