import { Switch } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
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
import { Switch } from '@xiaoye-react/ui';
import classes from './Demo.module.css';

function Demo() {
  return <Switch classNames={classes} size="lg" />;
}
`;

function Demo() {
  return <Switch classNames={classes} size="lg" />;
}

export const styles: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
    { fileName: '演示代码.tsx', code, language: 'tsx' },
  ],
  centered: true,
  defaultExpanded: false,
};
