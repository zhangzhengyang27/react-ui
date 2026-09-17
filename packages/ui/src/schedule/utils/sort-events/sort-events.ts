import dayjs from 'dayjs';
import { ScheduleEventData } from '../../types';

/** Sorts events by start time, then by duration (longer first) */
export function sortEvents<T extends ScheduleEventData>(events: T[]): T[] {
  // [...events].sort 与 toSorted 同为「不原地排序」语义;toSorted 是 ES2023 API,
  // 与 tsconfig target ES2015 不符,旧引擎上会直接 TypeError 导致整视图崩溃
  return [...events].sort((a, b) => {
    const startDiff = dayjs(a.start).diff(dayjs(b.start));

    if (startDiff !== 0) {
      return startDiff;
    }

    return dayjs(b.end).diff(dayjs(b.start)) - dayjs(a.end).diff(dayjs(a.start));
  });
}
