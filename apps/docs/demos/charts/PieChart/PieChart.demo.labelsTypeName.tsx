import { PieChart } from '@react-ui/charts';
import { UIDemo } from '@react-ui/demo';
import { data, dataCode } from './_data';

const code = `
import { PieChart } from '@react-ui/charts';
import { data } from './data';

function Demo() {
  return <PieChart data={data} withLabelsLine labelsPosition="outside" labelsType="name" withLabels />;
}
`;

function Demo() {
  return (
    <PieChart data={data} withLabelsLine labelsPosition="outside" labelsType="name" withLabels />
  );
}

export const labelsTypeName: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
  centered: true,
};
