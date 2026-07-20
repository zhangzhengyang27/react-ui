import { DonutChart } from '@react-ui/charts';
import { UIDemo } from '@react-ui/demo';
import { data, dataCode } from './_data';

const code = `
import { DonutChart } from '@react-ui/charts';
import { data } from './data';

function Demo() {
  return <DonutChart data={data} withLegend />;
}
`;

function Demo() {
  return <DonutChart data={data} withLegend />;
}

export const legend: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
  centered: true,
};
