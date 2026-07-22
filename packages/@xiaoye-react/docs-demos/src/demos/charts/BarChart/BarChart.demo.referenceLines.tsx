import { BarChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = `
import { BarChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey="month"
      referenceLines={[
        {
          y: 1130,
          color: 'red.5',
          label: '已达利润',
          labelPosition: 'insideTopRight',
        },
      ]}
      series={[
        { name: 'Smartphones', color: 'violet.6' },
        { name: 'Laptops', color: 'blue.6' },
        { name: 'Tablets', color: 'teal.6' },
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
      referenceLines={[
        {
          y: 1130,
          color: 'red.5',
          label: '已达利润',
          labelPosition: 'insideTopRight',
        },
      ]}
      series={[
        { name: 'Smartphones', color: 'violet.6' },
        { name: 'Laptops', color: 'blue.6' },
        { name: 'Tablets', color: 'teal.6' },
      ]}
    />
  );
}

export const referenceLines: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
