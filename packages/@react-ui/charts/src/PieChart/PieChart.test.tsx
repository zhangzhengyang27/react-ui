import { autoPatchWarn, tests } from '@mantine-tests/core';
import { PieChart, PieChartProps, PieChartStylesNames } from './PieChart';

const defaultProps: PieChartProps = {
  data: [],
};

describe('@react-ui/charts/PieChart', () => {
  autoPatchWarn();

  tests.itSupportsSystemProps<PieChartProps, PieChartStylesNames>({
    component: PieChart,
    props: defaultProps,
    varsResolver: true,
    displayName: '@react-ui/charts/PieChart',
    stylesApiSelectors: ['root'],
  });
});
