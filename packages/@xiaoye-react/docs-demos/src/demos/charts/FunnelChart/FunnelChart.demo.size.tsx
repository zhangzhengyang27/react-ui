import { FunnelChart } from '@xiaoye-react/charts';
import { Center } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = `
import { FunnelChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return <FunnelChart{{props}} data={data} />;
}
`;

function Wrapper(props: any) {
  return (
    <Center mih={300}>
      <FunnelChart {...props} data={data} />
    </Center>
  );
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
