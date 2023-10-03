import { twMerge } from 'tailwind-merge';
import { Chat } from '../../components/chat';
import { Editor } from '../../components/editor';
import type { EditorPageProps } from './editor-page.types';
import { EditorPageHeader } from './components/editor-page-header';
import { EditorPageSideMenu } from './components/editor-page-side-menu';

export function EditorPage({ className, ...rest }: EditorPageProps) {
  return (
    <div
      {...rest}
      className={twMerge('flex flex-row w-full h-screen', className)}
    >
      <div className="w-full relative">
        <EditorPageHeader className="z-10 fixed">
          <EditorPageSideMenu />
        </EditorPageHeader>

        <main className="h-full">
          <Editor className="mx-auto max-w-4xl p-4 mt-12" />
          <Chat />
        </main>
      </div>
    </div>
  );
}
