import { AreaChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { splitData, splitDataCode } from './_data';

const code = `
import { AreaChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <AreaChart
      h={300}
      data={data}
      dataKey="date"
      type="split"
      strokeWidth={1}
      dotProps={{ r: 2, strokeWidth: 1 }}
      activeDotProps={{ r: 3, strokeWidth: 1 }}
      series={[{ name: '苹果', color: 'bright' }]}
    />
  );
}
`;

function Demo() {
  return (
    <AreaChart
      h={300}
      data={splitData}
      dataKey="date"
      type="split"
      strokeWidth={1}
      dotProps={{ r: 2, strokeWidth: 1 }}
      activeDotProps={{ r: 3, strokeWidth: 1 }}
      series={[{ name: '苹果', color: 'bright' }]}
    />
  );
}

export const split: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: splitDataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
