import type { LinkProps } from '@mui/material/Link';
import type { LinkProps as NextLinkProps } from 'next/link';

export type AnchorProps = Partial<NextLinkProps> & LinkProps;
