import type { Meta } from '@storybook/react';
import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetContent,
  SheetDescription,
  type SheetProps,
  type SheetContentProps,
} from './index';

const Component = ({ open, side }: SheetProps & SheetContentProps) => {
  return (
    <Sheet open={open}>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

const Story: Meta<typeof Sheet> = {
  component: Component,
  title: 'Components/common/Sheet',
};

export default Story;

export const Primary = {
  args: {
    children: 'Sheet',
  } as SheetProps & SheetContentProps,
};
