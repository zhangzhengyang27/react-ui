import { jsx } from 'react/jsx-runtime';
import userEvent from '@testing-library/user-event';
import { render } from '../core';

function itSupportsOnDayKeydown(options, name = "supports __onDayKeyDown") {
  it(name, async () => {
    const spy = jest.fn();
    const { container } = render(
      /* @__PURE__ */ jsx(
        options.component,
        {
          ...options.props,
          month: "2022-04-11",
          __onDayKeyDown: (_event, payload) => {
            spy(payload);
          }
        }
      )
    );
    await userEvent.type(container.querySelector("table button"), "{space}");
    expect(spy).toHaveBeenCalledWith({ rowIndex: 0, cellIndex: 0, date: "2022-03-28" });
  });
}

export { itSupportsOnDayKeydown };
