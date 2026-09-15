import dayjs from 'dayjs';
import { DateStringValue } from '../../../types';

export function dateStringParser(dateString: string | null): DateStringValue | null {
  if (dateString === null) {
    return null;
  }

  // 用 dayjs 解析而非 new Date：ISO 日期串（YYYY-MM-DD）在 new Date 下按 UTC 解析，
  // 转本地时区后在 UTC 负偏移地区会差一天
  const date = dayjs(dateString);

  if (!date.isValid()) {
    return null;
  }

  return date.format('YYYY-MM-DD') as DateStringValue;
}
