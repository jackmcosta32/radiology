import { EditorTaskList } from './editor-task-list';
import { EditorTaskItem } from './editor-task-item';
import { EditorUnderline } from './editor-underline';
import { EditorStarterKit } from './editor-starter-kit';
import { EditorDragAndDrop } from './editor-drag-n-drop';
import { EditorSlashCommand } from './editor-slash-command';
import { EditorSyntaxHighlight } from './editor-syntax-highlight';

export const defaultExtensions = [
  EditorStarterKit,
  EditorTaskList,
  EditorTaskItem,
  EditorUnderline,
  EditorDragAndDrop,
  EditorSyntaxHighlight,
  EditorSlashCommand,
];
