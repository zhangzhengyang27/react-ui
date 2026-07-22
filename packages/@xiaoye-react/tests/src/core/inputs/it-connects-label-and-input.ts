import { jsx } from 'react/jsx-runtime';
import { render } from '../render';

function itConnectsLabelAndInput(options, name = "connects label and input") {
  it(name, () => {
    const { container } = render(
      /* @__PURE__ */ jsx(options.component, { ...options.props, id: "secret-test-id", label: "Test label" })
    );
    expect(container.querySelector('[for="secret-test-id"]')).toBeInTheDocument();
    expect(container.querySelector("#secret-test-id")).toBeInTheDocument();
  });
}

export { itConnectsLabelAndInput };
