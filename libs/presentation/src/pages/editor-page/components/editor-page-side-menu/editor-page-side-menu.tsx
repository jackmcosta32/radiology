'use client';

import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/ui/components/sheet';
import {
  SideMenuSection,
  type SideMenuSectionProps,
} from '@/ui/components/side-menu';
import {
  Menu,
  Plus,
  Clock,
  Search,
  Settings,
  PlusCircle,
  ChevronsLeft,
} from 'lucide-react';

const SIDE_MENU_SECTION_ITEMS = [
  { icon: <Search className="h-4 w-4" />, variant: 'button', title: 'Search' },
  { icon: <Clock className="h-4 w-4" />, variant: 'button', title: 'Updates' },
  {
    icon: <Settings className="h-4 w-4" />,
    variant: 'button',
    title: 'Settings & members',
  },
  {
    icon: <PlusCircle className="h-4 w-4" />,
    variant: 'button',
    title: 'New Document',
  },
  {
    icon: <Plus className="h-4 w-4" />,
    variant: 'button',
    title: 'Add a page',
  },
] as SideMenuSectionProps['items'];

export function EditorPageSideMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu
          data-open={open}
          className="w-5 h-5 text-accent-foreground data-[open=true]:hidden"
        />
        <ChevronsLeft
          data-open={open}
          className="w-5 h-5 text-accent-foreground data-[open=true]:block hidden"
        />
      </SheetTrigger>

      <SheetContent side="left">
        <SideMenuSection className="mt-1" items={SIDE_MENU_SECTION_ITEMS} />
      </SheetContent>
    </Sheet>
  );
}
