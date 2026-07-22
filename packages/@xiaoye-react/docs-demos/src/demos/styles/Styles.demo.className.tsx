import { Box } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import classes from './Styles.demo.className.module.css';

const code = `
import { Box } from '@xiaoye-react/ui';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Box className={classes.box}>
      Box 组件带<span className={classes.highlight}>一些样式</span>
    </Box>
  );
}
`;

const cssCode = `
.box {
  font-size: var(--ui-font-size-xl);
  text-align: center;
  font-weight: 600;
}

.highlight {
  padding: 4px 10px;
  display: inline-block;
  border-radius: var(--ui-radius-md);
  background: var(--ui-color-blue-light);
  color: var(--ui-color-blue-light-color);
}
`;

function Demo() {
  return (
    <Box className={classes.box}>
      Box 组件带<span className={classes.highlight}>一些样式</span>
    </Box>
  );
}

export const className: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code },
    { fileName: '演示样式.module.css', language: 'scss', code: cssCode },
  ],
};
