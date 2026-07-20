import React from 'react';
import { Button, Tooltip } from '@react-ui/ui';
import { clsx } from 'clsx';

import classes from './SwitchBtn.module.css';

export interface SwitchBtnProps {
  label1: React.ReactNode;
  label2: React.ReactNode;
  tooltip1?: React.ReactNode;
  tooltip2?: React.ReactNode;
  value: 1 | 2;
  pure?: boolean;
  onClick?: React.MouseEventHandler;
  'aria-label'?: string;
  className?: string;
}

const SwitchBtn: React.FC<SwitchBtnProps> = (props) => {
  const { label1, label2, tooltip1, tooltip2, value, pure, onClick, className, ...rest } = props;

  const node = (
    <Button
      variant="transparent"
      onClick={onClick}
      className={clsx(classes.btn, className)}
      key="switch-button"
      {...rest}
    >
      <div className={classes.btnInner}>
        {pure && (value === 1 ? label1 : label2)}
        {!pure && (
          <div className={classes.innerDiv}>
            <span className={clsx(classes.label, value === 1 ? classes.label1Active : classes.label2Inactive)}>
              {label1}
            </span>
            <span className={clsx(classes.label, value === 1 ? classes.label2Inactive : classes.label1Active)}>
              {label2}
            </span>
          </div>
        )}
      </div>
    </Button>
  );

  if (tooltip1 || tooltip2) {
    return <Tooltip label={value === 1 ? tooltip1 : tooltip2}>{node}</Tooltip>;
  }

  return node;
};

export default SwitchBtn;
