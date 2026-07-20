import * as React from 'react';
import { Popover } from '@react-ui/ui';

import classes from './index.module.css';

/**
 * 将任意颜色字符串转换为 hex 格式。
 * 支持 #rgb、#rrggbb、rgb()、rgba() 等常见格式。
 */
function toHexString(value: string): string {
  if (typeof value !== 'string') {
    return String(value);
  }
  const trimmed = value.trim();
  // 已经是 #hex 格式
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
  // rgb / rgba
  const match = trimmed.match(/rgba?\(([^)]+)\)/i);
  if (match) {
    const parts = match[1].split(',').map((p) => parseFloat(p.trim()));
    const [r, g, b] = parts;
    const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }
  return trimmed;
}

interface ColorChunkProps {
  value: string;
  enablePopover?: boolean;
}

const ColorChunk: React.FC<React.PropsWithChildren<ColorChunkProps>> = (props) => {
  const { value, children, enablePopover } = props;

  const dotColor = React.useMemo(() => toHexString(value), [value]);

  const dotNode = (
    <span className={classes.codeSpan}>
      <span className={classes.dot} style={{ backgroundColor: dotColor }} />
      {children ?? dotColor}
    </span>
  );

  if (enablePopover) {
    return (
      <Popover position="left" width={120}>
        <Popover.Target>{dotNode}</Popover.Target>
        <Popover.Dropdown>
          <div
            style={{
              backgroundColor: dotColor,
              width: 120,
              height: 120,
              borderRadius: 'var(--ui-radius-lg)',
            }}
          />
        </Popover.Dropdown>
      </Popover>
    );
  }

  return dotNode;
};

export default ColorChunk;
