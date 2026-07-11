import cx from 'clsx';
import { rem } from '@react-ui/ui';
import { LogoProps, useReactUILogoColors } from './use-react-ui-logo-colors';
import classes from './MantineLogo.module.css';

/**
 * ReactUI 文字版 Logo —— 图标标记 + "ReactUI" 文字
 */
export function ReactUILogoText({
  size,
  color,
  inverted,
  style,
  className,
  ...others
}: LogoProps) {
  const colors = useReactUILogoColors({ color, inverted });
  const iconSize = typeof size === 'number' ? size : 30;

  return (
    <svg
      {...others}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 48"
      style={{ height: rem(size), ...style }}
      className={cx(classes.logo, className)}
    >
      {/* 图标标记 */}
      <g transform="translate(0 0)">
        <rect width="48" height="48" rx="12" fill={colors.background} />
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
        <circle cx="24" cy="24" r="3" fill={colors.color} />
      </g>
      {/* "ReactUI" 文字 */}
      <text
        x="60"
        y="33"
        fill="currentColor"
        fontSize="26"
        fontWeight="700"
        fontFamily="Outfit, system-ui, sans-serif"
        letterSpacing="-0.5"
      >
        ReactUI
      </text>
    </svg>
  );
}
