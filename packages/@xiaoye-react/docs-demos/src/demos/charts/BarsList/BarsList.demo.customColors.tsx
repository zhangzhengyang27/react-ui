import { BarsList } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';

const data = [
  { name: 'React', value: 850000, color: 'blue.6' },
  { name: 'Vue', value: 620000, color: 'green.6' },
  { name: 'Angular', value: 540000, color: 'yellow.6' },
  { name: 'Svelte', value: 380000, color: 'red.6' },
  { name: 'Next.js', value: 920000, color: 'teal.6' },
  { name: 'Nuxt', value: 410000, color: 'gray.8' },
  { name: 'Remix', value: 295000, color: 'orange.6' },
];

const dataCode = `export const data = ${JSON.stringify(data, null, 2)};`;

const code = `
import { BarsList } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <BarsList
      data={data}
      barsLabel="Traffic Source"
      valueLabel="Visits"
      variant="filled"
      valueFormatter={(value) => value.toLocaleString('en-US')}
    />
  );
}
`;

function Demo() {
  return (
    <BarsList
      data={data}
      barsLabel="Traffic Source"
      valueLabel="Visits"
      variant="filled"
      valueFormatter={(value) => value.toLocaleString('en-US')}
    />
  );
}

export const customColors: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
