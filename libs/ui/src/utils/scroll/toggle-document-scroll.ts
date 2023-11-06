import { isServerSide } from '@/utils/server-side';

export function toggleDocumentScroll(enabled: boolean) {
  if (isServerSide()) return;

  const documentStyles = document.documentElement.style;

  documentStyles.overflow = enabled ? 'auto' : 'hidden';
}
