import { jsx } from 'react/jsx-runtime';
import { render } from '../render';

function itSupportsSize(options, name = "supports size") {
  it(name, () => {
    const { container, rerender } = render(
      /* @__PURE__ */ jsx(options.component, { ...options.props, size: "__test-size" })
    );
    expect(container.querySelector(options.selector || "*:not(style)")).toHaveAttribute(
      "data-size",
      "__test-size"
    );
    rerender(/* @__PURE__ */ jsx(options.component, { ...options.props, size: "5rem" }));
    expect(container.querySelector(options.selector || "*:not(style)")).not.toHaveAttribute(
      "data-size"
    );
  });
}

export { itSupportsSize };
