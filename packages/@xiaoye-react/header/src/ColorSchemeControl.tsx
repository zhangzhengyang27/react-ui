import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import cx from 'clsx';
import { useComputedUIColorScheme, useUIColorScheme } from '@xiaoye-react/ui';
import { HeaderControl } from './HeaderControl';
import classes from './ColorSchemeControl.module.css';

export function ColorSchemeControl() {
  const { setColorScheme } = useUIColorScheme();
  const computedColorScheme = useComputedUIColorScheme('light', { getInitialValueInEffect: true });

  return (
    <HeaderControl
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      tooltip={`切换为${computedColorScheme === 'dark' ? '浅色' : '深色'}模式`}
      aria-label="切换颜色主题"
    >
      <SunIcon className={cx(classes.icon, classes.light)} />
      <MoonIcon className={cx(classes.icon, classes.dark)} />
    </HeaderControl>
  );
}
