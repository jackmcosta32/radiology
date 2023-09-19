import { twMerge } from 'tailwind-merge';
import type { PropsWithChildren } from 'react';
import loaderStyles from './loader.module.scss';
import { CircularProgress } from '../circular-progress';

export interface LoadingComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export interface LoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    LoadingComponentProps {
  loading?: boolean;
  backdrop?: boolean;
  keepMounted?: boolean;
  loadingComponent?: React.FC<Partial<LoadingComponentProps>>;
}

export function Loader({
  size,
  className,
  loadingComponent,
  loading = true,
  backdrop = false,
  keepMounted = true,
  ...rest
}: PropsWithChildren<LoaderProps>) {
  const shouldHide = !loading;
  const shouldUnmount = !keepMounted && !loading;
  const Component = loadingComponent ?? CircularProgress;

  if (shouldUnmount) return null;

  return (
    <div
      {...rest}
      aria-live="polite"
      aria-busy={loading}
      data-hidden={shouldHide}
      data-backdrop={backdrop}
      className={twMerge(loaderStyles.loader, className)}
    >
      {<Component size={size} />}
    </div>
  );
}
