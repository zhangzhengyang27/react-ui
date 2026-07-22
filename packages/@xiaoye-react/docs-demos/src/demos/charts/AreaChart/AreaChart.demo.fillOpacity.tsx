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
        { name: '西红柿', color: 'teal.6' },
        { name: '橙子', color: 'blue.6' },
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
        { name: '西红柿', color: 'teal.6' },
        { name: '橙子', color: 'blue.6' },
      ]}
      {...props}
    />
  );
}

export const fillOpacity: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
  controls: [
    {
      type: 'segmented',
      prop: 'type',
      initialValue: 'default',
      libraryValue: 'default',
      transformLabel: false,
      data: [
        { value: 'default', label: 'default' },
        { value: 'stacked', label: 'stacked' },
      ],
    },
    {
      type: 'number',
      prop: 'fillOpacity',
      initialValue: 0.2,
      libraryValue: null,
      step: 0.01,
      min: 0,
      max: 1,
    },
    {
      type: 'boolean',
      prop: 'withGradient',
      initialValue: true,
      libraryValue: true,
    },
  ],
};
