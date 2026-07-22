import { jsx } from 'react/jsx-runtime';
import { render } from '../render';

function itSupportsClassName(options, name = "supports className prop") {
  it(name, () => {
    const { container } = render(
      /* @__PURE__ */ jsx(options.component, { ...options.props, className: "test-class-name" })
    );
    expect(container.querySelector(".test-class-name")).toBeInTheDocument();
  });
}

export { itSupportsClassName };
