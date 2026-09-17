import dayjs from 'dayjs';
import { DateStringValue } from '../../types';

// 分量钳制:hours 可达 24('24:00' 语义为当日末),但 set('hour', 24) 会让 dayjs
// 滚动到次日 00:00(跨天);对齐 schedule 包 toTimeString 语义钳到 23:59:59。
// NaN/Infinity 等非法分量 fallback 0,避免 Invalid Date 字符串进入 value
function clampComponent(value: number | undefined, min: number, max: number, fallback = 0) {
  if (value === undefined || !Number.isFinite(value)) {
    return fallback;
  }
  return Math.min(Math.max(Math.floor(value), min), max);
}

export function assignTime(
  dateValue: DateStringValue | null, // Date to assign time to
  timeString: string // HH:mm:ss format
): DateStringValue | null {
  let date = dateValue ? dayjs(dateValue) : dayjs();

  if (timeString === '') {
    return date.format('YYYY-MM-DD HH:mm:ss');
  }

  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  const safeHours = clampComponent(hours, 0, 23);
  const safeMinutes = hours !== undefined && hours > 23 ? 59 : clampComponent(minutes, 0, 59);
  const safeSeconds = clampComponent(seconds, 0, 59);

  date = date.set('hour', safeHours);
  date = date.set('minute', safeMinutes);
  date = date.set('second', safeSeconds);
  date = date.set('millisecond', 0);

  return date.format('YYYY-MM-DD HH:mm:ss');
}
