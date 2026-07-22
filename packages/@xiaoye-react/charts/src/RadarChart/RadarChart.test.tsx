import { autoPatchWarn, tests } from '@xiaoye-react/tests';
import { RadarChart, RadarChartProps, RadarChartStylesNames } from './RadarChart';

const defaultProps: RadarChartProps = {
  data: [],
  series: [],
  dataKey: 'test',
};

describe('@xiaoye-react/charts/RadarChart', () => {
  autoPatchWarn();

  tests.itSupportsSystemProps<RadarChartProps, RadarChartStylesNames>({
    component: RadarChart,
    props: defaultProps,
    varsResolver: true,
    displayName: '@xiaoye-react/charts/RadarChart',
    stylesApiSelectors: ['root'],
  });
});
