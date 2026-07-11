import { tests } from '@mantine-tests/core';
import { LevelsGroup, LevelsGroupProps, LevelsGroupStylesNames } from './LevelsGroup';

const defaultProps: LevelsGroupProps = {};

describe('@react-ui/dates/LevelsGroup', () => {
  tests.itSupportsSystemProps<LevelsGroupProps, LevelsGroupStylesNames>({
    component: LevelsGroup,
    props: defaultProps,
    children: true,
    displayName: '@react-ui/dates/LevelsGroup',
    stylesApiSelectors: ['levelsGroup'],
  });
});
