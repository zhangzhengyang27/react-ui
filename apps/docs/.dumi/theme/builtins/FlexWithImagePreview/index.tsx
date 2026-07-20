import React from 'react';
import { Flex } from '@react-ui/ui';
import type { FlexProps } from '@react-ui/ui';
import { clsx } from 'clsx';

import ImagePreview from '../ImagePreview';
import type { ImagePreviewProps } from '../ImagePreview';
import classes from './index.module.css';

const isNonNullable = <T,>(val: T): val is NonNullable<T> => {
  return val !== undefined && val !== null;
};

interface FlexWithImagePreviewProps {
  imagePreviewProps?: ImagePreviewProps;
  title?: string;
  description?: string;
}

const FlexWithImagePreview: React.FC<
  FlexWithImagePreviewProps & React.PropsWithChildren<FlexProps>
> = (props) => {
  const { imagePreviewProps, title, description, className, style, children, ...rest } = props;
  if (!title && !description) {
    return <ImagePreview {...imagePreviewProps}>{children}</ImagePreview>;
  }
  return (
    <Flex className={clsx(classes.wrapper, className)} style={style} {...rest}>
      <Flex align="flex-start" justify="flex-start" direction="column">
        {isNonNullable(title) && <div className={classes.title}>{title}</div>}
        {isNonNullable(description) && <div className={classes.description}>{description}</div>}
      </Flex>
      <ImagePreview {...imagePreviewProps}>{children}</ImagePreview>
    </Flex>
  );
};

export default FlexWithImagePreview;
