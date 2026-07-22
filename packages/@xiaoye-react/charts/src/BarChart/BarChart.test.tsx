import { autoPatchWarn, tests } from '@xiaoye-react/tests';
import { BarChart, BarChartProps, BarChartStylesNames } from './BarChart';

const defaultProps: BarChartProps = {
  data: [
    { date: 'Mar 22', test: 110 },
    { date: 'Mar 23', test: 60 },
  ],
  series: [{ name: 'test', color: 'blue' }],
  dataKey: 'date',
  style: { width: 200, height: 200 },
};

describe('@xiaoye-react/charts/BarChart', () => {
  autoPatchWarn();

  tests.itSupportsSystemProps<BarChartProps, BarChartStylesNames>({
    component: BarChart,
    props: defaultProps,
    varsResolver: true,
    displayName: '@xiaoye-react/charts/BarChart',
    stylesApiSelectors: ['root'],
  });
});
