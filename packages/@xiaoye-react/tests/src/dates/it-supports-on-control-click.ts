import { jsx } from 'react/jsx-runtime';
import userEvent from '@testing-library/user-event';
import { render } from '../core';

function itSupportsOnControlClick(options, name = "supports __onControlClick") {
  it(name, async () => {
    const spy = jest.fn();
    const { container } = render(
      /* @__PURE__ */ jsx(
        options.component,
        {
          ...options.props,
          __onControlClick: (_event, date) => {
            spy(date);
          }
        }
      )
    );
    await userEvent.click(container.querySelector("table button"));
    expect(spy).toHaveBeenCalledWith(expect.any(String));
  });
}

export { itSupportsOnControlClick };
