import { BarsList } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = `
import { BarsList } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return <BarsList data={data} />;
}
`;

function Demo() {
  return <BarsList data={data} />;
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
