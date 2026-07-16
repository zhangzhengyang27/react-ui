import { jsx } from 'react/jsx-runtime';
import { render } from '../render';

function itSupportsMod(options, name = "supports mod") {
  it(`${name}: string`, () => {
    const { container } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, mod: "test" }));
    expect(container.querySelector(options.selector || "*:not(style)")).toHaveAttribute(
      "data-test"
    );
  });
  it(`${name}: object`, () => {
    const { container } = render(
      /* @__PURE__ */ jsx(options.component, { ...options.props, mod: { test: true, test2: false } })
    );
    expect(container.querySelector(options.selector || "*:not(style)")).toHaveAttribute(
      "data-test"
    );
    expect(container.querySelector(options.selector || "*:not(style)")).not.toHaveAttribute(
      "data-test2"
    );
  });
  it(`${name}: array`, () => {
    const { container } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, mod: ["test", "test2"] }));
    expect(container.querySelector(options.selector || "*:not(style)")).toHaveAttribute(
      "data-test"
    );
    expect(container.querySelector(options.selector || "*:not(style)")).toHaveAttribute(
      "data-test2"
    );
  });
  it(`${name}: array with object`, () => {
    const { container } = render(
      /* @__PURE__ */ jsx(options.component, { ...options.props, mod: ["test", { test2: true }] })
    );
    expect(container.querySelector(options.selector || "*:not(style)")).toHaveAttribute(
      "data-test"
    );
    expect(container.querySelector(options.selector || "*:not(style)")).toHaveAttribute(
      "data-test2"
    );
  });
}

export { itSupportsMod };
