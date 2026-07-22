import { ScatterChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { doubleData, doubleDataCode } from './_data';

const code = `
import { ScatterChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <ScatterChart
      h={350}
      data={data}
      dataKey={{ x: 'age', y: 'BMI' }}
      xAxisLabel="Age"
      yAxisLabel="BMI"
    />
  );
}
`;

function Demo() {
  return (
    <ScatterChart
      h={350}
      data={doubleData}
      dataKey={{ x: 'age', y: 'BMI' }}
      xAxisLabel="Age"
      yAxisLabel="BMI"
    />
  );
}

export const multipleSeries: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: doubleDataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
