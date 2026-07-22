import { BarChart } from '@xiaoye-react/charts';
import { useMediaQuery } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';
import { overlayData, overlayDataCode } from './_data';
import classes from './BarChart.demo.overlay.module.css';

const code = `
import { BarChart } from '@xiaoye-react/charts';
import classes from './Demo.module.css';
import { data } from './data';

function Demo() {
  const bigBarWidth = useMediaQuery('(min-width: 48em)') ? 42 : 26;
  const ratio = 0.5;
  const smallBarWidth = bigBarWidth * ratio;
  const barGap = (bigBarWidth + smallBarWidth) / -2;

  return (
    <BarChart
      h={300}
      data={overlayData}
      dataKey="index"
      barChartProps={{ barGap }}
      barProps={(data) => ({ barSize: data.name === 'you' ? bigBarWidth : smallBarWidth })}
      classNames={classes}
      series={[
        { name: 'you', color: 'var(--you-bar-color)' },
        { name: 'average', color: 'var(--average-bar-color)' },
      ]}
    />
  );
}
`;

const cssCode = `.root {
  [data-ui-color-scheme='light'] & {
    --average-bar-color: var(--ui-color-dark-8);
    --you-bar-color: var(--ui-color-blue-3);
  }

  [data-ui-color-scheme='dark'] & {
    --you-bar-color: var(--ui-color-blue-8);
    --average-bar-color: var(--ui-color-gray-4);
  }
}

.bar {
  transform: translateX(-1.5px);
}
`;

function Demo() {
  const bigBarWidth = useMediaQuery('(min-width: 48em)') ? 42 : 26;
  const ratio = 0.5;
  const smallBarWidth = bigBarWidth * ratio;
  const barGap = (bigBarWidth + smallBarWidth) / -2;

  return (
    <BarChart
      h={300}
      data={overlayData}
      dataKey="index"
      barChartProps={{ barGap }}
      barProps={(data) => ({ barSize: data.name === 'you' ? bigBarWidth : smallBarWidth })}
      classNames={classes}
      series={[
        { name: 'you', color: 'var(--you-bar-color)' },
        { name: 'average', color: 'var(--average-bar-color)' },
      ]}
    />
  );
}

export const overlay: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: cssCode, language: 'scss', fileName: '演示样式.module.css' },
    { code: overlayDataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
