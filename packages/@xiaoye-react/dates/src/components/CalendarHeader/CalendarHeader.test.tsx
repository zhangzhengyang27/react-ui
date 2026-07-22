import { render, screen, tests } from '@xiaoye-react/tests';
import { datesTests } from '@xiaoye-react/tests/dates';
import { CalendarHeader, CalendarHeaderProps, CalendarHeaderStylesNames } from './CalendarHeader';

const defaultProps: CalendarHeaderProps = {
  nextLabel: 'next',
  previousLabel: 'prev',
  label: '',
};

describe('@xiaoye-react/dates/CalendarHeader', () => {
  tests.itSupportsSystemProps<CalendarHeaderProps, CalendarHeaderStylesNames>({
    component: CalendarHeader,
    props: defaultProps,
    varsResolver: true,
    displayName: '@xiaoye-react/dates/CalendarHeader',
    stylesApiSelectors: [
      'calendarHeader',
      'calendarHeaderControl',
      'calendarHeaderControlIcon',
      'calendarHeaderLevel',
    ],
  });

  datesTests.itSupportsHeaderProps({ component: CalendarHeader, props: defaultProps });
  datesTests.itSupportsWithNextPrevious({ component: CalendarHeader, props: defaultProps });

  it('renders given label', () => {
    render(<CalendarHeader {...defaultProps} label="test-label" />);
    expect(screen.getByText('test-label')).toBeInTheDocument();
  });

  it('supports levelControlAriaLabel', () => {
    render(
      <CalendarHeader {...defaultProps} label="test-label" levelControlAriaLabel="Change month" />
    );

    expect(screen.getByText('test-label')).toHaveAttribute('aria-label', 'Change month');
  });

  it('has correct default __staticSelector', () => {
    render(<CalendarHeader {...defaultProps} />);
    expect(screen.getByLabelText('next')).toHaveClass(
      'ui-CalendarHeader-calendarHeaderControl'
    );
  });

  it('supports custom __staticSelector', () => {
    render(<CalendarHeader {...defaultProps} __staticSelector="Calendar" />);
    expect(screen.getByLabelText('next')).toHaveClass('ui-Calendar-calendarHeaderControl');
  });
});
