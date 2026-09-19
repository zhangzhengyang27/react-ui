import { render, screen, tests } from '@xiaoye-react/tests';
import { datesTests } from '@xiaoye-react/tests/dates';
import { YearsList, YearsListProps, YearsListStylesNames } from './YearsList';

const defaultProps: YearsListProps = {
  decade: '2022-04-11',
};

describe('@xiaoye-react/dates/YearsList', () => {
  tests.itSupportsSystemProps<YearsListProps, YearsListStylesNames>({
    component: YearsList,
    props: defaultProps,
    displayName: '@xiaoye-react/ui/YearsList',
    stylesApiSelectors: ['yearsList', 'yearsListCell', 'yearsListControl', 'yearsListRow'],
  });

  datesTests.itSupportsYearsListProps({ component: YearsList, props: defaultProps });
  datesTests.itSupportsOnControlKeydown({ component: YearsList, props: defaultProps });
  datesTests.itSupportsOnControlClick({ component: YearsList, props: defaultProps });
  datesTests.itSupportsOnControlMouseEnter({ component: YearsList, props: defaultProps });

  it('has correct default __staticSelector', () => {
    render(<YearsList {...defaultProps} />);
    expect(screen.getByRole('table')).toHaveClass('ui-YearsList-yearsList');
    expect(screen.getAllByRole('button')[0]).toHaveClass('ui-YearsList-yearsListControl');
  });

  it('supports custom __staticSelector', () => {
    render(<YearsList {...defaultProps} __staticSelector="Calendar" />);
    expect(screen.getByRole('table')).toHaveClass('ui-Calendar-yearsList');
    expect(screen.getAllByRole('button')[0]).toHaveClass('ui-Calendar-yearsListControl');
  });
});
