import { jsx } from 'react/jsx-runtime';
import { render } from '../render';

function itSupportsOthers(options, name = "supports ...others props") {
  it(name, () => {
    const { container } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, "data-test-attribute": true }));
    expect(container.querySelector("[data-test-attribute]")).toBeInTheDocument();
  });
}

export { itSupportsOthers };
