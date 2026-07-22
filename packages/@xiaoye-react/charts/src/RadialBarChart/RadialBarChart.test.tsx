import { autoPatchWarn, tests } from '@xiaoye-react/tests';
import { RadialBarChart, RadialBarChartProps, RadialBarChartStylesNames } from './RadialBarChart';

const defaultProps: RadialBarChartProps = {
  data: [],
  dataKey: 'value',
};

describe('@xiaoye-react/ui/RadialBarChart', () => {
  autoPatchWarn();

  tests.itSupportsSystemProps<RadialBarChartProps, RadialBarChartStylesNames>({
    component: RadialBarChart,
    props: defaultProps,
    varsResolver: true,
    displayName: '@xiaoye-react/ui/RadialBarChart',
    stylesApiSelectors: ['root'],
  });
});
