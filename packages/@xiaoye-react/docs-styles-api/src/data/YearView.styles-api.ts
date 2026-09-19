import type { YearViewFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const YearViewStylesApi: StylesApiData<YearViewFactory> = {
  selectors: {
    yearView: '根元素',
    yearViewMonths: 'Container for all months',
    yearViewMonth: 'Individual month 容器',
    yearViewWeekday: '星期名称单元格',
    yearViewDay: 'Day cell',
    yearViewWeek: '周行',
    yearViewWeekNumber: '周数指示器',
    yearViewWeekdays: '工作日行',
    yearViewWeekdaysCorner: 'Top-left corner in weekdays row',
    yearViewMonthCaption: 'Month name label',
    yearViewDayIndicators: 'Container for day event indicators',
    yearViewDayIndicator: 'Individual day event indicator',
    header: '头部容器，属于 ScheduleHeader',
    headerControl: '头部控制元素，属于 ScheduleHeader',
    viewSelect: '视图选择元素，属于 ScheduleHeader',
    monthYearSelectTarget: '月/年选择目标按钮，属于 MonthYearSelect',
    monthYearSelectDropdown: '月/年选择下拉框，属于 MonthYearSelect',
    monthYearSelectControl: '月/年选择控件，属于 MonthYearSelect',
    monthYearSelectList: '月/年选择列表，属于 MonthYearSelect',
    monthYearSelectLabel: '月/年选择标签，属于 MonthYearSelect',
  },

  vars: {
    yearView: {
      '--year-view-radius': 'Controls `border-radius` of the year view',
    },
  },

  modifiers: [
    { modifier: 'data-today', selector: 'yearViewDay', condition: '当天' },
    { modifier: 'data-weekend', selector: 'yearViewDay', condition: '周末' },
    {
      modifier: 'data-outside',
      selector: 'yearViewDay',
      condition: '日期不在当前月份内',
    },
    { modifier: 'data-static', selector: 'yearView', condition: '`mode="static"` is set' },
  ],
};
