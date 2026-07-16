import { PieChart } from '@react-ui/charts';
import { UIDemo } from '@react-ui/demo';
import { data, dataCode } from './_data';

const code = `
import { PieChart } from '@react-ui/charts';
import { data } from './data';

function Demo() {
  return <PieChart{{props}} data={data} />;
}
`;

function Wrapper(props: any) {
  return <PieChart {...props} data={data} mih={300} />;
}

export const size: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
  centered: true,
  controls: [
    {
      type: 'number',
      prop: 'size',
      initialValue: 160,
      min: 80,
      max: 300,
      step: 1,
      libraryValue: '__',
    },
  ],
};
