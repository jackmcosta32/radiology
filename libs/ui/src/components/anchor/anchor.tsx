import NextLink from 'next/link';
import { twMerge } from 'tailwind-merge';
import type { PropsWithChildren } from 'react';
import type { AnchorProps } from './anchor.types';

export function Anchor({
  href,
  children,
  className,
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
      passHref
      scroll={scroll}
      locale={locale}
      shallow={shallow}
      replace={replace}
      href={href ?? '#'}
      prefetch={prefetch}
      className={twMerge('text-prima', className)}
      legacyBehavior={legacyBehavior}
      {...anchorProps}
    >
      {children}
    </NextLink>
  );
}
