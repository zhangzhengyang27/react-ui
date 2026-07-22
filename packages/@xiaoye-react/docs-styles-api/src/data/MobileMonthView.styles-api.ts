import type { MobileMonthViewFactory } from '@xiaoye-react/schedule';
import type { StylesApiData } from '../types';

export const MobileMonthViewStylesApi: StylesApiData<MobileMonthViewFactory> = {
  selectors: {
    mobileMonthView: '根元素',
    mobileMonthViewHeader: 'Header container with back button and month label',
    mobileMonthViewHeaderBackButton: 'Back button with year text',
    mobileMonthViewHeaderLabel: 'Month and year label in the header',
    mobileMonthViewCalendar: 'Calendar grid 容器',
    mobileMonthViewWeekdays: '工作日行',
    mobileMonthViewWeekday: 'Individual weekday name',
    mobileMonthViewWeekdaysCorner: 'Weekdays corner (for week numbers)',
    mobileMonthViewWeek: '周行',
    mobileMonthViewWeekNumber: 'Week number button',
    mobileMonthViewDay: 'Day cell button',
    mobileMonthViewDayIndicators: 'Day indicators 容器',
    mobileMonthViewDayIndicator: 'Individual day indicator dot',
    mobileMonthViewEventsList: 'Events list 容器',
    mobileMonthViewEventsHeader: 'Events list header (selected date)',
    mobileMonthViewEvent: '事件项按钮',
    mobileMonthViewEventColor: '事件颜色指示器',
    mobileMonthViewEventBody: 'Event body layout 容器',
    mobileMonthViewEventTitle: '事件标题文本',
    mobileMonthViewEventTime: '事件时间标签',
    mobileMonthViewNoEvents: '无事件消息',
  },

  vars: {
    mobileMonthView: {
      '--mobile-month-view-radius': '控制边框圆角',
    },
  },

  modifiers: [],
};
