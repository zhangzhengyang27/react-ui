import { jsx } from 'react/jsx-runtime';
import userEvent from '@testing-library/user-event';
import { render } from '../core';

function itSupportsOnControlKeydown(options, name = "supports __onControlKeyDown") {
  it(name, async () => {
    const spy = jest.fn();
    const { container } = render(
      /* @__PURE__ */ jsx(
        options.component,
        {
          ...options.props,
          __onControlKeyDown: (_event, payload) => {
            spy(payload);
          }
        }
      )
    );
    await userEvent.type(container.querySelector("table button"), "{space}");
    expect(spy).toHaveBeenCalledWith({ rowIndex: 0, cellIndex: 0, date: expect.any(String) });
  });
}

export { itSupportsOnControlKeydown };
