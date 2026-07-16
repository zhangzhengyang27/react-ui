import { jsx } from 'react/jsx-runtime';
import { createRef } from 'react';
import { render } from '../render';

function itSupportsRef(options, name = "supports ref") {
  it(name, () => {
    const ref = createRef();
    render(/* @__PURE__ */ jsx(options.component, { ...options.props, ...{ [options.refProp || "ref"]: ref } }));
    expect(ref.current).toBeInstanceOf(options.refType);
  });
}

export { itSupportsRef };
