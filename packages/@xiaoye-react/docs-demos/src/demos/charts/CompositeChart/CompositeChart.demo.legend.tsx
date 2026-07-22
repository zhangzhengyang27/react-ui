import { CompositeChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = `
import { CompositeChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <CompositeChart
      h={300}
      data={data}
      dataKey="date"
      withLegend
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
      withLegend
      maxBarWidth={30}
      series={[
        { name: '西红柿', color: 'rgba(18, 120, 255, 0.2)', type: 'bar' },
        { name: '苹果', color: 'red.8', type: 'line' },
        { name: '橙子', color: 'yellow.8', type: 'area' },
      ]}
    />
  );
}

export const legend: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
