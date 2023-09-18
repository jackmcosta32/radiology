import { twMerge } from 'tailwind-merge';
import { Header } from '../../components/header';
import type { MainLayoutProps } from './main-layout.types';

export function MainLayout({ children, className, ...rest }: MainLayoutProps) {
  return (
    <div className={twMerge('min-h-screen flex flex-col', className)} {...rest}>
      <Header />

      <main className="flex-1 p-6 flex gap-6">{children}</main>
    </div>
  );
}
