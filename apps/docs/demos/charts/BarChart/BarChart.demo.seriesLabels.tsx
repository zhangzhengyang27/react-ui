import { BarChart } from '@react-ui/charts';
import { UIDemo } from '@react-ui/demo';
import { data, dataCode } from './_data';

const code = `
import { BarChart } from '@react-ui/charts';
import { data } from './data';

function Demo() {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey="month"
      type="stacked"
      withLegend
      legendProps={{ verticalAlign: 'bottom' }}
      series={[
        { name: 'Smartphones', label: '智能手机销售额', color: 'violet.6' },
        { name: 'Laptops', label: '笔记本销售额', color: 'blue.6' },
        { name: 'Tablets', label: '平板销售额', color: 'teal.6' },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey="month"
      type="stacked"
      withLegend
      legendProps={{ verticalAlign: 'bottom' }}
      series={[
        { name: 'Smartphones', label: '手机销售额', color: 'violet.6' },
        { name: 'Laptops', label: '笔记本销售额', color: 'blue.6' },
        { name: 'Tablets', label: '平板销售额', color: 'teal.6' },
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
