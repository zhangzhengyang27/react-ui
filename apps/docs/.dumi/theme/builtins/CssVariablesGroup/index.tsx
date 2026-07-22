import React from 'react';
import { Table } from '@xiaoye-react/ui';

import classes from './index.module.css';

interface CssVariableItem {
  variable: string;
  description: React.ReactNode;
  defaultValue: React.ReactNode;
}

interface CssVariablesGroupProps {
  data: CssVariableItem[];
}

/**
 * CSS 变量分组表格组件。
 * 用于展示一组相关的 CSS 变量及其说明、默认值。
 * 基于 react-ui Table 实现。
 */
const CssVariablesGroup: React.FC<CssVariablesGroupProps> = ({ data }) => {
  const head: React.ReactNode[] = ['变量', '说明', '默认值'];

  const body: React.ReactNode[][] = data.map((item) => [
    <code key="variable">{item.variable}</code>,
    item.description,
    item.defaultValue,
  ]);

  if (!body.length) {
    return null;
  }

  return (
    <Table
      data={{ head, body }}
      striped
      highlightOnHover
      withTableBorder
      className={classes.table}
    />
  );
};

export default CssVariablesGroup;
