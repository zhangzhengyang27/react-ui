import { autoPatchWarn, tests } from '@xiaoye-react/tests';
import { ScatterChart, ScatterChartProps, ScatterChartStylesNames } from './ScatterChart';

const defaultProps: ScatterChartProps = {
  data: [],
  dataKey: { x: 'x', y: 'y' },
};

describe('@xiaoye-react/charts/ScatterChart', () => {
  autoPatchWarn();

  tests.itSupportsSystemProps<ScatterChartProps, ScatterChartStylesNames>({
    component: ScatterChart,
    props: defaultProps,
    varsResolver: true,
    displayName: '@xiaoye-react/charts/ScatterChart',
    stylesApiSelectors: ['root'],
  });
});
