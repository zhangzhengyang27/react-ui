import { BarChart } from '@react-ui/charts';
import { UIDemo } from '@react-ui/demo';
import { data, dataCode } from './_data';
import classes from './BarChart.demo.colorSchemeColor.module.css';

const cssCode = `.root {
  [data-ui-color-scheme='light'] & {
    --bar-color: var(--ui-color-orange-8);
  }

  [data-ui-color-scheme='dark'] & {
    --bar-color: var(--ui-color-lime-4);
  }
}
`;

const code = `
import { BarChart } from '@react-ui/charts';
import { data } from './data';
import classes from './Demo.module.css';

function Demo() {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey="month"
      className={classes.root}
      series={[{ name: 'Smartphones', color: 'var(--bar-color)' }]}
    />
  );
}
`;

function Demo() {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey="month"
      className={classes.root}
      series={[{ name: 'Smartphones', color: 'var(--bar-color)' }]}
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
