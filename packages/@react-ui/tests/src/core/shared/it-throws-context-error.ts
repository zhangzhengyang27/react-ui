import { jsx } from 'react/jsx-runtime';
import { patchConsoleError } from '../patch-console-error';
import { render } from '../render';

function itThrowsContextError(options, name = "throws error when rendered outside of context") {
  it(name, async () => {
    patchConsoleError();
    expect(() => render(/* @__PURE__ */ jsx(options.component, { ...options.props }))).toThrow(
      new Error(options.error)
    );
    patchConsoleError.release();
  });
}

export { itThrowsContextError };
