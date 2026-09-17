import dayjs from 'dayjs';
import { AnyDateValue, DayOfWeek } from '../../types';

interface GetStartOfWeekInput {
  date: AnyDateValue;
  firstDayOfWeek?: DayOfWeek;
}

export function getStartOfWeek({ date, firstDayOfWeek = 1 }: GetStartOfWeekInput) {
  let value = dayjs(date);

  // 与 getEndOfWeek 对齐:非法输入(如空串/null)时 .day() === NaN,
  // 循环条件恒真且 invalid 值 subtract 后仍 invalid → 死循环冻结页面
  if (!value.isValid()) {
    return value;
  }

  while (value.day() !== firstDayOfWeek) {
    value = value.subtract(1, 'day');
  }

  return value.format('YYYY-MM-DD');
}
