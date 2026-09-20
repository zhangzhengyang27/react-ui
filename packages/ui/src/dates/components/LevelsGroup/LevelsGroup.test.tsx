import { tests } from '@xiaoye-react/tests';
import { LevelsGroup, LevelsGroupProps, LevelsGroupStylesNames } from './LevelsGroup';

const defaultProps: LevelsGroupProps = {};

describe('@xiaoye-react/ui/LevelsGroup', () => {
  tests.itSupportsSystemProps<LevelsGroupProps, LevelsGroupStylesNames>({
    component: LevelsGroup,
    props: defaultProps,
    children: true,
    displayName: '@xiaoye-react/ui/LevelsGroup',
    stylesApiSelectors: ['levelsGroup'],
  });
});
