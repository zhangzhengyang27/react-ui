import { SankeyChart } from '@react-ui/charts';
import { MantineDemo } from '@react-ui/demo';
import { colorData, colorDataCode } from './_data';

const code = `
import { SankeyChart } from '@react-ui/charts';
import { data } from './data';

function Demo() {
  return <SankeyChart data={data} linkOpacity={0.2} />;
}
`;

function Demo() {
  return <SankeyChart data={colorData} linkOpacity={0.2} />;
}

export const linkOpacity: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: 'Demo.tsx' },
    { code: colorDataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
