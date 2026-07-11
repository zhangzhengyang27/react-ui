import { AreaChart } from '@react-ui/charts';
import { MantineDemo } from '@react-ui/demo';
import { splitData, splitDataCode } from './_data';

const code = `
import { AreaChart } from '@react-ui/charts';
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
      series={[{ name: 'Apples', color: 'bright' }]}
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
      series={[{ name: 'Apples', color: 'bright' }]}
    />
  );
}

export const split: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: 'Demo.tsx' },
    { code: splitDataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
