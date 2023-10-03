import { Link } from '../../../link';
import { twMerge } from 'tailwind-merge';
import type { SideMenuSectionLinkItemProps } from './side-menu-section-link-item.types';

export function SideMenuSectionLinkItem({
  icon,
  href,
  title,
  variant,
  className,
  ...rest
}: SideMenuSectionLinkItemProps) {
  if (!href) return null;

  return (
    <li className={twMerge('list-none', className)}>
      <Link
        href={href}
        variant="ghost"
        className="px-2 w-full justify-start"
        {...rest}
      >
        <span className="text-sm font-medium flex items-center flex-row gap-3">
          {icon}
          {title}
        </span>
      </Link>
    </li>
  );
}
