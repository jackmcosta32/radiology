import { ButtonProps } from '../../../../components/button/button';

export interface EditorPageHeaderTitleProps
  extends Omit<ButtonProps, 'onChange'>,
    Pick<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
  title?: string;
}
