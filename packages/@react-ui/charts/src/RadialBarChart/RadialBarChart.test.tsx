import { autoPatchWarn, tests } from '@mantine-tests/core';
import { RadialBarChart, RadialBarChartProps, RadialBarChartStylesNames } from './RadialBarChart';

const defaultProps: RadialBarChartProps = {
  data: [],
  dataKey: 'value',
};

describe('@react-ui/ui/RadialBarChart', () => {
  autoPatchWarn();

  tests.itSupportsSystemProps<RadialBarChartProps, RadialBarChartStylesNames>({
    component: RadialBarChart,
    props: defaultProps,
    varsResolver: true,
    displayName: '@react-ui/ui/RadialBarChart',
    stylesApiSelectors: ['root'],
  });
});
