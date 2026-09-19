import dayjs from 'dayjs';
import { AnyDateValue, DateStringValue, ScheduleEventData } from '../../types';
import { isMultidayEvent, validateEvent } from '../../utils';

export type GroupedEvents = Record<DateStringValue, ScheduleEventData[]>;

function groupEventByDate(event: ScheduleEventData, groupedEvents: GroupedEvents) {
  if (isMultidayEvent(event)) {
    const startDate = dayjs(event.start).startOf('day');
    const endDate = dayjs(event.end).startOf('day');

    for (
      let date = startDate;
      date.isBefore(endDate) || date.isSame(endDate);
      date = date.add(1, 'day')
    ) {
      const dateKey = date.format('YYYY-MM-DD');
      if (!groupedEvents[dateKey]) {
        groupedEvents[dateKey] = [];
      }
      groupedEvents[dateKey].push(event);
    }

    return;
  }

  const eventDate = dayjs(event.start).format('YYYY-MM-DD');
  if (!groupedEvents[eventDate]) {
    groupedEvents[eventDate] = [];
  }
  groupedEvents[eventDate].push(event);
}

interface GetMobileMonthViewEventsInput {
  date: AnyDateValue;
  events: ScheduleEventData[] | undefined;
}

export function getMobileMonthViewEvents({ date, events }: GetMobileMonthViewEventsInput) {
  const groupedEvents: GroupedEvents = {};

  if (events === undefined) {
    return groupedEvents;
  }

  const ids = new Set<string | number>();
  // 与显示月相交即纳入（此前只看 event.start 所在月，起始日在月外的
  // 跨日事件在续接日全部缺失）
  const monthStart = dayjs(date).startOf('month');
  const monthEnd = dayjs(date).endOf('month');

  for (const event of events) {
    if (event.display === 'background') {
      continue;
    }

    if (
      !dayjs(event.end).isBefore(monthStart, 'day') &&
      !dayjs(event.start).isAfter(monthEnd, 'day')
    ) {
      groupEventByDate(validateEvent(event), groupedEvents);

      if (!ids.has(event.id)) {
        ids.add(event.id);
      } else {
        throw new Error(
          `[@xiaoye-react/ui] MobileMonthView: Duplicated event ids found: ${event.id}`
        );
      }
    }
  }

  return groupedEvents;
}
