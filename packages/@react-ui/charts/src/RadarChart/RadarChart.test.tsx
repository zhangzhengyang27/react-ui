import { autoPatchWarn, tests } from '@react-ui/tests';
import { RadarChart, RadarChartProps, RadarChartStylesNames } from './RadarChart';

const defaultProps: RadarChartProps = {
  data: [],
  series: [],
  dataKey: 'test',
};

describe('@react-ui/charts/RadarChart', () => {
  autoPatchWarn();

  tests.itSupportsSystemProps<RadarChartProps, RadarChartStylesNames>({
    component: RadarChart,
    props: defaultProps,
    varsResolver: true,
    displayName: '@react-ui/charts/RadarChart',
    stylesApiSelectors: ['root'],
  });
});
