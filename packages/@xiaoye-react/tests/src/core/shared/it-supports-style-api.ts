import { jsx } from 'react/jsx-runtime';
import { DEFAULT_THEME } from '@xiaoye-react/ui';
import { render } from '../render';

const randomNumber = (min = 10, max = 100) => Math.floor(Math.random() * (max - min + 1) + min);
const getTestObjectClassNames = (selectors) => selectors.reduce((acc, selector) => {
  acc[selector] = `test-${selector}`;
  return acc;
}, {});
const getTestFunctionClassNames = (selectors) => (theme, props) => selectors.reduce((acc, selector) => {
  acc[selector] = `test-${props["data-test"] === void 0 ? Math.random() : props["data-test"]}-${theme === void 0 ? Math.random() : theme.defaultRadius}-${selector}`;
  return acc;
}, {});
function itSupportsStylesApi(options, name = "supports styles api") {
  it(`${name}: classNames (inline object)`, () => {
    const classNames = getTestObjectClassNames(options.selectors);
    const { container } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, classNames }));
    options.selectors.forEach((selector) => {
      try {
        expect(container.querySelector(`.${classNames[selector]}`)).toBeInTheDocument();
      } catch (e) {
        throw new Error(`Missing selector: .ui-${options.providerName}-${selector}`);
      }
    });
  });
  if (!options.compound) {
    it(`${name}: classNames (inline function)`, () => {
      const classNames = getTestFunctionClassNames(options.selectors);
      const { container } = render(
        /* @__PURE__ */ jsx(options.component, { ...options.props, "data-test": "__test", classNames })
      );
      options.selectors.forEach((selector) => {
        expect(
          container.querySelector(
            `.${classNames(DEFAULT_THEME, { "data-test": "__test" })[selector]}`
          )
        ).toBeInTheDocument();
      });
    });
  }
  it(`${name}: styles (inline object)`, () => {
    const classNames = getTestObjectClassNames(options.selectors);
    const styles = options.selectors.reduce(
      (acc, selector) => {
        acc[selector] = { fontSize: `${randomNumber()}px` };
        return acc;
      },
      {}
    );
    const { container } = render(
      /* @__PURE__ */ jsx(options.component, { ...options.props, classNames, styles })
    );
    options.selectors.forEach((selector) => {
      expect(container.querySelector(`.${classNames[selector]}`)).toHaveStyle({
        ...styles[selector]
      });
    });
  });
  if (!options.compound) {
    it(`${name}: styles (inline function)`, () => {
      const classNames = getTestObjectClassNames(options.selectors);
      const styles = (theme, props) => options.selectors.reduce((acc, selector) => {
        acc[selector] = {
          outlineColor: props["data-test"],
          boxShadow: theme.shadows.xl
        };
        return acc;
      }, {});
      const { container } = render(
        /* @__PURE__ */ jsx(
          options.component,
          {
            ...options.props,
            "data-test": "rgb(250, 128, 114)",
            classNames,
            styles
          }
        )
      );
      options.selectors.forEach((selector) => {
        expect(container.querySelector(`.${classNames[selector]}`)).toHaveStyle({
          ...styles(DEFAULT_THEME, { "data-test": "rgb(250, 128, 114)" })[selector]
        });
      });
    });
  }
  it(`${name}: static classNames (default)`, () => {
    const { container } = render(/* @__PURE__ */ jsx(options.component, { ...options.props }));
    options.selectors.forEach((selector) => {
      try {
        expect(
          container.querySelector(`.ui-${options.providerName}-${selector}`)
        ).toBeInTheDocument();
      } catch (e) {
        throw new Error(`Missing selector: .ui-${options.providerName}-${selector}`);
      }
    });
  });
  if (options.providerStylesApi === void 0 || options.providerStylesApi === true) {
    it(`${name}: classNames (UIProvider object)`, () => {
      const classNames = getTestObjectClassNames(options.selectors);
      const { container } = render(
        /* @__PURE__ */ jsx(options.component, { ...options.props, classNames }),
        {
          components: {
            [options.providerName]: {
              classNames
            }
          }
        }
      );
      options.selectors.forEach((selector) => {
        expect(container.querySelector(`.${classNames[selector]}`)).toBeInTheDocument();
      });
    });
    it(`${name}: classNames (UIProvider function)`, () => {
      const classNames = getTestFunctionClassNames(options.selectors);
      const { container } = render(
        /* @__PURE__ */ jsx(options.component, { ...options.props, "data-test": "__test", classNames }),
        {
          components: {
            [options.providerName]: {
              classNames
            }
          }
        }
      );
      options.selectors.forEach((selector) => {
        expect(
          container.querySelector(
            `.${classNames(DEFAULT_THEME, { "data-test": "__test" })[selector]}`
          )
        ).toBeInTheDocument();
      });
    });
    it(`${name}: styles (UIProvider object)`, () => {
      const classNames = getTestObjectClassNames(options.selectors);
      const styles = options.selectors.reduce(
        (acc, selector) => {
          acc[selector] = { fontSize: `${randomNumber()}px` };
          return acc;
        },
        {}
      );
      const { container } = render(/* @__PURE__ */ jsx(options.component, { ...options.props }), {
        components: {
          [options.providerName]: {
            styles,
            classNames
          }
        }
      });
      options.selectors.forEach((selector) => {
        expect(container.querySelector(`.${classNames[selector]}`)).toHaveStyle({
          ...styles[selector]
        });
      });
    });
    it(`${name}: styles (UIProvider function)`, () => {
      const classNames = getTestObjectClassNames(options.selectors);
      const styles = (theme, props) => options.selectors.reduce((acc, selector) => {
        acc[selector] = {
          outlineColor: props["data-test"],
          boxShadow: theme.shadows.xl
        };
        return acc;
      }, {});
      const { container } = render(
        /* @__PURE__ */ jsx(options.component, { ...options.props, "data-test": "rgb(250, 128, 114)" }),
        {
          components: {
            [options.providerName]: {
              styles,
              classNames
            }
          }
        }
      );
      options.selectors.forEach((selector) => {
        try {
          expect(container.querySelector(`.${classNames[selector]}`)).toHaveStyle({
            ...styles(DEFAULT_THEME, { "data-test": "rgb(250, 128, 114)" })[selector]
          });
        } catch (e) {
          throw new Error(`Missing selector: .test-${options.providerName}-${selector}`);
        }
      });
    });
    it(`${name}: static classNames (UIProvider)`, () => {
      const { container } = render(
        /* @__PURE__ */ jsx(options.component, { ...options.props }),
        {},
        { classNamesPrefix: "test" }
      );
      options.selectors.forEach((selector) => {
        try {
          expect(
            container.querySelector(`.test-${options.providerName}-${selector}`)
          ).toBeInTheDocument();
        } catch (e) {
          throw new Error(`Missing selector: .test-${options.providerName}-${selector}`);
        }
      });
    });
  }
}

export { itSupportsStylesApi };
