import { ScatterChart } from '@react-ui/charts';
import { MantineDemo } from '@react-ui/demo';
import { data, dataCode } from './_data';
import classes from './ScatterChart.demo.gridColor.module.css';

const cssCode = `
.root {
  @mixin light {
    --chart-grid-color: alpha(var(--ui-color-black), 0.15);
    --chart-text-color: var(--ui-color-gray-7);
  }

  @mixin dark {
    --chart-grid-color: alpha(var(--ui-color-white), 0.15);
    --chart-text-color: var(--ui-color-dark-0);
  }
}
`;

const code = `
import { ScatterChart } from '@react-ui/charts';
import { data } from './data';
import classes from './Demo.module.css';

function Demo() {
  return (
    <ScatterChart
      h={350}
      data={data}
      dataKey={{ x: 'age', y: 'BMI' }}
      xAxisLabel="Age"
      yAxisLabel="BMI"
      className={classes.root}
    />
  );
}
`;

function Demo() {
  return (
    <ScatterChart
      h={350}
      data={data}
      dataKey={{ x: 'age', y: 'BMI' }}
      xAxisLabel="Age"
      yAxisLabel="BMI"
      className={classes.root}
    />
  );
}

export const gridColor: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code: cssCode, language: 'scss', fileName: 'Demo.module.css' },
    { code, language: 'tsx', fileName: 'Demo.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
