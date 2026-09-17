import { secondsToTime, timeToSeconds } from '../time-to-seconds/time-to-seconds';

interface GetTimeRangeInput {
  startTime: string;
  endTime: string;
  interval: string;
}

export function getTimeRange({ startTime, endTime, interval }: GetTimeRangeInput): string[] {
  const timeRange: string[] = [];
  const startInSeconds = timeToSeconds(startTime);
  const endInSeconds = timeToSeconds(endTime);
  const intervalInSeconds = timeToSeconds(interval);

  // interval<=0 或非法(解析为 NaN)时循环永不退出/永不推进,返回只含起点的数组;
  // 起止点非法时返回空数组,避免 NaN 串进结果
  if (!Number.isFinite(intervalInSeconds) || intervalInSeconds <= 0) {
    return Number.isFinite(startInSeconds) ? [secondsToTime(startInSeconds).timeString] : [];
  }
  if (!Number.isFinite(startInSeconds) || !Number.isFinite(endInSeconds)) {
    return [];
  }

  for (let current = startInSeconds; current <= endInSeconds; current += intervalInSeconds) {
    timeRange.push(secondsToTime(current).timeString);
  }

  return timeRange;
}
