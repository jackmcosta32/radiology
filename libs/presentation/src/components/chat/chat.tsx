import { Input } from '@/ui/components/input';
import { Button } from '@/ui/components/button';
import { ScrollArea } from '@/ui/components/scroll-area';
import { SendHorizonal, Wand2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/ui/components/popover';

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
        <div className="flex flex-row p-2 border-b border-border gap-2">
          <span className="font-medium">Chat</span>
        </div>

        <ScrollArea className="h-60 p-4">FOO</ScrollArea>

        <form className="flex flex-row p-2 border-t border-border gap-2">
          <Input autoFocus placeholder="Ask AI to write anything..." />

          <Button variant="ghost" className="p-2">
            <SendHorizonal className="h-4 w-4 text-accent-foreground" />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
