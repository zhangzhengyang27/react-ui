import { Treemap } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { nestedData, nestedDataCode } from './_data';

const code = `
import { Treemap } from '@xiaoye-react/charts';
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
