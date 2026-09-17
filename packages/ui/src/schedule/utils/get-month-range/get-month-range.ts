import dayjs from 'dayjs';
import { AnyDateValue, DayOfWeek } from '../../types';
import { getMonthDays } from '../get-month-days/get-month-days';

interface GetMonthRangeInput {
  month: AnyDateValue;
  withOutsideDays: boolean | undefined;
  consistentWeeks: boolean | undefined;
  firstDayOfWeek: DayOfWeek;
}

/** Returns start and end dates as displayed in MonthView */
export function getMonthRange({
  month,
  withOutsideDays,
  consistentWeeks,
  firstDayOfWeek,
}: GetMonthRangeInput) {
  if (!withOutsideDays) {
    // 保持既有 19 字符 `YYYY-MM-DD 00:00:00` 输出不变(与下方 getMonthDays 分支及
    // 测试编码的行为一致);toDateString 现按 DateStringValue 契约返回 10 字符,不再复用
    return {
      start: dayjs(month).startOf('month').format('YYYY-MM-DD 00:00:00'),
      end: dayjs(month).endOf('month').format('YYYY-MM-DD 00:00:00'),
    };
  }

  const days = getMonthDays({ month, firstDayOfWeek, consistentWeeks });

  return {
    start: days[0][0],
    end: days[days.length - 1][6],
  };
}
