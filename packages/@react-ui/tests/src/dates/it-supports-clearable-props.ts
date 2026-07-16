import { jsx } from 'react/jsx-runtime';
import { screen } from '@testing-library/react';
import { render } from '../core';

function itSupportsClearableProps(options, name = "supports clearable props") {
  it(`${name}: renders given rightSection instead of clear button`, () => {
    render(
      /* @__PURE__ */ jsx(
        options.component,
        {
          ...options.props,
          clearable: true,
          clearButtonProps: { "aria-label": "test-clear" },
          rightSection: /* @__PURE__ */ jsx("span", { children: "test-right-section" })
        }
      )
    );
    expect(screen.queryAllByLabelText("test-clear")).toHaveLength(0);
    expect(screen.getByText("test-right-section")).toBeInTheDocument();
  });
  it(`${name}: supports clearButtonProps`, () => {
    render(
      /* @__PURE__ */ jsx(
        options.component,
        {
          ...options.props,
          clearable: true,
          clearButtonProps: { "aria-label": "test-clear", "data-test-attr": true }
        }
      )
    );
    expect(screen.getByLabelText("test-clear")).toHaveAttribute("data-test-attr");
  });
}

export { itSupportsClearableProps };
