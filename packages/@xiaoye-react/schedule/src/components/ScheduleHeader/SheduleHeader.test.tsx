import { render, tests } from '@xiaoye-react/tests';
import { ScheduleHeader, ScheduleHeaderProps, ScheduleHeaderStylesNames } from './ScheduleHeader';

const defaultProps: ScheduleHeaderProps = {};

describe('@xiaoye-react/schedule/ScheduleHeader', () => {
  tests.itSupportsSystemProps<ScheduleHeaderProps, ScheduleHeaderStylesNames>({
    component: ScheduleHeader,
    props: defaultProps,
    varsResolver: true,
    polymorphic: true,
    children: true,
    displayName: '@xiaoye-react/schedule/ScheduleHeader',
    stylesApiSelectors: ['header'],
  });

  it('supports __staticSelector prop', () => {
    const { container } = render(<ScheduleHeader __staticSelector="Test" className="test-class" />);
    expect(container.querySelector('.ui-Test-header')).toHaveClass('test-class');
  });
});
