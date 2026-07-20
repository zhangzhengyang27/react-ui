import React from 'react';

import classes from './BrowserFrame.module.css';

const BrowserFrame: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={classes.browserMockup}>{children}</div>;
};

export default BrowserFrame;
