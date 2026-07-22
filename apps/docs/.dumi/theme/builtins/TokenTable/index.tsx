import type { FC } from 'react';
import * as React from 'react';
import { Table } from '@xiaoye-react/ui';

import useLocale from '../../../hooks/useLocale';
import BezierVisualizer from '../../common/BezierVisualizer';
import ColorChunk from '../ColorChunk';
import { tokenMeta } from '../versionToken';
import type { GlobalTokenSource } from '../versionToken';

import classes from './index.module.css';

type TokenTableProps = {
  type: GlobalTokenSource;
  lang: 'zh' | 'en';
};

export type TokenData = {
  name: string;
  desc: string;
  type: string;
  value: any;
};

const locales = {
  cn: {
    token: 'Token 名称',
    description: '描述',
    type: '类型',
    value: '默认值',
  },
  en: {
    token: 'Token Name',
    description: 'Description',
    type: 'Type',
    value: 'Default Value',
  },
};

/**
 * 构建 Token 表格的主体行数据。
 * 替代旧的 useColumns hook,返回 react-ui Table 可用的 body 行。
 */
export function buildTokenRows(data: TokenData[]): React.ReactNode[][] {
  return data.map((record) => {
    const isColor =
      typeof record.value === 'string' &&
      (record.value.startsWith('#') || record.value.startsWith('rgb'));

    let valueNode: React.ReactNode;
    if (isColor) {
      valueNode = (
        <ColorChunk value={record.value} enablePopover>
          {record.value}
        </ColorChunk>
      );
    } else {
      const isBezier =
        typeof record.value === 'string' &&
        record.value.toLowerCase().trim().startsWith('cubic-bezier');

      if (isBezier) {
        valueNode = <BezierVisualizer value={record.value} />;
      } else {
        valueNode =
          typeof record.value !== 'string' ? JSON.stringify(record.value) : record.value;
      }
    }

    return [
      record.name,
      record.desc,
      <span key="type" className={classes.codeSpan}>
        {record.type}
      </span>,
      valueNode,
    ];
  });
}

/**
 * 构建 Token 表格的表头。
 */
export function useTokenTableHead() {
  const [locale] = useLocale(locales);
  return [locale.token, locale.description, locale.type, locale.value] as React.ReactNode[];
}

const TokenTable: FC<TokenTableProps> = ({ type }) => {
  const [, lang] = useLocale(locales);
  const head = useTokenTableHead();

  const data = React.useMemo<TokenData[]>(
    () =>
      Object.entries(tokenMeta.global)
        .filter(([, meta]) => meta.source === type)
        .map(([token, meta]) => ({
          name: token,
          desc: lang === 'cn' ? meta.desc : meta.descEn,
          type: meta.type,
          value: undefined,
        })),
    [type, lang],
  );

  const body = React.useMemo(() => buildTokenRows(data), [data]);

  if (!body.length) {
    return null;
  }

  return <Table data={{ head, body }} withTableBorder withColumnBorders />;
};

export default TokenTable;
