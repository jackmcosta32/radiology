'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/ui/components/button';
import { EditorCommandList } from '../editor-command-list';
import { EditorCommandDropdownProps } from './editor-command-dropdown.types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/ui/components/popover';

export function EditorCommandDropdown({
  editor,
  onOpen,
  autoFocus,
  commands = [],
}: EditorCommandDropdownProps) {
  const [open, setOpen] = React.useState(false);

  const defaultCommand = commands[0];

  const activeCommand = commands.find((command) =>
    command.isActive({ editor })
  );

  const handleOnOpenChange = (open: boolean) => {
    setOpen(open);

    if (typeof onOpen !== 'function') return;

    onOpen(open);
  };

  return (
    <Popover open={open} modal={true} onOpenChange={handleOnOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          data-active={open}
          autoFocus={autoFocus}
          className="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground whitespace-nowrap gap-2 p-2"
        >
          {(activeCommand ?? defaultCommand).label}

          <ChevronDown
            data-active={open}
            className="data-[active=true]:rotate-180 transition-transform w-4 h-4 text-neutral-400"
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={10}
        className="flex px-1 py-3 flex-col h-80"
      >
        <span className="text-zinc-500 text-xs px-2 mb-1">Turn into</span>

        <EditorCommandList editor={editor} items={commands} />
      </PopoverContent>
    </Popover>
  );
}
