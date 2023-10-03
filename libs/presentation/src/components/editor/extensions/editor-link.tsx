import TiptapLink from '@tiptap/extension-link';

export const EditorLink = TiptapLink.configure({
  HTMLAttributes: {
    class:
      'text-primary-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer',
  },
});
