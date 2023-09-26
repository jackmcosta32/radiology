import { Editor } from '../../components/editor';
import type { ContentEditorPageProps } from './content-editor-page.types';

export function ContentEditorPage({ ...rest }: ContentEditorPageProps) {
  return (
    <div className="flex flex-row min-h-screen">
      <aside className="bg-zinc-50 border-r border-border p-4 min-w-[18rem] hidden md:flex">
        foo
      </aside>

      <section className="p-4 w-full">
        <article className="max-w-7xl mx-auto pt-16">
          <Editor />
        </article>
      </section>
    </div>
  );
}
