import { Treemap } from '@react-ui/charts';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Treemap } from '@react-ui/charts';

const data = [
  { name: '美国', value: 400, color: 'indigo.0' },
  { name: 'India', value: 300, color: 'yellow.1' },
  { name: 'Japan', value: 100, color: 'teal.1' },
  { name: '其他', value: 200, color: 'gray.2' },
];

function Demo() {
  return <Treemap data={data} autoContrast />;
}
`;

const data = [
  { name: '美国', value: 400, color: 'indigo.0' },
  { name: 'India', value: 300, color: 'yellow.1' },
  { name: 'Japan', value: 100, color: 'teal.1' },
  { name: '其他', value: 200, color: 'gray.2' },
];

function Demo() {
  return <Treemap data={data} autoContrast />;
}

export const autoContrast: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
