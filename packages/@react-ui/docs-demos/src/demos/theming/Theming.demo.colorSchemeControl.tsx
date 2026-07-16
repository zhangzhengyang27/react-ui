import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import cx from 'clsx';
import { ActionIcon, useComputedUIColorScheme, useUIColorScheme } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import classes from './Theming.demo.colorSchemeControl.module.css';

const code = `
import { ActionIcon, useUIColorScheme, useComputedUIColorScheme } from '@react-ui/ui';
import { SunIcon, MoonIcon } from '@phosphor-icons/react';
import cx from 'clsx';
import classes from './Demo.module.css';

function Demo() {
  const { setColorScheme } = useUIColorScheme();
  const computedColorScheme = useComputedUIColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="xl"
      aria-label="切换颜色方案"
    >
      <SunIcon className={cx(classes.icon, classes.light)} />
      <MoonIcon className={cx(classes.icon, classes.dark)} />
    </ActionIcon>
  );
}
`;

const cssCode = `
.icon {
  width: 22px;
  height: 22px;
}

.dark {
  [data-ui-color-scheme='dark'] & {
    display: none;
  }

  [data-ui-color-scheme='light'] & {
    display: block;
  }
}

.light {
  [data-ui-color-scheme='light'] & {
    display: none;
  }

  [data-ui-color-scheme='dark'] & {
    display: block;
  }
}
`;

function Demo() {
  const { setColorScheme } = useUIColorScheme();
  const computedColorScheme = useComputedUIColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="xl"
      aria-label="切换颜色方案"
    >
      <SunIcon className={cx(classes.icon, classes.light)} />
      <MoonIcon className={cx(classes.icon, classes.dark)} />
    </ActionIcon>
  );
}

export const colorSchemeControl: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code },
    { fileName: '演示样式.module.css', language: 'scss', code: cssCode },
  ],
};
