import { autoPatchWarn, tests } from '@xiaoye-react/tests';
import { PieChart, PieChartProps, PieChartStylesNames } from './PieChart';

const defaultProps: PieChartProps = {
  data: [],
};

describe('@xiaoye-react/charts/PieChart', () => {
  autoPatchWarn();

  tests.itSupportsSystemProps<PieChartProps, PieChartStylesNames>({
    component: PieChart,
    props: defaultProps,
    varsResolver: true,
    displayName: '@xiaoye-react/charts/PieChart',
    stylesApiSelectors: ['root'],
  });
});
