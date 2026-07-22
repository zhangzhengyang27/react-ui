// 用于 color.md 中的颜色对比
import React from 'react';
import { clsx } from 'clsx';
import { Flex } from '@xiaoye-react/ui';

import useLocale from '../../../hooks/useLocale';
import { tokenMeta } from '../versionToken';

import classes from './index.module.css';

/**
 * 将任意颜色字符串转换为 hex 格式。
 */
function color2Rgba(color: string) {
  if (!color) {
    return '';
  }
  const trimmed = color.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) {
    return trimmed.toUpperCase();
  }
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    return (
      '#' +
      trimmed
        .slice(1)
        .split('')
        .map((c) => c + c)
        .join('')
    ).toUpperCase();
  }
  const match = trimmed.match(/rgba?\(([^)]+)\)/i);
  if (match) {
    const parts = match[1].split(',').map((p) => parseFloat(p.trim()));
    const [r, g, b] = parts;
    const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }
  return trimmed;
}

interface ColorCircleProps {
  color?: string;
}

const ColorCircle: React.FC<ColorCircleProps> = ({ color }) => {
  return (
    <Flex align="center" gap={4}>
      <div className={classes.dot} style={{ backgroundColor: color }} />
      <div className={classes.dotColor}>{color}</div>
    </Flex>
  );
};

export interface TokenCompareProps {
  tokenNames?: string;
}

const TokenCompare: React.FC<TokenCompareProps> = (props) => {
  const { tokenNames = '' } = props;
  const [, lang] = useLocale();

  const tokenList = React.useMemo(() => {
    const list = tokenNames.split('|');

    return list.map((tokenName) => {
      const meta = tokenMeta.global?.[tokenName];
      const name = lang === 'cn' ? meta.name : meta.nameEn;
      return {
        name: name.replace('颜色', '').replace('色', '').replace('Color', '').trim(),
        light: color2Rgba(''),
        dark: color2Rgba(''),
      };
    });
  }, [lang, tokenNames]);

  return (
    <div className={classes.container}>
      {tokenList.map((data) => (
        <div key={data.name} className={classes.row}>
          <div className={classes.col}>{data.name}</div>
          <div className={classes.col}>
            <ColorCircle color={data.light} />
          </div>
          <div className={clsx(classes.col, classes.colDark)}>
            <ColorCircle color={data.dark} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenCompare;
