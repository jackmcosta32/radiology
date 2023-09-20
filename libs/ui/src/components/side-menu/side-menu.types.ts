export interface TSectionItem {
  href?: string;
  title: string;
  icon?: React.ReactNode;
  subItems?: TSectionItem[];
}
