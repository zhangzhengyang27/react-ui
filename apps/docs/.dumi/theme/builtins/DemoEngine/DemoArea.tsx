import type { CSSProperties } from 'react';
import { Box } from '@xiaoye-react/ui';

export interface DemoAreaProps {
  children?: React.ReactNode;
  withPadding?: boolean;
  centered?: boolean;
  maxWidth?: number | string;
  minHeight?: number | string;
  dimmed?: boolean;
  striped?: boolean;
  overflow?: 'hidden' | 'auto';
}

export function DemoArea({
  withPadding = true,
  overflow,
  centered,
  maxWidth,
  minHeight,
  children,
  dimmed,
  striped,
}: DemoAreaProps) {
  const style: CSSProperties = {
    flex: 1,
    position: 'relative',
    zIndex: 3,
    borderTopLeftRadius: 'calc(var(--ui-radius-md, 6px) - 1px)',
    borderTopRightRadius: 'calc(var(--ui-radius-md, 6px) - 1px)',
    overflow,
    padding: withPadding ? 'var(--ui-spacing-xl, 32px)' : undefined,
    backgroundColor: dimmed ? 'light-dark(var(--ui-color-gray-0), var(--ui-color-dark-8))' : undefined,
    display: centered ? 'flex' : undefined,
    justifyContent: centered ? 'center' : undefined,
    alignItems: centered ? 'center' : undefined,
  };

  const innerStyle: CSSProperties = {
    // 外层是 flex 容器（centered 时），内层不设 flex: 1 会被收缩到内容宽度，
    // 百分比宽度的 demo（如 use-move 自定义滑块）会整体塌陷；margin 语义与
    // @xiaoye-react/demo 包内 DemoArea 保持一致（仅 centered + maxWidth 时 auto）
    flex: maxWidth ? 1 : undefined,
    maxWidth: maxWidth ? `${maxWidth}px` : '100%',
    minHeight: minHeight ? `${minHeight}px` : 'unset',
    marginLeft: maxWidth && centered ? 'auto' : undefined,
    marginRight: maxWidth && centered ? 'auto' : undefined,
  };

  return (
    <Box style={style} mod={{ 'with-padding': withPadding, centered, dimmed, striped }}>
      <div style={innerStyle}>{children}</div>
    </Box>
  );
}
