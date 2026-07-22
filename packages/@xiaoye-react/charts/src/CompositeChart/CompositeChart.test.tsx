import { autoPatchWarn, tests } from '@xiaoye-react/tests';
import { CompositeChart, CompositeChartProps, CompositeChartStylesNames } from './CompositeChart';

const defaultProps: CompositeChartProps = {
  data: [
    { date: 'Mar 22', test: 110 },
    { date: 'Mar 23', test: 60 },
  ],
  series: [{ name: 'test', color: 'blue', type: 'line' }],
  dataKey: 'date',
  style: { width: 200, height: 200 },
};

describe('@xiaoye-react/charts/CompositeChart', () => {
  autoPatchWarn();

  tests.itSupportsSystemProps<CompositeChartProps, CompositeChartStylesNames>({
    component: CompositeChart,
    props: defaultProps,
    varsResolver: true,
    displayName: '@xiaoye-react/charts/CompositeChart',
    stylesApiSelectors: ['root'],
  });
});
