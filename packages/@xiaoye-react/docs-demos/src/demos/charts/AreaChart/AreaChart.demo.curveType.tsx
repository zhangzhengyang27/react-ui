import { AreaChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = `
import { AreaChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <AreaChart
      h={300}
      data={data}
      dataKey="date"
      series={[
        { name: '苹果', color: 'indigo.6', curveType: 'linear' },
        { name: '橙子', color: 'blue.6', curveType: 'bump' },
        { name: '西红柿', color: 'teal.6', curveType: 'stepAfter' },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <AreaChart
      h={300}
      data={data}
      dataKey="date"
      series={[
        { name: '苹果', color: 'indigo.6', curveType: 'linear' },
        { name: '橙子', color: 'blue.6', curveType: 'bump' },
        { name: '西红柿', color: 'teal.6', curveType: 'stepAfter' },
      ]}
    />
  );
}

export const curveType: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
