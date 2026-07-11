import { SankeyChart } from '@react-ui/charts';
import { MantineDemo } from '@react-ui/demo';
import { data, dataCode } from './_data';

const code = `
import { SankeyChart } from '@react-ui/charts';
import { data } from './data';

function Demo() {
  return <SankeyChart data={data} />;
}
`;

function Demo() {
  return <SankeyChart data={data} />;
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: 'Demo.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
