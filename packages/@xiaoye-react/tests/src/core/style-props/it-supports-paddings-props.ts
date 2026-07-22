import { jsx } from 'react/jsx-runtime';
import { render } from '../render';

function itSupportsPaddingsProps(options, name = "supports p, px, py, pt, pb, pr and pl props") {
  const selector = options.selector || "*:not(style)";
  it(name, () => {
    const { container: p } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, p: "10%" }));
    const { container: px } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, px: "20%" }));
    const { container: py } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, py: "30%" }));
    const { container: pt } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, pt: "40%" }));
    const { container: pb } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, pb: "50%" }));
    const { container: pr } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, pr: "60%" }));
    const { container: pl } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, pl: "70%" }));
    const { container: pe } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, pe: "80%" }));
    const { container: ps } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, ps: "90%" }));
    expect(p.querySelector(selector)).toHaveStyle({ padding: "10%" });
    expect(px.querySelector(selector)).toHaveStyle({ paddingInline: "20%" });
    expect(py.querySelector(selector)).toHaveStyle({ paddingBlock: "30%" });
    expect(pt.querySelector(selector)).toHaveStyle({ paddingTop: "40%" });
    expect(pb.querySelector(selector)).toHaveStyle({ paddingBottom: "50%" });
    expect(pr.querySelector(selector)).toHaveStyle({ paddingRight: "60%" });
    expect(pl.querySelector(selector)).toHaveStyle({ paddingLeft: "70%" });
    expect(pe.querySelector(selector)).toHaveStyle({ paddingInlineEnd: "80%" });
    expect(ps.querySelector(selector)).toHaveStyle({ paddingInlineStart: "90%" });
  });
}

export { itSupportsPaddingsProps };
