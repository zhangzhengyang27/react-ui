import dayjs from 'dayjs';
import { AnyDateValue, DayOfWeek, ScheduleEventData } from '../../../types';
import { getMonthRange, validateEvent } from '../../../utils';
import { getMonthPositionedEvents, GroupedMonthEvents } from './get-month-positioned-events';

interface UseMonthViewEventsInput {
  /** Date (month start) at which events are positioned */
  date: AnyDateValue;

  /** List of all events that belong to the given month, extra events must be filtered out before passing to the function */
  events: ScheduleEventData[] | undefined;

  /** First day of the week, 0 - Sunday, 1 - Monday, etc., used to calculate events positions */
  firstDayOfWeek?: DayOfWeek;

  /** If true, events for outside days are included */
  withOutsideDays?: boolean;

  /** If true, month will show events for consistent number of weeks (6) */
  consistentWeeks?: boolean;
}

export function getMonthViewEvents({
  date,
  events,
  firstDayOfWeek = 1,
  withOutsideDays,
  consistentWeeks,
}: UseMonthViewEventsInput): GroupedMonthEvents {
  if (events === undefined) {
    return { groupedByDay: {}, groupedByWeek: {}, backgroundByWeek: {} };
  }

  const ids = new Set<string | number>();
  const filteredEvents: ScheduleEventData[] = [];

  const range = getMonthRange({ month: date, withOutsideDays, consistentWeeks, firstDayOfWeek });

  for (const event of events) {
    // 事件与显示范围相交：结束不早于范围起点 且 开始不晚于范围终点。
    // 此前误用 || 使条件对任意事件恒真，过滤完全失效
    if (
      !dayjs(event.end).isBefore(range.start, 'day') &&
      !dayjs(event.start).isAfter(range.end, 'day')
    ) {
      filteredEvents.push(validateEvent(event));

      if (!ids.has(event.id)) {
        ids.add(event.id);
      } else {
        throw new Error(`[@xiaoye-react/schedule] MonthView: Duplicated event ids found: ${event.id}`);
      }
    }
  }

  return getMonthPositionedEvents({
    date,
    events: filteredEvents,
    firstDayOfWeek,
    range,
  });
}
