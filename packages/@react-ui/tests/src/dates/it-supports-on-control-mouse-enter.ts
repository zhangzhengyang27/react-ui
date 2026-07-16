import { jsx } from 'react/jsx-runtime';
import userEvent from '@testing-library/user-event';
import { render } from '../core';

function itSupportsOnControlMouseEnter(options, name = "supports __onControlMouseEnter") {
  it(name, async () => {
    const spy = jest.fn();
    const { container } = render(
      /* @__PURE__ */ jsx(
        options.component,
        {
          ...options.props,
          __onControlMouseEnter: (_event, date) => {
            spy(date);
          }
        }
      )
    );
    await userEvent.hover(container.querySelector("table button"));
    expect(spy).toHaveBeenCalledWith(expect.any(String));
  });
}

export { itSupportsOnControlMouseEnter };
