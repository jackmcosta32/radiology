export function isServerSide() {
  return typeof document === 'undefined';
}
