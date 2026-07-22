import { LineChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = `
import { LineChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <LineChart
      h={300}
      data={data}
      dataKey="date"
      orientation="vertical"
      series={[
        { name: '苹果', color: 'indigo.6' },
        { name: '橙子', color: 'blue.6' },
        { name: '西红柿', color: 'teal.6' },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <LineChart
      h={300}
      data={data}
      dataKey="date"
      orientation="vertical"
      series={[
        { name: '苹果', color: 'indigo.6' },
        { name: '橙子', color: 'blue.6' },
        { name: '西红柿', color: 'teal.6' },
      ]}
    />
  );
}

export const vertical: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
