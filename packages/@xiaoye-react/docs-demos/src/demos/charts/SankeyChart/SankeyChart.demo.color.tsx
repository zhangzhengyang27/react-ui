import { SankeyChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { colorData, colorDataCode } from './_data';

const code = `
import { SankeyChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return <SankeyChart data={data} linkOpacity={0.2} />;
}
`;

function Demo() {
  return <SankeyChart data={colorData} linkOpacity={0.2} />;
}

export const color: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: colorDataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
