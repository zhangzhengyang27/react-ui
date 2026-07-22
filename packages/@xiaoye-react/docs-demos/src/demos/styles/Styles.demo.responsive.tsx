import { UIDemo } from '@xiaoye-react/demo';
import classes from './Styles.demo.responsive.module.css';

const code = `
import classes from './Demo.module.css';

function Demo() {
  return <div className={classes.demo}>演示</div>;
}
`;

const cssCode = `
.demo {
  background-color: var(--ui-color-blue-filled);
  color: var(--ui-color-white);
  padding: var(--ui-spacing-md);
  text-align: center;

  @media (min-width: em(750px)) {
    background-color: var(--ui-color-red-filled);
  }
}
`;

function Demo() {
  return <div className={classes.demo}>演示</div>;
}

export const responsive: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
    { fileName: '演示代码.tsx', code, language: 'tsx' },
  ],
};
