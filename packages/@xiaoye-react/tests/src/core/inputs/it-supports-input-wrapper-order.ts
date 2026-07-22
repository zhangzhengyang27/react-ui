import { jsx } from 'react/jsx-runtime';
import { inputWrapperQueries } from '../queries/input-wrapper.queries';
import { render } from '../render';

function itSupportsInputWrapperOrder(options, name = "supports inputWrapperOrder prop") {
  it(name, () => {
    const { container, rerender } = render(
      /* @__PURE__ */ jsx(options.component, { ...options.props, inputWrapperOrder: ["error", "label"] })
    );
    expect(inputWrapperQueries.getError(container).nextElementSibling).toBe(
      inputWrapperQueries.getLabel(container)
    );
    rerender(/* @__PURE__ */ jsx(options.component, { ...options.props, inputWrapperOrder: ["label", "error"] }));
    expect(inputWrapperQueries.getLabel(container).nextElementSibling).toBe(
      inputWrapperQueries.getError(container)
    );
  });
}

export { itSupportsInputWrapperOrder };
