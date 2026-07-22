import { jsx } from 'react/jsx-runtime';
import { render } from '../core';

function itSupportsGetDayRef(options, name = "supports __getDayRef") {
  it(name, () => {
    const daysRefs = {};
    render(
      /* @__PURE__ */ jsx(
        options.component,
        {
          ...options.props,
          __getDayRef: (rowIndex, cellIndex, node) => {
            daysRefs[`${rowIndex}.${cellIndex}`] = node;
          }
        }
      )
    );
    expect(Object.keys(daysRefs)).toHaveLength(35);
    expect(daysRefs["0.0"]).toBeInstanceOf(HTMLButtonElement);
  });
}

export { itSupportsGetDayRef };
