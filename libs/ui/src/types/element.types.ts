export type TElementProps<TIntrinsicElements = 'div'> =
  TIntrinsicElements extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[TIntrinsicElements]
    : Record<never, never>;
