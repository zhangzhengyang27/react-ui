import { rem } from '@xiaoye-react/ui';
import { LogoProps, useReactUILogoColors } from './use-react-ui-logo-colors';

/**
 * ReactUI 图标标记 —— 圆角方形背景 + React 原子轨道图形
 */
export function ReactUILogoMark({
  size,
  color,
  inverted,
  style,
  ...others
}: LogoProps) {
  const colors = useReactUILogoColors({ color, inverted });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 48 48"
      style={{ width: rem(size), height: rem(size), ...style }}
      {...others}
    >
      {/* 圆角方形背景 */}
      <rect width="48" height="48" rx="12" fill={colors.background} />
      {/* React 原子轨道图形 */}
      <g
        stroke={colors.color}
        strokeWidth="2"
        fill="none"
        transform="translate(24 24)"
      >
        <ellipse rx="14" ry="5.5" />
        <ellipse rx="14" ry="5.5" transform="rotate(60)" />
        <ellipse rx="14" ry="5.5" transform="rotate(120)" />
      </g>
      {/* 中心圆点 */}
      <circle cx="24" cy="24" r="3" fill={colors.color} />
    </svg>
  );
}
