import { Sparkline } from '@react-ui/charts';
import { UIDemo } from '@react-ui/demo';
import classes from './Sparkline.demo.colorSchemeColor.module.css';

const cssCode = `.root {
  [data-ui-color-scheme='light'] & {
    --chart-color: var(--ui-color-orange-8);
  }

  [data-ui-color-scheme='dark'] & {
    --chart-color: var(--ui-color-lime-4);
  }
}
`;

const code = `
import { Sparkline } from '@react-ui/charts';
import classes from './Demo.module.css';

function Demo() {
  return <Sparkline w={200} h={80} data={[10, 20, 40, 20, 40, 10, 50]} className={classes.root} />;
}
`;

function Demo() {
  return <Sparkline w={200} h={80} data={[10, 20, 40, 20, 40, 10, 50]} className={classes.root} />;
}

export const colorSchemeColor: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code: cssCode, language: 'scss', fileName: '演示样式.module.css' },
    { code, language: 'tsx', fileName: '演示代码.tsx' },
  ],
  centered: true,
};
