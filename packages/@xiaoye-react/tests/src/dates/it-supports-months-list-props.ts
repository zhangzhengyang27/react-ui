import { jsx } from 'react/jsx-runtime';
import dayjs from 'dayjs';
import { DatesProvider } from '@xiaoye-react/ui';
import { render } from '../core';

const defaultMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const ruMonthsNames = [
  "\u044F\u043D\u0432.",
  "\u0444\u0435\u0432\u0440.",
  "\u043C\u0430\u0440\u0442",
  "\u0430\u043F\u0440.",
  "\u043C\u0430\u0439",
  "\u0438\u044E\u043D\u044C",
  "\u0438\u044E\u043B\u044C",
  "\u0430\u0432\u0433.",
  "\u0441\u0435\u043D\u0442.",
  "\u043E\u043A\u0442.",
  "\u043D\u043E\u044F\u0431.",
  "\u0434\u0435\u043A."
];
const customFormatMonthsNames = [
  "Jan 22",
  "Feb 22",
  "Mar 22",
  "Apr 22",
  "May 22",
  "Jun 22",
  "Jul 22",
  "Aug 22",
  "Sep 22",
  "Oct 22",
  "Nov 22",
  "Dec 22"
];
function expectMonthNames(container, monthNames) {
  expect(
    Array.from(container.querySelectorAll("table button")).map((node) => node.textContent)
  ).toStrictEqual(monthNames);
}
function itSupportsMonthsListProps(options, name = "supports months list props") {
  describe(name, () => {
    it("renders correct months list", () => {
      const { container } = render(/* @__PURE__ */ jsx(options.component, { ...options.props }));
      expectMonthNames(container, defaultMonthNames);
    });
    it("supports months list localization", () => {
      const { container } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, locale: "ru" }));
      expectMonthNames(container, ruMonthsNames);
    });
    it("supports months list localization with DatesProvider", () => {
      const { container } = render(
        /* @__PURE__ */ jsx(DatesProvider, { settings: { locale: "ru" }, children: /* @__PURE__ */ jsx(options.component, { ...options.props }) })
      );
      expectMonthNames(container, ruMonthsNames);
    });
    it("supports custom monthsListFormat format", () => {
      const { container } = render(
        /* @__PURE__ */ jsx(options.component, { ...options.props, monthsListFormat: "MMM YY" })
      );
      expectMonthNames(container, customFormatMonthsNames);
    });
    it("disables months if they are before minDate", () => {
      const { container } = render(
        /* @__PURE__ */ jsx(options.component, { ...options.props, year: "2022-04-11", minDate: "2022-05-11" })
      );
      const months = container.querySelectorAll("table button");
      expect(months[0]).toBeDisabled();
      expect(months[1]).toBeDisabled();
      expect(months[3]).toBeDisabled();
      expect(months[4]).not.toBeDisabled();
      expect(months[11]).not.toBeDisabled();
    });
    it("disables months if they are after minDate", () => {
      const { container } = render(
        /* @__PURE__ */ jsx(options.component, { ...options.props, year: "2022-04-11", maxDate: "2022-05-11" })
      );
      const months = container.querySelectorAll("table button");
      expect(months[0]).not.toBeDisabled();
      expect(months[4]).not.toBeDisabled();
      expect(months[5]).toBeDisabled();
      expect(months[11]).toBeDisabled();
    });
    it("supports getMonthControlProps", () => {
      const { container } = render(
        /* @__PURE__ */ jsx(
          options.component,
          {
            ...options.props,
            getMonthControlProps: (date) => ({
              selected: dayjs(date).isSame("2022-04-11", "month")
            })
          }
        )
      );
      const months = container.querySelectorAll("table button");
      expect(months[2]).not.toHaveAttribute("data-selected");
      expect(months[3]).toHaveAttribute("data-selected");
      expect(months[4]).not.toHaveAttribute("data-selected");
    });
  });
}

export { itSupportsMonthsListProps };
