import { Switch } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import classes from './Switch.demo.styles.module.css';

const cssCode = `.track {
  transition:
    background-color 200ms ease,
    border-color 200ms ease;

  input:checked + & {
    background-color: var(--ui-color-lime-5);
    border-color: var(--ui-color-lime-5);

    & > .thumb {
      background-color: var(--ui-color-black);

      &::before {
        background-color: var(--ui-color-lime-5);
      }
    }
  }
}`;

const code = `
import { Switch } from '@react-ui/ui';
import classes from './Demo.module.css';

function Demo() {
  return <Switch classNames={classes} size="lg" />;
}
`;

function Demo() {
  return <Switch classNames={classes} size="lg" />;
}

export const styles: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
    { fileName: 'Demo.tsx', code, language: 'tsx' },
  ],
  centered: true,
  defaultExpanded: false,
};
