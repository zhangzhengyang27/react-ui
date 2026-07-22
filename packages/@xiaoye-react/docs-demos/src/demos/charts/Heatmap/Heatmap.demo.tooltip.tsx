import dayjs from 'dayjs';
import { Heatmap } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = `
import dayjs from 'dayjs';
import { Heatmap } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <Heatmap
      data={data}
      startDate="2024-02-16"
      endDate="2025-02-16"
      withTooltip
      withWeekdayLabels
      withMonthLabels
      getTooltipLabel={({ date, value }) =>
        \`\${dayjs(date).format('DD MMM, YYYY')} – \${value === null || value === 0 ? '无贡献' : \`\${value} contribution\${value > 1 ? 's' : ''}\`}\`
      }
    />
  );
}
`;

function Demo() {
  return (
    <Heatmap
      data={data}
      startDate="2024-02-16"
      endDate="2025-02-16"
      withTooltip
      withWeekdayLabels
      withMonthLabels
      getTooltipLabel={({ date, value }) =>
        `${dayjs(date).format('DD MMM, YYYY')} – ${value === null || value === 0 ? '无贡献' : `${value} contribution${value > 1 ? 's' : ''}`}`
      }
    />
  );
}

export const tooltip: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  overflow: 'hidden',
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
