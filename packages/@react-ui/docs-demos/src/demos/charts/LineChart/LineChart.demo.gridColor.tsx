import { LineChart } from '@react-ui/charts';
import { UIDemo } from '@react-ui/demo';
import { data, dataCode } from './_data';
import classes from './LineChart.demo.gridColor.module.css';

const cssCode = `
.root {
  [data-ui-color-scheme='light'] & {
    --chart-grid-color: alpha(var(--ui-color-black), 0.15);
    --chart-text-color: var(--ui-color-gray-7);
  }

  [data-ui-color-scheme='dark'] & {
    --chart-grid-color: alpha(var(--ui-color-white), 0.15);
    --chart-text-color: var(--ui-color-dark-0);
  }
}
`;

const code = `
import { LineChart } from '@react-ui/charts';
import { data } from './data';
import classes from './Demo.module.css';

function Demo() {
  return (
    <LineChart
      h={300}
      data={data}
      dataKey="date"
      className={classes.root}
      series={[
        { name: '苹果', color: 'indigo.6' },
        { name: '橙子', color: 'blue.6' },
        { name: '西红柿', color: 'teal.6' },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <LineChart
      h={300}
      data={data}
      dataKey="date"
      className={classes.root}
      series={[
        { name: '苹果', color: 'indigo.6' },
        { name: '橙子', color: 'blue.6' },
        { name: '西红柿', color: 'teal.6' },
      ]}
    />
  );
}

export const gridColor: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code: cssCode, language: 'scss', fileName: '演示样式.module.css' },
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
