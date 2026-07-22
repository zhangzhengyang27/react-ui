import { RadarChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { multiData, multiDataCode } from './_data';

const code = `
import { RadarChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <RadarChart
      h={300}
      data={data}
      dataKey="product"
      withPolarRadiusAxis
      withLegend
      series={[
        { name: 'Sales January', color: 'blue.6', opacity: 0.2 },
        { name: 'Sales February', color: 'orange.6', opacity: 0.2 },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <RadarChart
      h={300}
      data={multiData}
      dataKey="product"
      withPolarRadiusAxis
      withLegend
      series={[
        { name: 'Sales January', color: 'blue.6', opacity: 0.2 },
        { name: 'Sales February', color: 'orange.6', opacity: 0.2 },
      ]}
    />
  );
}

export const legend: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: multiDataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
