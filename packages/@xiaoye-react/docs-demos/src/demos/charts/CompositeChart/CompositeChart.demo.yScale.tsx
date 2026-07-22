import { CompositeChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { yScaleData, yScaleDataCode } from './_data';

const code = `
import { CompositeChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <CompositeChart
      h={300}
      data={data}
      dataKey="date"
      yAxisProps={{ domain: [0, 100] }}
      series={[{ name: '苹果', color: 'indigo.6', type: 'area' }]}
    />
  );
}
`;

function Demo() {
  return (
    <CompositeChart
      h={300}
      data={yScaleData}
      dataKey="date"
      yAxisProps={{ domain: [0, 100] }}
      series={[{ name: '苹果', color: 'indigo.6', type: 'area' }]}
    />
  );
}

export const yScale: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: yScaleDataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
