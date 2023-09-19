'use client';

import React from 'react';
import NextImage from 'next/image';
import { twMerge } from 'tailwind-merge';
import { Loader, type LoaderProps } from '../loader';
import type { ImageProps as NextImageProps } from 'next/image';

export interface ImageProps extends NextImageProps {
  loaderProps?: LoaderProps;
}

export function Image({
  className,
  loaderProps,
  onLoadStart,
  onLoadingComplete,
  ...rest
}: ImageProps) {
  const [loading, setLoading] = React.useState(true);

  const handleOnLoadStart: ImageProps['onLoadStart'] = (event) => {
    setLoading(true);

    setTimeout(() => setLoading(false), 3000);

    if (typeof onLoadStart !== 'function') return;

    onLoadStart(event);
  };

  const handleOnLoadingComplete: ImageProps['onLoadingComplete'] = (params) => {
    setTimeout(() => setLoading(false), 500);

    if (typeof onLoadingComplete !== 'function') return;

    onLoadingComplete(params);
  };

  return (
    <figure className={twMerge('relative inline-flex', className)}>
      <Loader backdrop loading={loading} {...loaderProps} />

      <NextImage
        onLoadStart={handleOnLoadStart}
        onLoadingComplete={handleOnLoadingComplete}
        {...rest}
      />
    </figure>
  );
}
