import { FunnelChart } from '@react-ui/charts';
import { MantineDemo } from '@react-ui/demo';
import { data, dataCode } from './_data';

const code = `
import { FunnelChart } from '@react-ui/charts';
import { data } from './data';

function Demo() {
  return <FunnelChart{{props}} data={data} />;
}
`;

function Wrapper(props: any) {
  return <FunnelChart {...props} data={data} />;
}

export const strokeWidth: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
  centered: true,
  controls: [
    {
      type: 'number',
      prop: 'strokeWidth',
      initialValue: 1,
      min: 0,
      max: 5,
      step: 0.1,
      libraryValue: '__',
    },
  ],
};
