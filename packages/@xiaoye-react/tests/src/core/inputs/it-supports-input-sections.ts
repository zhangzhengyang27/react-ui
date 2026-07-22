import { jsx } from 'react/jsx-runtime';
import { screen } from '@testing-library/react';
import { render } from '../render';

function itSupportsInputSections(options, name = "supports Input sections") {
  describe(name, () => {
    it("supports rightSection", () => {
      render(/* @__PURE__ */ jsx(options.component, { ...options.props, rightSection: "test-right-section" }));
      expect(screen.getByText("test-right-section")).toBeInTheDocument();
    });
    it("supports leftSection", () => {
      render(/* @__PURE__ */ jsx(options.component, { ...options.props, leftSection: "test-left-section" }));
      expect(screen.getByText("test-left-section")).toBeInTheDocument();
    });
    it("supports rightSectionProps", () => {
      render(
        /* @__PURE__ */ jsx(
          options.component,
          {
            ...options.props,
            rightSection: "test-right-section",
            rightSectionProps: { "data-test": "test" }
          }
        )
      );
      expect(screen.getByText("test-right-section")).toHaveAttribute("data-test", "test");
    });
    it("supports leftSectionProps", () => {
      render(
        /* @__PURE__ */ jsx(
          options.component,
          {
            ...options.props,
            leftSection: "test-left-section",
            leftSectionProps: { "data-test": "test" }
          }
        )
      );
      expect(screen.getByText("test-left-section")).toHaveAttribute("data-test", "test");
    });
  });
}

export { itSupportsInputSections };
