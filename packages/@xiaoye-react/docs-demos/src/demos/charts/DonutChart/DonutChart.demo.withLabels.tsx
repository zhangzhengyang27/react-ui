import { DonutChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = `
import { DonutChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return <DonutChart{{props}} withLabels data={data} />;
}
`;

function Wrapper(props: any) {
  return <DonutChart {...props} withLabels data={data} />;
}

export const withLabels: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
  centered: true,
  controls: [
    { type: 'boolean', prop: 'withLabelsLine', initialValue: true, libraryValue: '__' },
    {
      type: 'segmented',
      prop: 'labelsType',
      initialValue: 'value',
      libraryValue: '__',
      data: ['value', 'percent', 'name'],
    },
  ],
};
