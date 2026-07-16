import { jsx } from 'react/jsx-runtime';
import { render } from '../render';

function itSupportsLightDarkHidden(options, name = "supports lightHidden and darkHidden props") {
  it(`${name}: lightHidden`, () => {
    const { container } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, lightHidden: true }));
    expect(container.querySelector(".ui-light-hidden")).not.toBe(null);
  });
  it(`${name}: darkHidden`, () => {
    const { container } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, darkHidden: true }));
    expect(container.querySelector(".ui-dark-hidden")).not.toBe(null);
  });
}

export { itSupportsLightDarkHidden };
