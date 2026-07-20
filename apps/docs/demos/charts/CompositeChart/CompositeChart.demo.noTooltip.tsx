import { CompositeChart } from '@react-ui/charts';
import { UIDemo } from '@react-ui/demo';
import { data, dataCode } from './_data';

const code = `
import { CompositeChart } from '@react-ui/charts';
import { data } from './data';

function Demo() {
  return (
    <CompositeChart
      h={300}
      data={data}
      dataKey="date"
      withTooltip={false}
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
      withTooltip={false}
      maxBarWidth={30}
      series={[
        { name: '西红柿', color: 'rgba(18, 120, 255, 0.2)', type: 'bar' },
        { name: '苹果', color: 'red.8', type: 'line' },
        { name: '橙子', color: 'yellow.8', type: 'area' },
      ]}
    />
  );
}

export const noTooltip: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
