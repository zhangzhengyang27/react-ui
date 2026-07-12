import { Box } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import classes from './Styles.demo.className.module.css';

const code = `
import { Box } from '@react-ui/ui';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Box className={classes.box}>
      Box component with <span className={classes.highlight}>some styles</span>
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
      Box component with <span className={classes.highlight}>some styles</span>
    </Box>
  );
}

export const className: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', language: 'tsx', code },
    { fileName: 'Demo.module.css', language: 'scss', code: cssCode },
  ],
};
