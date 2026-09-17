import dayjs from 'dayjs';
import { AnyDateValue, DateStringValue } from '../../types';

/** 输出对齐 DateStringValue 契约(types.ts:`YYYY-MM-DD`,10 字符)。
 * 此前返回 `YYYY-MM-DD 00:00:00`(19 字符),消费方拿它与手写的 `YYYY-MM-DD`
 * 值做相等比较/长度切片会静默不匹配;需要时间后缀的场景由调用方自行 format */
export function toDateString(date: AnyDateValue): DateStringValue {
  return dayjs(date).format('YYYY-MM-DD');
}
