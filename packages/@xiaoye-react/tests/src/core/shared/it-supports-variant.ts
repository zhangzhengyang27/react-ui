import { jsx } from 'react/jsx-runtime';
import { render } from '../render';

function itSupportsVariant(options, name = "supports variant") {
  it(name, () => {
    const { container } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, variant: "__test-variant" }));
    expect(container.querySelector(options.selector || "*:not(style)")).toHaveAttribute(
      "data-variant",
      "__test-variant"
    );
  });
}

export { itSupportsVariant };
