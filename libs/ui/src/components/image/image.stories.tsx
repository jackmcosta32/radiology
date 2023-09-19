import type { Meta } from '@storybook/react';
import { Image, type ImageProps } from './index';

const Story: Meta<typeof Image> = {
  component: Image,
  title: 'Components/common/Image',
};

export default Story;

export const Primary = {
  args: {
    alt: '',
    width: '400',
    height: '300',
    src: 'https://picsum.photos/400/300',
  } as ImageProps,
};
