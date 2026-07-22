import { PieChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = `
import { PieChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return <PieChart{{props}} data={data} />;
}
`;

function Wrapper(props: any) {
  return <PieChart {...props} data={data} />;
}

export const strokeWidth: UIDemo = {
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
      prop: 'strokeWidth',
      initialValue: 1,
      min: 0,
      max: 2,
      step: 0.1,
      libraryValue: '__',
    },
  ],
};
