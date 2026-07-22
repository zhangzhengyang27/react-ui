import { BarChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { waterfallCode, waterfallData } from './_data';

const code = `
import { BarChart } from '@xiaoye-react/charts';
import { data } from './data';


function Demo() {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey="item"
      type="waterfall"
      series={[{ name: 'Effective tax rate in %', color: 'blue' }]}
      withLegend
    />
  );
}
`;

function Demo() {
  return (
    <BarChart
      h={300}
      data={waterfallData}
      dataKey="item"
      type="waterfall"
      series={[{ name: 'Effective tax rate in %', color: 'blue' }]}
      withLegend
    />
  );
}

export const waterfall: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: waterfallCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
