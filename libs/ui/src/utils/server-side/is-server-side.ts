export function isServerSide(document?: unknown): document is undefined {
  return typeof document === 'undefined';
}
