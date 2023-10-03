import { SideMenuSectionProps } from '@/ui/components/side-menu';

export interface ForumLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sections: SideMenuSectionProps[];
}
