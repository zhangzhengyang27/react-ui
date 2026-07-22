import { autoPatchWarn, tests } from '@xiaoye-react/tests';
import { BubbleChart, BubbleChartProps, BubbleChartStylesNames } from './BubbleChart';

const defaultProps: BubbleChartProps = {
  data: [],
  dataKey: { x: 'x', y: 'y', z: 'z' },
  range: [0, 100],
};

describe('@xiaoye-react/charts/BubbleChart', () => {
  autoPatchWarn();

  tests.itSupportsSystemProps<BubbleChartProps, BubbleChartStylesNames>({
    component: BubbleChart,
    props: defaultProps,
    varsResolver: true,
    displayName: '@xiaoye-react/charts/BubbleChart',
    stylesApiSelectors: ['root'],
  });
});
