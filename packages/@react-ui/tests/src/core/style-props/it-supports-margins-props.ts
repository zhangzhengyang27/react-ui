import { jsx } from 'react/jsx-runtime';
import { rem } from '@react-ui/ui';
import { render } from '../render';

function itSupportsMarginsProps(options, name = "supports m, mx, my, mt, mb, mr and ml props") {
  const selector = options.selector || "*:not(style)";
  it(name, () => {
    const { container: m } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, m: 45 }));
    const { container: theme } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, m: "xl" }));
    const { container: mx } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, mx: 34 }));
    const { container: my } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, my: 22 }));
    const { container: mt } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, mt: 13 }));
    const { container: mb } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, mb: 43 }));
    const { container: mr } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, mr: 98 }));
    const { container: ml } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, ml: 11 }));
    const { container: me } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, me: 37 }));
    const { container: ms } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, ms: 39 }));
    expect(m.querySelector(selector)).toHaveStyle({ margin: rem(45) });
    expect(theme.querySelector(selector)).toHaveStyle({ margin: "var(--ui-spacing-xl)" });
    expect(mx.querySelector(selector)).toHaveStyle({ marginInline: rem(34) });
    expect(my.querySelector(selector)).toHaveStyle({ marginBlock: rem(22) });
    expect(mt.querySelector(selector)).toHaveStyle({ marginTop: rem(13) });
    expect(mb.querySelector(selector)).toHaveStyle({ marginBottom: rem(43) });
    expect(mr.querySelector(selector)).toHaveStyle({ marginRight: rem(98) });
    expect(ml.querySelector(selector)).toHaveStyle({ marginLeft: rem(11) });
    expect(me.querySelector(selector)).toHaveStyle({ marginInlineEnd: rem(37) });
    expect(ms.querySelector(selector)).toHaveStyle({ marginInlineStart: rem(39) });
  });
}

export { itSupportsMarginsProps };
