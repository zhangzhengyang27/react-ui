import { autoPatchWarn, tests } from '@mantine-tests/core';
import { Sparkline, SparklineProps, SparklineStylesNames } from './Sparkline';

const defaultProps: SparklineProps = {
  data: [0, 1],
};

describe('@react-ui/ui/Sparkline', () => {
  autoPatchWarn();

  tests.itSupportsSystemProps<SparklineProps, SparklineStylesNames>({
    component: Sparkline,
    props: defaultProps,
    varsResolver: true,
    displayName: '@react-ui/charts/Sparkline',
    stylesApiSelectors: ['root'],
  });
});
