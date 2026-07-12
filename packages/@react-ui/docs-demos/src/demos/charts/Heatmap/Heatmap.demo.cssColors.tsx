import { Heatmap } from '@react-ui/charts';
import { MantineDemo } from '@react-ui/demo';
import { data, dataCode } from './_data';
import classes from './Heatmap.demo.cssColors.module.css';

const cssCode = `.root {
  @mixin light {
    --heatmap-level-1: var(--ui-color-blue-2);
    --heatmap-level-2: var(--ui-color-blue-4);
    --heatmap-level-3: var(--ui-color-blue-6);
    --heatmap-level-4: var(--ui-color-blue-9);
  }

  @mixin dark {
    --heatmap-level-1: alpha(var(--ui-color-orange-6), 0.35);
    --heatmap-level-2: alpha(var(--ui-color-orange-6), 0.65);
    --heatmap-level-3: var(--ui-color-orange-6);
    --heatmap-level-4: var(--ui-color-yellow-4);
  }
}`;

const code = `
import { Heatmap } from '@react-ui/charts';
import { data } from './data';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Heatmap
      data={data}
      startDate="2024-02-16"
      endDate="2025-02-16"
      classNames={classes}
    />
  );
}
`;

function Demo() {
  return <Heatmap classNames={classes} data={data} startDate="2024-02-16" endDate="2025-02-16" />;
}

export const cssColors: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  overflow: 'hidden',
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
