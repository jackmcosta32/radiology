import { isClientSide } from '../server-side';

export function toggleDocumentScroll(enabled: boolean) {
  if (!isClientSide(document)) return;

  const documentStyles = document.documentElement.style;

  documentStyles.overflow = enabled ? 'auto' : 'hidden';
}
