import { jsx } from 'react/jsx-runtime';
import { render } from '../core';

function itSupportsGetControlRef(options, name = "supports __getControlRef") {
  it(name, () => {
    const spy = jest.fn();
    render(/* @__PURE__ */ jsx(options.component, { ...options.props, __getControlRef: spy }));
    expect(spy).toHaveBeenCalledTimes(options.numberOfControls);
    expect(spy).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Number),
      expect.any(HTMLButtonElement)
    );
  });
}

export { itSupportsGetControlRef };
