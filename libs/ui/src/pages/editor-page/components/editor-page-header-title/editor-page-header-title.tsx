'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import type { EditorPageHeaderTitleProps } from './editor-page-header-title.types';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../../../../components/popover';

export function EditorPageHeaderTitle({
  title,
  onChange,
  className,
  ...rest
}: EditorPageHeaderTitleProps) {
  const [pageTitle, setPageTitle] = React.useState(title);

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value;

    setPageTitle(value);

    if (typeof onChange !== 'function') return;

    onChange(event);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={twMerge(
            'px-2 text-ellipsis max-w-[15rem] whitespace-nowrap overflow-hidden',
            className
          )}
          {...rest}
        >
          {pageTitle || 'Untitled'}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <Input
          name="name"
          className="h-8"
          value={pageTitle}
          placeholder="Untitled"
          onChange={handleOnChange}
        />
      </PopoverContent>
    </Popover>
  );
}
