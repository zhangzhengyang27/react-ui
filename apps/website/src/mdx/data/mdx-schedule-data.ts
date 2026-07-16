import { Frontmatter } from '@/types';

export const MDX_SCHEDULE_DATA: Record<string, Frontmatter> = {
  GettingStartedSchedule: {
    title: '开始使用',
    description: '开始使用 @react-ui/schedule 包',
    package: '@react-ui/schedule',
    license: 'MIT',
    slug: '/schedule/getting-started',
    docs: 'schedule/getting-started.mdx',
    hideInSearch: true,
  },

  DayView: {
    title: 'DayView',
    package: '@react-ui/schedule',
    slug: '/schedule/day-view',
    description: '独立的日程日视图组件',
    props: ['DayView'],
    styles: ['DayView'],
    source: '@react-ui/schedule/src/components/DayView/DayView.tsx',
    docs: 'schedule/day-view.mdx',
    searchTags: 'calendar, agenda, appointments, events, planner, timetable',
  },

  MonthView: {
    title: 'MonthView',
    package: '@react-ui/schedule',
    slug: '/schedule/month-view',
    description: '独立的日程月视图组件',
    props: ['MonthView'],
    styles: ['MonthView'],
    source: '@react-ui/schedule/src/components/MonthView/MonthView.tsx',
    docs: 'schedule/month-view.mdx',
    searchTags: 'calendar, agenda, appointments, events, planner, timetable',
  },

  WeekView: {
    title: 'WeekView',
    package: '@react-ui/schedule',
    slug: '/schedule/week-view',
    description: '独立的日程周视图组件',
    props: ['WeekView'],
    styles: ['WeekView'],
    source: '@react-ui/schedule/src/components/WeekView/WeekView.tsx',
    docs: 'schedule/week-view.mdx',
    searchTags: 'calendar, agenda, appointments, events, planner, timetable',
  },

  YearView: {
    title: 'YearView',
    package: '@react-ui/schedule',
    slug: '/schedule/year-view',
    description: '独立的日程年视图组件',
    props: ['YearView'],
    styles: ['YearView'],
    source: '@react-ui/schedule/src/components/YearView/YearView.tsx',
    docs: 'schedule/year-view.mdx',
    searchTags: 'calendar, agenda, appointments, events, planner, timetable',
  },

  MobileMonthView: {
    title: 'MobileMonthView',
    package: '@react-ui/schedule',
    slug: '/schedule/mobile-month-view',
    description: '移动优化的日程月视图组件',
    props: ['MobileMonthView'],
    styles: ['MobileMonthView'],
    source: '@react-ui/schedule/src/components/MobileMonthView/MobileMonthView.tsx',
    docs: 'schedule/mobile-month-view.mdx',
    searchTags: 'calendar, agenda, appointments, events, planner, timetable',
  },

  Schedule: {
    title: 'Schedule',
    package: '@react-ui/schedule',
    slug: '/schedule/schedule',
    description: '包含日、周、月和年视图的日程组件',
    props: ['Schedule'],
    styles: ['Schedule'],
    source: '@react-ui/schedule/src/components/Schedule/Schedule.tsx',
    docs: 'schedule/schedule.mdx',
    searchTags:
      'calendar, agenda, appointments, events, planner, timetable, booking, meetings, big calendar, scheduler',
  },
  ResourcesDayView: {
    title: 'ResourcesDayView',
    package: '@react-ui/schedule',
    slug: '/schedule/resources-day-view',
    description: '带资源列的日视图，用于跨资源排程',
    props: ['ResourcesDayView'],
    styles: ['ResourcesDayView'],
    source: '@react-ui/schedule/src/components/ResourcesDayView/ResourcesDayView.tsx',
    docs: 'schedule/resources-day-view.mdx',
  },

  ResourcesWeekView: {
    title: 'ResourcesWeekView',
    package: '@react-ui/schedule',
    slug: '/schedule/resources-week-view',
    description: '带资源行的周视图，用于跨资源排程',
    props: ['ResourcesWeekView'],
    styles: ['ResourcesWeekView'],
    source: '@react-ui/schedule/src/components/ResourcesWeekView/ResourcesWeekView.tsx',
    docs: 'schedule/resources-week-view.mdx',
  },

  ResourcesMonthView: {
    title: 'ResourcesMonthView',
    package: '@react-ui/schedule',
    slug: '/schedule/resources-month-view',
    description: '带资源通道的月视图，用于跨资源排程',
    props: ['ResourcesMonthView'],
    styles: ['ResourcesMonthView'],
    source: '@react-ui/schedule/src/components/ResourcesMonthView/ResourcesMonthView.tsx',
    docs: 'schedule/resources-month-view.mdx',
  },

  ResourcesSchedule: {
    title: 'ResourcesSchedule',
    package: '@react-ui/schedule',
    slug: '/schedule/resources-schedule',
    description: '组合资源日、周、月视图的日程包装组件',
    props: ['ResourcesSchedule'],
    styles: ['ResourcesSchedule'],
    source: '@react-ui/schedule/src/components/ResourcesSchedule/ResourcesSchedule.tsx',
    docs: 'schedule/resources-schedule.mdx',
  },

  AgendaView: {
    title: 'AgendaView',
    package: '@react-ui/schedule',
    slug: '/schedule/agenda-view',
    description: '按日期分组的事件垂直列表视图',
    props: ['AgendaView'],
    styles: ['AgendaView'],
    source: '@react-ui/schedule/src/components/AgendaView/AgendaView.tsx',
    docs: 'schedule/agenda-view.mdx',
  },

  RecurringEventsSchedule: {
    title: '重复事件',
    package: '@react-ui/schedule',
    slug: '/schedule/recurring-events',
    description: '@react-ui/schedule 重复事件指南',
    docs: 'schedule/recurring-events.mdx',
    searchTags: 'calendar, recurring, rrule, repeat, recurrence, repeating events',
  },

  ScheduleEventsData: {
    title: '事件数据',
    package: '@react-ui/schedule',
    slug: '/schedule/events-data',
    description: '@react-ui/schedule 事件数据形状和回调载荷',
    docs: 'schedule/events-data.mdx',
    searchTags:
      'event, ScheduleEventData, ScheduleEventBase, ScheduleSingleEventData, ScheduleRecurringSeriesEventData, ScheduleRecurringOverrideEventData, EventPayload, payload, recurringInstance, onEventDrop, onEventClick, onEventResize, onTimeSlotClick, onSlotDragEnd, callbacks, types',
  },
};
