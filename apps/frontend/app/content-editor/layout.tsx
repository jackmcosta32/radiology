import { MainLayout } from '@/ui/layouts/main-layout';

export default function ContentEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
