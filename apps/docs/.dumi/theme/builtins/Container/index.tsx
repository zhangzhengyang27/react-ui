/**
 * copied: https://github.com/arvinxx/dumi-theme-antd-style/tree/master/src/builtins/Container
 */
import * as React from 'react';
import { AiFillInfoCircle, AiFillCheckCircle, AiFillWarning, AiFillCloseCircle } from 'react-icons/ai';
import { Alert } from '@react-ui/ui';

import classes from './Container.module.css';

interface ContainerProps {
  type: 'info' | 'warning' | 'success' | 'error';
  title?: string;
}

const ICON_MAP: Record<ContainerProps['type'], React.ReactNode> = {
  info: <AiFillInfoCircle />,
  success: <AiFillCheckCircle />,
  warning: <AiFillWarning />,
  error: <AiFillCloseCircle />,
};

const COLOR_MAP: Record<ContainerProps['type'], string> = {
  info: 'blue',
  success: 'green',
  warning: 'yellow',
  error: 'red',
};

const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  type,
  title,
  children,
}) => {
  return (
    <Alert
      variant="light"
      color={COLOR_MAP[type] as any}
      icon={ICON_MAP[type]}
      title={title || type.toUpperCase()}
      className={classes.alert}
    >
      <div className={`${classes.desc} markdown`}>{children}</div>
    </Alert>
  );
};

export default Container;
