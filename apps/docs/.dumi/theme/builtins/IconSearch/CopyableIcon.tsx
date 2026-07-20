import React from 'react';
import { Notifications } from '@react-ui/ui';
import { clsx } from 'clsx';

import useLocale from '../../../hooks/useLocale';
import type { IconEntry } from './fields';
import classes from './CopyableIcon.module.css';

const locales = {
  cn: {
    errMessage: '复制名称失败，请重试',
  },
  en: {
    errMessage: 'Copy icon name failed, please try again.',
  },
};

export interface CopyableIconProps {
  entry: IconEntry;
  justCopied: boolean;
  onCopied: (name: string, importCode: string) => void;
}

const CopyableIcon: React.FC<CopyableIconProps> = (props) => {
  const { entry, justCopied, onCopied } = props;
  const { name, Component } = entry;
  const [locale] = useLocale(locales);

  const onCopy = async () => {
    const importCode = `<${name} />`;
    try {
      await navigator.clipboard.writeText(importCode);
      onCopied(name, importCode);
    } catch {
      Notifications.show({ title: locale.errMessage, color: 'red' });
    }
  };

  return (
    <li
      className={clsx(classes.iconItem, { [classes.copied]: justCopied })}
      onClick={onCopy}
      style={{ cursor: 'pointer' }}
    >
      <Component className={classes.icon} />
      <span className={classes.iconName}>{name}</span>
    </li>
  );
};

export default CopyableIcon;
