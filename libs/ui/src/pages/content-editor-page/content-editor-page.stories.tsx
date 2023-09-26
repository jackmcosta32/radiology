import type { Meta } from '@storybook/react';
import { ContentEditorPage, type ContentEditorPageProps } from './index';

const Story: Meta<typeof ContentEditorPage> = {
  component: ContentEditorPage,
  title: 'Pages/ContentEditorPage',
};

export default Story;

export const Primary = {
  args: {} as ContentEditorPageProps,
};
