import { CompositeChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { biaxialData, biaxialDataCode } from './_data';

const code = `
import { CompositeChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <CompositeChart
      h={300}
      data={data}
      dataKey="name"
      withRightYAxis
      yAxisLabel="uv"
      rightYAxisLabel="pv"
      series={[
        { name: 'uv', color: 'pink.6', type: 'line' },
        { name: 'pv', color: 'cyan.6', yAxisId: 'right', type: 'area' },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <CompositeChart
      h={300}
      data={biaxialData}
      dataKey="name"
      withRightYAxis
      yAxisLabel="uv"
      rightYAxisLabel="pv"
      series={[
        { name: 'uv', color: 'pink.6', type: 'line' },
        { name: 'pv', color: 'cyan.6', yAxisId: 'right', type: 'area' },
      ]}
    />
  );
}

export const rightYAxis: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: biaxialDataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
