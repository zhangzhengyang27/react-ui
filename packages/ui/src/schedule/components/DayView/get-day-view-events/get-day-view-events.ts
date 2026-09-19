import dayjs from 'dayjs';
import { AnyDateValue, DayPositionedEventData, ScheduleEventData } from '../../../types';
import { getDayPosition, isAllDayEvent, isEventInTimeRange, validateEvent } from '../../../utils';
import { getDayPositionedEvents } from './get-day-positioned-events';

interface GetDayViewEventsInput {
  events: ScheduleEventData[] | undefined;
  date: AnyDateValue;
  startTime?: string;
  endTime?: string;
  intervalMinutes?: number;
}

export function getDayViewEvents({
  events,
  date,
  startTime,
  endTime,
  intervalMinutes,
}: GetDayViewEventsInput) {
  if (events === undefined) {
    return {
      allDayEvents: [],
      regularEvents: [],
      backgroundTimedEvents: [],
      backgroundAllDayEvents: [],
    };
  }

  const ids = new Set<string | number>();
  const filteredEvents: ScheduleEventData[] = [];
  const backgroundFiltered: ScheduleEventData[] = [];
  const dayStart = dayjs(date).startOf('day');
  const dayEnd = dayjs(date).endOf('day');

  for (const event of events) {
    const eventStart = dayjs(event.start);
    const eventEnd = dayjs(event.end);
    const isOnDay = eventStart.isSame(dayStart, 'day');
    // 任何跨越本日的事件都纳入（此前限制 display === 'background'，
    // 导致多日 timed 事件只在开始日可见，后续天整段消失）
    const spansIntoDay =
      !isOnDay && eventStart.isBefore(dayEnd) && eventEnd.isAfter(dayStart);

    if (isOnDay || spansIntoDay) {
      if (isOnDay && !isEventInTimeRange({ event, startTime, endTime })) {
        continue;
      }

      const validated = validateEvent(event);

      if (!ids.has(event.id)) {
        ids.add(event.id);
      } else {
        throw new Error(`[@xiaoye-react/ui] DayView: Duplicated event ids found: ${event.id}`);
      }

      if (event.display === 'background') {
        backgroundFiltered.push(validated);
      } else if (isOnDay) {
        filteredEvents.push(validated);
      } else {
        // 普通事件的续接日：裁剪到视图日再进入常规定位
        // （getDayPosition 以事件自身起始日为锚，不裁剪会错位到视口外）
        const clippedStart = eventStart.isBefore(dayStart) ? dayStart : eventStart;
        const clippedEnd = eventEnd.isAfter(dayEnd) ? dayEnd : eventEnd;
        filteredEvents.push({
          ...validated,
          start: clippedStart.format('YYYY-MM-DD HH:mm:ss'),
          end: clippedEnd.format('YYYY-MM-DD HH:mm:ss'),
        });
      }
    }
  }

  const positionedEvents = getDayPositionedEvents({
    events: filteredEvents,
    startTime,
    endTime,
    intervalMinutes,
    date,
  });

  const allDayEvents: DayPositionedEventData[] = [];
  const regularEvents: DayPositionedEventData[] = [];

  for (const event of positionedEvents) {
    if (event.position.allDay) {
      allDayEvents.push(event);
    } else {
      regularEvents.push(event);
    }
  }

  const backgroundTimedEvents: DayPositionedEventData[] = [];
  const backgroundAllDayEvents: DayPositionedEventData[] = [];
  for (const event of backgroundFiltered) {
    const eventStart = dayjs(event.start);
    const eventEnd = dayjs(event.end);
    const clippedStart = eventStart.isBefore(dayStart) ? dayStart : eventStart;
    const clippedEnd = eventEnd.isAfter(dayEnd) ? dayEnd : eventEnd;

    const clippedEvent = {
      ...event,
      start: clippedStart.format('YYYY-MM-DD HH:mm:ss'),
      end: clippedEnd.format('YYYY-MM-DD HH:mm:ss'),
    };

    const allDay = isAllDayEvent({ event: clippedEvent, date });

    if (allDay) {
      backgroundAllDayEvents.push({
        ...event,
        position: {
          top: 0,
          height: 100,
          allDay: true,
          width: 100,
          offset: 0,
          column: 0,
          overlaps: 1,
        },
      });
    } else {
      const { top, height } = getDayPosition({
        event: clippedEvent,
        startTime,
        endTime,
        intervalMinutes,
      });
      if (height <= 0) {
        continue;
      }
      backgroundTimedEvents.push({
        ...event,
        position: { top, height, allDay: false, width: 100, offset: 0, column: 0, overlaps: 1 },
      });
    }
  }

  return { allDayEvents, regularEvents, backgroundTimedEvents, backgroundAllDayEvents };
}
