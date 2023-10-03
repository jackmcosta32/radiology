import { ButtonProps } from '@/ui/components/button';

export interface EditorPageHeaderTitleProps
  extends Omit<ButtonProps, 'onChange'>,
    Pick<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
  title?: string;
}
