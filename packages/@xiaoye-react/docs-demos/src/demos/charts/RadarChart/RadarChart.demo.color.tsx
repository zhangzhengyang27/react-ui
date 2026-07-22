import { RadarChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = (props: Record<string, any>) => `
import { RadarChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <RadarChart
      h={300}
      data={data}
      dataKey="product"
      series={[{ name: 'sales', color: '${props.color}', strokeColor: '${props.strokeColor}' }]}
    />
  );
}
`;

function Wrapper(props: any) {
  return (
    <RadarChart
      h={300}
      data={data}
      dataKey="product"
      series={[{ name: 'sales', color: props.color, strokeColor: props.strokeColor }]}
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
      type: 'color',
      prop: 'strokeColor',
      initialValue: 'blue',
      libraryValue: true,
    },
  ],
};
