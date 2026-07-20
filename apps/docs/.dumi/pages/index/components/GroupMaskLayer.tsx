import React from 'react';
import { clsx } from 'clsx';

import classes from './GroupMaskLayer.module.css';

export interface GroupMaskLayerProps {
  className?: string;
  style?: React.CSSProperties;
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

const GroupMaskLayer: React.FC<React.PropsWithChildren<GroupMaskLayerProps>> = (props) => {
  const { children, className, style, onMouseMove, onMouseEnter, onMouseLeave } = props;
  return (
    <div
      style={style}
      className={clsx(className, classes.siteMask)}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

export default GroupMaskLayer;
