import React from 'react';

import classes from './PageBase.module.css';

interface PageBaseProps {
  children: React.ReactNode;
}

/**
 * 页面基础布局容器。
 * 提供最小高度、底部边框和背景色。
 */
export function PageBase({ children }: PageBaseProps) {
  return <div className={classes.content}>{children}</div>;
}

export default PageBase;
