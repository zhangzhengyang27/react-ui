import React, { useState } from 'react';
import { getContrastColor, Text, Tooltip, UnstyledButton, useUITheme } from '@react-ui/ui';
import { useClipboard } from '@react-ui/hooks';

import classes from './ColorsGroup.module.css';

interface ColorsGroupProps {
  group: string;
}

const ColorsGroup: React.FC<ColorsGroupProps> = ({ group }) => {
  const theme = useUITheme();
  const colors = theme.colors[group];
  const defaultIndex = Math.min(6, colors.length - 1);
  const [active, setActive] = useState({ color: colors[defaultIndex], index: defaultIndex });
  const clipboard = useClipboard({ timeout: 500 });

  const swatches = colors.map((color, index) => (
    <UnstyledButton
      aria-label="复制颜色值"
      className={classes.secondarySwatch}
      key={color}
      onMouseEnter={() => setActive({ color, index })}
      onClick={() => clipboard.copy(color)}
      style={{
        background: color,
        color: getContrastColor({
          color,
          theme: { ...theme, luminanceThreshold: 0.25 },
          autoContrast: true,
        }),
      }}
    />
  ));

  return (
    <Tooltip
      color={clipboard.copied ? 'teal.8' : undefined}
      label={clipboard.copied ? '已复制！' : '悬停预览颜色，点击复制 HEX 值'}
      multiline
      maw={190}
      position="top-start"
    >
      <div className={classes.root} onMouseLeave={() => setActive({ color: colors[defaultIndex], index: defaultIndex })}>
        <div className={classes.inner}>
          <UnstyledButton
            className={classes.primarySwatch}
            onClick={() => clipboard.copy(active.color)}
            style={{
              background: active.color,
              color: getContrastColor({ color: active.color, theme, autoContrast: true }),
            }}
          >
            <Text className={classes.name}>{group}</Text>
            <div className={classes.colorIndex}>{active.index}</div>
            <div className={classes.colorValue}>{active.color}</div>
          </UnstyledButton>

          <div className={classes.swatches}>{swatches}</div>
        </div>
      </div>
    </Tooltip>
  );
};

export default ColorsGroup;
