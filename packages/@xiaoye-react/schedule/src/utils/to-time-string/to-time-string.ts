import { ParsedTime } from '../parse-time-string/parse-time-string';

export function toTimeString({ hours, minutes, seconds }: ParsedTime) {
  // hours 可达 24（endTime '24:00' 被解析端支持），但 "24:00:00" 拼上日期后
  // 在 Safari/Firefox 解析为 Invalid Date；钳到 23:59:59 是等价的合法表示
  const safeHours = Math.min(hours, 23);
  const safeMinutes = hours > 23 ? 59 : minutes;
  return `${String(safeHours).padStart(2, '0')}:${String(safeMinutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
