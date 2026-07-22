import { autoPatchWarn, tests } from '@xiaoye-react/tests';
import { FunnelChart, FunnelChartProps, FunnelChartStylesNames } from './FunnelChart';

const data = [
  { name: 'Visits', value: 5000, color: 'indigo.6' },
  { name: 'Cart', value: 2000, color: 'yellow.6' },
  { name: 'Checkout', value: 1000, color: 'teal.6' },
  { name: 'Purchase', value: 500, color: 'pink.6' },
];

const defaultProps: FunnelChartProps = {
  data,
};

describe('@xiaoye-react/charts/FunnelChart', () => {
  autoPatchWarn();

  tests.itSupportsSystemProps<FunnelChartProps, FunnelChartStylesNames>({
    component: FunnelChart,
    props: defaultProps,
    varsResolver: true,
    displayName: '@xiaoye-react/charts/FunnelChart',
    stylesApiSelectors: ['root'],
  });
});
