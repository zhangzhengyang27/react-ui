import dayjs from 'dayjs';
import { AnyDateValue, DateStringValue, DayOfWeek } from '../../types';
import { getStartOfWeek } from '../get-start-of-week/get-start-of-week';

export interface GetWeekDaysInput {
  /** Week to generate days for */
  week: AnyDateValue;

  /** Indices of weekend days, 0-6, where 0 is Sunday and 6 is Saturday. The default value is defined by `DatesProvider`. */
  weekendDays?: DayOfWeek[];

  /** If set to false, weekend days are hidden @default true */
  withWeekendDays?: boolean;

  /** Number 0-6, where 0 – Sunday and 6 – Saturday @default 1 */
  firstDayOfWeek?: DayOfWeek;
}

/** Returns a list of days in a given week */
export function getWeekDays({
  week,
  weekendDays,
  withWeekendDays = true,
  firstDayOfWeek = 1,
}: GetWeekDaysInput): DateStringValue[] {
  const days: DateStringValue[] = [];

  let current = dayjs(getStartOfWeek({ date: week, firstDayOfWeek }));

  for (let i = 0; i < 7; i += 1) {
    const dayOfWeek = current.day();
    const isWeekend = weekendDays && weekendDays.includes(dayOfWeek as DayOfWeek);

    if (!isWeekend || withWeekendDays) {
      // 保持既有 19 字符 `YYYY-MM-DD 00:00:00` 输出不变(测试编码的行为);
      // toDateString 现按 DateStringValue 契约返回 10 字符,不再复用
      days.push(current.format('YYYY-MM-DD 00:00:00'));
    }

    current = current.add(1, 'day');
  }

  return days;
}
