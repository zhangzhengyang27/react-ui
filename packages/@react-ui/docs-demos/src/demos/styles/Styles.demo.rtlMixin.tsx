import { UIDemo } from '@react-ui/demo';
import classes from './Styles.demo.rtlMixin.module.css';

const code = `
import classes from './Demo.module.css';

function Demo() {
  return <div className={classes.demo}>演示</div>;
}
`;

const cssCode = `
.demo {
  text-align: center;
  color: var(--ui-color-white);
  padding: var(--ui-spacing-md);

  /* LTR styles */
  background-color: var(--ui-color-blue-filled);

  [dir='rtl'] & {
    /* RTL styles override LTR styles */
    background-color: var(--ui-color-red-filled);
  }
}
`;

function Demo() {
  return <div className={classes.demo}>演示</div>;
}

export const rtlMixin: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
    { fileName: '演示代码.tsx', code, language: 'tsx' },
  ],
};
