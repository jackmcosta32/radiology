import { Input } from '../input';
import { Button } from '../button';
import { Textarea } from '../textarea';
import { ScrollArea } from '../scroll-area';
import { SendHorizonal, Wand2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

export function Chat() {
  return (
    <Popover>
      <PopoverTrigger className="rounded-full border-border border fixed bottom-5 right-5 shadow-lg z-10 p-4 bg-white active:bg-neutral-200 hover:bg-neutral-100 transition-colors">
        <Wand2 className="w-4 h-4 text-accent-foreground" />
      </PopoverTrigger>

      <PopoverContent
        side="top"
        className="p-0"
        sideOffset={10}
        collisionPadding={15}
      >
        <ScrollArea className="h-60 p-4">FOO</ScrollArea>

        <form className="flex flex-row p-4 border-t border-border gap-2">
          <Input autoFocus placeholder="Ask AI to write anything..." />

          <Button variant="ghost">
            <SendHorizonal className="h-4 w-4 text-accent-foreground" />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
