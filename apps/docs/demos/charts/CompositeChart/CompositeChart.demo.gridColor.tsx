import { CompositeChart } from '@react-ui/charts';
import { UIDemo } from '@react-ui/demo';
import { data, dataCode } from './_data';
import classes from './CompositeChart.demo.gridColor.module.css';

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
import { CompositeChart } from '@react-ui/charts';
import { data } from './data';
import classes from './Demo.module.css';

function Demo() {
  return (
    <CompositeChart
      h={300}
      data={data}
      dataKey="date"
      className={classes.root}
      maxBarWidth={30}
      series={[
        { name: '西红柿', color: 'rgba(18, 120, 255, 0.2)', type: 'bar' },
        { name: '苹果', color: 'red.8', type: 'line' },
        { name: '橙子', color: 'yellow.8', type: 'area' },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <CompositeChart
      h={300}
      data={data}
      dataKey="date"
      className={classes.root}
      maxBarWidth={30}
      series={[
        { name: '西红柿', color: 'rgba(18, 120, 255, 0.2)', type: 'bar' },
        { name: '苹果', color: 'red.8', type: 'line' },
        { name: '橙子', color: 'yellow.8', type: 'area' },
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
