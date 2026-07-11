import { autoPatchWarn, tests } from '@mantine-tests/core';
import { ScatterChart, ScatterChartProps, ScatterChartStylesNames } from './ScatterChart';

const defaultProps: ScatterChartProps = {
  data: [],
  dataKey: { x: 'x', y: 'y' },
};

describe('@react-ui/charts/ScatterChart', () => {
  autoPatchWarn();

  tests.itSupportsSystemProps<ScatterChartProps, ScatterChartStylesNames>({
    component: ScatterChart,
    props: defaultProps,
    varsResolver: true,
    displayName: '@react-ui/charts/ScatterChart',
    stylesApiSelectors: ['root'],
  });
});
