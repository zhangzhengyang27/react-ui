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
      strokeWidth={1}
      dotProps={{ r: 2 }}
      activeDotProps={{ r: 3, strokeWidth: 1 }}
      maxBarWidth={30}
      series={[
        { name: '西红柿', color: 'rgba(18, 120, 255, 0.2)', type: 'bar' },
        { name: '苹果', color: 'red.8', type: 'line', strokeDasharray: '5 5' },
        { name: '橙子', color: 'yellow.8', type: 'area', strokeDasharray: '5 5' },
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
      strokeWidth={1}
      dotProps={{ r: 2 }}
      activeDotProps={{ r: 3, strokeWidth: 1 }}
      maxBarWidth={30}
      series={[
        { name: '西红柿', color: 'rgba(18, 120, 255, 0.2)', type: 'bar' },
        { name: '苹果', color: 'red.8', type: 'line', strokeDasharray: '5 5' },
        { name: '橙子', color: 'yellow.8', type: 'area', strokeDasharray: '5 5' },
      ]}
    />
  );
}

export const lineDasharray: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
