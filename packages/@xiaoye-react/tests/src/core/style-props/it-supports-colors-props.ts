import { jsx } from 'react/jsx-runtime';
import { render } from '../render';

function itSupportsColorsProps(options, name = "supports c, bg and opacity props") {
  const selector = options.selector || "*:not(style)";
  it(name, () => {
    const { container: c } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, c: "#FEFEFE" }));
    const { container: bg } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, bg: "#DCDCDC" }));
    const { container: opacity } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, opacity: 0.85 }));
    expect(c.querySelector(selector)).toHaveStyle({ color: "#FEFEFE" });
    expect(bg.querySelector(selector)).toHaveStyle({ background: "#DCDCDC" });
    expect(opacity.querySelector(selector)).toHaveStyle({ opacity: "0.85" });
  });
}

export { itSupportsColorsProps };
