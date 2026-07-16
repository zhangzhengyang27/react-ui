import { LineChart } from '@react-ui/charts';
import { UIDemo } from '@react-ui/demo';
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
      referenceLines={[
        { y: 40, label: '平均销售额', color: 'red.6' },
        { x: 'Mar 25', label: '报告输出' },
      ]}
      series={[{ name: '苹果', color: 'indigo.6' }]}
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
      referenceLines={[
        { y: 40, label: '平均销售额', color: 'red.6' },
        { x: 'Mar 25', label: '报告输出' },
      ]}
      series={[{ name: '苹果', color: 'indigo.6' }]}
    />
  );
}

export const referenceLines: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: yScaleDataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
