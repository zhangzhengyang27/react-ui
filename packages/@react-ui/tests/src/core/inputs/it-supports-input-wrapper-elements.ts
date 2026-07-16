import { jsx } from 'react/jsx-runtime';
import { inputWrapperQueries } from '../queries/input-wrapper.queries';
import { render } from '../render';

function itSupportsInputWrapperElements(options, name = "supports InputWrapper elements") {
  it(`${name}: label`, () => {
    const { container } = render(
      /* @__PURE__ */ jsx(options.component, { ...options.props, label: "test-label", withAsterisk: false })
    );
    expect(inputWrapperQueries.getLabel(container).textContent).toBe("test-label");
  });
  it(`${name}: description`, () => {
    const { container } = render(
      /* @__PURE__ */ jsx(options.component, { ...options.props, description: "test-description" })
    );
    expect(inputWrapperQueries.getDescription(container).textContent).toBe("test-description");
  });
  it(`${name}: error`, () => {
    const { container } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, error: "test-error" }));
    expect(inputWrapperQueries.getError(container).textContent).toBe("test-error");
  });
  it(`${name}: labelProps`, () => {
    const { container } = render(
      /* @__PURE__ */ jsx(options.component, { ...options.props, labelProps: { "data-test-label": true } })
    );
    expect(inputWrapperQueries.getLabel(container)).toHaveAttribute("data-test-label");
  });
  it(`${name}: descriptionProps`, () => {
    const { container } = render(
      /* @__PURE__ */ jsx(options.component, { ...options.props, descriptionProps: { "data-test-description": true } })
    );
    expect(inputWrapperQueries.getDescription(container)).toHaveAttribute("data-test-description");
  });
  it(`${name}: errorProps`, () => {
    const { container } = render(
      /* @__PURE__ */ jsx(options.component, { ...options.props, errorProps: { "data-test-error": true } })
    );
    expect(inputWrapperQueries.getError(container)).toHaveAttribute("data-test-error");
  });
}

export { itSupportsInputWrapperElements };
