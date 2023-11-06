import type {
  TChainedCommands,
  TEditorCommand,
  TEditorCommandParams,
} from './editor.types';
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

const handleChainedCommand = ({
  range,
  inline,
  editor,
  focused,
}: TEditorCommandParams): TChainedCommands => {
  let commandChain = editor.chain();

  if (focused) {
    commandChain = commandChain.focus();
  }

  if (inline && range) {
    commandChain = commandChain.deleteRange(range);
  }

  return commandChain;
};

export const COMMANDS = {
  bold: {
    key: 'bold',
    label: 'Bold',
    icon: <Bold size="1rem" />,
    description: 'Mark the selected text as bold.',
    searchTerms: ['b', 'bold'],
    execute: (params) => {
      return handleChainedCommand(params).toggleBold().run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('bold');
    },
  },
  italic: {
    key: 'italic',
    label: 'Italic',
    icon: <Italic size="1rem" />,
    description: 'Mark the selected text as italic.',
    searchTerms: ['i', 'italic'],
    execute: (params) => {
      return handleChainedCommand(params).toggleItalic().run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('italic');
    },
  },
  underline: {
    key: 'underline',
    label: 'Underline',
    icon: <Underline size="1rem" />,
    description: 'Underline the selected text.',
    searchTerms: ['u', 'underline'],
    execute: (params) => {
      return handleChainedCommand(params).toggleUnderline().run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('underline');
    },
  },
  strike: {
    key: 'strike',
    label: 'Strike',
    icon: <Strikethrough size="1rem" />,
    description: 'Strike through.',
    searchTerms: ['s', 'strike'],
    execute: (params) => {
      return handleChainedCommand(params).toggleStrike().run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('strike');
    },
  },
  code: {
    key: 'code',
    label: 'Code',
    icon: <Code size="1rem" />,
    description: 'Capture a code snippet.',
    searchTerms: ['codeblock'],
    execute: (params) => {
      return handleChainedCommand(params).toggleCodeBlock().run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('codeBlock');
    },
  },
  text: {
    key: 'text',
    label: 'Text',
    icon: <TextIcon size="1rem" />,
    description: 'Just start typing with plain text.',
    searchTerms: ['p', 'paragraph'],
    execute: (params) => {
      return handleChainedCommand(params)
        .toggleNode('paragraph', 'paragraph')
        .run();
    },
    isActive: ({ editor }) => {
      return (
        editor.isActive('paragraph') &&
        !editor.isActive('bulletList') &&
        !editor.isActive('orderedList') &&
        !editor.isActive('taskItem')
      );
    },
  },
  'heading-1': {
    key: 'heading-1',
    label: 'Heading 1',
    icon: <Heading1 size="1rem" />,
    description: 'Big section heading.',
    searchTerms: ['title', 'big', 'large'],
    execute: (params) => {
      return handleChainedCommand(params).toggleHeading({ level: 1 }).run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('heading', { level: 1 });
    },
  },
  'heading-2': {
    key: 'heading-2',
    label: 'Heading 2',
    icon: <Heading2 size="1rem" />,
    description: 'Medium section heading.',
    searchTerms: ['subtitle', 'medium'],
    execute: (params) => {
      return handleChainedCommand(params).toggleHeading({ level: 2 }).run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('heading', { level: 2 });
    },
  },
  'heading-3': {
    key: 'heading-3',
    label: 'Heading 3',
    icon: <Heading3 size="1rem" />,
    description: 'Small section heading.',
    searchTerms: ['subtitle', 'small'],
    execute: (params) => {
      return handleChainedCommand(params).toggleHeading({ level: 3 }).run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('heading', { level: 3 });
    },
  },
  'to-do': {
    key: 'to-do-list',
    label: 'To-do List',
    icon: <CheckSquare size="1rem" />,
    description: 'Track tasks with a to-do list.',
    searchTerms: ['todo', 'task', 'list', 'check', 'checkbox'],
    execute: (params) => {
      return handleChainedCommand(params).toggleTaskList().run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('taskItem');
    },
  },
  'bullet-list': {
    key: 'bullet-list',
    label: 'Bullet List',
    icon: <ListOrdered size="1rem" />,
    description: 'Create a simple bullet list.',
    searchTerms: ['unordered', 'point'],
    execute: (params) => {
      return handleChainedCommand(params).toggleBulletList().run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('bulletList');
    },
  },
  'numbered-list': {
    key: 'numbered-list',
    label: 'Numbered List',
    icon: <ListOrdered size="1rem" />,
    description: 'Create a list with numbering.',
    searchTerms: ['ordered'],
    execute: (params) => {
      return handleChainedCommand(params).toggleOrderedList().run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('orderedList');
    },
  },
  quote: {
    key: 'quote',
    label: 'Quote',
    icon: <TextQuote size="1rem" />,
    description: 'Capture a quote.',
    searchTerms: ['blockquote'],
    execute: (params) => {
      return handleChainedCommand(params)
        .toggleNode('paragraph', 'paragraph')
        .toggleBlockquote()
        .run();
    },
    isActive: ({ editor }) => {
      return editor.isActive('blockquote');
    },
  },
} satisfies Record<string, TEditorCommand>;
