import { SankeyChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = `
import { SankeyChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <SankeyChart
      data={data}
      colors={['indigo.6', 'cyan.6', 'teal.6', 'orange.6', 'red.6']}
    />
  );
}
`;

function Demo() {
  return <SankeyChart data={data} colors={['indigo.6', 'cyan.6', 'teal.6', 'orange.6', 'red.6']} />;
}

export const colors: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
