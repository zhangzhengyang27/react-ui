import { Sparkline } from '@react-ui/charts';
import { MantineDemo } from '@react-ui/demo';
import classes from './Sparkline.demo.colorSchemeColor.module.css';

const cssCode = `.root {
  @mixin light {
    --chart-color: var(--ui-color-orange-8);
  }

  @mixin dark {
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

export const colorSchemeColor: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code: cssCode, language: 'scss', fileName: 'Demo.module.css' },
    { code, language: 'tsx', fileName: 'Demo.tsx' },
  ],
  centered: true,
};
