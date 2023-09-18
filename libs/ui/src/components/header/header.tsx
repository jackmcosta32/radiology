import { twMerge } from 'tailwind-merge';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Header({ children, className, ...rest }: HeaderProps) {
  return (
    <header
      className={twMerge(
        ['px-6 py-3 flex items-center justify-between border-b min-w-full'],
        className
      )}
      {...rest}
    >
      <h1 className="text-xl font-bold">Radiology</h1>

      <div className="flex gap-3 items-center">{children}</div>
    </header>
  );
}
