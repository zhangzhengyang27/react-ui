import { CompositeChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';
import classes from './CompositeChart.demo.colorSchemeColor.module.css';

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
import { CompositeChart } from '@xiaoye-react/charts';
import { data } from './data';
import classes from './Demo.module.css';

function Demo() {
  return (
    <CompositeChart
      h={300}
      data={data}
      dataKey="date"
      className={classes.root}
      series={[{ name: '苹果', color: 'var(--chart-color)', type: 'line' }]}
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
      series={[{ name: '苹果', color: 'var(--chart-color)', type: 'line' }]}
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
