import { SideMenuSectionProps } from '../../components/side-menu';

export interface ForumLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sections: SideMenuSectionProps[];
}
