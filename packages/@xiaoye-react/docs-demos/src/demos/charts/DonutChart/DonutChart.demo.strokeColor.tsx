import { DonutChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';
import classes from './DonutChart.demo.strokeColor.module.css';

const cssCode = `
.root {
  --card-bg: light-dark(var(--ui-color-gray-1), var(--ui-color-dark-5));

  background-color: var(--card-bg);
  padding: var(--ui-spacing-md);
  border-radius: var(--ui-radius-md);
}
`;

const code = `
import { DonutChart } from '@xiaoye-react/charts';
import { data } from './data';
import classes from './Demo.module.css';

function Demo() {
  return (
    <div className={classes.root}>
      <DonutChart data={data} strokeColor="var(--card-bg)" />
    </div>
  );
}

`;

function Demo() {
  return (
    <div className={classes.root}>
      <DonutChart data={data} strokeColor="var(--card-bg)" />
    </div>
  );
}

export const strokeColor: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: cssCode, language: 'scss', fileName: '演示样式.module.css' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
  centered: true,
};
