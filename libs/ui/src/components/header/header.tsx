import { twMerge } from 'tailwind-merge';
import type { HeaderProps } from './header.types';

export function Header({ children, className, ...rest }: HeaderProps) {
  return (
    <header
      className={twMerge(
        ['px-6 py-3 flex items-center justify-between border-b min-w-full'],
        className
      )}
      {...rest}
    >
      <div className="w-7xl w-full mx-auto">
        <h1 className="text-xl font-bold">Radiology</h1>

        <div className="flex gap-3 items-center">{children}</div>
      </div>
    </header>
  );
}
