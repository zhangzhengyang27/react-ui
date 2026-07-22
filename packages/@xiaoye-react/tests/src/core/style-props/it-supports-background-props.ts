import { jsx } from 'react/jsx-runtime';
import { render } from '../render';

function itSupportsBackgroundProps(options, name = "supports bd, bgsz, bgp, bgr and bga props") {
  const selector = options.selector || "*:not(style)";
  it(name, () => {
    const { container: bgsz } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, bgsz: 32 }));
    const { container: bgp } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, bgp: "center" }));
    const { container: bgr } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, bgr: "repeat" }));
    const { container: bga } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, bga: "fixed" }));
    expect(bgsz.querySelector(selector)).toHaveStyle({
      backgroundSize: "calc(2rem * var(--ui-scale))"
    });
    expect(bgp.querySelector(selector)).toHaveStyle({ backgroundPosition: "center" });
    expect(bgr.querySelector(selector)).toHaveStyle({ backgroundRepeat: "repeat" });
    expect(bga.querySelector(selector)).toHaveStyle({ backgroundAttachment: "fixed" });
  });
}

export { itSupportsBackgroundProps };
