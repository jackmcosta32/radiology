import NextLink from 'next/link';
import { cn } from '../../utils/class-name';
import type { PropsWithChildren } from 'react';
import type { LinkProps as NextLinkProps } from 'next/link';
import { type VariantProps, cva } from 'class-variance-authority';

const linkVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        button: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        default: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface LinkProps
  extends Partial<NextLinkProps>,
    VariantProps<typeof linkVariants>,
    React.HTMLAttributes<HTMLAnchorElement> {}

export function Link({
  href,
  size,
  children,
  className,
  variant = 'default',
  ...rest
}: PropsWithChildren<LinkProps>) {
  const {
    scroll,
    locale,
    shallow,
    replace,
    prefetch,
    legacyBehavior,
    ...LinkProps
  } = rest;

  return (
    <NextLink
      scroll={scroll}
      locale={locale}
      shallow={shallow}
      replace={replace}
      href={href ?? '#'}
      prefetch={prefetch}
      data-variant={variant}
      legacyBehavior={legacyBehavior}
      className={cn(linkVariants({ variant, size, className }))}
      {...LinkProps}
    >
      {children}
    </NextLink>
  );
}
