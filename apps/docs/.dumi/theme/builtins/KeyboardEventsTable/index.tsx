import React from 'react';
import { Kbd, Table, Text } from '@react-ui/ui';

import classes from './index.module.css';

interface KeyboardEventItem {
  key: string;
  description: string;
  condition?: string;
}

interface KeyboardEventsTableProps {
  data: KeyboardEventItem[];
}

/**
 * 键盘事件表格组件。
 * 基于 react-ui Table + Kbd 实现。
 */
const KeyboardEventsTable: React.FC<KeyboardEventsTableProps> = ({ data }) => {
  const hasCondition = data.some((item) => item.condition);

  const head: React.ReactNode[] = hasCondition
    ? ['按键', '说明', '条件']
    : ['按键', '说明'];

  const body: React.ReactNode[][] = data.map((item) => {
    const row: React.ReactNode[] = [
      <Kbd key="key">{item.key}</Kbd>,
      item.description,
    ];
    if (hasCondition) {
      row.push(
        item.condition ? (
          <code key="condition" className={classes.code}>{item.condition}</code>
        ) : (
          <Text key="condition" size="sm" c="dimmed">–</Text>
        ),
      );
    }
    return row;
  });

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

export default KeyboardEventsTable;
