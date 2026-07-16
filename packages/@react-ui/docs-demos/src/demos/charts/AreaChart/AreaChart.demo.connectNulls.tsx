import { AreaChart } from '@react-ui/charts';
import { UIDemo } from '@react-ui/demo';
import { connectNullsData, connectNullsDataCode } from './_data';

const code = `
import { AreaChart } from '@react-ui/charts';
import { data } from './data';


function Demo() {
  return (
    <AreaChart
      h={300}
      data={data}
      dataKey="date"
      series={[{ name: '苹果', color: 'indigo.6' }]}
      {{props}}
    />
  );
}
`;

function Wrapper(props: any) {
  return (
    <AreaChart
      h={300}
      data={connectNullsData}
      dataKey="date"
      series={[{ name: '苹果', color: 'indigo.6' }]}
      {...props}
    />
  );
}

export const connectNulls: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: connectNullsDataCode, language: 'tsx', fileName: 'data.ts' },
  ],
  controls: [
    {
      type: 'select',
      prop: 'curveType',
      initialValue: 'linear',
      libraryValue: null,
      data: [
        { value: 'bump', label: 'bump' },
        { value: 'linear', label: 'linear' },
        { value: 'natural', label: 'natural' },
        { value: 'monotone', label: 'monotone' },
        { value: 'step', label: 'step' },
        { value: 'stepBefore', label: 'stepBefore' },
        { value: 'stepAfter', label: 'stepAfter' },
      ],
    },
    {
      type: 'boolean',
      prop: 'connectNulls',
      initialValue: true,
      libraryValue: '__',
    },
  ],
};
