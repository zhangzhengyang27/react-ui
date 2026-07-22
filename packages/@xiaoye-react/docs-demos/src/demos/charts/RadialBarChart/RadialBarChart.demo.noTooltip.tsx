import { RadialBarChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = `
import { RadialBarChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return <RadialBarChart data={data} dataKey="value" h={220} withTooltip={false} />;
}
`;

function Demo() {
  return <RadialBarChart data={data} dataKey="value" h={220} withTooltip={false} />;
}

export const noTooltip: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
