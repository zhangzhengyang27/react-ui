import { LineChart } from '@react-ui/charts';
import { UIDemo } from '@react-ui/demo';
import { data, dataCode } from './_data';

const code = `
import { LineChart } from '@react-ui/charts';
import { data } from './data';


function Demo() {
  return (
    <LineChart
      h={300}
      data={data}
      dataKey="date"
      series={[
        { name: '苹果', color: 'indigo.6', curveType: 'linear' },
        { name: '橙子', color: 'blue.6', curveType: 'bump' },
        { name: '西红柿', color: 'teal.6', curveType: 'stepAfter' },
      ]}
      {{props}}
    />
  );
}
`;

function Wrapper(props: any) {
  return (
    <LineChart
      h={300}
      data={data}
      dataKey="date"
      series={[
        { name: '苹果', color: 'indigo.6', curveType: 'linear' },
        { name: '橙子', color: 'blue.6', curveType: 'bump' },
        { name: '西红柿', color: 'teal.6', curveType: 'stepAfter' },
      ]}
      {...props}
    />
  );
}

export const curveType: UIDemo = {
  type: 'code',
  component: Wrapper,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
