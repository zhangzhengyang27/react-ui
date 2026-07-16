import { SankeyChart } from '@react-ui/charts';
import { UIDemo } from '@react-ui/demo';
import { data, dataCode } from './_data';

const code = `
import { SankeyChart } from '@react-ui/charts';
import { data } from './data';

function Demo() {
  return <SankeyChart data={data} withTooltip={false} />;
}
`;

function Demo() {
  return <SankeyChart data={data} withTooltip={false} />;
}

export const noTooltip: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
