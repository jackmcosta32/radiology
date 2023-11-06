export function isEmpty(value: unknown) {
  return !Array.isArray(value) || !value.length;
}
