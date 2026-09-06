import dayjs from 'dayjs';
import type { DateStringValue, DayOfWeek } from '../../../types';

export function getStartOfWeek(date: DateStringValue, firstDayOfWeek: DayOfWeek = 1) {
  const value = dayjs(date);

  // 非法日期 day() 返回 NaN，while 永远无法退出（与 getEndOfWeek 的守卫对齐）
  if (!value.isValid()) {
    return date;
  }

  // firstDayOfWeek 归一化到 0-6，越界值（如 7）同样会死循环
  const normalizedFirstDay: DayOfWeek = (((firstDayOfWeek % 7) + 7) % 7) as DayOfWeek;

  let result = value;
  while (result.day() !== normalizedFirstDay) {
    result = result.subtract(1, 'day');
  }

  return result.format('YYYY-MM-DD') as DateStringValue;
}
