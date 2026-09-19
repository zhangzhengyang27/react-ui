import { render, tests } from '@xiaoye-react/tests';
import { datesTests } from '@xiaoye-react/tests/dates';
import { Month, MonthProps, MonthStylesNames } from './Month';

const defaultProps: MonthProps = {
  month: '2022-04-02',
};

describe('@xiaoye-react/dates/Month', () => {
  tests.itSupportsSystemProps<MonthProps, MonthStylesNames>({
    component: Month,
    props: defaultProps,
    varsResolver: true,
    displayName: '@xiaoye-react/ui/Month',
    stylesApiSelectors: ['month'],
  });

  datesTests.itSupportsOnDayClick({ component: Month, props: defaultProps });
  datesTests.itSupportsOnDayKeydown({ component: Month, props: defaultProps });

  it('supports __staticSelector', () => {
    const { container } = render(<Month {...defaultProps} __staticSelector="Calendar" />);
    expect(container.querySelector('table')).toHaveClass('ui-Calendar-month');
    expect(container.querySelector('thead tr')).toHaveClass('ui-Calendar-weekdaysRow');
    expect(container.querySelector('tbody tr td button')).toHaveClass('ui-Calendar-day');
  });

  it('supports static prop', () => {
    const { container, rerender } = render(<Month {...defaultProps} />);
    expect((container.querySelector('td')!.firstChild as HTMLElement).tagName).toBe('BUTTON');

    rerender(<Month {...defaultProps} static />);
    expect((container.querySelector('td')!.firstChild as HTMLElement).tagName).toBe('DIV');
  });
});
