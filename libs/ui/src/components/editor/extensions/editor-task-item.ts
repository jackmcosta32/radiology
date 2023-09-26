import TaskItem from '@tiptap/extension-task-item';

export const EditorTaskItem = TaskItem.configure({
  HTMLAttributes: {
    class: 'flex items-start my-4',
  },
  nested: true,
});
