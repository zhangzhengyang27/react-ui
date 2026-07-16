import { jsx } from 'react/jsx-runtime';
import dayjs from 'dayjs';
import { DatesProvider } from '@react-ui/dates';
import { render } from '../core';

const defaultYearsNames = [
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029"
];
const ruYearsNames = [
  "\u044F\u043D\u0432. 2020",
  "\u044F\u043D\u0432. 2021",
  "\u044F\u043D\u0432. 2022",
  "\u044F\u043D\u0432. 2023",
  "\u044F\u043D\u0432. 2024",
  "\u044F\u043D\u0432. 2025",
  "\u044F\u043D\u0432. 2026",
  "\u044F\u043D\u0432. 2027",
  "\u044F\u043D\u0432. 2028",
  "\u044F\u043D\u0432. 2029"
];
const customFormatYearsNames = [
  "Jan 20",
  "Jan 21",
  "Jan 22",
  "Jan 23",
  "Jan 24",
  "Jan 25",
  "Jan 26",
  "Jan 27",
  "Jan 28",
  "Jan 29"
];
function expectYearNames(container, monthNames) {
  expect(
    Array.from(container.querySelectorAll("table button")).map((node) => node.textContent)
  ).toStrictEqual(monthNames);
}
function itSupportsYearsListProps(options, name = "supports years list props") {
  describe(name, () => {
    it("renders correct years list", () => {
      const { container } = render(/* @__PURE__ */ jsx(options.component, { ...options.props }));
      expectYearNames(container, defaultYearsNames);
    });
    it("supports locale prop with custom yearsListFormat", () => {
      const { container } = render(
        /* @__PURE__ */ jsx(options.component, { ...options.props, locale: "ru", yearsListFormat: "MMM YYYY" })
      );
      expectYearNames(container, ruYearsNames);
    });
    it("supports years list localization with DatesProvider", () => {
      const { container } = render(
        /* @__PURE__ */ jsx(DatesProvider, { settings: { locale: "ru" }, children: /* @__PURE__ */ jsx(options.component, { ...options.props, yearsListFormat: "MMM YYYY" }) })
      );
      expectYearNames(container, ruYearsNames);
    });
    it("supports custom yearsListFormat format", () => {
      const { container } = render(
        /* @__PURE__ */ jsx(options.component, { ...options.props, yearsListFormat: "MMM YY" })
      );
      expectYearNames(container, customFormatYearsNames);
    });
    it("disables years if they are before minDate", () => {
      const { container } = render(
        /* @__PURE__ */ jsx(options.component, { ...options.props, decade: "2022-04-11", minDate: "2023-05-11" })
      );
      const years = container.querySelectorAll("table button");
      expect(years[0]).toBeDisabled();
      expect(years[1]).toBeDisabled();
      expect(years[2]).toBeDisabled();
      expect(years[3]).not.toBeDisabled();
      expect(years[9]).not.toBeDisabled();
    });
    it("disables years if they are after minDate", () => {
      const { container } = render(
        /* @__PURE__ */ jsx(options.component, { ...options.props, decade: "2022-04-11", maxDate: "2023-05-11" })
      );
      const years = container.querySelectorAll("[data-picker-control]");
      expect(years[0]).not.toBeDisabled();
      expect(years[3]).not.toBeDisabled();
      expect(years[4]).toBeDisabled();
      expect(years[9]).toBeDisabled();
    });
    it("supports getYearControlProps", () => {
      const { container } = render(
        /* @__PURE__ */ jsx(
          options.component,
          {
            ...options.props,
            getYearControlProps: (date) => ({
              selected: dayjs(date).isSame("2022-04-11", "year")
            })
          }
        )
      );
      const years = container.querySelectorAll("[data-picker-control]");
      expect(years[1]).not.toHaveAttribute("data-selected");
      expect(years[2]).toHaveAttribute("data-selected");
      expect(years[3]).not.toHaveAttribute("data-selected");
    });
  });
}

export { itSupportsYearsListProps };
