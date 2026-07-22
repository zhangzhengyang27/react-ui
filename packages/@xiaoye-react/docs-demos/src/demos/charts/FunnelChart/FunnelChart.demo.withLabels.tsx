import { FunnelChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = `
import { FunnelChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return <FunnelChart{{props}} withLabels data={data} />;
}
`;

function Wrapper(props: any) {
  return <FunnelChart {...props} withLabels data={data} miw={300} />;
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
    {
      type: 'segmented',
      prop: 'labelsPosition',
      initialValue: 'right',
      libraryValue: '__',
      data: ['left', 'inside', 'right'],
    },
  ],
};
