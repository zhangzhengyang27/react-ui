import { Treemap } from '@react-ui/charts';
import { UIDemo } from '@react-ui/demo';
import { nestedData, nestedDataCode } from './_data';

const code = `
import { Treemap } from '@react-ui/charts';
import { data } from './data';

function Demo() {
  return <Treemap data={data} />;
}
`;

function Demo() {
  return <Treemap data={nestedData} />;
}

export const nestedDataDemo: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: nestedDataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
