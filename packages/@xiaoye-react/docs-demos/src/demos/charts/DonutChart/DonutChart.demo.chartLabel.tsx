import { DonutChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = `
import { DonutChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return <DonutChart data={data} chartLabel="按国家统计的用户" />;
}
`;

function Demo() {
  return <DonutChart data={data} chartLabel="按国家统计的用户" />;
}

export const chartLabel: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
  centered: true,
};
