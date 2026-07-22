import { jsx } from 'react/jsx-runtime';
import { render } from '../render';

function itSupportsHiddenVisible(options, name = "supports hiddenFrom and visibleFrom props") {
  it(`${name}: hiddenFrom`, () => {
    const { container } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, hiddenFrom: "lg" }));
    expect(container.querySelector(".ui-hidden-from-lg")).not.toBe(null);
  });
  it(`${name}: visibleFrom`, () => {
    const { container } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, visibleFrom: "sm" }));
    expect(container.querySelector(".ui-visible-from-sm")).not.toBe(null);
  });
}

export { itSupportsHiddenVisible };
