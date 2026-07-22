import { jsx } from 'react/jsx-runtime';
import { render } from '../render';

function itSupportsProviderDefaultProps(options, name = "supports default props on UIProvider") {
  it(name, () => {
    const { container } = render(/* @__PURE__ */ jsx(options.component, { ...options.props }), {
      components: {
        [options.providerName]: {
          defaultProps: { "data-provider-prop": "test-provider-prop" }
        }
      }
    });
    const element = container.querySelector("[data-provider-prop]");
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("data-provider-prop", "test-provider-prop");
  });
}

export { itSupportsProviderDefaultProps };
