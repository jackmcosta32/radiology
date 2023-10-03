import type { Meta } from '@storybook/react';
import { EditorPage, type EditorPageProps } from './index';

const Story: Meta<typeof EditorPage> = {
  component: EditorPage,
  title: 'Pages/EditorPage',
};

export default Story;

export const Primary = {
  args: {} as EditorPageProps,
};
