import { twMerge } from 'tailwind-merge';
import { Header } from '@/ui/components/header';
import { Link } from '@/ui/components/link/link';
import type { MainLayoutProps } from './main-layout.types';

export function MainLayout({ children, className, ...rest }: MainLayoutProps) {
  return (
    <div className={twMerge('min-h-screen flex flex-col', className)} {...rest}>
      <Header className="gap-2">
        <Link variant="ghost" size="sm" className="text-xl font-bold">
          <h1>Radiology</h1>
        </Link>

        <div className="ml-auto flex items-center"></div>
      </Header>

      <main className="flex-1 flex gap-6">{children}</main>
    </div>
  );
}
