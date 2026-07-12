import { HeartIcon } from '@phosphor-icons/react';
import { ActionIcon } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import classes from './ActionIcon.demo.disabledStyles.module.css';

const code = `
import { ActionIcon } from '@react-ui/ui';
import { HeartIcon } from '@phosphor-icons/react';
import classes from './Demo.module.css';

function Demo() {
  return (
    <ActionIcon size="xl" className={classes.button} disabled aria-label="Disabled with styles">
      <HeartIcon />
    </ActionIcon>
  );
}
`;

const cssCode = `
.button {
  &:disabled,
  &[data-disabled] {
    border-color: light-dark(var(--ui-color-gray-3), var(--ui-color-dark-4));
    background-color: transparent;
  }
}
`;

function Demo() {
  return (
    <ActionIcon size="xl" className={classes.button} disabled aria-label="Disabled with styles">
      <HeartIcon />
    </ActionIcon>
  );
}

export const disabledStyles: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
    { fileName: 'Demo.tsx', code, language: 'tsx' },
  ],
};
