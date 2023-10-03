import { twMerge } from 'tailwind-merge';
import { Button } from '../../../../components/button';
import { EditorPageHeaderTitle } from '../editor-page-header-title';
import type { EditorPageHeaderProps } from './editor-page-header.types';
import { Clock, MessageSquare, MoreHorizontal, Star } from 'lucide-react';

export function EditorPageHeader({
  icon,
  title,
  children,
  className,
  ...rest
}: EditorPageHeaderProps) {
  return (
    <header
      {...rest}
      className={twMerge(
        'flex gap-1 flex-row items-center w-full px-4 py-1 bg-background/80 backdrop-blur border-b',
        className
      )}
    >
      {children}

      <EditorPageHeaderTitle title={title} />

      <span className="gap-1 ml-auto flex flex-row items-center">
        <Button className="px-2" variant="ghost">
          Share
        </Button>

        <Button className="px-2" variant="ghost">
          <MessageSquare className="w-4 h-4" />
        </Button>

        <Button className="px-2" variant="ghost">
          <Clock className="w-4 h-4" />
        </Button>

        <Button className="px-2" variant="ghost">
          <Star className="w-4 h-4" />
        </Button>

        <Button className="px-2" variant="ghost">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </span>
    </header>
  );
}
