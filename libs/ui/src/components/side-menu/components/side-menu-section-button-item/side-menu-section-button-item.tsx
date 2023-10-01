import { Button } from '../../../button';
import { twMerge } from 'tailwind-merge';
import type { SideMenuSectionButtonItemProps } from './side-menu-section-button-item.types';

export function SideMenuSectionButtonItem({
  icon,
  title,
  variant,
  className,
  ...rest
}: SideMenuSectionButtonItemProps) {
  return (
    <li className={twMerge('list-none', className)}>
      <Button variant="ghost" className="w-full justify-start" {...rest}>
        <span className="text-sm font-medium flex flex-row gap-3">
          {icon}
          {title}
        </span>
      </Button>
    </li>
  );
}
