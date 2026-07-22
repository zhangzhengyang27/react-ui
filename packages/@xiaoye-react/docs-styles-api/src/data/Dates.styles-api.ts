import type {
  CalendarFactory,
  CalendarHeaderFactory,
  DateInputFactory,
  DatePickerFactory,
  DatePickerInputFactory,
  DateTimePickerFactory,
  DecadeLevelGroupFactory,
  InlineDateTimePickerFactory,
  MonthFactory,
  MonthLevelGroupFactory,
  MonthPickerFactory,
  MonthPickerInputFactory,
  TimeInputFactory,
  YearLevelGroupFactory,
  YearPickerFactory,
  YearPickerInputFactory,
} from '@xiaoye-react/dates';
import type { StylesApiData } from '../types';
import { InputBaseStylesApi } from './InputBase.styles-api';

export const MonthStylesApi: StylesApiData<MonthFactory> = {
  selectors: {
    monthThead: '月表的 thead 元素',
    monthRow: '月表的 tr 元素',
    monthTbody: '月表的 tbody 元素',
    monthCell: '月表的 td 元素',
    month: 'Month table 元素',
    weekdaysRow: 'Weekdays tr 元素',
    weekday: 'Weekday th 元素',
    day: '月视图日期控件',
    weekNumber: 'Week number td 元素',
  },

  vars: {
    weekNumber: {
      '--wn-fz': '控制字体大小',
      '--wn-size': '控制大小',
    },
  },

  modifiers: [
    {
      modifier: 'data-with-spacing',
      selector: 'monthCell',
      condition: '设置了 `withCellSpacing` 属性',
    },

    { modifier: 'data-today', selector: 'day', condition: 'Date is the same as new Date()' },
    {
      modifier: 'data-hidden',
      selector: 'day',
      condition: 'Day is outside of current month and `hideOutsideDates` is set',
    },
    {
      modifier: 'data-disabled',
      selector: 'day',
      condition: 'Day disabled by one of the props (`excludeDate`, `getDayProps`, etc.)',
    },
    { modifier: 'data-weekend', selector: 'day', condition: '周末' },
    { modifier: 'data-outside', selector: 'day', condition: '不在当前月份内' },
    { modifier: 'data-selected', selector: 'day', condition: '已选中' },
    { modifier: 'data-in-range', selector: 'day', condition: '在范围选择内' },
    {
      modifier: 'data-first-in-range',
      selector: 'day',
      condition: '范围选择的第一个日期',
    },
    {
      modifier: 'data-last-in-range',
      selector: 'day',
      condition: '范围选择的最后一个日期',
    },
  ],
};

export const CalendarHeaderStylesApi: StylesApiData<CalendarHeaderFactory> = {
  selectors: {
    calendarHeader: 'Calendar header root 元素',
    calendarHeaderControl: 'Previous/next calendar header controls',
    calendarHeaderControlIcon: 'Icon of previous/next calendar header controls',
    calendarHeaderLevel: 'Level control (changes levels when clicked, month -> year -> decade)',
  },

  vars: {
    calendarHeader: {
      '--dch-control-size': '控制 the previous/next and level controls 的 size',
      '--dch-fz': '控制 the previous/next and level controls 的 font-size',
    },
  },

  modifiers: [
    {
      modifier: 'data-direction',
      selector: 'calendarHeaderControl',
      value: '`"previous"` or `"next"` depending on the control type',
    },
    {
      modifier: 'data-disabled',
      selector: 'calendarHeaderControl',
      condition: 'Control is disabled for any reason',
    },
  ],
};

export const DecadeLevelGroupStylesApi: StylesApiData<DecadeLevelGroupFactory> = {
  selectors: {
    ...CalendarHeaderStylesApi.selectors,
    levelsGroup: '十年级别组',
    yearsList: 'Years list table 元素',
    yearsListRow: 'Years list row 元素',
    yearsListCell: 'Years list cell 元素',
    yearsListControl: '用于选择月份和年份的按钮',
  },

  vars: {},
};

export const YearLevelGroupStylesApi: StylesApiData<YearLevelGroupFactory> = {
  selectors: {
    ...CalendarHeaderStylesApi.selectors,
    levelsGroup: '年份级别组',
    monthsList: 'Months list table 元素',
    monthsListRow: 'Months list row 元素',
    monthsListCell: 'Months list cell 元素',
    monthsListControl: '用于选择月份和年份的按钮',
  },

  vars: {},
};

export const MonthLevelGroupStylesApi: StylesApiData<MonthLevelGroupFactory> = {
  selectors: {
    ...CalendarHeaderStylesApi.selectors,
    levelsGroup: '月份级别组',
    ...MonthStylesApi.selectors,
  },

  vars: {},
};

export const CalendarStylesApi: StylesApiData<CalendarFactory> = {
  selectors: {
    ...CalendarHeaderStylesApi.selectors,
    ...DecadeLevelGroupStylesApi.selectors,
    ...YearLevelGroupStylesApi.selectors,
    ...MonthLevelGroupStylesApi.selectors,
  },

  vars: {},

  modifiers: [...CalendarHeaderStylesApi.modifiers!, ...MonthStylesApi.modifiers!],
};

