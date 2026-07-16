import { Button } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import classes from './Button.demo.disabledStyles.module.css';

const code = `
import { Button } from '@react-ui/ui';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Button className={classes.button} disabled>
      带样式的禁用
    </Button>
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
    <Button className={classes.button} disabled>
      带样式的禁用
    </Button>
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
