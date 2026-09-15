import dayjs from 'dayjs';
import { ScheduleEventData } from '../../types';
import { isMultidayEvent } from '../is-multiday-event/is-multiday-event';

interface IsEventInTimeRangeInput {
  event: ScheduleEventData;
  startTime?: string;
  endTime?: string;
}

function spansFullDay(event: ScheduleEventData) {
  const start = dayjs(event.start);
  const end = dayjs(event.end);
  if (!start.isSame(start.startOf('day'))) {
    return false;
  }
  const nextDayStart = start.startOf('day').add(1, 'day');
  return end.isSame(nextDayStart) || end.isSame(nextDayStart.subtract(1, 'second'));
}

export function isEventInTimeRange({ event, startTime, endTime }: IsEventInTimeRangeInput) {
  if (isMultidayEvent(event) || spansFullDay(event)) {
    return true;
  }

  if (!startTime || !endTime) {
    return true;
  }

  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  const timeWindowStartMinutes = startHour * 60 + startMinute;
  const timeWindowEndMinutes = endHour * 60 + endMinute;

  const eventStart = dayjs(event.start);
  const eventEnd = dayjs(event.end);
  const eventStartMinutes = eventStart.hour() * 60 + eventStart.minute();
  // 结束时间恰为次日 00:00 是"持续到当天结束"的常见表示（语义上的 24:00），
  // 直接取 hour/minute 会算成 0 而被时间窗口整体过滤；
  // 走到这里的都是单日事件（跨天/全天已被上方分支放行），
  // 用相对起始日 0 点的分钟差计算即可把次日午夜归一化为 1440
  const minutesFromDayStart = eventEnd.diff(eventStart.startOf('day'), 'minute');
  const eventEndMinutes =
    minutesFromDayStart > 0 ? minutesFromDayStart : eventEnd.hour() * 60 + eventEnd.minute();

  return !(eventEndMinutes <= timeWindowStartMinutes || eventStartMinutes >= timeWindowEndMinutes);
}
