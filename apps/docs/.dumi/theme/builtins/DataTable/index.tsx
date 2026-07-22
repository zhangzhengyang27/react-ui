import React from 'react';
import { Table } from '@xiaoye-react/ui';

import classes from './index.module.css';

interface DataTableProps {
  data: React.ReactNode[][];
  head?: string[];
}

/**
 * 数据表格组件。
 * 基于 react-ui Table 实现。
 * 支持移除 var(--ui-scale) 缩放变量的旧逻辑。
 */
function removeScale(input: string): string {
  const regex = /calc\((.*?)\)/g;
  const matches = input.match(regex);
  if (!matches) {
    return input;
  }
  let output = input;
  matches.forEach((match) => {
    const transformed = match.replace('calc(', '').replace(')', '').split('*')[0].trim();
    output = output.replace(match, transformed);
  });
  return output.replaceAll('rem)', 'rem');
}

function getTransformedScaledValue(value: unknown) {
  if (typeof value !== 'string' || !value.includes('var(--ui-scale)')) {
    return value as React.ReactNode;
  }
  return removeScale(value);
}

const DataTable: React.FC<DataTableProps> = ({ data, head }) => {
  const headerRow = head
    ? head.map((title) => title as React.ReactNode)
    : data[0]?.map((_, index) => `Column ${index + 1}`) ?? [];

  const body = head
    ? data.map((row) => row.map((cell) => getTransformedScaledValue(cell)))
    : data.slice(1).map((row) => row.map((cell) => getTransformedScaledValue(cell)));

  if (!body.length) {
    return null;
  }

  return (
    <Table
      data={{ head: headerRow, body }}
      striped
      highlightOnHover
      withTableBorder
      className={classes.table}
    />
  );
};

export default DataTable;
