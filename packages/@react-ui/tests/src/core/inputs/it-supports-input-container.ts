import { jsx } from 'react/jsx-runtime';
import { render } from '../render';

function itSupportsInputContainer(options, name = "supports inputContainer props") {
  it(name, () => {
    const { container } = render(
      /* @__PURE__ */ jsx(
        options.component,
        {
          ...options.props,
          inputContainer: (children) => /* @__PURE__ */ jsx("div", { className: "test-input-container", children })
        }
      )
    );
    expect(container.querySelector(".test-input-container")).toBeInTheDocument();
    expect(
      container.querySelector(".test-input-container .ui-Input-input")
    ).toBeInTheDocument();
  });
}

export { itSupportsInputContainer };
