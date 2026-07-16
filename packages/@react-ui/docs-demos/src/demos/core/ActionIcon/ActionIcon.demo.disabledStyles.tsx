import { HeartIcon } from '@phosphor-icons/react';
import { ActionIcon } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import classes from './ActionIcon.demo.disabledStyles.module.css';

const code = `
import { ActionIcon } from '@react-ui/ui';
import { HeartIcon } from '@phosphor-icons/react';
import classes from './Demo.module.css';

function Demo() {
  return (
    <ActionIcon size="xl" className={classes.button} disabled aria-label="带样式的禁用">
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
    <ActionIcon size="xl" className={classes.button} disabled aria-label="带样式的禁用">
      <HeartIcon />
    </ActionIcon>
  );
}

export const disabledStyles: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
    { fileName: '演示代码.tsx', code, language: 'tsx' },
  ],
};
