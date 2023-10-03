'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Link } from '@/ui/components/link';
import { Header } from '@/ui/components/header';
import { Button } from '@/ui/components/button';
import { isEmpty } from '@/ui/utils/arrays/is-empty';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { SideMenuSection } from '@/ui/components/side-menu';
import type { ForumLayoutProps } from './forum-layout.types';
import { Sheet, SheetContent, SheetTrigger } from '@/ui/components/sheet';

export function ForumLayout({
  children,
  sections,
  className,
  ...rest
}: ForumLayoutProps) {
  const hasSections = !isEmpty(sections);
  const [open, setOpen] = React.useState(false);

  const renderedSections = React.useMemo(() => {
    if (isEmpty(sections)) return null;

    return sections.map((section) => (
      <SideMenuSection className="w-full" key={section.title} {...section} />
    ));
  }, [sections]);

  return (
    <div className={twMerge('min-h-screen flex flex-col', className)} {...rest}>
      <Header className="gap-2">
        {hasSections && (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="flex w-4 h-4 lg:hidden"
              >
                <HamburgerMenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent side="left">{renderedSections}</SheetContent>
          </Sheet>
        )}

        <Link variant="ghost" size="sm" className="text-xl font-bold">
          <h1>Radiology</h1>
        </Link>

        <div className="ml-auto flex items-center"></div>
      </Header>

      <main className="flex flex-1 flex-row">
        {hasSections && (
          <aside className="w-72 hidden lg:flex border-r border-border gap-y-4 px-4 py-3">
            {renderedSections}
          </aside>
        )}

        <section className="flex flex-col w-full">
          <article className="flex gap-6 w-full font-normal text-sm min-h-screen">
            {children}
          </article>
        </section>
      </main>
    </div>
  );
}
