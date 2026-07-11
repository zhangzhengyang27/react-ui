import { Treemap } from '@react-ui/charts';
import { MantineDemo } from '@react-ui/demo';
import { data, dataCode } from './_data';

const code = `
import { Treemap } from '@react-ui/charts';
import { data } from './data';

function Demo() {
  return <Treemap data={data} strokeColor="gray.3" strokeWidth={2} />;
}
`;

function Demo() {
  return <Treemap data={data} strokeColor="gray.3" strokeWidth={2} />;
}

export const strokeColor: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: 'Demo.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
