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
        { name: '苹果', color: 'indigo.6' },
        { name: '橙子', color: 'blue.6' },
        { name: '西红柿', color: 'teal.6' },
      ]}
      {{props}}
    />
  );
}
`;

function Wrapper(props: any) {
  return (
    <AreaChart
      h={300}
      data={data}
      dataKey="date"
      series={[
        { name: '苹果', color: 'indigo.6' },
        { name: '橙子', color: 'blue.6' },
        { name: '西红柿', color: 'teal.6' },
      ]}
      {...props}
    />
  );
}

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
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
      type: 'segmented',
      prop: 'tickLine',
      initialValue: 'y',
      libraryValue: 'y',
      transformLabel: false,
      data: [
        { value: 'x', label: 'x' },
        { value: 'y', label: 'y' },
        { value: 'xy', label: 'xy' },
        { value: 'none', label: 'none' },
      ],
    },
    {
      type: 'segmented',
      prop: 'gridAxis',
      initialValue: 'x',
      libraryValue: 'x',
      transformLabel: false,
      data: [
        { value: 'x', label: 'x' },
        { value: 'y', label: 'y' },
        { value: 'xy', label: 'xy' },
        { value: 'none', label: 'none' },
      ],
    },
    {
      type: 'boolean',
      prop: 'withGradient',
      initialValue: true,
      libraryValue: true,
    },
    {
      type: 'boolean',
      prop: 'withXAxis',
      initialValue: true,
      libraryValue: true,
    },
    {
      type: 'boolean',
      prop: 'withYAxis',
      initialValue: true,
      libraryValue: true,
    },
    {
      type: 'boolean',
      prop: 'withDots',
      initialValue: true,
      libraryValue: true,
    },
  ],
};
