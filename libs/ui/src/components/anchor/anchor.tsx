import NextLink from 'next/link';
import { cn } from '../../utils/class-name';
import type { PropsWithChildren } from 'react';
import type { LinkProps as NextLinkProps } from 'next/link';
import { type VariantProps, cva } from 'class-variance-authority';

const anchorVariants = cva(
  'text-primary hover:text-primary/90 inline-flex items-center justify-center text-sm font-medium transition-colors cursor-pointer',
  {
    variants: {
      variant: {
        flat: 'no-underline',
        default: 'underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface AnchorProps
  extends Partial<NextLinkProps>,
    VariantProps<typeof anchorVariants>,
    React.HTMLAttributes<HTMLAnchorElement> {}

export function Anchor({
  href,
  size,
  children,
  className,
  variant = 'default',
  ...rest
}: PropsWithChildren<AnchorProps>) {
  const {
    scroll,
    locale,
    shallow,
    replace,
    prefetch,
    legacyBehavior,
    ...anchorProps
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
      className={cn(anchorVariants({ variant, size, className }))}
      {...anchorProps}
    >
      {children}
    </NextLink>
  );
}
