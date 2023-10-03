import { Underline } from '@tiptap/extension-underline';

export const EditorUnderline = Underline.configure({
  HTMLAttributes: {
    class: 'underline',
  },
});
