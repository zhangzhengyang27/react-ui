import React from 'react';
import cx from 'clsx';

import classes from './index.module.css';

const DocsSection: React.FC<React.ComponentProps<'div'>> = ({ className, ...others }) => {
  return <div className={cx(classes.section, className)} {...others} />;
};

export default DocsSection;
