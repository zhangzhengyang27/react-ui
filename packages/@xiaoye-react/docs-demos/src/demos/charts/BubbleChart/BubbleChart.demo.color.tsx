import { BubbleChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = `
import { BubbleChart } from '@xiaoye-react/charts';
import { data } from './data';


function Demo() {
  return (
    <BubbleChart
      h={60}
      data={data}
      range={[16, 225]}
      dataKey={{ x: 'hour', y: 'index', z: 'value' }}
      {{props}}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <BubbleChart
      h={60}
      data={data}
      range={[16, 225]}
      dataKey={{ x: 'hour', y: 'index', z: 'value' }}
      {...props}
    />
  );
}

export const color: UIDemo = {
  type: 'configurator',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
  controls: [{ type: 'color', prop: 'color', initialValue: 'blue', libraryValue: null }],
};
