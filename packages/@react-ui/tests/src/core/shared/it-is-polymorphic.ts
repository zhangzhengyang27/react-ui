import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { render } from '../render';

const TestComponent = forwardRef(
  (props, ref) => /* @__PURE__ */ jsx("mark", { ref, "data-child-prop": true, ...props })
);
function itIsPolymorphic(options, name = "is polymorphic") {
  const getTarget = (container) => container.querySelector(options.selector || "*:not(style)");
  it(`${name}: html element`, () => {
    const { container } = render(
      /* @__PURE__ */ jsx(options.component, { component: "a", href: "#test-link", ...options.props })
    );
    const target = getTarget(container);
    expect(target.tagName).toBe("A");
    expect(target.getAttribute("href")).toBe("#test-link");
  });
  it(`${name}: React component`, () => {
    const { container } = render(
      /* @__PURE__ */ jsx(options.component, { component: TestComponent, "data-parent-prop": true, ...options.props })
    );
    const target = getTarget(container);
    expect(target.tagName).toBe("MARK");
    expect(target).toHaveAttribute("data-child-prop");
    expect(target).toHaveAttribute("data-parent-prop");
  });
  it(`${name}: renderRoot`, () => {
    const { container } = render(
      /* @__PURE__ */ jsx(
        options.component,
        {
          renderRoot: (props) => /* @__PURE__ */ jsx("a", { href: "#test-link", ...props }),
          ...options.props
        }
      )
    );
    const target = getTarget(container);
    expect(target.tagName).toBe("A");
    expect(target.getAttribute("href")).toBe("#test-link");
  });
}

export { itIsPolymorphic };
