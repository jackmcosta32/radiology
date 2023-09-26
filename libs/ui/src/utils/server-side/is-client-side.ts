export function isClientSide(document?: unknown): document is Document {
  return typeof document !== 'undefined';
}
