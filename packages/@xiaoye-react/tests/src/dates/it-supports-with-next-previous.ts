import { jsx } from 'react/jsx-runtime';
import { screen } from '@testing-library/react';
import { render } from '../core';

function itSupportsWithNextPrevious(options, name = "supports with next/previous") {
  describe(name, () => {
    it("supports withNext prop", () => {
      const { rerender } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, withNext: true }));
      expect(screen.getByLabelText("next")).toBeInTheDocument();
      rerender(/* @__PURE__ */ jsx(options.component, { ...options.props, withNext: false }));
      expect(screen.queryAllByLabelText("next")).toHaveLength(0);
    });
    it("supports withPrevious prop", () => {
      const { rerender } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, withPrevious: true }));
      expect(screen.getByLabelText("prev")).toBeInTheDocument();
      rerender(/* @__PURE__ */ jsx(options.component, { ...options.props, withPrevious: false }));
      expect(screen.queryAllByLabelText("prev")).toHaveLength(0);
    });
  });
}

export { itSupportsWithNextPrevious };
