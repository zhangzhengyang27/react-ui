import dayjs from 'dayjs';
import { render, screen, tests } from '@xiaoye-react/tests';
import { datesTests } from '@xiaoye-react/tests/dates';
import { YearLevel, YearLevelProps, YearLevelStylesNames } from './YearLevel';

const defaultProps: YearLevelProps = {
  year: '2022-04-11',
  levelControlAriaLabel: 'level-control',
  nextLabel: 'next',
  previousLabel: 'prev',
};

function expectLabel(label: string) {
  expect(screen.getByLabelText('level-control')).toHaveTextContent(label);
}

describe('@xiaoye-react/dates/YearLevel', () => {
  tests.itSupportsSystemProps<YearLevelProps, YearLevelStylesNames>({
    component: YearLevel,
    props: defaultProps,
    displayName: '@xiaoye-react/ui/YearLevel',
    stylesApiSelectors: [
      'calendarHeader',
      'calendarHeaderControl',
      'calendarHeaderControlIcon',
      'calendarHeaderLevel',
      'calendarHeaderLevel',
      'monthsList',
      'monthsListCell',
      'monthsListControl',
      'monthsListRow',
    ],
    compound: true,
    providerStylesApi: false,
  });

  datesTests.itSupportsHeaderProps({ component: YearLevel, props: defaultProps });
  datesTests.itSupportsWithNextPrevious({ component: YearLevel, props: defaultProps });
  datesTests.itSupportsMonthsListProps({ component: YearLevel, props: defaultProps });
  datesTests.itSupportsOnControlKeydown({ component: YearLevel, props: defaultProps });
  datesTests.itSupportsOnControlClick({ component: YearLevel, props: defaultProps });
  datesTests.itSupportsOnControlMouseEnter({ component: YearLevel, props: defaultProps });

  it('renders correct CalendarHeader label', () => {
    render(<YearLevel {...defaultProps} />);
    expectLabel('2022');
  });

  it('supports changing year label format', () => {
    render(<YearLevel {...defaultProps} yearLabelFormat="MM/YY" />);
    expectLabel('04/22');
  });

  it('supports changing year label with callback', () => {
    render(
      <YearLevel {...defaultProps} yearLabelFormat={(date) => `${dayjs(date).format('MM/YYYY')}`} />
    );

    expectLabel('04/2022');
  });

  it('has correct default __staticSelector', () => {
    const { container } = render(<YearLevel {...defaultProps} />);
    expect(container.querySelector('table td button')).toHaveClass(
      'ui-YearLevel-monthsListControl'
    );
    expect(screen.getByLabelText('level-control')).toHaveClass(
      'ui-YearLevel-calendarHeaderLevel'
    );
  });

  it('supports custom __staticSelector', () => {
    const { container } = render(<YearLevel {...defaultProps} __staticSelector="Calendar" />);
    expect(container.querySelector('table td button')).toHaveClass(
      'ui-Calendar-monthsListControl'
    );
    expect(screen.getByLabelText('level-control')).toHaveClass(
      'ui-Calendar-calendarHeaderLevel'
    );
  });

  it('disables next control if maxDate is before end of month', () => {
    render(<YearLevel {...defaultProps} maxDate="2022-04-11" />);
    expect(screen.getByLabelText('next')).toBeDisabled();
  });

  it('disables previous control if minDate is after start of month', () => {
    render(<YearLevel {...defaultProps} minDate="2022-04-11" />);
    expect(screen.getByLabelText('prev')).toBeDisabled();
  });
});
