import { ScatterChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { spendingsData, spendingsDataCode } from './_data';

const code = `
import { ScatterChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <ScatterChart
      h={350}
      data={data}
      dataKey={{ x: 'age', y: 'average_monthly_spending' }}
      yAxisProps={{ domain: [800, 3400] }}
      valueFormatter={{
        x: (value) => \`\${value} years\`,
        y: (value) => \`$\${new Intl.NumberFormat('en-US').format(value)}\`,
      }}
    />
  );
}
`;

function Demo() {
  return (
    <ScatterChart
      h={350}
      data={spendingsData}
      dataKey={{ x: 'age', y: 'average_monthly_spending' }}
      yAxisProps={{ domain: [800, 3400] }}
      valueFormatter={{
        x: (value) => `${value} years`,
        y: (value) => `$${new Intl.NumberFormat('en-US').format(value)}`,
      }}
    />
  );
}

export const valueFormatter: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: spendingsDataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
