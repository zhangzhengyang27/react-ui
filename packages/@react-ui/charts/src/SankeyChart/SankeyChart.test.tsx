import { autoPatchWarn, tests } from '@react-ui/tests';
import { SankeyChart, SankeyChartProps, SankeyChartStylesNames } from './SankeyChart';

const data = {
  nodes: [
    { name: 'Visit' },
    { name: 'Direct-Favourite' },
    { name: 'Page-Click' },
    { name: 'Detail-Favourite' },
    { name: 'Lost' },
  ],
  links: [
    { source: 0, target: 1, value: 3728.3 },
    { source: 0, target: 2, value: 354170 },
    { source: 2, target: 3, value: 62429 },
    { source: 2, target: 4, value: 291741 },
  ],
};

const defaultProps: SankeyChartProps = {
  data,
};

describe('@react-ui/charts/SankeyChart', () => {
  autoPatchWarn();

  tests.itSupportsSystemProps<SankeyChartProps, SankeyChartStylesNames>({
    component: SankeyChart,
    props: defaultProps,
    varsResolver: true,
    displayName: '@react-ui/charts/SankeyChart',
    stylesApiSelectors: ['root'],
  });
});
