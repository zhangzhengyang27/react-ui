import { BarsList } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';

const data = [
  { name: 'Yellow', value: 1200000, color: 'yellow.4' },
  { name: 'Cyan', value: 800000, color: 'cyan.2' },
  { name: 'Lime', value: 600000, color: 'lime.3' },
  { name: 'Dark Blue', value: 400000, color: 'blue.9' },
  { name: 'Dark Red', value: 200000, color: 'red.9' },
];

const dataCode = `export const data = ${JSON.stringify(data, null, 2)};`;

const code = `
import { BarsList } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <BarsList
      data={data}
      variant="filled"
      autoContrast
      valueFormatter={(value) => value.toLocaleString('en-US')}
    />
  );
}
`;

function Demo() {
  return (
    <BarsList
      data={data}
      variant="filled"
      autoContrast
      valueFormatter={(value) => value.toLocaleString('en-US')}
    />
  );
}

export const autoContrast: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
