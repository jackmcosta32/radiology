'use client';

import React from 'react';
import type { BaseEditor, TEditorCommand } from '../../editor.types';
import { EditorNodeSelectorProps } from './editor-node-selector.types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/components/select';
import {
  TextIcon,
  Heading1,
  Heading2,
  Heading3,
  CheckSquare,
  ListOrdered,
  TextQuote,
  Code,
  Check,
} from 'lucide-react';

const NODE_SELECTOR_COMMANDS: TEditorCommand[] = [
  {
    key: 'text',
    label: 'Text',
    icon: <TextIcon />,
    command: (editor) =>
      editor.chain().focus().toggleNode('paragraph', 'paragraph').run(),
    isActive: (editor) =>
      editor.isActive('paragraph') &&
      !editor.isActive('bulletList') &&
      !editor.isActive('orderedList'),
  },
  {
    key: 'heading-1',
    label: 'Heading 1',
    icon: <Heading1 />,
    command: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor.isActive('heading', { level: 1 }),
  },
  {
    key: 'heading-2',
    label: 'Heading 2',
    icon: <Heading2 />,
    command: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive('heading', { level: 2 }),
  },
  {
    key: 'heading-3',
    label: 'Heading 3',
    icon: <Heading3 />,
    command: (editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor.isActive('heading', { level: 3 }),
  },
  {
    key: 'to-do-list',
    label: 'To-do List',
    icon: <CheckSquare />,
    command: (editor) => editor.chain().focus().toggleTaskList().run(),
    isActive: (editor) => editor.isActive('taskItem'),
  },
  {
    key: 'bullet-list',
    label: 'Bullet List',
    icon: <ListOrdered />,
    command: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive('bulletList'),
  },
  {
    key: 'numbered-list',
    label: 'Numbered List',
    icon: <ListOrdered />,
    command: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive('orderedList'),
  },
  {
    key: 'quote',
    label: 'Quote',
    icon: <TextQuote />,
    command: (editor) =>
      editor
        .chain()
        .focus()
        .toggleNode('paragraph', 'paragraph')
        .toggleBlockquote()
        .run(),
    isActive: (editor) => editor.isActive('blockquote'),
  },
  {
    key: 'code',
    label: 'Code',
    icon: <Code />,
    command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive('codeBlock'),
  },
];

const renderCommand = (command: TEditorCommand, editor: BaseEditor) => {
  const { key, icon, label, isActive } = command;
  const active = isActive(editor);

  return (
    <SelectItem key={key} value={key}>
      <span className="w-full flex flex-row gap-1 items-center whitespace-nowrap">
        {icon && <span className="border-border rounded h-2 w-2">{icon}</span>}
        {label}
        {active && <Check className="ml-auto h-2 w-2 text-accent-foreground" />}
      </span>
    </SelectItem>
  );
};

export function EditorNodeSelector({
  editor,
  onOpen,
}: EditorNodeSelectorProps) {
  const renderedCommands = React.useMemo(() => {
    if (!editor) return null;

    return NODE_SELECTOR_COMMANDS.map((command) =>
      renderCommand(command, editor)
    );
  }, [editor]);

  return (
    <Select onOpenChange={onOpen}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>

      <SelectContent>
        <span className="text-zinc-500 text-xs mb-1">Turn into</span>

        {renderedCommands}
      </SelectContent>
    </Select>
  );
}
