import { render, screen, tests } from '@xiaoye-react/tests';
import { datesTests } from '@xiaoye-react/tests/dates';
import { MonthsList, MonthsListProps, MonthsListStylesNames } from './MonthsList';

const defaultProps: MonthsListProps = {
  year: '2022-04-11',
};

describe('@xiaoye-react/dates/MonthsList', () => {
  tests.itSupportsSystemProps<MonthsListProps, MonthsListStylesNames>({
    component: MonthsList,
    props: defaultProps,
    displayName: '@xiaoye-react/ui/MonthsList',
    stylesApiSelectors: ['monthsList', 'monthsListCell', 'monthsListControl', 'monthsListRow'],
  });

  datesTests.itSupportsMonthsListProps({ component: MonthsList, props: defaultProps });
  datesTests.itSupportsOnControlKeydown({ component: MonthsList, props: defaultProps });
  datesTests.itSupportsOnControlClick({ component: MonthsList, props: defaultProps });
  datesTests.itSupportsOnControlMouseEnter({ component: MonthsList, props: defaultProps });

  it('has correct default __staticSelector', () => {
    render(<MonthsList {...defaultProps} />);
    expect(screen.getByRole('table')).toHaveClass('ui-MonthsList-monthsList');
    expect(screen.getAllByRole('button')[0]).toHaveClass('ui-MonthsList-monthsListControl');
  });

  it('supports custom __staticSelector', () => {
    render(<MonthsList {...defaultProps} __staticSelector="Calendar" />);
    expect(screen.getByRole('table')).toHaveClass('ui-Calendar-monthsList');
    expect(screen.getAllByRole('button')[0]).toHaveClass('ui-Calendar-monthsListControl');
  });
});
