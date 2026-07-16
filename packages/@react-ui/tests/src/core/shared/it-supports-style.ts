import { jsx } from 'react/jsx-runtime';
import { DEFAULT_THEME } from '@react-ui/ui';
import { render } from '../render';

function itSupportsStyle(options, name = "supports style") {
  it(`${name}: object`, () => {
    const { container } = render(
      /* @__PURE__ */ jsx(options.component, { ...options.props, style: { color: "rgb(250, 128, 114)" } })
    );
    expect(container.querySelector(options.selector || "*:not(style)")).toHaveStyle({
      color: "rgb(250, 128, 114)"
    });
  });
  it(`${name}: theme function`, () => {
    const { container } = render(
      /* @__PURE__ */ jsx(
        options.component,
        {
          ...options.props,
          style: (theme) => ({ color: theme.colors.pink[4] })
        }
      )
    );
    expect(container.querySelector(options.selector || "*:not(style)")).toHaveStyle({
      color: DEFAULT_THEME.colors.pink[4]
    });
  });
  it(`${name}: array of objects`, () => {
    const { container } = render(
      /* @__PURE__ */ jsx(
        options.component,
        {
          ...options.props,
          style: [{ color: "rgb(250, 128, 114)" }, { background: "olive" }]
        }
      )
    );
    expect(container.querySelector(options.selector || "*:not(style)")).toHaveStyle({
      color: "rgb(250, 128, 114)",
      background: "olive"
    });
  });
  it(`${name}: array of theme functions`, () => {
    const { container } = render(
      /* @__PURE__ */ jsx(
        options.component,
        {
          ...options.props,
          style: [
            (theme) => ({ color: theme.colors.pink[4] }),
            (theme) => ({ background: theme.colors.orange[9] })
          ]
        }
      )
    );
    expect(container.querySelector(options.selector || "*:not(style)")).toHaveStyle({
      color: DEFAULT_THEME.colors.pink[4],
      background: DEFAULT_THEME.colors.orange[9]
    });
  });
}

export { itSupportsStyle };
