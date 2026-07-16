import type { DayViewFactory } from '@react-ui/schedule';
import type { StylesApiData } from '../types';

export const DayViewStylesApi: StylesApiData<DayViewFactory> = {
  selectors: {
    dayView: '根元素',
    dayViewInner: '包裹时间段标签和时间段的内部容器',
    dayViewScrollArea: 'Scroll area 组件',
    dayViewAllDay: 'All-day events 容器',
    dayViewAllDayEvents: 'All-day events 包装器',
    dayViewSlot: 'Individual time slot 元素',
    dayViewSlots: '所有时间段的容器',
    dayViewTimeSlots: 'Container for time slots (excludes all-day)',
    dayViewSlotLabel: 'Time slot label 元素',
    dayViewSlotLabels: '所有时间段标签的容器',
    dayViewBackgroundEvent: 'Background event 元素',
    header: '头部容器，属于 ScheduleHeader',
    headerControl: '头部控制元素，属于 ScheduleHeader',
    viewSelect: '视图选择元素，属于 ScheduleHeader',
    event: 'Event element, part of ScheduleEvent',
    eventInner: 'Event inner element, part of ScheduleEvent',
    eventResizeHandle: 'Event resize handle element, part of ScheduleEvent',
    moreEventsButton: '更多事件按钮，属于 MoreEvents',
    moreEventsList: '更多事件列表，属于 MoreEvents',
    moreEventsDropdown: '更多事件下拉框，属于 MoreEvents',
    currentTimeIndicator: 'Current time indicator container, part of CurrentTimeIndicator',
    currentTimeIndicatorLine: 'Current time indicator line, part of CurrentTimeIndicator',
    currentTimeIndicatorThumb: 'Current time indicator thumb, part of CurrentTimeIndicator',
    currentTimeIndicatorTimeBubble:
      'Current time indicator time bubble, part of CurrentTimeIndicator',
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
    dayView: {
      '--day-view-radius': 'Controls `border-radius` of the day view',
      '--day-view-slot-height': 'Controls `height` of 1-hour time slots',
      '--day-view-all-day-slot-height': 'Controls `height` of the all-day slot',
    },
  },

  modifiers: [
    {
      modifier: 'data-hour-start',
      selector: 'dayViewSlot',
      condition: '时间段位于整点开始',
    },
    {
      modifier: 'data-business-hours',
      selector: 'dayViewSlot',
      condition: '`highlightBusinessHours` 为 true 且时间段在工作时间内',
    },
    {
      modifier: 'data-non-business-hours',
      selector: 'dayViewSlot',
      condition: '`highlightBusinessHours` 为 true 且时间段在工作时间外',
    },
    {
      modifier: 'data-drop-target',
      selector: 'dayViewSlot',
      condition: '时间段是当前拖放目标',
    },
    { modifier: 'data-static', selector: 'dayView', condition: '`mode="static"` is set' },
    {
      modifier: 'data-all-day',
      selector: 'dayViewSlotLabel',
      condition: 'Label is for all-day slot',
    },
  ],
};
