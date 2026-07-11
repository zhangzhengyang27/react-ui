import { LineChart } from '@react-ui/charts';
import { MantineDemo } from '@react-ui/demo';
import { yScaleData, yScaleDataCode } from './_data';

const code = `
import { LineChart } from '@react-ui/charts';
import { data } from './data';

function Demo() {
  return (
    <LineChart
      h={300}
      data={data}
      dataKey="date"
      yAxisProps={{ domain: [0, 100] }}
      series={[{ name: 'Apples', color: 'indigo.6' }]}
    />
  );
}
`;

function Demo() {
  return (
    <LineChart
      h={300}
      data={yScaleData}
      dataKey="date"
      yAxisProps={{ domain: [0, 100] }}
      series={[{ name: 'Apples', color: 'indigo.6' }]}
    />
  );
}

export const yScale: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: 'Demo.tsx' },
    { code: yScaleDataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
