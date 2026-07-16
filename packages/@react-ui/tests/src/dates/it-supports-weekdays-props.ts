import { jsx } from 'react/jsx-runtime';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import { screen } from '@testing-library/react';
import { DatesProvider } from '@react-ui/dates';
import { render } from '../core';

function expectWeekdaysNames(names) {
  expect(screen.getAllByRole("columnheader").map((th) => th.textContent)).toStrictEqual(names);
}
function itSupportsWeekdaysProps(options, name = "supports weekdays props") {
  describe(name, () => {
    it("renders weekdays names with en locale by default", () => {
      render(/* @__PURE__ */ jsx(options.component, { ...options.props }));
      expectWeekdaysNames(["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]);
    });
    it("supports weekdays names localization with locale prop", () => {
      render(/* @__PURE__ */ jsx(options.component, { ...options.props, locale: "ru" }));
      expectWeekdaysNames(["\u043F\u043D", "\u0432\u0442", "\u0441\u0440", "\u0447\u0442", "\u043F\u0442", "\u0441\u0431", "\u0432\u0441"]);
    });
    it("supports weekdays names localization with DatesProvider", () => {
      render(
        /* @__PURE__ */ jsx(DatesProvider, { settings: { locale: "ru" }, children: /* @__PURE__ */ jsx(options.component, { ...options.props }) })
      );
      expectWeekdaysNames(["\u043F\u043D", "\u0432\u0442", "\u0441\u0440", "\u0447\u0442", "\u043F\u0442", "\u0441\u0431", "\u0432\u0441"]);
    });
    it("supports changing weekday format", () => {
      render(/* @__PURE__ */ jsx(options.component, { ...options.props, weekdayFormat: "dddd" }));
      expectWeekdaysNames([
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ]);
    });
    it("supports changing weekday format function", () => {
      render(
        /* @__PURE__ */ jsx(
          options.component,
          {
            ...options.props,
            weekdayFormat: (date) => dayjs(date).format("dd")[0]
          }
        )
      );
      expectWeekdaysNames(["M", "T", "W", "T", "F", "S", "S"]);
    });
    it("changes weekdays order based on firstDayOfWeek prop", () => {
      const { rerender } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, firstDayOfWeek: 0 }));
      expectWeekdaysNames(["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]);
      rerender(/* @__PURE__ */ jsx(options.component, { ...options.props, firstDayOfWeek: 6 }));
      expectWeekdaysNames(["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"]);
    });
    it("changes weekdays order based on firstDayOfWeek defined on DatesProvider", () => {
      render(
        /* @__PURE__ */ jsx(DatesProvider, { settings: { firstDayOfWeek: 4 }, children: /* @__PURE__ */ jsx(options.component, { ...options.props }) })
      );
      expectWeekdaysNames(["Th", "Fr", "Sa", "Su", "Mo", "Tu", "We"]);
    });
  });
}

export { expectWeekdaysNames, itSupportsWeekdaysProps };
