import { BarsList } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = `
import { BarsList } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <BarsList
      data={data}
      barHeight={48}
      valueFormatter={(value) => value.toLocaleString('en-US')}
    />
  );
}
`;

function Demo() {
  return (
    <BarsList
      data={data}
      barHeight={48}
      valueFormatter={(value) => value.toLocaleString('en-US')}
    />
  );
}

export const barHeight: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
