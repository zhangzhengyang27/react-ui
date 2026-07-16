import { AreaChart } from '@react-ui/charts';
import { UIDemo } from '@react-ui/demo';
import { data, dataCode } from './_data';
import classes from './AreaChart.demo.colorSchemeColor.module.css';

const cssCode = `.root {
  [data-ui-color-scheme='light'] & {
    --area-color: var(--ui-color-orange-8);
  }

  [data-ui-color-scheme='dark'] & {
    --area-color: var(--ui-color-lime-4);
  }
}
`;

const code = `
import { AreaChart } from '@react-ui/charts';
import { data } from './data';
import classes from './Demo.module.css';

function Demo() {
  return (
    <AreaChart
      h={300}
      data={data}
      dataKey="date"
      className={classes.root}
      series={[{ name: '苹果', color: 'var(--area-color)' }]}
    />
  );
}
`;

function Demo() {
  return (
    <AreaChart
      h={300}
      data={data}
      dataKey="date"
      className={classes.root}
      series={[{ name: '苹果', color: 'var(--area-color)' }]}
    />
  );
}

export const colorSchemeColor: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: cssCode, language: 'scss', fileName: '演示样式.module.css' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
