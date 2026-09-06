import dayjs from 'dayjs';
import { DateStringValue } from '../../../types';

interface GetMinTimeInput {
  minDate: DateStringValue | Date | undefined;
  value: DateStringValue | null;
}

export function getMinTime({ minDate, value }: GetMinTimeInput): string | undefined {
  if (!minDate || !value) {
    return undefined;
  }

  // 按「同一天」判断而非整串相等：value 的时间部分（如 00:00:00）与 minDate 不同时，
  // 整串相等几乎永远不成立，最小时间约束形同虚设
  return dayjs(value).isSame(minDate, 'date') ? dayjs(minDate).format('HH:mm:ss') : undefined;
}

interface GetMaxTimeInput {
  maxDate: DateStringValue | Date | undefined;
  value: DateStringValue | null;
}

export function getMaxTime({ maxDate, value }: GetMaxTimeInput): string | undefined {
  if (!maxDate || !value) {
    return undefined;
  }

  return dayjs(value).isSame(maxDate, 'date') ? dayjs(maxDate).format('HH:mm:ss') : undefined;
}
