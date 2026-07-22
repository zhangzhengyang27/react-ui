import { AreaChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = (props: Record<string, any>) => `
import { AreaChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <AreaChart
      h={300}
      data={data}
      dataKey="date"
      withGradient${props.withGradient === false ? '={false}' : ''}
      series={[{ name: '苹果', color: '${props.color}' }]}
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
      series={[{ name: '苹果', color: props.color }]}
      {...props}
    />
  );
}

export const color: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
  controls: [
    {
      type: 'color',
      prop: 'color',
      initialValue: 'blue',
      libraryValue: true,
    },
    {
      type: 'boolean',
      prop: 'withGradient',
      initialValue: true,
      libraryValue: true,
    },
  ],
};
