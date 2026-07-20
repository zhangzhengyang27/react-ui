import { BarsList } from '@react-ui/charts';
import { Tooltip } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { data, dataCode } from './_data';

const code = `
import { BarsList } from '@react-ui/charts';
import { Tooltip } from '@react-ui/ui';
import { data } from './data';

function Demo() {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <BarsList
      data={data}
      barsLabel="Traffic Source"
      valueLabel="Visits"
      renderBar={(barData, defaultBar) => {
        const percentage = ((barData.value / maxValue) * 100).toFixed(1);

        return (
          <Tooltip
            label={\`\${barData.name}: \${percentage}% of total traffic\`}
            position="top"
            withArrow
          >
            {defaultBar}
          </Tooltip>
        );
      }}
    />
  );
}
`;

function Demo() {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <BarsList
      data={data}
      barsLabel="Traffic Source"
      valueLabel="Visits"
      renderBar={(barData, defaultBar) => {
        const percentage = ((barData.value / maxValue) * 100).toFixed(1);

        return (
          <Tooltip label={`${barData.name}: ${percentage}% of total traffic`} position="top-start">
            {defaultBar}
          </Tooltip>
        );
      }}
    />
  );
}

export const renderBar: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
