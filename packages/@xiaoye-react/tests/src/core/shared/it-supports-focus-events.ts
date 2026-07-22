import { jsx } from 'react/jsx-runtime';
import { fireEvent } from '@testing-library/react';
import { render } from '../render';

function itSupportsFocusEvents(options, name = "supports focus events") {
  it(name, () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const { container } = render(
      /* @__PURE__ */ jsx(options.component, { ...options.props, onFocus, onBlur })
    );
    fireEvent.focus(container.querySelector(options.selector || "*:not(style)"));
    expect(onFocus).toHaveBeenCalled();
    fireEvent.blur(container.querySelector(options.selector || "*:not(style)"));
    expect(onBlur).toHaveBeenCalled();
  });
}

export { itSupportsFocusEvents };
