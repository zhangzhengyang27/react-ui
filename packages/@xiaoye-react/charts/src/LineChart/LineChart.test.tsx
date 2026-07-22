import { autoPatchWarn, tests } from '@xiaoye-react/tests';
import { LineChart, LineChartProps, LineChartStylesNames } from './LineChart';

const defaultProps: LineChartProps = {
  data: [
    { date: 'Mar 22', test: 110 },
    { date: 'Mar 23', test: 60 },
  ],
  series: [{ name: 'test', color: 'blue' }],
  dataKey: 'date',
  style: { width: 200, height: 200 },
};

describe('@xiaoye-react/charts/LineChart', () => {
  autoPatchWarn();

  tests.itSupportsSystemProps<LineChartProps, LineChartStylesNames>({
    component: LineChart,
    props: defaultProps,
    varsResolver: true,
    displayName: '@xiaoye-react/charts/LineChart',
    stylesApiSelectors: ['root'],
  });
});
