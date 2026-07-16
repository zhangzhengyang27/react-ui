import type { MonthViewFactory } from '@react-ui/schedule';
import type { StylesApiData } from '../types';

export const MonthViewStylesApi: StylesApiData<MonthViewFactory> = {
  selectors: {
    monthView: '根元素',
    monthViewScrollArea: 'Scroll area 包装器',
    monthViewInner: 'Inner 容器',
    monthViewWeek: '周行',
    monthViewDay: 'Day cell',
    monthViewDayLabel: '日期数字标签',
    monthViewWeekNumber: '周数指示器',
    monthViewWeekday: '星期名称单元格',
    monthViewWeekdays: '工作日行',
    monthViewWeekdaysCorner: 'Top-left corner in weekdays row',
    monthViewEvents: '日期单元格中的事件容器',
    monthViewBackgroundEvent: 'Background event 元素',
    header: '头部容器，属于 ScheduleHeader',
    headerControl: '头部控制元素，属于 ScheduleHeader',
    viewSelect: '视图选择元素，属于 ScheduleHeader',
    monthYearSelectTarget: '月/年选择目标按钮，属于 MonthYearSelect',
    monthYearSelectDropdown: '月/年选择下拉框，属于 MonthYearSelect',
    monthYearSelectControl: '月/年选择控件，属于 MonthYearSelect',
    monthYearSelectList: '月/年选择列表，属于 MonthYearSelect',
    monthYearSelectLabel: '月/年选择标签，属于 MonthYearSelect',
    agendaView: 'AgendaView 根元素，当日程打开时显示',
    agendaViewHeader: 'AgendaView header 容器',
    agendaViewHeaderLabel: 'AgendaView 日期范围标签',
    agendaViewBody: 'AgendaView body 容器',
    agendaViewDateGroup: 'AgendaView date group 容器',
    agendaViewDateHeader: 'AgendaView 日期头部文本',
    agendaViewEvent: 'AgendaView 事件项按钮',
    agendaViewEventBody: 'AgendaView event body 容器',
    agendaViewEventColor: 'AgendaView 事件颜色指示器',
    agendaViewEventTitle: 'AgendaView 事件标题文本',
    agendaViewEventTime: 'AgendaView 事件时间标签',
    agendaViewNoEvents: 'AgendaView 无事件消息',
  },

  vars: {
    monthView: {
      '--month-view-radius': 'Controls `border-radius` of the month view',
      '--month-view-max-events':
        '每天可见事件的最大数量，超过则显示 "+more" 指示器',
    },
  },

  modifiers: [
    { modifier: 'data-today', selector: 'monthViewDay', condition: '当天' },
    { modifier: 'data-weekend', selector: 'monthViewDay', condition: '周末' },
    {
      modifier: 'data-outside',
      selector: 'monthViewDay',
      condition: '日期不在当前月份内',
    },
    { modifier: 'data-static', selector: 'monthView', condition: '`mode="static"` is set' },
  ],
};
