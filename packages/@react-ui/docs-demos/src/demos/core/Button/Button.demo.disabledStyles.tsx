import { Button } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import classes from './Button.demo.disabledStyles.module.css';

const code = `
import { Button } from '@react-ui/ui';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Button className={classes.button} disabled>
      Disabled with styles
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
      Disabled with styles
    </Button>
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
