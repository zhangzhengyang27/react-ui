import { BarsList } from '@react-ui/charts';
import { UIDemo } from '@react-ui/demo';
import { data, dataCode } from './_data';

const code = `
import { BarsList } from '@react-ui/charts';
import { data } from './data';

function Demo() {
  return (
    <BarsList
      data={data}
      barColor="yellow.4"
      barTextColor="dark.9"
      valueFormatter={(value) => value.toLocaleString('en-US')}
    />
  );
}
`;

function Demo() {
  return (
    <BarsList
      data={data}
      barColor="yellow.4"
      barTextColor="dark.9"
      valueFormatter={(value) => value.toLocaleString('en-US')}
    />
  );
}

export const barTextColor: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
