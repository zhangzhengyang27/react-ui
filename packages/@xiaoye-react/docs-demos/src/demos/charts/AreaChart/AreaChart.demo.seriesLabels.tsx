import { AreaChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = `
import { AreaChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <AreaChart
      h={300}
      data={data}
      dataKey="date"
      type="stacked"
      withLegend
      legendProps={{ verticalAlign: 'bottom' }}
      series={[
        { name: '苹果', label: '苹果销售额', color: 'indigo.6' },
        { name: '橙子', label: '橙子销售额', color: 'blue.6' },
        { name: '西红柿', label: '番茄销售额', color: 'teal.6' },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <AreaChart
      h={300}
      data={data}
      dataKey="date"
      type="stacked"
      withLegend
      legendProps={{ verticalAlign: 'bottom' }}
      series={[
        { name: '苹果', label: '苹果销售额', color: 'indigo.6' },
        { name: '橙子', label: '橙子销售额', color: 'blue.6' },
        { name: '西红柿', label: '番茄销售额', color: 'teal.6' },
      ]}
    />
  );
}

export const seriesLabels: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
