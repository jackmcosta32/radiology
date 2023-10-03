import { createLowlight } from 'lowlight';
import 'highlight.js/styles/tokyo-night-dark.css';
import ts from 'highlight.js/lib/languages/typescript';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

const lowlight = createLowlight({ ts });

// TODO: Check shiki.matsu.io js
// TODO: CMDK Paco
// TODO: Yjs
export const EditorSyntaxHighlight = CodeBlockLowlight.configure({
  lowlight,
});
