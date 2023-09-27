import { twMerge } from 'tailwind-merge';
import type { HeaderProps } from './header.types';

export function Header({ children, className, ...rest }: HeaderProps) {
  return (
    <header
      className={twMerge(
        ['px-4 py-3 flex items-center justify-between border-b min-w-full'],
        className
      )}
      {...rest}
    >
      {children}
    </header>
  );
}
