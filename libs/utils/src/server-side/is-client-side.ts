export function isClientSide() {
  return typeof document !== 'undefined';
}
