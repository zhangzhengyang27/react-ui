import { autoPatchWarn, tests } from '@xiaoye-react/tests';
import { Sparkline, SparklineProps, SparklineStylesNames } from './Sparkline';

const defaultProps: SparklineProps = {
  data: [0, 1],
};

describe('@xiaoye-react/ui/Sparkline', () => {
  autoPatchWarn();

  tests.itSupportsSystemProps<SparklineProps, SparklineStylesNames>({
    component: Sparkline,
    props: defaultProps,
    varsResolver: true,
    displayName: '@xiaoye-react/charts/Sparkline',
    stylesApiSelectors: ['root'],
  });
});
