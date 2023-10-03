import TaskList from '@tiptap/extension-task-list';

export const EditorTaskList = TaskList.configure({
  HTMLAttributes: {
    class: 'not-prose pl-2',
  },
});
