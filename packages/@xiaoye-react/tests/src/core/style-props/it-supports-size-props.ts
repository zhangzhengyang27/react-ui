import { jsx } from 'react/jsx-runtime';
import { render } from '../render';

function itSupportsSizeProps(options, name = "supports w, miw, maw, h, mih and mah props") {
  const selector = options.selector || "*:not(style)";
  it(name, () => {
    const { container: theme } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, w: "xl" }));
    const { container: w } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, w: "10%" }));
    const { container: miw } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, miw: "10vh" }));
    const { container: maw } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, maw: "20%" }));
    const { container: h } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, h: "10%" }));
    const { container: mih } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, mih: "10vh" }));
    const { container: mah } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, mah: "20%" }));
    expect(theme.querySelector(selector)).toHaveStyle({ width: "var(--ui-spacing-xl)" });
    expect(w.querySelector(selector)).toHaveStyle({ width: "10%" });
    expect(miw.querySelector(selector)).toHaveStyle({ minWidth: "10vh" });
    expect(maw.querySelector(selector)).toHaveStyle({ maxWidth: "20%" });
    expect(h.querySelector(selector)).toHaveStyle({ height: "10%" });
    expect(mih.querySelector(selector)).toHaveStyle({ minHeight: "10vh" });
    expect(mah.querySelector(selector)).toHaveStyle({ maxHeight: "20%" });
  });
}

export { itSupportsSizeProps };