export const YearPickerStylesApi: StylesApiData<YearPickerFactory> = {
  selectors: {
    ...CalendarHeaderStylesApi.selectors,
    ...DecadeLevelGroupStylesApi.selectors,
    yearPickerRoot: 'Year picker root element, contains calendar and presets',
    presetsList: 'Presets wrapper 元素',
    presetButton: '预设按钮',
  },

  vars: {
    yearPickerRoot: {
      '--preset-font-size': '控制 preset buttons 的 font size',
    },
  },

  modifiers: CalendarHeaderStylesApi.modifiers,
};

export const MonthPickerStylesApi: StylesApiData<MonthPickerFactory> = {
  selectors: {
    ...CalendarHeaderStylesApi.selectors,
    ...DecadeLevelGroupStylesApi.selectors,
    ...YearLevelGroupStylesApi.selectors,
    monthPickerRoot: 'Month picker root element, contains calendar and presets',
    presetsList: 'Presets wrapper 元素',
    presetButton: '预设按钮',
  },

  vars: {
    monthPickerRoot: {
      '--preset-font-size': '控制 preset buttons 的 font size',
    },
  },

  modifiers: CalendarHeaderStylesApi.modifiers,
};

export const DatePickerStylesApi: StylesApiData<DatePickerFactory> = {
  selectors: {
    ...CalendarHeaderStylesApi.selectors,
    ...DecadeLevelGroupStylesApi.selectors,
    ...YearLevelGroupStylesApi.selectors,
    ...MonthLevelGroupStylesApi.selectors,
    datePickerRoot: 'Date picker root element, contains calendar and presets',
    presetsList: 'Presets wrapper 元素',
    presetButton: '预设按钮',
  },

  vars: {
    datePickerRoot: {
      '--preset-font-size': '控制 preset buttons 的 font size',
    },
  },

  modifiers: [...CalendarHeaderStylesApi.modifiers!, ...MonthStylesApi.modifiers!],
};

export const YearPickerInputStylesApi: StylesApiData<YearPickerInputFactory> = {
  selectors: {
    ...InputBaseStylesApi.selectors,
    ...YearPickerStylesApi.selectors,
    placeholder: 'Placeholder 元素',
  },

  vars: {},

  modifiers: YearPickerStylesApi.modifiers,
};

export const MonthPickerInputStylesApi: StylesApiData<MonthPickerInputFactory> = {
  selectors: {
    ...InputBaseStylesApi.selectors,
    ...MonthPickerStylesApi.selectors,
    placeholder: 'Placeholder 元素',
  },

  vars: {},

  modifiers: MonthPickerStylesApi.modifiers,
};

export const DatePickerInputStylesApi: StylesApiData<DatePickerInputFactory> = {
  selectors: {
    ...InputBaseStylesApi.selectors,
    ...DatePickerStylesApi.selectors,
    placeholder: 'Placeholder 元素',
  },

  vars: {},

  modifiers: DatePickerStylesApi.modifiers as any,
};

export const DateInputStylesApi: StylesApiData<DateInputFactory> = {
  selectors: {
    ...InputBaseStylesApi.selectors,
    ...CalendarHeaderStylesApi.selectors,
    ...DecadeLevelGroupStylesApi.selectors,
    ...YearLevelGroupStylesApi.selectors,
    ...MonthLevelGroupStylesApi.selectors,
    presetsRoot: 'Root element, contains calendar and presets',
    presetsList: 'Presets wrapper 元素',
    presetButton: '预设按钮',
  },

  vars: {},

  modifiers: DatePickerStylesApi.modifiers as any,
};

export const DateTimePickerStylesApi: StylesApiData<DateTimePickerFactory> = {
  selectors: {
    ...InputBaseStylesApi.selectors,
    ...DatePickerStylesApi.selectors,
    placeholder: 'Placeholder 元素',
    timeWrapper: '包裹时间输入和提交按钮的容器',
    timeInput: '时间输入',
    submitButton: '提交按钮',
    rangeTimeWrapper: '范围模式下包裹两个时间输入的容器',
    rangeTimeInput: '范围模式下的时间输入',
    rangeInfo: '范围模式下的日期范围预览',
  },

  vars: {},

  modifiers: DatePickerStylesApi.modifiers as any,
};

export const InlineDateTimePickerStylesApi: StylesApiData<InlineDateTimePickerFactory> = {
  selectors: {
    root: '根元素',
    ...DatePickerStylesApi.selectors,
    timeWrapper: '包裹时间输入和提交按钮的容器',
    timeInput: '时间输入',
    submitButton: '提交按钮',
    rangeTimeWrapper: '范围模式下包裹两个时间输入和提交按钮的容器',
    rangeTimeInput: '范围模式下的时间输入',
    rangeInfo: '范围模式下的日期范围预览',
  },

  vars: {},

  modifiers: DatePickerStylesApi.modifiers as any,
};

export const TimeInputStylesApi: StylesApiData<TimeInputFactory> = InputBaseStylesApi;
