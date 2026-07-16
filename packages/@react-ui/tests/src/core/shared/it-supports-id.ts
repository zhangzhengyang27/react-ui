import { jsx } from 'react/jsx-runtime';
import { render } from '../render';

function itSupportsId(options, name = "supports id") {
  it(name, () => {
    render(/* @__PURE__ */ jsx(options.component, { ...options.props, id: "test-ui-id" }));
    expect(document.querySelector("#test-ui-id")).not.toBe(null);
  });
}

export { itSupportsId };
