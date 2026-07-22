import { jsx } from 'react/jsx-runtime';
import { screen } from '@testing-library/react';
import { render } from '../render';

function itRendersChildren(options, name = "renders children") {
  it(name, () => {
    render(/* @__PURE__ */ jsx(options.component, { ...options.props, children: "test-children" }));
    expect(screen.getByText("test-children")).toBeInTheDocument();
  });
}

export { itRendersChildren };
