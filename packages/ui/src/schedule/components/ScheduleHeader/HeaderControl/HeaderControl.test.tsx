import { render, tests } from '@xiaoye-react/tests';
import { HeaderControl, HeaderControlProps, HeaderControlStylesNames } from './HeaderControl';

const defaultProps: HeaderControlProps = {};

describe('@xiaoye-react/schedule/HeaderControl', () => {
  tests.itSupportsSystemProps<HeaderControlProps, HeaderControlStylesNames>({
    component: HeaderControl,
    props: defaultProps,
    varsResolver: true,
    children: true,
    displayName: '@xiaoye-react/ui/HeaderControl',
    stylesApiSelectors: ['headerControl'],
  });

  it('assigns data-active attribute based on active prop', () => {
    const { container, rerender } = render(<HeaderControl active />);
    expect(container.querySelector('.ui-HeaderControl-headerControl')).toHaveAttribute(
      'data-active'
    );

    rerender(<HeaderControl active={false} />);
    expect(container.querySelector('.ui-HeaderControl-headerControl')).not.toHaveAttribute(
      'data-active'
    );
  });

  it('assigns data-square attribute based on square prop', () => {
    const { container, rerender } = render(<HeaderControl square />);
    expect(container.querySelector('.ui-HeaderControl-headerControl')).toHaveAttribute(
      'data-square'
    );

    rerender(<HeaderControl square={false} />);
    expect(container.querySelector('.ui-HeaderControl-headerControl')).not.toHaveAttribute(
      'data-square'
    );
  });

  it('supports __staticSelector prop', () => {
    const { container } = render(<HeaderControl {...defaultProps} __staticSelector="Test" />);
    expect(container.querySelector('.ui-Test-headerControl')).toBeInTheDocument();
  });
});
