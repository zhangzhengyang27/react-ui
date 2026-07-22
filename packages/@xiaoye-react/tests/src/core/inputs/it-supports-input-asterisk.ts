import { jsx } from 'react/jsx-runtime';
import { render } from '../render';

function itSupportsInputAsterisk(options, name = "supports combination of withAsterisk and required props") {
  it(name, () => {
    const { rerender, container } = render(
      /* @__PURE__ */ jsx(options.component, { ...options.props, required: false, withAsterisk: false })
    );
    expect(container.querySelector(".ui-InputWrapper-required")).not.toBeInTheDocument();
    rerender(/* @__PURE__ */ jsx(options.component, { ...options.props, required: true, withAsterisk: false }));
    expect(container.querySelector(".ui-InputWrapper-required")).not.toBeInTheDocument();
    rerender(/* @__PURE__ */ jsx(options.component, { ...options.props, required: false, withAsterisk: true }));
    expect(container.querySelector(".ui-InputWrapper-required")).toBeInTheDocument();
    rerender(/* @__PURE__ */ jsx(options.component, { ...options.props, required: true, withAsterisk: true }));
    expect(container.querySelector(".ui-InputWrapper-required")).toBeInTheDocument();
  });
}

export { itSupportsInputAsterisk };
